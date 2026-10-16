import { useId, useMemo } from "react";

// Hand-drawn SVG scenes. Every layer has the same 1600x900 viewBox so they line up,
// and each layer moves a little with the mouse (parallax) for depth.

const SKIES = {
  night: ["#02070a", "#0a1a16", "#17382f", "#9fd8c0", "#e8efe0"],
  dawn: ["#1c2a3d", "#a4604a", "#f0b574", "#ffd9a0", "#fff1cf"],
  blood: ["#12030a", "#2a0710", "#4a0f16", "#ff5a5a", "#ffb0a0"],
  void: ["#0a0212", "#1c0728", "#3a0e4d", "#d98cff", "#f3dcff"],
};

function rng(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const SVG = {
  viewBox: "0 0 1600 900",
  preserveAspectRatio: "xMidYMax slice",
};

/* ---------------- Background layers ---------------- */

function Sky({ id, sky }) {
  const c = SKIES[sky] || SKIES.night;
  const stars = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 90 }, () => ({
      x: r() * 1600,
      y: r() * 520,
      r: r() * 1.6 + 0.3,
      d: r() * 4,
    }));
  }, []);

  return (
    <svg {...SVG} className="h-full w-full">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset=".6" stopColor={c[1]} />
          <stop offset="1" stopColor={c[2]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={c[3]} stopOpacity=".85" />
          <stop offset="1" stopColor={c[3]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />
      {sky !== "dawn" &&
        stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#fff"
            className="twinkle"
            style={{ animationDelay: `${s.d}s` }}
          />
        ))}
      {sky === "dawn" ? (
        <>
          <circle cx="800" cy="610" r="380" fill={`url(#${id}-glow)`} />
          <circle cx="800" cy="610" r="90" fill={c[4]} />
        </>
      ) : (
        <>
          <circle cx="1180" cy="190" r="270" fill={`url(#${id}-glow)`} />
          <circle cx="1180" cy="190" r="62" fill={c[4]} />
          <circle cx="1164" cy="176" r="12" fill="#000" opacity=".08" />
          <circle cx="1198" cy="208" r="8" fill="#000" opacity=".08" />
        </>
      )}
      {sky === "void" && (
        <>
          <circle cx="420" cy="250" r="150" fill={`url(#${id}-glow)`} />
          <circle cx="420" cy="250" r="40" fill={c[4]} />
        </>
      )}
    </svg>
  );
}

function Hills() {
  return (
    <svg {...SVG} className="h-full w-full">
      <defs>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fb8a8" stopOpacity="0" />
          <stop offset=".55" stopColor="#9fb8a8" stopOpacity=".2" />
          <stop offset="1" stopColor="#9fb8a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 640 L120 560 L260 620 L420 480 L600 610 L760 520 L940 630 L1120 490 L1300 600 L1460 530 L1600 610 L1600 900 L0 900Z"
        fill="#0d211a"
      />
      <rect y="440" width="1600" height="300" fill="url(#haze)" />
      <path
        d="M0 720 L180 640 L340 700 L520 600 L700 710 L900 630 L1080 720 L1260 620 L1440 700 L1600 650 L1600 900 L0 900Z"
        fill="#08150f"
      />
    </svg>
  );
}

function Pines() {
  const trees = useMemo(() => {
    const r = rng(42);
    const out = [];
    for (let x = -20; x < 1640; x += 26 + r() * 30) {
      out.push({ x, h: 110 + r() * 170, w: 20 + r() * 14 });
    }
    return out;
  }, []);

  return (
    <svg {...SVG} className="h-full w-full">
      <g fill="#040a08">
        {trees.map((t, i) => (
          <path
            key={i}
            d={`M${t.x - t.w} 830 L${t.x} ${830 - t.h * 0.55} L${t.x + t.w} 830Z
                M${t.x - t.w * 0.8} ${830 - t.h * 0.35} L${t.x} ${830 - t.h * 0.8} L${t.x + t.w * 0.8} ${830 - t.h * 0.35}Z
                M${t.x - t.w * 0.6} ${830 - t.h * 0.6} L${t.x} ${830 - t.h} L${t.x + t.w * 0.6} ${830 - t.h * 0.6}Z`}
          />
        ))}
      </g>
      <rect y="826" width="1600" height="80" fill="#040a08" />
    </svg>
  );
}

/* ---------------- Scene props ---------------- */

function Ground() {
  return (
    <g>
      <rect y="800" width="1600" height="100" fill="#030605" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={i * 140 + 20} y="850" width="70" height="6" fill="#1b2723" />
      ))}
    </g>
  );
}

