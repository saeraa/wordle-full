import express from "express";
import expressLayouts from "express-ejs-layouts";
import apiRouter from "./api.js";
import cors from "cors";

const app = express();

app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(expressLayouts);
app.use(express.json());

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
	res.render("pages/highscore", {
		title: "Wordle - Highscores",
		page: "hs"
	});
});

app.get("/game", async (req, res) => {
	res.render("pages/game", {
		title: "Wordle - Let's play!",
		page: "game"
	});
});

app.use("/", express.static("./static"));

app.get("/*", async (req, res) => {
	res.render("pages/error404", {
		title: "Something went wrong!",
		page: "error"
	});
});

export default app;

// app.use(express.static('client/build'));
// const path = require('path');

// app.get('*', (req, res) => {
//   res.sendFile(path
//     .resolve(__dirname, 'client', 'build', 'index.html'));
// });

// //app.use("/", express.static("./static"));

// app.get("*", async (req, res) => {
//   res.status(200).json("hi")
// })

// app.listen(PORT);
