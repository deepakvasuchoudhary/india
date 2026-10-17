/**
 * INDIA: CHRONICA IMPERII INDICI
 * Ambient Audio Synthesis Engine (Pure Web Audio API)
 * Generates meditative Indian Classical Tanpura harmonic drone & milestone transition chimes.
 * Zero external audio files required, zero latency, runs offline.
 */

class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.tanpuraNodes = [];
    this.lfo = null;
    this.lfoGain = null;
    this.baseFreq = 138.59; // C#3 (Traditional Indian Tanpura root key - Pancham shruti)
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    // Reverb simulator via Convolver or multiple delays
    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Low-pass filter for warm, soothing classical sound
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(850, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.masterGain.connect(this.filter);
    this.filter.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.22, now + 2.5);

    this.startTanpuraDrone();
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.001, now + 1.5);

    setTimeout(() => {
      this.stopTanpuraDrone();
      this.isPlaying = false;
    }, 1600);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  startTanpuraDrone() {
    this.stopTanpuraDrone();

    // Traditional 4-string Tanpura tuning:
    // 1st string: Pa (Fifth, 3/2 = ~207.89 Hz)
    // 2nd string: Sa (Octave tonic, 2/1 = ~277.18 Hz)
    // 3rd string: Sa (Octave tonic, 2/1 = ~277.18 Hz)
    // 4th string: Kharaj Sa (Root tonic, 1/1 = ~138.59 Hz)
    const stringFreqs = [
      this.baseFreq * 1.5,     // Pa (G#3)
      this.baseFreq * 2.0,     // Tar Sa (C#4)
      this.baseFreq * 2.003,   // Slight detune for authentic shimmering acoustic jivari
      this.baseFreq * 1.0      // Mandra Sa (C#3)
    ];

    const stringGains = [0.16, 0.18, 0.17, 0.28];

    // LFO for slow meditative acoustic breathing
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec breathing cycle
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.lfo.connect(this.lfoGain);
    this.lfo.start();

    this.tanpuraNodes = stringFreqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx === 3 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(stringGains[idx], this.ctx.currentTime);

      // Connect LFO for gentle pulsation
      this.lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      return { osc, gain };
    });
  }

  stopTanpuraDrone() {
    if (this.tanpuraNodes.length) {
      this.tanpuraNodes.forEach(node => {
        try {
          node.osc.stop();
          node.osc.disconnect();
        } catch (e) {}
      });
      this.tanpuraNodes = [];
    }
    if (this.lfo) {
      try {
        this.lfo.stop();
        this.lfo.disconnect();
      } catch (e) {}
      this.lfo = null;
    }
  }

  // Play subtle bell/temple chime upon changing milestone
  playEraChime() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;

    const chimeFreqs = [554.37, 830.61, 1108.73]; // C#5, G#5, C#6
    chimeFreqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + i * 0.05);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06 / (i + 1), now + i * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0 + i * 0.2);

      osc.connect(gain);
      gain.connect(this.filter);

      osc.start(now + i * 0.05);
      osc.stop(now + 3.5);
    });
  }
}

if (typeof window !== "undefined") {
  window.ambientAudio = new AmbientSoundEngine();
}
