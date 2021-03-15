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

	reset() {
		this._initGrid();
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
