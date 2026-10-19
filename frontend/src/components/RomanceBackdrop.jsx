import { useMemo } from "react";
import "./romance.css";

// Soft K-drama style background for the romance genre:
// pastel gradient + blurry meadow + rising bokeh lights + a floating collage of
// polaroids, flowers, love-letters and tiny animated line icons.
// Mood board: sage green, dusty rose, cream, pearls, wax seals.

const PALETTES = {
  sage: { g: ["#f6efe3", "#ead8d4", "#cfd9b6"], blobs: ["#a9bc8a", "#f2b5c4", "#fff3df", "#e7a3b8"] },
  butter: { g: ["#fff6df", "#fadfd0", "#f4c5cf"], blobs: ["#ffe29a", "#f7b6c6", "#cfe0b0", "#ffffff"] },
  peach: { g: ["#cbb5e8", "#f6b8c8", "#ffd3af"], blobs: ["#ffb68a", "#f48fb1", "#d7b8f3", "#fff0c9"] },
  dusk: { g: ["#4a3a78", "#c3659a", "#ffb9a2"], blobs: ["#ff9bb8", "#9a7be0", "#ffd29a", "#6a4fa8"] },
  rose: { g: ["#fde7ee", "#f7c6d4", "#e9b7c9"], blobs: ["#f48fb1", "#ffffff", "#cfe0b0", "#ffc9a8"] },
};

const PLUM = "#3a1d44";
const ROSE = "#ff7aa8";
const OLIVE = "#7f8f55";

/* ---------------- tiny pieces ---------------- */

function Heart({ x = 0, y = 0, s = 1, fill = ROSE }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 8 C-12 0 -12 -10 -5 -12 C-2 -13 0 -11 0 -9 C0 -11 2 -13 5 -12 C12 -10 12 0 0 8Z"
      fill={fill}
      stroke="none"
    />
  );
}

