import { soundManager } from '../soundManager.js';
import { state } from '../state.js';
import { renderVikingsList } from '../ui/vikingsList.js';
import { resetGameState } from './ingameScreen.js';
import { persistence } from '../persistence.js';

export function initCreditScreen() {
    const creditScreen = document.getElementById('credit-screen');
    const creditHomeButton = document.getElementById('credit-home-button');
    const homeScreen = document.getElementById('home-screen');

    if (creditHomeButton) {
        creditHomeButton.addEventListener('click', () => handleHomeClick(creditScreen, homeScreen));
    }

    function handleHomeClick(creditScreen, homeScreen) {
        if (!creditScreen || !homeScreen) return;

        state.clearVikings();
        state.resetAvailableRunes();
        renderVikingsList();
        resetGameState();

        creditScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        soundManager.stop('ingame');
        soundManager.play('forest');
        persistence.clear();
        persistence.save();
    }
}

