import { useState, useRef } from 'react';
import useCorrectedDevicePixelRatio from "./utils/useCorrectedDevicePixelRatio";
import BackgroundPattern from "./BackgroundPattern";
import DragHandle from "./DragHandle";

export default function ScrollDragCanvas(props) {
	const { onPan, x, y, width, height, children, ...other } = props;
	const backRef = useRef(null);
	const rootRef = useRef(null);
	const halfwidth = width / 2;
	const halfheight = height / 2;
	const [panning, setPanning] = useState(false);
	const [startDragCanvasOffset, setStartDragCanvasOffset] = useState({ x: 0, y: 0 });
	const x0 = (x || 0) - halfwidth;
	const y0 = (y || 0) - halfheight;
	const dpr = useCorrectedDevicePixelRatio();
	const backgoundPattern = [
		{ type: "hex", size: 370 },
		{ type: "grid", size: 60 },
	][1];

	// function updateOffset(newOffset) {
	// 	onPan({ x: startDragCanvasOffset.x + (startDragCursorOffset.x - newOffset.x) / dpr, y: startDragCanvasOffset.y + (startDragCursorOffset.y - newOffset.y) / dpr });
	// }

	function updateRelative(delta) {
		onPan({ x: x - delta.x, y: y - delta.y });
	}
	
	function onPointerDown(e) {
		if (e.button === 2) {
			// Right click
			// contextmenu nyi
		} else if (e.button === 1) {
			// Middle click
			setPanning(true);
			rootRef.current.requestPointerLock();
		}
	}
	function onMouseMove(e) {
		if (panning) {
			// Middle click is down
			updateRelative({ x: e.movementX / dpr, y: e.movementY / dpr });
		}
	}
	function onPointerUp(e) {
		setPanning(false);
		document.exitPointerLock();
	}
	
	function onAuxClick(e) {
		e.preventDefault();
	}
	
	function onWheel(e) {
		updateRelative({ x: -e.deltaX / 2, y: -e.deltaY / 2 });
	}
	
	function onDragStart() {
		setStartDragCanvasOffset({x, y});
	}
	function onDragMove(drag) {
		onPan({ x: startDragCanvasOffset.x + drag.x, y: startDragCanvasOffset.y + drag.y });
	}
	
	return (
		<svg ref={rootRef} width={width} height={height+1} viewBox={[x0, y0, width, height+1].join(" ")} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onMouseMove={onMouseMove} onWheel={onWheel} onAuxClick={onAuxClick} {...other}>
			<BackgroundPattern pattern={backgoundPattern.type} size={backgoundPattern.size} />
			<rect className="ScrollDragCanvas-back" x={x0} y={y0} width={width} height={height} />
			<DragHandle {...{onDragStart, onDragMove }}>
				<rect ref={backRef} className="ScrollDragCanvas-handle" fill={`url(#${backgoundPattern.type})`} x={x0} y={y0} width={width} height={height} />
			</DragHandle>
			{ children }
		</svg>
	);
}
