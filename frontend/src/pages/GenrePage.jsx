import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../hub.css";
import { genreById } from "../data/genres";
import { useApp } from "../context";
import Home from "../components/Home";
import Particles from "../components/Particles";
import FogLayer from "../components/FogLayer";
import TorchReveal from "../components/TorchReveal";
import Avatar from "../components/Avatars";
import GenreScene from "../components/GenreScene";
import RomancePage from "./RomancePage";

function BackToHub() {
  return (
    <Link
      to="/"
      className="fixed left-4 top-4 z-50 rounded-full border border-white/20 bg-black/50 px-4 py-2 font-case text-xs uppercase tracking-widest text-[#fff1e0] backdrop-blur transition hover:border-[#ffb347] hover:text-[#ffb347]"
    >
      ← All worlds
    </Link>
  );
}

// Route: /genre/:id
export default function GenrePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { endings, ensureAudio } = useApp();
  const g = genreById(id);
  if (!g) return <Navigate to="/" replace />;

  // Thriller: the dark landing page we already built
  if (g.id === "thriller") {
    return (
      <div className="page-in relative min-h-screen bg-[#040807]">
        <FogLayer density={1} />
        <Particles type="dust" />
        <div className="vignette" />
        <TorchReveal />
        <div className="grain" />
        <BackToHub />
        <main className="relative z-10">
          <Home onPlay={(sid) => { ensureAudio(); navigate(`/play/${sid}`); }} onEnter={() => {}} endings={endings} />
        </main>
      </div>
    );
  }

  if (g.id === "romance") return <RomancePage />;

  // Sci-Fi / Horror: teaser page until their stories are written
  return (
    <div className="hub-root page-in relative min-h-screen overflow-hidden" style={{ "--prgb": g.rgb, "--prgb2": g.altRgb }}>
      <div className="absolute inset-0 opacity-90">
        <GenreScene id={g.id} />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(60% 50% at 50% 35%, rgba(${g.rgb},0.28), transparent 70%), linear-gradient(transparent 40%, #0a0405)` }}
      />
      <Particles type="dust" />
      <BackToHub />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Avatar kind={g.char} className="mx-auto h-56 w-44" />
          <h1 className="mt-4 font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-wide text-[#fff1e0]">
            {g.name.toUpperCase()}
          </h1>
          <p className="mt-2 font-hand text-2xl" style={{ color: g.color }}>{g.tagline}</p>
          <p className="mx-auto mt-5 max-w-lg text-[#fff1e0]/75">{g.hook}</p>
          <div className="mt-8 inline-block rounded-full border-2 border-[#ffb347]/60 px-7 py-3 font-display text-2xl tracking-widest text-[#ffb347]">
            COMING SOON
          </div>
        </motion.div>
      </main>
    </div>
  );
}
