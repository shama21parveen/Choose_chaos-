export default function FogLayer({ density = 1 }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      style={{ opacity: Math.min(0.55 + density * 0.2, 1) }}
    >
      <div className="fog fog-1" />
      <div className="fog fog-2" />
      <div className="fog fog-3" />
      {density >= 2 && (
        <>
          <div className="fog fog-4" />
          <div className="fog fog-5" />
        </>
      )}
    </div>
  );
}
