/**
 * fibonacci serie with support for random access
 */
class FibSequence {
	constructor() {
		this.fibSeq = [0, 1, 2];
		this.fibs = Object.create(null);
		this.fibs[0] = 0;
		this.fibs[1] = 1;
		// because keys are unique we have to skip the second '1' in the sequence
		this.fibs[2] = 2;
	}

	getNeightboors(n) {
		n = parseInt(n);
		// TODO: if n === NaN

		// extend the cached sequence if necessary
		let prevOfLast = this.fibSeq[this.fibSeq.length - 2];
		while (prevOfLast < n) {
			const last = this.fibSeq[this.fibSeq.length - 1];
			const next = prevOfLast + last;
			this.fibSeq.push(next);
			this.fibs[next] = this.fibSeq.length - 1;
			prevOfLast = this.fibSeq[this.fibSeq.length - 2];
		}

		const index = this.fibs[n];
		if (index !== undefined) {
			return { prev: index !== 0 ? this.fibSeq[index - 1] : null, next: this.fibSeq[index + 1] };
		}
		return null;
	}
}

export default FibSequence;
