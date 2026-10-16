import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import ChoiceCard from "./ChoiceCard";
import DoubtMeter from "./DoubtMeter";

export default function StoryView({
  scene,
  doubt,
  done,
  onDone,
  onTick,
  choices,
  onChoice,
  onRestart,
  onHome,
  endingsCount,
  totalEndings,
  torch,
  onTorch,
}) {
  const actions = useMemo(() => scene.ending
    ? [
        { label: "Play again", fn: onRestart },
        { label: "Back to genres", fn: onHome },
      ]
    : choices.map((c) => ({ label: c.label, secret: c.secret, fn: () => onChoice(c) })), [scene, choices, onRestart, onHome, onChoice]);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!done || !scene.timeLimit || !actions.length) {
      setTimeLeft(null);
      return;
    }

    const startedAt = Date.now();
    let expired = false;
    setTimeLeft(scene.timeLimit);
    const timer = window.setInterval(() => {
      const left = Math.max(0, scene.timeLimit - (Date.now() - startedAt) / 1000);
      setTimeLeft(left);
      if (left === 0 && !expired) {
        expired = true;
        window.clearInterval(timer);
        actions[scene.timeoutChoice ?? 0]?.fn();
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [done, scene, actions]);

  // keyboard shortcuts: press 1, 2, 3 to choose
  useEffect(() => {
    if (!done) return;
    const onKey = (e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= actions.length) actions[n - 1].fn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* top bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 p-4 pr-44 md:p-6 md:pr-52">
        <button
          onClick={onHome}
          className="font-display text-2xl tracking-[0.2em] text-bone/80 hover:text-gold"
        >
          CHOOSE CHAOS
        </button>
        <div className="flex flex-wrap items-center gap-5">
          <DoubtMeter doubt={doubt} />
          <span className="font-case text-xs uppercase tracking-widest text-mist">
            Endings {endingsCount}/{totalEndings}
          </span>
          <button
            onClick={onTorch}
            className="font-case text-xs uppercase tracking-widest text-mist hover:text-gold"
          >
            Torch: {torch ? "ON" : "OFF"}
          </button>
        </div>
      </header>

      {/* where / when */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-6 pt-4 md:px-12"
      >
        <p className="font-case text-xs uppercase tracking-[0.4em] text-gold md:text-sm">
          {scene.time}
        </p>
        <h2 className="font-display text-5xl leading-none tracking-wide text-bone drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] md:text-8xl">
          {scene.place}
        </h2>
      </motion.div>

      {/* scrawled warning */}
      {scene.scrawl && (
        <motion.p
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="scrawl pointer-events-none absolute right-6 top-1/3 max-w-xs -rotate-6 font-hand text-3xl text-red-600 md:right-24 md:max-w-md md:text-5xl"
        >
          {scene.scrawl}
        </motion.p>
      )}

      <div className="flex-1" />

      {/* story panel */}
      <div className="mx-auto w-full max-w-3xl px-4 pb-8 md:mx-0 md:ml-8 md:max-w-xl md:pb-12 lg:ml-12">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md md:p-8">
          {scene.ending && (
            <div className="mb-5 inline-block -rotate-2 border-2 border-red-600 px-3 py-1 font-display text-xl tracking-[0.25em] text-red-500">
              ENDING UNLOCKED: {scene.ending.title}
            </div>
          )}

          <Typewriter
            text={scene.text}
            onDone={onDone}
            onTick={onTick}
            className={`font-case text-lg leading-relaxed text-bone md:text-xl ${
              doubt >= 3 ? "glitch" : ""
            }`}
          />

          {done && (
            <div className="mt-6 grid gap-3">
              {timeLeft !== null && (
                <div className="timed-choice mb-1" role="timer" aria-label={`${Math.ceil(timeLeft)} seconds to choose`}>
                  <div className="mb-2 flex items-center justify-between font-case text-[10px] uppercase tracking-[0.22em] text-red-300/80">
                    <span>Choose before the fog closes</span>
                    <span className="tabular-nums">{Math.ceil(timeLeft)}s</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-red-950/80">
                    <div
                      className="timed-choice-fill h-full rounded-full bg-red-600"
                      style={{ width: `${(timeLeft / scene.timeLimit) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {actions.map((a, i) => (
                <ChoiceCard key={a.label} index={i} label={a.label} secret={a.secret} onClick={a.fn} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
