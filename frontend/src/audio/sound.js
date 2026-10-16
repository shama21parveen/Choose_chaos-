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
  fog: { drone: 0.05, wind: 0.07, dread: 0, pad: 0, eerie: 0 },
  calm: { drone: 0.025, wind: 0.04, dread: 0, pad: 0.025, eerie: 0 },
  danger: { drone: 0.09, wind: 0.05, dread: 0.03, pad: 0, eerie: 0 },
  secret: { drone: 0.05, wind: 0.03, dread: 0.012, pad: 0, eerie: 0.02 },
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
}

export function toggleMute() {
  muted = !muted;
  if (ctx) master.gain.setTargetAtTime(muted ? 0 : 0.9, ctx.currentTime, 0.1);
  return muted;
}

// Tiny typewriter click
export function tick() {
  if (!ctx || muted) return;
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
