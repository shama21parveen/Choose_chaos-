// Small illustrated characters for each world. Flat colours, tiny CSS animation.
const OUT = "#1a0f14";

function Detective() {
  return (
    <svg viewBox="0 0 200 260" className="av-svg">
      <g className="av-bob">
        <ellipse cx="100" cy="250" rx="52" ry="7" fill="#000" opacity="0.35" />
        {/* coat */}
        <path d="M44 250 52 150c6-22 28-30 48-30s42 8 48 30l8 100z" fill="#1f3a34" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M100 124v126" stroke={OUT} strokeWidth="4" />
        <path d="M70 128 100 170 130 128" fill="#e8e4d4" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M82 138c8 22 28 22 36 0l12 10c-8 30-52 30-60 0z" fill="#e11d2e" stroke={OUT} strokeWidth="3.5" />
        {/* head */}
        <ellipse cx="100" cy="92" rx="33" ry="37" fill="#f6cfae" stroke={OUT} strokeWidth="4" />
        <path d="M70 100c10 14 50 14 60 0" fill="none" stroke="#5a3a2a" strokeWidth="3" opacity="0.5" />
        <ellipse cx="88" cy="92" rx="4" ry="5" fill={OUT} />
        <ellipse cx="112" cy="92" rx="4" ry="5" fill={OUT} />
        <path d="M90 112q10 6 20 0" fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        {/* hat */}
        <ellipse cx="100" cy="62" rx="56" ry="11" fill="#12241f" stroke={OUT} strokeWidth="4" />
        <path d="M64 60c0-30 14-44 36-44s36 14 36 44z" fill="#1a3029" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M65 54h70" stroke="#e11d2e" strokeWidth="7" />
        {/* magnifier */}
        <g className="av-swing" style={{ transformOrigin: "150px 190px" }}>
          <circle cx="160" cy="178" r="20" fill="#9ff3e1" fillOpacity="0.35" stroke="#ffe3b3" strokeWidth="6" />
          <path d="M146 192 130 214" stroke="#ffe3b3" strokeWidth="8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function Astronaut() {
  return (
    <svg viewBox="0 0 200 260" className="av-svg">
      <g className="av-bob">
        <ellipse cx="100" cy="250" rx="52" ry="7" fill="#000" opacity="0.35" />
        <rect x="52" y="128" width="96" height="96" rx="28" fill="#eef4f7" stroke={OUT} strokeWidth="4" />
        <rect x="76" y="148" width="48" height="30" rx="8" fill="#0f172a" stroke={OUT} strokeWidth="3" />
        <circle cx="90" cy="163" r="5" fill="#22d3ee" />
        <circle cx="108" cy="163" r="5" fill="#f43f5e" />
        <rect x="28" y="136" width="26" height="70" rx="13" fill="#dbe7ee" stroke={OUT} strokeWidth="4" />
        <rect x="146" y="136" width="26" height="70" rx="13" fill="#dbe7ee" stroke={OUT} strokeWidth="4" />
        <rect x="62" y="214" width="30" height="34" rx="10" fill="#dbe7ee" stroke={OUT} strokeWidth="4" />
        <rect x="108" y="214" width="30" height="34" rx="10" fill="#dbe7ee" stroke={OUT} strokeWidth="4" />
        <circle cx="100" cy="86" r="52" fill="#eef4f7" stroke={OUT} strokeWidth="4" />
        <ellipse cx="100" cy="88" rx="38" ry="31" fill="#0f2a3d" stroke={OUT} strokeWidth="4" />
        <path d="M72 78c10-12 30-14 42-6" fill="none" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <line x1="100" y1="34" x2="100" y2="14" stroke={OUT} strokeWidth="4" />
        <circle cx="100" cy="12" r="6" fill="#22d3ee" className="av-blink" />
      </g>
    </svg>
  );
}

function Ghost() {
  return (
    <svg viewBox="0 0 200 260" className="av-svg">
      <g className="av-float">
        <ellipse cx="100" cy="250" rx="44" ry="6" fill="#000" opacity="0.4" className="av-shadow" />
        <path d="M36 220V100C36 52 64 24 100 24s64 28 64 76v120l-20-18-22 18-22-18-22 18-22-18z" fill="#f1ece4" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="78" cy="98" rx="11" ry="17" fill="#1a0509" />
        <ellipse cx="122" cy="98" rx="11" ry="17" fill="#1a0509" />
        <circle cx="78" cy="94" r="4" fill="#ef4444" className="av-blink" />
        <circle cx="122" cy="94" r="4" fill="#ef4444" className="av-blink" />
        <ellipse cx="100" cy="148" rx="13" ry="18" fill="#1a0509" />
        <path d="M46 150c-14 6-20 18-14 30M154 150c14 6 20 18 14 30" fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Boy + girl for the rom-com world
function Pair() {
  return (
    <svg viewBox="0 0 320 280" className="av-svg">
      <ellipse cx="160" cy="268" rx="120" ry="8" fill="#000" opacity="0.18" />
      {/* GIRL */}
      <g className="av-bob">
        <path d="M62 266 70 176c4-18 22-26 42-26s38 8 42 26l8 90z" fill="#fff6ec" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M70 232h96l6 34H62z" fill="#d94a63" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M100 232v34M126 232v34" stroke="#f8b4c0" strokeWidth="3" />
        <path d="M96 152 112 176 128 152" fill="#fff" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M104 172l8 10 8-10-8-6z" fill="#e11d2e" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        {/* hair back */}
        <path d="M58 118C58 70 82 50 112 50s54 20 54 68c0 30 4 46-10 54-8-12-8-22-8-30H76c0 8 0 18-8 30-14-8-10-24-10-54z" fill="#3a2230" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="112" cy="116" rx="40" ry="44" fill="#ffe3d0" stroke={OUT} strokeWidth="4" />
        {/* bangs */}
        <path d="M70 100c14-6 24-18 28-34 6 14 20 28 44 30 4-8 2-14 0-20-26-22-72-8-72 24z" fill="#3a2230" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="97" cy="118" rx="5" ry="7" fill={OUT} />
        <ellipse cx="127" cy="118" rx="5" ry="7" fill={OUT} />
        <circle cx="99" cy="115" r="2" fill="#fff" />
        <circle cx="129" cy="115" r="2" fill="#fff" />
        <circle cx="84" cy="132" r="7" fill="#ff8fa3" opacity="0.7" />
        <circle cx="140" cy="132" r="7" fill="#ff8fa3" opacity="0.7" />
        <path d="M106 138q6 6 12 0" fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        {/* hair clip */}
        <path d="M144 84c-4-8-14-4-10 4l10 8 10-8c4-8-6-12-10-4z" fill="#ff5a7a" stroke={OUT} strokeWidth="2.5" transform="translate(-4 4) scale(0.8)" />
        {/* banana milk */}
        <g className="av-swing" style={{ transformOrigin: "150px 214px" }}>
          <rect x="138" y="196" width="26" height="36" rx="5" fill="#ffe27a" stroke={OUT} strokeWidth="3.5" />
          <path d="M138 206h26" stroke={OUT} strokeWidth="2.5" />
          <path d="M146 218q5 6 10 0" fill="none" stroke={OUT} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
      {/* BOY */}
      <g className="av-bob av-bob-2">
        <path d="M176 266 184 178c4-18 22-26 42-26s38 8 42 26l8 88z" fill="#243a6b" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M206 154 226 190 246 154" fill="#fff" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M222 184h8l4 40-8 8-8-8z" fill="#e11d2e" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <path d="M206 154l-10 36M246 154l10 36" stroke={OUT} strokeWidth="3.5" strokeLinecap="round" />
        {/* arm scratching head */}
        <path d="M268 188c18-18 18-44 2-62" fill="none" stroke="#243a6b" strokeWidth="18" strokeLinecap="round" />
        <circle cx="268" cy="124" r="10" fill="#ffe0c8" stroke={OUT} strokeWidth="3.5" />
        <ellipse cx="226" cy="120" rx="38" ry="43" fill="#ffe0c8" stroke={OUT} strokeWidth="4" />
        {/* hair */}
        <path d="M186 112c-6-34 10-62 42-62 32 0 48 26 40 58-6-16-14-24-26-26-8 12-26 18-44 16-6 4-10 8-12 14z" fill="#16121c" stroke={OUT} strokeWidth="4" strokeLinejoin="round" />
        <path d="M200 62l6-14 8 12 10-14 4 16" fill="#16121c" stroke={OUT} strokeWidth="3" strokeLinejoin="round" />
        <path d="M204 112q8-5 16 0M234 112q8-5 16 0" fill="none" stroke={OUT} strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="212" cy="124" rx="4.5" ry="6.5" fill={OUT} />
        <ellipse cx="242" cy="124" rx="4.5" ry="6.5" fill={OUT} />
        <circle cx="198" cy="138" r="7" fill="#ff8fa3" opacity="0.7" />
        <circle cx="254" cy="138" r="7" fill="#ff8fa3" opacity="0.7" />
        <path d="M222 144q6 5 12 0" fill="none" stroke={OUT} strokeWidth="3" strokeLinecap="round" />
        <path d="M214 134 218 140" stroke="#e7a98b" strokeWidth="2" opacity="0" />
      </g>
      {/* floating heart + sweat drop */}
      <g className="av-heart" style={{ transformOrigin: "166px 70px" }}>
        <path d="M166 84c-22-14-30-28-20-38 8-8 18-4 20 4 2-8 12-12 20-4 10 10 2 24-20 38z" fill="#ff4d6d" stroke={OUT} strokeWidth="3.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const MAP = { detective: Detective, astronaut: Astronaut, ghost: Ghost, pair: Pair, student: Pair };

export default function Avatar({ kind, className = "" }) {
  const C = MAP[kind] || Detective;
  return (
    <div className={className}>
      <C />
    </div>
  );
}
