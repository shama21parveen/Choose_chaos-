import { motion } from "framer-motion";
import SceneArt from "./SceneArt";
import SplitTitle from "./SplitTitle";
import SectionGlow from "./SectionGlow";
import TiltCard from "./TiltCard";
import ChapterRow from "./ChapterRow";
import Footer from "./Footer";
import FooterFx from "./FooterFx";
import { story } from "../data/story"; // Home page shows the thriller as the featured story

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const TICKER = [
  "TRUST NO ONE",
  "EVERY CHOICE HAS A PRICE",
  "DON'T LOOK BACK",
  "ONE WRONG TAP",
  "THE FOG REMEMBERS",
  "4 ENDINGS · 1 SECRET",
];

const STEPS = [
  { n: "01", title: "Read", text: "Every scene is a short, tense moment. Type-writer text, creepy sound, and a place that feels alive." },
  { n: "02", title: "Choose", text: "Pick what you do next. Press 1, 2 or 3 on your keyboard if you are fast. Some choices only appear if you doubt enough." },
  { n: "03", title: "Survive", text: "Your Doubt meter rises with risky choices. The higher it goes, the more the story glitches and the heart beats." },
];

const GENRES = [
  {
    id: "thriller",
    name: "Psychological Thriller",
    tag: "Trust nobody. Not even yourself.",
    ready: true,
    bg: "from-emerald-950 via-black to-red-950",
    icon: "🕵️",
  },
  { id: "horror", name: "Horror", tag: "Don't look behind you.", bg: "from-red-950 via-black to-black", icon: "👻" },
  { id: "scifi", name: "Sci-Fi", tag: "Space is quiet. Too quiet.", bg: "from-indigo-950 via-black to-cyan-950", icon: "🚀" },
  {
    id: "romance",
    name: "Romance",
    tag: "Crash into your enemy. Fall for him anyway.",
    ready: true,
    bg: "from-rose-900 via-purple-950 to-black",
    icon: "💌",
  },
];

const CHAT = [
  { from: "naina", text: "come soon." },
  { from: "you", text: "where are you??" },
  { from: "you", text: "naina pick up" },
];

const DANGER_RANK = { secret: 3, danger: 2, fog: 1, calm: 0 };

function Bats() {
  const bat = (
    <svg viewBox="0 0 60 20" fill="#050807">
      <path d="M0 10 Q10 -4 20 8 Q25 2 30 8 Q35 2 40 8 Q50 -4 60 10 Q50 6 45 14 Q40 8 30 18 Q20 8 15 14 Q10 6 0 10Z" />
    </svg>
  );
  return (
    <>
      <div className="bat">{bat}</div>
      <div className="bat bat-2">{bat}</div>
      <div className="bat bat-3">{bat}</div>
    </>
  );
}

