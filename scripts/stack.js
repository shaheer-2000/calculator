class Stack {
	constructor() {
		this.data = [];
		this.MAX_BOUND = 20;
		this.MIN_BOUND = 0;
		this.len = 0;
	}

	push(key) {
		if (this.len >= this.MAX_BOUND) {
			return;
		}

		this.data.push(key);
		this.len++;
	}

	pop() {
		if (this.len <= this.MIN_BOUND) {
			return;
		}

		this.len--;
		return this.data.pop();
	}

	peek() {
		if(this.len <= this.MIN_BOUND) {
			return null;
		}

		return this.data.slice(-1).pop();
	}

	isEmpty() {
		return !this.len;
	}
};

export default Stack;
