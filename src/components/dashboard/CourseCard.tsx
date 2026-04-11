'use client';

import type { Topic } from '@/types/question';
import Icon, { TOPIC_ICON } from '@/components/ui/Icon';

interface CourseCardProps {
  topic: Topic;
  progress: number;    // 0–100 from progressStore
  practices: number;   // completed sessions count
  onClick: () => void;
  loading?: boolean;
}

export default function CourseCard({ topic, progress, practices, onClick, loading }: CourseCardProps) {
  const iconName   = TOPIC_ICON[topic.id] ?? 'road';
  const hasStarted = practices > 0;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="course-card w-full h-full text-right rounded-3xl p-5 flex flex-col gap-4 cursor-pointer disabled:opacity-60"
      style={{
        background: 'linear-gradient(135deg, #DFF5F2 0%, #BFE9E3 100%)',
        boxShadow: '0 4px 20px rgba(62, 184, 165, 0.15)',
      }}
    >
      {/* Top row: icon + progress % */}
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(62, 184, 165, 0.18)' }}
        >
          <Icon name={iconName} size={22} className="text-[#2D9D8E]" strokeWidth={1.75} />
        </div>

        {hasStarted && (
          <span
            className="text-lg font-800"
            style={{ color: progress >= 70 ? '#2D9D8E' : progress >= 50 ? '#C07A10' : '#C04040' }}
          >
            {progress}%
          </span>
        )}
      </div>

      {/* Course name */}
      <div>
        <h3 className="text-[#2F3A39] font-700 text-sm leading-snug mb-0.5">{topic.name}</h3>
        <p className="text-[11px] text-[#4D6B67]">
          {topic.questionCount} שאלות
          {practices > 0 ? ` · ${practices} תרגולים` : ''}
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div
          className="w-full h-1.5 rounded-full"
          style={{ background: 'rgba(62,184,165,0.20)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: progress >= 70
                ? 'linear-gradient(90deg, #3EB8A5, #2D9D8E)'
                : progress >= 50
                ? 'linear-gradient(90deg, #F0A520, #F4C060)'
                : progress > 0
                ? 'linear-gradient(90deg, #E05252, #E88080)'
                : 'transparent',
            }}
          />
        </div>
      </div>

      {/* Button */}
      <div className="flex mt-auto">
        <span
          className="px-5 py-2 rounded-xl text-sm font-700 text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #3EB8A5, #2D9D8E)' }}
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              טוען...
            </span>
          ) : hasStarted ? 'המשך' : 'התחל'}
        </span>
      </div>
    </button>
  );
}
