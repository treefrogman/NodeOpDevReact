import { useState, useRef } from 'react';

export default function ScrollDragCanvas(props) {
	const { onPan, x, y, width, height, children, ...other } = props;
	const backRef = useRef(null);
	const rootRef = useRef(null);
	const halfwidth = width / 2;
	const halfheight = height / 2;
	const [drag, setDrag] = useState(false);
	const x0 = (x || 0) - halfwidth;
	const y0 = (y || 0) - halfheight;
	
	function updateOffset(delta) {
		// Multiply by -1 to invert the direction of the drag
		onPan({ x: -delta.x, y: -delta.y });
	}
	
	function onPointerDown(e) {
		if (e.button === 2) {
			// Right click
			// contextmenu nyi
		} else if (e.button === 1) {
			// Middle click
			setDrag(true);
			rootRef.current.requestPointerLock();
		} else {
			// Left click
			if (e.target === backRef.current) {
				setDrag(true);
				rootRef.current.setPointerCapture(e.pointerId);
			}
		}
	}
	function onPointerUp(e) {
		setDrag(false);
		document.exitPointerLock();
		rootRef.current.releasePointerCapture(e.pointerId);
	}
	function onPointerMove(e) {
		if (drag) {
			const scale = window.devicePixelRatio;
			updateOffset({ x: e.movementX / scale, y: e.movementY / scale });
		}
	}
	function onAuxClick(e) {
		e.preventDefault();
	}
	
	function onWheel(e) {
		updateOffset({ x: e.deltaX / 6, y: e.deltaY / 6 });
	}
	return (
		<svg ref={rootRef} width={width} height={height+1} viewBox={[x0, y0, width, height+1].join(" ")} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove} onWheel={onWheel} onAuxClick={onAuxClick} {...other}>
			<rect ref={backRef} className="ScrollDragCanvas-back" x={x0} y={y0} width={width} height={height} />
			{ children }
		</svg>
	);
}
