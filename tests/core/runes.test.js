import { runes, brokenRunes } from "../../src/core/runes.js";

describe("runes.js", () => {

    test("runes es un array con 16 elementos", () => {
        expect(Array.isArray(runes)).toBe(true);
        expect(runes.length).toBe(16);
    });

    test("cada runa tiene id y url", () => {
        for (const r of runes) {
            expect(r).toHaveProperty("id");
            expect(r).toHaveProperty("url");
            expect(typeof r.id).toBe("number");
            expect(typeof r.url).toBe("string");
        }
    });

    test("brokenRunes es un array con 16 elementos", () => {
        expect(Array.isArray(brokenRunes)).toBe(true);
        expect(brokenRunes.length).toBe(16);
    });

    test("cada brokenRuna tiene id y url", () => {
        for (const br of brokenRunes) {
            expect(br).toHaveProperty("id");
            expect(br).toHaveProperty("url");
            expect(typeof br.id).toBe("number");
            expect(typeof br.url).toBe("string");
        }
    });

    test("IDs de runes y brokenRunes coinciden 1 a 1", () => {
        const rIds = runes.map(r => r.id).sort();
        const brIds = brokenRunes.map(b => b.id).sort();
        expect(rIds).toEqual(brIds);
    });

});
