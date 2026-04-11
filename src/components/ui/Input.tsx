'use client';

import { useState, type InputHTMLAttributes } from 'react';
import Icon, { type IconName } from './Icon';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  icon?: IconName;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  icon,
  error,
  hint,
  type = 'text',
  className = '',
  ...props
}: InputProps) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';
  const inputType  = isPassword ? (showPass ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-600 text-[#2F3A39]">{label}</label>
      )}

      <div className="relative">
        {/* Leading icon */}
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[#94ADAB]">
            <Icon name={icon} size={18} strokeWidth={1.75} />
          </div>
        )}

        <input
          type={inputType}
          dir="rtl"
          className={[
            'w-full rounded-2xl border-2 py-3.5 text-sm text-[#2F3A39]',
            'placeholder-[#94ADAB] bg-[#F0F7F5]',
            'transition-colors outline-none',
            icon ? 'pr-11 pl-4' : 'px-4',
            isPassword ? 'pl-11' : '',
            error
              ? 'border-[#E05252] focus:border-[#E05252]'
              : 'border-[#D4EAE7] focus:border-[#3EB8A5] focus:bg-white',
            className,
          ].join(' ')}
          {...props}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94ADAB] hover:text-[#5A7875] transition-colors"
          >
            <Icon name={showPass ? 'eye-off' : 'eye'} size={18} strokeWidth={1.75} />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-[#E05252] font-500">{error}</p>}
      {hint && !error && <p className="text-xs text-[#94ADAB]">{hint}</p>}
    </div>
  );
}
