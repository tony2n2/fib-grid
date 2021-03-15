/**
 * fibonacci serie with support for random access
 */
const fibSeq = [1, 1, 2];
const fibs = Object.create(null);
// because keys are unique we have to skip the '1' in the sequence
fibs[1] = 2;
fibs[2] = 3;

function _generateFib() {
	const next = fibSeq[fibSeq.length - 2] + fibSeq[fibSeq.length - 1];
	fibSeq.push(next);
	fibs[next] = fibSeq.length - 1;
}

export const getFibNeighbors = (n, length = 5) => {
	n = parseInt(n);

	// extend the cached sequence if necessary
	while (fibSeq[fibSeq.length - 1] < n) {
		_generateFib();
	}

	const index = fibs[n];
	if (index === undefined) return null;

	// extend the cached sequence if necessary
	const fromIndex = Math.max(0, index - length + 1);
	const toIndex = index + length;
	while (fibSeq.length < toIndex) {
		_generateFib();
	}

	return fibSeq.slice(fromIndex, toIndex);
};
