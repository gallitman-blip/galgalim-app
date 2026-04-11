'use client';

import { useMemo } from 'react';
import { useProgressStore } from '@/store/progressStore';
import { OFFICIAL_TOPICS } from '@/constants/topics';
import Icon, { TOPIC_ICON } from '@/components/ui/Icon';
import Badge from '@/components/ui/Badge';
import BottomNav from '@/components/ui/BottomNav';
import TopNav from '@/components/ui/TopNav';
import IllustrationBg from '@/components/ui/IllustrationBg';

interface TopicStat {
  id: string;
  name: string;
  score: number;
  practices: number;
}

interface AchievementDef {
  id: string;
  label: string;
  icon: 'trophy' | 'star' | 'check-circle' | 'shield-check';
  condition: (s: ReturnType<typeof useProgressStore.getState>) => boolean;
}

const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first',      label: 'צעד ראשון',   icon: 'star',         condition: s => s.getTotalPractices() >= 1 },
  { id: 'ten',        label: '10 תרגולים',   icon: 'check-circle', condition: s => s.getTotalPractices() >= 10 },
  { id: 'highscore',  label: 'ציון 90+',     icon: 'trophy',       condition: s => s.sessions.some(x => x.score >= 90) },
  { id: 'perfectrun', label: 'ציון מלא',     icon: 'trophy',       condition: s => s.sessions.some(x => x.score === 100) },
  { id: 'allTopics',  label: 'כל הנושאים',  icon: 'shield-check', condition: s => {
    const topicsSeen = new Set(s.sessions.flatMap(x => x.topicIds));
    return OFFICIAL_TOPICS.every(t => topicsSeen.has(t.id));
  }},
];

function RingProgress({ value }: { value: number }) {
  const r = 18, circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  const color  = value >= 70 ? '#3EB8A5' : value >= 50 ? '#F0A520' : value > 0 ? '#E05252' : '#D4EAE7';

  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#EAF7F5" strokeWidth="4" />
      <circle
        cx="22" cy="22" r={r}
        fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.7s ease' }}
      />
      <text x="22" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill={color}
        fontFamily="'Greycliff Hebrew CF','Assistant',sans-serif">
        {value > 0 ? `${value}%` : '—'}
      </text>
    </svg>
  );
}

