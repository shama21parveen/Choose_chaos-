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

  if (!on) return null;
  return <div ref={ref} className="torch" />;
}
