import './App.css';
import useWindowDimensions from './utils/useWindowDimensions';
import { useState, useLayoutEffect } from 'react';
import Nøde from './Nøde';
import OuterNøde from './OuterNøde';
import ScrollDragCanvas from './ScrollDragCanvas';
import Octocat from './Octocat';

function rpos() {
	return (Math.random()-.5) * 600;
}

const testNodes = [
	{ title: "Untitled", x: rpos(), y: rpos() },
	{ title: "xyzzy", x: rpos(), y: rpos() },
	{ title: "Arnold", x: rpos(), y: rpos() },
];

export default function App() {
	const [ offset, setOffset ] = useState({ x: 0, y: 0 });
	const [ nodes, setNodes ] = useState(testNodes);
	const { height, width } = useWindowDimensions();
	
	function onDoubleClick(e) {
		// enter and exit fullscreen mode with a double-click/-tap
		if (document.fullscreenElement !== null) {
			document.exitFullscreen()
		} else {
			document.body.requestFullscreen();
		}
	}
	return (
		<div className="App" onDoubleClick={onDoubleClick}>
			<ScrollDragCanvas width={width} height={height} onPan={setOffset} x={offset.x} y={offset.y}>
				{ nodes.map((node,i)=>{
					return <Nøde {...node} key={i} pørtSpacing="12" onMove={newPos=>{
						setNodes(prevNodes=>{
							return prevNodes.map((prevNode,prevI)=>{
								return prevI === i ? { title: prevNode.title, ...newPos } : prevNode;
							});
						});
					}} />;
				}) }
				<svg className="ScrollDragCanvas-screenanchor" x={offset.x} y={offset.y}>
					<OuterNøde title="root" width={width} height={height} />
					<Octocat size="36" x={-width / 2 + 40} y={height / 2 - 40} />
				</svg>
			</ScrollDragCanvas>
		</div>
	);
}

/*
lasso selection will be necessary, for threading between nodes to select just the set you want.
but as though that weren't there, a robustly intuitive way to select and deselect nodes will also be necessary.

lasso selection uses fill-rule:evenodd to create a shape, then checks the center of each node whether it's in the shape or not.
this will behave like an actual rope being wrapped around pegs. if you want to deselect something within, just wrap around it the other way.

even on mobile --- especially on mobile --- the selection process will have undoable steps

desktop:
you click a node
you shift-click another node
the undo button appears in the toolbar: the shift-select can be undone


f2 or double-click to rename
with f2 you can rename multiple at once, with multicursor just like vscode

maybe host using this
https://tomekkolasa.com/how-to-deploy-node-js-app-to-google-app-engine-using-github-actions

don't actually have to worry about z-stacking of nodes, nor connector routing for overlapping nodes
because dragging one node onto another will have its own defined behavior
*/
