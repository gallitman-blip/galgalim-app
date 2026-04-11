import React from 'react';
import Icon, { type IconName } from './Icon';

type Color   = 'brand' | 'green' | 'red' | 'amber' | 'gray' | 'dark';
type Variant = 'soft' | 'solid';

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  variant?: Variant;
  icon?: IconName;
  className?: string;
}

const softColors: Record<Color, string> = {
  brand: 'bg-[#EAF7F5] text-[#2D9D8E]',
  green: 'bg-[#EAFAF1] text-[#1e8449]',
  red:   'bg-[#FDEDEC] text-[#C84444]',
  amber: 'bg-[#FEF9E7] text-[#B7770D]',
  gray:  'bg-[#F0F7F5] text-[#4D6B67]',
  dark:  'bg-[#2F3A39] text-white',
};

const solidColors: Record<Color, string> = {
  brand: 'bg-[#3EB8A5] text-white',
  green: 'bg-[#27AE60] text-white',
  red:   'bg-[#E05252] text-white',
  amber: 'bg-[#F0A520] text-white',
  gray:  'bg-[#8FACA9] text-white',
  dark:  'bg-[#2F3A39] text-white',
};

export default function Badge({
  children,
  color = 'brand',
  variant = 'soft',
  icon,
  className = '',
}: BadgeProps) {
  const colorClass = variant === 'soft' ? softColors[color] : solidColors[color];
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700',
        colorClass,
        className,
      ].join(' ')}
    >
      {icon && <Icon name={icon} size={12} strokeWidth={2} />}
      {children}
    </span>
  );
}
