// Choose Chaos logo: a red "C" with a lightning crack through it.
export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="logo-mark">
      <defs>
        <linearGradient id="lg-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5a3c" />
          <stop offset="1" stopColor="#c2101f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="#0a0405" />
      <rect x="2" y="2" width="60" height="60" rx="13" fill="none" stroke="#e11d2e" strokeWidth="2.5" />
      <path
        d="M47 20C43 14 37.5 11.5 31.5 11.5 20 11.5 12.5 20 12.5 32S20 52.5 31.5 52.5c6 0 11.5-2.5 15.5-8.5"
        fill="none"
        stroke="url(#lg-c)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M40 8 31 31h9l-6 25 17-29h-10l8-19z" fill="#ffe3b3" stroke="#0a0405" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ size = 40, text = true }) {
  return (
    <span className="logo inline-flex items-center gap-3">
      <LogoMark size={size} />
      {text && (
        <span className="font-display text-2xl leading-none tracking-[0.12em] text-[#fff1e0] sm:text-3xl">
          CHOOSE <span className="logo-chaos">CHAOS</span>
        </span>
      )}
    </span>
  );
}
