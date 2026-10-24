import { useId } from "react";

// Profile pictures (Duolingo style). 12 original characters drawn in SVG.
// The ids must match backend/src/data/avatars.js
export const AVATARS = [
  { id: "ghost", label: "Ghost" },
  { id: "fox", label: "Fox" },
  { id: "cat", label: "Cat" },
  { id: "astronaut", label: "Astronaut" },
  { id: "detective", label: "Detective" },
  { id: "robot", label: "Robot" },
  { id: "vampire", label: "Vampire" },
  { id: "wizard", label: "Wizard" },
  { id: "alien", label: "Alien" },
  { id: "bunny", label: "Bunny" },
  { id: "skull", label: "Skull" },
  { id: "cupid", label: "Cupid" },
];

const BG = {
  ghost: ["#2a0508", "#e11d2e"],
  fox: ["#3a1204", "#ff8a2c"],
  cat: ["#04302c", "#2dd4bf"],
  astronaut: ["#041b2b", "#0e7490"],
  detective: ["#3b2406", "#ffb347"],
  robot: ["#0c2233", "#22d3ee"],
  vampire: ["#1c0206", "#c0121f"],
  wizard: ["#08153a", "#3b82f6"],
  alien: ["#052e16", "#4ade80"],
  bunny: ["#3b0a1e", "#ff7a9c"],
  skull: ["#0d0506", "#7f1d1d"],
  cupid: ["#4a0d2a", "#ff9a8a"],
};

const INK = "#1a0508";

