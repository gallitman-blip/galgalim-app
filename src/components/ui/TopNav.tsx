'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import Icon from './Icon';

const NAV_ITEMS = [
  { label: 'בית',      path: '/dashboard', icon: 'home'      as const },
  { label: 'התקדמות', path: '/progress',  icon: 'bar-chart' as const },
  { label: 'פרופיל',  path: '/profile',   icon: 'user'      as const },
];

export default function TopNav() {
  const pathname   = usePathname();
  const router     = useRouter();
  const logout     = useAuthStore(s => s.logout);
  const courseType = useCourseStore(s => s.courseType);

  return (
    <nav
      className="hidden md:block bg-white border-b border-[#D4EAE7] sticky top-0 z-50"
      style={{ boxShadow: '0 1px 12px rgba(62,184,165,0.08)' }}
    >
      <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="מכללת גלגלים" className="h-10 w-auto object-contain" />

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ label, path, icon }) => {
            const active = pathname === path ||
              (path !== '/dashboard' && pathname.startsWith(path));
            return (
              <button
                key={path}
                onClick={() => router.push(path)}
                className={[
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 transition-all',
                  active
                    ? 'bg-[#EAF7F5] text-[#3EB8A5]'
                    : 'text-[#4D6B67] hover:bg-[#F0F7F5] hover:text-[#3EB8A5]',
                ].join(' ')}
              >
                <Icon name={icon} size={16} strokeWidth={active ? 2.25 : 1.75} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Right: course badge + logout */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-700 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(62,184,165,0.12)', color: '#2D9D8E' }}
          >
            {courseType === 'tsiburi' ? 'קורס ציבורי' : 'קורס מוביל'}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm font-600 text-[#8FACA9] hover:text-[#3EB8A5] transition-colors px-3 py-2 rounded-xl hover:bg-[#EAF7F5]"
          >
            <Icon name="logout" size={16} />
            יציאה
          </button>
        </div>
      </div>
    </nav>
  );
}
