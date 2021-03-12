import FibSequence from './FibSequence';

test('create a new fibonacci sequence', () => {
	const seq = new FibSequence();
	expect(seq).toBeTruthy();
});

test('get some number from the sequence', () => {
	const seq = new FibSequence();
	expect(seq.getNumber(8)).toEqual({ prev: 5, next: 13 });
	expect(seq.getNumber(55)).toEqual({ prev: 34, next: 89 });
	expect(seq.getNumber(21)).toEqual({ prev: 13, next: 34 });
	expect(seq.getNumber(3)).toEqual({ prev: 2, next: 5 });
	expect(seq.getNumber(144)).toEqual({ prev: 89, next: 233 });
});