function Bus() {
  return (
    <g transform="translate(800 668)">
      <polygon className="flicker-slow" points="372,84 1050,10 1050,200 372,102" fill="url(#beam)" />
      <rect width="380" height="120" rx="16" fill="#0a100e" />
      {[14, 76, 138, 200, 262].map((x) => (
        <rect key={x} x={x} y="16" width="52" height="44" rx="4" fill="#d9c98a" opacity=".22" />
      ))}
      <rect x="322" y="14" width="46" height="52" rx="4" fill="#cfe9dc" opacity=".35" />
      <rect y="86" width="380" height="8" fill="#1b2723" />
      <circle cx="84" cy="124" r="24" fill="#020403" />
      <circle cx="290" cy="124" r="24" fill="#020403" />
      <circle cx="372" cy="84" r="8" fill="#fff6c8" />
      <text x="96" y="80" fontSize="18" fill="#d4a24c" opacity=".7" fontFamily="Bebas Neue" letterSpacing="4">
        DHUNDHGIRI EXPRESS
      </text>
    </g>
  );
}

function TeaStall() {
  return (
    <g transform="translate(900 580)">
      <polygon points="-30,50 190,-30 410,50" fill="#07100d" />
      <rect x="0" y="50" width="380" height="180" fill="#0a1411" />
      <rect x="20" y="130" width="340" height="14" fill="#1a2420" />
      <circle className="flicker" cx="190" cy="80" r="110" fill="url(#glow-warm)" />
      <circle cx="190" cy="80" r="9" fill="#ffd27a" />
      <line x1="190" y1="50" x2="190" y2="72" stroke="#1a2420" strokeWidth="3" />
      <rect x="60" y="104" width="46" height="26" rx="6" fill="#050a08" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          className="steam"
          style={{ animationDelay: `${i * 1.1}s` }}
          cx={72 + i * 8}
          cy="100"
          r="9"
          fill="#cfd8d4"
          opacity=".4"
        />
      ))}
      <circle cx="290" cy="104" r="17" fill="#030605" />
      <path d="M262 150 Q268 124 290 122 Q312 124 318 150Z" fill="#030605" />
    </g>
  );
}

function Hotel() {
  const lit = { "0-3": 1, "1-0": 1, "2-4": 1, "0-1": 1 };
  return (
    <g transform="translate(860 290)">
      <polygon points="0,160 270,20 540,160" fill="#070f0c" />
      <rect x="20" y="160" width="500" height="350" fill="#0a1411" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const key = `${row}-${col}`;
          const red = key === "1-3";
          return (
            <rect
              key={key}
              x={50 + col * 90}
              y={190 + row * 100}
              width="50"
              height="62"
              rx="3"
              fill={red ? "#ff2a2a" : lit[key] ? "#f2c36b" : "#050a08"}
              opacity={red ? 0.9 : lit[key] ? 0.75 : 1}
              className={red ? "pl-red" : lit[key] ? "flicker" : ""}
              style={lit[key] ? { animationDelay: `${(row + col) * 0.7}s` } : undefined}
            />
          );
        })
      )}
      <rect x="240" y="418" width="60" height="92" fill="#d4a24c" opacity=".35" />
      <rect x="160" y="108" width="220" height="44" fill="#05100c" stroke="#d4a24c" strokeOpacity=".6" />
      <text
        x="270"
        y="140"
        textAnchor="middle"
        fontSize="32"
        fill="#d4a24c"
        fontFamily="Bebas Neue"
        letterSpacing="5"
        className="flicker"
      >
        HOTEL DHUNDH
      </text>
    </g>
  );
}

function Lobby() {
  return (
    <g>
      <defs>
        <linearGradient id="lobby-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c0709" />
          <stop offset="1" stopColor="#1a0c10" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#lobby-wall)" />
      <rect y="760" width="1600" height="140" fill="#07040a" />
      <g transform="translate(300 0)">
      {/* man behind the counter */}
      <circle cx="800" cy="390" r="46" fill="#030203" />
      <path d="M680 600 Q690 450 800 440 Q910 450 920 600Z" fill="#030203" />
      <ellipse className="blink" cx="784" cy="384" rx="5" ry="4" fill="#ffe9a8" />
      <ellipse className="blink" cx="816" cy="384" rx="5" ry="4" fill="#ffe9a8" />
      <rect x="420" y="580" width="760" height="240" fill="#150b0e" />
      <rect x="420" y="574" width="760" height="12" fill="#2a1519" />
      {/* red scarf on a hook */}
      <circle cx="1200" cy="330" r="6" fill="#4a3a2a" />
      <path className="sway" d="M1194 334 Q1182 400 1204 470 Q1216 420 1210 336Z" fill="#c1121f" />
      {/* swinging bulb */}
      <g className="swing" style={{ transformOrigin: "800px 0px" }}>
        <line x1="800" y1="0" x2="800" y2="190" stroke="#2a2a2a" strokeWidth="3" />
        <circle className="flicker" cx="800" cy="205" r="150" fill="url(#glow-warm)" />
        <circle cx="800" cy="205" r="13" fill="#ffe3a0" />
      </g>
      </g>
    </g>
  );
}