function Icon({ children, size = 84 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={PLUM}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ICONS = {
  phone: () => (
    <Icon>
      <rect x="20" y="8" width="24" height="48" rx="5" />
      <line x1="28" y1="14" x2="36" y2="14" />
      <g className="rb-pulse"><Heart x={32} y={34} s={1.1} /></g>
    </Icon>
  ),
  pin: () => (
    <Icon>
      <path d="M32 58 C20 44 16 36 16 27 A16 16 0 0 1 48 27 C48 36 44 44 32 58Z" />
      <g className="rb-pulse"><Heart x={32} y={27} s={1} /></g>
    </Icon>
  ),
  calendar: () => (
    <Icon>
      <rect x="10" y="16" width="44" height="38" rx="6" />
      <line x1="22" y1="10" x2="22" y2="21" />
      <line x1="42" y1="10" x2="42" y2="21" />
      <line x1="10" y1="27" x2="54" y2="27" />
      <g className="rb-pulse"><Heart x={32} y={41} s={1.1} /></g>
    </Icon>
  ),
  gift: () => (
    <Icon>
      <rect x="12" y="28" width="40" height="26" rx="3" />
      <rect x="9" y="21" width="46" height="9" rx="3" />
      <line x1="32" y1="21" x2="32" y2="54" />
      <path d="M32 21 C24 8 14 14 22 21 M32 21 C40 8 50 14 42 21" />
      <g className="rb-pulse"><Heart x={22} y={42} s={0.8} /></g>
    </Icon>
  ),
  winged: () => (
    <Icon>
      <path d="M22 30 C10 20 3 28 6 36 C11 34 16 36 22 40" />
      <path d="M42 30 C54 20 61 28 58 36 C53 34 48 36 42 40" />
      <g className="rb-pulse"><Heart x={32} y={34} s={2} /></g>
    </Icon>
  ),
  ticket: () => (
    <Icon>
      <path d="M8 20 H56 V28 A4 4 0 0 0 56 36 V44 H8 V36 A4 4 0 0 0 8 28Z" />
      <line x1="42" y1="21" x2="42" y2="43" strokeDasharray="3 4" />
      <g className="rb-pulse"><Heart x={25} y={32} s={1.2} /></g>
    </Icon>
  ),
  camera: () => (
    <Icon>
      <rect x="8" y="20" width="48" height="32" rx="7" />
      <path d="M22 20 L26 13 H38 L42 20" />
      <circle cx="32" cy="36" r="10" />
      <g className="rb-pulse"><Heart x={32} y={36} s={0.7} /></g>
    </Icon>
  ),
  umbrella: () => (
    <Icon>
      <path d="M6 34 C6 18 18 8 32 8 C46 8 58 18 58 34 C54 29 49 29 45 34 C41 29 36 29 32 34 C28 29 23 29 19 34 C15 29 10 29 6 34Z" />
      <path d="M32 34 V52 C32 57 39 57 39 52" />
      <g className="rb-pulse"><Heart x={32} y={22} s={0.9} /></g>
    </Icon>
  ),
  music: () => (
    <Icon>
      <path d="M24 46 V16 L46 11 V41" />
      <ellipse cx="19" cy="46" rx="6" ry="5" fill={PLUM} />
      <ellipse cx="41" cy="41" rx="6" ry="5" fill={PLUM} />
      <g className="rb-pulse"><Heart x={35} y={24} s={0.8} /></g>
    </Icon>
  ),
  book: () => (
    <Icon>
      <path d="M32 18 C26 13 16 13 8 16 V50 C16 47 26 47 32 52 C38 47 48 47 56 50 V16 C48 13 38 13 32 18Z" />
      <line x1="32" y1="18" x2="32" y2="52" />
      <g className="rb-pulse"><Heart x={20} y={32} s={0.8} /></g>
    </Icon>
  ),
  phones: () => (
    <Icon>
      <path d="M12 40 V32 A20 20 0 0 1 52 32 V40" />
      <rect x="8" y="36" width="10" height="17" rx="4" fill={ROSE} />
      <rect x="46" y="36" width="10" height="17" rx="4" fill={ROSE} />
    </Icon>
  ),
  coffee: () => (
    <Icon>
      <path d="M17 24 H47 L43 56 H21Z" />
      <path d="M14 24 H50 V20 H14Z" />
      <path d="M36 20 L42 6" />
      <g className="rb-pulse"><Heart x={32} y={40} s={1.2} /></g>
    </Icon>
  ),
  board: () => (
    <Icon>
      <path d="M6 32 Q6 26 12 26 H52 Q58 26 58 32 Q58 38 52 38 H12 Q6 38 6 32Z" />
      <circle cx="18" cy="46" r="5" fill={PLUM} />
      <circle cx="46" cy="46" r="5" fill={PLUM} />
      <g className="rb-pulse"><Heart x={32} y={32} s={0.7} /></g>
    </Icon>
  ),
  ball: () => (
    <Icon>
      <circle cx="32" cy="32" r="22" />
      <path d="M10 32 H54 M32 10 V54 M16 16 Q32 32 16 48 M48 16 Q32 32 48 48" />
    </Icon>
  ),
  bowl: () => (
    <Icon>
      <path d="M8 32 H56 Q56 52 32 54 Q8 52 8 32Z" />
      <path d="M40 8 L28 32 M47 10 L35 32" />
      <path d="M18 24 Q20 18 18 14 M26 24 Q28 18 26 14" />
      <g className="rb-pulse"><Heart x={30} y={44} s={0.9} /></g>
    </Icon>
  ),
  pencil: () => (
    <Icon>
      <path d="M12 52 L16 40 L42 14 L50 22 L24 48Z" />
      <path d="M16 40 L24 48 L12 52Z" fill={ROSE} />
      <path d="M38 18 L46 26" />
    </Icon>
  ),
  moon: () => (
    <Icon>
      <path d="M40 8 A24 24 0 1 0 56 40 A19 19 0 0 1 40 8Z" fill="#ffe9a8" />
      <path d="M50 14 v6 M47 17 h6 M12 14 v4 M10 16 h4" />
    </Icon>
  ),
  bell: () => (
    <Icon>
      <path d="M32 8 C22 8 18 18 18 28 V38 L11 45 H53 L46 38 V28 C46 18 42 8 32 8Z" />
      <path d="M27 50 Q32 57 37 50" />
    </Icon>
  ),
  star: () => (
    <Icon size={60}>
      <path d="M32 8 L38 25 L56 26 L42 37 L47 55 L32 45 L17 55 L22 37 L8 26 L26 25Z" fill="#ffe29a" />
    </Icon>
  ),
};

/* ---------------- collage items ---------------- */

function Polaroid({ pic = "sun", caption = "" }) {
  const tint = { sun: ["#ffe0b5", "#f8b6c8"], hill: ["#cfe0b0", "#f6d9cf"], heart: ["#fbd1de", "#ffffff"], dusk: ["#c7b3ee", "#ffb9a2"] }[pic] || ["#fbd1de", "#fff"];
  return (
    <svg width="132" height="158" viewBox="0 0 132 158" style={{ filter: "drop-shadow(0 10px 18px rgba(80,30,60,.25))" }}>
      <rect width="132" height="158" rx="4" fill="#fffdf9" />
      <defs>
        <linearGradient id={`pg-${pic}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint[0]} />
          <stop offset="1" stopColor={tint[1]} />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="112" height="108" fill={`url(#pg-${pic})`} />
      {pic === "sun" && <circle cx="66" cy="70" r="20" fill="#fff6dc" opacity=".9" />}
      {pic === "hill" && <path d="M10 118 L50 70 L80 100 L100 80 L122 118Z" fill="#9fb27a" opacity=".8" />}
      {pic === "heart" && <g className="rb-pulse"><Heart x={66} y={66} s={4} /></g>}
      {pic === "dusk" && <><circle cx="86" cy="48" r="14" fill="#fff6dc" /><path d="M10 118 L40 84 L66 106 L92 80 L122 118Z" fill="#6a4fa8" opacity=".6" /></>}
      <text x="66" y="142" textAnchor="middle" fontSize="15" fill="#7a3a6a" fontFamily="Great Vibes, cursive">
        {caption}
      </text>
    </svg>
  );
}

function Envelope({ seal = "♥" }) {
  return (
    <svg width="170" height="126" viewBox="0 0 170 126" style={{ filter: "drop-shadow(0 10px 16px rgba(60,40,30,.25))" }}>
      <rect x="6" y="14" width="158" height="104" rx="6" fill={OLIVE} />
      <rect x="22" y="2" width="126" height="80" rx="3" fill="#fbf1e6" />
      <rect x="22" y="2" width="126" height="80" rx="3" fill="none" stroke="#e58aa5" strokeWidth="5" />
      <path d="M6 20 L85 78 L164 20" fill="none" stroke="#97a96a" strokeWidth="2" />
      <path d="M6 118 L70 62 M164 118 L100 62" stroke="#6c7c45" strokeWidth="2" />
      <circle cx="85" cy="76" r="17" fill="#e0607f" />
      <circle cx="85" cy="76" r="12" fill="none" stroke="#f6a5ba" strokeWidth="1.5" />
      <text x="85" y="82" textAnchor="middle" fontSize="16" fill="#ffd9e3">{seal}</text>
    </svg>
  );
}

function Rose({ x, y, r = 22, c = "#f4a7b9" }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={c} />
      <circle r={r * 0.72} fill="#f7b9c8" stroke="#e57a96" strokeWidth="1.2" />
      <path d={`M${-r * 0.5} 0 A${r * 0.5} ${r * 0.5} 0 0 1 ${r * 0.5} 0`} fill="none" stroke="#e57a96" strokeWidth="1.5" />
      <circle r={r * 0.38} fill="#f2a0b6" stroke="#e57a96" strokeWidth="1.2" />
      <path d={`M${-r * 0.2} ${r * 0.05} A${r * 0.2} ${r * 0.2} 0 1 1 ${r * 0.2} ${r * 0.05}`} fill="none" stroke="#d6607f" strokeWidth="1.3" />
    </g>
  );
}

function Blossom({ x, y, r = 9 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={-r * 0.9} rx={r * 0.55} ry={r * 0.8} fill="#fff7f2" stroke="#f1c7d2" strokeWidth=".8" transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.3} fill="#ffd79a" />
    </g>
  );
}

function Leaf({ x, y, rot = 0, s = 1 }) {
  return <ellipse cx={x} cy={y} rx={9 * s} ry={22 * s} fill="#8a9b5e" transform={`rotate(${rot} ${x} ${y})`} />;
}

function Anthurium({ x, y, s = 1, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 76 C0 100 -4 120 -10 142" stroke="#8a9b5e" strokeWidth="4" fill="none" />
      <path d="M0 76 C-34 50 -40 24 -20 10 C-8 2 0 12 0 18 C0 12 8 2 20 10 C40 24 34 50 0 76Z" fill="#f2a0b6" />
      <path d="M0 70 C-22 48 -26 28 -14 18" stroke="#fbc6d3" strokeWidth="3" fill="none" />
      <path d="M0 58 C8 48 6 38 12 30" stroke="#fff3df" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="29" r="3.5" fill="#fff" />
      <circle cx="-14" cy="14" r="3" fill="#fff" opacity=".9" />
    </g>
  );
}

function Bouquet({ flip = false }) {
  return (
    <svg width="230" height="220" viewBox="0 0 230 220" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <Leaf x={60} y={150} rot={-40} s={1.3} />
      <Leaf x={150} y={160} rot={40} s={1.2} />
      <Leaf x={105} y={168} rot={5} s={1.1} />
      <g fill="#eef1ff" opacity=".95">
        {[[40, 110], [58, 96], [48, 128], [72, 112], [30, 128], [172, 120], [188, 104], [160, 138], [196, 128]].map(([a, b], i) => (
          <circle key={i} cx={a} cy={b} r="9" fill={i % 2 ? "#fff" : "#f4f0ff"} stroke="#e2dcf3" strokeWidth=".8" />
        ))}
      </g>
      <Rose x={96} y={108} r={30} />
      <Rose x={146} y={118} r={24} c="#f7b3c3" />
      <Rose x={70} y={142} r={22} c="#f2a0b6" />
      <Blossom x={120} y={82} r={11} />
      <Blossom x={52} y={94} r={9} />
      <Blossom x={178} y={92} r={9} />
      <Anthurium x={168} y={40} s={0.55} rot={14} />
    </svg>
  );
}

function BananaMilk() {
  return (
    <svg width="96" height="150" viewBox="0 0 96 150" style={{ filter: "drop-shadow(0 8px 14px rgba(80,50,20,.25))" }}>
      <line x1="62" y1="6" x2="52" y2="30" stroke="#ff8fb3" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 34 L48 20 L78 34 V138 H18Z" fill="#ffe27a" stroke="#d9a93a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 20 L78 34 H18Z" fill="#fff0a8" />
      <rect x="28" y="62" width="40" height="48" rx="8" fill="#fffdf2" />
      <text x="48" y="82" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b8860b" fontFamily="Quicksand, sans-serif">BANANA</text>
      <text x="48" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b8860b" fontFamily="Quicksand, sans-serif">MILK</text>
      <g className="rb-pulse"><Heart x={48} y={50} s={0.8} /></g>
    </svg>
  );
}

function PhotoStrip({ count = 4 }) {
  const tints = ["#fbd1de", "#ffe0b5", "#d7e6c0", "#e4d3f6"];
  return (
    <div className="rounded-md bg-[#fffdf9] p-2.5 shadow-[0_12px_28px_rgba(80,30,60,.3)]">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="mb-2 flex h-[74px] w-[92px] items-center justify-center last:mb-0" style={{ background: tints[i % 4] }}>
          <svg width="44" height="44" viewBox="-16 -16 32 32"><Heart y={2} fill={i === 3 ? "#e0607f" : ROSE} s={i === 3 ? 1.6 : 1.2} /></svg>
        </div>
      ))}
    </div>
  );
}

