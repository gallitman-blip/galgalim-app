import React from 'react';

export type IconName =
  // ── Topic icons ──
  | 'truck'
  | 'medical'
  | 'shield-check'
  | 'briefcase'
  | 'calculator'
  | 'hazmat'
  | 'car'
  | 'badge'
  | 'org'
  | 'scale'
  | 'cargo'
  | 'document'
  // ── Navigation ──
  | 'home'
  | 'bar-chart'
  | 'user'
  | 'bell'
  | 'cog'
  | 'chevron-right'
  | 'chevron-left'
  | 'map-pin'
  | 'clock'
  | 'star'
  // ── UI ──
  | 'steering-wheel'
  | 'check'
  | 'check-circle'
  | 'x-mark'
  | 'x-circle'
  | 'arrow-left'
  | 'arrow-right'
  | 'trophy'
  | 'refresh'
  | 'road'
  | 'logout'
  | 'eye'
  | 'eye-off'
  | 'email'
  | 'lock'
  | 'play';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const paths: Record<IconName, React.ReactNode> = {
  // ── Topic icons ──
  truck: (
    <>
      <rect x="1" y="5" width="13" height="10" rx="1" />
      <path d="M14 8h4.5l2.5 3.5V15h-7V8z" />
      <circle cx="5"  cy="17.5" r="1.5" />
      <circle cx="18" cy="17.5" r="1.5" />
    </>
  ),
  medical: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </>
  ),
  'shield-check': (
    <>
      <path d="M12 2L4 5.5v6.5c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V5.5L12 2z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="8" width="20" height="13" rx="2" />
      <path d="M16 8V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <path d="M2 13h20" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h2M12 10h2M16 10h2M8 14h2M12 14h2M16 14h2M8 18h8" strokeLinecap="round" />
    </>
  ),
  hazmat: (
    <>
      <path d="M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
      <path d="M12 9v5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </>
  ),
  car: (
    <>
      <path d="M4 16H2V11l3.5-5.5h13L22 11v5h-2" />
      <circle cx="7"  cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
      <path d="M9 16h6M5 11h14" />
    </>
  ),
  badge: (
    <path d="M12 2l2.1 6.4h6.8l-5.5 4 2.1 6.4L12 15l-5.5 3.8 2.1-6.4-5.5-4h6.8L12 2z" />
  ),
  org: (
    <>
      <circle cx="12" cy="5"  r="2.5" />
      <circle cx="5"  cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5V13M12 13L5 16.5M12 13l7 3.5" strokeLinecap="round" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" strokeLinecap="round" />
      <path d="M5 8l-3.5 7h7L5 8zM19 8l-3.5 7h7L19 8z" />
      <path d="M8 21h8M5 8h14" strokeLinecap="round" />
    </>
  ),
  cargo: (
    <>
      <rect x="2" y="8" width="20" height="11" rx="1" />
      <path d="M7 8V6h10v2M2 12h20M7 8v11M17 8v11" strokeLinecap="round" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" strokeLinecap="round" />
    </>
  ),

  // ── Navigation ──
  home: (
    <>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H15v-6H9v6H4a1 1 0 01-1-1V9.5z" />
    </>
  ),
  'bar-chart': (
    <>
      <rect x="3"  y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7"  width="4" height="14" rx="1" />
      <rect x="17" y="3"  width="4" height="18" rx="1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" />
    </>
  ),
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </>
  ),
  'chevron-right': (
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'chevron-left': (
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'map-pin': (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
    </>
  ),
  star: (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  ),

  // ── UI ──
  'steering-wheel': (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V3M5.5 15.5l-3-4.5M18.5 15.5l3-4.5" strokeLinecap="round" />
    </>
  ),
  check: (
    <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'x-mark': (
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  ),
  'x-circle': (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
    </>
  ),
  'arrow-left': (
    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'arrow-right': (
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  ),
  trophy: (
    <>
      <path d="M6 2h12v8a6 6 0 01-12 0V2z" />
      <path d="M6 4H3a2 2 0 000 4h3M18 4h3a2 2 0 010 4h-3" />
      <path d="M12 16v4M8 20h8" strokeLinecap="round" />
    </>
  ),
  refresh: (
    <path d="M3 12a9 9 0 109-9H9M9 3L6 6l3 3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  road: (
    <>
      <path d="M4 20L8 4h8l4 16" />
      <path d="M9 4l-1 8M15 4l1 8M10 12l-.5 4M14 12l.5 4" strokeLinecap="round" />
    </>
  ),
  logout: (
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'eye-off': (
    <>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <path d="M1 1l22 22" strokeLinecap="round" />
    </>
  ),
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </>
  ),
  play: (
    <path d="M5 3l14 9-14 9V3z" />
  ),
};

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/** Map from topic ID → icon name */
export const TOPIC_ICON: Record<string, IconName> = {
  mefaratTechni:       'truck',
  sikunimRefuiim:      'medical',
  eichotVeVitaon:      'shield-check',
  niulEsek:            'briefcase',
  shitotKamutiot:      'calculator',
  shinuaChomas:        'hazmat',
  shmaotRechevBituch:  'car',
  katsinBitachon:      'badge',
  menahel:             'org',
  dineiAvoda:          'scale',
  takanotHovala:       'cargo',
  chokSheruteiHovala:  'document',
};
