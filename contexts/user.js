import React, { useState, useEffect } from 'react';
import { getSubjectString } from '../utils';
import { getTimeTable } from '../api';
import { AsyncStorage } from 'react-native';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [timeTable, settimeTable] = useState(null);

  const _getTimeTable = async () => {
    // if no user
    if (!user) return;

    // if timtable cached
    let cachedTimeTable = await AsyncStorage.getItem('timetable');
    cachedTimeTable = JSON.parse(cachedTimeTable);
    if (cachedTimeTable) {
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

  useEffect(() => {
    _getTimeTable();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        timeTable,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