export default function Home({ onPlay, onEnter, endings = [] }) {
  const entries = Object.entries(story.scenes);
  const sceneCount = entries.filter(([, s]) => !s.ending).length;
  const endingCount = entries.filter(([, s]) => s.ending).length;

  const chapters = entries
    .filter(([, s]) => !s.ending)
    .map(([id, s]) => ({
      id,
      title: s.place,
      sub: s.time,
      art: s.art,
      sky: s.sky,
      tag: s.mood,
      danger: DANGER_RANK[s.mood] ?? 0,
    }));

  const endingItems = entries
    .filter(([, s]) => s.ending)
    .map(([id, s]) => ({
      id,
      title: s.ending.title,
      sub: s.place,
      art: s.art,
      sky: s.sky,
      tag: s.mood,
      danger: DANGER_RANK[s.mood] ?? 0,
      locked: !endings.includes(s.ending.id),
      secret: s.ending.id === "e4",
    }));

  return (
    <div className="w-full">
      {/* ================= HERO ================= */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <SceneArt scene="hotel" sky="night" />
        <Bats />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-case text-xs uppercase tracking-[0.5em] text-gold md:text-sm"
          >
            An interactive psychological thriller
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 1.15, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="mt-4 font-display leading-[0.85] tracking-wide text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]"
          >
            <span className="block text-[26vw] md:text-[13rem]">CHOOSE</span>
            <span className="glitch block text-[26vw] text-gold md:text-[13rem]">CHAOS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 max-w-md text-lg text-mist"
          >
            Your choices. Your problem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => onPlay("thriller")}
              className="cta-pulse rounded-full bg-gold px-8 py-4 font-display text-2xl tracking-[0.2em] text-black transition hover:scale-105"
            >
              PLAY LEFT ON READ
            </button>
            <a
              href="#genres"
              onClick={onEnter}
              className="rounded-full border border-bone/40 px-8 py-4 font-display text-2xl tracking-[0.2em] text-bone transition hover:border-gold hover:text-gold"
            >
              EXPLORE GENRES
            </a>
          </motion.div>

          <p className="mt-6 font-case text-xs uppercase tracking-widest text-mist/70">
            🎧 Best with headphones · Sound turns on when you press play
          </p>
        </div>

        <div className="bounce-slow absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-case text-xs uppercase tracking-[0.4em] text-bone/50">
          scroll ↓
        </div>
      </section>

      {/* ================= TICKER ================= */}
      <div className="relative z-10 overflow-hidden border-y border-gold/30 bg-black/70 py-3 backdrop-blur">
        <div className="marquee">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-6 whitespace-nowrap font-display text-2xl tracking-[0.3em] text-gold/80">
              {t} <span className="mx-6 text-red-600">✱</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative z-10 overflow-hidden py-24">
        <SectionGlow tone="green" />
        <div className="relative mx-auto max-w-6xl px-6">
          <SplitTitle text="HOW IT WORKS" className="text-center font-display text-5xl tracking-[0.15em] text-bone md:text-7xl" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...reveal} transition={{ duration: 0.7, delay: i * 0.15 }}>
                <TiltCard className="h-full rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur transition-colors hover:border-gold/60">
                  <p className="outline-text font-display text-8xl leading-none">{s.n}</p>
                  <h3 className="mt-2 font-display text-4xl tracking-widest text-gold">{s.title}</h3>
                  <p className="mt-3 text-mist">{s.text}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GENRES ================= */}
      <section id="genres" className="relative z-10 overflow-hidden py-24">
        <SectionGlow tone="gold" />
        <div className="relative mx-auto max-w-6xl px-6">
          <SplitTitle text="PICK YOUR POISON" className="text-center font-display text-5xl tracking-[0.15em] text-bone md:text-7xl" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {GENRES.map((g, i) => (
              <motion.div key={g.id} {...reveal} transition={{ duration: 0.7, delay: i * 0.12 }}>
                <TiltCard className="h-full">
                  <button
                    disabled={!g.ready}
                    onClick={g.ready ? () => onPlay(g.id) : undefined}
                    className={`relative h-full w-full overflow-hidden rounded-2xl border bg-gradient-to-br ${g.bg} p-8 text-left ${
                      g.ready
                        ? "border-gold/50 hover:shadow-[0_0_40px_rgba(212,162,76,0.3)]"
                        : "cursor-not-allowed border-white/10 opacity-60"
                    }`}
                  >
                    <span className="absolute -right-4 -top-6 text-[8rem] opacity-20">{g.icon}</span>
                    <h3 className="relative font-display text-5xl tracking-widest text-bone">{g.name}</h3>
                    <p className="relative mt-2 text-mist">{g.tag}</p>
                    <p className="relative mt-6 font-case text-xs uppercase tracking-[0.3em] text-gold">
                      {g.ready ? "▶ Play now" : "Coming soon"}
                    </p>
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED STORY ================= */}
      <section className="relative z-10 overflow-hidden py-24">
        <SectionGlow tone="red" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div {...reveal}>
              <p className="font-case text-xs uppercase tracking-[0.4em] text-gold">Now playing</p>
              <h2 className="mt-2 font-display text-7xl leading-none tracking-wide text-bone md:text-9xl">
                LEFT ON <span className="text-red-600">READ</span>
              </h2>
              <p className="mt-6 text-lg text-mist">
                Your sister sends one message: "Come soon." You take the last bus to a hill town drowned in fog.
                Her phone is off. The hotel manager is lying. The police are too friendly. And somewhere in the
                fog, a question is waiting for you: who is really missing?
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-case text-xs uppercase tracking-widest">
                <span className="rounded-full border border-gold/50 px-4 py-2 text-gold">{sceneCount} scenes</span>
                <span className="rounded-full border border-gold/50 px-4 py-2 text-gold">{endingCount} endings</span>
                <span className="rounded-full border border-fuchsia-400/60 px-4 py-2 text-fuchsia-300">1 secret</span>
              </div>
              <button
                onClick={() => onPlay("thriller")}
                className="mt-8 rounded-full bg-gold px-8 py-4 font-display text-2xl tracking-[0.2em] text-black transition hover:scale-105"
              >
                ENTER DHUNDHGIRI
              </button>
            </motion.div>

            {/* fake phone chat */}
            <motion.div {...reveal} className="mx-auto w-full max-w-sm">
              <div className="rounded-[2.5rem] border-4 border-white/10 bg-black/70 p-5 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur">
                <p className="mb-4 text-center font-case text-xs uppercase tracking-[0.3em] text-mist">Naina</p>
                <div className="space-y-3">
                  {CHAT.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.7 }}
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                        m.from === "naina" ? "bg-white/10 text-bone" : "ml-auto bg-gold/90 text-black"
                      }`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 3 }}
                    className="text-right font-case text-xs text-red-500"
                  >
                    Delivered · never read
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CHAPTERS ================= */}
      <section className="relative z-10 overflow-hidden py-24">
        <SectionGlow tone="purple" />
        <div className="relative">
          <ChapterRow eyebrow="The story so far" title="THE CHAPTERS" items={chapters} sortable />
        </div>
      </section>

      {/* ================= ENDINGS ================= */}
      <section className="relative z-10 overflow-hidden py-24">
        <SectionGlow tone="red" />
        <div className="relative">
          <ChapterRow eyebrow="How it can all end" title="THE ENDINGS" items={endingItems} />
          <p className="mt-2 text-center font-case text-xs uppercase tracking-widest text-mist/60">
            {endings.length} of {endingItems.length} unlocked
          </p>
        </div>
      </section>

      <FooterFx text="LEFT ON READ">
        <Footer />
      </FooterFx>
    </div>
  );
}
