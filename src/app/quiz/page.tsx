'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { useProgressStore } from '@/store/progressStore';
import QuestionCard from '@/components/quiz/QuestionCard';
import ResultsScreen from '@/components/quiz/ResultsScreen';
import { buildQuiz } from '@/lib/quiz/quizBuilder';
import Icon from '@/components/ui/Icon';

export default function QuizPage() {
  const router       = useRouter();
  const session      = useQuizStore(s => s.session);
  const startSession = useQuizStore(s => s.startSession);
  const resetQuiz    = useQuizStore(s => s.resetQuiz);
  const addSession   = useProgressStore(s => s.addSession);

  // Guard: redirect if no session
  useEffect(() => {
    if (!session) router.replace('/dashboard');
  }, [session, router]);

  // Save completed session to progress store (once)
  const savedRef = useRef(false);
  useEffect(() => {
    if (session?.status === 'completed' && session.result && !savedRef.current) {
      savedRef.current = true;
      addSession({
        topicIds: session.config.topicIds,
        mode: session.config.mode,
        score: session.result.score,
        correct: session.result.correct,
        total: session.result.total,
      });
    }
    if (session?.status === 'active') {
      savedRef.current = false;
    }
  }, [session?.status, session?.result, session?.config, addSession]);

  if (!session) return null;

  const isCompleted = session.status === 'completed';

  const handleRetry = async () => {
    const newSession = await buildQuiz(session.config);
    startSession(newSession);
  };

  return (
    <div className="min-h-screen bg-[#F6FAF9]" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-[#D4EAE7] sticky top-0 z-10"
        style={{ boxShadow: '0 1px 8px rgba(62,184,165,0.07)' }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="מכללת גלגלים" className="h-9 w-auto object-contain" />

          <div className="flex items-center gap-2">
            {!isCompleted && session.config.mode !== 'full-exam' && (
              <span className="text-xs font-600 text-[#4D6B67] bg-[#EAF7F5] px-3 py-1.5 rounded-full">
                {session.config.mode === 'single-topic' ? 'נושא בודד' : 'מספר נושאים'}
              </span>
            )}
            {!isCompleted && (
              <button
                onClick={() => {
                  if (window.confirm('האם לצאת מהמבחן? ההתקדמות לא תישמר.')) {
                    resetQuiz();
                    router.push('/dashboard');
                  }
                }}
                className="flex items-center gap-1.5 text-sm font-600 text-[#94ADAB] hover:text-[#E05252] transition-colors"
              >
                <Icon name="x-mark" size={16} />
                יציאה
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {isCompleted && session.result ? (
          <ResultsScreen result={session.result} onRetry={handleRetry} />
        ) : (
          <QuestionCard />
        )}
      </main>
    </div>
  );
}
