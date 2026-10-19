// Procedural horror/thriller sound. No audio files needed: everything is
// generated live with the Web Audio API. Browsers only allow sound after a
// user click, so startAudio() must be called from a click handler.

let ctx = null;
let master = null;
let layers = null;
let noiseBuf = null;
let muted = false;
let hbTimer = null;

const MOODS = {
  off: { drone: 0, wind: 0, dread: 0, pad: 0, eerie: 0 }, // silence on landing pages
  fog: { drone: 0.05, wind: 0.07, dread: 0, pad: 0, eerie: 0 },
  calm: { drone: 0.025, wind: 0.04, dread: 0, pad: 0.025, eerie: 0 },
  danger: { drone: 0.09, wind: 0.05, dread: 0.03, pad: 0, eerie: 0 },
  secret: { drone: 0.05, wind: 0.03, dread: 0.012, pad: 0, eerie: 0.02 },
  // cozy / romance moods: no scary layers, only the music below
  sweet: { drone: 0, wind: 0, dread: 0, pad: 0, eerie: 0 },
  flutter: { drone: 0, wind: 0, dread: 0, pad: 0, eerie: 0 },
  dreamy: { drone: 0, wind: 0, dread: 0, pad: 0, eerie: 0 },
  cheer: { drone: 0, wind: 0, dread: 0, pad: 0, eerie: 0 },
};

export const isStarted = () => ctx !== null;
export const isMuted = () => muted;

export function startAudio() {
  if (ctx) {
    ctx.resume?.();
    return;
  }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();

  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.9;
  master.connect(ctx.destination);

  const len = ctx.sampleRate * 2;
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const mk = () => {
    const g = ctx.createGain();
    g.gain.value = 0;
    g.connect(master);
    return g;
  };
  layers = { drone: mk(), wind: mk(), dread: mk(), pad: mk(), eerie: mk() };

  // 1) Low drone
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 180;
  lp.connect(layers.drone);
  [55, 55.6, 82.4].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = f;
    o.connect(lp);
    o.start();
  });

  // 2) Wind (filtered noise with a slow sweep)
  const wind = ctx.createBufferSource();
  wind.buffer = noiseBuf;
  wind.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 500;
  bp.Q.value = 0.8;
  const sweep = ctx.createOscillator();
  sweep.frequency.value = 0.12;
  const sweepAmt = ctx.createGain();
  sweepAmt.gain.value = 250;
  sweep.connect(sweepAmt);
  sweepAmt.connect(bp.frequency);
  sweep.start();
  wind.connect(bp);
  bp.connect(layers.wind);
  wind.start();

  // 3) Dread: two clashing notes with a trembling volume
  const trem = ctx.createGain();
  trem.gain.value = 0.6;
  const tremLfo = ctx.createOscillator();
  tremLfo.frequency.value = 5;
  const tremAmt = ctx.createGain();
  tremAmt.gain.value = 0.4;
  tremLfo.connect(tremAmt);
  tremAmt.connect(trem.gain);
  tremLfo.start();
  [233.1, 246.9].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.connect(trem);
    o.start();
  });
  trem.connect(layers.dread);

  // 4) Calm pad
  [261.6, 329.6, 392].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.connect(layers.pad);
    o.start();
  });

  // 5) Eerie high note with vibrato
  const eerie = ctx.createOscillator();
  eerie.type = "sine";
  eerie.frequency.value = 880;
  const vib = ctx.createOscillator();
  vib.frequency.value = 6;
  const vibAmt = ctx.createGain();
  vibAmt.gain.value = 14;
  vib.connect(vibAmt);
  vibAmt.connect(eerie.frequency);
  vib.start();
  eerie.connect(layers.eerie);
  eerie.start();

  setMood("fog");

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });
}

export function setMood(mood) {
  if (!ctx) return;
  const target = MOODS[mood] || MOODS.fog;
  const t = ctx.currentTime;
  Object.keys(layers).forEach((k) => layers[k].gain.setTargetAtTime(target[k], t, 1.2));
  if (MUSIC[mood]) startMusic(mood);
  else stopMusic();
}

export function toggleMute() {
  muted = !muted;
  if (ctx) master.gain.setTargetAtTime(muted ? 0 : 0.9, ctx.currentTime, 0.1);
  return muted;
}

// "spooky" = old typewriter click, "soft" = cute bubble pop (romance)
let typeStyle = "spooky";
export function setTypeStyle(style) {
  typeStyle = style || "spooky";
}

const SOFT_NOTES = [84, 86, 88, 91, 93, 96];
function softTick() {
  const t = ctx.currentTime;
  const f = mtof(SOFT_NOTES[Math.floor(Math.random() * SOFT_NOTES.length)]);
  const o = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o2.type = "triangle";
  o.frequency.value = f;
  o2.frequency.value = f * 2;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.045, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  o.connect(g);
  o2.connect(g);
  g.connect(master);
  o.start(t);
  o2.start(t);
  o.stop(t + 0.18);
  o2.stop(t + 0.18);
}

// Tiny typewriter click
export function tick() {
  if (!ctx || muted) return;
  if (typeStyle === "soft") return softTick();
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.frequency.value = 900 + Math.random() * 500;
  g.gain.setValueAtTime(0.02, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.05);
}

