/**
 * scrollSound.js
 * Synthesizes a luxury haptic rotary dial / digital crown ratchet tick on scroll.
 * Inspired by high-precision mechanical watch bezels, Leica camera dials, and Apple Digital Crown.
 * Ultra-subtle, zero audio files, perfectly responsive to scroll travel distance.
 */

let audioCtx = null;
let lastTickTime = 0;
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
let accumulatedDelta = 0;

// Every ~65px of scroll distance produces one precision haptic tick
const STEP_PIXELS = 65;
// Maximum tick rate (~22 ticks/sec) to keep fast flings sounding like a smooth ratchet
const MIN_INTERVAL_MS = 45;
const TICK_VOLUME = 0.35;

export function getAudioContext() {
  if (audioCtx) return audioCtx;
  if (typeof window === 'undefined') return null;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  try {
    audioCtx = new AudioContextClass();
  } catch {
    return null;
  }
  return audioCtx;
}

export function unlockScrollAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

if (typeof window !== 'undefined') {
  const tryResume = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  };
  window.addEventListener('pointerdown', tryResume, { passive: true });
  window.addEventListener('touchstart', tryResume, { passive: true });
  window.addEventListener('keydown', tryResume, { passive: true });
  window.addEventListener('wheel', tryResume, { passive: true });
}

function isSoundGloballyEnabled() {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('cuelume_sound');
  return saved === null ? true : saved === 'true';
}

function renderTickNodes(ctx, direction) {
  try {
    const now = ctx.currentTime;

    // Direction-aware frequencies: slightly deeper going down, slightly brighter going up
    const baseFreq = direction > 0 ? 2150 : 2550;
    const filterFreq = direction > 0 ? 3600 : 4200;

    // 1. Transient Click Ping (Sine)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);

    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(TICK_VOLUME * 0.75, now + 0.001);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    osc.connect(oscGain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.018);

    // 2. Mechanical Friction Snap (Bandpass Filtered Noise)
    const noiseDuration = 0.014;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * noiseDuration));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(filterFreq, now);
    bandpass.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(TICK_VOLUME * 0.9, now + 0.001);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

    noise.connect(bandpass).connect(noiseGain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.018);
  } catch {}
}

/**
 * Synthesizes a single luxury micro-haptic crown tick.
 * @param {number} direction 1 for scrolling down, -1 for scrolling up
 */
function playHapticTick(direction = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      renderTickNodes(ctx, direction);
    }).catch(() => {});
    return;
  }

  renderTickNodes(ctx, direction);
}

/**
 * Processes scroll updates and triggers the haptic tick per distance step.
 * @param {number} currentY Current window.scrollY
 */
export function handleScrollSound(currentY) {
  if (!isSoundGloballyEnabled()) return;

  const dy = currentY - lastScrollY;
  const absDy = Math.abs(dy);
  lastScrollY = currentY;

  // Ignore tiny jitter
  if (absDy < 1) return;

  accumulatedDelta += absDy;

  if (accumulatedDelta >= STEP_PIXELS) {
    const now = performance.now();
    if (now - lastTickTime >= MIN_INTERVAL_MS) {
      playHapticTick(dy >= 0 ? 1 : -1);
      lastTickTime = now;
      accumulatedDelta = 0;
    }
  }
}
