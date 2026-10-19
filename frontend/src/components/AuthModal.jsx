import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// UI-only login for now. Real JWT login comes with the backend.
export default function AuthModal({ open, onClose, onLogin }) {
  const [mode, setMode] = useState("join");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin({ name: name.trim() || email.split("@")[0] || "Player", email });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
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
            className="w-full max-w-md rounded-3xl border border-[#e11d2e]/50 bg-[#0a0405] p-8 shadow-[0_0_80px_rgba(225,29,46,0.35)]"
          >
            <div className="font-display text-4xl tracking-widest text-[#f4f1ff]">
              {mode === "join" ? "JOIN THE CHAOS" : "WELCOME BACK"}
            </div>
            <p className="mt-2 font-case text-sm text-[#f4f1ff]/70">
              Reading is free, no login needed. Join to keep track of every secret ending you unlock.
            </p>
            {mode === "join" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f4f1ff] outline-none focus:border-[#ffb347]"
              />
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f4f1ff] outline-none focus:border-[#ffb347]"
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[#f4f1ff] outline-none focus:border-[#ffb347]"
            />
            <button type="submit" className="solid-btn mt-6 w-full">
              {mode === "join" ? "JOIN" : "LOG IN"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "join" ? "login" : "join")}
              className="mt-4 w-full font-case text-xs uppercase tracking-widest text-[#ffb347] hover:text-white"
            >
              {mode === "join" ? "Already have an account? Log in" : "New here? Join"}
            </button>
            <div className="mt-3 text-center font-case text-[10px] uppercase tracking-widest text-white/35">
              Demo only: nothing is sent anywhere yet
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
