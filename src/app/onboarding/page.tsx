'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCourseStore, type CourseType } from '@/store/courseStore';
import Icon from '@/components/ui/Icon';
import IllustrationBg from '@/components/ui/IllustrationBg';

interface CourseOption {
  type: CourseType;
  title: string;
  subtitle: string;
  description: string;
  icon: 'truck' | 'car';
  tag: string;
}

const OPTIONS: CourseOption[] = [
  {
    type: 'moavil',
    title: 'קורס מוביל',
    subtitle: 'הרישיון המקצועי',
    description: 'תרגול שאלות עיוניות לקורס מוביל מקצועי — כולל מפרט טכני, בטיחות, תקנות ועוד',
    icon: 'truck',
    tag: 'זמין עכשיו',
  },
  {
    type: 'tsiburi',
    title: 'קורס ציבורי',
    subtitle: 'הסעת נוסעים',
    description: 'תרגול לנהגי הסעה ציבורית — תכנים בהכנה',
    icon: 'car',
    tag: 'בקרוב',
  },
];

export default function OnboardingPage() {
  const router         = useRouter();
  const courseType     = useCourseStore(s => s.courseType);
  const setCourseType  = useCourseStore(s => s.setCourseType);
  const [selected, setSelected]   = useState<CourseType | null>(null);
  const [saving, setSaving]       = useState(false);

  // If already selected, skip onboarding
  useEffect(() => {
    if (courseType !== null) router.replace('/dashboard');
  }, [courseType, router]);

  const handleContinue = async () => {
    if (!selected) return;
    setSaving(true);
    setCourseType(selected);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F6FAF9] flex flex-col" dir="rtl">
      {/* Header gradient */}
      <div
        className="px-6 pt-10 pb-8 md:py-14 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #EAF7F5 0%, #D6F0EC 100%)' }}
      >
        <IllustrationBg variant="onboarding" />

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="מכללת גלגלים" className="h-16 w-auto object-contain mx-auto mb-4" />
          <h1 className="text-xl font-800 text-[#2F3A39] mb-2 leading-snug">
            ברוכים הבאים!
          </h1>
          <p className="text-sm font-400 leading-relaxed text-[#4D6B67]">
            כדי להתאים לך את התרגולים,
            <br />בחר את סוג הקורס שלך
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 px-5 py-6 md:py-10 flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONS.map(opt => {
          const isSelected = selected === opt.type;
          const isSoon     = opt.type === 'tsiburi';

          return (
            <button
              key={opt.type}
              onClick={() => setSelected(opt.type)}
              className={[
                'option-card w-full text-right rounded-3xl p-5 border-2 transition-all',
                isSelected
                  ? 'border-[#3EB8A5] bg-white'
                  : 'border-[#D4EAE7] bg-white hover:border-[#3EB8A5]',
              ].join(' ')}
              style={isSelected ? { boxShadow: '0 0 0 4px rgba(62,184,165,0.15)' } : { boxShadow: '0 2px 10px rgba(62,184,165,0.07)' }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={[
                    'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all',
                    isSelected ? 'text-white' : 'text-[#3EB8A5]',
                  ].join(' ')}
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #3EB8A5, #2D9D8E)'
                      : '#EAF7F5',
                  }}
                >
                  <Icon name={opt.icon} size={26} strokeWidth={1.6} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-base font-800 ${isSelected ? 'text-[#2F3A39]' : 'text-[#2F3A39]'}`}>
                      {opt.title}
                    </span>
                    <span
                      className="text-[10px] font-700 px-2 py-0.5 rounded-full"
                      style={{
                        background: isSoon ? '#F0F7F5' : '#EAF7F5',
                        color:      isSoon ? '#8FACA9' : '#3EB8A5',
                      }}
                    >
                      {opt.tag}
                    </span>
                  </div>
                  <p className="text-xs font-500 text-[#4D6B67] mb-1">{opt.subtitle}</p>
                  <p className="text-xs text-[#8FACA9] leading-relaxed">{opt.description}</p>
                </div>

                {/* Radio */}
                <div
                  className={[
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all',
                    isSelected ? 'border-[#3EB8A5] bg-[#3EB8A5]' : 'border-[#D4EAE7] bg-white',
                  ].join(' ')}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
        </div>

        {/* CTA */}
        <div className="mt-4">
          <button
            onClick={handleContinue}
            disabled={!selected || saving}
            className="w-full py-4 rounded-2xl font-700 text-white text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={
              selected && !saving
                ? {
                    background: 'linear-gradient(135deg, #3EB8A5 0%, #2D9D8E 100%)',
                    boxShadow: '0 4px 20px rgba(62,184,165,0.40)',
                  }
                : { background: '#CFEDEA' }
            }
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                טוען...
              </span>
            ) : 'המשך'}
          </button>
        </div>
      </div>
    </div>
  );
}
