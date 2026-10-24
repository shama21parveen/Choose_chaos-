import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../profile.css";
import { api } from "../api";
import { useApp } from "../context";
import { genres } from "../data/genres";
import { stories } from "../data/stories";
import Logo from "../components/Logo";
import AvatarPic from "../components/AvatarPic";
import AvatarPicker from "../components/AvatarPicker";
import SparkleField from "../components/SparkleField";

// ---- ranks: the more secret endings, the cooler the title ----
const RANKS = [
  { at: 0, title: "Bystander", icon: "👀", line: "Just watching so far. Time to press a button." },
  { at: 0.0001, title: "Troublemaker", icon: "😈", line: "First secret found. Trouble has officially started." },
  { at: 0.3, title: "Plot Twister", icon: "🌀", line: "You bend stories. The stories have noticed." },
  { at: 0.5, title: "Chaos Agent", icon: "⚡", line: "Half of the secrets already belong to you." },
  { at: 0.8, title: "Ending Hunter", icon: "🎯", line: "Almost nothing stays hidden from you now." },
  { at: 1, title: "Chaos Legend", icon: "👑", line: "Every ending. Every secret. Absolute legend." },
];

function rankOf(found, total) {
  const f = total ? found / total : 0;
  let i = 0;
  RANKS.forEach((r, k) => { if (f >= r.at) i = k; });
  const next = RANKS[i + 1];
  const need = next ? Math.max(1, Math.ceil(next.at * total - 1e-9) - found) : 0;
  return { ...RANKS[i], next, need };
}

const worldsWithEndings = genres
  .filter((g) => g.ready && g.storyKey && stories[g.storyKey])
  .map((g) => ({
    g,
    list: Object.values(stories[g.storyKey].scenes).filter((s) => s.ending).map((s) => s.ending),
  }));
const TOTAL = worldsWithEndings.reduce((n, w) => n + w.list.length, 0);

function useCountUp(target, ms = 1300) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => {
      t0 ??= t;
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

const fmtDate = (d, long) =>
  d ? new Date(d).toLocaleDateString("en-IN", long ? { month: "long", year: "numeric" } : { day: "numeric", month: "short" }) : "";

const ORBITS = [
  { c: "#ffb347", r: "0.6", o: "0deg", t: "9s", fs: "20px", dl: "0s" },
  { c: "#2dd4bf", r: "0.67", o: "120deg", t: "12s", fs: "15px", dl: "0.4s" },
  { c: "#ff5a3c", r: "0.63", o: "240deg", t: "10s", fs: "17px", dl: "0.9s" },
  { c: "#fff1e0", r: "0.72", o: "60deg", t: "15s", fs: "12px", dl: "1.2s" },
];

function Ring({ found, total, color }) {
  const R = 26, C = 2 * Math.PI * R;
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 300); return () => clearTimeout(t); }, []);
  const off = C * (1 - (on && total ? found / total : 0));
  return (
    <svg className="pf-ringp" viewBox="0 0 64 64" style={{ "--gc": color }} aria-label={`${found} of ${total}`}>
      <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
      <circle className="arc" cx="32" cy="32" r={R} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={off} transform="rotate(-90 32 32)" />
      <text x="32" y="39" textAnchor="middle">{found}/{total}</text>
    </svg>
  );
}

