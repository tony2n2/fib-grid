import FibGrid from './FibGrid';
import * as utils from './utils';

test('create a new grid', () => {
	let grid = new FibGrid();
	expect(grid).toBeTruthy();
	grid = new FibGrid(30, 40);
	expect(grid.rows).toBe(30);
	expect(grid.columns).toBe(40);
	expect(grid.grid.length).toBe(30);
	expect(grid.grid[0].length).toBe(40);
});

test('row & column can be incremented', () => {
	const grid = new FibGrid(5, 5);
	grid.incrementRowCol(2, 3);
	expect(grid.grid).toEqual([
		[0, 0, 0, 1, 0],
		[0, 0, 0, 1, 0],
		[1, 1, 1, 1, 1],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 1, 0],
	]);
	grid.incrementRowCol(1, 2);
	expect(grid.grid).toEqual([
		[0, 0, 1, 1, 0],
		[1, 1, 1, 2, 1],
		[1, 1, 2, 1, 1],
		[0, 0, 1, 1, 0],
		[0, 0, 1, 1, 0],
	]);
});

test('individual cell can be emptied', () => {
	const grid = new FibGrid(5, 5);
	grid.incrementRowCol(2, 3);
	grid.incrementRowCol(1, 2);
	grid.resetCell(2, 1);
	expect(grid.grid).toEqual([
		[0, 0, 1, 1, 0],
		[1, 1, 1, 2, 1],
		[1, 0, 2, 1, 1],
		[0, 0, 1, 1, 0],
		[0, 0, 1, 1, 0],
	]);
});

jest.mock('./utils');
test('find fib on cell', () => {
	utils.longestCommonSequence.mockReturnValue({ start: 1, length: 5 });
	const grid = new FibGrid(5, 5);
	grid.incrementRowCol(3, 3);
	grid.incrementRowCol(2, 4);
	grid.incrementRowCol(4, 4);
	grid._matchFibOnCell(2, 2);
	expect(utils.longestCommonSequence.mock.calls.length).toBe(2);
	expect(utils.longestCommonSequence.mock.calls[0][0]).toEqual([1, 1, 1, 2, 2]);
	expect(utils.longestCommonSequence.mock.calls[1][0]).toEqual([0, 0, 1, 1, 1]);
});
