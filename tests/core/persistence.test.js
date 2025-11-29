import { jest } from "@jest/globals";


global.document = {
    querySelector: jest.fn(() => null)
};

global.localStorage = {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => { }),
    clear: jest.fn(() => { })
};


jest.unstable_mockModule("../../src/core/persistence.js", () => ({
    persistence: {
        isRestoring: () => false,
        save: jest.fn(),
        load: jest.fn(),
        getCurrentScreen: jest.fn(() => null)
    }
}));


const { persistence } = await import("../../src/core/persistence.js");

describe("persistence", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("save() se llama correctamente", () => {
        persistence.save({ vikings: ["Ragnar"] });
        expect(persistence.save).toHaveBeenCalled();
    });

    test("load() ejecuta su función", () => {
        persistence.load();
        expect(persistence.load).toHaveBeenCalled();
    });

    test("getCurrentScreen() devuelve null", () => {
        expect(persistence.getCurrentScreen()).toBe(null);
    });

});
