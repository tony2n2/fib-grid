import { getFibNeighbors } from './FibSequence';
import * as utils from './utils';

class FibGrid {
	constructor(rows = 50, columns = 50) {
		this.rows = rows;
		this.columns = columns;
		this._initGrid();
	}

	/**
	 * increment a entire row and column
	 * @param {*} row
	 * @param {*} col
	 * @param {*} n increment by
	 */
	incrementRowCol(rowId, colId, n = 1) {
		rowId = parseInt(rowId);
		colId = parseInt(colId);
		this.grid = this.grid.map((row, id) => (id === rowId ? row.map((val) => val + 1) : this.grid[id]));
		for (let _rowId = 0; _rowId < this.rows; _rowId++) {
			if (_rowId !== rowId) {
				this.grid[_rowId][colId] += 1;
			}
		}
	}

	resetCell(row, col) {
		this.grid[row][col] = 0;
	}

	resetRange({ from, to }) {
		this.grid = this.grid.map((row, rowId) => {
			if (rowId === from[0] || (rowId > from[0] && rowId < to[0])) {
				return row.map((cell, colId) => {
					if (colId === from[1] || (colId > from[1] && colId < to[1])) {
						return 0;
					} else {
						return cell;
					}
				});
			} else {
				return row;
			}
		});
	}

	reset() {
		this._initGrid();
	}

	matchFibOnRowCol(row, col, length = 5) {
		let results = [];
		// optimization possible: some tests can be skipped on the target row/column
		for (let i = 0; i < this.grid.length; i++) {
			results = [...results, ...this._matchFibOnCell(i, col, length)];
		}
		for (let i = 0; i < this.grid[row].length; i++) {
			results = [...results, ...this._matchFibOnCell(row, i, length)];
		}
		return results;
	}

	_matchFibOnCell(row, col, length = 5) {
		let result,
			results = [];
		const fibs = getFibNeighbors(this.grid[row][col]);
		// skip if cell is not in the fib sequence
		if (fibs === null) return results;

		/**
		 * there are 4 cases to test
		 * 1: (length) horizontal neighbor cells with target cell at the centre
		 * 		e.g. for length === 5 => |X|X|X|X|O|X|X|X|X|
		 * 2: the above but reversed
		 * 3: vertical neighbor cells
		 * 4: same as above but reversed
		 */

		// extract horizontal neighbor cells to a separate array
		const fromCol = Math.max(0, col - length + 1);
		const toCol = Math.min(this.grid[row].length, col + length);
		const rowNeighbors = this.grid[row].slice(fromCol, toCol);
		// case 1
		result = utils.longestCommonSequence(rowNeighbors, fibs);
		if (result.length >= length) {
			results.push({ from: [row, fromCol + result.start], to: [row, fromCol + result.start + length] });
		} else {
			// case 2
			result = utils.longestCommonSequence(rowNeighbors.reverse(), fibs);
			if (result.length >= length) {
				const reversedStart = toCol - fromCol - result.start - result.length;
				results.push({
					from: [row, fromCol + reversedStart],
					to: [row, fromCol + reversedStart + length],
				});
			}
		}

		// extract vertical neighbor cells to a separate array
		const fromRow = Math.max(0, row - length + 1);
		const toRow = Math.min(this.grid.length, row + length);
		const colNeighbors = [];
		for (let i = fromRow; i < toRow; i++) {
			colNeighbors.push(this.grid[i][col]);
		}
		// case 3
		result = utils.longestCommonSequence(colNeighbors, fibs);
		if (result.length >= length) {
			results.push({ from: [fromRow + result.start, col], to: [fromRow + result.start + length, col] });
		} else {
			// case 4
			result = utils.longestCommonSequence(colNeighbors.reverse(), fibs);
			if (result.length >= length) {
				const reversedStart = toRow - fromRow - result.start - result.length;
				results.push({
					from: [fromRow + reversedStart, col],
					to: [fromRow + reversedStart + length, col],
				});
			}
		}
		return results;
	}

	_initGrid() {
		this.grid = [];
		for (let row = 0; row < this.rows; row++) {
			this.grid.push([]);
			for (let col = 0; col < this.columns; col++) {
				this.grid[row].push(0);
			}
		}
	}
}

export default FibGrid;
