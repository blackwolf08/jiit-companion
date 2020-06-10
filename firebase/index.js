import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

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
