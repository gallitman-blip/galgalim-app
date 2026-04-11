'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Input from '@/components/ui/Input';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? 'שגיאה בהתחברות');
      }
    } catch {
      setError('שגיאת רשת. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6FAF9] flex flex-col items-center justify-center px-5 py-10" dir="rtl">
      {/* Decorative transportation illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <svg className="absolute bottom-0 left-0 opacity-[0.18] w-full" viewBox="0 0 400 200" fill="none" preserveAspectRatio="xMidYMax meet">
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
          <img src="/logo.png" alt="מכללת גלגלים" className="h-20 w-auto object-contain mb-2" />
          <h1 className="text-2xl font-800 text-[#2F3A39] text-center leading-tight">ברוכים הבאים<br/>למכללת גלגלים!</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl card-shadow-lg p-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username / Email */}
            <Input
              label="שם משתמש"
              icon="email"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="הכנס שם משתמש"
              autoComplete="username"
              required
            />

            {/* Password */}
            <Input
              label="סיסמה"
              icon="lock"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="הכנס סיסמה"
              autoComplete="current-password"
              required
            />

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-[#FDEDEC] border border-[#F5B7B1] rounded-xl px-4 py-3 text-sm text-[#C84444]">
                <Icon name="x-circle" size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-4 rounded-2xl font-700 text-white text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: loading ? '#CFEDEA' : 'linear-gradient(135deg, #3EB8A5 0%, #2D9D8E 100%)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(62,184,165,0.38)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  מתחבר...
                </span>
              ) : 'התחברות'}
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#EAF7F5]">
            <button className="text-sm text-[#94ADAB] hover:text-[#3EB8A5] transition-colors">
              שכחתי סיסמה
            </button>
            <button className="text-sm font-600 text-[#3EB8A5] hover:text-[#2D9D8E] transition-colors">
              הרשמה
            </button>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-5 text-center">
          <p className="text-xs text-[#94ADAB] mb-2">משתמש הדגמה</p>
          <div className="flex justify-center gap-2">
            <span className="bg-white text-[#3EB8A5] text-xs font-600 px-3 py-1.5 rounded-full card-shadow font-mono">demo</span>
            <span className="text-[#94ADAB] text-xs self-center">/</span>
            <span className="bg-white text-[#3EB8A5] text-xs font-600 px-3 py-1.5 rounded-full card-shadow font-mono">demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
