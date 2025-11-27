import { soundManager } from './soundManager.js';
import { initHomeScreen } from './screens/homeScreen.js';
import { initPlayerSelectionScreen } from './screens/playerSelectionScreen.js';
import { initIngameScreen } from './screens/ingameScreen.js';
import { initCreditScreen } from './screens/creditScreen.js';
import { alertPopup } from './alertPopup.js';
import { persistence } from './persistence.js';
import { state } from './state.js';

function registerSounds() {
    soundManager.registerSound('forest', 'https://res.cloudinary.com/din119ww9/video/upload/v1763026026/sonido-bosque_h3l0u8.mp3', true);
    soundManager.registerSound('ingame', 'https://res.cloudinary.com/diycpogap/video/upload/v1763506178/background-ingame-music_xr61ns.mp3', true, 'background', 0.5);
    soundManager.registerSound('lightning-effect', 'https://res.cloudinary.com/diycpogap/video/upload/v1763506598/lightning-shout-effect_r2nqpj.mp3', false, 'effect', 0.7);
}

async function init() {
    registerSounds();
    
    const savedState = persistence.load();
    
    if (savedState) {
        await restoreState(savedState);
    } else {
        initHomeScreen();
        initPlayerSelectionScreen();
        initIngameScreen();
        initCreditScreen();

        await showSoundAlert();

        soundManager.play('forest');
    }
}

async function restoreState(savedState) {
    persistence.setIsRestoring(true);
    
    if (savedState.vikings && savedState.vikings.length > 0) {
        state.setVikings(savedState.vikings);
    }
    
    if (savedState.vikingToRune) {
        state.setVikingToRune(savedState.vikingToRune);
    }
    
    if (savedState.isMuted !== undefined) {
        window._isMuted = savedState.isMuted;
        soundManager.isMuted = savedState.isMuted;
        const muteButton = document.getElementById('mute-button');
        if (muteButton) {
            if (savedState.isMuted) {
                muteButton.classList.remove('mute-icon');
                muteButton.classList.add('sound-icon');
            } else {
                muteButton.classList.remove('sound-icon');
                muteButton.classList.add('mute-icon');
            }
        }
    }
    
    initHomeScreen();
    initPlayerSelectionScreen();
    initIngameScreen();
    initCreditScreen();
    
    const screenToRestore = savedState.currentScreen || 'home-screen';
    
    if (savedState.soundAlertShown) {
        persistence.setSoundAlertShown(true);
    } else {
        await showSoundAlert();
    }
    
    if (screenToRestore === 'player-selection-screen') {
        persistence.restoreScreen('player-selection-screen');
        const { renderVikingsList } = await import('./ui/vikingsList.js');
        renderVikingsList();
        soundManager.play('forest');
        persistence.setIsRestoring(false);
    } else if (screenToRestore === 'ingame-screen') {
        persistence.restoreScreen('ingame-screen');
        
        if (savedState.vikings) {
            state.setVikings(savedState.vikings);
        }
        
        const { setGameEnded } = await import('./screens/ingameScreen.js');
        if (savedState.gameEnded) {
            setGameEnded(true);
            persistence.setGameEnded(true);
            if (savedState.winnerName) {
                persistence.setWinnerName(savedState.winnerName);
            }
            
            const sacrificeActionButton = document.getElementById('sacrifice-action');
            if (sacrificeActionButton) {
                sacrificeActionButton.disabled = true;
                sacrificeActionButton.style.pointerEvents = 'none';
            }
        }
        
        const allVikings = savedState.allVikings || savedState.vikings || [];
        const vikingToRune = savedState.vikingToRune || {};
        
        if (allVikings.length > 0 && Object.keys(vikingToRune).length > 0) {
            persistence.restoreAllRunes(allVikings, vikingToRune, savedState.brokenRunes || []);
            state.setVikingToRune(vikingToRune);
            
            if (savedState.gameEnded && savedState.winnerName) {
                setTimeout(async () => {
                    const { restoreWinner } = await import('./screens/ingameScreen.js');
                    await restoreWinner(savedState.winnerName);
                }, 600);
            }
        } else {
            const { renderRunesCircle } = await import('./ui/runesCircle.js');
            renderRunesCircle();
            
            setTimeout(() => {
                if (savedState.brokenRunes) {
                    persistence.restoreBrokenRunes(savedState.brokenRunes);
                }
                
                if (savedState.gameEnded && savedState.winnerName) {
                    setTimeout(async () => {
                        const { restoreWinner } = await import('./screens/ingameScreen.js');
                        await restoreWinner(savedState.winnerName);
                    }, 300);
                }
            }, 300);
        }
        
        persistence.setIsRestoring(false);
        
        const ingameBackgroundVideo = document.getElementById('ingame-background-video');
        const ingameBackgroundVideoMobile = document.getElementById('ingame-background-video-mobile');
        const isMobile = window.innerWidth <= 768;
        const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
        if (videoToPlay) {
            videoToPlay.play().catch(() => {});
        }
        
        soundManager.play('ingame');
        
        if (!savedState.brokenRunes || savedState.brokenRunes.length === 0) {
            persistence.setIsRestoring(false);
        }
    } else if (screenToRestore === 'credit-screen') {
        persistence.restoreScreen('credit-screen');
        persistence.setIsRestoring(false);
    } else {
        persistence.restoreScreen('home-screen');
        soundManager.play('forest');
        persistence.setIsRestoring(false);
    }
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
    
    persistence.setSoundAlertShown(true);
    persistence.save();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}