import { useEffect, useRef } from "react";

// Hub cursor: a glowing ember with a comet tail and a lagging ring.
// The ring grows (and shows a tiny label) over things you can click.
// Touch devices keep their normal behaviour.
const TAIL = 8;

export default function HubCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);
  const tail = useRef([]);

  useEffect(() => {
    if (window.matchMedia?.("(hover: none), (pointer: coarse)").matches) return;
    const root = document.documentElement;
    root.classList.add("hub-cursor-on");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const pts = Array.from({ length: TAIL }, () => ({ x: -100, y: -100 }));
    let raf, hot = false, shown = false;

    const set = (el, x, y, s = 1) => { if (el) el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${s})`; };

    const move = (e) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const inside = e.target.closest?.(".hub-root");
      const want = Boolean(inside);
      if (want !== shown) {
        shown = want;
        [dot.current, ring.current, ...tail.current].forEach((n) => n && (n.style.opacity = want ? "" : "0"));
      }
      const t = e.target.closest?.("a, button, [data-cursor]");
      const isHot = Boolean(t);
      if (isHot !== hot) {
        hot = isHot;
        ring.current?.classList.toggle("hc-hot", hot);
      }
      if (label.current) label.current.textContent = t?.dataset?.cursor || "";
    };
    const down = () => ring.current?.classList.add("hc-press");
    const up = () => ring.current?.classList.remove("hc-press");
    window.addEventListener("mousemove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    const frame = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      set(ring.current, ringPos.x, ringPos.y);
      set(dot.current, pos.x, pos.y);
      let px = pos.x, py = pos.y;
      pts.forEach((p, i) => {
        p.x += (px - p.x) * 0.38;
        p.y += (py - p.y) * 0.38;
        set(tail.current[i], p.x, p.y, 1 - i / (TAIL + 2));
        px = p.x; py = p.y;
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("hub-cursor-on");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div aria-hidden className="hub-cursor">
      {Array.from({ length: TAIL }, (_, i) => (
        <span key={i} ref={(n) => (tail.current[i] = n)} className="hc-tail" />
      ))}
      <span ref={ring} className="hc-ring"><b ref={label} /></span>
      <span ref={dot} className="hc-dot" />
    </div>
  );
}
