import { soundManager } from '../../core/sound-manager.js';
import { persistence } from '../../core/persistence.js';

export function initHomeScreen() {
    const muteButton = document.getElementById('mute-button');
    const playButton = document.getElementById('play-button');
    const homeScreen = document.getElementById('home-screen');
    const playerSelectionScreen = document.getElementById('player-selection-screen');
    const infoButton = document.getElementById('info-button');
    const infoPopup = document.getElementById('info-popup');

    if (muteButton) {
        muteButton.addEventListener('click', handleMuteClick);
    }

    if (playButton) {
        playButton.addEventListener('click', handlePlayClick);
    }

    if (infoButton && infoPopup) {
        initInfoPopup(infoButton, infoPopup);
    }

    function handleMuteClick() {
        soundManager.toggleMute();
        muteButton.classList.toggle('mute-icon');
        muteButton.classList.toggle('sound-icon');
    }

    function handlePlayClick() {
        if (homeScreen && playerSelectionScreen) {
            homeScreen.style.display = 'none';
            playerSelectionScreen.style.display = 'flex';
            soundManager.play('forest');
            persistence.save();
        }
    }

    function initInfoPopup(infoButton, infoPopup) {
        infoButton.addEventListener('click', () => {
            infoPopup.classList.remove('hidden');
        });

        const infoContent = document.querySelector('.info-content');
        if (infoContent) {
            infoContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        infoPopup.addEventListener('click', (e) => {
            if (e.target === infoPopup) {
                infoPopup.classList.add('hidden');
            }
        });
    }
}

