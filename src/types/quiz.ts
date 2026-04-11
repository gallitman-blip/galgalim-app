import type { AnswerKey, Question } from './question';

export type QuizMode = 'single-topic' | 'multi-topic' | 'full-exam';

export type QuizStatus = 'idle' | 'active' | 'completed';

export interface QuizConfig {
  mode: QuizMode;
  topicIds: string[]; // empty = full exam (all topics)
}

export interface TopicResult {
  topicId: string;
  topicName: string;
  correct: number;
  total: number;
}

export interface QuizResult {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number; // 0–100
  topicBreakdown: TopicResult[];
}

export interface QuizSession {
  config: QuizConfig;
  questions: Question[];
  currentIndex: number;
  /** null = unanswered (timed out or skipped) */
  answers: Record<number, AnswerKey | null>;
  status: QuizStatus;
  startedAt: number;
  completedAt: number | null;
  result: QuizResult | null;
}
