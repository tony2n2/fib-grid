import { getFibNeighbors } from './FibSequence';

test('get some neighbors from the sequence', () => {
	expect(getFibNeighbors(8)).toEqual([1, 2, 3, 5, 8, 13, 21, 34, 55]);
	expect(getFibNeighbors(8, 3)).toEqual([3, 5, 8, 13, 21]);
	expect(getFibNeighbors(1)).toEqual([1, 1, 2, 3, 5, 8, 13]);
	expect(getFibNeighbors(0)).toEqual(null);
	expect(getFibNeighbors(4)).toEqual(null);
});
