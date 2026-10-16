import { motion, useReducedMotion } from "framer-motion";

export default function DoubtMeter({ doubt, max = 5 }) {
  const reduceMotion = useReducedMotion();
  const pct = Math.min(doubt / max, 1) * 100;
  return (
    <div
      className={`doubt-meter flex items-center gap-2 font-case text-xs uppercase tracking-widest text-red-300/80 ${doubt >= 3 ? "doubt-meter-high" : ""}`}
      role="progressbar"
      aria-label="Doubt level"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(doubt, max)}
    >
      <span className={doubt >= 3 ? "heartbeat" : ""}>♥</span>
      <span>Doubt</span>
      <div className="doubt-track h-1.5 w-24 overflow-hidden rounded bg-white/10">
        <motion.div
          className="doubt-fill h-full rounded bg-red-500"
          animate={{
            width: `${pct}%`,
            backgroundColor: doubt >= 4 ? "#dc2626" : "#ef4444",
            boxShadow: doubt >= 3 ? "0 0 10px rgba(239, 68, 68, 0.65)" : "none",
          }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
        />
      </div>
      <span className="tabular-nums text-red-200/60">{Math.min(doubt, max)}/{max}</span>
    </div>
  );
}
