import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../hub.css";
import "../components/romance.css";
import { stories } from "../data/stories";
import { useApp } from "../context";
import Avatar from "../components/Avatars";
import Particles from "../components/Particles";
import Footer from "../components/Footer";
import FooterFx from "../components/FooterFx";
import HeartField from "../components/HeartField";

const story = stories.romance;

const TICKER = ["HATE AT FIRST SIGHT", "BANANA MILK WARS", "ROOFTOP CONFESSIONS", "ONE SPILLED COFFEE", "UMBRELLA FOR TWO", "6 ENDINGS"];

const RULES = [
  { n: "01", t: "Read the scene", d: "Short, funny moments with soft typing sounds and a background that changes with the place." },
  { n: "02", t: "Tap a choice", d: "Press 1, 2 or 3 or just click. Be brave, be silly, or be very dramatic." },
  { n: "03", t: "Grow the Spark", d: "Brave and sweet choices raise your Spark meter. Some secret choices only appear if it is high enough." },
  { n: "04", t: "Find all 6 endings", d: "Detention, rooftop, photo booth, umbrella... every path ends differently. Replay as many times as you like." },
];

const CAST = [
  { e: "💥", n: "You", d: "A new senior with one goal: survive day one. You are already off to a very loud start." },
  { e: "😤", n: "Jun", d: "The Student Council President. Perfect shirts, perfect rules, one very annoying dimple." },
  { e: "💬", n: "Mina", d: "Your best friend and chief shipper. She will scream \"HATE EQUALS LOVE\" at the worst possible time." },
];

const SKY = {
  sage: "linear-gradient(150deg,#f3efe0,#d8e4c0)",
  butter: "linear-gradient(150deg,#fff3cf,#ffd9c4)",
  peach: "linear-gradient(150deg,#ffe6d6,#ffc9c0)",
  dusk: "linear-gradient(150deg,#d9c9f0,#a99ad6)",
  rose: "linear-gradient(150deg,#ffe0ea,#ffb6cc)",
};

const Blossom = ({ flip }) => (
  <svg width="420" height="260" viewBox="0 0 420 260" className="rc-branch" style={{ top: -10, [flip ? "left" : "right"]: -20, transform: flip ? "scaleX(-1)" : undefined }} aria-hidden>
    <path d="M420 6C330 20 260 50 190 110c-30 26-60 60-84 120" fill="none" stroke="#7a4a3a" strokeWidth="9" strokeLinecap="round" />
    <path d="M300 40C280 70 270 100 276 140" fill="none" stroke="#7a4a3a" strokeWidth="6" strokeLinecap="round" />
    {[[330, 30, 20], [270, 66, 17], [220, 96, 20], [284, 138, 15], [170, 140, 17], [130, 190, 14], [360, 14, 12], [240, 52, 13]].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy={-r * 0.62} rx={r * 0.5} ry={r * 0.72} fill="#ffc4d6" stroke="#ff8fb0" strokeWidth="1.2" transform={`rotate(${a})`} />
        ))}
        <circle r={r * 0.2} fill="#ffe27a" />
      </g>
    ))}
  </svg>
);

