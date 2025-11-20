import { state } from '../state.js';
import { runes } from '../runes.js';
import { soundManager } from '../soundManager.js';
import { renderVikingsList } from '../ui/vikingsList.js';
import { renderRunesCircle } from '../ui/runesCircle.js';

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
            if (e.key === 'Enter') addViking(input);
        });
    }
    input.addEventListener('input', () => {
    input.value = input.value
        .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '')
        .substring(0, 15);
});

    if (removeBtn && input) {
        removeBtn.addEventListener('click', () => removeViking(input));
    }

    if (backButton) {
        backButton.addEventListener('click', () =>
            handleBackClick(homeScreen, playerSelectionScreen)
        );
    }

    if (gameStartButton) {
        gameStartButton.addEventListener('click', () =>
            handleGameStart(
                playerSelectionScreen,
                ingameScreen,
                ingameBackgroundVideo,
                ingameBackgroundVideoMobile
            )
        );
    }

    
    function addViking(input) {
        const name = input.value.trim();

        if (name === '') return;

        
        if (state.getVikings().length >= runes.length) {
            alert('No more players allowed!');
            return;
        }

        
        if (!nameRegex.test(name)) {
            alert('Nombre inválido. Solo letras, espacios y máximo 15 caracteres.');
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
            const index = vikings.findIndex(
                (v) => v.toLowerCase() === name.toLowerCase()
            );
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

    function handleBackClick(homeScreen, playerSelectionScreen) {
        const confirmar = window.confirm(
            '¿Seguro que quieres volver?\nPerderás a todos tus vikingos.'
        );

        if (confirmar) {
            state.clearVikings();
            state.resetAvailableRunes();
            renderVikingsList();

            if (homeScreen && playerSelectionScreen) {
                playerSelectionScreen.style.display = 'none';
                homeScreen.style.display = 'flex';
                soundManager.play('forest');
            }
        }
    }

    function handleGameStart(
        playerSelectionScreen,
        ingameScreen,
        ingameBackgroundVideo,
        ingameBackgroundVideoMobile
    ) {
        if (state.getVikings().length === 0) {
        alert('You must add at least one viking before continuing.');
        return;
        }
        if (!playerSelectionScreen || !ingameScreen) return;

        playerSelectionScreen.style.display = 'none';
        ingameScreen.style.display = 'flex';

        soundManager.stop('forest');
        soundManager.play('ingame');

        const isMobile = window.innerWidth <= 768;
        const videoToPlay = isMobile
            ? ingameBackgroundVideoMobile
            : ingameBackgroundVideo;
        if (videoToPlay) videoToPlay.play().catch(() => {});

        renderRunesCircle();
    }
}
