
jest.mock("../../src/ui/alert-popup.js", () => ({
    alertPopup: {
        alert: jest.fn(() => Promise.resolve()),
        confirm: jest.fn(() => Promise.resolve(true))
    }
}));
