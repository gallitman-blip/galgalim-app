'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { useCourseStore, type CourseType } from '@/store/courseStore';
import Icon from '@/components/ui/Icon';
import BottomNav from '@/components/ui/BottomNav';
import TopNav from '@/components/ui/TopNav';
import IllustrationBg from '@/components/ui/IllustrationBg';

interface AppUser { displayName: string; username: string; }

function getLevelInfo(p: number): { level: number; title: string } {
  if (p >= 50) return { level: 8, title: 'מומחה' };
  if (p >= 30) return { level: 6, title: 'מנוסה' };
  if (p >= 20) return { level: 5, title: 'מתקדם' };
  if (p >= 10) return { level: 4, title: 'מתאמן' };
  if (p >= 5)  return { level: 3, title: 'מתחיל מתקדם' };
  if (p >= 2)  return { level: 2, title: 'מתחיל' };
  return { level: 1, title: 'חדש' };
}

interface ToggleProps { on: boolean; onChange: (v: boolean) => void; }
function Toggle({ on, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="w-12 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0"
      style={{ background: on ? '#3EB8A5' : '#D4EAE7' }}
    >
      <div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200"
        style={{ transform: on ? 'translateX(-28px)' : 'translateX(-4px)', right: 0 }}
      />
    </button>
  );
}

