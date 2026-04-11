export const QUIZ_CONFIG = {
  /** Seconds per question before auto-advancing */
  TIMER_SECONDS: 30,

  /** Brief pause (ms) after answering before advancing to next question */
  ANSWER_DELAY_MS: 800,

  /** CSV file path (relative to /public) */
  QUESTIONS_CSV_PATH: '/data/questions.csv',
} as const;
