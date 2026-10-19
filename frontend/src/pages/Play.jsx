import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { stories } from "../data/stories";
import { useApp } from "../context";
import StoryView from "../components/StoryView";
import SceneArt from "../components/SceneArt";
import RomanceBackdrop from "../components/RomanceBackdrop";
import Particles from "../components/Particles";
import FogLayer from "../components/FogLayer";
import TorchCursor from "../components/TorchCursor";
import SoundToggle from "../components/SoundToggle";
import { setMood, setHeartbeat, tick, click, sting, beep, setTypeStyle } from "../audio/sound";

// Route: /play/:id  (id = key in data/stories.js)
export default function Play() {
  const { id } = useParams();
  if (!stories[id]) return <Navigate to="/" replace />;
  return <PlayStory key={id} id={id} />;
}

function PlayStory({ id }) {
  const navigate = useNavigate();
  const { endings, addEnding, soundOn, ensureAudio, toggleSound } = useApp();
  const story = stories[id];
  const theme = story.theme;
  const [current, setCurrent] = useState(story.start);
  const [doubt, setDoubt] = useState(0);
  const [done, setDone] = useState(false);
  const [torch, setTorch] = useState(false);
  const [impact, setImpact] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const scene = story.scenes[current];
  const storyEndingIds = Object.values(story.scenes).filter((s) => s.ending).map((s) => s.ending.id);
  const myEndings = endings.filter((e) => storyEndingIds.includes(e));
  const choices = (scene.choices || []).filter((c) => !c.requires || doubt >= c.requires);

  useEffect(() => {
    ensureAudio();
    setTypeStyle(theme.typing);
    return () => {
      setTypeStyle("spooky");
      setMood("off");
      setHeartbeat(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMood(scene.mood);
  }, [scene.mood, soundOn]);

  useEffect(() => {
    const base = theme.heartbeat !== false && doubt >= 3 ? doubt - 2 : 0;
    setHeartbeat(urgent ? Math.max(3, base + 1) : base);
  }, [doubt, urgent, soundOn, theme]);

  useEffect(() => {
    if (scene.mood === "danger") {
      sting();
      setImpact(true);
      const t = setTimeout(() => setImpact(false), 700);
      return () => clearTimeout(t);
    }
  }, [current, scene.mood]);

  const onExpire = () => {
    sting();
    setImpact(true);
    setTimeout(() => setImpact(false), 700);
  };

  const restart = () => {
    click();
    setCurrent(story.start);
    setDoubt(0);
    setDone(false);
    window.scrollTo(0, 0);
  };

  const leave = () => {
    click();
    navigate(`/genre/${id}`);
  };

  const go = (choice) => {
    click();
    setDone(false);
    setDoubt((d) => d + (choice.doubt || 0));
    setCurrent(choice.next);
    const target = story.scenes[choice.next];
    if (target.ending) addEnding(target.ending.id);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#040807]">
      <AnimatePresence>
        <motion.div
          key={`${scene.art}-${scene.sky}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="fixed inset-0 z-[1]"
        >
          {theme.soft ? (
            <RomanceBackdrop art={scene.art} palette={scene.sky} />
          ) : (
            <>
              <SceneArt scene={scene.art} sky={scene.sky} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {!theme.soft && <FogLayer density={scene.fog} />}
      <Particles type={scene.particles} />
      {!theme.soft && <div className="vignette" />}
      <TorchCursor on={torch} />
      {((theme.heartbeat !== false && doubt >= 4) || urgent) && <div className="vignette-pulse" />}
      {impact && <div className="flash" />}
      {!theme.soft && <div className="grain" />}
      <SoundToggle on={soundOn} onToggle={toggleSound} light={Boolean(theme.soft)} />

      <main className={`relative z-10 ${impact ? "impact" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            <StoryView
              scene={scene}
              doubt={doubt}
              done={done}
              onDone={() => setDone(true)}
              onTick={tick}
              choices={choices}
              onChoice={go}
              onRestart={restart}
              onHome={leave}
              endingsCount={myEndings.length}
              totalEndings={storyEndingIds.length}
              torch={torch}
              onTorch={() => setTorch((t) => !t)}
              onUrgent={setUrgent}
              onBeep={beep}
              onExpire={onExpire}
              theme={theme}
            />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
