import Link from 'next/link';

/**
 * Shown when a Google-authenticated user's email is NOT in ALLOWED_EMAILS.
 * The signIn callback in src/auth.ts redirects here.
 */
export default function UnauthorizedPage() {
  return (
    <div
      className="min-h-screen bg-[#F6FAF9] flex flex-col items-center justify-center px-5 py-10"
      dir="rtl"
    >
      {/* Decorative background — same SVG as login page */}
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
          <path
            d="M-20 180 Q100 140 200 160 Q300 180 420 120"
            stroke="#3EB8A5" strokeWidth="3" strokeDasharray="12 8"
          />
          <path
            d="M-20 150 Q80 110 180 130 Q300 155 420 90"
            stroke="#3EB8A5" strokeWidth="2" strokeDasharray="8 12"
          />
          <circle cx="340" cy="70" r="30"   stroke="#3EB8A5" strokeWidth="2" />
          <circle cx="340" cy="70" r="18.6" stroke="#3EB8A5" strokeWidth="1.2" />
          <circle cx="340" cy="70" r="5.1"  stroke="#3EB8A5" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="מכללת גלגלים"
            className="h-20 w-auto object-contain mb-2"
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 text-center" style={{ boxShadow: '0 4px 32px rgba(62,184,165,0.13)' }}>
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'linear-gradient(135deg, #FEF0EA, #FDDCCE)' }}
          >
            <svg
              width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="#E07040" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 className="text-xl font-800 text-[#2F3A39] mb-3 leading-snug">
            הגישה אינה מורשית
          </h1>

          <p className="text-sm text-[#4D6B67] leading-relaxed mb-6">
            החשבון שלך עדיין לא אושר.
            <br />
            יש לפנות למכללת גלגלים.
          </p>

          <Link
            href="/login"
            className="inline-block w-full py-3.5 rounded-2xl font-700 text-white text-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, #3EB8A5 0%, #2D9D8E 100%)',
              boxShadow: '0 4px 16px rgba(62,184,165,0.32)',
            }}
          >
            חזרה לדף הכניסה
          </Link>
        </div>
      </div>
    </div>
  );
}
