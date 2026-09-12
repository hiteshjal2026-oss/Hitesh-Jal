/**
 * Procedural Audio Synthesizer for Engineering Focus (Brown Noise & Cyber Rain)
 * Uses native Web Audio API - no external audio files required.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.6;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.isPlaying) return;

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
      
      // Generate Brownian / Pink noise algorithm for deep focus
      for (let channel = 0; channel < 2; channel++) {
        const output = noiseBuffer.getChannelData(channel);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Brown noise integration filter (1/f^2)
          lastOut = (lastOut + 0.02 * white) / 1.02;
          // Soft clip
          output[i] = lastOut * 3.5;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass Filter for soft deep rumble
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(432, this.ctx.currentTime); // 432Hz harmonic as specified in design
      lowpass.Q.setValueAtTime(1.0, this.ctx.currentTime);

      // Rain droplet highpass filter
      const dropletFilter = this.ctx.createBiquadFilter();
      dropletFilter.type = 'peaking';
      dropletFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      dropletFilter.gain.setValueAtTime(3, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);

      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;

      whiteNoise.connect(lowpass);
      lowpass.connect(dropletFilter);
      dropletFilter.connect(this.gainNode);
      this.gainNode.connect(this.analyserNode);
      this.analyserNode.connect(this.ctx.destination);

      whiteNoise.start(0);
      this.noiseNode = whiteNoise;
      this.isPlaying = true;
    } catch (e) {
      console.warn('Web Audio playback failed or blocked:', e);
    }
  }

  public stop() {
    if (this.noiseNode && 'stop' in this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getSpectrumData(outputArray: Uint8Array): void {
    if (this.analyserNode && this.isPlaying) {
      this.analyserNode.getByteFrequencyData(outputArray);
    } else {
      outputArray.fill(0);
    }
  }
}

export const soundSynthesizer = new SoundSynthesizer();
