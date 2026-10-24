import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../api";
import AvatarPicker from "./AvatarPicker";
import "../profile.css";

const input =
  "mt-3 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f4f1ff] outline-none focus:border-[#ffb347]";
const randomAvatar = () => ["ghost", "fox", "cat", "astronaut", "detective", "robot", "vampire", "wizard", "alien", "bunny", "skull", "cupid"][Math.floor(Math.random() * 12)];

// Real login / register. On success it hands { user, token } to the app shell.
export default function AuthModal({ open, onClose, onAuth }) {
  const [mode, setMode] = useState("join");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(randomAvatar);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [server, setServer] = useState("checking"); // checking | up | down

  // little status light so you can see whether the backend is reachable
  useEffect(() => {
    if (!open) return;
    let alive = true;
    setServer("checking");
    api.health().then(() => alive && setServer("up")).catch(() => alive && setServer("down"));
    return () => { alive = false; };
  }, [open]);

  const switchMode = () => {
    setMode(mode === "join" ? "login" : "join");
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const data =
        mode === "join"
          ? await api.register(username.trim(), avatar, email, password)
          : await api.login(email, password);
      await onAuth(data); // { token, user }
      setPassword("");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="my-auto w-full max-w-md rounded-3xl border border-[#e11d2e]/50 bg-[#0a0405] p-7 shadow-[0_0_80px_rgba(225,29,46,0.35)] sm:p-8"
          >
            <div className="font-display text-4xl tracking-widest text-[#f4f1ff]">
              {mode === "join" ? "JOIN THE CHAOS" : "WELCOME BACK"}
            </div>
            <p className="mt-2 font-case text-sm text-[#f4f1ff]/70">
              Reading is free, no login needed. Join to get a profile and keep track of every secret ending you unlock.
            </p>

            {mode === "join" && (
              <>
                <div className="mt-5 font-case text-[11px] uppercase tracking-widest text-[#ffb347]">Pick your avatar</div>
                <div className="mt-2">
                  <AvatarPicker value={avatar} onChange={setAvatar} size={46} />
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                  placeholder="Username (e.g. chaos_queen)"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[A-Za-z0-9_]{3,20}"
                  title="3-20 characters: letters, numbers and _"
                  autoComplete="username"
                  className={input.replace("mt-3", "mt-4")}
                />
              </>
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className={mode === "join" ? input : input.replace("mt-3", "mt-5")}
            />
            <input
              type="password"
              required
              minLength={mode === "join" ? 6 : 1}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "join" ? "Password (min 6 characters)" : "Password"}
              autoComplete={mode === "join" ? "new-password" : "current-password"}
              className={input}
            />

            {error && (
              <div role="alert" className="mt-4 rounded-lg border border-[#e11d2e]/50 bg-[#e11d2e]/10 px-3 py-2 font-case text-sm text-[#ff8a8a]">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="solid-btn mt-6 w-full disabled:opacity-60">
              {loading ? "PLEASE WAIT..." : mode === "join" ? "JOIN" : "LOG IN"}
            </button>
            <button
              type="button"
              onClick={switchMode}
              className="mt-4 w-full font-case text-xs uppercase tracking-widest text-[#ffb347] hover:text-white"
            >
              {mode === "join" ? "Already have an account? Log in" : "New here? Join"}
            </button>
            <div className="mt-3 text-center font-case text-[10px] uppercase tracking-widest text-white/40">
              {server === "checking" && "Checking server..."}
              {server === "up" && <span className="text-[#2dd4bf]">● Server connected</span>}
              {server === "down" && <span className="text-[#ff8a8a]">● Server not reachable. Is the backend running? (free server may need ~30s to wake)</span>}
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
