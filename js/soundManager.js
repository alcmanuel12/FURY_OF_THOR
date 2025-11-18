class SoundManager {
  constructor() {
    this.isMuted = false;
    this.sounds = {};
    this.activeSounds = [];
    this.soundTypes = {};
  }

  registerSound(name, url, loop = false, type = 'background', volume = 0.1) {
    const audio = new Audio(url);
    audio.loop = loop;
    audio.volume = volume;
    this.sounds[name] = audio;
    this.soundTypes[name] = type;
    return audio;
  }

  play(name) {
    if (this.sounds[name]) {
      if (!this.activeSounds.includes(name)) {
        this.activeSounds.push(name);
      }
      if (!this.isMuted) {
        this.sounds[name].play().catch(err => {
          console.log('Could not play sound ' + name + ':', err);
        });
      }
    }
  }

  pause(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
    }
  }

  stop(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;

      const index = this.activeSounds.indexOf(name);
      if (index > -1) {
        this.activeSounds.splice(index, 1);
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.activeSounds.forEach(soundName => {
        const soundType = this.soundTypes[soundName] || 'background';
        if (soundType === 'background') {
          this.pause(soundName);
        } else {
          this.stop(soundName);
        }
      });
    } else {
      this.activeSounds.forEach(soundName => {
        const soundType = this.soundTypes[soundName] || 'background';
        if (soundType === 'background') {
          this.play(soundName);
        }
      });
    }

    return this.isMuted;
  }
}

module.exports = { SoundManager };
