/**
 * Professional Payment Sound Engine
 * Recreates the iconic Google Pay / UPI crystalline payment chime
 * and Paytm Soundbox payment confirmation.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes the authentic Google Pay / UPI 4-note crystal chime
 * Notes: Eb5 (622Hz) -> Ab5 (830Hz) -> C6 (1046Hz) -> Eb6 (1244Hz)
 */
export function playGooglePayChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) {
      const audio = new Audio('/sounds/payment-success.wav');
      audio.volume = 0.95;
      audio.play().catch(() => {});
      return;
    }

    const now = ctx.currentTime;
    const notes = [
      { freq: 622.25, time: 0.00, dur: 0.22, vol: 0.50 },
      { freq: 830.61, time: 0.085, dur: 0.24, vol: 0.60 },
      { freq: 1046.50, time: 0.170, dur: 0.26, vol: 0.70 },
      { freq: 1244.50, time: 0.255, dur: 1.45, vol: 0.95 }
    ];

    notes.forEach(({ freq, time, dur, vol }) => {
      const startTime = now + time;

      // Primary sine oscillator (fundamental clarity)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Overtone oscillator for bell resonance
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      // High sparkle overtone
      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(freq * 3, startTime);

      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      const masterGain = ctx.createGain();

      gain1.gain.setValueAtTime(0.001, startTime);
      gain1.gain.linearRampToValueAtTime(vol, startTime + 0.008);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

      gain2.gain.setValueAtTime(0.001, startTime);
      gain2.gain.linearRampToValueAtTime(vol * 0.35, startTime + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + dur * 0.8);

      gain3.gain.setValueAtTime(0.001, startTime);
      gain3.gain.linearRampToValueAtTime(vol * 0.18, startTime + 0.005);
      gain3.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.06);

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);

      masterGain.connect(ctx.destination);

      osc1.start(startTime);
      osc1.stop(startTime + dur + 0.1);
      osc2.start(startTime);
      osc2.stop(startTime + dur + 0.1);
      osc3.start(startTime);
      osc3.stop(startTime + dur + 0.1);
    });

    // Also trigger the pre-rendered audio as reinforcement
    const audio = new Audio('/sounds/payment-success.wav');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch {
    try {
      const audio = new Audio('/sounds/payment-success.wav');
      audio.volume = 0.95;
      audio.play().catch(() => {});
    } catch {}
  }
}

/**
 * Synthesizes the Paytm 2-tone melodic notification chime
 */
export function playPaytmChime() {
  try {
    const audio = new Audio('/sounds/paytm-chime.wav');
    audio.volume = 0.95;
    audio.play().catch(() => {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [
        { freq: 1318.51, time: 0, dur: 0.25 },
        { freq: 1975.53, time: 0.12, dur: 0.65 }
      ].forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.freq, now + n.time);
        gain.gain.setValueAtTime(0.001, now + n.time);
        gain.gain.linearRampToValueAtTime(0.7, now + n.time + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur + 0.05);
      });
    });
  } catch {}
}
/**
 * Master function called on registration/payment success:
 * Plays the iconic, crystal-clear Google Pay payment chime.
 */
export function playPaymentSuccessSound() {
  playGooglePayChime();
}

export default playPaymentSuccessSound;

