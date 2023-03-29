import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
	word: String,
	gameId: String,
	letters: Number,
	isUnique: Boolean,
	startTime: Date,
	endTime: Date,
	guesses: Array,
	name: String,
	gameWon: Boolean,
	allowedGuesses: Number
});

const Highscore = mongoose.model("highscore", highscoreSchema);

export default Highscore;
