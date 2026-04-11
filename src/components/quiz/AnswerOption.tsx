'use client';

import type { AnswerKey } from '@/types/question';
import Icon from '@/components/ui/Icon';

type AnswerState = 'default' | 'selected' | 'correct' | 'incorrect' | 'reveal-correct';

interface AnswerOptionProps {
  answerKey: AnswerKey;
  text: string;
  state: AnswerState;
  disabled: boolean;
  onClick: () => void;
}

const LABEL: Record<AnswerKey, string>    = { A: 'א', B: 'ב', C: 'ג', D: 'ד' };
const ALPHA: Record<AnswerKey, string>    = { A: 'A', B: 'B', C: 'C', D: 'D' };

interface StateStyle {
  card:  string;
  badge: string;
  text:  string;
}

const STYLES: Record<AnswerState, StateStyle> = {
  default: {
    card:  'bg-white border-[#D4EAE7] hover:border-[#3EB8A5] hover:bg-[#EAF7F5]',
    badge: 'bg-[#EAF7F5] text-[#94ADAB]',
    text:  'text-[#2F3A39]',
  },
  selected: {
    card:  'bg-[#EAF7F5] border-[#3EB8A5]',
    badge: 'bg-[#3EB8A5] text-white',
    text:  'text-[#2F3A39] font-600',
  },
  correct: {
    card:  'bg-[#EAFAF1] border-[#27AE60]',
    badge: 'bg-[#27AE60] text-white',
    text:  'text-[#1a6b3a] font-600',
  },
  incorrect: {
    card:  'bg-[#FDEDEC] border-[#E05252]',
    badge: 'bg-[#E05252] text-white',
    text:  'text-[#8b2222] font-600',
  },
  'reveal-correct': {
    card:  'bg-[#EAFAF1] border-[#27AE60] opacity-90',
    badge: 'bg-[#27AE60] text-white',
    text:  'text-[#1a6b3a] font-600',
  },
};

export default function AnswerOption({ answerKey, text, state, disabled, onClick }: AnswerOptionProps) {
  const s = STYLES[state];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'answer-btn w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-right',
        'transition-all cursor-pointer disabled:cursor-not-allowed',
        s.card,
      ].join(' ')}
    >
      {/* Letter badge */}
      <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-700 text-sm transition-all ${s.badge}`}>
        {ALPHA[answerKey]}
      </span>

      {/* Answer text */}
      <span className={`flex-1 text-sm leading-relaxed text-right ${s.text}`}>
        {text}
      </span>

      {/* Result icon */}
      {(state === 'correct' || state === 'reveal-correct') && (
        <Icon name="check-circle" size={20} strokeWidth={2} className="flex-shrink-0 text-[#27AE60]" />
      )}
      {state === 'incorrect' && (
        <Icon name="x-circle" size={20} strokeWidth={2} className="flex-shrink-0 text-[#E05252]" />
      )}
    </button>
  );
}
