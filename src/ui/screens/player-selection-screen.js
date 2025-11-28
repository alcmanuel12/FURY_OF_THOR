import { state } from '../../core/state.js';
import { runes } from '../../core/runes.js';
import { soundManager } from '../../core/sound-manager.js';
import { renderVikingsList } from '../vikings-list.js';
import { renderRunesCircle } from '../runes-circle.js';
import { alertPopup } from '../alert-popup.js';
import { resetGameState } from './ingame-screen.js';
import { resetChosenRune } from '../runes-circle.js';
import { persistence } from '../../core/persistence.js';

export function initPlayerSelectionScreen() {
    const input = document.getElementById('vikingName');
    const addBtn = document.getElementById('btn-add');
    const removeBtn = document.getElementById('btn-remove');
    const backButton = document.getElementById('back-button');
    const gameStartButton = document.getElementById('game-start-button');
    const homeScreen = document.getElementById('home-screen');
    const playerSelectionScreen = document.getElementById('player-selection-screen');
    const ingameScreen = document.getElementById('ingame-screen');
    const ingameBackgroundVideo = document.getElementById('ingame-background-video');
    const ingameBackgroundVideoMobile = document.getElementById('ingame-background-video-mobile');

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,15}$/;

    if (addBtn && input) {
        addBtn.addEventListener('click', () => addViking(input));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addViking(input);
            }
        });

        input.addEventListener('input', () => {
            input.value = input.value
                .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '')
                .substring(0, 15);
        });
    }

    if (removeBtn && input) {
        removeBtn.addEventListener('click', () => removeViking(input));
    }

    if (backButton) {
        backButton.addEventListener('click', () => handleBackClick(homeScreen, playerSelectionScreen));
    }

    if (gameStartButton) {
        gameStartButton.addEventListener('click', () => handleGameStart(playerSelectionScreen, ingameScreen, ingameBackgroundVideo, ingameBackgroundVideoMobile));
    }

    function addViking(input) {
        const name = input.value.trim();
        if (name === '') return;

        if (state.getVikings().length >= runes.length) {
            alertPopup.alert("No more players allowed!");
            return;
        }

        if (!nameRegex.test(name)) {
            alertPopup.alert('Invalid name. Only letters and spaces allowed. Maximum 15 characters.');
            return;
        }

        if (!nameRegex.test(name)) {
            alert('Invalid name. Only letters and spaces allowed. Maximum 15 characters.');
            return;
        }

        state.addViking(name);
        renderVikingsList();
        input.value = '';
    }

    function removeViking(input) {
        const name = input.value.trim();
        const vikings = state.getVikings();

        if (name !== '') {
            const index = vikings.findIndex(v => v.toLowerCase() === name.toLowerCase());
            if (index !== -1) {
                state.removeViking(index);
            } else {
                state.popViking();
            }
        } else {
            state.popViking();
        }

        input.value = '';
        renderVikingsList();
    }

    async function handleBackClick(homeScreen, playerSelectionScreen) {
        const confirmar = await alertPopup.confirm('Are you sure you want to go back?\nYou will lose all your vikings.');

        if (confirmar) {
            state.clearVikings();
            state.resetAvailableRunes();
            renderVikingsList();
            resetGameState();
            resetChosenRune();

            if (homeScreen && playerSelectionScreen) {
                playerSelectionScreen.style.display = 'none';
                homeScreen.style.display = 'flex';
                soundManager.play('forest');
                persistence.clear();
                persistence.save();
            }
        }
    }

    function handleGameStart(playerSelectionScreen, ingameScreen, ingameBackgroundVideo, ingameBackgroundVideoMobile) {
        if (!playerSelectionScreen || !ingameScreen) return;

        if (state.getVikings().length <= 1) {
            alertPopup.alert('You must add at least two vikings before continuing.');
            return;
        }

        playerSelectionScreen.style.display = 'none';
        ingameScreen.style.display = 'flex';

        soundManager.stop('forest');
        soundManager.play('ingame');

        const isMobile = window.innerWidth <= 768;
        const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
        if (videoToPlay) videoToPlay.play().catch(() => { });

        renderRunesCircle();
        resetGameState();
        persistence.save();
    }
}

