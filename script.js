const sceneStart = document.getElementById('scene-start');
const sceneAdd = document.getElementById('scene-add');
const goAddPlayers = document.getElementById('goAddPlayers');
const goHome = document.getElementById('btn-home');
const bgVideo = document.getElementById('bg-video');

function keepPlaying() {
  if (bgVideo.paused) {
    bgVideo.play().catch(() => {});
  }
}

bgVideo.addEventListener('pause', keepPlaying);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) keepPlaying();
});

goAddPlayers.addEventListener('click', () => {
  sceneStart.classList.remove('active');
  sceneStart.classList.add('hidden');
  bgVideo.style.opacity = '1';
  keepPlaying();
  setTimeout(() => {
    sceneAdd.classList.remove('hidden');
    sceneAdd.classList.add('active');
  }, 500);
});

goHome.addEventListener('click', () => {
  sceneAdd.classList.remove('active');
  sceneAdd.classList.add('hidden');
  bgVideo.style.opacity = '1';
  keepPlaying();
  setTimeout(() => {
    sceneStart.classList.remove('hidden');
    sceneStart.classList.add('active');
  }, 500);
});
