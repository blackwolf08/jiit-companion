import React, { useState } from 'react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { useUser } from './user';
import { BASE_API, getAttendance, getDateWiseAttendance } from '../api';

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
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setisAuthenticated(true);
    } catch (e) {
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
