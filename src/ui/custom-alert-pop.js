export default class CustomAlertPop {
    constructor({ title = '', content = '', parent = document.body, onFirstButtonClick = null, onSecondButtonClick = null }) {
        this.title = title;
        this.content = content;
        this.parent = parent;
        this.onFirstButtonClick = onFirstButtonClick;
        this.onSecondButtonClick = onSecondButtonClick;
        this.popupEl = this._createPopup();
    }

    _createPopup() {
        const popup = document.createElement('div');
        popup.className = 'custom-alert-pop hidden';

        popup.innerHTML = `
            <h2>${this.title}</h2>
            <div class="content">${this.content}</div>
            <div class="buttons">
                <button class="btn1"></button>
                <button class="btn2"></button>
            </div>
        `;

        this.parent.appendChild(popup);

        const btn1 = popup.querySelector('.btn1');
        const btn2 = popup.querySelector('.btn2');

        btn1.onclick = () => {
            if (typeof this.onFirstButtonClick === 'function') {
                this.onFirstButtonClick();
            }
            this.close();
        };

        btn2.onclick = () => {
            if (typeof this.onSecondButtonClick === 'function') {
                this.onSecondButtonClick();
            }
            this.close();
        };

        return popup;
    }

    open() {
        this.popupEl.classList.remove('hidden');
    }

    close() {
        this.popupEl.classList.add('hidden');
    }

    setContent({ title, content }) {
        if (title !== undefined) {
            this.popupEl.querySelector('h2').textContent = title;
        }
        if (content !== undefined) {
            this.popupEl.querySelector('.content').innerHTML = content;
        }
    }

    destroy() {
        this.popupEl.remove();
    }
}

