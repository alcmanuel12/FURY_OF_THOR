import { runes, brokenRunes } from './runes.js';
import { soundManager } from './soundManager.js';

let vikings = [];

let availableRunes = [...runes];


soundManager.registerSound('forest', 'https://res.cloudinary.com/din119ww9/video/upload/v1763026026/sonido-bosque_h3l0u8.mp3', true);


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
  });
}

if (playButton) {
  playButton.addEventListener('click', function () {
    if (homeScreen && playerSelectionScreen) {
      homeScreen.style.display = 'none';
      playerSelectionScreen.style.display = 'flex';
      
      soundManager.play('forest');
    }
  });
}

if (backButton) {
  backButton.addEventListener('click', function () {
    const confirmar = window.confirm('¿Seguro que quieres volver?\nPerderás a todos tus vikingos.');
    
    if (confirmar) {
      vikings = [];
      availableRunes = [...runes];
      renderList();
      
      
      if (homeScreen && playerSelectionScreen) {
        playerSelectionScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        
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


const input = document.getElementById('vikingName');
const addBtn = document.getElementById('btn-add');
const removeBtn = document.getElementById('btn-remove');
const gameStartButton = document.getElementById('game-start-button');
const list = document.getElementById('vikingsList');

if (input) {
  input.addEventListener("input", () => {
    
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
    
    if (input.value.length > 15) {
      input.value = input.value.slice(0, 15);
    }
  });
}


if (addBtn && input) {
  const addViking = () => {
    const name = input.value.trim();
    if (name !== '') {
      
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
      
      const index = vikings.findIndex(v => v.toLowerCase() === name.toLowerCase());
      if (index !== -1) {
        
        vikings.splice(index, 1);
      } else {
        
        vikings.pop();
      }
    } else {
      
      vikings.pop();
    }

    input.value = '';
    renderList();
  });
}

function renderList() {
  if (!list) return;

  
  availableRunes = [...runes];

  list.innerHTML = '';
  vikings.forEach(name => {
    const div = document.createElement('div');
    div.classList.add('viking-item');

    if (availableRunes.length > 0) {
      
      const randomIndex = Math.floor(Math.random() * availableRunes.length);
      const chosenRune = availableRunes[randomIndex];
      
      availableRunes.splice(randomIndex, 1);
      
      div.innerHTML = `<img src="${chosenRune.url}" alt="runa-${chosenRune.id}"><span>${name}</span>`;
      list.appendChild(div);
    }
  });
}


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

    
    if (vikings.length === 0) {
      alert("You must add at least ONE Viking, warrior!");
      return; 
    }

    
    if (playerSelectionScreen && ingameScreen) {
      playerSelectionScreen.style.display = 'none';
      ingameScreen.style.display = 'flex';

      
      soundManager.stop('forest');

      const isMobile = window.innerWidth <= 768;
      const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
      if (videoToPlay) videoToPlay.play().catch(() => {});


      if (runesCircleContainer) {
        runesCircleContainer.innerHTML = '';
        runeElements = [];

        const total = vikings.length;
        if (total === 0) return;

        
        let scale = 1.0;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        if (windowHeight <= 900 && windowWidth > 768) {
          scale = 0.75; 
        } else if (windowWidth <= 768) {
          scale = 0.5; 
        }

        const minRadius = 150 * scale; 
        const maxRadius = 260 * scale; 
        const radius = Math.min(maxRadius, minRadius + total * 6 * scale); 
        const centerX = 250; 
        const centerY = 250; 
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
      
      
      if (ingameBackgroundVideo) ingameBackgroundVideo.pause();
      if (ingameBackgroundVideoMobile) ingameBackgroundVideoMobile.pause();
      
      if (ingameScreen && homeScreen) {
        ingameScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        
        soundManager.play('forest');
      }
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

    
      const isMobile = window.innerWidth <= 768;
      const videoToPlay = isMobile ? ingameBackgroundVideoMobile : ingameBackgroundVideo;
      if (videoToPlay) {
        videoToPlay.play().catch(err => {
          console.log('Video autoplay prevented:', err);
        });
      }

      preloadThorImages();

if (sacrificeActionButton && thorCharacter) {
  sacrificeActionButton.addEventListener('click', () => {

    thorCharacter.classList.add('thor-character-mad');
    

    setTimeout(() => {
      thorCharacter.classList.remove('thor-character-mad');
    }, 2000);
  });
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    soundManager.play('forest');
  });
} else {
  soundManager.play('forest');
}