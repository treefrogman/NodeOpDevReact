import './App.css';
import useWindowDimensions from './utils/useWindowDimensions';
import useMousePosition from './utils/useMousePosition';
import React from 'react';
import Høse from './Høse';
import TextBubble from './TextBubble';
// import Pørt from './Pørt';
import Nøde from './Nøde';
import OuterNøde from './OuterNøde';

export default function App() {
	// No scrollbars
	React.useEffect(() => (document.body.style.overflow = "hidden") && undefined, []);
	
	const { height, width } = useWindowDimensions();
	const { left, top } = useMousePosition();
	return (
		<div className="App">
			<svg width={width} height={height+1} viewBox={`0 0 ${width} ${height+1}`}>
				<Høse startX={width / 3} startY={height / 3} endX={left-5} endY={top} />
				<Nøde title="Untitled" x={width / 3} y={height / 2} pørtSpacing="12" />
				<Nøde title="xyzzy" x={width / 2} y={height / 3} pørtSpacing="11" />
				<TextBubble text="TextBubble" x={Math.floor(width / 2)} y={Math.floor(height / 2)} padV="2" padH="7" ry="100" />
				<OuterNøde title="root" width={width} height={height} />
			</svg>
		</div>
	);
}
