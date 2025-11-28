export class Typewriter {
    constructor(element, phrases = null, options = {}) {
        this.element = element;
        this.phrases = phrases || [
            "Welcome to my ritual. Are you ready to achieve the Valhalla?",
            "By order of the gods, your blood will feed this sacred fire.",
            "The runes have spoken. Your fate is sealed.",
            "Tonight your soul will thunder in Valhalla.",
            "The fire hungers. Your blood will answer.",
            "The gods demand a sacrifice… and they chose you.",
            "The thunder calls. One must fall.",
            "Valhalla awaits the chosen one.",
            "The runes whisper your name.",
            "The sacred fire burns for you."
        ];
        this.deleteSpeed = options.deleteSpeed || 30;
        this.typeSpeed = options.typeSpeed || 50;
        this.minDelay = options.minDelay || 4000;
        this.maxDelay = options.maxDelay || 6000;
        this.pauseBeforeTyping = options.pauseBeforeTyping || 200;
        
        this.typewriterTimeout = null;
        this.nextChangeTimeout = null;
        this.isTyping = false;
        this.isActive = false;
        this.checkActive = options.checkActive || (() => true);
        this.initialPhraseShown = false;
        this.initialPhrase = this.phrases[0];
    }

    typewriterAnimation(targetText, onComplete) {
        if (!this.element || !this.isActive) return;

        this.isTyping = true;
        const currentText = this.element.textContent || '';
        const isDeleting = currentText.length > 0 && currentText !== targetText;
        
        let currentIndex = isDeleting ? currentText.length : 0;
        const targetLength = targetText.length;
        const speed = isDeleting ? this.deleteSpeed : this.typeSpeed;

        const animate = () => {
            if (!this.isActive || !this.element || !this.checkActive()) {
                this.isTyping = false;
                return;
            }

            if (isDeleting) {
                if (currentIndex > 0) {
                    this.element.textContent = currentText.substring(0, currentIndex - 1);
                    currentIndex--;
                    this.typewriterTimeout = setTimeout(animate, speed);
                } else {
                    currentIndex = 0;
                    this.typewriterTimeout = setTimeout(() => {
                        if (!this.isActive || !this.element || !this.checkActive()) {
                            this.isTyping = false;
                            return;
                        }
                        const type = () => {
                            if (!this.isActive || !this.element || !this.checkActive()) {
                                this.isTyping = false;
                                return;
                            }
                            if (currentIndex < targetLength) {
                                this.element.textContent = targetText.substring(0, currentIndex + 1);
                                currentIndex++;
                                this.typewriterTimeout = setTimeout(type, speed);
                            } else {
                                this.isTyping = false;
                                if (onComplete) onComplete();
                            }
                        };
                        type();
                    }, this.pauseBeforeTyping);
                }
            } else {
                if (currentIndex < targetLength) {
                    this.element.textContent = targetText.substring(0, currentIndex + 1);
                    currentIndex++;
                    this.typewriterTimeout = setTimeout(animate, speed);
                } else {
                    this.isTyping = false;
                    if (onComplete) onComplete();
                }
            }
        };

        animate();
    }

    changeTextRandomly() {
        if (!this.element || !this.isActive || !this.checkActive()) return;

        const currentText = this.element.textContent || '';
        let availablePhrases = this.phrases.filter(p => {
            if (p === currentText) return false;
            if (this.initialPhraseShown && p === this.initialPhrase) return false;
            return true;
        });
        
        if (availablePhrases.length === 0) {
            availablePhrases = this.phrases.filter(p => p !== this.initialPhrase);
            if (availablePhrases.length === 0) {
                availablePhrases = this.phrases;
            }
        }

        const randomIndex = Math.floor(Math.random() * availablePhrases.length);
        const newText = availablePhrases[randomIndex];

        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
            this.typewriterTimeout = null;
        }

        this.typewriterAnimation(newText, () => {
            this.scheduleNextChange();
        });
    }

    scheduleNextChange() {
        if (!this.isActive || !this.checkActive()) return;

        const delay = this.minDelay + Math.random() * (this.maxDelay - this.minDelay);
        
        this.nextChangeTimeout = setTimeout(() => {
            if (this.isActive && this.checkActive() && !this.isTyping) {
                this.changeTextRandomly();
            }
        }, delay);
    }

    start(initialText = null) {
        if (this.isActive) return;
        this.isActive = true;

        if (this.element) {
            const text = initialText || this.initialPhrase;
            this.initialPhraseShown = true;
            this.typewriterAnimation(text, () => {
                this.scheduleNextChange();
            });
        }
    }

    stop() {
        this.isActive = false;
        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
            this.typewriterTimeout = null;
        }
        if (this.nextChangeTimeout) {
            clearTimeout(this.nextChangeTimeout);
            this.nextChangeTimeout = null;
        }
        this.isTyping = false;
    }

    reset() {
        this.stop();
        this.initialPhraseShown = false;
    }
}

