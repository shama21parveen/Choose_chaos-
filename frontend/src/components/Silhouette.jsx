// Simple dark character shapes with a neon rim. One per genre.
export default function Silhouette({ kind, color = "#fff", size = 150 }) {
  const common = { fill: "#05060f", stroke: color, strokeWidth: 2.5, strokeLinejoin: "round" };
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 100 150" className="sil" style={{ "--c": color }} aria-hidden>
      {kind === "detective" && (
        <g {...common}>
          <path d="M22 44h56l-8-8c-3-14-9-20-20-20s-17 6-20 20z" />
          <ellipse cx="50" cy="46" rx="38" ry="6" />
          <path d="M32 58c0-6 36-6 36 0 0 10-6 18-18 18s-18-8-18-18z" />
          <path d="M22 150 26 86c6-10 18-12 24-12s18 2 24 12l4 64z" />
          <path d="M50 74v76" />
        </g>
      )}
      {kind === "student" && (
        <g {...common}>
          <path d="M28 52c-2-26 12-38 24-38s26 10 22 40c-2 10-6 6-8-4-6 6-24 6-32-2-2 4-4 8-6 4z" />
          <circle cx="50" cy="54" r="14" />
          <path d="M24 150 28 92c4-12 14-16 22-16s18 4 22 16l4 58z" />
          <rect x="68" y="88" width="16" height="30" rx="5" />
          <path d="M40 78l10 14 10-14" />
        </g>
      )}
      {kind === "astronaut" && (
        <g {...common}>
          <circle cx="50" cy="38" r="26" />
          <ellipse cx="50" cy="40" rx="16" ry="12" fill={color} fillOpacity="0.25" />
          <rect x="22" y="66" width="56" height="52" rx="14" />
          <rect x="12" y="74" width="12" height="38" rx="6" />
          <rect x="76" y="74" width="12" height="38" rx="6" />
          <rect x="30" y="116" width="16" height="34" rx="6" />
          <rect x="54" y="116" width="16" height="34" rx="6" />
          <line x1="50" y1="12" x2="50" y2="2" />
          <circle cx="50" cy="2" r="2.5" />
        </g>
      )}
      {kind === "ghost" && (
        <g {...common}>
          <path d="M20 150V54C20 28 34 16 50 16s30 12 30 38v96l-10-12-10 12-10-12-10 12-10-12z" />
          <ellipse cx="40" cy="56" rx="5" ry="8" fill={color} fillOpacity="0.8" />
          <ellipse cx="60" cy="56" rx="5" ry="8" fill={color} fillOpacity="0.8" />
          <ellipse cx="50" cy="78" rx="5" ry="7" />
        </g>
      )}
    </svg>
  );
}
