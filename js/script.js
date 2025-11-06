const playBtn = document.getElementById('playBtn');
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');

playBtn.addEventListener('click', function() {
    div1.style.display = 'none';
    div2.style.display = 'block';
});