import { useState, useRef } from 'react';
import useCorrectedDevicePixelRatio from "./utils/useCorrectedDevicePixelRatio";

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
	const hex = makeHex(370);

	function makeHex(size) {
		const one = size / 6;
		const sqrt3 = one * Math.sqrt(3);
		const two = one * 2;
		const x0 = 0;
		const y0 = 0;
		const x1 = one;
		const y1 = sqrt3;
		const y2 = sqrt3 * 2;
		const x2 = one * 3;
		const x3 = one * 4;
		return {
			w: size,
			h: sqrt3 * 2,
			path: `M${x0},${y1} L${x1},${y0} H${x2} L${x3},${y1} L${x2},${y2} H${x1} z M${x3},${y1} H${size}`,
		};
	}

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
			<pattern id="hex" patternUnits="userSpaceOnUse" width={hex.w} height={hex.h}>
				<path d={hex.path} strokeWidth="1" stroke="#777" fill="none" opacity=".15" />
			</pattern>
			<rect className="ScrollDragCanvas-back" x={x0} y={y0} width={width} height={height} />
			<rect ref={backRef} className="ScrollDragCanvas-handle" fill="url(#hex)" x={x0} y={y0} width={width} height={height} />
			{ children }
		</svg>
	);
}
