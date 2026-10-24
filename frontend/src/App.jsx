import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppContext } from "./context";
import Hub from "./pages/Hub";
import GenrePage from "./pages/GenrePage";
import Play from "./pages/Play";
import Profile from "./pages/Profile";
import AuthModal from "./components/AuthModal";
import { api, getToken, setToken } from "./api";
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
// (unlocked endings, sound, login + API sync) and decides which page to show.
export default function App() {
  const { pathname } = useLocation();
  const [endings, setEndings] = useState(() => read(ENDINGS_KEY, []));
  const [user, setUser] = useState(() => read(USER_KEY, null));
  const [soundOn, setSoundOn] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [stats, setStats] = useState(null); // { totalPlayers, endings: { r1: {count, percent} } }

  useEffect(() => write(ENDINGS_KEY, endings), [endings]);
  useEffect(() => write(USER_KEY, user), [user]);

  const loadStats = useCallback(() => {
    api.stats().then(setStats).catch(() => {}); // stats are a bonus, never block the app
  }, []);

  // merge this browser's endings into the account, then show the account's full list
  const syncEndings = useCallback(async () => {
    const local = read(ENDINGS_KEY, []);
    const { endings: server } = await api.syncEndings(local);
    setEndings([...new Set([...local, ...server])]);
    loadStats();
  }, [loadStats]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setEndings([]); // so the next person on this browser does not inherit these
  }, []);

  // called by AuthModal after a successful register / login
  const handleAuth = useCallback(
    async ({ token, user: u }) => {
      setToken(token);
      setUser(u);
      await syncEndings().catch(() => {});
    },
    [syncEndings]
  );

  // on page load: public stats, and if a token exists check it is still valid
  useEffect(() => {
    loadStats();
    if (!getToken()) {
      // a "logged in" user without a token is left over from the old demo login: forget it
      if (read(USER_KEY, null)) setUser(null);
      return;
    }
    api
      .me()
      .then(({ user: u }) => {
        setUser(u);
        return syncEndings();
      })
      .catch((err) => {
        if (err.status === 401) logout(); // token expired or invalid
      });
  }, [loadStats, syncEndings, logout]);

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
    if (getToken()) {
      // failure is fine: it stays in localStorage and syncs on the next load
      api.saveEnding(id).then(loadStats).catch(() => {});
    }
  }, [loadStats]);

  const ctx = useMemo(
    () => ({
      endings,
      addEnding,
      soundOn,
      ensureAudio,
      toggleSound,
      user,
      stats,
      logout,
      updateUser: setUser,
      openAuth: () => setAuthOpen(true),
    }),
    [endings, addEnding, soundOn, ensureAudio, toggleSound, user, stats, logout]
  );

  return (
    <AppContext.Provider value={ctx}>
      <div className="relative min-h-screen overflow-x-clip bg-[#05060f]">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onAuth={handleAuth}
        />
      </div>
    </AppContext.Provider>
  );
}
