// Sound Manager - Modular system for handling all game sounds
class SoundManager {
  constructor() {
    this.isMuted = false;
    this.sounds = {};
    this.activeSounds = []; // Track which sounds should be playing
    this.soundTypes = {}; // Track if sound is 'background' or 'effect'
  }

  // Register a new sound
  // type: 'background' (pauses/resumes on mute) or 'effect' (stops on mute, doesn't resume)
  registerSound(name, url, loop = false, type = 'background', volume = 0.1) {
    const audio = new Audio(url);
    audio.loop = loop;
    audio.volume = volume;
    this.sounds[name] = audio;
    this.soundTypes[name] = type;
    return audio;
  }

  // Play a sound by name
  play(name) {
    if (this.sounds[name]) {
      // Add to active sounds if not already there
      if (this.activeSounds.indexOf(name) === -1) {
        this.activeSounds.push(name);
      }
      
      if (!this.isMuted) {
        this.sounds[name].play().catch(function(err) {
          console.log('Could not play sound ' + name + ':', err);
        });
      }
    }
  }

  // Pause a sound by name
  pause(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
    }
  }

  // Stop a sound by name (pause and reset to start, remove from active)
  stop(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
      
      // Remove from active sounds
      const index = this.activeSounds.indexOf(name);
      if (index > -1) {
        this.activeSounds.splice(index, 1);
      }
    }
  }

  // Toggle mute state
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      // When muting: pause background sounds, stop effects
      for (let i = 0; i < this.activeSounds.length; i++) {
        const soundName = this.activeSounds[i];
        const soundType = this.soundTypes[soundName] || 'background';
        
        if (soundType === 'background') {
          this.pause(soundName);
        } else {
          // Stop effects and remove from active sounds
          this.stop(soundName);
        }
      }
    } else {
      // When unmuting: only resume background sounds
      for (let i = 0; i < this.activeSounds.length; i++) {
        const soundName = this.activeSounds[i];
        const soundType = this.soundTypes[soundName] || 'background';
        
        if (soundType === 'background') {
          this.play(soundName);
        }
        // Effects are not resumed - they stay stopped
      }
    }
    
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
