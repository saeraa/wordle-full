import IconTimer from "../assets/icon-timer.svg";
import { GameContext } from "../context/gameContext";
import { useContext, useState, useEffect } from "react";

const GameTimer = () => {
	const { startTime, gameOn } = useContext(GameContext);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const getTime = () => {
		const time = Date.now().valueOf() - startTime.valueOf();

		// hoping it won't take hours but who knows
		setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
		setMinutes(Math.floor((time / 1000 / 60) % 60));
		setSeconds(Math.floor((time / 1000) % 60));
	};

	let timer = 0;

	useEffect(() => {
		// let's not start the timer if the game isn't on
		if (!gameOn) {
			return () => clearInterval(timer);
		}
		if (gameOn) timer = setInterval(getTime, 1000);
		return () => clearInterval(timer);
	}, [gameOn]);

	return (
		<div className="flex p-2 text-black font-semibold">
			<img
				src={IconTimer}
				alt=""
				className="color-red-200 mr-1"
				onClick={getTime}
			/>
			<span>
				{hours > 0 && hours + ":"} {minutes}:
				{`${seconds.toString().padStart(2, "0")}`}
			</span>
		</div>
	);
};

export default GameTimer;
