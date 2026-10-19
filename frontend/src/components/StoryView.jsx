import { useEffect, useRef, useState } from "react";
import { motion, useIsPresent } from "framer-motion";
import Typewriter from "./Typewriter";
import ChoiceCard from "./ChoiceCard";
import DoubtMeter from "./DoubtMeter";
import TimerRing from "./TimerRing";

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
  onUrgent,
  onBeep,
  onExpire,
  theme = {},
}) {
  const isPresent = useIsPresent(); // false while this scene is fading out
  const soft = Boolean(theme.soft); // cute pastel layout (romance)
  const panelRef = useRef(null);
  const night = soft && scene.sky === "dusk"; // dark purple sky: use light text on top
  const timer = scene.timer; // seconds, only on timed scenes
  const [left, setLeft] = useState(timer ?? 0);
  const [expired, setExpired] = useState(false);
  const active = Boolean(timer) && done && !scene.ending && !expired && isPresent;

  const actions = scene.ending
    ? [
        { label: "Play again", fn: onRestart },
        { label: "Back to genres", fn: onHome },
      ]
    : choices.map((c) => ({ label: c.label, secret: c.secret, fn: () => onChoice(c) }));

  // countdown (starts when the text has finished typing)
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const id = setInterval(() => {
      const remaining = Math.max(0, timer - (performance.now() - start) / 1000);
      setLeft(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        setExpired(true);
      }
    }, 100);
    return () => clearInterval(id);
  }, [active, timer]);

  // last 4 seconds: faster heartbeat + red pulse (handled in App)
  const urgent = active && left <= 4;
  useEffect(() => {
    onUrgent?.(urgent);
  }, [urgent]);
  useEffect(() => () => onUrgent?.(false), []);

  // beep in the last 3 seconds
  const sec = Math.ceil(left);
  useEffect(() => {
    if (active && sec <= 3 && sec > 0) onBeep?.();
  }, [sec, active]);

  // time is up: the story chooses for you
  useEffect(() => {
    if (!expired || !isPresent) return;
    onExpire?.();
    const t = setTimeout(() => onChoice(scene.timeout), 1300);
    return () => clearTimeout(t);
  }, [expired]);

  // long romance scenes: keep the card (and the choices) in view while typing
  const keepInView = () => {
    onTick?.();
    if (soft) panelRef.current?.scrollIntoView({ block: "nearest" });
  };
  useEffect(() => {
    if (soft && done) panelRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [done, soft]);

  // keyboard shortcuts: press 1, 2, 3 to choose
  useEffect(() => {
    if (!done || expired || !isPresent) return;
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
          className={`font-display text-2xl tracking-[0.2em] ${
            soft
              ? night
                ? "text-white/90 hover:text-[#ffb3cd]"
                : "text-[#7a3a6a] hover:text-[#ff5c8d]"
              : "text-bone/80 hover:text-gold"
          }`}
        >
          CHOOSE CHAOS
        </button>
        <div className="flex flex-wrap items-center gap-5">
          <DoubtMeter doubt={doubt} max={theme.meterMax} label={theme.meter || "Doubt"} tone={night ? "softlight" : theme.accent} />
          <span
            className={`font-case text-xs uppercase tracking-widest ${
              soft ? (night ? "text-white/90" : "text-[#7a3a6a]") : "text-mist"
            }`}
          >
            Endings {endingsCount}/{totalEndings}
          </span>
          {theme.torch !== false && (
            <button
              onClick={onTorch}
              className="font-case text-xs uppercase tracking-widest text-mist hover:text-gold"
            >
              Torch: {torch ? "ON" : "OFF"}
            </button>
          )}
        </div>
      </header>

      {/* where / when */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`px-6 pt-4 md:px-12 ${soft ? "text-center" : ""}`}
      >
        <p
          className={`font-case text-xs uppercase tracking-[0.4em] md:text-sm ${
            soft
              ? `font-cute font-bold tracking-[0.3em] ${night ? "text-[#ffd1e0]" : "text-[#b0567a]"}`
              : "text-gold"
          }`}
        >
          {scene.time}
        </p>
        <h2
          className={
            soft
              ? `font-script text-6xl leading-tight md:text-7xl ${
                  night
                    ? "text-white drop-shadow-[0_2px_16px_rgba(60,20,80,0.7)]"
                    : "text-[#5a2a4a] drop-shadow-[0_2px_14px_rgba(255,255,255,0.9)]"
                }`
              : "font-display text-5xl leading-none tracking-wide text-bone drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] md:text-8xl"
          }
        >
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
      <div
        className={`mx-auto w-full px-4 ${
          soft ? "max-w-2xl pb-6" : "max-w-3xl pb-8 md:mx-0 md:ml-8 md:max-w-xl md:pb-12 lg:ml-12"
        }`}
      >
        <div
          ref={panelRef}
          className={
            soft
              ? "rb-in rounded-[2rem] border border-white/80 bg-[#fffaf5]/80 p-6 text-center shadow-[0_20px_80px_rgba(120,60,90,0.28)] backdrop-blur-xl md:p-8"
              : `rounded-2xl border bg-black/60 p-5 backdrop-blur-md md:p-8 ${
                  urgent ? "border-red-600/70" : "border-white/10"
                }`
          }
        >
          {scene.ending && (
            <div
              className={
                soft
                  ? "font-cute mb-5 inline-block rounded-full border-2 border-[#ff7aa8] bg-white/80 px-4 py-1.5 text-sm font-bold tracking-wide text-[#d4457a]"
                  : "mb-5 inline-block -rotate-2 border-2 border-red-600 px-3 py-1 font-display text-xl tracking-[0.25em] text-red-500"
              }
            >
              {soft ? "💌 " : ""}ENDING UNLOCKED: {scene.ending.title}
            </div>
          )}

          {timer && !scene.ending && (
            <div className="mb-4 flex items-center gap-4">
              {done && !expired ? (
                <TimerRing left={left} total={timer} />
              ) : null}
              <span className="rounded-full border border-red-500/60 px-3 py-1 font-case text-[11px] uppercase tracking-[0.3em] text-red-400">
                Timed · {timer}s to decide
              </span>
            </div>
          )}

          <Typewriter
            speed={soft ? 14 : 28}
            text={scene.text}
            onDone={onDone}
            onTick={keepInView}
            caret={soft ? "text-[#ff5c8d]" : "text-red-500"}
            className={`${
              soft ? "font-cute whitespace-pre-line font-medium text-[#4a2540] md:text-xl" : "font-case text-bone md:text-xl"
            } text-lg leading-relaxed ${doubt >= 3 && theme.glitch !== false ? "glitch" : ""}`}
          />

          {expired && (
            <motion.div
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-5 border-l-4 border-red-600 pl-4"
            >
              <p className="glitch font-display text-4xl tracking-[0.2em] text-red-500">TIME'S UP</p>
              <p className="mt-1 font-case text-sm text-red-300">{scene.timeout?.text}</p>
            </motion.div>
          )}

          {done && (
            <div className={`mt-6 grid gap-3 ${expired ? "pointer-events-none opacity-30" : ""}`}>
              {actions.map((a, i) => (
                <ChoiceCard key={a.label} index={i} label={a.label} secret={a.secret} soft={soft} onClick={a.fn} />
              ))}
            </div>
          )}
        </div>
      </div>
      {soft && <div className="flex-1" />}
    </div>
  );
}