function Room() {
  return (
    <g>
      <defs>
        <linearGradient id="room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b090c" />
          <stop offset="1" stopColor="#140d10" />
        </linearGradient>
        <linearGradient id="room-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#04101a" />
          <stop offset="1" stopColor="#17382f" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#room-wall)" />
      <rect y="720" width="1600" height="180" fill="#080508" />
      <g transform="translate(640 0)">
        {/* window with moon */}
        <rect x="0" y="150" width="320" height="400" fill="url(#room-sky)" stroke="#2a1d1a" strokeWidth="12" />
        <circle cx="210" cy="250" r="34" fill="#e8efe0" />
        <path d="M0 550 L30 470 L60 550 M70 550 L105 440 L140 550 M160 550 L190 480 L220 550Z" fill="#030806" />
        <line x1="160" y1="150" x2="160" y2="550" stroke="#2a1d1a" strokeWidth="8" />
        <line x1="0" y1="350" x2="320" y2="350" stroke="#2a1d1a" strokeWidth="8" />
        <path className="sway" d="M-30 130 L30 130 Q50 340 10 560 L-30 560Z" fill="#2a1216" />
        <path className="sway" d="M350 130 L290 130 Q270 340 310 560 L350 560Z" fill="#2a1216" />
        {/* bed */}
        <rect x="370" y="580" width="470" height="150" rx="8" fill="#120c0e" />
        <rect x="370" y="500" width="30" height="230" fill="#0a0709" />
        <rect x="410" y="560" width="130" height="40" rx="14" fill="#241a1d" />
        <path d="M540 600 Q660 560 840 610 L840 730 L540 730Z" fill="#1c1215" />
        {/* table + diary */}
        <rect x="870" y="620" width="90" height="110" fill="#0a0709" />
        <circle className="flicker" cx="915" cy="610" r="120" fill="url(#glow-warm)" opacity=".7" />
        <rect x="880" y="604" width="70" height="16" rx="2" fill="#d4a24c" opacity=".9" />
      </g>
      {/* swinging bulb */}
      <g className="swing" style={{ transformOrigin: "1000px 0px" }}>
        <line x1="1000" y1="0" x2="1000" y2="170" stroke="#2a2a2a" strokeWidth="3" />
        <circle className="flicker" cx="1000" cy="185" r="130" fill="url(#glow-warm)" />
        <circle cx="1000" cy="185" r="12" fill="#ffe3a0" />
      </g>
    </g>
  );
}

function Police() {
  return (
    <g>
      <g transform="translate(640 470)">
        <rect width="560" height="330" fill="#0a1210" />
        <rect x="-20" y="-16" width="600" height="26" fill="#07100d" />
        <rect x="190" y="30" width="180" height="44" fill="#06121f" stroke="#3b82f6" strokeOpacity=".6" />
        <text x="280" y="64" textAnchor="middle" fontSize="30" fill="#9cc3ff" fontFamily="Bebas Neue" letterSpacing="6">
          POLICE
        </text>
        <rect x="60" y="120" width="90" height="80" fill="#f2c36b" opacity=".4" className="flicker" />
        <rect x="410" y="120" width="90" height="80" fill="#f2c36b" opacity=".25" />
        <rect x="240" y="220" width="80" height="110" fill="#f2c36b" opacity=".35" />
        <circle className="pl-blue" cx="150" cy="-20" r="150" fill="url(#glow-blue)" />
        <circle className="pl-red" cx="410" cy="-20" r="150" fill="url(#glow-red)" />
        <rect x="140" y="-30" width="20" height="14" fill="#3b82f6" />
        <rect x="400" y="-30" width="20" height="14" fill="#ff2a2a" />
      </g>
      <g transform="translate(1290 690)">
        <polygon className="flicker-slow" points="214,60 800,0 800,170 214,76" fill="url(#beam)" />
        <path d="M0 110 L0 50 Q4 30 40 28 L90 0 L190 0 L210 40 L214 110Z" fill="#070d0b" />
        <rect x="100" y="8" width="80" height="34" fill="#a7c4d8" opacity=".25" />
        <circle cx="52" cy="112" r="22" fill="#020403" />
        <circle cx="170" cy="112" r="22" fill="#020403" />
        <circle cx="210" cy="64" r="7" fill="#fff6c8" />
      </g>
    </g>
  );
}

