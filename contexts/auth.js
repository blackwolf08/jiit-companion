import React, { useState } from "react";
import * as Analytics from "expo-firebase-analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAttendance, getDateWiseAttendance } from "../api";
import { useUser } from "./user";
import { useDropDown } from "./dropdown";
import { addUserToDB } from "../firebase";
import { addUserToJIITSocialDB } from "../api/requests";

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
    userName,
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
      let isUserAddedToJIITSocial = await addUserToJIITSocialDB(
        enrollmentNumber
      );
      if (!attendance || !datewiseattendance || !isUserAddedToJIITSocial) {
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
      user.userName = userName;
      user.attendance = attendance;
      user.datewiseattendance = datewiseattendance;
      user.jiitSocial = isUserAddedToJIITSocial;
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
