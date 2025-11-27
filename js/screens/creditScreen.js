import { soundManager } from '../soundManager.js';
import { state } from '../state.js';
import { renderVikingsList } from '../ui/vikingsList.js';
import { resetGameState } from './ingameScreen.js';

export function initCreditScreen() {
    const creditScreen = document.getElementById('credit-screen');
    const creditHomeButton = document.getElementById('credit-home-button');
    const homeScreen = document.getElementById('home-screen');
    const names = document.querySelector('.names');


    function showCreditScreen() {
        creditScreen.style.display = 'block';
        if (names) names.style.display = 'block';
    }



    if (creditHomeButton) {
        creditHomeButton.addEventListener('click', () => handleHomeClick());
    }

    function handleHomeClick() {
        if (!creditScreen || !homeScreen) return;

        state.clearVikings();
        state.resetAvailableRunes();
        renderVikingsList();
        resetGameState();

        creditScreen.style.display = 'none';
        homeScreen.style.display = 'flex';


        if (names) names.style.display = 'none';

        soundManager.stop('ingame');
        soundManager.play('forest');
    }


    return { showCreditScreen };
}
