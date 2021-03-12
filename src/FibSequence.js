/**
 * fibonacci serie with support for random access
 */
class FibSequence {
	constructor() {
		this.fibs = Object.create(null);
		this.fibs[0] = { prev: null, next: 1 };
		this.fibs[1] = { prev: 0, next: 2 };
		// because keys are unique we have to skip the second '1' in the sequence
		this.fibs[2] = { prev: 1, next: 3 };
		this.tail = 2;
	}

	getNumber(n) {
		n = parseInt(n);
		// TODO: if n === NaN

		// extend the cached sequence if necessary
		while (this.tail < n) {
			const tailNode = this.fibs[this.tail];
			this.fibs[tailNode.next] = { prev: this.tail, next: this.tail + tailNode.next };
			this.tail = tailNode.next;
		}
		return this.fibs[n];
	}
}

export default FibSequence;
