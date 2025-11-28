import { state } from '../core/state.js';
import { runes } from '../core/runes.js';
import { persistence } from '../core/persistence.js';

export function renderVikingsList() {
    const list = document.getElementById('vikingsList');
    if (!list) return;

    state.resetAvailableRunes();
    list.innerHTML = '';

    const vikings = state.getVikings();
    const availableRunes = state.getAvailableRunes();

    vikings.forEach(name => {
        const div = document.createElement('div');
        div.classList.add('viking-item');

        if (availableRunes.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableRunes.length);
            const chosenRune = state.removeRune(randomIndex);
            div.innerHTML = `<img src="${chosenRune.url}" alt="runa-${chosenRune.id}"><span>${name}</span>`;
            list.appendChild(div);
        }
    });
    
    persistence.save();
}