export default function RomancePage() {
  const navigate = useNavigate();
  const { endings, user, ensureAudio, openAuth } = useApp();

  const scenes = Object.values(story.scenes);
  const chapters = scenes.filter((s) => !s.ending);
  const endingItems = scenes.filter((s) => s.ending).map((s) => s.ending);
  const mine = endingItems.filter((e) => endings.includes(e.id)).length;

  const play = () => {
    ensureAudio();
    navigate("/play/romance");
  };

  return (
    <div className="rc-root page-in relative min-h-screen overflow-x-clip">
      <Particles type="petals" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Blossom />
        <Blossom flip />
        <span className="rc-cloud" style={{ top: "9%", width: 140, height: 34, animationDuration: "70s" }} />
        <span className="rc-cloud" style={{ top: "22%", width: 100, height: 26, animationDuration: "95s", animationDelay: "-40s" }} />
        <span className="rc-cloud" style={{ top: "40%", width: 160, height: 38, animationDuration: "120s", animationDelay: "-70s" }} />
      </div>

      <Link
        to="/"
        className="fixed left-4 top-4 z-50 rounded-full border-2 border-[#ffc2d3] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#c2325f] backdrop-blur transition hover:bg-white"
      >
        ← All worlds
      </Link>

      {/* ================= HERO ================= */}
      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-4 px-6 pb-16 pt-24 lg:grid-cols-2">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rc-chip">
            an interactive rom-com
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rc-title mt-4 text-[clamp(4.5rem,13vw,10rem)] leading-[0.85] tracking-wide"
          >
            CRUSH
            <br />
            HOUR
          </motion.h1>
          <p className="font-script mt-4 text-4xl text-[#d6335f] sm:text-5xl">Crash into your enemy. Fall for him anyway.</p>
          <p className="mt-4 max-w-lg text-lg font-medium text-[#4a1f3d]/80">
            Day one of senior year. One spilled coffee. One very annoyed Student Council President. Banana milk wars, a basketball to the nose, and feelings nobody planned.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={play} className="rc-btn">START STORY</button>
            <a href="#rules" className="rc-ghost">HOW TO PLAY</a>
          </div>
        </div>

        <div className="relative mx-auto h-[min(70vw,460px)] w-[min(92vw,560px)]">
          <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-[#ffd1de] to-[#ffe9c9] opacity-80" />
          <Avatar kind="pair" className="relative h-full w-full" />
          <span className="rc-bubble" style={{ left: "6%", top: "6%" }}>CRASH!!! ☕💥</span>
          <span className="rc-bubble b2" style={{ right: "2%", top: "10%" }}>...you again?</span>
        </div>
      </section>

      {/* ================= TICKER ================= */}
      <div className="rc-band relative z-20 overflow-hidden py-3">
        <div className="marquee">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-5 whitespace-nowrap font-display text-2xl tracking-[0.25em] text-white">
              {t} <span className="mx-5 text-[#fff3b0]">♥</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= RULES ================= */}
      <section id="rules" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <h2 className="rc-title text-[clamp(2.8rem,8vw,6rem)] leading-none">HOW TO PLAY</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RULES.map((r, i) => (
            <motion.div key={r.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1 }} className="rc-card p-6">
              <div className="font-display text-5xl leading-none text-[#ff7a9c]">{r.n}</div>
              <h3 className="mt-2 font-display text-3xl tracking-wide text-[#4a1f3d]">{r.t.toUpperCase()}</h3>
              <p className="mt-2 font-medium text-[#4a1f3d]/75">{r.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CAST ================= */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <h2 className="rc-title text-[clamp(2.8rem,8vw,6rem)] leading-none">MEET THE CAST</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CAST.map((c, i) => (
            <motion.div key={c.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="rc-card p-6 text-center">
              <div className="bob inline-block text-6xl" style={{ animationDelay: `${i * 0.5}s` }}>{c.e}</div>
              <h3 className="mt-2 font-display text-4xl tracking-wide text-[#d6335f]">{c.n.toUpperCase()}</h3>
              <p className="mt-2 font-medium text-[#4a1f3d]/75">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CHAPTERS ================= */}
      <HeartField>
        <section className="relative z-10 pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="rc-title text-[clamp(2.8rem,8vw,6rem)] leading-none">THE CHAPTERS</h2>
            <p className="mt-2 font-medium text-[#4a1f3d]/70">{chapters.length} scenes from first bell to the last umbrella. Hover to pause, and watch your cursor turn into a heart.</p>
          </div>
          {[chapters.slice(0, Math.ceil(chapters.length / 2)), chapters.slice(Math.ceil(chapters.length / 2))].map((row, r) => (
            <div key={r} className={`rc-lane mt-6 ${r ? "rev" : ""}`}>
              <div className="rc-track">
                {[...row, ...row].map((c, i) => (
                  <div key={i} className="rc-chap" style={{ background: SKY[c.sky] || SKY.rose }}>
                    <span className="absolute -right-2 -top-4 font-display text-8xl text-white/60">
                      {String(((i % row.length) + 1) + (r ? Math.ceil(chapters.length / 2) : 0)).padStart(2, "0")}
                    </span>
                    <div className="relative mt-14">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#4a1f3d]/60">{c.time}</div>
                      <div className="font-display text-3xl leading-tight tracking-wide text-[#4a1f3d]">{c.place}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </HeartField>

      {/* ================= ENDINGS ================= */}
      <HeartField variant="letter">
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <h2 className="rc-title text-[clamp(2.8rem,8vw,6rem)] leading-none">6 WAYS IT ENDS</h2>
        <p className="mt-2 font-medium text-[#4a1f3d]/70">
          {mine} of {endingItems.length} unlocked on this device.{" "}
          {!user && (
            <button onClick={openAuth} className="font-bold text-[#d6335f] underline underline-offset-4">Join free</button>
          )}
          {!user && " to keep your collection."}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {endingItems.map((e, i) => {
            const on = endings.includes(e.id);
            return (
              <motion.div key={e.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className={`rc-end ${on ? "on" : ""}`}>
                <div className="text-4xl">{on ? "💖" : "🔒"}</div>
                <div className="mt-2 font-display text-2xl tracking-wide text-[#4a1f3d]">{on ? e.title.toUpperCase() : "???"}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-widest text-[#4a1f3d]/50">{on ? "unlocked" : "keep playing"}</div>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <button onClick={play} className="rc-btn">PLAY CRUSH HOUR</button>
        </div>
      </section>
      </HeartField>

      <div className="relative z-10 bg-[#12060a]">
        <FooterFx mode="love" text="CRUSH HOUR">
          <Footer />
        </FooterFx>
      </div>
    </div>
  );
}
