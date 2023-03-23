import { describe, expect, it } from "@jest/globals";
import guessWord from "./guessWord";

/* 

TESTSTRATEGI:

* Vilken testtyp ska vi använda? (e2e, integration, enhet etc)
Enhetstest är det enda som verkar vettigt här, då det är en enskild funktion som ska testas.

* Hur ska vi isolera, d.v.s. vad testas och vad mockas bort?
Eftersom funktionen inte har några beroenden behöver inget mockas. Bara funktionen ska testas.

* Vilka tester krävs för att täcka hela **definitionen**?
 - Testa att identiska ord returnerar "correct" överallt
 - Testa ord med bokstäverna på fel ställe för att se att den returnerar "misplaced"
 - Testa med ord med dubbla bokstäver där bara ett finns i det rätta ordet för att se att funktionen svarar korrekt

 Vi skulle även kunna testa att man får ett felmeddelande om:
  - Man bara skickar in ett ord
  - Ett av orden innehåller specialtecken och/eller mellanslag
  - Orden har olika längder
  - Någon av strängarna är tomma

*/

describe("the function guessWord()", () => {
	it("returns the correct result for double letters where one is in the right place", () => {
		const result = guessWord("hallå", "cykla");
		const expected = [
			{ letter: "h", result: "incorrect" },
			{ letter: "a", result: "misplaced" },
			{ letter: "l", result: "incorrect" },
			{ letter: "l", result: "correct" },
			{ letter: "å", result: "incorrect" }
		];
		expect(result).toStrictEqual(expected);
	});

	it("returns all 'correct' for a correct guess", () => {
		const result = guessWord("hallå", "hallå");
		const expected = [
			{ letter: "h", result: "correct" },
			{ letter: "a", result: "correct" },
			{ letter: "l", result: "correct" },
			{ letter: "l", result: "correct" },
			{ letter: "å", result: "correct" }
		];
		expect(result).toStrictEqual(expected);
	});

	it("returns 'misplaced' correctly", () => {
		const result = guessWord("artens", "rasten");
		const expected = [
			{ letter: "a", result: "misplaced" },
			{ letter: "r", result: "misplaced" },
			{ letter: "t", result: "misplaced" },
			{ letter: "e", result: "misplaced" },
			{ letter: "n", result: "misplaced" },
			{ letter: "s", result: "misplaced" }
		];
		expect(result).toStrictEqual(expected);
	});

	it("works with any case", () => {
		const result = guessWord("aaAAA", "AAaaa");
		const expected = [
			{ letter: "a", result: "correct" },
			{ letter: "a", result: "correct" },
			{ letter: "a", result: "correct" },
			{ letter: "a", result: "correct" },
			{ letter: "a", result: "correct" }
		];
		expect(result).toStrictEqual(expected);
	});

	it("does not allow spaces or special characters", () => {
		const result = guessWord("%&$%!", "hallå");
		expect(result).toStrictEqual([{ error: "Incorrect input." }]);
	});

	it("only allows words of the same length", () => {
		const result = guessWord("cykelhjul", "hallå");
		expect(result).toStrictEqual([
			{ error: "The word length does not match." }
		]);
	});

	it("works with non-latin alphabets", () => {
		const result = guessWord("йейтс", "йосеф");
		const expected = [
			{ letter: "й", result: "correct" },
			{ letter: "е", result: "misplaced" },
			{ letter: "й", result: "incorrect" },
			{ letter: "т", result: "incorrect" },
			{ letter: "с", result: "misplaced" }
		];
		expect(result).toStrictEqual(expected);
	});
});
