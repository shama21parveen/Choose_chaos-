import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SceneArt from "./SceneArt";
import TiltCard from "./TiltCard";
import SplitTitle from "./SplitTitle";

const TAGS = {
  danger: { label: "Danger", cls: "border-red-500/60 text-red-400" },
  fog: { label: "Fog", cls: "border-mist/50 text-mist" },
  calm: { label: "Calm", cls: "border-emerald-400/50 text-emerald-300" },
  secret: { label: "Secret", cls: "border-fuchsia-400/60 text-fuchsia-300" },
};

// items: [{ id, title, sub, art, sky, tag, danger, locked, secret }]
export default function ChapterRow({ eyebrow, title, items, sortable = false }) {
  const [mode, setMode] = useState("order");
  const [progress, setProgress] = useState(0);
  const scroller = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0 });

  const list = mode === "danger" ? [...items].sort((a, b) => b.danger - a.danger) : items;

  const onScroll = () => {
    const el = scroller.current;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  };
  const scrollBy = (dx) => scroller.current.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* heading row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-case text-xs uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
          <SplitTitle text={title} className="font-display text-5xl tracking-[0.1em] text-bone md:text-7xl" />
        </div>

        <div className="flex items-center gap-3">
          {sortable && (
            <div className="flex gap-2">
              {[
                ["order", "In order"],
                ["danger", "Most dangerous"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`rounded-full border px-5 py-2 font-case text-xs uppercase tracking-widest transition ${
                    mode === key
                      ? "border-bone bg-bone text-black"
                      : "border-white/30 text-bone/70 hover:border-gold hover:text-gold"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => scrollBy(-320)}
            aria-label="Scroll left"
            className="h-10 w-10 rounded-full border border-white/30 text-bone transition hover:border-gold hover:text-gold"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(320)}
            aria-label="Scroll right"
            className="h-10 w-10 rounded-full border border-white/30 text-bone transition hover:border-gold hover:text-gold"
          >
            →
          </button>
        </div>
      </div>

      {/* cards */}
      <div
        ref={scroller}
        onScroll={onScroll}
        onPointerDown={(e) => {
          drag.current = { down: true, x: e.clientX, left: scroller.current.scrollLeft };
        }}
        onPointerMove={(e) => {
          if (drag.current.down) scroller.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
        className="no-scrollbar -mx-6 mt-10 flex cursor-grab gap-2 overflow-x-auto px-6 pb-10 pt-4 active:cursor-grabbing"
      >
        {list.map((it, i) => {
          const tag = TAGS[it.tag] || TAGS.fog;
          return (
            <motion.div
              key={it.id}
              layout
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.08 }}
              className="chapter group relative flex-none select-none pl-14"
            >
              <TiltCard className="relative h-[300px] w-[280px] overflow-hidden rounded-xl border border-bone/25 bg-black">
                <div className={`absolute inset-0 ${it.locked ? "scale-110 blur-md grayscale" : ""}`}>
                  <SceneArt scene={it.art} sky={it.sky} still />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {it.locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-bone/80">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 10V8a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1Zm2 0h8V8a4 4 0 1 0-8 0v2Z" />
                    </svg>
                    <span className="font-case text-xs uppercase tracking-[0.3em]">Locked</span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 pl-16">
                  <p className="font-case text-[11px] uppercase tracking-[0.3em] text-gold">
                    {it.locked && it.secret ? "Secret ending" : it.sub}
                  </p>
                  <h3 className="mt-1 font-display text-3xl leading-none tracking-wide text-bone">
                    {it.locked ? "???" : it.title}
                  </h3>
                  {!it.locked && (
                    <span className={`mt-2 inline-block rounded-full border px-2 py-0.5 font-case text-[10px] uppercase tracking-widest ${tag.cls}`}>
                      {tag.label}
                    </span>
                  )}
                </div>
              </TiltCard>

              {/* big outlined number that overlaps the card */}
              <motion.span
                key={`${it.id}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="chapter-num pointer-events-none absolute -bottom-4 left-0 z-20 font-display text-[9.5rem] leading-none"
              >
                {i + 1}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* red progress line */}
      <div className="h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-red-600 shadow-[0_0_14px_rgba(225,29,46,0.8)] transition-all duration-300"
          style={{ width: `${15 + progress * 85}%` }}
        />
      </div>
    </div>
  );
}