function EditProfile({ user, onClose, onSaved }) {
  const [avatar, setAvatar] = useState(user.avatar || "ghost");
  const [username, setUsername] = useState(user.username || "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const changes = { avatar };
      if (username && username !== user.username) changes.username = username;
      const { user: u } = await api.updateProfile(changes);
      onSaved(u);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.form
        onSubmit={save}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="my-auto w-full max-w-lg rounded-3xl border border-[#ffb347]/50 bg-[#0a0405] p-7 shadow-[0_0_80px_rgba(225,29,46,0.35)]"
      >
        <div className="font-display text-4xl tracking-widest text-[#fff1e0]">EDIT PROFILE</div>
        <div className="mt-5 font-case text-[11px] uppercase tracking-widest text-[#ffb347]">Your avatar</div>
        <div className="mt-2"><AvatarPicker value={avatar} onChange={setAvatar} size={52} /></div>
        <div className="mt-5 font-case text-[11px] uppercase tracking-widest text-[#ffb347]">Username</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
          placeholder="chaos_queen"
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z0-9_]{3,20}"
          title="3-20 characters: letters, numbers and _"
          required={!user.username}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f4f1ff] outline-none focus:border-[#ffb347]"
        />
        {error && <div role="alert" className="mt-4 rounded-lg border border-[#e11d2e]/50 bg-[#e11d2e]/10 px-3 py-2 font-case text-sm text-[#ff8a8a]">{error}</div>}
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={busy} className="pf-btn solid flex-1 disabled:opacity-60">{busy ? "SAVING..." : "SAVE"}</button>
          <button type="button" onClick={onClose} className="pf-btn ghost">CANCEL</button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: me, openAuth, updateUser, logout } = useApp();
  const own = !username || Boolean(me?.username && username.toLowerCase() === me.username);

  const [data, setData] = useState(null);
  const [state, setState] = useState("loading"); // loading | ok | guest | missing | error
  const [edit, setEdit] = useState(false);
  const [toast, setToast] = useState("");
  const [fill, setFill] = useState(false);
  const sparkles = useRef(null);

  useEffect(() => {
    let alive = true;
    if (own && !me) { setState("guest"); return; }
    setState("loading");
    (own ? api.profileMe() : api.publicProfile(username))
      .then((d) => { if (alive) { setData(d); setState("ok"); } })
      .catch((err) => {
        if (!alive) return;
        if (err.status === 401) { logout(); setState("guest"); } // old / expired login: ask to log in again
        else setState(err.status === 404 ? "missing" : "error");
      });
    return () => { alive = false; };
  }, [own, username, me?.id, me?.avatar, me?.username]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { document.title = data?.user?.username ? `@${data.user.username} | Choose Chaos` : "Profile | Choose Chaos"; }, [data]);

  const say = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const found = useMemo(() => {
    const have = new Set(data?.endings || []);
    return worldsWithEndings.reduce((n, w) => n + w.list.filter((e) => have.has(e.id)).length, 0);
  }, [data]);
  const when = useMemo(() => Object.fromEntries((data?.unlocks || []).map((u) => [u.endingId, u.at])), [data]);
  const rank = rankOf(found, TOTAL);
  const pct = TOTAL ? Math.round((found / TOTAL) * 100) : 0;
  const worldsDone = worldsWithEndings.filter((w) => w.list.some((e) => (data?.endings || []).includes(e.id))).length;

  useEffect(() => {
    if (state !== "ok") return;
    const t = setTimeout(() => setFill(true), 350);
    return () => { clearTimeout(t); setFill(false); };
  }, [state, found]);

  const nFound = useCountUp(state === "ok" ? found : 0);
  const nPct = useCountUp(state === "ok" ? pct : 0);
  const nWorlds = useCountUp(state === "ok" ? worldsDone : 0, 900);

  const burst = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    sparkles.current?.burst(r.left + r.width / 2, r.top + r.height / 2);
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/u/${data.user.username}`;
    try { await navigator.clipboard.writeText(url); say("Profile link copied ✨"); } catch { say(url); }
  };

  const saved = (u) => {
    updateUser({ ...me, ...u });
    setEdit(false);
    say("Profile updated ✨");
    if (username) navigate("/profile", { replace: true });
  };

  const u = data?.user;

  return (
    <div className="pf-root">
      <div className="pf-bg" />
      <SparkleField ref={sparkles} />

      <header className="pf-top">
        <Link to="/" aria-label="Choose Chaos home"><Logo size={38} /></Link>
        <Link to="/" className="pf-back">← Back to hub</Link>
      </header>

      <main className="pf-main">
        {state === "loading" && <div className="pf-skel" />}

        {state === "guest" && (
          <div className="pf-center">
            <div className="text-6xl">🔒</div>
            <h1 className="mt-2">YOUR PROFILE AWAITS</h1>
            <p className="mt-3 text-[#fff1e0]/75">Join for free to get an avatar, a username and a trophy wall of every secret ending you find.</p>
            <button onClick={openAuth} className="pf-btn solid mt-6">JOIN / LOG IN</button>
          </div>
        )}

        {(state === "missing" || state === "error") && (
          <div className="pf-center">
            <div className="text-6xl">{state === "missing" ? "👻" : "📡"}</div>
            <h1 className="mt-2">{state === "missing" ? "NO SUCH PLAYER" : "SERVER NOT REACHABLE"}</h1>
            <p className="mt-3 text-[#fff1e0]/75">
              {state === "missing" ? "That username does not exist. Maybe it was a ghost all along." : "Could not load this profile. If the free server was asleep, wait 30 seconds and refresh."}
            </p>
            <Link to="/" className="pf-btn solid mt-6 inline-block">BACK TO HUB</Link>
          </div>
        )}

        {state === "ok" && u && (
          <>
            <motion.section className="pf-hero" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <button className="pf-avatar" onClick={burst} aria-label="Make sparkles" data-cursor="SPARKLE">
                <div className="pf-ring"><div className="pf-av"><AvatarPic id={u.avatar || "ghost"} size={220} /></div></div>
                {ORBITS.map((o, i) => (
                  <span key={i} className="pf-orbit" style={{ "--o": o.o, "--t": o.t }}>
                    <i style={{ "--r": o.r, "--c": o.c, "--fs": o.fs, "--dl": o.dl }}>✦</i>
                  </span>
                ))}
              </button>

              <div>
                {u.username && <div className="pf-handle">@{u.username}</div>}
                <h1 className="pf-name">{u.username || u.name}</h1>
                <div className="pf-meta">
                  <span className="pf-rank">{rank.icon} {rank.title.toUpperCase()}</span>
                  {u.joinedAt && <span>Joined {fmtDate(u.joinedAt, true)}</span>}
                </div>
                <p className="pf-line">{rank.line}</p>

                <div className="pf-xp-wrap">
                  <div className="pf-xp-top">
                    <span>{found} of {TOTAL} secret endings</span>
                    <span>{rank.next ? `${rank.need} more to ${rank.next.title}` : "Max rank reached"}</span>
                  </div>
                  <div className="pf-xp"><i style={{ width: fill ? `${pct}%` : "0%" }} /></div>
                </div>

                <div className="pf-actions">
                  {own && <button className="pf-btn solid" onClick={() => setEdit(true)}>EDIT PROFILE</button>}
                  {u.username && <button className="pf-btn ghost" onClick={copyLink}>COPY LINK</button>}
                  {own && <Link to="/" className="pf-btn ghost">KEEP PLAYING</Link>}
                </div>
              </div>
            </motion.section>

            <section className="pf-stats">
              {[
                [nFound, "Secret endings found", "🏆"],
                [`${nWorlds}/${worldsWithEndings.length}`, "Worlds explored", "🌍"],
                [`${nPct}%`, "Collection complete", "✨"],
              ].map(([v, l, ic], i) => (
                <motion.div key={l} className="pf-stat" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.12 }}>
                  <em>{ic}</em>
                  <b>{v}</b>
                  <span>{l}</span>
                </motion.div>
              ))}
            </section>

            <h2 className="pf-h2">TROPHY WALL</h2>
            <p className="pf-sub">{own ? "Everything you unlocked. The dark tiles are still hiding." : `Every secret ending @${u.username || u.name} has found.`}</p>

            {worldsWithEndings.map(({ g, list }) => {
              const have = list.filter((e) => (data.endings || []).includes(e.id)).length;
              return (
                <motion.section key={g.id} className="pf-world" style={{ "--gc": g.color }} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
                  <div className="pf-world-head">
                    <Ring found={have} total={list.length} color={g.color} />
                    <div>
                      <h3>{g.short.toUpperCase()}</h3>
                      <p>{g.storyTitle} · {have === list.length ? "All endings found!" : `${list.length - have} still hiding`}</p>
                    </div>
                  </div>
                  <div className="pf-tros">
                    {list.map((e, i) => {
                      const on = (data.endings || []).includes(e.id);
                      return (
                        <motion.div key={e.id} className={`pf-tro ${on ? "on" : ""}`} style={{ "--d": `${i * 0.5}s` }} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07, type: "spring", stiffness: 220, damping: 16 }}>
                          <div className="pf-tro-ic">{on ? "🏆" : "🔒"}</div>
                          <div className="pf-tro-t">{on ? e.title : "???"}</div>
                          <div className="pf-tro-s">{on ? (when[e.id] ? `Found ${fmtDate(when[e.id])}` : "Unlocked") : "Secret ending"}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}

            <div className="pf-soon">
              <b>More worlds loading:</b>
              {genres.filter((g) => !g.ready).map((g) => <span key={g.id}>{g.short} · soon</span>)}
            </div>
          </>
        )}
      </main>

      <AnimatePresence>
        {edit && me && <EditProfile user={{ ...(u || {}), ...me }} onClose={() => setEdit(false)} onSaved={saved} />}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <motion.div className="pf-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>{toast}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
