import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 28, onDone, onTick, className = "", caret = "text-red-500" }) {
  const [count, setCount] = useState(0);
  const finished = count >= text.length;

  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setCount((c) => c + 1), speed);
    return () => clearInterval(id);
  }, [finished, speed]);

  // typing sound: every 2nd letter, skip spaces
  useEffect(() => {
    if (count > 0 && count % 2 === 0 && text[count - 1] !== " ") onTick?.();
  }, [count]);

  useEffect(() => {
    if (finished) onDone?.();
  }, [finished]);

  return (
    <p
      onClick={() => setCount(text.length)}
      title="Click to skip"
      className={`cursor-pointer ${className}`}
    >
      {text.slice(0, count)}
      {!finished && <span className={`animate-pulse ${caret}`}>|</span>}
    </p>
  );
}