function Toast() {
  return (
    <svg width="104" height="104" viewBox="0 0 64 64" style={{ filter: "drop-shadow(0 8px 12px rgba(120,70,20,.25))" }}>
      <path d="M12 30 Q10 14 28 14 Q32 8 40 12 Q54 10 54 26 Q58 30 54 36 V54 H12Z" fill="#f6d08f" stroke={PLUM} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M18 30 Q18 22 28 22 Q32 18 38 21 Q46 20 46 28 V48 H18Z" fill="#fde7bd" />
      <circle cx="50" cy="20" r="6" fill="#fff6e8" />
      <circle cx="56" cy="26" r="4" fill="#fff6e8" />
      <g className="rb-pulse"><Heart x={32} y={36} s={1.1} /></g>
    </svg>
  );
}

function NotesCard({ title = "Notes", lines = [] }) {
  return (
    <div className="font-cute w-[250px] overflow-hidden rounded-2xl bg-[#fffbe8] shadow-[0_14px_30px_rgba(90,60,20,.28)]">
      <div className="flex items-center justify-between bg-[#ffd95e] px-4 py-2 text-sm font-bold text-[#6b4a00]">
        <span>‹ {title}</span>
        <span>•••</span>
      </div>
      <div className="space-y-1.5 px-4 py-3 text-left text-[13px] font-semibold leading-snug text-[#5a3a2a]">
        {lines.map((l, i) => (
          <p key={i} className={l.startsWith("~") ? "text-[#c0396b] line-through" : ""}>
            {l.replace(/^~/, "")}
          </p>
        ))}
      </div>
    </div>
  );
}

