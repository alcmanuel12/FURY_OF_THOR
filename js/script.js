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

if (backButton) {
  backButton.addEventListener('click', function () {
    if (homeScreen && playerSelectionScreen) {
      playerSelectionScreen.style.display = 'none';
      homeScreen.style.display = 'flex';
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

// === "Ingame" screen HTML elements ===
const ingameScreen = document.getElementById('ingame-screen');
const ingameHomeButton = document.getElementById('ingame-home-button');
const sacrificeActionButton = document.getElementById('sacrifice-action');
const ingameBackgroundVideo = document.getElementById('ingame-background-video');
const ingameBackgroundVideoMobile = document.getElementById('ingame-background-video-mobile');
const thorCharacter = document.getElementById('thor-character');
const runesCircleContainer = document.getElementById('runesCircleContainer');


let runeElements = [];


const preloadThorImages = () => {
  const desktopMadImage = new Image();
  const mobileMadImage = new Image();
  desktopMadImage.src = 'https://res.cloudinary.com/diycpogap/image/upload/v1762902368/thor-background-shouting_quv4zf.png';
  mobileMadImage.src = 'https://res.cloudinary.com/diycpogap/image/upload/v1762902299/thor-mobile-background-shouting_imbjrs.png';
};
preloadThorImages();


if (gameStartButton) {
  gameStartButton.addEventListener('click', () => {
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

const containerSize = runesCircleContainer.offsetWidth;
const baseRadius = containerSize / 2.6; // cercle plus serré
const radiusAdjustment = Math.max(0.9, 1.2 - vikings.length * 0.03);
const radius = baseRadius * radiusAdjustment;
const centerX = containerSize / 2;
const centerY = containerSize / 2;


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
  ingameHomeButton.addEventListener('click', () => {
    if (homeScreen && ingameScreen) {
      ingameScreen.style.display = 'none';
      homeScreen.style.display = 'flex';
      if (ingameBackgroundVideo) ingameBackgroundVideo.pause();
      if (ingameBackgroundVideoMobile) ingameBackgroundVideoMobile.pause();
    }
  });
}

if (sacrificeActionButton) {
  sacrificeActionButton.addEventListener('click', () => {
    if (runeElements.length === 0) return; 

    runeElements.forEach(r => {
      r.classList.remove('chosen', 'dimmed');
    });


    runeElements.forEach(r => r.classList.remove('chosen', 'dimmed'));
    const chosenNameEl = document.getElementById('chosenVikingName');
    if (chosenNameEl) {
      chosenNameEl.textContent = '';
      chosenNameEl.classList.remove('visible');
    }

    const randomIndex = Math.floor(Math.random() * runeElements.length);
    const chosenRune = runeElements[randomIndex];
    const chosenName = chosenRune.dataset.vikingName;

    setTimeout(() => {
      runeElements.forEach((r, i) => {
        if (i !== randomIndex) r.classList.add('dimmed');
      });
      chosenRune.classList.add('chosen');
  
      setTimeout(() => {
        if (chosenNameEl) {
          chosenNameEl.textContent = chosenName;
          chosenNameEl.classList.add('visible');
        }
      }, 1300); 
    }, 300);
  });
}


    // Ensure appropriate video plays when screen is shown
      const isMobile = window.innerWidth <= 768;
      const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
      if (videoToPlay) {
        videoToPlay.play().catch(err => {
          console.log('Video autoplay prevented:', err);
        });
      }
// Preload Thor images when entering ingame screen to avoid "jumpy" transition
      preloadThorImages();


if (ingameHomeButton) {
  ingameHomeButton.addEventListener('click', () => {
    if (homeScreen && ingameScreen) {
      ingameScreen.style.display = 'none';
      homeScreen.style.display = 'flex';
  // Pause both videos when leaving the screen
      if (ingameBackgroundVideo) {
        ingameBackgroundVideo.pause();
      }
      if (ingameBackgroundVideoMobile) {
        ingameBackgroundVideoMobile.pause();
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