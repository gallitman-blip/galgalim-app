'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Topic } from '@/types/question';
import { getAllTopics } from '@/lib/data/questionBank';
import { buildQuiz } from '@/lib/quiz/quizBuilder';
import { useQuizStore } from '@/store/quizStore';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { useCourseStore } from '@/store/courseStore';
import CourseCard from '@/components/dashboard/CourseCard';
import BottomNav from '@/components/ui/BottomNav';
import TopNav from '@/components/ui/TopNav';
import Icon from '@/components/ui/Icon';
import IllustrationBg from '@/components/ui/IllustrationBg';

export default function DashboardPage() {
  const router            = useRouter();
  const logout            = useAuthStore(s => s.logout);
  const startSession      = useQuizStore(s => s.startSession);
  const resetQuiz         = useQuizStore(s => s.resetQuiz);
  const courseType        = useCourseStore(s => s.courseType);
  const getTopicScore     = useProgressStore(s => s.getTopicScore);
  const getTopicPractices = useProgressStore(s => s.getTopicPractices);
  const getOverallScore   = useProgressStore(s => s.getOverallScore);
  const getTotalPractices = useProgressStore(s => s.getTotalPractices);

  const [topics, setTopics]               = useState<Topic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [startingId, setStartingId]       = useState<string | null>(null);
  const [startingFull, setStartingFull]   = useState(false);
  const [user, setUser]                   = useState<{ displayName: string } | null>(null);

  useEffect(() => {
    if (courseType === null) router.replace('/onboarding');
  }, [courseType, router]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getAllTopics().then(t => { setTopics(t); setLoadingTopics(false); });
  }, []);

  const startTopic = useCallback(async (topicId: string) => {
    setStartingId(topicId);
    resetQuiz();
    const session = await buildQuiz({ mode: 'single-topic', topicIds: [topicId] });
    startSession(session);
    router.push('/quiz');
  }, [resetQuiz, startSession, router]);

  const startFullExam = useCallback(async () => {
    setStartingFull(true);
    resetQuiz();
    const session = await buildQuiz({ mode: 'full-exam', topicIds: [] });
    startSession(session);
    router.push('/quiz');
  }, [resetQuiz, startSession, router]);

  const overallScore   = getOverallScore();
  const totalPractices = getTotalPractices();
  const hour           = new Date().getHours();
  const greeting       = hour < 12 ? 'בוקר טוב' : hour < 17 ? 'צהריים טובים' : 'ערב טוב';
  const firstName      = user?.displayName?.split(' ')[0] ?? '';
  const isTsiburi      = courseType === 'tsiburi';

  if (courseType === null) return null;

  return (
    <div className="min-h-screen bg-[#F6FAF9]" dir="rtl">
      <TopNav />

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EAF7F5 0%, #D6F0EC 100%)' }}
      >
        <IllustrationBg variant="dashboard" />

        {/* Mobile top bar — desktop uses TopNav */}
        <div className="md:hidden relative flex justify-between items-center px-5 pt-5 pb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="מכללת גלגלים" className="h-9 w-auto object-contain" />
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] font-700 px-3 py-1 rounded-full"
              style={{ background: 'rgba(62,184,165,0.18)', color: '#2D9D8E' }}
            >
              {isTsiburi ? 'קורס ציבורי' : 'קורס מוביל'}
            </span>
            <button onClick={logout} style={{ color: '#8FACA9' }} className="hover:text-[#3EB8A5] transition-colors">
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 pt-4 pb-6 md:pt-10 md:pb-12">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-end">
            {/* Left: greeting + progress */}
            <div>
              <p className="text-sm md:text-base text-[#4D6B67] mb-1">
                {greeting}{firstName ? ',' : ''}
              </p>
              <h1 className="text-2xl md:text-4xl font-800 text-[#2F3A39] mb-5 md:mb-6">
                {firstName ? `${firstName}!` : 'שלום!'}
              </h1>
              <div className="bg-white rounded-2xl p-4 md:p-5 card-shadow-md">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-sm font-700 text-[#2F3A39]">התקדמות כללית</span>
                  <span className="text-sm font-800 text-[#3EB8A5]">
                    {totalPractices > 0 ? `${overallScore}%` : '—'}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#EAF7F5] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: totalPractices > 0 ? `${overallScore}%` : '0%',
                      background: 'linear-gradient(90deg, #3EB8A5, #2D9D8E)',
                    }}
                  />
                </div>
                <p className="text-xs text-[#8FACA9] mt-2">
                  {totalPractices > 0
                    ? `${totalPractices} תרגולים הושלמו`
                    : 'טרם הושלמו תרגולים — התחל עכשיו'}
                </p>
              </div>
            </div>

            {/* Desktop right: quick stats */}
            <div className="hidden md:flex items-end gap-5 pb-1">
              {[
                { label: 'תרגולים הושלמו', value: String(totalPractices) },
                { label: 'ציון ממוצע',      value: totalPractices > 0 ? `${overallScore}%` : '—' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/75 backdrop-blur-sm rounded-2xl px-7 py-5 text-center min-w-[130px]"
                  style={{ boxShadow: '0 2px 12px rgba(62,184,165,0.10)' }}
                >
                  <div className="text-3xl font-800 text-[#2F3A39]">{stat.value}</div>
                  <div className="text-xs text-[#4D6B67] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6 md:pt-8 pb-24 md:pb-14 flex flex-col gap-5 md:gap-7">

        {isTsiburi ? (
          <div className="bg-white rounded-3xl card-shadow p-8 md:p-12 text-center fade-up max-w-lg mx-auto">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #EAF7F5, #CFEDEA)' }}
            >
              <Icon name="car" size={36} className="text-[#3EB8A5]" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-800 text-[#2F3A39] mb-2">התכנים בדרך!</h2>
            <p className="text-sm text-[#8FACA9] leading-relaxed mb-6">
              התכנים לקורס הציבורי יעלו בקרוב.
              <br />בינתיים תוכל להחליף לקורס מוביל ולהתחיל לתרגל.
            </p>
            <button
              onClick={() => router.push('/profile')}
              className="px-6 py-3 rounded-2xl text-sm font-700 text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #3EB8A5, #2D9D8E)', boxShadow: '0 4px 16px rgba(62,184,165,0.30)' }}
            >
              שנה סוג קורס
            </button>
          </div>
        ) : (
          <>
            {/* Full exam banner */}
            <button
              onClick={startFullExam}
              disabled={startingFull}
              className="w-full flex items-center gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl text-right transition-all fade-up disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #3EB8A5 0%, #2D9D8E 100%)',
                boxShadow: '0 4px 20px rgba(62,184,165,0.32)',
              }}
            >
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Icon name="trophy" size={22} className="text-white" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <div className="text-white font-700 text-sm md:text-base">מבחן מלא</div>
                <div className="text-white/70 text-xs md:text-sm mt-0.5">כל 120 השאלות מכל הנושאים</div>
              </div>
              {startingFull ? (
                <svg className="animate-spin w-5 h-5 text-white/60" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <Icon name="chevron-left" size={20} className="text-white/50" />
              )}
            </button>

            {/* Course grid */}
            <div className="fade-up delay-75">
              <h2 className="text-sm md:text-base font-700 text-[#2F3A39] mb-4 px-0.5">קורסים זמינים</h2>
              {loadingTopics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-52 rounded-3xl animate-pulse bg-[#CFEDEA]" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic, i) => (
                    <div key={topic.id} className={`slide-up delay-${Math.min(i * 75, 300)}`}>
                      <CourseCard
                        topic={topic}
                        progress={getTopicScore(topic.id)}
                        practices={getTopicPractices(topic.id)}
                        onClick={() => startTopic(topic.id)}
                        loading={startingId === topic.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