function Art({ id }) {
  switch (id) {
    case "fox":
      return (
        <>
          <path d="M20 26 L42 42 Q50 40 58 42 L80 26 L84 62 Q84 84 50 88 Q16 84 16 62 Z" fill="#ff8a2c" />
          <path d="M25 36 L37 45 L26 54Z M75 36 L63 45 L74 54Z" fill="#7a1f12" />
          <path d="M16 62 Q30 64 50 78 Q70 64 84 62 Q84 84 50 88 Q16 84 16 62Z" fill="#fff1e0" />
          <ellipse cx="37" cy="58" rx="3.4" ry="4.6" fill={INK} />
          <ellipse cx="63" cy="58" rx="3.4" ry="4.6" fill={INK} />
          <circle cx="38.2" cy="56.4" r="1.2" fill="#fff" />
          <circle cx="64.2" cy="56.4" r="1.2" fill="#fff" />
          <ellipse cx="50" cy="77" rx="4.5" ry="3.2" fill={INK} />
        </>
      );
    case "cat":
      return (
        <>
          <path d="M20 26 L38 40 Q50 36 62 40 L80 26 L83 62 Q83 86 50 88 Q17 86 17 62Z" fill="#e4d9c8" />
          <path d="M25 35 L35 42 L26 50Z M75 35 L65 42 L74 50Z" fill="#ff9fb4" />
          <path d="M44 42 V50 M50 40 V50 M56 42 V50" stroke="#8a7a66" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="37" cy="60" rx="5" ry="5.6" fill="#ffd54a" />
          <ellipse cx="63" cy="60" rx="5" ry="5.6" fill="#ffd54a" />
          <ellipse cx="37" cy="60" rx="1.7" ry="4.6" fill={INK} />
          <ellipse cx="63" cy="60" rx="1.7" ry="4.6" fill={INK} />
          <path d="M46.5 70 H53.5 L50 74Z" fill="#ff7a9c" />
          <path d="M50 74 Q46 79 42 76 M50 74 Q54 79 58 76" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M26 70 H12 M26 75 L13 80 M74 70 H88 M74 75 L87 80" stroke="#fff1e0" strokeWidth="1.4" strokeLinecap="round" />
        </>
      );
    case "astronaut":
      return (
        <>
          <path d="M16 100 Q18 76 50 76 Q82 76 84 100Z" fill="#e8edf3" />
          <rect x="44" y="82" width="12" height="7" rx="2" fill="#e11d2e" />
          <circle cx="50" cy="48" r="31" fill="#f4f1ff" stroke="#cbd5e1" strokeWidth="2" />
          <ellipse cx="50" cy="49" rx="23" ry="19" fill="#0b1830" />
          <path d="M33 42 Q40 34 52 35" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".85" />
          <circle cx="43" cy="52" r="3.2" fill="#fff1e0" />
          <circle cx="57" cy="52" r="3.2" fill="#fff1e0" />
          <circle cx="43.6" cy="52.4" r="1.4" fill={INK} />
          <circle cx="57.6" cy="52.4" r="1.4" fill={INK} />
          <path d="M45 59 Q50 63 55 59" stroke="#fff1e0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="77" cy="30" r="3" fill="#ff3b3b" />
        </>
      );
    case "detective":
      return (
        <>
          <path d="M14 100 Q16 80 50 80 Q84 80 86 100Z" fill="#8b6b3d" />
          <path d="M42 80 L50 92 L58 80Z" fill="#f4ead6" />
          <circle cx="50" cy="58" r="23" fill="#f2c9a0" />
          <ellipse cx="50" cy="42" rx="36" ry="8" fill="#2b1d12" />
          <path d="M31 42 Q31 16 50 16 Q69 16 69 42Z" fill="#3b2a1b" />
          <rect x="31" y="34" width="38" height="6" fill="#e11d2e" />
          <circle cx="41" cy="58" r="2.8" fill={INK} />
          <circle cx="59" cy="58" r="2.8" fill={INK} />
          <path d="M38 69 Q44 64 50 68 Q56 64 62 69 Q56 72 50 70 Q44 72 38 69Z" fill="#3a2410" />
        </>
      );
    case "robot":
      return (
        <>
          <line x1="50" y1="14" x2="50" y2="30" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="50" cy="13" r="5" fill="#ff3b3b" />
          <rect x="22" y="30" width="56" height="48" rx="11" fill="#cbd5e1" />
          <rect x="14" y="46" width="8" height="16" rx="3" fill="#94a3b8" />
          <rect x="78" y="46" width="8" height="16" rx="3" fill="#94a3b8" />
          <rect x="29" y="38" width="42" height="22" rx="7" fill="#0b1830" />
          <circle cx="41" cy="49" r="5" fill="#2dd4bf" />
          <circle cx="59" cy="49" r="5" fill="#2dd4bf" />
          <circle cx="42.5" cy="47.5" r="1.6" fill="#fff" />
          <circle cx="60.5" cy="47.5" r="1.6" fill="#fff" />
          <path d="M38 68 H62 M41 72 H59" stroke="#64748b" strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case "vampire":
      return (
        <>
          <path d="M8 100 L22 70 Q50 90 78 70 L92 100Z" fill="#0f0204" />
          <path d="M30 72 Q50 92 70 72 L66 100 H34Z" fill="#b3121e" />
          <circle cx="50" cy="52" r="24" fill="#efe7ee" />
          <path d="M26 50 Q24 22 50 22 Q76 22 74 50 Q64 36 50 44 Q36 36 26 50Z" fill="#14080a" />
          <ellipse cx="41" cy="54" rx="3.2" ry="3.8" fill="#e11d2e" />
          <ellipse cx="59" cy="54" rx="3.2" ry="3.8" fill="#e11d2e" />
          <path d="M41 65 Q50 70 59 65" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M43 65.5 L45.5 72 L47.5 66.6Z M57 65.5 L54.5 72 L52.5 66.6Z" fill="#fff" />
        </>
      );
    case "wizard":
      return (
        <>
          <circle cx="50" cy="64" r="17" fill="#f2c9a0" />
          <path d="M33 64 Q35 96 50 94 Q65 96 67 64 Q59 74 50 72 Q41 74 33 64Z" fill="#f1f5f9" />
          <path d="M50 6 L74 54 H26Z" fill="#1e3a8a" />
          <ellipse cx="50" cy="54" rx="32" ry="7.5" fill="#172554" />
          <path d="M50 22 l2 5 5 .5 -4 3.4 1.2 5 -4.2 -2.8 -4.2 2.8 1.2 -5 -4 -3.4 5 -.5Z" fill="#ffc83d" />
          <circle cx="42" cy="62" r="2.6" fill={INK} />
          <circle cx="58" cy="62" r="2.6" fill={INK} />
          <path d="M45 69 Q50 73 55 69" stroke="#b45309" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      );
    case "alien":
      return (
        <>
          <path d="M50 14 Q80 16 77 50 Q73 80 50 88 Q27 80 23 50 Q20 16 50 14Z" fill="#7ee08a" />
          <path d="M28 46 Q40 40 46 56 Q38 64 29 56Z" fill={INK} />
          <path d="M72 46 Q60 40 54 56 Q62 64 71 56Z" fill={INK} />
          <circle cx="37" cy="51" r="2" fill="#fff" />
          <circle cx="63" cy="51" r="2" fill="#fff" />
          <path d="M44 73 Q50 77 56 73" stroke="#0f5a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="12" r="3.4" fill="#ffd54a" />
          <line x1="50" y1="14" x2="50" y2="20" stroke="#4ade80" strokeWidth="2" />
        </>
      );
    case "bunny":
      return (
        <>
          <g transform="rotate(-10 38 40)">
            <ellipse cx="38" cy="28" rx="9" ry="22" fill="#fff1e0" />
            <ellipse cx="38" cy="30" rx="4.4" ry="15" fill="#ffadc2" />
          </g>
          <g transform="rotate(10 62 40)">
            <ellipse cx="62" cy="28" rx="9" ry="22" fill="#fff1e0" />
            <ellipse cx="62" cy="30" rx="4.4" ry="15" fill="#ffadc2" />
          </g>
          <circle cx="50" cy="64" r="26" fill="#fff1e0" />
          <circle cx="40" cy="62" r="3.2" fill={INK} />
          <circle cx="60" cy="62" r="3.2" fill={INK} />
          <circle cx="41" cy="60.8" r="1.1" fill="#fff" />
          <circle cx="61" cy="60.8" r="1.1" fill="#fff" />
          <circle cx="33" cy="70" r="4.4" fill="#ff9fb4" opacity=".6" />
          <circle cx="67" cy="70" r="4.4" fill="#ff9fb4" opacity=".6" />
          <path d="M46.5 68 H53.5 L50 72Z" fill="#ff7a9c" />
          <rect x="47" y="74" width="6" height="7" rx="1.6" fill="#fff" stroke="#e5d3bd" strokeWidth=".8" />
        </>
      );
    case "skull":
      return (
        <>
          <path d="M50 16 Q80 16 80 46 Q80 60 69 67 V80 H31 V67 Q20 60 20 46 Q20 16 50 16Z" fill="#f1ebe0" />
          <ellipse cx="37" cy="50" rx="9" ry="10" fill={INK} />
          <ellipse cx="63" cy="50" rx="9" ry="10" fill={INK} />
          <circle cx="37" cy="51" r="2.6" fill="#ff3b3b" />
          <circle cx="63" cy="51" r="2.6" fill="#ff3b3b" />
          <path d="M50 60 L45.5 68 H54.5Z" fill={INK} />
          <path d="M40 80 V72 M46 80 V72 M54 80 V72 M60 80 V72" stroke="#b9ad98" strokeWidth="2" />
        </>
      );
    case "cupid":
      return (
        <>
          <ellipse cx="23" cy="56" rx="16" ry="8.5" transform="rotate(-28 23 56)" fill="#fff" />
          <ellipse cx="77" cy="56" rx="16" ry="8.5" transform="rotate(28 77 56)" fill="#fff" />
          <circle cx="50" cy="58" r="23" fill="#ffd9c0" />
          <g fill="#f5b942">
            <circle cx="33" cy="40" r="8" /><circle cx="42" cy="34" r="8.5" /><circle cx="53" cy="33" r="8.5" /><circle cx="63" cy="36" r="8" /><circle cx="69" cy="45" r="6" />
          </g>
          <ellipse cx="50" cy="19" rx="14" ry="4.4" fill="none" stroke="#ffe27a" strokeWidth="3" />
          <circle cx="42" cy="58" r="2.8" fill={INK} />
          <circle cx="58" cy="58" r="2.8" fill={INK} />
          <path d="M33 66 q2.4-3 4.8 0 q2.4-3 4.8 0 q0 4-4.8 7 q-4.8-3-4.8-7Z" fill="#ff5f84" opacity=".85" transform="translate(-4 -3) scale(.9)" />
          <path d="M62 66 q2.4-3 4.8 0 q2.4-3 4.8 0 q0 4-4.8 7 q-4.8-3-4.8-7Z" fill="#ff5f84" opacity=".85" transform="translate(-1 -3) scale(.9)" />
          <path d="M45 70 Q50 74 55 70" stroke="#b4352a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      );
    case "ghost":
    default:
      return (
        <>
          <path d="M28 84 V48 A22 22 0 0 1 72 48 V84 L64.7 77 L57.3 84 L50 77 L42.7 84 L35.3 77 L28 84Z" fill="#fff1e0" />
          <ellipse cx="41" cy="50" rx="3.4" ry="5" fill={INK} />
          <ellipse cx="59" cy="50" rx="3.4" ry="5" fill={INK} />
          <circle cx="42" cy="48" r="1.2" fill="#fff" />
          <circle cx="60" cy="48" r="1.2" fill="#fff" />
          <ellipse cx="50" cy="61" rx="3.2" ry="4" fill={INK} />
          <circle cx="34" cy="58" r="4" fill="#ff9fb4" opacity=".55" />
          <circle cx="66" cy="58" r="4" fill="#ff9fb4" opacity=".55" />
        </>
      );
  }
}

export default function AvatarPic({ id = "ghost", size = 48, className = "", title }) {
  const uid = useId().replace(/:/g, "");
  const [a, b] = BG[id] || BG.ghost;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title || `${id} avatar`}
      style={{ display: "block", borderRadius: "50%" }}
    >
      <defs>
        <radialGradient id={`bg${uid}`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor={b} />
          <stop offset="100%" stopColor={a} />
        </radialGradient>
        <clipPath id={`cl${uid}`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#cl${uid})`}>
        <rect width="100" height="100" fill={`url(#bg${uid})`} />
        <Art id={id} />
      </g>
    </svg>
  );
}
