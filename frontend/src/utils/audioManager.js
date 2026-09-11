/**
 * audioManager.js
 * Unified, bulletproof Web Audio engine for instant UI feedback and arrival chimes.
 * Works across all browsers and respects autoplay policies with instant gesture fallback.
 */

import { play, setEnabled, setVolume } from 'cuelume';
import { unlockScrollAudio } from './scrollSound';

let audioCtx = null;
let hasPlayedWelcome = false;

export function getSharedAudioContext() {
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

/**
 * Pure Web Audio crystal sparkle chime synthesizer.
 * Does not depend on external library state or userActivation flags.
 */
export function playWelcomeChime(volume = 0.85) {
  if (typeof window === 'undefined') return;

  const saved = localStorage.getItem('cuelume_sound');
  if (saved === 'false') return;

  const ctx = getSharedAudioContext();
  if (!ctx) return;

  const renderChime = () => {
    try {
      const now = ctx.currentTime;
      // 4-note celestial chime: A6 (1760Hz) -> C#7 (2217Hz) -> E7 (2637Hz) -> A7 (3520Hz)
      const notes = [
        { freq: 1760, delay: 0.00, dur: 0.18, vol: 0.45 },
        { freq: 2217, delay: 0.06, dur: 0.20, vol: 0.50 },
        { freq: 2637, delay: 0.12, dur: 0.22, vol: 0.55 },
        { freq: 3520, delay: 0.18, dur: 0.38, vol: 0.65 },
      ];

      notes.forEach(({ freq, delay, dur, vol }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(vol * volume, now + delay + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain).connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur + 0.05);
      });
    } catch {}
  };

  if (ctx.state === 'suspended') {
    ctx.resume().then(renderChime).catch(() => {});
  } else {
    renderChime();
  }
}

/**
 * Initializes audio system and attempts immediate startup playback,
 * falling back to instant trigger on the very first user interaction.
 */
export function initAudioSystem() {
  if (typeof window === 'undefined') return () => {};

  // Ensure default is enabled
  const saved = localStorage.getItem('cuelume_sound');
  const isEnabled = saved === null ? true : saved === 'true';
  setEnabled(isEnabled);
  setVolume(0.75);

  // 1. Attempt immediate playback on load (works if browser allows or MEI is high)
  playWelcomeChime(0.8);
  unlockScrollAudio();

  // 2. Fallback: activate on ANY first interaction (click, tap, scroll, key, move)
  const triggerOnFirstInteraction = () => {
    unlockScrollAudio();
    if (!hasPlayedWelcome) {
      hasPlayedWelcome = true;
      playWelcomeChime(0.85);
    }

    // Also wake up cuelume's context
    try {
      play('sparkle', { volume: 0.8 });
    } catch {}

    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener('click', triggerOnFirstInteraction, true);
    window.removeEventListener('pointerdown', triggerOnFirstInteraction, true);
    window.removeEventListener('touchstart', triggerOnFirstInteraction, true);
    window.removeEventListener('keydown', triggerOnFirstInteraction, true);
    window.removeEventListener('scroll', triggerOnFirstInteraction, true);
  };

  window.addEventListener('click', triggerOnFirstInteraction, true);
  window.addEventListener('pointerdown', triggerOnFirstInteraction, true);
  window.addEventListener('touchstart', triggerOnFirstInteraction, true);
  window.addEventListener('keydown', triggerOnFirstInteraction, true);
  window.addEventListener('scroll', triggerOnFirstInteraction, true);

  return cleanup;
}
