import React, { useState, useEffect } from 'react';
import * as Analytics from 'expo-firebase-analytics';
import { getSubjectString, getDayNumber } from '../utils';
import { getTimeTable, getAttendance } from '../api';
import { AsyncStorage, Alert } from 'react-native';
import { firebaseLogin } from '../firebase';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [timeTable, settimeTable] = useState(null);
  const [loading, setLoading] = useState(false);

  const _getTimeTable = async (refresh) => {
    Analytics.logEvent('get_timetable_called');

    // if no user
    if (!user) return;
    // if timtable cached
    let ODD_SEM_2020 = await AsyncStorage.getItem('ODD_SEM_2020');
    if (!ODD_SEM_2020) {
      await AsyncStorage.removeItem('timetable');
      await AsyncStorage.setItem('ODD_SEM_2020', 'true');
      Alert.alert('Please wait while we update your timetable.');
    }
    let cachedTimeTable = await AsyncStorage.getItem('timetable');
    cachedTimeTable = JSON.parse(cachedTimeTable);
    // if no refresh request and has cache timetable
    // console.log(cachedTimeTable);
    if (cachedTimeTable && !refresh) {
      settimeTable(cachedTimeTable);
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

  const initFirebaseSignIn = () => {
    if (!user) return;
    let email = `${user.enrollmentNumber}@jiitcompanion.com`;
    let password = `${user.enrollmentNumber}@${user.password}@${user.batch}`;
    firebaseLogin({ email, password });
  };

  const refreshAttendance = async () => {
    Analytics.logEvent('refresh_attendance_called');

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

  const updateTimeTable = async () => {
    _getTimeTable();
  };

  addPost = () => {};

  useEffect(() => {
    _getTimeTable();
    initFirebaseSignIn();
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
        addPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
