import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../hub.css";
import { genres, glowOf } from "../data/genres";
import { stories } from "../data/stories";
import { useApp } from "../context";
import Logo from "../components/Logo";
import Avatar from "../components/Avatars";
import GenreScene from "../components/GenreScene";
import Footer from "../components/Footer";
import FooterFx from "../components/FooterFx";
import PathsBg from "../components/PathsBg";
import HubCursor from "../components/HubCursor";
import NavUser from "../components/NavUser";

const WORDS = ["your fear.", "your crush.", "your fate.", "your chaos."];
const TICKER = ["READ FREE", "CHOOSE FAST", "4 WORLDS", "NO UNDO", "SECRET ENDINGS", "HEADPHONES ON", "TRUST NOBODY", "FALL FOR HIM ANYWAY"];

const STEPS = [
  { n: "01", t: "Read", d: "Every scene is a short moment with typewriter text, a living background and sound that matches the mood." },
  { n: "02", t: "Choose", d: "Pick what happens next. Some choices are timed. Some only appear if your meter is high enough." },
  { n: "03", t: "Unlock", d: "Every story hides several endings. Log in once and we keep count of the secret ones you find." },
];

const RULES = [
  { t: "Press 1, 2 or 3", d: "Fast hands win. Use your keyboard to pick a choice without touching the mouse." },
  { t: "Some clocks tick", d: "On timed choices a ring runs out. If it empties, the story decides for you." },
  { t: "Watch the meter", d: "Doubt in the thriller, Spark in the rom-com. It changes scenes and unlocks hidden choices." },
  { t: "No undo", d: "A choice is a choice. But you can replay any story as many times as you like." },
  { t: "Guests are welcome", d: "Read everything without an account. Log in only if you want your secret endings tracked." },
  { t: "Wear headphones", d: "Every genre has its own music and typing sound. Turn Sound on and feel it." },
];

const endingList = (storyKey) =>
  storyKey
    ? Object.values(stories[storyKey].scenes)
        .filter((s) => s.ending)
        .map((s) => s.ending)
    : [];

function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDuration: `${7 + (i % 5) * 2}s`,
            animationDelay: `${(i * 0.9) % 8}s`,
            "--dx": `${(i % 2 ? 1 : -1) * (20 + (i % 4) * 18)}px`,
          }}
        />
      ))}
    </div>
  );
}

