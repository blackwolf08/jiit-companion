import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import { getAttendance, getDateWiseAttendance } from "../api";
import { useUser } from "./user";
import { useDropDown } from "./dropdown";
import { addUserToDB } from "../firebase";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { setUser } = useUser();
  const { ref } = useDropDown();

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
        ref.current.alertWithType(
          "error",
          "Error",
          "Invalid credentials or your account is blocked."
        );
        return;
      }
      ref.current.alertWithType("success", "Log in successfull.", "");
      user.loggedIn = true;
      user.attendance = attendance;
      user.datewiseattendance = datewiseattendance;
      addUserToDB(user);
      Analytics.logEvent("login_success");
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setisAuthenticated(true);
    } catch (e) {
      Analytics.logEvent("login_failed");
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
