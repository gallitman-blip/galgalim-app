'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Question, AnswerKey } from '@/types/question';
import { useQuizStore } from '@/store/quizStore';
import { calculateResult } from '@/lib/quiz/scoreCalculator';
import { QUIZ_CONFIG } from '@/constants/quizConfig';
import { OFFICIAL_TOPICS } from '@/constants/topics';
import AnswerOption from './AnswerOption';
import CountdownTimer from './CountdownTimer';
import ProgressBar from './ProgressBar';
import Icon from '@/components/ui/Icon';

export default function QuestionCard() {
  const session          = useQuizStore(s => s.session);
  const highWaterMark    = useQuizStore(s => s.highWaterMark);
  const recordAnswer     = useQuizStore(s => s.recordAnswer);
  const advanceQuestion  = useQuizStore(s => s.advanceQuestion);
  const previousQuestion = useQuizStore(s => s.previousQuestion);
  const completeQuiz     = useQuizStore(s => s.completeQuiz);
  const setTimerActive   = useQuizStore(s => s.setTimerActive);

  const [revealed, setRevealed]       = useState(false);
  const [selectedKey, setSelectedKey] = useState<AnswerKey | null>(null);
  const [timedOut, setTimedOut]       = useState(false);

  if (!session || session.status !== 'active') return null;

  const { questions, currentIndex } = session;
  const question: Question  = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast  = currentIndex === questions.length - 1;
  const topicName = OFFICIAL_TOPICS.find(t => t.id === question.topicId)?.name ?? '';

  // Restore state when navigating to a previously answered question
  useEffect(() => {
    const alreadySubmitted = currentIndex < highWaterMark;
    if (alreadySubmitted) {
      const existingAnswer = session.answers[question.id];
      setRevealed(true);
      setTimedOut(existingAnswer === null || typeof existingAnswer !== 'string');
      setSelectedKey(typeof existingAnswer === 'string' ? (existingAnswer as AnswerKey) : null);
    } else {
      setRevealed(false);
      setSelectedKey(null);
      setTimedOut(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const advance = useCallback(() => {
    if (isLast) {
      const result = calculateResult({
        ...session,
        answers: useQuizStore.getState().session!.answers,
      });
      completeQuiz(result);
    } else {
      advanceQuestion();
    }
  }, [isLast, session, completeQuiz, advanceQuestion]);

  const handleAnswer = useCallback((key: AnswerKey) => {
    if (revealed) return;
    setSelectedKey(key);
    setRevealed(true);
    setTimedOut(false);
    setTimerActive(false);
    recordAnswer(question.id, key);
    // No auto-advance — user presses "הבא"
  }, [revealed, recordAnswer, question.id, setTimerActive]);

  const handleTimerExpire = useCallback(() => {
    if (revealed) return;
    setTimerActive(false);
    recordAnswer(question.id, null);
    setRevealed(true);
    setTimedOut(true);
    setSelectedKey(null);
    // No auto-advance — user presses "הבא"
  }, [revealed, recordAnswer, question.id, setTimerActive]);

  function getOptionState(key: AnswerKey): 'default' | 'selected' | 'correct' | 'incorrect' | 'reveal-correct' {
    if (!revealed) return selectedKey === key ? 'selected' : 'default';
    if (key === question.correctAnswer) return 'correct';
    if (key === selectedKey) return 'incorrect';
    return 'default';
  }

  return (
    <div className="flex flex-col gap-4 fade-up" dir="rtl">
      {/* Progress bar + timer */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>
        <CountdownTimer onExpire={handleTimerExpire} />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-3xl card-shadow p-6">
        <span className="inline-block text-[11px] font-700 text-[#3EB8A5] bg-[#EAF7F5] px-3 py-1.5 rounded-full mb-4">
          {topicName}
        </span>

        {/* Timer-expired notice */}
        {timedOut && (
          <div className="flex items-center gap-2 bg-[#FFF4E0] border border-[#F5D68A] rounded-xl px-3 py-2 mb-4 text-xs font-600 text-[#B07A10]">
            <Icon name="clock" size={14} strokeWidth={2} />
            פג הזמן — התשובה הנכונה מסומנת למטה
          </div>
        )}

        <p className="text-base font-600 text-[#2F3A39] leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map(opt => (
          <AnswerOption
            key={opt.key}
            answerKey={opt.key}
            text={opt.text}
            state={getOptionState(opt.key)}
            disabled={revealed}
            onClick={() => handleAnswer(opt.key)}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-1">
        {/* הקודם — previous */}
        <button
          onClick={() => previousQuestion()}
          disabled={isFirst}
          className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-2xl border-2 border-[#D4EAE7] text-sm font-700 text-[#4D6B67] bg-white transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:border-[#3EB8A5] hover:not-disabled:text-[#3EB8A5]"
        >
          <Icon name="arrow-right" size={16} strokeWidth={2} />
          הקודם
        </button>

        {/* הבא — next */}
        <button
          onClick={advance}
          disabled={!revealed}
          className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl text-sm font-700 text-white transition-all disabled:opacity-35 disabled:cursor-not-allowed"
          style={
            revealed
              ? {
                  background: 'linear-gradient(135deg, #3EB8A5 0%, #2D9D8E 100%)',
                  boxShadow: '0 4px 18px rgba(47,175,159,0.35)',
                }
              : { background: '#B8D8D4' }
          }
        >
          {isLast ? 'סיים' : 'הבא'}
          <Icon name="arrow-left" size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
