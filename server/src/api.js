import express from "express";
import { createNewGame, checkWordGuess, currentGame } from "./currentGame.js";
import * as dotenv from "dotenv";
import Highscore from "./utils/highscore.model.js";

dotenv.config();

const apiRouter = express.Router();

apiRouter.post("/highscore", async (req, res) => {
	
	const hs = new Highscore({
		word: currentGame.word,
		gameId: currentGame.gameId,
		letters: currentGame.letters,
		isUnique: currentGame.isUnique,
		startTime: currentGame.startTime,
		endTime: new Date(),
		guesses: currentGame.guesses,
		name: req.body.name,
		gameWon: true,
		allowedGuesses: 6
	});
	
	try {
		await hs.save();
		res.status(201).send({ hs });
	} catch (err) {
		res.status(500).send(err)
	}
});

apiRouter.post("/guess", (req, res) => {
	const gameId = req.body.gameId;
	const guess = req.body.guess;

	const result = checkWordGuess(gameId, guess);
	res.status(200).json(result);
});

apiRouter.get("/word", (req, res) => {

	const result = createNewGame(+req.query.length, req.query.unique);
	return res.status(200).json(result);
});

export default apiRouter;
