import { BackendQuestion, Question } from "../types/types";

export const createQuestion = ({ _id: id, question, option1, option2, option3, option4}: BackendQuestion): Question => ({
  id,
  question,
  option1,
  option2,
  option3,
  option4,
});

export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