// Button click
export function click() {
  if (!ctx || muted) return;
  if (typeStyle === "soft") {
    // sparkly two-note chime
    [88, 95].forEach((n, i) => {
      const t = ctx.currentTime + i * 0.07;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = mtof(n);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.4);
    });
    return;
  }
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(520, t);
  o.frequency.exponentialRampToValueAtTime(240, t + 0.12);
  g.gain.setValueAtTime(0.12, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.15);
}

// Jump-scare hit: deep boom + noise burst
export function sting() {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(90, t);
  o.frequency.exponentialRampToValueAtTime(30, t + 0.9);
  g.gain.setValueAtTime(0.5, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 1.2);

  const n = ctx.createBufferSource();
  n.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 1400;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.18, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
  n.connect(f);
  f.connect(ng);
  ng.connect(master);
  n.start(t);
  n.stop(t + 0.6);
}

function thump(delay) {
  if (!ctx || muted) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(62, t);
  o.frequency.exponentialRampToValueAtTime(38, t + 0.12);
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.2);
}

// level 0 = off, higher = faster heartbeat
export function setHeartbeat(level) {
  clearInterval(hbTimer);
  hbTimer = null;
  if (!ctx || level <= 0) return;
  const period = Math.max(520, 1100 - level * 130);
  const beat = () => {
    thump(0);
    thump(0.22);
  };
  beat();
  hbTimer = setInterval(beat, period);
}

// Short warning beep (used by the countdown timer)
export function beep() {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.value = 880;
  g.gain.setValueAtTime(0.08, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.14);
}

/* ------------------------------------------------------------------ */
/* Cozy music for the romance genre: a soft lo-fi loop made live.      */
/* Chords: I - vi - IV - V. Each mood changes speed, key and sparkle.  */
/* ------------------------------------------------------------------ */

const MUSIC = {
  sweet: { bpm: 88, shift: 0, melody: 0.45, echo: 0.28 },
  flutter: { bpm: 106, shift: 2, melody: 0.6, echo: 0.22 },
  dreamy: { bpm: 70, shift: -3, melody: 0.35, echo: 0.42 },
  cheer: { bpm: 116, shift: 5, melody: 0.7, echo: 0.2 },
};
// [bass, then 4 chord notes] as MIDI numbers
const CHORDS = [
  [48, 60, 64, 67, 71],
  [45, 57, 60, 64, 67],
  [41, 53, 57, 60, 64],
  [43, 55, 59, 62, 65],
];
const SCALE = [72, 74, 76, 79, 81, 84, 86];
const ARP = [1, 2, 3, 4, 3, 2, 3, 2];

let music = null;

function mtof(n) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

function voice(freq, t, gain, dur, type = "triangle", partial = 0) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(music.bus);
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  o.start(t);
  o.stop(t + dur + 0.05);
  if (partial) {
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "sine";
    o2.frequency.value = freq * partial;
    g2.gain.value = 0.35;
    o2.connect(g2);
    g2.connect(g);
    o2.start(t);
    o2.stop(t + dur + 0.05);
  }
}

function hat(t) {
  const n = ctx.createBufferSource();
  n.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 7500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.012, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  n.connect(f);
  f.connect(g);
  g.connect(music.bus);
  n.start(t);
  n.stop(t + 0.06);
}

function scheduleMusic() {
  if (!ctx || !music) return;
  const m = MUSIC[music.mood];
  const eighth = 60 / m.bpm / 2;
  while (music.next < ctx.currentTime + 0.3) {
    const t = music.next;
    const step = music.step % 8;
    const chord = CHORDS[Math.floor(music.step / 8) % 4];
    const sh = m.shift;
    if (step === 0 || step === 4) voice(mtof(chord[0] + sh), t, 0.1, eighth * 4, "sine");
    voice(mtof(chord[ARP[step]] + sh), t, 0.05, eighth * 5, "triangle", 2);
    if (step % 2 === 0 && Math.random() < m.melody) {
      const note = SCALE[Math.floor(Math.random() * SCALE.length)] + sh;
      voice(mtof(note), t, 0.04, eighth * 6, "sine", 2.76);
    }
    if (step === 7 && Math.random() < 0.35) voice(mtof(96 + sh), t, 0.018, eighth * 8, "sine", 2.76);
    if (step % 2 === 1) hat(t);
    music.next += eighth;
    music.step++;
  }
  music.delay.delayTime.setTargetAtTime(eighth * 3, ctx.currentTime, 0.3);
  music.wet.gain.setTargetAtTime(m.echo, ctx.currentTime, 0.5);
}

function startMusic(mood) {
  if (!ctx) return;
  if (!music) {
    const bus = ctx.createGain();
    bus.gain.value = 0;
    bus.connect(master);
    const delay = ctx.createDelay(2);
    const wet = ctx.createGain();
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    bus.connect(delay);
    delay.connect(wet);
    wet.connect(master);
    delay.connect(fb);
    fb.connect(delay);
    music = { bus, delay, wet, mood, step: 0, next: 0, timer: null, stopTimer: null, active: false };
  }
  music.mood = mood;
  music.active = true;
  clearTimeout(music.stopTimer);
  music.bus.gain.setTargetAtTime(1, ctx.currentTime, 0.7);
  if (!music.timer) {
    music.next = ctx.currentTime + 0.1;
    music.step = 0;
    music.timer = setInterval(scheduleMusic, 80);
  }
}

function stopMusic() {
  if (!music || !music.active) return;
  music.active = false;
  music.bus.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
  music.stopTimer = setTimeout(() => {
    clearInterval(music.timer);
    music.timer = null;
  }, 2500);
}
