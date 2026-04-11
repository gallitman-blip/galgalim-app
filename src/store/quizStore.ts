import { create } from 'zustand';
import type { QuizSession, QuizConfig, QuizResult } from '@/types/quiz';
import type { AnswerKey } from '@/types/question';

interface QuizState {
  session: QuizSession | null;
  timeRemaining: number;
  timerActive: boolean;
  highWaterMark: number; // furthest question index that has been submitted

  startSession:      (session: QuizSession) => void;
  recordAnswer:      (questionId: number, answer: AnswerKey | null) => void;
  advanceQuestion:   () => void;
  previousQuestion:  () => void;
  completeQuiz:      (result: QuizResult) => void;
  resetQuiz:         () => void;
  setTimeRemaining:  (t: number) => void;
  setTimerActive:    (v: boolean) => void;
  tickTimer:         () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  session:        null,
  timeRemaining:  30,
  timerActive:    false,
  highWaterMark:  0,

  startSession: (session) =>
    set({ session, timeRemaining: 30, timerActive: true, highWaterMark: 0 }),

  recordAnswer: (questionId, answer) =>
    set(state => {
      if (!state.session) return state;
      return {
        session: {
          ...state.session,
          answers: { ...state.session.answers, [questionId]: answer },
        },
      };
    }),

  advanceQuestion: () =>
    set(state => {
      if (!state.session) return state;
      const nextIndex  = state.session.currentIndex + 1;
      const newMark    = Math.max(state.highWaterMark, nextIndex);
      return {
        session:       { ...state.session, currentIndex: nextIndex },
        timeRemaining: 30,
        timerActive:   true,
        highWaterMark: newMark,
      };
    }),

  previousQuestion: () =>
    set(state => {
      if (!state.session || state.session.currentIndex === 0) return state;
      return {
        session:    { ...state.session, currentIndex: state.session.currentIndex - 1 },
        timerActive: false,
      };
    }),

  completeQuiz: (result) =>
    set(state => {
      if (!state.session) return state;
      return {
        session: {
          ...state.session,
          status: 'completed',
          completedAt: Date.now(),
          result,
        },
        timerActive: false,
      };
    }),

  resetQuiz: () =>
    set({ session: null, timeRemaining: 30, timerActive: false, highWaterMark: 0 }),

  setTimeRemaining: (timeRemaining) => set({ timeRemaining }),
  setTimerActive:   (timerActive)   => set({ timerActive }),

  tickTimer: () => {
    const { timeRemaining } = get();
    if (timeRemaining > 0) set({ timeRemaining: timeRemaining - 1 });
  },
}));
