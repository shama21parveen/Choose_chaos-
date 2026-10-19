import { useEffect, useRef } from "react";

// Inside this area the normal cursor becomes a beating heart, and a trail of
// tiny hearts floats up behind it. Used for the rom-com chapters.
export default function HeartField({ children, className = "", variant = "heart" }) {
  const zone = useRef(null);
  const cur = useRef(null);
  const trail = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.("(hover: none)").matches) return;
    const el = zone.current, c = cur.current, tr = trail.current;
    let last = 0;
    const move = (e) => {
      c.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      const now = performance.now();
      if (now - last < 75) return;
      last = now;
      const s = document.createElement("span");
      s.textContent = variant === "letter" ? (Math.random() > 0.45 ? "♥" : "✉") : Math.random() > 0.3 ? "♥" : "✿";
      s.className = "heart-trail";
      s.style.left = e.clientX + (Math.random() - 0.5) * 14 + "px";
      s.style.top = e.clientY + "px";
      s.style.fontSize = 10 + Math.random() * 14 + "px";
      s.style.setProperty("--hx", (Math.random() - 0.5) * 60 + "px");
      s.addEventListener("animationend", () => s.remove());
      tr.appendChild(s);
    };
    const enter = () => el.classList.add("heart-on");
    const leave = () => el.classList.remove("heart-on");
    const down = () => c.classList.add("heart-press");
    const up = () => c.classList.remove("heart-press");
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={zone} className={`heart-zone ${className}`}>
      {children}
      <div ref={trail} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden />
      <div ref={cur} className={`heart-cursor ${variant === "letter" ? "letter-cursor" : ""}`} aria-hidden>
        {variant === "letter" ? (
          <svg viewBox="0 0 44 36" width="44" height="36">
            <rect x="3" y="8" width="38" height="25" rx="4" fill="#fff8ef" stroke="#c2325f" strokeWidth="2.4" />
            <path className="lc-flap" d="M3 11 22 24 41 11" fill="#ffe3ec" stroke="#c2325f" strokeWidth="2.4" strokeLinejoin="round" />
            <path className="lc-heart" d="M22 30c-9-6-9-11-4.5-12 2 0 3.6 1.2 4.5 2.6.9-1.4 2.5-2.6 4.5-2.6 4.5 1 4.5 6-4.5 12z" fill="#ff4d7d" stroke="#fff" strokeWidth="1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 30" width="34" height="32">
            <path d="M16 28C-6 14 4-2 16 7 28-2 38 14 16 28z" fill="#ff4d7d" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M9 9c2-3 5-3 6 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        )}
      </div>
    </div>
  );
}
