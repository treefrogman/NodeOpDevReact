import './App.css';
import useWindowDimensions from './utils/useWindowDimensions';
import { useState, useEffect } from 'react';
import Nøde from './Nøde';
import OuterNøde from './OuterNøde';
import ScrollDragCanvas from './ScrollDragCanvas';
import Octocat from './Octocat';

function rpos() {
	return (Math.random()-.5) * 600;
}
const pts = [
	{ x: rpos(), y: rpos() },
	{ x: rpos(), y: rpos() },
];

export default function App() {
	// No scrollbars
	useEffect(() => (document.body.style.overflow = "hidden") && undefined, []);
	const [ offset, setOffset ] = useState({ x: 0, y: 0 });
	const { height, width } = useWindowDimensions();
	return (
		<div className="App">
			<ScrollDragCanvas width={width} height={height} onPan={setOffset} x={offset.x} y={offset.y}>
				<Nøde title="Untitled" x={pts[0].x} y={pts[0].y} pørtSpacing="12" />
				<Nøde title="xyzzy" x={pts[1].x} y={pts[1].y} pørtSpacing="11" />
				<OuterNøde title="root" x={offset.x} y={offset.y} width={width} height={height} />
				<Octocat size="36" x={offset.x - width / 2 + 40} y={offset.y + height / 2 - 40} />
			</ScrollDragCanvas>
		</div>
	);
}

// lasso selection will be necessary, for threading between nodes to select just the set you want.
// but as though that weren't there, a robustly intuitive way to select and deselect nodes will also be necessary.
