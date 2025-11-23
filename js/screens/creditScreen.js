import { soundManager } from '../soundManager.js';

export function initCreditScreen() {
    const creditScreen = document.getElementById("credit-screen");
    const homeScreen = document.getElementById("home-screen");

    const btnHome = document.querySelector(".btn.home");
    const btnSettings = document.querySelector(".btn.settings");

    
    if (btnHome) {
        btnHome.addEventListener("click", () => {
            creditScreen.style.display = "none";
            homeScreen.style.display = "flex";

            soundManager.stop("ingame");
            soundManager.play("forest");
        });
    }

    
    if (btnSettings) {
        btnSettings.addEventListener("click", () => {
            alert(" Settings aún no implementado bro, pero puedo hacerlo si quieres.");
        });
    }
}
