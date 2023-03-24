import express from "express";
import { createNewGame, checkWordGuess } from "./currentGame.js";

const apiRouter = express.Router();

apiRouter.get("/game", (req, res) => {
	//blah blah
	res.send(200).json("hi!");
});

apiRouter.post("/highscore", (req, res) => {
	// console.log(req.body)
	console.log(req.body)
	res.status(201).json("ok");
});

apiRouter.get("/highscore", (req, res) => {
	// console.log(req.query.length)
	// console.log(req.query.unique)

	res.send(200).json("ok");
});

apiRouter.post("/guess", (req, res) => {
	const gameId = req.body.gameId;
	const guess = req.body.guess;
  //console.log(req)
 // console.log("body ", req.body)
	const result = checkWordGuess(gameId, guess);
	res.status(200).json(result);
});

apiRouter.get("/word", (req, res) => {
	console.log("req query length ", req.query.length);
	console.log("req query unique ", req.query.unique);
	const result = createNewGame(+req.query.length, req.query.unique);
	return res.status(200).json(result);
});

export default apiRouter;
