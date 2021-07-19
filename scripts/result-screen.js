import state from "./state-manager.js";

const resultScreen = document.querySelector(".result-screen");

const initState = () => {
	state.updateState(["screen"], {
		str: "0",
		charCount: 0,
	});

	return {
		addToScreen,
		deleteFromScreen,
	};
};

const updateStr = (str) => {
	state.updateState(["screen", "str"], str);
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

	if (charCount <= 0) {
		updateStr(`${number}`)
	} else {
		updateStr(`${getStr()}${number}`);
	}

	updateCharCount(charCount + 1);
	updateScreenStr();
};

const deleteFromScreen = () => {
	const charCount = getCharCount();

	if (charCount <= 0) {
		return;
	}

	const str = getStr();

	updateStr(str.slice(str.length - 1));
	updateCharCount(charCount - 1);

	updateScreenStr();
};

export default initState();
