// Inline SVG icons (no icon-library dependency).
export const IconArrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconExternal = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M4 3H9V8M9 3L3 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSun = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <line key={a} x1="10" y1="2" x2="10" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" transform={`rotate(${a} 10 10)`} />
    ))}
  </svg>
);

export const IconMoon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M16 12.5A7 7 0 017.5 4 7 7 0 1016 12.5z" fill="currentColor" />
  </svg>
);
