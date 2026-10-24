import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Full-screen canvas of twinkling stars, shooting stars and a sparkle trail behind the cursor.
// Parent can call ref.current.burst(x, y) to throw a handful of sparkles (click on avatar).
const COLORS = ["#ffb347", "#ff5a3c", "#2dd4bf", "#fff1e0", "#ff7a9c"];

// 4-point sparkle shape
function sparkle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

const SparkleField = forwardRef(function SparkleField({ density = 1 }, ref) {
  const canvas = useRef(null);
  const api = useRef({ burst: () => {} });

  useImperativeHandle(ref, () => ({ burst: (x, y) => api.current.burst(x, y) }));

  useEffect(() => {
    const c = canvas.current;
    const ctx = c.getContext("2d");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf, last = performance.now(), nextShoot = 2500;
    let stars = [], bits = [], shoots = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, (w * h) / 14000) * density);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 1 + Math.random() * 3.2,
        tw: Math.random() * Math.PI * 2, sp: 0.6 + Math.random() * 1.6,
        vy: 4 + Math.random() * 10,
        col: COLORS[(Math.random() * COLORS.length) | 0],
        big: Math.random() < 0.28,
      }));
    };

    const spawn = (x, y, n, power = 1) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, s = (30 + Math.random() * 150) * power;
        bits.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 30 * power, life: 0, max: 0.7 + Math.random() * 0.9, r: 2 + Math.random() * 4.5, col: COLORS[(Math.random() * COLORS.length) | 0] });
      }
    };
    api.current.burst = (x, y) => spawn(x, y, 46, 1.4);

    let lastTrail = 0;
    const move = (e) => {
      const now = performance.now();
      if (now - lastTrail < 45) return;
      lastTrail = now;
      spawn(e.clientX, e.clientY, 1, 0.25);
    };

    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.tw += dt * s.sp;
        s.y -= s.vy * dt * 0.4;
        if (s.y < -10) { s.y = h + 10; s.x = Math.random() * w; }
        const a = 0.25 + 0.75 * Math.abs(Math.sin(s.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.col;
        if (s.big) sparkle(ctx, s.x, s.y, s.r * 3.2);
        else { ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.55, 0, 6.3); ctx.fill(); }
      }

      nextShoot -= dt * 1000;
      if (nextShoot <= 0) {
        nextShoot = 3500 + Math.random() * 4500;
        shoots.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, life: 0 });
      }
      shoots = shoots.filter((s) => (s.life += dt) < 0.9);
      for (const s of shoots) {
        const k = s.life / 0.9, x = s.x + k * 520, y = s.y + k * 260;
        const g = ctx.createLinearGradient(x, y, x - 140, y - 70);
        g.addColorStop(0, "rgba(255,241,224,0.95)"); g.addColorStop(1, "rgba(255,90,60,0)");
        ctx.globalAlpha = 1 - k;
        ctx.strokeStyle = g; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 140, y - 70); ctx.stroke();
      }

      bits = bits.filter((b) => (b.life += dt) < b.max);
      for (const b of bits) {
        b.vy += 120 * dt; b.x += b.vx * dt; b.y += b.vy * dt;
        ctx.globalAlpha = 1 - b.life / b.max;
        ctx.fillStyle = b.col;
        sparkle(ctx, b.x, b.y, b.r * (1 - b.life / b.max * 0.5));
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      // still picture: stars only, no motion
      for (const s of stars) { ctx.globalAlpha = 0.6; ctx.fillStyle = s.col; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.55, 0, 6.3); ctx.fill(); }
    } else {
      window.addEventListener("pointermove", move);
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, [density]);

  return <canvas ref={canvas} className="pf-canvas" aria-hidden />;
});

export default SparkleField;
