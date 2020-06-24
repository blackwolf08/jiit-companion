import axios from "axios";
import { BASE_API, JIIT_SOCIAL_BASE_API } from "./constants";

export const getAttendance = async ({
  enrollmentNumber,
  password,
  dateOfBirth,
  college,
}) => {
  console.log({
    enrollmentNumber,
    password,
    dateOfBirth,
    college,
  });
  let formData = new FormData();
  formData.append("enrll", String(enrollmentNumber));
  formData.append("psswd", String(password));
  formData.append("dob", String(dateOfBirth));
  formData.append("college", String(college));
  formData.append("type", "S");
  try {
    let res = await axios({
      method: "post",
      url: `${BASE_API}/attendance`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDateWiseAttendance = async ({
  enrollmentNumber,
  password,
  dateOfBirth,
  college,
}) => {
  let formData = new FormData();
  formData.append("enrll", String(enrollmentNumber));
  formData.append("psswd", String(password));
  formData.append("dob", String(dateOfBirth));
  formData.append("college", String(college));
  formData.append("type", "S");
  try {
    let res = await axios({
      method: "post",
      url: `${BASE_API}/datewiseattendance`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getSubjectAttendance = async (
  { enrollmentNumber, password, dateOfBirth, college, datewiseattendance },
  className
) => {
  let formData = new FormData();
  formData.append("enrll", String(enrollmentNumber));
  formData.append("psswd", String(password));
  formData.append("dob", String(dateOfBirth));
  formData.append("college", String(college));
  formData.append("type", "S");
  formData.append("url", datewiseattendance[className]);
  try {
    let res = await axios({
      method: "post",
      url: `${BASE_API}/getsubjectattendance`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCGPA = async ({
  enrollmentNumber,
  password,
  dateOfBirth,
  college,
}) => {
  let formData = new FormData();
  formData.append("enrll", String(enrollmentNumber));
  formData.append("psswd", String(password));
  formData.append("dob", String(dateOfBirth));
  formData.append("college", String(college));
  formData.append("type", "S");
  try {
    let { data, status } = await axios({
      method: "post",
      url: `${BASE_API}/cgpa`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getExamMarks = async ({
  enrollmentNumber,
  password,
  dateOfBirth,
  college,
}) => {
  let formData = new FormData();
  formData.append("enrll", String(enrollmentNumber));
  formData.append("psswd", String(password));
  formData.append("dob", String(dateOfBirth));
  formData.append("college", String(college));
  formData.append("type", "S");
  try {
    let { data, status } = await axios({
      method: "post",
      url: `${BASE_API}/exam-marks`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getSubjects = async ({
  enrollmentNumber,
  password,
  dateOfBirth,
  college,
}) => {
  let formData = new FormData();
  formData.append("enrll", String(enrollmentNumber));
  formData.append("psswd", String(password));
  formData.append("dob", String(dateOfBirth));
  formData.append("college", String(college));
  formData.append("type", "S");
  try {
    let { data, status } = await axios({
      method: "post",
      url: `${BASE_API}/subjects`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTimeTable = async (subString, batch, year) => {
  try {
    let res = await axios.post(
      `${BASE_API}/timetable?batch=${batch}&subject=${subString}&year=${year}&college=62`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addUserToJIITSocialDB = async (enrollment_number) => {
  try {
    let formData = new FormData();
    formData.append("enrollment_number", enrollment_number);
    let res = await axios({
      method: "post",
      url: `${JIIT_SOCIAL_BASE_API}/registerUser`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    console.log("JIIT Social user registration successful", res.data);
    return true;
  } catch (err) {
    console.log("JIIT Social register user failed");
    return false;
  }
};

export const addPostToDB = async (enrollment_number, image_string, caption) => {
  let formData = new FormData();
  formData.append("enrollment_number", enrollment_number);
  formData.append("image_string", image_string);
  formData.append("caption", caption);
  try {
    await axios({
      method: "post",
      url: `${JIIT_SOCIAL_BASE_API}/post/new`,
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    return {
      message: "success",
    };
  } catch (err) {
    return {
      message: "error",
      error: err,
    };
  }
};
