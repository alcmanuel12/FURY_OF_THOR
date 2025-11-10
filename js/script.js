document.addEventListener('DOMContentLoaded', function() {
    const muteButton = document.getElementById('mute-button');
    
    if (muteButton) {
        muteButton.addEventListener('click', function() {
            this.classList.toggle('mute-icon');
            this.classList.toggle('sound-icon');
        });
    }
});

