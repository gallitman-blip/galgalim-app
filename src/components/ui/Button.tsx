'use client';

import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-[#3EB8A5] text-white hover:bg-[#2D9D8E] active:bg-[#268A7C]',
  secondary: 'bg-[#2F3A39] text-white hover:bg-[#243130]',
  outline:   'border-2 border-[#3EB8A5] text-[#3EB8A5] bg-white hover:bg-[#EAF7F5]',
  ghost:     'text-[#3EB8A5] bg-transparent hover:bg-[#EAF7F5]',
  danger:    'bg-[#E05252] text-white hover:bg-[#C84444]',
  white:     'bg-white text-[#3EB8A5] hover:bg-[#F0F7F5]',
};

const sizeClasses: Record<Size, string> = {
  sm:  'px-4 py-2.5 text-sm rounded-xl',
  md:  'px-6 py-3.5 text-sm rounded-2xl',
  lg:  'px-8 py-4   text-base rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'font-700 transition-all duration-150 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3EB8A5] focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          טוען...
        </span>
      ) : children}
    </button>
  );
}
