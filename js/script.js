import { runes, brokenRunes } from './runes.js';
let vikings = [];
let availableRunes = [...runes];


const muteButton = document.getElementById('mute-button');
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');
const homeScreen = document.getElementById('home-screen');
const playerSelectionScreen = document.getElementById('player-selection-screen');
const infoButton = document.getElementById('info-button');


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
    if (e.key === 'Enter') addViking();
  });
}

if (removeBtn && input) {
  removeBtn.addEventListener('click', () => {
    const name = input.value.trim();
    if (name !== '') {
      const index = vikings.findIndex(v => v.toLowerCase() === name.toLowerCase());
      if (index !== -1) vikings.splice(index, 1);
      else vikings.pop();
    } else vikings.pop();

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
    } else {
      alert("No more players allowed!");
    }
  });
}


const ingameScreen = document.getElementById('ingame-screen');
const ingameHomeButton = document.getElementById('ingame-home-button');
const sacrificeActionButton = document.getElementById('sacrifice-action');
const ingameBackgroundVideo = document.getElementById('ingame-background-video');
const ingameBackgroundVideoMobile = document.getElementById('ingame-background-video-mobile');
const thorCharacter = document.getElementById('thor-character');


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
      if (videoToPlay) videoToPlay.play().catch(err => console.log('Video autoplay prevented:', err));
      preloadThorImages();
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


if (sacrificeActionButton && thorCharacter) {
  sacrificeActionButton.addEventListener('click', () => {
    thorCharacter.classList.add('thor-character-mad');
    setTimeout(() => thorCharacter.classList.remove('thor-character-mad'), 2000);
  });
}


if (infoButton) {
  if (gameStartButton) {
    gameStartButton.addEventListener('click', () => {
      infoButton.classList.add('hidden');
    });
  }
  if (ingameHomeButton) {
    ingameHomeButton.addEventListener('click', () => {
      infoButton.classList.remove('hidden');
    });
  }
}


const infoPopup = document.getElementById('info-popup');
const closeInfo = document.getElementById('close-info');

if (infoButton && infoPopup && closeInfo) {
  
  infoButton.addEventListener('click', () => {
    infoPopup.classList.remove('hidden');
  });

  
  closeInfo.addEventListener('click', () => {
    infoPopup.classList.add('hidden');
  });

  
  infoPopup.addEventListener('click', (e) => {
    if (e.target === infoPopup) {
      infoPopup.classList.add('hidden');
    }
  });
}