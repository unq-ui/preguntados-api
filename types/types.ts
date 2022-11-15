export type ErrorMessage = {
  error: string;
};

export enum Level {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
  EXTREME = 'extreme',
};

export type BackendQuestion = {
  _id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  level: Level;
};

export type Question = {
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};

export type Answer = {
  questionId: string;
  answer: boolean;
}
