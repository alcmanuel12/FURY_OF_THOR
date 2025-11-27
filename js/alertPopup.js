class AlertPopup {
    constructor() {
        this.popup = document.getElementById('alert-popup');
        this.messageEl = document.querySelector('.alert-message');
        this.acceptBtn = document.getElementById('alert-accept-btn');
        this.cancelBtn = document.getElementById('alert-cancel-btn');
        this.resolvePromise = null;
        this.init();
    }

    init() {
        if (!this.popup || !this.messageEl || !this.acceptBtn) {
            console.error('AlertPopup: Required elements not found');
            return;
        }

        this.acceptBtn.addEventListener('click', () => {
            this.hide();
            if (this.resolvePromise) {
                this.resolvePromise(true);
                this.resolvePromise = null;
            }
        });

        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => {
                this.hide();
                if (this.resolvePromise) {
                    this.resolvePromise(false);
                    this.resolvePromise = null;
                }
            });
        }

        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
            }
        });
    }

    show(message, showCancel = false, acceptText = 'OK', cancelText = 'Cancel', isHTML = false, extraClass = '') {
        if (!this.popup || !this.messageEl) {
            return Promise.resolve();
        }

        if (isHTML) {
            this.messageEl.innerHTML = message;
        } else {
            this.messageEl.textContent = message;
        }

        if (this.acceptBtn) {
            this.acceptBtn.textContent = acceptText;
        }

        if (this.cancelBtn) {
            this.cancelBtn.textContent = cancelText;
            if (showCancel) {
                this.cancelBtn.classList.remove('hidden');
            } else {
                this.cancelBtn.classList.add('hidden');
            }
        }

        if (extraClass) {
            this.popup.classList.add(extraClass);
        }

        this.popup.classList.remove('hidden');

        return new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
    }

    hide() {
        if (this.popup) {
            this.popup.classList.add('hidden');
            this.popup.classList.remove('winner-alert');
        }
    }

    alert(message) {
        return this.show(message, false);
    }

    confirm(message) {
        return this.show(message, true);
    }
}

export const alertPopup = new AlertPopup();

