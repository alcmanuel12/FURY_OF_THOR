import { runes } from './runes.js';

// Cargar datos desde localStorage
const loadState = () => {
    const savedState = localStorage.getItem('vikingsGameState');
    if (savedState) {
        return JSON.parse(savedState);
    }
    return {
        vikings: [],
        availableRunes: [...runes],
        vikingToRune: {},
        currentScreen: 'home'
    };
};

// Guardar estado en localStorage
const saveState = () => {
    const stateToSave = {
        vikings: vikings,
        availableRunes: availableRunes,
        vikingToRune: vikingToRune,
        currentScreen: localStorage.getItem('currentScreen') || 'home'
    };
    localStorage.setItem('vikingsGameState', JSON.stringify(stateToSave));
};

// Inicializar con datos guardados
const initialState = loadState();
let vikings = initialState.vikings;
let availableRunes = initialState.availableRunes;
let runeElements = [];
let vikingToRune = initialState.vikingToRune;

export const state = {
    getVikings: () => vikings,
    
    setVikings: (newVikings) => { 
        vikings = newVikings;
        saveState();
    },
    
    addViking: (name) => { 
        vikings.push(name);
        saveState();
    },
    
    removeViking: (index) => { 
        vikings.splice(index, 1);
        saveState();
    },
    
    popViking: () => { 
        vikings.pop();
        saveState();
    },
    
    clearVikings: () => { 
        vikings = [];
        saveState();
    },
    
    getAvailableRunes: () => availableRunes,
    
    resetAvailableRunes: () => { 
        availableRunes = [...runes];
        saveState();
    },
    
    removeRune: (index) => { 
        const removed = availableRunes.splice(index, 1)[0];
        saveState();
        return removed;
    },
    
    getRuneElements: () => runeElements,
    
    setRuneElements: (elements) => { 
        runeElements = elements;
    },
    
    clearRuneElements: () => { 
        runeElements = [];
    },
    
    getVikingToRune: () => vikingToRune,
    
    setVikingToRune: (mapping) => { 
        vikingToRune = mapping;
        saveState();
    },
    
    getVikingRune: (vikingName) => { 
        return vikingToRune[vikingName];
    },
    
    clearVikingToRune: () => { 
        vikingToRune = {};
        saveState();
    },
    
    // Guardar pantalla actual
    setCurrentScreen: (screenName) => {
        localStorage.setItem('currentScreen', screenName);
        saveState();
    },
    
    getCurrentScreen: () => {
        return localStorage.getItem('currentScreen') || 'home';
    },
    
    clearAllState: () => {
        localStorage.removeItem('vikingsGameState');
        localStorage.removeItem('currentScreen');
        vikings = [];
        availableRunes = [...runes];
        vikingToRune = {};
    }
};
