export type AnswerKey = 'A' | 'B' | 'C' | 'D';

export interface AnswerOption {
  key: AnswerKey;
  text: string;
}

export interface Question {
  id: number;
  topicId: string;
  text: string;
  options: AnswerOption[];
  correctAnswer: AnswerKey;
}

export interface Topic {
  id: string;
  name: string;
  questionCount: number;
}
