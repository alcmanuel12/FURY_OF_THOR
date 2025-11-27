import { runes } from './runes.js';

let vikings = [];
let availableRunes = [...runes];
let runeElements = [];
let vikingToRune = {};

export const state = {
    getVikings: () => vikings,
    setVikings: (newVikings) => { vikings = newVikings; },
    addViking: (name) => { vikings.push(name); },
    removeViking: (index) => { vikings.splice(index, 1); },
    popViking: () => { vikings.pop(); },
    clearVikings: () => { vikings = []; },

    getAvailableRunes: () => availableRunes,
    resetAvailableRunes: () => { availableRunes = [...runes]; },
    removeRune: (index) => { return availableRunes.splice(index, 1)[0]; },

    getRuneElements: () => runeElements,
    setRuneElements: (elements) => { runeElements = elements; },
    clearRuneElements: () => { runeElements = []; },

    getVikingToRune: () => vikingToRune,
    setVikingToRune: (mapping) => { vikingToRune = mapping; },
    getVikingRune: (vikingName) => { return vikingToRune[vikingName]; },
    clearVikingToRune: () => { vikingToRune = {}; }
};