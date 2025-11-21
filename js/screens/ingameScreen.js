import { state } from '../state.js';
import { soundManager } from '../soundManager.js';
import { renderVikingsList } from '../ui/vikingsList.js';
import { selectRandomViking, breakChosenRune } from '../ui/runesCircle.js';

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

    if (ingameHomeButton) {
        ingameHomeButton.addEventListener('click', () => handleHomeClick(ingameScreen, homeScreen, ingameBackgroundVideo, ingameBackgroundVideoMobile));
    }

    if (sacrificeActionButton) {
        sacrificeActionButton.addEventListener('click', () => handleSacrifice(thorCharacter));
    }

    playBackgroundVideo(ingameBackgroundVideo, ingameBackgroundVideoMobile);

    function handleHomeClick(ingameScreen, homeScreen, ingameBackgroundVideo, ingameBackgroundVideoMobile) {
        const confirmar = window.confirm('¿Seguro que quieres volver?\nPerderás todo el progreso.');

        if (confirmar) {
            state.clearVikings();
            state.resetAvailableRunes();
            renderVikingsList();

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
        selectRandomViking();
        changeBubbleText();
        setTimeout(() => {
            breakChosenRune();
        }, 1500);
        
        if (thorCharacter) {
            thorCharacter.classList.add('thor-character-mad');
            setTimeout(() => {
                thorCharacter.classList.remove('thor-character-mad');
            }, 4000);
        }
        soundManager.play('lightning-effect');
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