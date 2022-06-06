import { useState, useRef } from 'react';
import useCorrectedDevicePixelRatio from "./utils/useCorrectedDevicePixelRatio";
import BackgroundPattern from "./BackgroundPattern";

export default function ScrollDragCanvas(props) {
	const { onPan, x, y, width, height, children, ...other } = props;
	const backRef = useRef(null);
	const rootRef = useRef(null);
	const halfwidth = width / 2;
	const halfheight = height / 2;
	const [drag, setDrag] = useState(false);
	const [mouseButton, setMouseButton] = useState(false);
	const [startDragCanvasOffset, setStartDragCanvasOffset] = useState({ x: 0, y: 0 });
	const [startDragCursorOffset, setStartDragCursorOffset] = useState({ x: 0, y: 0 });
	const x0 = (x || 0) - halfwidth;
	const y0 = (y || 0) - halfheight;
	const dpr = useCorrectedDevicePixelRatio();
	const pattern = "hex";

	function updateOffset(newOffset) {
		onPan({ x: startDragCanvasOffset.x + (startDragCursorOffset.x - newOffset.x) / dpr, y: startDragCanvasOffset.y + (startDragCursorOffset.y - newOffset.y) / dpr });
	}

	function updateRelative(delta) {
		onPan({ x: x - delta.x, y: y - delta.y });
	}
	
	function onPointerDown(e) {
		setMouseButton(e.button);
		if (e.button === 2) {
			// Right click
			// contextmenu nyi
		} else if (e.button === 1) {
			// Middle click
			setDrag(true);
			rootRef.current.requestPointerLock();
		} else if (e.button === 0) {
			// Left click
			if (e.target === backRef.current) {
				setDrag(true);
				setStartDragCanvasOffset({ x, y });
				setStartDragCursorOffset({ x: e.screenX, y: e.screenY });
				rootRef.current.setPointerCapture(e.pointerId);
			}
		}
	}
	function onPointerUp(e) {
		setDrag(false);
		document.exitPointerLock();
		rootRef.current.releasePointerCapture(e.pointerId);
	}
	function onMouseMove(e) {
		if (drag) {
			if (mouseButton === 1) {
				// Middle click
				updateRelative({ x: e.movementX / dpr, y: e.movementY / dpr });
			} else if (mouseButton === 0) {
				// Left click
				updateOffset({ x: e.screenX, y: e.screenY });
			}
		}
	}
	function onAuxClick(e) {
		e.preventDefault();
	}
	
	function onWheel(e) {
		updateRelative({ x: -e.deltaX / 2, y: -e.deltaY / 2 });
	}
	return (
		<svg ref={rootRef} width={width} height={height+1} viewBox={[x0, y0, width, height+1].join(" ")} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onMouseMove={onMouseMove} onWheel={onWheel} onAuxClick={onAuxClick} {...other}>
			<BackgroundPattern pattern={pattern} size="370" />
			<rect className="ScrollDragCanvas-back" x={x0} y={y0} width={width} height={height} />
			<rect ref={backRef} className="ScrollDragCanvas-handle" fill={`url(#${pattern})`} x={x0} y={y0} width={width} height={height} />
			{ children }
		</svg>
	);
}
