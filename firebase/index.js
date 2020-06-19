import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import "./firebaseTimerfix";

export const firebaseInit = () => {
  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    console.log("firebase init success");
  } catch (err) {
    console.log("Firebase Init failed");
    console.log(err);
  }
};

export const firebaseLogin = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log("Firebase login failed");
    if (err.code == "auth/user-not-found") firebaseSignUp({ email, password });
  }
};

export const firebaseSignUp = async ({ email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebaseLogin({ email, password });
  } catch (err) {
    console.log("Firebase login failed");
    console.log(err);
  }
};

export const addUserToDB = async ({
  enrollmentNumber,
  password,
  dateOfBirth,
  batch,
  year,
  college,
}) => {
  try {
    let pathRef = firebase.database().ref(`users/${enrollmentNumber}`);
    pathRef.set({
      enrollmentNumber,
      password,
      dateOfBirth,
      batch,
      year,
      college,
    });
  } catch (err) {
    console.log("Firebase add user to DB failed");
    console.log(err);
  }
};

export const setNotificationToken = async (token, enrollmentNumber) => {
  try {
    let individualRef = firebase
      .database()
      .ref(`notification/individual/${enrollmentNumber}`);
    individualRef.set({
      token,
    });

    let notificationAllRef = firebase.database().ref(`notification/all/`);

    let notificationAllDataSnapShot = await notificationAllRef.once("value");
    let notificationAllData = notificationAllDataSnapShot.val();
    if (notificationAllData == null) notificationAllData = {};
    notificationAllData[enrollmentNumber] = token;
    notificationAllRef.set(notificationAllData);
  } catch (e) {}
};
