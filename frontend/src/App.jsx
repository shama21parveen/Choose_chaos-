import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { story } from "./data/story";
import Home from "./components/Home";
import StoryView from "./components/StoryView";
import SceneArt from "./components/SceneArt";
import Particles from "./components/Particles";
import FogLayer from "./components/FogLayer";
import TorchCursor from "./components/TorchCursor";
import SoundToggle from "./components/SoundToggle";
import TorchReveal from "./components/TorchReveal";
import { startAudio, setMood, setHeartbeat, toggleMute, isStarted, isMuted, tick, click, sting } from "./audio/sound";

const TOTAL_ENDINGS = Object.values(story.scenes).filter((s) => s.ending).length;
const STORAGE_KEY = "choose-chaos-endings";

function loadEndings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
function saveEndings(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage not available, ignore */
  }
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [current, setCurrent] = useState(story.start);
  const [doubt, setDoubt] = useState(0);
  const [done, setDone] = useState(false);
  const [torch, setTorch] = useState(false);
  const [endings, setEndings] = useState(loadEndings);
  const [soundOn, setSoundOn] = useState(false);
  const [impact, setImpact] = useState(false);

  const scene = story.scenes[current];
  const inStory = screen === "story";
  const mood = inStory ? scene.mood : "fog";
  const choices = (scene.choices || []).filter((c) => !c.requires || doubt >= c.requires);

  // Mouse parallax: sets --mx / --my (-1 to 1) used by the art layers
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

  // Sound follows the mood
  useEffect(() => {
    setMood(mood);
  }, [mood, soundOn]);

  // Heartbeat when Doubt is high
  useEffect(() => {
    setHeartbeat(inStory && doubt >= 3 ? doubt - 2 : 0);
  }, [inStory, doubt, soundOn]);

  // Jump-scare when entering a danger scene
  useEffect(() => {
    if (inStory && scene.mood === "danger") {
      sting();
      setImpact(true);
      const t = setTimeout(() => setImpact(false), 700);
      return () => clearTimeout(t);
    }
  }, [current, inStory]);

  const ensureAudio = () => {
    startAudio();
    setSoundOn(isStarted() && !isMuted());
  };

  const handleSoundToggle = () => {
    if (!isStarted()) {
      ensureAudio();
    } else {
      setSoundOn(!toggleMute());
    }
  };

  const startStory = () => {
    ensureAudio();
    click();
    setCurrent(story.start);
    setDoubt(0);
    setDone(false);
    setScreen("story");
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    click();
    setScreen("home");
  };

  const go = (choice) => {
    click();
    setDone(false);
    setDoubt((d) => d + (choice.doubt || 0));
    setCurrent(choice.next);

    const target = story.scenes[choice.next];
    if (target.ending && !endings.includes(target.ending.id)) {
      const updated = [...endings, target.ending.id];
      setEndings(updated);
      saveEndings(updated);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040807]">
      {/* Story background art (crossfades between scenes) */}
      <AnimatePresence>
        {inStory && (
          <motion.div
            key={`${scene.art}-${scene.sky}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="fixed inset-0 z-[1]"
          >
            <SceneArt scene={scene.art} sky={scene.sky} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          </motion.div>
        )}
      </AnimatePresence>

      <FogLayer density={inStory ? scene.fog : 1} />
      <Particles type={inStory ? scene.particles : "dust"} />
      <div className="vignette" />
      {!inStory && <TorchReveal />}
      <TorchCursor on={torch && inStory} />
      {inStory && doubt >= 4 && <div className="vignette-pulse" />}
      {impact && <div className="flash" />}
      <div className="grain" />
      <SoundToggle on={soundOn} onToggle={handleSoundToggle} />

      <main className={`relative z-10 ${impact ? "impact" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={inStory ? current : "home"}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            {!inStory ? (
              <Home onPlay={startStory} onEnter={ensureAudio} endings={endings} />
            ) : (
              <StoryView
                scene={scene}
                doubt={doubt}
                done={done}
                onDone={() => setDone(true)}
                onTick={tick}
                choices={choices}
                onChoice={go}
                onRestart={startStory}
                onHome={goHome}
                endingsCount={endings.length}
                totalEndings={TOTAL_ENDINGS}
                torch={torch}
                onTorch={() => setTorch((t) => !t)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
