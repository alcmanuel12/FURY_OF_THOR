import { state } from './state.js';
import { brokenRunes, runes } from './runes.js';

const STORAGE_KEY = 'fury-of-thor-game-state';
let isRestoring = false;

export const persistence = {
    setIsRestoring(value) {
        isRestoring = value;
    },

    isRestoring() {
        return isRestoring;
    },

    save() {
        if (isRestoring) return;
        
        try {
            const brokenRunesList = this.getBrokenRunes();
            const activeVikings = state.getVikings();
            const brokenVikingNames = new Set(brokenRunesList.map(br => br.vikingName));
            const allVikings = [...activeVikings];
            
            brokenRunesList.forEach(br => {
                if (!allVikings.includes(br.vikingName)) {
                    allVikings.push(br.vikingName);
                }
            });
            
            const runeElements = state.getRuneElements();
            const fullVikingToRune = { ...state.getVikingToRune() };
            
            runeElements.forEach(rune => {
                const vikingName = rune.dataset.vikingName;
                if (vikingName && !fullVikingToRune[vikingName]) {
                    const runeId = parseInt(rune.dataset.runeId, 10);
                    if (!isNaN(runeId)) {
                        const runeObj = runes.find(r => r.id === runeId);
                        if (runeObj) {
                            fullVikingToRune[vikingName] = runeObj;
                        }
                    }
                }
            });
            
            const gameState = {
                currentScreen: this.getCurrentScreen(),
                vikings: activeVikings,
                allVikings: allVikings,
                vikingToRune: fullVikingToRune,
                brokenRunes: brokenRunesList,
                currentSound: this.getCurrentSound(),
                isMuted: this.getMuteState(),
                soundAlertShown: this.getSoundAlertShown(),
                gameEnded: this.getGameEnded(),
                winnerName: this.getWinnerName(),
                timestamp: Date.now()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    },

    load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return null;
            return JSON.parse(saved);
        } catch (error) {
            console.error('Error loading game state:', error);
            return null;
        }
    },

    clear() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing game state:', error);
        }
    },

    getCurrentScreen() {
        const screens = ['home-screen', 'player-selection-screen', 'ingame-screen', 'credit-screen'];
        for (const screenId of screens) {
            const screen = document.getElementById(screenId);
            if (screen && screen.style.display !== 'none' && !screen.classList.contains('hidden')) {
                return screenId;
            }
        }
        return 'home-screen';
    },

    getBrokenRunes() {
        const runeElements = state.getRuneElements();
        const broken = [];
        runeElements.forEach(rune => {
            if (rune.classList.contains('broken')) {
                broken.push({
                    vikingName: rune.dataset.vikingName,
                    runeId: parseInt(rune.dataset.runeId, 10)
                });
            }
        });
        return broken;
    },

    getCurrentSound() {
        const currentSound = window._currentSound || null;
        if (!currentSound) return null;
        
        if (currentSound === 'forest' || currentSound === 'ingame') {
            return currentSound;
        }
        return null;
    },

    getMuteState() {
        return window._isMuted !== undefined ? window._isMuted : false;
    },

    getSoundAlertShown() {
        return window._soundAlertShown === true;
    },

    setSoundAlertShown(value) {
        window._soundAlertShown = value;
    },

    getGameEnded() {
        return window._gameEnded === true;
    },

    setGameEnded(value) {
        window._gameEnded = value;
    },

    getWinnerName() {
        return window._winnerName || null;
    },

    setWinnerName(name) {
        window._winnerName = name;
    },

    restoreScreen(screenId) {
        const screens = ['home-screen', 'player-selection-screen', 'ingame-screen', 'credit-screen'];
        screens.forEach(id => {
            const screen = document.getElementById(id);
            if (screen) {
                if (id === screenId) {
                    screen.style.display = 'flex';
                    screen.classList.remove('hidden');
                } else {
                    screen.style.display = 'none';
                }
            }
        });
    },

    restoreBrokenRunes(brokenRunesList) {
        if (!brokenRunesList || brokenRunesList.length === 0) return;
        
        const runeElements = state.getRuneElements();
        brokenRunesList.forEach(broken => {
            const runeElement = runeElements.find(r => 
                r.dataset.vikingName === broken.vikingName && 
                parseInt(r.dataset.runeId, 10) === broken.runeId
            );
            if (runeElement) {
                const brokenRune = brokenRunes.find(r => r.id === broken.runeId);
                if (brokenRune) {
                    runeElement.style.backgroundImage = `url(${brokenRune.url})`;
                    runeElement.classList.add('broken');
                }
            }
        });
    },

    restoreAllRunes(allVikings, vikingToRune, brokenRunesList) {
        const runesCircleContainer = document.getElementById('runesCircleContainer');
        if (!runesCircleContainer) return;

        runesCircleContainer.innerHTML = '';
        state.clearRuneElements();
        
        const total = allVikings.length;
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
        const brokenVikingNames = new Set((brokenRunesList || []).map(br => br.vikingName));

        allVikings.forEach((name, index) => {
            const angle = (index * (2 * Math.PI)) / total - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            const rune = vikingToRune[name];
            if (!rune) return;

            const runeDiv = document.createElement('div');
            runeDiv.classList.add('rune-item');
            runeDiv.dataset.vikingName = name;
            runeDiv.dataset.runeId = rune.id;

            if (brokenVikingNames.has(name)) {
                const brokenRune = brokenRunes.find(r => r.id === rune.id);
                if (brokenRune) {
                    runeDiv.style.backgroundImage = `url(${brokenRune.url})`;
                    runeDiv.classList.add('broken');
                } else {
                    runeDiv.style.backgroundImage = `url(${rune.url})`;
                }
            } else {
                runeDiv.style.backgroundImage = `url(${rune.url})`;
            }

            runeDiv.style.width = `${runeSize}px`;
            runeDiv.style.height = `${runeSize}px`;
            runeDiv.style.left = `${x - runeOffset}px`;
            runeDiv.style.top = `${y - runeOffset}px`;

            runesCircleContainer.appendChild(runeDiv);
            runeElements.push(runeDiv);
        });

        state.setRuneElements(runeElements);
        
        runesCircleContainer.classList.remove('visible');
        setTimeout(() => {
            runesCircleContainer.classList.add('visible');
        }, 100);
    }
};