function LoginButton() {
  return <NavUser />;
}

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block min-w-[7ch] text-left text-[#ffb347]">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-block"
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const fan = [
  { x: -210, r: -14, d: "0s" },
  { x: -70, r: -5, d: "-1.5s" },
  { x: 70, r: 5, d: "-3s" },
  { x: 210, r: 14, d: "-4.5s" },
];

export default function Hub() {
  const navigate = useNavigate();
  const { endings, user, ensureAudio, openAuth, stats } = useApp();
  const [hovered, setHovered] = useState(null);
  const shown = user ? endings : []; // guests can read, but unlocked endings show after login

  const enter = (g) => {
    navigate(`/genre/${g.id}`);
  };

  return (
    <div className="hub-root page-in relative" style={glowOf(hovered)}>
      <div className="hub-bg">
        {["WHAT IF?", "RUN", "PLOT TWIST", "OPEN IT", "DON'T LOOK", "TRUST ME"].map((w, i) => (
          <span key={w} className="bg-word" style={{ top: `${6 + i * 16}%`, animationDuration: `${120 + i * 22}s`, animationDelay: `${-i * 31}s` }}>{w}</span>
        ))}
      </div>
      <PathsBg />
      <HubCursor />

      {/* ---------- NAV ---------- */}
      <header className="hub-nav sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#top" aria-label="Choose Chaos home"><Logo size={40} /></a>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#worlds" className="nav-link">Worlds</a>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#rules" className="nav-link">Rules</a>
            <a href="#endings" className="nav-link">Endings</a>
          </nav>
          <LoginButton />
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section id="top" className="relative z-10 overflow-hidden">
        <Embers />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="chip inline-block">
              interactive story world
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 font-display text-[clamp(4.2rem,13vw,10rem)] leading-[0.85] tracking-wide"
            >
              <span className="block text-[#fff1e0]">CHOOSE</span>
              <span className="grad-text relative block">
                CHAOS
                <svg className="absolute -bottom-3 left-0 w-[92%]" viewBox="0 0 300 20" fill="none" aria-hidden>
                  <path className="scribble" d="M4 14C60 4 120 18 180 8s90-2 116 4" stroke="#ffb347" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <p className="mt-8 font-hand text-2xl text-[#fff1e0]/90 sm:text-3xl">
              Every tap writes a story. Today you pick <Rotator />
            </p>
            <p className="mt-4 max-w-lg text-[#fff1e0]/70">
              Thrillers, rom-coms and more. Read for free, make fast choices, and hunt down the secret endings only the brave (or the silly) find.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#worlds" className="btn-red">START READING</a>
              <button onClick={openAuth} className="btn-ghost">JOIN FREE</button>
            </div>
          </div>

          {/* poster fan: one card per world */}
          <div className="fan" onMouseLeave={() => setHovered(null)}>
            {genres.map((g, i) => (
              <button
                key={g.id}
                className="poster"
                data-cursor="OPEN"
                onClick={() => enter(g)}
                onMouseEnter={() => setHovered(g)}
                style={{ "--px": `${fan[i].x}px`, "--pr": `${fan[i].r}deg`, "--pd": fan[i].d, "--pc": g.color, "--prgb": g.rgb }}
                aria-label={`Open ${g.name}`}
              >
                {!g.ready && <span className="p-soon">SOON</span>}
                <div className="absolute inset-x-0 top-6 bottom-12 px-2"><Avatar kind={g.char} className="h-full w-full" /></div>
                <span className="p-name">{g.short.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TICKER ---------- */}
      <div className="band relative z-20 overflow-hidden py-3">
        <div className="marquee">
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-5 whitespace-nowrap font-display text-2xl tracking-[0.28em] text-[#fff1e0]">
              {t} <span className="mx-5 text-[#ffb347]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how" className="relative z-10 mx-auto max-w-6xl px-5 py-24">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grad-text font-display text-[clamp(2.8rem,8vw,6rem)] leading-none">
          WHAT IS THIS PLACE?
        </motion.h2>
        <p className="mt-3 max-w-2xl text-[#fff1e0]/70">
          Choose Chaos is a story website where <b className="text-[#ffb347]">you</b> are the main character. No watching, no waiting. You read, you choose, and the story bends around you.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="rule"
            >
              <div className="n">{s.n}</div>
              <h3 className="mt-2 font-display text-4xl tracking-wider text-[#ffb347]">{s.t}</h3>
              <p className="mt-2 text-[#fff1e0]/70">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- WORLD SHOWCASE ---------- */}
      <section id="worlds" className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-10">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grad-text font-display text-[clamp(2.8rem,8vw,6rem)] leading-none">
          PICK YOUR WORLD
        </motion.h2>
        <p className="mt-3 max-w-xl text-[#fff1e0]/70">Four worlds. Each one has its own mood, music and secrets.</p>

        <div className="mt-12 space-y-16">
          {genres.map((g, i) => {
            const list = endingList(g.storyKey);
            const total = list.length;
            const mine = list.filter((e) => shown.includes(e.id)).length;
            const style = { "--prgb": g.rgb, "--prgb2": g.altRgb };
            return (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="grid items-stretch gap-8 lg:grid-cols-[5fr_7fr]"
                onMouseEnter={() => setHovered(g)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* LEFT: card */}
                <button onClick={() => enter(g)} className="show-card text-left" data-cursor="ENTER" style={style} aria-label={`Open ${g.name}`}>
                  <GenreScene id={g.id} />
                  <span className="big-num">0{i + 1}</span>
                  <div className="absolute inset-x-6 bottom-20 top-24 z-[1]">
                    <Avatar kind={g.char} className="mx-auto h-full max-h-[300px]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/85 to-transparent p-6 pt-14">
                    <div className="font-display text-4xl tracking-wider text-[#fff1e0]">{g.name.toUpperCase()}</div>
                    <div className="font-case text-[11px] uppercase tracking-[0.22em] text-[#fff1e0]/60">{g.mood}</div>
                  </div>
                </button>

                {/* RIGHT: story info */}
                <div className="flex flex-col justify-center">
                  <div className="font-case text-xs uppercase tracking-[0.35em]" style={{ color: g.color }}>
                    {g.ready ? "Now playing" : "In the making"}
                  </div>
                  <h3 className="mt-1 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-none text-[#fff1e0]">
                    {g.storyTitle.toUpperCase()}
                  </h3>
                  <div className="mt-1 font-hand text-xl" style={{ color: g.color }}>{g.tagline}</div>
                  <p className="mt-4 max-w-xl text-[#fff1e0]/80">{g.hook}</p>
                  <ul className="mt-4 space-y-2">
                    {g.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[#fff1e0]/75">
                        <span style={{ color: g.color }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="chip">{g.ready ? `${total} endings` : "? endings"}</span>
                    <span className="chip">{g.minutes} min</span>
                    <span className="chip">{g.ready ? "Playable" : "Coming soon"}</span>
                  </div>

                  {/* unlock tracker */}
                  <div className="mt-6 rounded-2xl border border-[#ff5a3c]/25 bg-black/35 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {g.ready
                        ? list.map((e) => (
                            <span key={e.id} className={`pip ${shown.includes(e.id) ? "on" : ""}`} title={shown.includes(e.id) ? e.title : "Locked"}>
                              {shown.includes(e.id) ? "★" : "🔒"}
                            </span>
                          ))
                        : [0, 1, 2, 3].map((k) => <span key={k} className="pip">?</span>)}
                    </div>
                    <div className="mt-3 font-case text-sm text-[#fff1e0]/80">
                      {!g.ready ? (
                        "No endings to chase yet. This world opens soon."
                      ) : user ? (
                        <>
                          You have unlocked <b className="text-[#2dd4bf]">{mine} of {total}</b> endings here.
                        </>
                      ) : (
                        <>
                          Join to see how many of the <b className="text-[#ffb347]">{total}</b> endings you have unlocked.{" "}
                          <button onClick={openAuth} className="text-[#2dd4bf] underline underline-offset-4 hover:text-white">Join free</button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => enter(g)} className="btn-red">{g.ready ? "ENTER WORLD" : "PEEK INSIDE"}</button>
                    {g.ready && (
                      <Link to={`/play/${g.storyKey}`} onClick={ensureAudio} className="btn-ghost">PLAY NOW</Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ---------- RULES ---------- */}
      <section id="rules" className="relative z-10 mx-auto max-w-6xl px-5 py-24">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grad-text font-display text-[clamp(2.8rem,8vw,6rem)] leading-none">
          HOUSE RULES
        </motion.h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((r, i) => (
            <motion.div
              key={r.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.55 }}
              className="rule"
            >
              <div className="n">0{i + 1}</div>
              <h3 className="mt-2 font-display text-3xl tracking-wider text-[#fff1e0]">{r.t.toUpperCase()}</h3>
              <p className="mt-2 text-[#fff1e0]/70">{r.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- TROPHY WALL ---------- */}
      <section id="endings" className="relative z-10 mx-auto max-w-6xl px-5 pb-24">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grad-text font-display text-[clamp(2.8rem,8vw,6rem)] leading-none">
          SECRET ENDINGS WALL
        </motion.h2>
        <p className="mt-3 max-w-xl text-[#fff1e0]/70">
          {user ? "Your collection so far. Locked ones are still hiding." : "Log in and this wall lights up with every ending you find."}
        </p>
        <div className="mt-8 space-y-8">
          {genres.filter((g) => g.ready).map((g) => (
            <div key={g.id}>
              <div className="mb-3 font-display text-2xl tracking-widest" style={{ color: g.color }}>{g.short.toUpperCase()}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {endingList(g.storyKey).map((e) => {
                  const on = shown.includes(e.id);
                  return (
                    <div key={e.id} className={`trophy ${on ? "on" : ""}`}>
                      <div className="text-2xl">{on ? "🏆" : "🔒"}</div>
                      <div className="mt-1 font-display text-lg leading-tight tracking-wide text-[#fff1e0]">{on ? e.title : "???"}</div>
                      {stats?.endings?.[e.id] && (
                        <div className="mt-1 font-case text-[10px] uppercase tracking-widest text-[#ffb347]/80">
                          {stats.endings[e.id].percent}% of players
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {!user && (
          <button onClick={openAuth} className="btn-red mt-8">LOG IN TO TRACK</button>
        )}
      </section>

      <div className="relative z-10">
        <FooterFx text="CHOOSE CHAOS">
          <Footer />
        </FooterFx>
      </div>
    </div>
  );
}
