import type { QuizSession, QuizConfig } from '@/types/quiz';
import type { Question } from '@/types/question';
import { shuffle } from './shuffle';
import { getByTopics, getQuestionBank } from '@/lib/data/questionBank';

export async function buildQuiz(config: QuizConfig): Promise<QuizSession> {
  let questions: Question[];

  if (config.mode === 'full-exam' || config.topicIds.length === 0) {
    questions = await getQuestionBank();
  } else {
    questions = await getByTopics(config.topicIds);
  }

  const shuffled = shuffle(questions);

  // Initialize all answers to null
  const answers: Record<number, null> = {};
  for (const q of shuffled) {
    answers[q.id] = null;
  }

  return {
    config,
    questions: shuffled,
    currentIndex: 0,
    answers,
    status: 'active',
    startedAt: Date.now(),
    completedAt: null,
    result: null,
  };
}
