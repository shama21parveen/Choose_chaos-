import { useEffect, useRef } from "react";

// type: "fireflies" | "embers" | "rain" | "dust" | "petals" | "hearts"
export default function Particles({ type = "dust" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const g = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = type === "rain" ? 150 : 55;
    const items = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.6,
      s: Math.random() * 0.6 + 0.2,
      p: Math.random() * 6.28,
    }));

    const draw = (t) => {
      g.clearRect(0, 0, w, h);
      for (const it of items) {
        if (type === "fireflies") {
          it.x += Math.sin(t / 1500 + it.p) * 0.45;
          it.y += Math.cos(t / 1800 + it.p) * 0.35;
          if (it.x < 0) it.x = w;
          if (it.x > w) it.x = 0;
          if (it.y < 0) it.y = h;
          if (it.y > h) it.y = 0;
          const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 700 + it.p));
          g.fillStyle = `rgba(214, 255, 140, ${a})`;
          g.shadowColor = "rgba(214,255,140,.9)";
          g.shadowBlur = 14;
          g.beginPath();
          g.arc(it.x, it.y, it.r * 1.4, 0, 6.28);
          g.fill();
        } else if (type === "embers") {
          it.y -= it.s * 1.2;
          it.x += Math.sin(t / 900 + it.p) * 0.5;
          if (it.y < -10) {
            it.y = h + 10;
            it.x = Math.random() * w;
          }
          g.fillStyle = `rgba(255, ${90 + it.s * 150}, 40, ${0.35 + it.s * 0.6})`;
          g.shadowColor = "rgba(255,120,40,.8)";
          g.shadowBlur = 10;
          g.beginPath();
          g.arc(it.x, it.y, it.r, 0, 6.28);
          g.fill();
        } else if (type === "hearts") {
          it.y -= it.s * 0.9 + 0.3;
          it.x += Math.sin(t / 1400 + it.p) * 0.6;
          if (it.y < -20) {
            it.y = h + 20;
            it.x = Math.random() * w;
          }
          const a = 0.35 + it.s * 0.5;
          g.shadowBlur = 0;
          if (it.p > 4.2) {
            // little sparkle
            g.fillStyle = `rgba(255, 255, 255, ${a})`;
            const k = it.r * 2.4;
            g.beginPath();
            g.moveTo(it.x, it.y - k);
            g.quadraticCurveTo(it.x, it.y, it.x + k, it.y);
            g.quadraticCurveTo(it.x, it.y, it.x, it.y + k);
            g.quadraticCurveTo(it.x, it.y, it.x - k, it.y);
            g.quadraticCurveTo(it.x, it.y, it.x, it.y - k);
            g.fill();
          } else {
            // heart
            const k = it.r * 1.8 + 2;
            g.fillStyle = `rgba(255, ${110 + it.s * 80}, ${160 + it.s * 50}, ${a})`;
            g.beginPath();
            g.moveTo(it.x, it.y + k);
            g.bezierCurveTo(it.x - k * 1.6, it.y - k * 0.2, it.x - k * 0.8, it.y - k * 1.4, it.x, it.y - k * 0.5);
            g.bezierCurveTo(it.x + k * 0.8, it.y - k * 1.4, it.x + k * 1.6, it.y - k * 0.2, it.x, it.y + k);
            g.fill();
          }
        } else if (type === "petals") {
          it.y += it.s * 1.1 + 0.4;
          it.x += Math.sin(t / 1200 + it.p) * 0.9;
          if (it.y > h + 10) {
            it.y = -10;
            it.x = Math.random() * w;
          }
          g.shadowBlur = 0;
          g.fillStyle = `rgba(255, ${150 + it.s * 60}, ${185 + it.s * 40}, ${0.45 + it.s * 0.4})`;
          g.beginPath();
          g.ellipse(it.x, it.y, it.r * 2.6, it.r * 1.5, it.p + t / 1500, 0, 6.28);
          g.fill();
        } else if (type === "rain") {
          it.y += 10 * it.s + 8;
          it.x -= 1.5;
          if (it.y > h) {
            it.y = -20;
            it.x = Math.random() * w + 40;
          }
          g.shadowBlur = 0;
          g.strokeStyle = `rgba(180, 200, 215, ${0.12 + it.s * 0.25})`;
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(it.x, it.y);
          g.lineTo(it.x + 2, it.y + 14 + it.s * 10);
          g.stroke();
        } else {
          it.x += it.s * 0.4;
          it.y += Math.sin(t / 2000 + it.p) * 0.2;
          if (it.x > w + 10) it.x = -10;
          g.shadowBlur = 0;
          g.fillStyle = `rgba(210, 225, 220, ${0.08 + it.s * 0.2})`;
          g.beginPath();
          g.arc(it.x, it.y, it.r, 0, 6.28);
          g.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [type]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[6]" />;
}
