import IconClose from "../assets/icon-close.svg";
import IconStar from "../assets/icon-star.svg";
import { useContext, FormEvent, ChangeEvent, useState, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import axios, { AxiosRequestConfig } from "axios";
import Confetti from "./Confetti";

type GameModalProps = {
	onClose: () => void;
};

const GameModal = ({ onClose }: GameModalProps) => {
	const [input, setInput] = useState("");
	const [formSent, setFormSent] = useState(false);
	const { correctWord, prevGuesses, gameId, resetGame, gameWon } = useContext(GameContext);

	const options = {
		method: "post",
		url: `http://localhost:5080/api/highscore`,
		headers: {
			accept: "Application/json",
			"Content-Type": "application/json"
		},
		data: {
			name: input,
			gameId: gameId
		}
	};

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const submitDataToHighscore = async (params: AxiosRequestConfig) => {
			try {
				const response = await axios.request(params);
				if (response.status === 200) {
					onClose();
				}
				setFormSent(true);
			} catch (err: unknown) {
				console.log(err);
			} finally {
				console.log("finally!");
			}
		};

		submitDataToHighscore(options);
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
		const input = e.target.value;
		setInput(input);
	}

	return (
		<div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-20">
			<Confetti />
			<div className="modal fixed top m-auto w-full max-w-md bg-neutral-800 p-4 sm:p-10 rounded-md">
				<div className="text-neutral-200 flex flex-col gap-4">
					<h2 className="text-purple-200 my-2 text-xl font-semibold flex items-center">
						<img src={IconStar} alt="" className="w-8 inline-block mr-2" />
						<span>You won!</span>
						<img src={IconStar} alt="" className="w-8 inline-block ml-2" />
					</h2>

					<div className="flex gap-2 text-md items-center">
						The word was: <span className="text-purple-200 font-bold">{correctWord}</span> and you guessed it in{" "}
						{prevGuesses.length} tries!
					</div>

					{!formSent ? (
						<form className="m-4 flex flex-col text-sm" onSubmit={handleSubmit}>
							<h2 className="text-neutral-300 py-2">Add to highscore?</h2>
							<span className="w-full">
								<input
									className="rounded-l-lg p-2 w-2/3 border-t mr-0 border-b border-l text-neutral-200 border-neutral-400 bg-neutral-700"
									placeholder="Your name"
									onChange={handleInputChange}
									value={input}
									
								/>
								<button className="px-6  w-1/3  rounded-r-lg bg-neutral-600  text-neutral-200 font-bold p-2 border-neutral-400 border-t border-b border-r hover:bg-neutral-700 transition-colors duration-200">
									Submit
								</button>
							</span>
						</form>
					) : (
						<div>
							<h2> Thank you for submitting your highscore! </h2>
							<p>
								<a
									href="/highscore"
									className="hover:text-purple-400
					transition-colors duration-200 text-purple-300"
								>
									View the highscore list?
								</a>
							</p>
						</div>
					)}

					<button className="primary mt-5 mx-auto px-8" onClick={resetGame}>
						Start a new game
					</button>
				</div>
				<button onClick={onClose} className="absolute top-2 right-2">
					<img src={IconClose} alt="" />
				</button>
			</div>
		</div>
	);
};

export default GameModal;
