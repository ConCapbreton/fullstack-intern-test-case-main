type Choices = {
  text: string;
  isCorrect: Boolean;
  _id: string;
  createdAt: String;
  updatedAt: String;
}

export type Question = {
  title: string;
  choices: Choices[];
  _id: string;
  createdAt: String;
  updatedAt: String;
};

export type Course = {
  _id: string;
  code: string;
  title: string;
  description: string;
  questions: Question[];
};
