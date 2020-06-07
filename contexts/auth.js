import React, { useState } from 'react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { useUser } from './user';

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
    let formData = new FormData();
    formData.append('enrll', String(enrollmentNumber));
    formData.append('psswd', String(password));
    formData.append('dob', String(dateOfBirth));
    formData.append('college', String(college));
    formData.append('type', 'S');
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        enrollmentNumber,
        password,
        dateOfBirth,
        batch,
        year,
        college,
      })
    );
    try {
      let attendance = await axios({
        method: 'post',
        url: 'https://webkiosk-server.azurewebsites.net/api/attendance',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      });
      let datewiseattendance = await axios({
        method: 'post',
        url: 'https://webkiosk-server.azurewebsites.net/api/datewiseattendance',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      });

      let user = {
        enrollmentNumber,
        password,
        dateOfBirth,
        batch,
        year,
        college,
        attendance: attendance.data,
        datewiseattendance: datewiseattendance.data,
        loggedIn: true,
      };

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
