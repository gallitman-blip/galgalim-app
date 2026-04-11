'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-600 text-[#94ADAB]">שאלה {current} מתוך {total}</span>
        <span className="text-xs font-700 text-[#3EB8A5]">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-[#D4EAE7] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3EB8A5, #2D9D8E)',
          }}
        />
      </div>
    </div>
  );
}