function CourseSheet({
  current, onSelect, onClose,
}: {
  current: CourseType | null;
  onSelect: (t: CourseType) => void;
  onClose: () => void;
}) {
  const options: { type: CourseType; label: string; tag?: string }[] = [
    { type: 'moavil',  label: 'קורס מוביל',  tag: 'זמין עכשיו' },
    { type: 'tsiburi', label: 'קורס ציבורי', tag: 'בקרוב' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-3xl md:rounded-3xl p-6 pb-10 md:pb-8 scale-in max-w-[440px] mx-auto md:mx-auto">
        <div className="w-10 h-1 bg-[#D4EAE7] rounded-full mx-auto mb-5 md:hidden" />
        <h3 className="text-base font-700 text-[#2F3A39] mb-4 text-center">שינוי סוג קורס</h3>
        <div className="flex flex-col gap-3">
          {options.map(o => (
            <button
              key={o.type}
              onClick={() => { onSelect(o.type); onClose(); }}
              className={[
                'flex items-center justify-between p-4 rounded-2xl border-2 text-right transition-all',
                current === o.type
                  ? 'border-[#3EB8A5] bg-[#EAF7F5]'
                  : 'border-[#D4EAE7] bg-white hover:border-[#3EB8A5]',
              ].join(' ')}
            >
              <div>
                <div className="font-700 text-sm text-[#2F3A39]">{o.label}</div>
                {o.tag && (
                  <div className="text-xs mt-0.5" style={{ color: o.type === 'moavil' ? '#3EB8A5' : '#8FACA9' }}>
                    {o.tag}
                  </div>
                )}
              </div>
              {current === o.type && (
                <div className="w-5 h-5 rounded-full bg-[#3EB8A5] flex items-center justify-center">
                  <Icon name="check" size={11} strokeWidth={2.5} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router            = useRouter();
  const logout            = useAuthStore(s => s.logout);
  const courseType        = useCourseStore(s => s.courseType);
  const setCourseType     = useCourseStore(s => s.setCourseType);
  const getTotalPractices = useProgressStore(s => s.getTotalPractices);
  const getAverageScore   = useProgressStore(s => s.getAverageScore);
  const clearProgress     = useProgressStore(s => s.clearProgress);

  const [user, setUser]                     = useState<AppUser | null>(null);
  const [notifications, setNotifications]   = useState(true);
  const [showCourseSheet, setShowCourseSheet] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user); })
      .catch(() => {});
  }, []);

  const totalPractices = getTotalPractices();
  const avgScore       = getAverageScore();
  const { level, title } = getLevelInfo(totalPractices);
  const initials     = user?.displayName?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() ?? '?';
  const courseLabel  = courseType === 'moavil' ? 'קורס מוביל' : courseType === 'tsiburi' ? 'קורס ציבורי' : '—';

  const settingsRows = [
    { icon: 'user' as const,          label: 'פרטי חשבון',        sub: null,        action: null,      chevron: true },
    { icon: 'bell' as const,          label: 'התראות',             sub: null,        action: 'toggle',  chevron: false },
    { icon: 'truck' as const,         label: 'סוג קורס',           sub: courseLabel, action: 'course',  chevron: true },
    { icon: 'cog' as const,           label: 'הגדרות אפליקציה',   sub: null,        action: null,      chevron: true },
    { icon: 'map-pin' as const,       label: 'עזרה ותמיכה',       sub: null,        action: null,      chevron: true },
  ];

  return (
    <div className="min-h-screen bg-[#F6FAF9] pb-24 md:pb-14" dir="rtl">
      <TopNav />

      {/* Mobile hero header — hidden on desktop */}
      <div
        className="relative overflow-hidden md:hidden px-5 pt-6 pb-8 text-center"
        style={{ background: 'linear-gradient(135deg, #EAF7F5 0%, #D6F0EC 100%)' }}
      >
        <IllustrationBg variant="profile" />
        <div className="relative">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-800 text-white"
          style={{ background: 'linear-gradient(135deg, #3EB8A5, #2D9D8E)' }}
        >
          {initials}
        </div>
        <h1 className="text-xl font-800 text-[#2F3A39]">{user?.displayName ?? '...'}</h1>
        <p className="text-sm mt-0.5 text-[#4D6B67]">{user?.username ?? ''}</p>
        <div className="flex justify-center mt-3">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-700"
            style={{ background: 'rgba(62,184,165,0.18)', color: '#2D9D8E' }}
          >
            רמה {level} · {title}
          </span>
        </div>
        <div className="flex justify-center gap-8 mt-5">
          <div className="text-center">
            <div className="text-xl font-800 text-[#2F3A39]">{totalPractices}</div>
            <div className="text-xs text-[#4D6B67]">תרגולים</div>
          </div>
          <div className="w-px bg-[#CFEDEA]" />
          <div className="text-center">
            <div className="text-xl font-800 text-[#2F3A39]">
              {totalPractices > 0 ? `${avgScore}%` : '—'}
            </div>
            <div className="text-xs text-[#4D6B67]">ממוצע</div>
          </div>
        </div>
        </div>{/* /relative */}
      </div>

      {/* Main content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 pt-5 md:pt-8 flex flex-col gap-4 md:gap-6">
        <div className="md:flex md:gap-8 md:items-start">

          {/* Desktop left sidebar: profile card */}
          <div className="hidden md:flex flex-col gap-5 w-72 flex-shrink-0">
            <div
              className="bg-white rounded-3xl card-shadow p-6 text-center"
              style={{ background: 'linear-gradient(135deg, #EAF7F5 0%, #D6F0EC 100%)' }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-800 text-white"
                style={{ background: 'linear-gradient(135deg, #3EB8A5, #2D9D8E)' }}
              >
                {initials}
              </div>
              <h2 className="text-xl font-800 text-[#2F3A39]">{user?.displayName ?? '...'}</h2>
              <p className="text-sm text-[#4D6B67] mt-0.5">{user?.username ?? ''}</p>
              <div className="flex justify-center mt-3">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-700"
                  style={{ background: 'rgba(62,184,165,0.22)', color: '#2D9D8E' }}
                >
                  רמה {level} · {title}
                </span>
              </div>
            </div>

            {/* Stats card */}
            <div className="bg-white rounded-3xl card-shadow p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center py-3 rounded-2xl bg-[#F0F7F5]">
                  <div className="text-2xl font-800 text-[#2F3A39]">{totalPractices}</div>
                  <div className="text-xs text-[#4D6B67] mt-1">תרגולים</div>
                </div>
                <div className="text-center py-3 rounded-2xl bg-[#F0F7F5]">
                  <div className="text-2xl font-800 text-[#2F3A39]">
                    {totalPractices > 0 ? `${avgScore}%` : '—'}
                  </div>
                  <div className="text-xs text-[#4D6B67] mt-1">ממוצע</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right / full on mobile: settings + actions */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Settings card */}
            <div className="bg-white rounded-3xl card-shadow slide-up">
              {settingsRows.map((row, idx) => (
                <div
                  key={row.label}
                  className={[
                    'flex items-center gap-4 px-5 py-4',
                    idx < settingsRows.length - 1 ? 'border-b border-[#F0F7F5]' : '',
                    row.action === 'course' ? 'cursor-pointer' : '',
                  ].join(' ')}
                  onClick={row.action === 'course' ? () => setShowCourseSheet(true) : undefined}
                  role={row.action === 'course' ? 'button' : undefined}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EAF7F5] flex items-center justify-center flex-shrink-0">
                    <Icon name={row.icon} size={17} className="text-[#3EB8A5]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-600 text-[#2F3A39]">{row.label}</div>
                    {row.sub && <div className="text-xs text-[#8FACA9] mt-0.5">{row.sub}</div>}
                  </div>
                  {row.action === 'toggle' ? (
                    <Toggle on={notifications} onChange={setNotifications} />
                  ) : row.chevron ? (
                    <Icon name="chevron-right" size={16} className="text-[#CFEDEA]" />
                  ) : null}
                </div>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full py-4 rounded-2xl font-700 text-white text-sm transition-all slide-up delay-100"
              style={{
                background: 'linear-gradient(135deg, #3EB8A5, #2D9D8E)',
                boxShadow: '0 4px 18px rgba(62,184,165,0.28)',
              }}
            >
              התנתקות
            </button>

            {totalPractices > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('האם למחוק את כל נתוני ההתקדמות?')) clearProgress();
                }}
                className="text-xs text-[#8FACA9] text-center py-1 hover:text-[#E05252] transition-colors slide-up delay-200"
              >
                מחק את כל נתוני ההתקדמות
              </button>
            )}
          </div>
        </div>
      </main>

      <BottomNav />

      {showCourseSheet && (
        <CourseSheet
          current={courseType}
          onSelect={(t) => { setCourseType(t); }}
          onClose={() => setShowCourseSheet(false)}
        />
      )}
    </div>
  );
}