export default function ProgressPage() {
  const sessions              = useProgressStore(s => s.sessions);
  const getTopicScore         = useProgressStore(s => s.getTopicScore);
  const getTopicPractices     = useProgressStore(s => s.getTopicPractices);
  const getTotalPractices     = useProgressStore(s => s.getTotalPractices);
  const getAverageScore       = useProgressStore(s => s.getAverageScore);
  const getTotalQuestionsAnswered = useProgressStore(s => s.getTotalQuestionsAnswered);

  const totalPractices = getTotalPractices();
  const avgScore       = getAverageScore();
  const totalQ         = getTotalQuestionsAnswered();
  const studyMins      = Math.round(totalQ * 0.5);
  const studyHours     = studyMins >= 60 ? `${(studyMins / 60).toFixed(1)}` : `${studyMins}`;
  const studyUnit      = studyMins >= 60 ? 'שעות' : 'דקות';

  const topicStats: TopicStat[] = useMemo(() =>
    OFFICIAL_TOPICS.map(t => ({
      id: t.id,
      name: t.name,
      score: getTopicScore(t.id),
      practices: getTopicPractices(t.id),
    })),
    [sessions] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const earnedAchievements = ACHIEVEMENTS.filter(a =>
    a.condition(useProgressStore.getState())
  );

  const lastSession = sessions.length > 0
    ? sessions[sessions.length - 1]
    : null;

  const statCards = [
    { value: studyHours, unit: studyUnit, label: 'זמן לימוד' },
    { value: String(totalPractices), unit: '', label: 'תרגולים' },
    { value: totalPractices > 0 ? `${avgScore}%` : '—', unit: '', label: 'ממוצע ציונים' },
  ];

  return (
    <div className="min-h-screen bg-[#F6FAF9] pb-24 md:pb-14" dir="rtl">
      <TopNav />

      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-5 pb-6 md:py-10"
        style={{ background: 'linear-gradient(135deg, #EAF7F5 0%, #D6F0EC 100%)' }}
      >
        <IllustrationBg variant="progress" />
        <div className="relative z-10 max-w-[1200px] mx-auto md:px-3">
          <h1 className="text-xl md:text-3xl font-800 text-[#2F3A39] mb-1">המסע שלי</h1>
          <p className="text-sm md:text-base text-[#4D6B67]">עקוב אחר ההתקדמות שלך</p>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 pt-5 md:pt-8 flex flex-col gap-5 md:gap-7">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 slide-up">
          {statCards.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 card-shadow text-center">
              <div className="text-xl md:text-3xl font-800 text-[#2F3A39]">
                {s.value}
                {s.unit && <span className="text-sm md:text-base font-600 text-[#8FACA9] ml-1">{s.unit}</span>}
              </div>
              <div className="text-xs md:text-sm text-[#8FACA9] mt-0.5 md:mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Desktop: 2-col grid; Mobile: stacked */}
        <div className="md:grid md:grid-cols-3 md:gap-7 flex flex-col gap-5">

          {/* Topic progress — spans 2 cols on desktop */}
          <div className="md:col-span-2 bg-white rounded-3xl card-shadow p-5 md:p-7 slide-up delay-100">
            <h2 className="text-sm md:text-base font-700 text-[#2F3A39] mb-4 md:mb-5">התקדמות לפי נושא</h2>
            <div className="flex flex-col gap-4 md:gap-5">
              {topicStats.map(t => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#EAF7F5] text-[#3EB8A5]">
                    <Icon name={TOPIC_ICON[t.id] ?? 'road'} size={17} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-600 text-[#2F3A39] truncate mb-1.5">{t.name}</p>
                    <div className="w-full h-1.5 bg-[#EAF7F5] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${t.score}%`,
                          background: t.score >= 70 ? '#3EB8A5' : t.score >= 50 ? '#F0A520' : t.score > 0 ? '#E05252' : 'transparent',
                        }}
                      />
                    </div>
                  </div>
                  <RingProgress value={t.score} />
                </div>
              ))}
            </div>
          </div>

          {/* Right column: last session + achievements + empty state */}
          <div className="flex flex-col gap-5">

            {/* Last session */}
            {lastSession && (
              <div
                className="rounded-3xl p-5 md:p-6 slide-up delay-200"
                style={{ background: 'linear-gradient(135deg, #DFF5F2, #BFE9E3)' }}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-700 text-[#2F3A39]">
                    {lastSession.score >= 70 ? '🎉 כל הכבוד!' : 'תרגול אחרון'}
                  </h3>
                  <span
                    className="text-xl font-800"
                    style={{ color: lastSession.score >= 70 ? '#2D9D8E' : lastSession.score >= 50 ? '#B07A10' : '#C04040' }}
                  >
                    {lastSession.score}%
                  </span>
                </div>
                <p className="text-xs mb-3 text-[#4D6B67]">
                  {lastSession.correct} נכון מתוך {lastSession.total} · {new Date(lastSession.completedAt).toLocaleDateString('he-IL')}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {lastSession.score >= 90 && (
                    <Badge color="brand" variant="soft" icon="trophy">ניקוד מצוין</Badge>
                  )}
                  {lastSession.score === 100 && (
                    <Badge color="green" variant="soft" icon="star">ציון מלא!</Badge>
                  )}
                  {lastSession.score < 50 && (
                    <Badge color="gray" variant="soft">המשך לתרגל</Badge>
                  )}
                </div>
              </div>
            )}

            {/* Achievements */}
            {earnedAchievements.length > 0 && (
              <div className="bg-white rounded-3xl card-shadow p-5 md:p-6 slide-up delay-300">
                <h2 className="text-sm md:text-base font-700 text-[#2F3A39] mb-3">הישגים</h2>
                <div className="flex flex-wrap gap-2">
                  {earnedAchievements.map(a => (
                    <Badge key={a.id} color="brand" variant="soft" icon={a.icon}>{a.label}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* No sessions yet */}
            {sessions.length === 0 && (
              <div className="bg-white rounded-3xl card-shadow p-8 text-center slide-up delay-200">
                <div className="w-16 h-16 rounded-full bg-[#EAF7F5] flex items-center justify-center mx-auto mb-4">
                  <Icon name="road" size={28} className="text-[#8FACA9]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-700 text-[#2F3A39] mb-1">עדיין אין נתונים</h3>
                <p className="text-sm text-[#8FACA9]">השלם תרגול ראשון כדי לראות את ההתקדמות שלך</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
