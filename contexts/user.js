import React, { useState, useEffect } from 'react';
import { getSubjectString, getDayNumber } from '../utils';
import { getTimeTable, getAttendance } from '../api';
import { AsyncStorage } from 'react-native';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [timeTable, settimeTable] = useState(null);
  const [loading, setLoading] = useState(false);

  const _getTimeTable = async (refresh) => {
    // if no user
    if (!user) return;
    // if timtable cached
    let cachedTimeTable = await AsyncStorage.getItem('timetable');
    cachedTimeTable = JSON.parse(cachedTimeTable);
    // if no refresh request and has cache timetable
    if (cachedTimeTable && !refresh) {
      settimeTable(cachedTimeTable);
      return;
    }

    // if timetable not cached
    let attendance = getSubjectString(user.attendance);
    let res = await getTimeTable(attendance, user.batch, user.year);
    let timetable = [
      { monday: res['monday'] },
      { tuesday: res['tuesday'] },
      { wednesday: res['wednesday'] },
      { thursday: res['thursday'] },
      { friday: res['friday'] },
      { saturday: res['saturday'] },
    ];
    await AsyncStorage.setItem('timetable', JSON.stringify(timetable));

    // set timetable
    settimeTable(timetable);
  };

  const refreshAttendance = async () => {
    if (!user) return;

    setLoading(true);

    let attendance = await getAttendance(user);
    if (!attendance) {
      setLoading(false);
      return;
    }
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        attendance,
      })
    );
    setUser({
      ...user,
      attendance,
    });
    setLoading(false);
  };

  const updateTimeTable = async ({ data, dayName }) => {
    let newTimeTable = [...timeTable];
    newTimeTable[getDayNumber(dayName)] = {
      [dayName]: data,
    };
    settimeTable(newTimeTable);
    await AsyncStorage.setItem('timetable', JSON.stringify(newTimeTable));
  };

  useEffect(() => {
    _getTimeTable();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        timeTable,
        refreshAttendance,
        settimeTable,
        updateTimeTable,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
