const state = {};

const getState = (keys, defaultVal) => {
	let psuedoState = state;

	for (const key of keys) {
		if (!(key in psuedoState)) {
			return defaultVal;
		}

		psuedoState = psuedoState[key];
	}

	return psuedoState;
};

const updateState = (keys, value) => {
	let psuedoState = state;
	let key = null;

	for (let i = 0, len = keys.length; i < len; i++) {
		key = keys[i];

		if (i === (len - 1)) {
			psuedoState[key] = value;
		} else if (!(key in psuedoState)) {
			psuedoState[key] = {};
		}

		psuedoState = psuedoState[key];
	}
};

export default {
	getState,
	updateState,
};
