import { soundManager } from './soundManager.js';
import { initHomeScreen } from './screens/homeScreen.js';
import { initPlayerSelectionScreen } from './screens/playerSelectionScreen.js';
import { initIngameScreen } from './screens/ingameScreen.js';

function registerSounds() {
    soundManager.registerSound('forest', 'https://res.cloudinary.com/din119ww9/video/upload/v1763026026/sonido-bosque_h3l0u8.mp3', true);
    soundManager.registerSound('ingame', 'https://res.cloudinary.com/din119ww9/video/upload/v1763454899/ytmp3free.cc_hausbrjotr-skullcrusher-youtubemp3free.org_ljh9jh.mp3', true);
}

function init() {
    registerSounds();
    initHomeScreen();
    initPlayerSelectionScreen();
    initIngameScreen();
    soundManager.play('forest');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
