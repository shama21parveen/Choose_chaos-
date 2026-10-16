const TONES = {
  green: ["rgba(52, 211, 153, 0.13)", "rgba(212, 162, 76, 0.08)"],
  red: ["rgba(225, 29, 46, 0.16)", "rgba(212, 162, 76, 0.07)"],
  gold: ["rgba(212, 162, 76, 0.14)", "rgba(52, 211, 153, 0.08)"],
  purple: ["rgba(168, 85, 247, 0.14)", "rgba(225, 29, 46, 0.09)"],
};

// Two slow-moving coloured blobs behind a section, so the background is never flat.
export default function SectionGlow({ tone = "green" }) {
  const [a, b] = TONES[tone] || TONES.green;
  return (
    <div className="section-fade pointer-events-none absolute inset-0 overflow-hidden">
      <div className="glow-blob glow-a" style={{ background: a }} />
      <div className="glow-blob glow-b" style={{ background: b }} />
    </div>
  );
}
