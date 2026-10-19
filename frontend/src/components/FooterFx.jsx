import { useEffect, useRef } from "react";

// Wraps a footer with a cursor-reactive layer:
//  - sparks (or hearts) spray from your cursor and fall with gravity
//  - embers rise slowly on their own
//  - a giant outline word at the bottom lights up where your cursor is
// mode: "spark" (red/gold) | "love" (pink hearts)
export default function FooterFx({ children, text = "CHOOSE CHAOS", mode = "spark" }) {
  const box = useRef(null);
  const cv = useRef(null);

  useEffect(() => {
    const el = box.current;
    const canvas = cv.current;
    const g = canvas.getContext("2d");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const love = mode === "love";
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = false, last = { x: 0, y: 0, t: 0 };
    const parts = [];

    const size = () => {
      const r = el.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);

    const SP = ["255,90,60", "255,179,71", "255,241,224", "255,59,59"];
    const LV = ["#ff7a9c", "#ffb3c6", "#ff4d7d", "#ffd0a8"];

    const spawn = (x, y, vx, vy, n) => {
      for (let i = 0; i < n; i++) {
        parts.push({
          x, y,
          vx: vx * 0.12 + (Math.random() - 0.5) * 3,
          vy: vy * 0.12 + (Math.random() - 1) * 2.4,
          life: 1,
          decay: 0.012 + Math.random() * 0.014,
          s: love ? 9 + Math.random() * 11 : 1.4 + Math.random() * 2.2,
          c: love ? LV[(Math.random() * LV.length) | 0] : SP[(Math.random() * SP.length) | 0],
          rot: (Math.random() - 0.5) * 0.5,
        });
      }
      if (parts.length > 260) parts.splice(0, parts.length - 260);
    };

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty("--fx", x + "px");
      el.style.setProperty("--fy", y + "px");
      const now = performance.now();
      const dt = Math.max(16, now - last.t);
      const vx = ((x - last.x) / dt) * 16, vy = ((y - last.y) / dt) * 16;
      if (!reduce) spawn(x, y, vx, vy, love ? 1 : 3);
      last = { x, y, t: now };
    };
    const enter = () => el.classList.add("fx-hot");
    const out = () => el.classList.remove("fx-hot");
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", out);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(frame);
    });
    io.observe(el);

    const frame = () => {
      raf = 0;
      if (!visible) return;
      g.clearRect(0, 0, w, h);
      if (Math.random() < 0.18) spawn(Math.random() * w, h + 8, 0, -2.4, 1); // ambient rising
      g.globalCompositeOperation = "lighter";
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += love ? 0.02 : 0.09;
        p.x += p.vx; p.y += p.vy; p.vx *= 0.99;
        p.life -= p.decay;
        if (p.life <= 0 || p.y > h + 30) { parts.splice(i, 1); continue; }
        if (love) {
          g.save();
          g.globalAlpha = Math.min(1, p.life * 1.2) * 0.9;
          g.translate(p.x, p.y); g.rotate(p.rot * (1 - p.life) * 6);
          g.fillStyle = p.c; g.font = `${p.s}px serif`; g.textAlign = "center";
          g.fillText("♥", 0, 0);
          g.restore();
        } else {
          g.fillStyle = `rgba(${p.c},${p.life})`;
          g.shadowColor = `rgba(${p.c},1)`; g.shadowBlur = 8;
          g.beginPath(); g.arc(p.x, p.y, p.s * p.life + 0.4, 0, 6.28); g.fill();
        }
      }
      g.shadowBlur = 0;
      g.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", out);
    };
  }, [mode]);

  return (
    <div ref={box} className={`fx-box ${mode === "love" ? "fx-love" : ""}`}>
      {children}
      <div className="fx-mark" aria-hidden>{text}</div>
      <div className="fx-mark fx-mark-lit" aria-hidden>{text}</div>
      <canvas ref={cv} className="pointer-events-none absolute inset-0 z-30" aria-hidden />
    </div>
  );
}
