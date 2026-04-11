'use client';

/** Reusable transportation-themed SVG background decoration.
 *  Matches the thin-line, low-opacity style of the login screen.
 */

interface IllustrationBgProps {
  variant?: 'dashboard' | 'progress' | 'profile' | 'onboarding';
  className?: string;
}

// ─── SVG sub-shapes ───────────────────────────────────────────────

function Tire({ cx, cy, r, stroke, sw = 1.5 }: { cx: number; cy: number; r: number; stroke: string; sw?: number }) {
  const rim = r * 0.62;
  const hub = r * 0.17;
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180;
    return `M${(cx + Math.cos(a) * hub).toFixed(1)} ${(cy + Math.sin(a) * hub).toFixed(1)}L${(cx + Math.cos(a) * rim).toFixed(1)} ${(cy + Math.sin(a) * rim).toFixed(1)}`;
  });
  return (
    <>
      <circle cx={cx} cy={cy} r={r}   fill="none" stroke={stroke} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={rim} fill="none" stroke={stroke} strokeWidth={sw * 0.7} />
      <circle cx={cx} cy={cy} r={hub} fill="none" stroke={stroke} strokeWidth={sw} />
      {spokes.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth={sw * 0.65} strokeLinecap="round" />
      ))}
    </>
  );
}

function Compass({ cx, cy, r, stroke, sw = 1.5 }: { cx: number; cy: number; r: number; stroke: string; sw?: number }) {
  const tk = r * 0.18; // tick length
  const ar = r * 0.55; // arrow reach
  const aw = r * 0.11; // arrow half-width
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={sw} />
      {/* Cardinal ticks */}
      <path d={`M${cx} ${cy - r}v${tk}`}                stroke={stroke} strokeWidth={sw}       strokeLinecap="round" fill="none" />
      <path d={`M${cx} ${cy + r - tk}v${tk}`}           stroke={stroke} strokeWidth={sw}       strokeLinecap="round" fill="none" />
      <path d={`M${cx - r} ${cy}h${tk}`}                stroke={stroke} strokeWidth={sw}       strokeLinecap="round" fill="none" />
      <path d={`M${cx + r - tk} ${cy}h${tk}`}           stroke={stroke} strokeWidth={sw}       strokeLinecap="round" fill="none" />
      {/* North arrow — filled */}
      <path d={`M${cx} ${(cy - ar).toFixed(1)}L${(cx - aw).toFixed(1)} ${cy}L${(cx + aw).toFixed(1)} ${cy}Z`}
            fill={stroke} />
      {/* South arrow — outline */}
      <path d={`M${cx} ${(cy + ar).toFixed(1)}L${(cx - aw).toFixed(1)} ${cy}L${(cx + aw).toFixed(1)} ${cy}Z`}
            fill="none" stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Hub dot */}
      <circle cx={cx} cy={cy} r={r * 0.07} fill={stroke} />
    </>
  );
}

function SteeringWheel({ cx, cy, r, stroke, sw = 1.5 }: { cx: number; cy: number; r: number; stroke: string; sw?: number }) {
  const hub = r * 0.2;
  const angles = [270, 30, 150]; // degrees — top + two lower
  const spokes = angles.map(deg => {
    const rad = (deg * Math.PI) / 180;
    return `M${(cx + Math.cos(rad) * hub).toFixed(1)} ${(cy + Math.sin(rad) * hub).toFixed(1)}L${(cx + Math.cos(rad) * r).toFixed(1)} ${(cy + Math.sin(rad) * r).toFixed(1)}`;
  });
  return (
    <>
      <circle cx={cx} cy={cy} r={r}   fill="none" stroke={stroke} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke={stroke} strokeWidth={sw * 0.5} strokeDasharray="3 4" />
      <circle cx={cx} cy={cy} r={hub} fill="none" stroke={stroke} strokeWidth={sw} />
      {spokes.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      ))}
    </>
  );
}

// ─── Scene presets ────────────────────────────────────────────────

function DashboardScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Big tire — top right */}
      <g opacity="0.13">
        <Tire cx={1110} cy={55} r={115} stroke="#3EB8A5" sw={2} />
      </g>
      {/* Steering wheel — mid right */}
      <g opacity="0.10">
        <SteeringWheel cx={980} cy={215} r={48} stroke="#94ADAB" sw={1.5} />
      </g>
      {/* Compass — upper left */}
      <g opacity="0.14">
        <Compass cx={90} cy={90} r={38} stroke="#3EB8A5" sw={1.8} />
      </g>
      {/* Small crosshair dot — upper mid */}
      <g opacity="0.10">
        <circle cx={560} cy={46} r={14} stroke="#3EB8A5" strokeWidth="1.5" />
        <path d="M560 36v20M550 46h20" stroke="#3EB8A5" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {/* Road curves — bottom */}
      <path d="M0 228 Q300 162 600 192 Q900 222 1200 150" stroke="#3EB8A5" strokeWidth="2.5" strokeDasharray="16 10" />
      <path d="M0 253 Q250 202 520 222 Q820 248 1200 178" stroke="#3EB8A5" strokeWidth="1.5" strokeDasharray="9 14" />
    </svg>
  );
}

function ProgressScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Tire — top right */}
      <g opacity="0.12">
        <Tire cx={1120} cy={40} r={88} stroke="#3EB8A5" sw={1.8} />
      </g>
      {/* Compass — upper left */}
      <g opacity="0.11">
        <Compass cx={80} cy={68} r={30} stroke="#94ADAB" sw={1.5} />
      </g>
      {/* Small dot — center top */}
      <g opacity="0.09">
        <circle cx={600} cy={30} r={10} stroke="#3EB8A5" strokeWidth="1.2" />
        <path d="M600 22v16M592 30h16" stroke="#3EB8A5" strokeWidth="1" strokeLinecap="round" />
      </g>
      {/* Road curve — bottom */}
      <path d="M0 168 Q300 118 600 142 Q900 168 1200 112" stroke="#3EB8A5" strokeWidth="2" strokeDasharray="14 10" />
      <path d="M0 190 Q280 148 560 165 Q840 185 1200 138" stroke="#94ADAB" strokeWidth="1.2" strokeDasharray="7 12" />
    </svg>
  );
}

function ProfileScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 440 220" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Tire — top right */}
      <g opacity="0.14">
        <Tire cx={400} cy={40} r={68} stroke="#3EB8A5" sw={1.8} />
      </g>
      {/* Compass — lower left */}
      <g opacity="0.11">
        <Compass cx={48} cy={165} r={28} stroke="#94ADAB" sw={1.4} />
      </g>
      {/* Road curve — bottom */}
      <path d="M-20 190 Q110 148 220 168 Q330 190 460 132" stroke="#3EB8A5" strokeWidth="2" strokeDasharray="12 8" />
      <path d="M-20 210 Q80 175 190 195 Q310 218 460 162" stroke="#3EB8A5" strokeWidth="1.2" strokeDasharray="7 11" />
    </svg>
  );
}

function OnboardingScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 440 200" preserveAspectRatio="xMidYMid slice" fill="none">
      {/* Tire — top right */}
      <g opacity="0.14">
        <Tire cx={398} cy={38} r={62} stroke="#3EB8A5" sw={1.8} />
      </g>
      {/* Compass — upper left */}
      <g opacity="0.13">
        <Compass cx={50} cy={52} r={26} stroke="#3EB8A5" sw={1.5} />
      </g>
      {/* Road curves — bottom */}
      <path d="M-20 178 Q100 138 220 158 Q330 178 460 118" stroke="#3EB8A5" strokeWidth="2.5" strokeDasharray="12 8" />
      <path d="M-20 152 Q80 112 180 132 Q300 155 460 92"  stroke="#3EB8A5" strokeWidth="1.5" strokeDasharray="8 12" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────

export default function IllustrationBg({ variant = 'dashboard', className = '' }: IllustrationBgProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {variant === 'dashboard'   && <DashboardScene />}
      {variant === 'progress'    && <ProgressScene />}
      {variant === 'profile'     && <ProfileScene />}
      {variant === 'onboarding'  && <OnboardingScene />}
    </div>
  );
}
