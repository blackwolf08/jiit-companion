import moment from 'moment';

export const getSubjectString = (attendance) => {
  let subject_codes = [];

  Object.keys(attendance).forEach((key) =>
    subject_codes.push(key.substring(key.length - 11, key.length))
  );

  let sub_string = '';

  for (let i = 0; i < subject_codes.length; i++) {
    if (i == subject_codes.length - 1) {
      sub_string += subject_codes[i].split(' ')[1];
    } else {
      sub_string += subject_codes[i].split(' ')[1] + ',';
    }
  }

  return sub_string;
};

export const getCurrClass = (code, attendance) => {
  let res = '';
  code = code.substring(code.length - 4, code.length);
  Object.keys(attendance).forEach((key) => {
    if (key.indexOf(code) > 0) {
      res = `${key.split(' - ')[0]}`;
    }
  });
  return res;
};

export const getAttendance = (code, att) => {
  let res;
  code = code.substring(code.length - 4, code.length);

  Object.keys(att).forEach((sub) => {
    if (sub.indexOf(code) > -1) {
      res = String(att[sub][0]['Total']).substring(
        0,
        att[sub][0]['Total'].length - 2
      );
    }
  });
  res = parseInt(res);
  return res;
};

export const isClassCompleted = (classTime) => {
  let time = parseInt(classTime.substring(0, classTime.length - 3));
  if (time < 9) {
    time = time + 12;
  }
  let currTime = moment().format('H');

  if (currTime > time) return true;

  return false;
};

export const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('-')[0];
};
