import Papa from 'papaparse';
import type { Question, AnswerKey } from '@/types/question';
import { TOPIC_NORMALIZATION_MAP } from '@/constants/topics';
import { QUIZ_CONFIG } from '@/constants/quizConfig';

interface RawRow {
  question_id: string;
  topic: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

function normalizeTopicId(rawTopic: string): string {
  const trimmed = rawTopic.trim();
  const mapped = TOPIC_NORMALIZATION_MAP[trimmed];
  if (mapped) return mapped;

  // Fuzzy fallback: strip quotes/punctuation variants and retry
  const cleaned = trimmed
    .replace(/[״"]/g, '"')
    .replace(/[׳']/g, "'");
  return TOPIC_NORMALIZATION_MAP[cleaned] ?? 'unknown';
}

export async function loadQuestions(): Promise<Question[]> {
  const res = await fetch(QUIZ_CONFIG.QUESTIONS_CSV_PATH);
  if (!res.ok) throw new Error(`Failed to fetch questions CSV: ${res.status}`);
  const text = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse<RawRow>(text, {
      header: true,
      skipEmptyLines: true,
      encoding: 'utf-8',
      complete(results) {
        const questions: Question[] = results.data
          .filter(row => row.question_id && row.question_text)
          .map(row => ({
            id: parseInt(row.question_id, 10),
            topicId: normalizeTopicId(row.topic),
            text: row.question_text.trim(),
            options: [
              { key: 'A' as AnswerKey, text: row.option_a.trim() },
              { key: 'B' as AnswerKey, text: row.option_b.trim() },
              { key: 'C' as AnswerKey, text: row.option_c.trim() },
              { key: 'D' as AnswerKey, text: row.option_d.trim() },
            ],
            correctAnswer: row.correct_answer.trim().toUpperCase() as AnswerKey,
          }));
        resolve(questions);
      },
      error(err: Error) {
        reject(new Error(`CSV parse error: ${err.message}`));
      },
    });
  });
}
