import './App.css';
import FibGrid from './FibGrid';
import { useState } from 'react';

const ROWS = 50;
const COLUMNS = 50;
const fg = new FibGrid(ROWS, COLUMNS);

function App() {
	const [state, setState] = useState(fg.grid);
	function clickHandler(e) {
		fg.incrementRowCol(e.target.attributes.row.value, e.target.attributes.col.value);
		const fibs = fg.matchFibOnRowCol(e.target.attributes.row.value, e.target.attributes.col.value);
		fibs.forEach((seq) => {
			fg.resetRange(seq);
		});
		setState(fg.grid);
	}
	return (
		<div className="App">
			<div className="grid">
				{state.map((row, rowId) => (
					<div
						className="row"
						key={rowId}
						style={{
							flexBasis: `calc((100vmin - 40px) / ${ROWS})`,
							lineHeight: `calc((100vmin - 40px) / ${ROWS} - 1px)`,
						}}
					>
						{row.map((cell, colId) => (
							<Cell key={colId} attrs={{ row: rowId, col: colId }} value={cell} onClick={clickHandler} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function Cell(props) {
	// cell width css prop
	let width = { width: `calc((100vmin - 40px) / ${ROWS})` };

	return (
		<span className="cell" onClick={props.onClick} style={width} {...props.attrs}>
			{props.value !== 0 ? props.value : ''}
		</span>
	);
}

export default App;
