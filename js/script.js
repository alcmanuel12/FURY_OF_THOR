document.addEventListener('DOMContentLoaded', function() {
    const muteButton = document.getElementById('mute-button');
    const playButton = document.getElementById('play-button');
    const backButton = document.getElementById('back-button');
    const homeScreen = document.getElementById('home-screen');
    const playerSelectionScreen = document.getElementById('player-selection-screen');
    
    if (muteButton) {
        muteButton.addEventListener('click', function() {
            this.classList.toggle('mute-icon');
            this.classList.toggle('sound-icon');
        });
    }
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            if (homeScreen && playerSelectionScreen) {
                homeScreen.style.display = 'none';
                playerSelectionScreen.style.display = 'flex';
            }
        });
    }
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            if (homeScreen && playerSelectionScreen) {
                playerSelectionScreen.style.display = 'none';
                homeScreen.style.display = 'flex';
            }
        });
    }
});

