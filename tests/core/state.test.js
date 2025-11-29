
import { jest } from "@jest/globals";


jest.unstable_mockModule("../../src/core/persistence.js", () => ({
    persistence: {
        isRestoring: () => false,
        save: () => {},
        load: () => {},
        getCurrentScreen: () => null
    }
}));


import { state } from "../../src/core/state.js";

describe("state object", () => {

    beforeEach(() => {
        state.setVikings([]);
        state.resetAvailableRunes();
        state.clearRuneElements();
        state.clearVikingToRune();
    });

    test("setVikings() establece la lista", () => {
        state.setVikings(["Ragnar", "Loki"]);
        expect(state.getVikings()).toEqual(["Ragnar", "Loki"]);
    });

    test("addViking() agrega un vikingo", () => {
        state.addViking("Floki");
        expect(state.getVikings()).toEqual(["Floki"]);
    });

    test("removeViking() elimina por índice", () => {
        state.setVikings(["Ragnar", "Loki"]);
        state.removeViking(0);
        expect(state.getVikings()).toEqual(["Loki"]);
    });

    test("clearVikings() limpia la lista", () => {
        state.setVikings(["A", "B"]);
        state.clearVikings();
        expect(state.getVikings()).toEqual([]);
    });

    test("setVikingToRune() guarda asignaciones", () => {
        const mapping = { Ragnar: "ᚠ" };
        state.setVikingToRune(mapping);
        expect(state.getVikingToRune()).toEqual(mapping);
    });
});
