import state from "./state-manager.js";
import Stack from "./stack.js";

const resultScreen = document.querySelector(".result-screen");
const resultStack = new Stack();
const evalStack = new Stack();

const updateStr = (str) => {
	if (typeof str !== "string") {
		str = str.toString();
	}

	state.updateState(["screen"], {
		"str": str,
		"charCount": str.length,
	});
};

const updateCharCount = (charCount) => {
	state.updateState(["screen", "charCount"], charCount);
};

const getStr = () => {
	return state.getState(["screen", "str"], "0");
}

const getCharCount = () => {
	return state.getState(["screen", "charCount"], 0);
};

const updateScreenStr = () => {
	resultScreen.textContent = getStr();
};

const addToScreen = (number) => {
	const charCount = getCharCount();

	if (charCount <= 0 || (charCount <= 1 && getStr() === "0")) {
		updateStr(`${number}`)
	} else {
		if (number === "." && getStr().includes(".")) {
			return;
		}

		updateStr(`${getStr()}${number}`);
	}

	updateScreenStr();
};

const deleteFromScreen = () => {
	const charCount = getCharCount();

	if (charCount <= 0) {
		return;
	}

	const str = getStr();

	updateStr(str.slice(0, str.length - 1));

	if (getCharCount() <= 0) {
		resetScreen();
		return;
	};

	updateScreenStr();
};

const resetScreen = () => {
	state.updateState(["screen"], {
		str: "0",
		charCount: 0,
	});

	updateScreenStr();
};

const swapBack = () => {
	if (resultStack.peek() === null) {
		resetScreen();
	} else {
		updateStr(resultStack.pop());
	}

	updateScreenStr();
};

const operate = (value) => {
	resultStack.push(getStr());
	evalStack.push(getStr());
	evalStack.push(value);

	resetScreen();
};

const evaluate = () => {
	let res = 0;

	resultStack.push(getStr());
	evalStack.push(getStr());

	let a, operator, b;

	while (!evalStack.isEmpty()) {
		b = parseFloat(evalStack.pop());
		
		if (evalStack.isEmpty()) {
			updateStr(b);
			break;
		}
		
		operator = evalStack.pop();
		a = parseFloat(evalStack.pop());

		if (operator === "+") {
			res += a + b;
		} else if (operator === "-") {
			res += a - b;
		} else if (operator === "*") {
			res += a * b;
		} else if (operator === "%") {
			res += a % b;
		} else if (operator === "/") {
			if (b === 0) {
				resetScreen();
				return;
			}

			res += a / b;
		}
	}

	updateStr(res);
	updateScreenStr();
};

const initState = () => {
	state.updateState(["screen"], {
		str: "0",
		charCount: 0,
	});

	return {
		addToScreen,
		deleteFromScreen,
		resetScreen,
		swapBack,
		operate,
		evaluate,
	};
};

export default initState();
