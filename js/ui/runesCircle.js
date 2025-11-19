import { state } from '../state.js';
import { runes } from '../runes.js';

export function renderRunesCircle() {
    const runesCircleContainer = document.getElementById('runesCircleContainer');
    if (!runesCircleContainer) return;

    runesCircleContainer.innerHTML = '';
    state.clearRuneElements();

    const vikings = state.getVikings();
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

    const runeElements = [];

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

    state.setRuneElements(runeElements);

    runesCircleContainer.classList.remove('visible');
    setTimeout(() => {
        runesCircleContainer.classList.add('visible');
    }, 100);
}

export function selectRandomViking() {
    const runeElements = state.getRuneElements();
    if (runeElements.length === 0) return;

    runeElements.forEach(r => {
        r.classList.remove('chosen', 'dimmed');
    });

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
}
