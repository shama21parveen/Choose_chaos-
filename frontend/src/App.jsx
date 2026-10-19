import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppContext } from "./context";
import Hub from "./pages/Hub";
import GenrePage from "./pages/GenrePage";
import Play from "./pages/Play";
import AuthModal from "./components/AuthModal";
import { startAudio, toggleMute, isStarted, isMuted } from "./audio/sound";

const ENDINGS_KEY = "choose-chaos-endings";
const USER_KEY = "choose-chaos-user";

function read(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage not available, ignore */
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// App = the shell. It owns the things every page needs
// (unlocked endings, sound, demo login) and decides which page to show.
export default function App() {
  const { pathname } = useLocation();
  const [endings, setEndings] = useState(() => read(ENDINGS_KEY, []));
  const [user, setUser] = useState(() => read(USER_KEY, null));
  const [soundOn, setSoundOn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => write(ENDINGS_KEY, endings), [endings]);
  useEffect(() => write(USER_KEY, user), [user]);

  // Mouse position -> CSS variables (parallax + torch + neon glow)
  useEffect(() => {
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = document.documentElement.style;
        root.setProperty("--mx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        root.setProperty("--my", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
        root.setProperty("--tx", e.clientX + "px");
        root.setProperty("--ty", e.clientY + "px");
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ensureAudio = useCallback(() => {
    startAudio();
    setSoundOn(isStarted() && !isMuted());
  }, []);

  const toggleSound = useCallback(() => {
    if (!isStarted()) ensureAudio();
    else setSoundOn(!toggleMute());
  }, [ensureAudio]);

  const addEnding = useCallback((id) => {
    setEndings((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const ctx = useMemo(
    () => ({
      endings,
      addEnding,
      soundOn,
      ensureAudio,
      toggleSound,
      user,
      login: (u) => setUser(u),
      logout: () => setUser(null),
      openAuth: () => setAuthOpen(true),
    }),
    [endings, addEnding, soundOn, ensureAudio, toggleSound, user]
  );

  return (
    <AppContext.Provider value={ctx}>
      <div className="relative min-h-screen overflow-x-clip bg-[#05060f]">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onLogin={(u) => setUser(u)}
        />
      </div>
    </AppContext.Provider>
  );
}
