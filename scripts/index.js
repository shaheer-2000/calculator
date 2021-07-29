import resultScreen from "./result-screen.js";

const buttons = document.querySelectorAll(".btn");

const handleSpecialInput = (value) => {
	switch (value) {
		case "CLR":
			resultScreen.resetScreen();
			break;
		
		case "BACK":
			resultScreen.swapBack();
			break;

		case "DELETE":
			resultScreen.deleteFromScreen();
			break;

		default:
	}
};

const handleOperatorInput = (value) => {
	switch (value) {
		case "+":
		case "-":
		case "*":
		case "/":
		case "%":
			resultScreen.operate(value);
			break;

		default:
	}
};

const handleEvaluateInput = () => {
	resultScreen.evaluate();
};

const handleInput = (type, value) => {
	console.log(type, value);

	switch (type) {
		case "numeric":
			resultScreen.addToScreen(value);
			break;

		case "special":
			handleSpecialInput(value);
			break;

		case "operator":
			handleOperatorInput(value);
			break;

		case "evaluate":
			handleEvaluateInput();
			break;

		default:
	}
};

const handleBtnClick = (e) => {
	let button = e.currentTarget;

	handleInput(button.dataset.type, button.dataset.value);

	button.classList.add("click");
};

const validInputs = ["0123456789+-*/%.=".split(""), "Backspace", "Delete", "Tab"].flat(1);

const handleKeyDown = (e) => {
	e.preventDefault();

	let key = e.key;
	let type = "numeric", value = "0";

	if (!validInputs.includes(key)) return;

	value = key;

	switch (key) {
		case "Backspace":
			type = "special";
			value = "DELETE";
			break;
		case "Delete":
			type = "special";
			value = "CLR";
			break;
		case "Tab":
			type = "special";
			value = "BACK";
			break;
		case "+":
		case "-":
		case "*":
		case "/":
		case "%":
			type = "operator";
			break;
		case "=":
			type = "evaluate";
			break;
		default:
			type = "numeric";
	}

	console.table(key, type, value);
	handleInput(type, value);
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

buttons.forEach((button) => button.addEventListener("click", handleBtnClick, true));
