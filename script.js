const playBtn = document.getElementById('playBtn');
const volumeBtn = document.getElementById('btn-volume');
const helpBtn = document.getElementById('btn-help');


playBtn.addEventListener('click', () => {
  window.location.href = "add_players.html";
});


volumeBtn.addEventListener('click', () => {
  alert("Control de volumen próximamente ⚡");
});


helpBtn.addEventListener('click', () => {
  alert("Bienvenido a la furia de Thor ⚡\nTu misión: sobrevive al sacrificio viking...");
});
