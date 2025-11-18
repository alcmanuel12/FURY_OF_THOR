import { runes, brokenRunes } from './runes.js';
let vikings = [];
// Copy of runes array to track available runes
let availableRunes = [...runes];

// "Home" screen HMTL elements
const muteButton = document.getElementById('mute-button');
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');
const homeScreen = document.getElementById('home-screen');
const playerSelectionScreen = document.getElementById('player-selection-screen');
const infoButton = document.getElementById('info-button');
const infoPopup = document.getElementById('info-popup');
const closeInfo = document.getElementById('close-info');

if (muteButton) {
  muteButton.addEventListener('click', function () {
    this.classList.toggle('mute-icon');
    this.classList.toggle('sound-icon');
  });
}

if (playButton) {
  playButton.addEventListener('click', function () {
    if (homeScreen && playerSelectionScreen) {
      homeScreen.style.display = 'none';
      playerSelectionScreen.style.display = 'flex';
    }
  });
}

if (infoButton && infoPopup && closeInfo) {
  
  infoButton.addEventListener('click', () => {
    infoPopup.classList.remove('hidden');
  });

  
  closeInfo.addEventListener('click', (e) => {
    e.stopPropagation();
    infoPopup.classList.add('hidden');
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

// "Add player" screen HMTL elements

const input = document.getElementById('vikingName');
const addBtn = document.getElementById('btn-add');
const removeBtn = document.getElementById('btn-remove');
const gameStartButton = document.getElementById('game-start-button');
const list = document.getElementById('vikingsList');


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

function renderList() {
  if (!list) return;

  // Reload list if have to re-render
  availableRunes = [...runes];

  list.innerHTML = '';
  vikings.forEach(name => {
    const div = document.createElement('div');
    div.classList.add('viking-item');

    if (availableRunes.length > 0) {
      // Choose a random image from the rune list
      const randomIndex = Math.floor(Math.random() * availableRunes.length);
      const chosenRune = availableRunes[randomIndex];
      // Remove that rune from the list so that it doesn't appear again
      availableRunes.splice(randomIndex, 1);
      // Inser the image of the rune and it's ID on the alt
      div.innerHTML = `<img src="${chosenRune.url}" alt="runa-${chosenRune.id}"><span>${name}</span>`;
      list.appendChild(div);
    } else {
      // If no more runes are available, show alert
      alert("No more players allowed!")
    }
  });
}

// "Ingame" screen HTML elements

const ingameScreen = document.getElementById('ingame-screen');
const ingameBackButton = document.getElementById('back-button');
const ingameHomeButton = document.getElementById('ingame-home-button');
const sacrificeActionButton = document.getElementById('sacrifice-action');
const ingameBackgroundVideo = document.getElementById('ingame-background-video');
const ingameBackgroundVideoMobile = document.getElementById('ingame-background-video-mobile');
const thorCharacter = document.getElementById('thor-character');
const runesCircleContainer = document.getElementById('runesCircleContainer');

let runeElements = [];

// Preload Thor's mad form images to prevent jumpy transitions
const preloadThorImages = () => {
  const isMobile = window.innerWidth <= 768;
  const desktopMadImage = new Image();
  const mobileMadImage = new Image();
  
  desktopMadImage.src = 'https://res.cloudinary.com/diycpogap/image/upload/v1762902368/thor-background-shouting_quv4zf.png';
  mobileMadImage.src = 'https://res.cloudinary.com/diycpogap/image/upload/v1762902299/thor-mobile-background-shouting_imbjrs.png';
};

// Preload images when the page loads
preloadThorImages();

if (gameStartButton) {
  gameStartButton.addEventListener('click', () => {
    if (vikings.length < 2){
      // No hace nada si hay menos de 2 jugadores.
      return window.confirm('Necesitas al menos 2 jugadores para empezar el juego.');
    }
    if (playerSelectionScreen && ingameScreen) {
      playerSelectionScreen.style.display = 'none';
      ingameScreen.style.display = 'flex';

      const isMobile = window.innerWidth <= 768;
      const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
      if (videoToPlay) videoToPlay.play().catch(() => {});


      if (runesCircleContainer) {
        runesCircleContainer.innerHTML = '';
        runeElements = [];

        const total = vikings.length;
        if (total === 0) return;


        const minRadius = 150; 
        const maxRadius = 260; 
        const radius = Math.min(maxRadius, minRadius + total * 6); 
        const centerX = 250;
        const centerY = 250;

        vikings.forEach((name, index) => {
          const angle = (index * (2 * Math.PI)) / total - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          const rune = runes[index % runes.length];
          const runeDiv = document.createElement('div');
          runeDiv.classList.add('rune-item');
          runeDiv.style.backgroundImage = `url(${rune.url})`;
          runeDiv.style.left = `${x - 45}px`;
          runeDiv.style.top = `${y - 45}px`;


          runeDiv.dataset.vikingName = name;

          runesCircleContainer.appendChild(runeDiv);
          runeElements.push(runeDiv);
        });

        runesCircleContainer.classList.remove('visible');
        setTimeout(() => {
          runesCircleContainer.classList.add('visible');
        }, 100);
      }
    }
  });
}

  if (ingameHomeButton) {
  ingameHomeButton.addEventListener('click', function() {
    const confirmar = window.confirm('¿Seguro que quieres volver?\nPerderás todo el progreso.');
    if (confirmar) {
      console.log("Aceptó salir");
      vikings = [];
      availableRunes = [...runes];
      renderList();
      if (ingameBackgroundVideo) ingameBackgroundVideo.pause();
      if (ingameBackgroundVideoMobile) ingameBackgroundVideoMobile.pause();
      if (ingameScreen && homeScreen) {
        ingameScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
      }
    }
  });
}


  if (ingameBackButton) {
    ingameBackButton.addEventListener('click', function() {
      const confirmar = window.confirm('¿Seguro que quieres volver?\nPerderás a todos tus vikingos.');
      if (confirmar) {
        vikings = [];
        availableRunes = [...runes];
        renderList();
      if (homeScreen && playerSelectionScreen) {
      playerSelectionScreen.style.display = 'none';
      homeScreen.style.display = 'flex';
      }
    }
  });
}


if (sacrificeActionButton && thorCharacter) {
  sacrificeActionButton.addEventListener('click', () => {
    // Switch Thor to mad form
    thorCharacter.classList.add('thor-character-mad');
    
    // Return to relaxed form after 2 seconds
    setTimeout(() => {
      thorCharacter.classList.remove('thor-character-mad');
    }, 2000);
  });
}