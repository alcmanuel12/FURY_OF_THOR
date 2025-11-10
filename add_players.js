const input = document.getElementById('vikingName');
const addBtn = document.getElementById('btn-add');
const removeBtn = document.getElementById('btn-remove');
const confirmBtn = document.getElementById('btn-confirm');
const homeBtn = document.getElementById('btn-home');
const list = document.getElementById('vikingsList');

let vikings = [];

addBtn.addEventListener('click', () => {
  const name = input.value.trim();
  if (name !== '') {
    vikings.push(name);
    renderList();
    input.value = '';
  }
});

removeBtn.addEventListener('click', () => {
  vikings.pop();
  renderList();
});

confirmBtn.addEventListener('click', () => {
  alert('Vikingos listos para el sacrificio 😈');

});

homeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

function renderList() {
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
