import FibGrid from './FibGrid';

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

