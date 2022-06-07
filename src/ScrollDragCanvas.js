import { useState, useEffect } from 'react';
import useCorrectedDevicePixelRatio from "./utils/useCorrectedDevicePixelRatio";
import BackgroundPattern from "./BackgroundPattern";

export default function ScrollDragCanvas(props) {
	const { onPan, x, y, width, height, children, ...other } = props;
	const [panning, setPanning] = useState(false);
	const [spacebar, setSpacebar] = useState(false);
	const x0 = (x || 0) - width / 2;
	const y0 = (y || 0) - height / 2;
	const dpr = useCorrectedDevicePixelRatio();
	const backgoundPattern = [
		{ type: "hex", size: 370 },
		{ type: "grid", size: 60 },
	][1];

	function updateRelative(delta) {
		onPan({ x: x - delta.x, y: y - delta.y });
	}
	
	function onKeyDown(e) {
		if (e.keyCode === 32) {
			setSpacebar(true);
		}
	}
	function onKeyUp(e) {
		if (e.keyCode === 32) {
			setSpacebar(false);
		}
	}
	
	function onPointerDown(e) {
		if (e.button === 1 || (spacebar && e.button === 0)) {
			// Middle click
			setPanning(true);
			e.target.requestPointerLock();
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
		// prevent middle-click to open in new tab
		e.preventDefault();
	}
	
	function onWheel(e) {
		updateRelative({ x: -e.deltaX / 2, y: -e.deltaY / 2 });
	}
	
	function onTouchStart(event){
		if(event.touches.length > 1){
			// the event is multi-touch, so prevent the behavior
			event.preventDefault()
		}
	}
	
	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
		return function cleanup() {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		}
	});
		
	return (
		<svg width={width} height={height+1} viewBox={[x0, y0, width, height+1].join(" ")} {...{onKeyDown, onKeyUp, onPointerDown, onPointerUp, onMouseMove, onWheel, onAuxClick, onTouchStart}} {...other}>
			<BackgroundPattern pattern={backgoundPattern.type} size={backgoundPattern.size} />
			<rect className="ScrollDragCanvas-back" x={x0} y={y0} width={width} height={height} />
			<rect className="ScrollDragCanvas-handle" fill={`url(#${backgoundPattern.type})`} x={x0} y={y0} width={width} height={height} />
			{ children }
		</svg>
	);
}