function Road() {
  return (
    <g>
      <polygon points="560,900 1040,900 830,560 770,560" fill="#070c0a" />
      {[0.1, 0.25, 0.42, 0.62, 0.85].map((t) => {
        const y = 560 + t * 340;
        const w = 3 + t * 14;
        const h = 6 + t * 22;
        return (
          <polygon
            key={t}
            points={`${800 - w},${y} ${800 + w},${y} ${800 + w * 1.2},${y + h} ${800 - w * 1.2},${y + h}`}
            fill="#cdbf8a"
            opacity=".5"
          />
        );
      })}
      <g transform="translate(770 628)">
        <rect width="60" height="26" rx="4" fill="#020403" />
        <rect x="10" y="-10" width="40" height="14" rx="3" fill="#020403" />
        <circle className="flicker-slow" cx="8" cy="18" r="46" fill="url(#glow-red)" />
        <circle className="flicker-slow" cx="52" cy="18" r="46" fill="url(#glow-red)" />
        <circle cx="8" cy="18" r="4" fill="#ff4a4a" />
        <circle cx="52" cy="18" r="4" fill="#ff4a4a" />
      </g>
    </g>
  );
}

function Lake({ sky }) {
  const cx = sky === "dawn" ? 800 : 1180;
  const refl = sky === "dawn" ? "#ffd9a0" : "#e8efe0";
  const double = sky === "void";
  return (
    <g>
      <rect y="640" width="1600" height="260" fill="url(#water)" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          className="shimmer"
          style={{ animationDelay: `${i * 0.25}s` }}
          x={cx - (12 + i * 9)}
          y={655 + i * 22}
          width={24 + i * 18}
          height="4"
          fill={refl}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          className="ripple"
          style={{ animationDelay: `${i * 1.3}s` }}
          cx="800"
          cy="790"
          rx="260"
          ry="26"
          fill="none"
          stroke="#9fb8a8"
          strokeOpacity=".5"
        />
      ))}
      {[80, 140, 200, 1400, 1470, 1530].map((x, i) => (
        <path key={x} className="sway" d={`M${x} 900 Q${x + 10 - i * 3} 840 ${x + 6} 760`} stroke="#050a08" strokeWidth="5" fill="none" />
      ))}
      <path d="M520 900 L1080 900 L1040 858 L560 858Z" fill="#171d1a" />
      <path d="M560 858 L1040 858 L1010 826 L590 826Z" fill="#111613" />
      <Naina x={0} opacity={1} />
      {double && <Naina x={110} opacity={0.3} />}
    </g>
  );
}

function Naina({ x, opacity }) {
  return (
    <g transform={`translate(${x} 0)`} opacity={opacity}>
      <circle cx="800" cy="762" r="21" fill="#030504" />
      <path d="M766 836 Q770 786 800 780 Q830 786 834 836Z" fill="#030504" />
      <path className="sway" d="M790 788 Q770 800 772 836 Q784 812 800 796Z" fill="#c1121f" />
    </g>
  );
}

const PROPS = { bus: Bus, tea: TeaStall, hotel: Hotel, lobby: Lobby, room: Room, police: Police, road: Road };
const INTERIOR = ["lobby", "room"];

function Props({ scene, sky }) {
  const Prop = PROPS[scene];
  const showGround = scene !== "lake" && !INTERIOR.includes(scene);
  return (
    <svg {...SVG} className={`h-full w-full ${sky === "void" ? "rgb-split" : ""}`}>
      <defs>
        <radialGradient id="glow-warm">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-red">
          <stop offset="0" stopColor="#ff2a2a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ff2a2a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-blue">
          <stop offset="0" stopColor="#3b82f6" stopOpacity=".9" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam" x1="0" x2="1">
          <stop offset="0" stopColor="#fff3c0" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff3c0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12302a" />
          <stop offset="1" stopColor="#030706" />
        </linearGradient>
      </defs>
      {showGround && <Ground />}
      {scene === "lake" ? <Lake sky={sky} /> : Prop ? <Prop /> : null}
    </svg>
  );
}

/* ---------------- Main component ---------------- */

export default function SceneArt({ scene = "hotel", sky = "night", still = false }) {
  const id = useId().replace(/:/g, "");
  const interior = INTERIOR.includes(scene);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {interior ? (
        <div className="absolute inset-0 bg-[#080507]" />
      ) : (
        <>
          <div className="layer">
            <Sky id={id} sky={sky} />
          </div>
          <div className={`layer ${still ? "" : "px-1"}`}>
            <Hills />
          </div>
          <div className={`layer ${still ? "" : "px-2"}`}>
            <Pines />
          </div>
        </>
      )}
      <div className={`layer ${still ? "" : "px-3"}`}>
        <Props scene={scene} sky={sky} />
      </div>
    </div>
  );
}
