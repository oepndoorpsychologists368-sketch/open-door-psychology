// Zero-dependency ambient soundscape generator using Web Audio API

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentMode: 'rain' | 'resonance' | 'breeze' = 'resonance';
  private nodes: (AudioNode | number)[] = [];
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(vol, 0.4)), this.ctx.currentTime, 0.05);
    }
  }

  public play(mode: 'rain' | 'resonance' | 'breeze') {
    this.stop();
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.currentMode = mode;
    this.isPlaying = true;

    if (mode === 'resonance') {
      // Warm meditative drone (fundamental 108Hz, 216Hz, 432Hz)
      const freqs = [108, 162, 216, 432];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        // Gentle tremolo
        const lfo = this.ctx!.createOscillator();
        const lfoGain = this.ctx!.createGain();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx!.currentTime);
        lfoGain.gain.setValueAtTime(0.02, this.ctx!.currentTime);
        lfo.connect(gain.gain);
        lfo.start();

        gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx!.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain!);
        osc.start();

        this.nodes.push(osc, gain, lfo, lfoGain);
      });
    } else if (mode === 'breeze' || mode === 'rain') {
      // Filtered pink-ish noise for natural airflow / soft rain
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.08;
        b2 = 0.86 * b2 + white * 0.15;
        output[i] = (b0 + b1 + b2) * 0.2;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = mode === 'rain' ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(mode === 'rain' ? 850 : 380, this.ctx.currentTime);
      filter.Q.setValueAtTime(mode === 'rain' ? 1.2 : 0.8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      whiteNoise.start();

      this.nodes.push(whiteNoise, filter, gain);
    }
  }

  public stop() {
    this.nodes.forEach((node) => {
      if (node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {}
      }
      if (node && typeof (node as AudioNode).disconnect === 'function') {
        try {
          (node as AudioNode).disconnect();
        } catch {}
      }
    });
    this.nodes = [];
    this.isPlaying = false;
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      mode: this.currentMode,
    };
  }
}

export const soundscape = new SoundscapeEngine();
