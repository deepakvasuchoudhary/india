// Web Audio API Synthesizer for historical atmosphere & subtle UI sound effects
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.droneGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggleSound() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopDrone();
    } else {
      this.startDrone();
      this.playChime(523.25); // C5 notification
    }
    return !this.isMuted;
  }

  startDrone() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.stopDrone();
      const now = this.ctx.currentTime;

      // Gentle Tanpura / Ambient Indian Classical drone frequency (D2 / A2)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);

      this.droneOsc1.type = 'triangle';
      this.droneOsc1.frequency.setValueAtTime(146.83, now); // D3

      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(220.00, now); // A3

      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.04, now + 3);

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start();
      this.droneOsc2.start();
    } catch (e) {
      console.warn("Audio drone error", e);
    }
  }

  stopDrone() {
    if (this.droneGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          if (this.droneOsc1) { this.droneOsc1.stop(); this.droneOsc1.disconnect(); }
          if (this.droneOsc2) { this.droneOsc2.stop(); this.droneOsc2.disconnect(); }
          this.droneOsc1 = null;
          this.droneOsc2 = null;
        }, 900);
      } catch (e) {}
    }
  }

  // Play pleasant chime on event selection or era transition
  playChime(freq = 440) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  }

  // Play subtle historic battle drum strike
  playDrum() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Subtle page turn click
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

window.soundEngine = new SoundEngine();
