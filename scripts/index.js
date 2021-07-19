import resultScreen from "./result-screen.js";
import stateManager from "./state-manager.js";

const buttons = document.querySelectorAll(".btn");

const handleBtnClick = (e) => {
	let button = e.target;

	resultScreen.addToScreen(button.dataset.value);

	button.classList.add("click");
};

const validInputs = ["0123456789+-*/%.=".split(""), "Backspace", "Delete", "Tab"].flat(1);

const handleKeyDown = (e) => {
	let key = e.key;

	if (validInputs.includes(key)) {
		if (key === "Backspace") {
			resultScreen.deleteFromScreen();
		} else {
			resultScreen.addToScreen(key);
		}
	}

	console.log(key);
};

/**
 * 48-57 => 0-1
 * + => 43
 * - => 45
 * = => 61
 * / => 47
 * * => 42
 * backspace => 8
 * delete => 46 
 * tab => 9
 */

document.addEventListener("keydown", handleKeyDown);

buttons.forEach((button) => button.addEventListener("click", handleBtnClick));