function Bubble({ text, me = false, small = "" }) {
  return (
    <div className={`flex flex-col ${me ? "items-end" : "items-start"}`}>
      <div
        className={`font-cute max-w-[230px] rounded-2xl px-4 py-2.5 text-[15px] font-semibold shadow-[0_8px_20px_rgba(120,40,80,.2)] ${
          me ? "rounded-br-sm bg-[#ff7aa8] text-white" : "rounded-bl-sm bg-white text-[#4a2540]"
        }`}
      >
        {text}
      </div>
      {small && <span className="font-cute mt-1 text-[11px] font-semibold text-[#7a3a6a]/70">{small}</span>}
    </div>
  );
}

function Sticky({ text }) {
  return (
    <div
      className="flex h-[118px] w-[118px] items-center justify-center p-3 text-center font-script text-[26px] leading-6 text-[#6b3a3a] shadow-[0_10px_20px_rgba(120,80,20,.25)]"
      style={{ background: "#fff0a0", transform: "rotate(-4deg)" }}
    >
      {text}
    </div>
  );
}

function Badge({ text }) {
  return (
    <div
      className="flex h-[112px] w-[150px] items-center justify-center text-center font-script text-[30px] leading-7 text-[#fff6e8] shadow-[0_10px_22px_rgba(60,70,30,.3)]"
      style={{ background: OLIVE, borderRadius: "46% 54% 50% 50% / 56% 52% 48% 44%", outline: "2px dashed #f6ead2", outlineOffset: "-8px" }}
    >
      {text}
    </div>
  );
}

