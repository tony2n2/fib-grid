import './App.css';
import FibGrid from './FibGrid';
import { useState, useRef, useEffect } from 'react';

const ROWS = 50;
const COLUMNS = 50;
const fg = new FibGrid(ROWS, COLUMNS);

function App() {
	const [state, setState] = useState(fg.grid);
	const timer = useRef(null);
	function clickHandler(e) {
		fg.incrementRowCol(e.target.attributes.row.value, e.target.attributes.col.value);
		setState(fg.grid);
		const fibs = fg.matchFibOnRowCol(e.target.attributes.row.value, e.target.attributes.col.value);
    // reset matched cells to empty after 1s
		timer.current = setTimeout(() => {
			fibs.forEach((seq) => {
				fg.resetRange(seq);
			});
			setState(fg.grid);
			timer.current = null;
		}, 1000);
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
	const timer = useRef(null);
	const initialRun = useRef(true);

	// background color
	const [backgroundColor, setBackgroundColor] = useState('');
	useEffect(() => {
		if (initialRun.current) {
			initialRun.current = false;
			return;
		}
		if (timer.current) {
			clearTimeout(timer.current);
		}
		setBackgroundColor(props.value === 0 ? 'green' : 'yellow');
		timer.current = setTimeout(() => {
			setBackgroundColor('');
			timer.current = null;
		}, 1000);
	}, [props.value]);

	// cleanup when unmount
	useEffect(() => {
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, []);

	// cell width css prop
	let width = { width: `calc((100vmin - 40px) / ${ROWS})` };

	return (
		<span
			className="cell"
			onClick={props.onClick}
			style={backgroundColor ? { backgroundColor, ...width } : { ...width }}
			{...props.attrs}
		>
			{props.value !== 0 ? props.value : ''}
		</span>
	);
}

export default App;
