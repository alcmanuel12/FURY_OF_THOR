import { runes, brokenRunes } from "../../src/core/runes.js";

describe("runes data", () => {
    
    test("runes es un array", () => {
        expect(Array.isArray(runes)).toBe(true);
    });

    test("runes tiene 16 elementos", () => {
        expect(runes.length).toBe(16);
    });

    test("cada runa tiene id y url", () => {
        for (const rune of runes) {
            expect(rune).toHaveProperty("id");
            expect(rune).toHaveProperty("url");
            expect(typeof rune.url).toBe("string");
        }
    });
});

describe("brokenRunes data", () => {
    
    test("brokenRunes es un array", () => {
        expect(Array.isArray(brokenRunes)).toBe(true);
    });

    test("brokenRunes tiene 16 elementos", () => {
        expect(brokenRunes.length).toBe(16);
    });

    test("cada runa rota tiene id y url", () => {
        for (const rune of brokenRunes) {
            expect(rune).toHaveProperty("id");
            expect(rune).toHaveProperty("url");
        }
    });
});
