// Countdown ring for timed choices. Turns red and beats when time is almost over.
export default function TimerRing({ left, total }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, left / total);
  const danger = left <= 3;

  return (
    <div className={`relative h-16 w-16 shrink-0 ${danger ? "heartbeat" : ""}`}>
      <svg viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={danger ? "#ef4444" : "#d4a24c"}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-3xl ${
          danger ? "text-red-400" : "text-bone"
        }`}
      >
        {Math.ceil(left)}
      </span>
    </div>
  );
}
