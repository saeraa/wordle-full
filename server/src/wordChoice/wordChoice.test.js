import { describe, expect, it } from "@jest/globals";
import { toBeOneOf } from "jest-extended";
import wordChoice from "./wordChoice";

expect.extend({ toBeOneOf });

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
