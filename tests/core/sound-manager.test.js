import { persistence } from './persistence.js';

class SoundManager {
    constructor() {
        this.isMuted = false;
        this.sounds = {};
        this.activeSounds = [];
        this.soundTypes = {};
        window._isMuted = false;
        window._currentSound = null;
    }

    saveState() {
        persistence.save();
    }

    registerSound(name, url, loop = false, type = 'background', volume = 1) {
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
                this.sounds[name].play().catch((err) => {
                    console.log('Could not play sound ' + name + ':', err);
                });
            }

            const soundType = this.soundTypes[name] || 'background';
            if (soundType === 'background') {
                window._currentSound = name;
                this.saveState();
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

            const soundType = this.soundTypes[name] || 'background';
            if (soundType === 'background' && window._currentSound === name) {
                window._currentSound = null;
                this.saveState();
            }
        }
    }

    setMuted(muted) {
        if (this.isMuted === muted) return this.isMuted;

        this.isMuted = muted;
        window._isMuted = muted;

        if (this.isMuted) {
            for (const soundName of this.activeSounds) {
                const soundType = this.soundTypes[soundName] || 'background';
                if (soundType === 'background') {
                    this.pause(soundName);
                } else {
                    this.stop(soundName);
                }
            }
        } else {
            for (const soundName of this.activeSounds) {
                const soundType = this.soundTypes[soundName] || 'background';
                if (soundType === 'background') {
                    this.play(soundName);
                }
            }
        }

        this.saveState();
        return this.isMuted;
    }

    toggleMute() {
        return this.setMuted(!this.isMuted);
    }
}

export const soundManager = new SoundManager();
