import mongoose from "mongoose";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import apiRouter from "./api.js";
import cors from "cors";
import fetchFromDatabase from "./fetchFromDatabase/fetchFromDatabase.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"));
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(expressLayouts);
app.use(express.json());

mongoose.connect(process.env.MONGODB);

app.use(cors());
app.use("/api", apiRouter);

app.get("/", async (req, res) => {
	res.render("pages/home", {
		title: "Wordle - Welcome",
		page: "home"
	});
});

app.get("/information", async (req, res) => {
	res.render("pages/information", {
		title: "Wordle - Information",
		page: "info"
	});
});

app.get("/highscore", async (req, res) => {
	const options = {
		title: "Wordle - Highscores",
		page: "hs",
		highscores: []
	};

	const letters = req.query?.letters || undefined;
	const unique = req.query?.unique || undefined;

	const result = await fetchFromDatabase(letters, unique);

	options.highscores = result
		.sort((a, b) => {
			const aTime = a.endTime - a.startTime;
			const bTime = b.endTime - b.startTime;
			return aTime - bTime;
		})
		.map((entry) => {
			const time =
				new Date(entry.endTime).getTime() - new Date(entry.startTime).getTime();
			const minutes = Math.floor((time / 1000 / 60) % 60);
			const seconds = Math.floor((time / 1000) % 60);

			return {
				...entry,
				time: `${minutes.toString().padStart(2, "0")}:${seconds
					.toString()
					.padStart(2, "0")}`
			};
		});

	res.render("pages/highscore", options);
});

app.get("/game", async (req, res) => {
	res.render("pages/game", {
		title: "Wordle - Let's play!",
		page: "game"
	});
});

app.use("/", express.static(path.resolve(__dirname, "../static")));

app.get("/*", async (req, res) => {
	res.render("pages/error404", {
		title: "Something went wrong!",
		page: "error"
	});
});

export default app;
