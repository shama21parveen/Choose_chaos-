// Hidden scribbles and watching eyes that only show up inside the "torch light"
// that follows the mouse. App.jsx sets --tx / --ty (mouse position) on the page.

const MARKS = [
  { t: "DON'T LOOK BACK", x: 5, y: 16, r: -8, size: "text-4xl md:text-6xl" },
  { t: "WHO CALLED YOU?", x: 56, y: 10, r: 5, size: "text-3xl md:text-5xl" },
  { t: "SHE WAS HERE", x: 8, y: 60, r: 4, size: "text-4xl md:text-6xl" },
  { t: "SEEN 12:04 AM", x: 60, y: 68, r: -6, size: "text-3xl md:text-5xl" },
  { t: "RUN", x: 40, y: 40, r: -3, size: "text-6xl md:text-8xl" },
  { t: "NAINA?", x: 80, y: 38, r: 8, size: "text-4xl md:text-6xl" },
  { t: "TRUST NO ONE", x: 28, y: 84, r: -4, size: "text-3xl md:text-5xl" },
];

const EYES = [
  { x: 22, y: 33 },
  { x: 72, y: 22 },
  { x: 50, y: 76 },
  { x: 90, y: 62 },
];

function Eyes({ x, y }) {
  return (
    <svg className="absolute" style={{ left: `${x}%`, top: `${y}%` }} width="90" height="34" viewBox="0 0 90 34">
      {[22, 68].map((cx) => (
        <g key={cx} className="blink">
          <ellipse cx={cx} cy="17" rx="16" ry="9" fill="#120606" stroke="#e11d2e" strokeOpacity=".7" />
          <circle cx={cx} cy="17" r="5" fill="#ff3b3b" />
        </g>
      ))}
    </svg>
  );
}

export default function TorchReveal() {
  return (
    <>
      <div className="torch-glow" />
      <div className="torch-reveal">
        {MARKS.map((m) => (
          <p
            key={m.t}
            className={`absolute whitespace-nowrap font-hand text-red-600 drop-shadow-[0_0_18px_rgba(225,29,46,0.8)] ${m.size}`}
            style={{ left: `${m.x}%`, top: `${m.y}%`, transform: `rotate(${m.r}deg)` }}
          >
            {m.t}
          </p>
        ))}
        {EYES.map((e, i) => (
          <Eyes key={i} {...e} />
        ))}
      </div>
    </>
  );
}
