'use client';

import type { QuizMode } from '@/types/quiz';
import Icon, { type IconName } from '@/components/ui/Icon';

interface ModeSelectorProps {
  selected: QuizMode;
  onChange: (mode: QuizMode) => void;
}

interface ModeOption {
  mode: QuizMode;
  title: string;
  description: string;
  icon: IconName;
}

const MODES: ModeOption[] = [
  {
    mode: 'single-topic',
    title: 'נושא בודד',
    description: 'תרגל שאלות מנושא אחד',
    icon: 'steering-wheel',
  },
  {
    mode: 'multi-topic',
    title: 'מספר נושאים',
    description: 'בחר נושאים לתרגול',
    icon: 'road',
  },
  {
    mode: 'full-exam',
    title: 'מבחן מלא',
    description: 'כל הנושאים — כמבחן אמיתי',
    icon: 'trophy',
  },
];

export default function ModeSelector({ selected, onChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {MODES.map(({ mode, title, description, icon }) => {
        const isSelected = selected === mode;
        return (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={[
              'text-right p-4 rounded-2xl border-2 transition-all cursor-pointer group',
              isSelected
                ? 'border-[#2DAE94] bg-white'
                : 'border-[#C8E8E3] bg-white hover:border-[#2DAE94]',
            ].join(' ')}
            style={isSelected ? { boxShadow: '0 0 0 3px rgba(45,174,148,0.15)' } : {}}
          >
            <div
              className={[
                'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all',
                isSelected ? 'bg-[#2DAE94] text-white' : 'bg-[#E8F8F4] text-[#2DAE94]',
              ].join(' ')}
            >
              <Icon name={icon} size={20} strokeWidth={1.75} />
            </div>
            <div className={`font-700 text-sm mb-1 ${isSelected ? 'text-[#1A8A72]' : 'text-[#1C3A35]'}`}>
              {title}
            </div>
            <div className="text-xs text-[#8AAFA8] leading-relaxed">{description}</div>
          </button>
        );
      })}
    </div>
  );
}
