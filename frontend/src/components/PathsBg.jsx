import { useEffect, useRef } from "react";

// Living background for the hub: a web of glowing "story paths".
// Nodes drift, link up when they get close, and bend toward your cursor.
// Click anywhere to send out a ripple that pushes the paths apart.
const COLORS = ["255,59,59", "255,179,71", "255,90,60", "45,212,191", "255,241,224"];

export default function PathsBg() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const g = canvas.getContext("2d");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf, nodes = [];
    const mouse = { x: -999, y: -999 };
    const ripples = [];

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(78, Math.max(32, w / 20)));
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1,
        c: COLORS[i % 7 === 0 ? 3 : i % 5 === 0 ? 4 : i % 2 ? 0 : 1],
        p: Math.random() * 6.28,
      }));
    };
    build();

    const move = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const leave = () => { mouse.x = mouse.y = -999; };
    const click = (e) => ripples.push({ x: e.clientX, y: e.clientY, r: 0 });
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    window.addEventListener("pointerdown", click);
    window.addEventListener("resize", build);

    const frame = (t) => {
      g.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx + Math.sin(t / 2200 + n.p) * 0.12;
          n.y += n.vy + Math.cos(t / 2600 + n.p) * 0.12;
        }
        // cursor pull
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d < 190 && d > 1) { n.x += (dx / d) * 0.55; n.y += (dy / d) * 0.55; }
        // ripple push
        for (const r of ripples) {
          const rx = n.x - r.x, ry = n.y - r.y, rd = Math.hypot(rx, ry);
          if (Math.abs(rd - r.r) < 26 && rd > 1) { n.x += (rx / rd) * 3; n.y += (ry / rd) * 3; }
        }
        if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      }
      // links
      g.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            g.strokeStyle = `rgba(${a.c},${(1 - d / 150) * 0.3})`;
            g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 210) {
          g.strokeStyle = `rgba(255,179,71,${(1 - md / 210) * 0.75})`;
          g.lineWidth = 1.4;
          g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(mouse.x, mouse.y); g.stroke();
          g.lineWidth = 1;
        }
      }
      // dots
      for (const n of nodes) {
        const pulse = 0.65 + Math.sin(t / 700 + n.p) * 0.35;
        g.fillStyle = `rgba(${n.c},${0.55 + pulse * 0.4})`;
        g.shadowColor = `rgba(${n.c},0.9)`;
        g.shadowBlur = 10;
        g.beginPath(); g.arc(n.x, n.y, n.r * (0.8 + pulse * 0.5), 0, 6.28); g.fill();
      }
      g.shadowBlur = 0;
      // ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 7;
        g.strokeStyle = `rgba(255,179,71,${Math.max(0, 0.6 - r.r / 700)})`;
        g.lineWidth = 2;
        g.beginPath(); g.arc(r.x, r.y, r.r, 0, 6.28); g.stroke();
        if (r.r > 420) ripples.splice(i, 1);
      }
      if (!reduce && !document.hidden) raf = requestAnimationFrame(frame);
      else if (!reduce) raf = setTimeout(() => (raf = requestAnimationFrame(frame)), 300);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("pointerdown", click);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}
