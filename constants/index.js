export const MODERATORS = ["17103071", "17103076", "17103070"];

export const isModerator = (enrollmentNumber) =>
  MODERATORS.includes(enrollmentNumber);
