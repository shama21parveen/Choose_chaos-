import { useEffect, useRef } from "react";

export default function TorchCursor({ on }) {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--tx", e.clientX + "px");
      el.style.setProperty("--ty", e.clientY + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!on) return undefined;

    const body = document.body;
    const alreadyActive = body.classList.contains("torch-cursor-active");
    if (!alreadyActive) body.classList.add("torch-cursor-active");

    return () => {
      if (!alreadyActive) body.classList.remove("torch-cursor-active");
    };
  }, [on]);

  if (!on) return null;
  return (
    <div ref={ref} className="torch">
      <svg className="torch-cursor" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M8 8 20 12 32 25 25 32 12 20Z" fill="#d4a24c" stroke="#f5deb0" strokeWidth="1.5" />
        <path d="m5 5 10 4-6 6Z" fill="#fff2c2" />
        <path d="m13 22 5-5 10 10-5 5Z" fill="#332313" />
        <path d="m21 13 4-4 7 7-4 4Z" fill="#f4d38a" />
        <circle cx="8" cy="8" r="3" fill="#fff7cf" />
      </svg>
    </div>
  );
}
