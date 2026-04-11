'use client';

import { usePathname, useRouter } from 'next/navigation';
import Icon from './Icon';

interface NavItem {
  label: string;
  path: string;
  icon: 'home' | 'bar-chart' | 'user';
}

const NAV_ITEMS: NavItem[] = [
  { label: 'בית',      path: '/dashboard', icon: 'home'      },
  { label: 'התקדמות', path: '/progress',  icon: 'bar-chart' },
  { label: 'פרופיל',  path: '/profile',   icon: 'user'      },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    /*
      Mobile: fixed full-width at viewport bottom.
      Desktop: fixed but positioned to match the centered phone column (max 440px).
    */
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <nav
        className="bg-white border-t border-[#D4EAE7]"
        style={{ boxShadow: '0 -4px 20px rgba(62,184,165,0.07)' }}
      >
        <div className="flex items-center justify-around px-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
          {NAV_ITEMS.map(({ label, path, icon }) => {
            const active = pathname === path ||
              (path !== '/dashboard' && pathname.startsWith(path));

            return (
              <button
                key={path}
                onClick={() => router.push(path)}
                className="flex flex-col items-center gap-1 px-5 pt-2.5 pb-1.5 relative"
              >
                {/* Active indicator bar */}
                {active && (
                  <div
                    className="absolute top-0 left-4 right-4 h-[2.5px] rounded-full"
                    style={{ background: '#3EB8A5' }}
                  />
                )}

                <Icon
                  name={icon}
                  size={22}
                  strokeWidth={active ? 2.25 : 1.75}
                  className={active ? 'text-[#3EB8A5]' : 'text-[#8FACA9]'}
                />
                <span
                  className={`text-[11px] font-700 leading-none ${
                    active ? 'text-[#3EB8A5]' : 'text-[#8FACA9]'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
