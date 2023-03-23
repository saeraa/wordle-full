import { describe, expect, it } from "@jest/globals";
import { toBeOneOf } from "jest-extended";
import wordChoice from "./wordChoice";

expect.extend({ toBeOneOf });

/* 

TESTSTRATEGI:

* Vilken testtyp ska vi använda? (e2e, integration, enhet etc)
Precis som med guessWord.test.js: Enhetstest är det enda som verkar vettigt här, då det är en enskild funktion som ska testas.

* Hur ska vi isolera, d.v.s. vad testas och vad mockas bort?
Precis som med guessWord.test.js: Eftersom funktionen inte har några beroenden behöver inget mockas. Bara funktionen ska testas.

* Vilka tester krävs för att täcka hela **definitionen**?
 - Testa med lista med ord av olika längder för att se om längd-parametern fungerar 
 - Testa med lista med ord med dubbla bokstäver när det ej är tillåtet
 - Testa att vi får rätt meddelande när inget lämpligt ord finns

 Kan även vara lämpligt att:
 - Testa med ord som innehåller specialtecken eller mellanslag
 - Testa med ord med versaler på olika ställen

*/

describe("the function wordChoice()", () => {
	it("does not allow for non-unique letters if indicated", () => {
		const result = wordChoice(["hej", "haj", "heh"], 3, true);
		expect(result).toBeOneOf(["hej", "haj"]);
	});

	it("only allows words of the specified length", () => {
		const result = wordChoice(
			["hej", "haj", "heh", "hallå", "hejsan"],
			3,
			true
		);
		expect(result).toBeOneOf(["hej", "haj"]);
	});

	it("matches both word length and non-unique requirements", () => {
		const result = wordChoice(["åtta", "fyra", "femtio"], 4, true);
		expect(result).toBe("fyra");
	});

	it("does allow for non-unique letters if indicated", () => {
		const result = wordChoice(["heh"], 3, false);
		expect(result).toBe("heh");
	});

	it("returns error when no appropriate word found", () => {
		const result = wordChoice(["hej", "haj", "heh"], 4, true);
		expect(result).toBe("error, no matching word");
	});

	it("does not allow words with special characters", () => {
		const result = wordChoice(["h%%?", "h34!"], 4, true);
		expect(result).toBe("error, no matching word");
	});
});
