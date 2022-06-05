import { useState, useRef } from 'react';
import useCorrectedDevicePixelRatio from "./utils/useCorrectedDevicePixelRatio";
import noise from "./noise.svg";

export default function ScrollDragCanvas(props) {
	const { onPan, x, y, width, height, children, ...other } = props;
	const backRef = useRef(null);
	const rootRef = useRef(null);
	const halfwidth = width / 2;
	const halfheight = height / 2;
	const [drag, setDrag] = useState(false);
	const x0 = (x || 0) - halfwidth;
	const y0 = (y || 0) - halfheight;
	const dpr = useCorrectedDevicePixelRatio();
	const noiseScale = 500;
	
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
			updateOffset({ x: e.movementX / dpr, y: e.movementY / dpr });
		}
	}
	function onAuxClick(e) {
		e.preventDefault();
	}
	
	function onWheel(e) {
		updateOffset({ x: -e.deltaX / 2, y: -e.deltaY / 2 });
	}
	return (
		<svg ref={rootRef} width={width} height={height+1} viewBox={[x0, y0, width, height+1].join(" ")} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove} onWheel={onWheel} onAuxClick={onAuxClick} {...other}>
			<pattern id="noise" patternUnits="userSpaceOnUse" width={noiseScale} height={noiseScale}>
				<image href={noise} x="0" y="0" width={noiseScale} height={noiseScale} />
			</pattern>
			<rect className="ScrollDragCanvas-back" x={x0} y={y0} width={width} height={height} />
			<rect ref={backRef} className="ScrollDragCanvas-handle" fill="url(#noise)" x={x0} y={y0} width={width} height={height} />
			{ children }
		</svg>
	);
}
