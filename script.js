// =============================================
// 🔥 Fury of Thor - Control de escenas y video
// =============================================

// Referencias a elementos del DOM
const sceneStart = document.getElementById('scene-start');
const sceneAdd = document.getElementById('scene-add');
const goAddPlayers = document.getElementById('goAddPlayers');
const goHome = document.getElementById('btn-home');
const bgVideo = document.getElementById('bg-video');

// =============================================
// 🎥 Asegurar que el video nunca se detenga
// =============================================
function keepPlaying() {
  if (bgVideo.paused) {
    bgVideo.play().catch(() => {
      // Algunos navegadores bloquean autoplay, se ignora el error
    });
  }
}

// Si el navegador pausa el video automáticamente → lo reanudamos
bgVideo.addEventListener('pause', keepPlaying);

// Si el usuario cambia de pestaña y vuelve → reanudar el video
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) keepPlaying();
});

// =============================================
// ⚡ Transición: Game Start → Add Players
// =============================================
goAddPlayers.addEventListener('click', () => {
  // Ocultar escena inicial
  sceneStart.classList.remove('active');
  sceneStart.classList.add('hidden');

  // Asegurar video visible y corriendo
  bgVideo.style.opacity = '1';
  keepPlaying();

  // Mostrar escena Add Players con pequeño retraso
  setTimeout(() => {
    sceneAdd.classList.remove('hidden');
    sceneAdd.classList.add('active');
  }, 500);
});

// =============================================
// 🏠 Transición: Add Players → Game Start
// =============================================
goHome.addEventListener('click', () => {
  // Ocultar escena Add Players
  sceneAdd.classList.remove('active');
  sceneAdd.classList.add('hidden');

  // Mantener video visible y reproduciéndose
  bgVideo.style.opacity = '1';
  keepPlaying();

  // Mostrar escena inicial nuevamente
  setTimeout(() => {
    sceneStart.classList.remove('hidden');
    sceneStart.classList.add('active');
  }, 500);
});
