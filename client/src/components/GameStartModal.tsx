import IconClose from "../assets/icon-close.svg";
import IconMinus from "../assets/icon-minus.svg";
import IconPlus from "../assets/icon-plus.svg";
import { useContext, useRef, useEffect } from "react";
import { GameContext } from "../context/gameContext";

const GameModal = () => {
	const backdrop = useRef(null);
	const {
		setShowStartModal,
		setIsUnique,
		setNumLetters,
		numLetters,
		startGame
	} = useContext(GameContext);

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;

		if (checked) {
			setIsUnique(true);
		} else {
			setIsUnique(false);
		}
	};

	const handleNumOfLetters = (value: string) => {
		if (value === "minus") {
			if (numLetters > 4) {
				const newNumber = numLetters - 1;
				setNumLetters(newNumber);
			}
		} else {
			if (numLetters < 10) {
				const newNumber = numLetters + 1;
				setNumLetters(newNumber);
			}
		}
	};

	useEffect(() => {
		const { current } = backdrop;
		const keyHandler = (e: KeyboardEvent) =>
			e.key === "Escape" && setShowStartModal(false);
		const clickHandler = (e: MouseEvent) =>
			e.target === current && setShowStartModal(false);

		if (current) {
			current.addEventListener("click", clickHandler);
			window.addEventListener("keyup", keyHandler);
		}

		return () => {
			if (current) {
				current.removeEventListener("click", clickHandler);
			}
			window.removeEventListener("keyup", keyHandler);
		};
	});

	return (
		<div
			ref={backdrop}
			className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40"
		>
			<div className="modal fixed top m-auto w-full max-w-xs bg-neutral-800 p-4 sm:p-10 rounded-md">
				<div className="relative text-neutral-200 flex flex-col gap-4">
					<h2 className="text-purple-200 my-2 text-xl font-semibold">
						Start a new game
					</h2>

					<div className="flex gap-2 text-md items-center">
						Letters:
						<span className="flex">
							<img
								src={IconMinus}
								onClick={() => handleNumOfLetters("minus")}
								alt=""
								className="w-4 mr-1 cursor-pointer"
							/>
							<span className="text-lg">{numLetters}</span>
							<img
								src={IconPlus}
								onClick={() => handleNumOfLetters("plus")}
								alt=""
								className="w-4 ml-1 cursor-pointer"
							/>
						</span>
					</div>

					<div className="flex gap-2">
						<input
							type="checkbox"
							name="unique"
							id="unique"
							onChange={handleCheckbox}
						/>
						<label htmlFor="unique" className="text-md">
							Only unique letters?
						</label>
					</div>

					<button className="primary mt-5" onClick={startGame}>
						Let's go!
					</button>
				</div>
				<button
					onClick={() => setShowStartModal(false)}
					className="absolute top-2 right-2"
				>
					<img src={IconClose} alt="" />
				</button>
			</div>
		</div>
	);
};

export default GameModal;
