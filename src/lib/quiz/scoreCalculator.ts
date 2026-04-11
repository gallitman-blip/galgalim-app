import type { QuizSession, QuizResult, TopicResult } from '@/types/quiz';
import type { Question } from '@/types/question';
import { OFFICIAL_TOPICS } from '@/constants/topics';

export function calculateResult(session: QuizSession): QuizResult {
  const { questions, answers } = session;
  const total = questions.length;

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (const q of questions) {
    const given = answers[q.id];
    if (given === null || given === undefined) {
      unanswered++;
    } else if (given === q.correctAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  }

  const score = Math.round((correct / total) * 100);

  // Per-topic breakdown
  const topicMap: Record<string, { correct: number; total: number }> = {};
  for (const q of questions) {
    if (!topicMap[q.topicId]) topicMap[q.topicId] = { correct: 0, total: 0 };
    topicMap[q.topicId].total++;
    if (answers[q.id] === q.correctAnswer) topicMap[q.topicId].correct++;
  }

  const topicBreakdown: TopicResult[] = Object.entries(topicMap).map(
    ([topicId, stats]) => ({
      topicId,
      topicName: OFFICIAL_TOPICS.find(t => t.id === topicId)?.name ?? topicId,
      correct: stats.correct,
      total: stats.total,
    })
  );

  return { total, correct, incorrect, unanswered, score, topicBreakdown };
}

export function getAnsweredCount(
  questions: Question[],
  answers: Record<number, string | null>
): number {
  return questions.filter(q => answers[q.id] != null).length;
}
