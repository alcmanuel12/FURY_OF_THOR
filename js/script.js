import { runes, brokenRunes } from './runes.js';
import { soundManager } from './soundManager.js';

let vikings = [];
// Copy of runes array to track available runes
let availableRunes = [...runes];

// Register the forest sound
soundManager.registerSound('forest', 'https://res.cloudinary.com/din119ww9/video/upload/v1763026026/sonido-bosque_h3l0u8.mp3', true);
soundManager.registerSound('ingame', 'https://res.cloudinary.com/din119ww9/video/upload/v1763454899/ytmp3free.cc_hausbrjotr-skullcrusher-youtubemp3free.org_ljh9jh.mp3', true)
soundManager.registerSound('thunder', 'https://res.cloudinary.com/din119ww9/video/upload/v1763458555/thunder-25689_1_f6vf8f.mp3');
soundManager.registerSound('screaming-thor', 'https://res.cloudinary.com/din119ww9/video/upload/v1763459080/epic-war-combat-scream-352707_ujbx7v.mp3');
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
    const isMuted = soundManager.toggleMute();
    this.classList.toggle('mute-icon');
    this.classList.toggle('sound-icon');
    if (musicStart.muted) {
      musicStart.muted = false;
      playMusic();
    } else {
      musicStart.muted = true;
      pauseMusic();
    }
  });
}

if (playButton) {
  playButton.addEventListener('click', function () {
    if (homeScreen && playerSelectionScreen) {
      homeScreen.style.display = 'none';
      playerSelectionScreen.style.display = 'flex';
      // Forest sound continues playing on player selection screen
      soundManager.play('forest');
    }
    musicStart.playMusic();
  });
}

if (backButton) {
  backButton.addEventListener('click', function () {
    const confirmar = window.confirm('¿Seguro que quieres volver?\nPerderás a todos tus vikingos.');
    
    if (confirmar) {
      vikings = [];
      availableRunes = [...runes];
      renderList();
      
      // Oculta la pantalla de selección y muestra el menú
      if (homeScreen && playerSelectionScreen) {
        playerSelectionScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        // Forest sound continues playing on home screen
        soundManager.play('forest');
      }
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
    musicStart.playMusic();
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
      // Check if we've reached the maximum number of vikings (one per rune)
      if (vikings.length >= runes.length) {
        alert("No more players allowed!");
        return;
      }
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
    }
  });
}

// "Ingame" screen HTML elements
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

      // Stop forest sound when entering ingame screen
      soundManager.stop('forest');
      soundManager.play('ingame');

      const isMobile = window.innerWidth <= 768;
      const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
      if (videoToPlay) videoToPlay.play().catch(() => {});


      if (runesCircleContainer) {
        runesCircleContainer.innerHTML = '';
        runeElements = [];

        const total = vikings.length;
        if (total === 0) return;

        // Calculate scale factor based on window size
        let scale = 1.0;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        if (windowHeight <= 900 && windowWidth > 768) {
          scale = 0.75; // 60% of original size
        } else if (windowWidth <= 768) {
          scale = 0.5; // Even smaller for mobile
        }

        const minRadius = 150 * scale; 
        const maxRadius = 260 * scale; 
        const radius = Math.min(maxRadius, minRadius + total * 6 * scale); 
        const centerX = 250; // Keep center at container center
        const centerY = 250; // Keep center at container center
        const runeSize = 90 * scale;
        const runeOffset = runeSize / 2;

        vikings.forEach((name, index) => {
          const angle = (index * (2 * Math.PI)) / total - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          const rune = runes[index % runes.length];
          const runeDiv = document.createElement('div');
          runeDiv.classList.add('rune-item');
          runeDiv.style.backgroundImage = `url(${rune.url})`;
          runeDiv.style.width = `${runeSize}px`;
          runeDiv.style.height = `${runeSize}px`;
          runeDiv.style.left = `${x - runeOffset}px`;
          runeDiv.style.top = `${y - runeOffset}px`;


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
      vikings = [];
      availableRunes = [...runes];
      renderList();
      
      // Oculta la pantalla de juego y muestra el menú
      if (ingameBackgroundVideo) ingameBackgroundVideo.pause();
      if (ingameBackgroundVideoMobile) ingameBackgroundVideoMobile.pause();
      
      if (ingameScreen && homeScreen) {
        ingameScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        // Resume forest sound when returning to home screen
        soundManager.stop('ingame')
        soundManager.play('forest');
      }
    }
  });
}

if (sacrificeActionButton) {
  sacrificeActionButton.addEventListener('click', () => {
    if (runeElements.length === 0) return; 
    soundManager.play('screaming-thor');
    runeElements.forEach(r => {
      r.classList.remove('chosen', 'dimmed');
      soundManager.play('thunder');
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

// Start forest sound on page load (home screen)
// Wait for DOM to be ready and then start the sound
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    soundManager.play('forest');
  });
} else {
  // DOM is already ready

  soundManager.play('forest');
}