function FairyLights({ n = 14 }) {
  const pts = useMemo(() => Array.from({ length: n }, (_, i) => ({ x: (i + 0.5) * (1600 / n), y: 60 + Math.sin(i * 0.9) * 26 + (i % 2) * 14 })), [n]);
  return (
    <svg viewBox="0 0 1600 140" preserveAspectRatio="none" className="absolute left-0 top-0 h-[16vh] w-full">
      <path d="M-20 40 Q200 120 400 50 T800 50 T1200 50 T1620 40" fill="none" stroke="#3a1d44" strokeWidth="2" opacity=".5" />
      {pts.map((p, i) => (
        <g key={i} className="rb-twinkle" style={{ animationDelay: `${i * 0.25}s` }}>
          <circle cx={p.x} cy={p.y} r="22" fill="#ffd9a0" opacity=".35" />
          <circle cx={p.x} cy={p.y} r="7" fill="#fff1c0" />
        </g>
      ))}
    </svg>
  );
}

/* ---------------- which stickers appear in which scene ---------------- */
// pos: left/right/top/bottom in %. s = scale, r = rotation, d = animation delay, m = show on mobile too

const ART = {
  gate: [
    { k: "bubble-me", left: 5, top: 18, d: 0.5, el: <Bubble me text="CRASH!!! ☕💥" small="7:52 AM" /> },
    { k: "icon", n: "coffee", left: 9, top: 44, s: 1.3, r: -14 },
    { k: "icon", n: "board", right: 6, top: 18, s: 1.4, r: 10, d: 1 },
    { k: "toast", right: 9, top: 52, r: 12, d: 1.5 },
    { k: "polaroid", pic: "sun", caption: "day 1", left: 15, top: 66, s: 0.75, r: -8, d: 2 },
    { k: "badge", right: 3, bottom: 6, text: "Day 1 🍂", r: 5 },
    { k: "bouquet", left: -2, bottom: -3 },
  ],
  classroom: [
    { k: "sticky", left: 6, top: 18, text: "Seat 18: your doom", r: -4 },
    { k: "icon", n: "book", left: 5, top: 56, s: 1.1, r: -8, d: 1 },
    { k: "icon", n: "bell", right: 7, top: 20, s: 1.1, r: 6, d: 2 },
    { k: "polaroid", pic: "heart", caption: "3-B", right: 4, top: 50, s: 0.85, r: 6, d: 1 },
    { k: "icon", n: "star", right: 20, top: 8, d: 0.5 },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
    { k: "badge", left: 3, bottom: 8, text: "Class 3-B", r: -5 },
  ],
  canteen: [
    { k: "icon", n: "bowl", left: 7, top: 22, s: 1.3, r: -8 },
    { k: "milk", left: 8, top: 48, r: -10 },
    { k: "milk", right: 9, top: 22, r: 10, d: 1.5 },
    { k: "bubble-seen", right: 6, top: 56, d: 1, el: <Bubble text="Mina: I am filming 🎥" /> },
    { k: "icon", n: "star", left: 18, top: 10, d: 0.5 },
    { k: "badge", right: 3, bottom: 6, text: "Canteen", r: 6 },
    { k: "bouquet", left: -2, bottom: -3 },
  ],
  library: [
    { k: "icon", n: "book", left: 6, top: 20, s: 1.4, r: -8 },
    { k: "icon", n: "pencil", left: 10, top: 56, s: 1.2, r: -12, d: 1 },
    { k: "sticky", right: 7, top: 18, text: "Truce? (festival only)", r: 5 },
    { k: "polaroid", pic: "dusk", caption: "poster", right: 5, top: 52, s: 0.85, r: 6, d: 1 },
    { k: "icon", n: "star", right: 24, top: 8, d: 0.5 },
    { k: "badge", left: 3, bottom: 6, text: "Library", r: -5 },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
  ],
  notes1: [
    { k: "notes", left: 5, top: 16, r: -4, lines: ["Day 1: girl crashed into me", "Day 1 (later): she stole my banana milk", "Day 2: why do I keep looking at row 3", "Day 3: she laughs with her whole face", "~Delete this note", "Do NOT delete this note"] },
    { k: "icon", n: "moon", right: 8, top: 18, s: 1.5, r: 8 },
    { k: "icon", n: "phone", right: 9, top: 56, s: 1.2, r: -6, d: 1 },
    { k: "bubble-seen", right: 5, top: 42, d: 1.5, el: <Bubble text="meanwhile... 👀" /> },
    { k: "bouquet", left: -2, bottom: -3 },
  ],
  notes2: [
    { k: "notes", right: 5, top: 16, r: 4, lines: ["Day 6: she took my earphone", "She hummed the wrong lyrics", "I did not correct her", "Mina: why smile at a wall?", "Me: it is a nice wall", "~it is not a nice wall", "I think I like her"] },
    { k: "icon", n: "moon", left: 8, top: 18, s: 1.5, r: -8 },
    { k: "icon", n: "winged", left: 10, top: 54, s: 1.4, r: 6, d: 1 },
    { k: "bubble-me", left: 5, top: 40, d: 1.5, el: <Bubble me text="meanwhile, again 🙈" /> },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
  ],
  court: [
    { k: "icon", n: "ball", left: 7, top: 22, s: 1.5, r: -10 },
    { k: "bubble-me", left: 5, top: 52, d: 1, el: <Bubble me text="HEADS UP!!! 🏀" /> },
    { k: "icon", n: "bell", right: 8, top: 20, s: 1.1, r: 8 },
    { k: "polaroid", pic: "sun", caption: "dimple?", right: 5, top: 48, s: 0.85, r: 6, d: 1 },
    { k: "icon", n: "star", right: 22, top: 8, d: 0.5 },
    { k: "badge", left: 3, bottom: 6, text: "The Court", r: -5 },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
  ],
  bedroom: [
    { k: "icon", n: "moon", left: 8, top: 16, s: 1.6, r: -8 },
    { k: "bubble-seen", left: 4, top: 46, d: 1, el: <Bubble text="Mina: hate = love 🙄" /> },
    { k: "bubble-me", left: 8, top: 62, d: 1.8, el: <Bubble me text="NO. 😤" /> },
    { k: "bubble-seen", right: 5, top: 20, d: 2.4, el: <Bubble text="Unknown: Pink or green? - J" small="new message" /> },
    { k: "icon", n: "phone", right: 8, top: 52, s: 1.3, r: 8, d: 1 },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
  ],
  rooftop: [
    { k: "lights" },
    { k: "icon", n: "moon", right: 7, top: 16, s: 1.6, r: 8 },
    { k: "icon", n: "winged", left: 8, top: 30, s: 1.5, r: -8, d: 1 },
    { k: "polaroid", pic: "dusk", caption: "up here", right: 5, top: 50, s: 0.9, r: 7, d: 1 },
    { k: "notes", left: 5, top: 56, r: -3, lines: ["Things I Did Not Plan:", "1. The crash", "2. Banana milk war", "3. Falling for the coffee girl"] },
    { k: "badge", right: 4, bottom: 6, text: "Rooftop", r: 6 },
    { k: "bouquet", left: -2, bottom: -3 },
  ],
  festival: [
    { k: "lights" },
    { k: "icon", n: "ticket", left: 6, top: 26, s: 1.2, r: -8 },
    { k: "icon", n: "camera", right: 6, top: 28, s: 1.2, r: 7, d: 1 },
    { k: "icon", n: "umbrella", left: 8, top: 58, s: 1.1, r: 6, d: 2 },
    { k: "icon", n: "gift", right: 9, top: 58, s: 1.1, r: -6, d: 1.5 },
    { k: "badge", right: 3, bottom: 6, text: "School Festival", r: 5 },
    { k: "bouquet", left: -2, bottom: -3 },
  ],
  photo: [
    { k: "lights" },
    { k: "strip", left: 8, top: 18, r: -6 },
    { k: "strip", right: 8, top: 20, r: 7, d: 1.5, count: 3 },
    { k: "icon", n: "camera", right: 10, top: 62, s: 1.1, r: 5, d: 1 },
    { k: "icon", n: "winged", left: 12, top: 66, s: 1.2, r: -6, d: 2 },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
  ],
  rain: [
    { k: "icon", n: "umbrella", left: 10, top: 28, s: 1.8, r: -8 },
    { k: "icon", n: "phones", right: 10, top: 24, s: 1.3, r: 8, d: 1 },
    { k: "polaroid", pic: "dusk", caption: "rain", right: 8, top: 54, s: 0.9, r: 6, d: 1 },
    { k: "badge", left: 4, bottom: 8, text: "Bus Stop", r: -5 },
    { k: "bouquet", right: -2, bottom: -3, flip: true },
    { k: "drops" },
  ],
  confession: [
    { k: "lights" },
    { k: "icon", n: "winged", left: 8, top: 24, s: 1.8, r: -6 },
    { k: "icon", n: "winged", right: 9, top: 30, s: 1.4, r: 8, d: 1 },
    { k: "bubble-me", left: 5, top: 62, el: <Bubble me text="Seen. Replied. 💗" small="sent to: Class 3-B" /> },
    { k: "bubble-seen", right: 5, top: 62, d: 1.5, el: <Bubble text="31 people seen this 😭" /> },
    { k: "envelope", right: 4, top: 8, s: 0.8, r: 8, d: 2 },
    { k: "bouquet", left: -2, bottom: -3 },
  ],
};

