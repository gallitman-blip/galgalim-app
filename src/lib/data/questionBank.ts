'use client';

import type { Question, Topic } from '@/types/question';
import { OFFICIAL_TOPICS } from '@/constants/topics';
import { loadQuestions } from './loadQuestions';

let cachedQuestions: Question[] | null = null;

export async function getQuestionBank(): Promise<Question[]> {
  if (cachedQuestions) return cachedQuestions;
  cachedQuestions = await loadQuestions();
  return cachedQuestions;
}

export async function getAllTopics(): Promise<Topic[]> {
  const questions = await getQuestionBank();
  const counts: Record<string, number> = {};
  for (const q of questions) {
    counts[q.topicId] = (counts[q.topicId] ?? 0) + 1;
  }
  return OFFICIAL_TOPICS.map(t => ({
    ...t,
    questionCount: counts[t.id] ?? 0,
  }));
}

export async function getByTopic(topicId: string): Promise<Question[]> {
  const questions = await getQuestionBank();
  return questions.filter(q => q.topicId === topicId);
}

export async function getByTopics(topicIds: string[]): Promise<Question[]> {
  const questions = await getQuestionBank();
  const set = new Set(topicIds);
  return questions.filter(q => set.has(q.topicId));
}
