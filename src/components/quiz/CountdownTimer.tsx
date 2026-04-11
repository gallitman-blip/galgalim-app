'use client';

import { useEffect, useRef } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { QUIZ_CONFIG } from '@/constants/quizConfig';

const SIZE = 68;
const STROKE = 4.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;

interface CountdownTimerProps {
  onExpire: () => void;
}

export default function CountdownTimer({ onExpire }: CountdownTimerProps) {
  const timeRemaining = useQuizStore(s => s.timeRemaining);
  const timerActive   = useQuizStore(s => s.timerActive);
  const tickTimer     = useQuizStore(s => s.tickTimer);
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef   = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!timerActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => tickTimer(), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerActive, tickTimer]);

  useEffect(() => {
    if (timeRemaining === 0 && timerActive) onExpireRef.current();
  }, [timeRemaining, timerActive]);

  const pct   = timeRemaining / QUIZ_CONFIG.TIMER_SECONDS;
  const offset = CIRC * (1 - pct);

  const isLow  = timeRemaining <= 7;
  const isMid  = timeRemaining <= 15 && !isLow;
  const color  = isLow ? '#E05252' : isMid ? '#F0A520' : '#3EB8A5';
  const bgColor = isLow ? '#FDEDEC' : isMid ? '#FEF9E7' : '#EAF7F5';

  return (
    <div className={`relative ${isLow ? 'timer-urgent' : ''}`} style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Background fill */}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill={bgColor} />
        {/* Track ring */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          fill="none" stroke={bgColor} strokeWidth={STROKE}
        />
        {/* Progress ring */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          fill="none" stroke={color} strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s',
          }}
        />
        {/* Number */}
        <text
          x={SIZE / 2} y={SIZE / 2 + 6}
          textAnchor="middle"
          fontSize="17"
          fontWeight="800"
          fontFamily="'Greycliff Hebrew CF', 'Assistant', sans-serif"
          fill={color}
        >
          {timeRemaining}
        </text>
      </svg>
    </div>
  );
}
