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

// Player Selection Screen Functionality
const input = document.getElementById('vikingName');
const addBtn = document.getElementById('btn-add');
const removeBtn = document.getElementById('btn-remove');
const gameStartButton = document.getElementById('game-start-button');
const list = document.getElementById('vikingsList');
let vikings = [];

if (addBtn && input) {
    const addViking = () => {
        const name = input.value.trim();
        if (name !== '') {
            vikings.push(name);
            renderList();
            input.value = '';
        }
    };
    
    addBtn.addEventListener('click', addViking);
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addViking();
        }
    });
}

if (removeBtn && input) {
    removeBtn.addEventListener('click', () => {
        const name = input.value.trim();
        
        if (name !== '') {
            // Find the index using case-insensitive comparison
            const index = vikings.findIndex(v => v.toLowerCase() === name.toLowerCase());
            if (index !== -1) {
                // Remove the specific name from the list
                vikings.splice(index, 1);
            } else {
                // If name doesn't match, remove the last item
                vikings.pop();
            }
        } else {
            // If input is empty, remove the last item
            vikings.pop();
        }
        
        input.value = '';
        renderList();
    });
}

if (gameStartButton) {
    gameStartButton.addEventListener('click', () => {
        alert('Vikingos listos para el sacrificio 😈');
    });
}

function renderList() {
    if (!list) return;
    list.innerHTML = '';
    vikings.forEach(name => {
        const div = document.createElement('div');
        div.classList.add('viking-item');
        div.innerHTML = `
            <img src="https://res.cloudinary.com/djuisin8z/image/upload/v1761819249/runa_pezgrande_okbtby.png" alt="Runa">
            <span>${name}</span>
        `;
        list.appendChild(div);
    });
}

