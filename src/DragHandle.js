import React, { useState } from 'react';

export default function DragHandle(props) {
	const { children, onDragStart, onDragMove, x, y } = props;
	const [startDragHandleOffset, setStartDragHandleOffset] = useState({ x: 0, y: 0 });
	const [startDragCursorOffset, setStartDragCursorOffset] = useState({ x: 0, y: 0 });
	const [drag, setDrag] = useState(false);
	function onPointerDown(e) {
		if (e.button === 0) {
			// Left click
			if (e.target === e.currentTarget) {
				setDrag(true);
				setStartDragHandleOffset({ x, y });
				setStartDragCursorOffset({ x: e.screenX, y: e.screenY });
				e.target.setPointerCapture(e.pointerId);
				onDragStart();
			}
		}
	}
	function onMouseMove(e) {
		if (drag) {
			// Left click
			onDragMove({ x: startDragCursorOffset.x - e.screenX + startDragHandleOffset.x, y: startDragCursorOffset.y - e.screenY + startDragHandleOffset.y });
		}
	}
	function onPointerUp(e) {
		if (drag) {
			setDrag(false);
			onMouseMove(e);
		}
		e.target.releasePointerCapture(e.pointerId);
	}
	
	return (
		<svg>
			{React.Children.map(children, child => {
				return React.cloneElement(child, { onPointerDown, onMouseMove, onPointerUp });
			})}
		</svg>
	);
}
