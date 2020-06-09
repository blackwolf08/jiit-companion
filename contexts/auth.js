import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

import { getAttendance, getDateWiseAttendance } from '../api';
import { useUser } from './user';
import { addUserToDB } from '../firebase';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { setUser } = useUser();

  const login = async ({
    enrollmentNumber,
    password,
    dateOfBirth,
    batch,
    year,
    college,
  }) => {
    setisLoading(true);
    try {
      let user = {
        enrollmentNumber,
        password,
        dateOfBirth,
        batch,
        year,
        college,
      };
      let attendance = await getAttendance(user);
      let datewiseattendance = await getDateWiseAttendance(user);
      if (!attendance || !datewiseattendance) {
        setisLoading(false);
        return;
      }
      user.loggedIn = true;
      user.attendance = attendance;
      user.datewiseattendance = datewiseattendance;
      addUserToDB(user);
      firebase.analytics().logEvent('login_success');
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setisAuthenticated(true);
    } catch (e) {
      firebase.analytics().logEvent('login_failed');
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setisAuthenticated, login, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
