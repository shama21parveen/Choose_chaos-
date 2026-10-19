export default function DoubtMeter({ doubt, max = 5, label = "Doubt", tone = "red" }) {
  const pct = Math.min(doubt / max, 1) * 100;
  const soft = tone === "soft" || tone === "softlight";
  const light = tone === "softlight";
  return (
    <div
      className={`flex items-center gap-2 font-case text-xs uppercase tracking-widest ${
        light ? "text-white/90" : soft ? "text-[#7a3a6a]" : "text-red-300/80"
      }`}
    >
      <span className={doubt >= 3 ? "heartbeat" : ""}>♥</span>
      <span>{label}</span>
      <div className={`h-1.5 w-24 overflow-hidden rounded ${light ? "bg-white/25" : soft ? "bg-[#7a3a6a]/15" : "bg-white/10"}`}>
        <div
          className={`h-full transition-all duration-700 ${soft ? "bg-gradient-to-r from-[#ff9ec0] to-[#ff5c8d]" : "bg-red-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
