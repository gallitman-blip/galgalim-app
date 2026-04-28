'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    setLoading(true);
    await signIn('google', { redirectTo: '/dashboard' }, { prompt: 'select_account' });
    // signIn() navigates away on success; setLoading(false) only runs if it throws.
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen bg-[#F6FAF9] flex flex-col items-center justify-center px-5 py-10"
      dir="rtl"
    >
      {/* Decorative transportation illustrations */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 left-0 opacity-[0.18] w-full"
          viewBox="0 0 400 200"
          fill="none"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Road curves */}
          <path d="M-20 180 Q100 140 200 160 Q300 180 420 120" stroke="#3EB8A5" strokeWidth="3" strokeDasharray="12 8" />
          <path d="M-20 150 Q80 110 180 130 Q300 155 420 90"  stroke="#3EB8A5" strokeWidth="2" strokeDasharray="8 12" />
          {/* Tire — right */}
          <circle cx="340" cy="70" r="30"   stroke="#3EB8A5" strokeWidth="2" />
          <circle cx="340" cy="70" r="18.6" stroke="#3EB8A5" strokeWidth="1.2" />
          <circle cx="340" cy="70" r="5.1"  stroke="#3EB8A5" strokeWidth="1.5" />
          <path d="M340 53.5L340 65.1" stroke="#3EB8A5" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M340 74.9L340 86.5" stroke="#3EB8A5" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M356.5 70L344.9 70" stroke="#3EB8A5" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M335.1 70L323.5 70" stroke="#3EB8A5" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M351.4 58.6L343.6 66.4" stroke="#3EB8A5" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M336.4 73.6L328.6 81.4" stroke="#3EB8A5" strokeWidth="1.1" strokeLinecap="round" />
          {/* Compass — left */}
          <circle cx="60" cy="30" r="22" stroke="#3EB8A5" strokeWidth="2" />
          <path d="M60 12v5M60 43v5"         stroke="#3EB8A5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M38 30h5M77 30h5"         stroke="#3EB8A5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M60 17L57 30L63 30Z"      fill="#3EB8A5" />
          <path d="M60 43L57 30L63 30Z"      fill="none" stroke="#3EB8A5" strokeWidth="1.2" />
          <circle cx="60" cy="30" r="1.8"    fill="#3EB8A5" />
        </svg>
      </div>

      <div className="relative w-full max-w-sm fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="מכללת גלגלים"
            className="h-20 w-auto object-contain mb-2"
          />
          <h1 className="text-2xl font-800 text-[#2F3A39] text-center leading-tight">
            ברוכים הבאים<br />למכללת גלגלים!
          </h1>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-3xl p-7"
          style={{ boxShadow: '0 4px 32px rgba(62,184,165,0.13)' }}
        >
          <p className="text-sm text-[#4D6B67] text-center mb-6 leading-relaxed">
            התחבר עם חשבון Google שלך
            <br />
            כדי לגשת לחומרי הלימוד
          </p>

          {/* Google Sign-In button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl border-2 border-[#D4EAE7] bg-white font-700 text-[#2F3A39] text-sm transition-all hover:border-[#3EB8A5] hover:bg-[#F6FAF9] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 2px 10px rgba(62,184,165,0.09)' }}
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5 text-[#3EB8A5]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              /* Official Google "G" logo */
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            )}
            {loading ? 'מתחבר...' : 'התחברות עם Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex-1 h-px bg-[#EAF7F5]" />
            <span className="text-xs text-[#94ADAB]">גישה מורשית בלבד</span>
            <div className="flex-1 h-px bg-[#EAF7F5]" />
          </div>

          <p className="text-xs text-[#94ADAB] text-center mt-4 leading-relaxed">
            רק משתמשים שנרשמו לקורס יכולים להתחבר.
            <br />
            לפרטים נוספים יש לפנות למכללת גלגלים.
          </p>
        </div>
      </div>
    </div>
  );
}
