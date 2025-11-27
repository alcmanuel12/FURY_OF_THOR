import { state } from '../state.js';
import { soundManager } from '../soundManager.js';
import { renderVikingsList } from '../ui/vikingsList.js';
import { selectRandomViking, breakChosenRune, resetChosenRune } from '../ui/runesCircle.js';
import { alertPopup } from '../alertPopup.js';

let isAnimationInProgress = false;
let gameEnded = false;

export function resetGameState() {
    gameEnded = false;
    isAnimationInProgress = false;

    const chosenNameEl = document.getElementById('chosenVikingName');
    if (chosenNameEl) {
        chosenNameEl.textContent = '';
        chosenNameEl.classList.remove('visible');
    }

    const sacrificeActionButton = document.getElementById('sacrifice-action');
    if (sacrificeActionButton) {
        sacrificeActionButton.disabled = false;
        sacrificeActionButton.style.pointerEvents = 'auto';
    }

    resetChosenRune();
}

export function initIngameScreen() {
    const ingameScreen = document.getElementById('ingame-screen');
    const ingameHomeButton = document.getElementById('ingame-home-button');
    const sacrificeActionButton = document.getElementById('sacrifice-action');
    const ingameBackgroundVideo = document.getElementById('ingame-background-video');
    const ingameBackgroundVideoMobile = document.getElementById('ingame-background-video-mobile');
    const thorCharacter = document.getElementById('thor-character');
    const homeScreen = document.getElementById('home-screen');
    const bubble = document.querySelector(".bubble.right");

    preloadThorImages();

    resetGameState();

    if (ingameHomeButton) {
        ingameHomeButton.addEventListener('click', () => handleHomeClick(ingameScreen, homeScreen, ingameBackgroundVideo, ingameBackgroundVideoMobile));
    }

    if (sacrificeActionButton) {
        sacrificeActionButton.addEventListener('click', () => handleSacrifice(thorCharacter));
    }

    playBackgroundVideo(ingameBackgroundVideo, ingameBackgroundVideoMobile);

    async function handleHomeClick(ingameScreen, homeScreen, ingameBackgroundVideo, ingameBackgroundVideoMobile) {
        const confirmar = await alertPopup.confirm('Are you sure you want to go back?\nYou will lose all progress.');

        if (confirmar) {
            state.clearVikings();
            state.resetAvailableRunes();
            renderVikingsList();
            resetGameState();

            if (ingameBackgroundVideo) ingameBackgroundVideo.pause();
            if (ingameBackgroundVideoMobile) ingameBackgroundVideoMobile.pause();

            if (ingameScreen && homeScreen) {
                ingameScreen.style.display = 'none';
                homeScreen.style.display = 'flex';
                soundManager.stop('ingame');
                soundManager.play('forest');
            }
        }
    }

    function handleSacrifice(thorCharacter) {
        if (isAnimationInProgress || gameEnded) return;

        isAnimationInProgress = true;
        if (sacrificeActionButton) {
            sacrificeActionButton.disabled = true;
            sacrificeActionButton.style.pointerEvents = 'none';
        }

        selectRandomViking();
        changeBubbleText();

        if (thorCharacter) {
            thorCharacter.classList.add('thor-character-mad');
        }
        soundManager.play('lightning-effect');

        setTimeout(() => {
            const eliminatedViking = breakChosenRune();
            if (eliminatedViking) {
                const vikings = state.getVikings();
                const index = vikings.indexOf(eliminatedViking);
                if (index !== -1) {
                    state.removeViking(index);
                }
            }

            setTimeout(() => {
                if (thorCharacter) {
                    thorCharacter.classList.remove('thor-character-mad');
                }
                resetChosenRune();

                const remainingVikings = state.getVikings();
                if (remainingVikings.length === 1) {
                    gameEnded = true;
                    const winnerName = remainingVikings[0];

                    setTimeout(() => {
                        selectWinner(winnerName);
                    }, 500);
                } else {
                    isAnimationInProgress = false;
                    if (sacrificeActionButton) {
                        sacrificeActionButton.disabled = false;
                        sacrificeActionButton.style.pointerEvents = 'auto';
                    }
                }
            }, 3500);
        }, 1500);
    }

    function selectWinner(winnerName) {
        const runeElements = state.getRuneElements();
        const winnerRuneElement = runeElements.find(el =>
            el.dataset.vikingName === winnerName && !el.classList.contains('broken')
        );

        if (winnerRuneElement) {
            runeElements.forEach(r => {
                r.classList.remove('chosen', 'dimmed');
            });
            winnerRuneElement.classList.add('chosen');

            const chosenNameEl = document.getElementById('chosenVikingName');
            if (chosenNameEl) {
                chosenNameEl.textContent = winnerName;
                chosenNameEl.classList.add('visible');
            }
        }

        setTimeout(() => {
            showWinner(winnerName);
        }, 2000);
    }

    async function showWinner(winnerName) {
        const winnerRune = state.getVikingRune(winnerName);
        if (!winnerRune) return;

        const runeElements = state.getRuneElements();
        const winnerRuneElement = runeElements.find(el =>
            el.dataset.vikingName === winnerName && !el.classList.contains('broken')
        );

        if (winnerRuneElement) {
            runeElements.forEach(r => {
                r.classList.remove('chosen', 'dimmed');
            });
            winnerRuneElement.classList.add('chosen');
        }

        const winnerMessage = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                <div style="font-size: 32px;">The winner is:</div>
                <div style="display: flex; align-items: center; gap: 15px; font-size: 36px;">
                    <img src="${winnerRune.url}" alt="Winner rune" style="width: 55px; height: 55px;" />
                    <span>${winnerName}</span>
                </div>
            </div>
        `;

        const result = await alertPopup.show(winnerMessage, false, 'Credits', '', true, 'winner-alert');

        if (result) {
            const creditScreen = document.getElementById('credit-screen');
            if (creditScreen && ingameScreen) {
                ingameScreen.style.display = 'none';
                creditScreen.style.display = 'flex';
                soundManager.stop('ingame');
            }
        }
    }

    function changeBubbleText(newText) {
        if (!bubble) return;

        const phrases = [
            "By order of the gods, your blood will feed this sacred fire.",
            "The runes have spoken. Your fate is sealed.",
            "Tonight your soul will thunder in Valhalla.",
            "The fire hungers. Your blood will answer.",
            "The gods demand a sacrifice… and they chose you."
        ];

        const randomIndex = Math.floor(Math.random() * phrases.length);
        bubble.textContent = phrases[randomIndex];
    }


}

function preloadThorImages() {
    const desktopMadImage = new Image();
    const mobileMadImage = new Image();
    desktopMadImage.src = 'https://res.cloudinary.com/diycpogap/image/upload/v1762902368/thor-background-shouting_quv4zf.png';
    mobileMadImage.src = 'https://res.cloudinary.com/diycpogap/image/upload/v1762902299/thor-mobile-background-shouting_imbjrs.png';
}

function playBackgroundVideo(ingameBackgroundVideo, ingameBackgroundVideoMobile) {
    const isMobile = window.innerWidth <= 768;
    const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
    if (videoToPlay) {
        videoToPlay.play().catch(() => { });
    }
}