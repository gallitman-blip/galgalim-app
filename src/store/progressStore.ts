import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompletedSession {
  id: string;
  topicIds: string[];   // empty = full exam
  mode: string;
  score: number;
  correct: number;
  total: number;
  completedAt: number;
}

interface ProgressState {
  sessions: CompletedSession[];
  addSession: (s: Omit<CompletedSession, 'id' | 'completedAt'>) => void;
  getTopicScore: (topicId: string) => number;        // 0–100 average for that topic
  getTopicPractices: (topicId: string) => number;    // practice count for topic
  getOverallScore: () => number;
  getTotalPractices: () => number;
  getAverageScore: () => number;
  getTotalQuestionsAnswered: () => number;
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      sessions: [],

      addSession: (s) =>
        set(state => ({
          sessions: [
            ...state.sessions,
            {
              ...s,
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              completedAt: Date.now(),
            },
          ],
        })),

      getTopicScore: (topicId) => {
        const sessions = get().sessions.filter(
          s => s.topicIds.length === 1 && s.topicIds[0] === topicId
        );
        if (sessions.length === 0) return 0;
        return Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length);
      },

      getTopicPractices: (topicId) =>
        get().sessions.filter(s => s.topicIds.includes(topicId)).length,

      getOverallScore: () => {
        const { sessions } = get();
        if (sessions.length === 0) return 0;
        return Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length);
      },

      getTotalPractices: () => get().sessions.length,

      getAverageScore: () => {
        const { sessions } = get();
        if (sessions.length === 0) return 0;
        return Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length);
      },

      getTotalQuestionsAnswered: () =>
        get().sessions.reduce((sum, s) => sum + s.total, 0),

      clearProgress: () => set({ sessions: [] }),
    }),
    { name: 'galgalim-progress' }
  )
);
