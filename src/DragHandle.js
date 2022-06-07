import React, { useState } from 'react';
import useCorrectedDevicePixelRatio from "./utils/useCorrectedDevicePixelRatio";

export default function DragHandle(props) {
	const { children, onDragStart, onDragMove, x, y } = props;
	const [startDragHandleOffset, setStartDragHandleOffset] = useState({ x, y });
	const [startDragCursorOffset, setStartDragCursorOffset] = useState({ x: 0, y: 0 });
	const [drag, setDrag] = useState(false);
	const dpr = useCorrectedDevicePixelRatio();
	function onPointerDown(e) {
		if (e.button === 0) {
			// Left click
			setDrag(true);
			setStartDragHandleOffset({ x, y });
			setStartDragCursorOffset({ x: e.screenX, y: e.screenY });
			e.target.setPointerCapture(e.pointerId);
			onDragStart && onDragStart();
		}
	}
	function onMouseMove(e) {
		if (drag) {
			// Left click
			onDragMove({ x: startDragHandleOffset.x + (e.screenX - startDragCursorOffset.x) / dpr, y: startDragHandleOffset.y + (e.screenY - startDragCursorOffset.y) / dpr });
		}
	}
	function onPointerUp(e) {
		if (drag) {
			setDrag(false);
			onMouseMove(e);
		}
		e.target.releasePointerCapture(e.pointerId);
	}
	
	return React.cloneElement(React.Children.only(children), { onPointerDown, onMouseMove, onPointerUp });
}
