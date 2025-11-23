import { soundManager } from './soundManager.js';
import { initHomeScreen } from './screens/homeScreen.js';
import { initPlayerSelectionScreen } from './screens/playerSelectionScreen.js';
import { initIngameScreen } from './screens/ingameScreen.js';

function registerSounds() {
    soundManager.registerSound('forest', 'https://res.cloudinary.com/din119ww9/video/upload/v1763026026/sonido-bosque_h3l0u8.mp3', true);
    soundManager.registerSound('ingame', 'https://res.cloudinary.com/diycpogap/video/upload/v1763506178/background-ingame-music_xr61ns.mp3', true), "background", 0.5;
    soundManager.registerSound('lightning-effect', 'https://res.cloudinary.com/diycpogap/video/upload/v1763506598/lightning-shout-effect_r2nqpj.mp3', false, 'effect', 0.7);
}

function init() {
    registerSounds();
    initHomeScreen();
    initPlayerSelectionScreen();
    initIngameScreen();
    soundManager.play('forest');
    initCreditScreen();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}