function renderItem(it) {
  switch (it.k) {
    case "envelope": return <Envelope />;
    case "polaroid": return <Polaroid pic={it.pic} caption={it.caption} />;
    case "icon": { const I = ICONS[it.n]; return I ? <I /> : null; }
    case "bouquet": return <Bouquet flip={it.flip} />;
    case "badge": return <Badge text={it.text} />;
    case "sticky": return <Sticky text={it.text} />;
    case "milk": return <BananaMilk />;
    case "toast": return <Toast />;
    case "notes": return <NotesCard lines={it.lines} />;
    case "strip": return <PhotoStrip count={it.count || 4} />;
    default: return it.el || null;
  }
}

/* ---------------- main ---------------- */

export default function RomanceBackdrop({ art = "hallway", palette = "sage" }) {
  const p = PALETTES[palette] || PALETTES.sage;
  const items = ART[art] || ART.hallway;
  const bokeh = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      left: (i * 37 + 11) % 100,
      size: 18 + ((i * 13) % 42),
      dur: 14 + ((i * 7) % 12),
      delay: -((i * 5) % 16),
    })),
    []
  );
  const drops = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({ left: (i * 29 + 5) % 100, dur: 1.2 + ((i * 3) % 7) / 10, delay: -((i * 7) % 20) / 10, h: 24 + ((i * 11) % 24) })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `linear-gradient(180deg, ${p.g[0]}, ${p.g[1]} 55%, ${p.g[2]})` }}>
      {/* blurry meadow (like the blurred flower field in the mood board) */}
      <div className="absolute inset-x-0 bottom-0 h-[55%]" style={{ filter: "blur(46px)", opacity: 0.85 }}>
        {p.blobs.map((c, i) => (
          <div
            key={i}
            className="rb-drift absolute rounded-full"
            style={{
              background: c,
              width: `${34 + i * 6}%`,
              height: `${70 - i * 8}%`,
              left: `${i * 24 - 8}%`,
              bottom: `${-20 + (i % 2) * 14}%`,
              animationDelay: `${-i * 3.5}s`,
            }}
          />
        ))}
      </div>

      {/* soft light from the top */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(255,255,255,.55), transparent 70%)" }} />

      {/* bokeh */}
      {bokeh.map((b, i) => (
        <span
          key={i}
          className="rb-bokeh absolute bottom-[-8%] rounded-full"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: "radial-gradient(circle, rgba(255,255,255,.9), rgba(255,255,255,.15) 70%)",
            filter: "blur(2px)",
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* collage */}
      {items.map((it, i) => {
        if (it.k === "lights") return <FairyLights key={i} />;
        if (it.k === "drops")
          return (
            <div key={i} className="absolute inset-0">
              {drops.map((d, j) => (
                <span key={j} className="rb-rain absolute top-0 w-px rounded-full bg-white/60" style={{ left: `${d.left}%`, height: d.h, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
              ))}
            </div>
          );
        const pos = { left: it.left !== undefined ? `${it.left}%` : undefined, right: it.right !== undefined ? `${it.right}%` : undefined, top: it.top !== undefined ? `${it.top}%` : undefined, bottom: it.bottom !== undefined ? `${it.bottom}%` : undefined };
        const depth = 8 + (i % 3) * 8;
        return (
          <div
            key={i}
            className="absolute hidden md:block"
            style={{ ...pos, transform: `translate3d(calc(var(--mx, 0) * ${-depth}px), calc(var(--my, 0) * ${-depth / 2}px), 0)`, transition: "transform .25s ease-out" }}
          >
            <div className="rb-float" style={{ animationDelay: `${it.d || 0}s`, animationDuration: `${6 + (i % 4)}s` }}>
              <div style={{ transform: `scale(${it.s || 1}) rotate(${it.r || 0}deg)`, transformOrigin: "center" }}>{renderItem(it)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
