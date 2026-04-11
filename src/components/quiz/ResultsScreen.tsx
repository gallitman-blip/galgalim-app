'use client';

import { useRouter } from 'next/navigation';
import type { QuizResult } from '@/types/quiz';
import Icon from '@/components/ui/Icon';

interface ResultsScreenProps {
  result: QuizResult;
  onRetry: () => void;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 50;
  const circ   = 2 * Math.PI * radius;
  const offset = circ * (1 - score / 100);
  const isPassing = score >= 70;
  const isMid     = score >= 50 && !isPassing;
  const color = isPassing ? '#27AE60' : isMid ? '#F0A520' : '#E05252';
  const trackColor = isPassing ? '#EAFAF1' : isMid ? '#FEF9E7' : '#FDEDEC';
  const label = isPassing ? 'כל הכבוד!' : isMid ? 'כמעט שם...' : 'יש מקום לשיפור';

  return (
    <div className="flex flex-col items-center gap-3 score-pop">
      <svg width="132" height="132" viewBox="0 0 132 132">
        <circle cx="66" cy="66" r={radius} fill={trackColor} />
        <circle cx="66" cy="66" r={radius} fill="none" stroke="white" strokeWidth="8" />
        <circle
          cx="66" cy="66" r={radius}
          fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease' }}
        />
        <text x="66" y="59" textAnchor="middle" fontSize="30" fontWeight="800" fill={color} fontFamily="'Greycliff Hebrew CF', 'Assistant', sans-serif">
          {score}
        </text>
        <text x="66" y="80" textAnchor="middle" fontSize="11" fill="#94ADAB" fontFamily="'Greycliff Hebrew CF', 'Assistant', sans-serif">
          ניקוד
        </text>
      </svg>
      <span className="text-sm font-700 px-4 py-1.5 rounded-full" style={{ color, background: trackColor }}>
        {label}
      </span>
    </div>
  );
}

interface StatBoxProps { label: string; value: number; bg: string; fg: string; }
function StatBox({ label, value, bg, fg }: StatBoxProps) {
  return (
    <div className={`flex flex-col items-center gap-1 p-4 rounded-2xl ${bg}`}>
      <span className={`text-3xl font-800 ${fg}`}>{value}</span>
      <span className={`text-xs text-center leading-tight ${fg} opacity-75`}>{label}</span>
    </div>
  );
}

export default function ResultsScreen({ result, onRetry }: ResultsScreenProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto fade-up">
      {/* Score card */}
      <div className="bg-white rounded-3xl card-shadow-md p-6 text-center">
        <h2 className="text-lg font-700 text-[#2F3A39] mb-5">תוצאות המבחן</h2>
        <div className="flex justify-center mb-6">
          <ScoreRing score={result.score} />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatBox label="נכונות"   value={result.correct}    bg="bg-[#EAFAF1]" fg="text-[#1e8449]" />
          <StatBox label="שגויות"   value={result.incorrect}  bg="bg-[#FDEDEC]" fg="text-[#C84444]" />
          <StatBox label="לא נענו"  value={result.unanswered} bg="bg-[#F0F7F5]" fg="text-[#4D6B67]" />
        </div>
        <p className="text-xs text-[#94ADAB]">סה״כ {result.total} שאלות</p>
      </div>

      {/* Topic breakdown */}
      {result.topicBreakdown.length > 1 && (
        <div className="bg-white rounded-3xl card-shadow p-6">
          <h3 className="text-sm font-700 text-[#2F3A39] mb-4">פירוט לפי נושא</h3>
          <div className="flex flex-col gap-4">
            {result.topicBreakdown.map(tb => {
              const pct = Math.round((tb.correct / tb.total) * 100);
              const c   = pct >= 70 ? '#27AE60' : pct >= 50 ? '#F0A520' : '#E05252';
              return (
                <div key={tb.topicId}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-600 text-[#2F3A39]">{tb.topicName}</span>
                    <span className="text-xs font-700" style={{ color: c }}>{tb.correct}/{tb.total}</span>
                  </div>
                  <div className="w-full h-2 bg-[#EAF7F5] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: c }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-700 text-white text-sm transition-all"
          style={{ background: 'linear-gradient(135deg, #3EB8A5, #2D9D8E)', boxShadow: '0 4px 18px rgba(62,184,165,0.32)' }}
        >
          <Icon name="refresh" size={16} />
          נסה שוב
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-700 text-[#3EB8A5] text-sm border-2 border-[#D4EAE7] bg-white hover:bg-[#EAF7F5] transition-all"
        >
          <Icon name="home" size={16} />
          חזור לבית
        </button>
      </div>
    </div>
  );
}
