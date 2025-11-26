import { soundManager } from './soundManager.js';
import { initHomeScreen } from './screens/homeScreen.js';
import { initPlayerSelectionScreen } from './screens/playerSelectionScreen.js';
import { initIngameScreen } from './screens/ingameScreen.js';
import { initCreditScreen } from './screens/creditScreen.js';
import { alertPopup } from './alertPopup.js';

function registerSounds() {
    soundManager.registerSound('forest', 'https://res.cloudinary.com/din119ww9/video/upload/v1763026026/sonido-bosque_h3l0u8.mp3', true);
    soundManager.registerSound('ingame', 'https://res.cloudinary.com/diycpogap/video/upload/v1763506178/background-ingame-music_xr61ns.mp3', true), "background", 0.5;
    soundManager.registerSound('lightning-effect', 'https://res.cloudinary.com/diycpogap/video/upload/v1763506598/lightning-shout-effect_r2nqpj.mp3', false, 'effect', 0.7);
}

async function init() {
    registerSounds();
    initHomeScreen();
    initPlayerSelectionScreen();
    initIngameScreen();
    initCreditScreen();

    await showSoundAlert();

    soundManager.play('forest');
}

async function showSoundAlert() {
    const message = 'For security reasons, the browser enforces sounds to be muted on arrival.\n\nThis game has sounds and it\'s highly recommended to enable them for the best experience.';
    const result = await alertPopup.show(message, true, 'OK', 'Mute');

    const muteButton = document.getElementById('mute-button');

    if (result) {
        soundManager.setMuted(false);
        if (muteButton) {
            muteButton.classList.remove('sound-icon');
            muteButton.classList.add('mute-icon');
        }
    } else {
        soundManager.setMuted(true);
        if (muteButton) {
            muteButton.classList.remove('mute-icon');
            muteButton.classList.add('sound-icon');
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}