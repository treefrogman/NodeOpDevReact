import { useRef } from 'react';
import useBBox from "./utils/useBBox";
import './TextBubble.css';

export default function TextBubble(props) {
	const textRef = useRef(null);
	const { text, padH, padV, rx, ry, setwidth, textanchor, ...other } = props;
	const bbox = useBBox(textRef, text);
	let { width, height, top, left } = bbox;
	if (setwidth) {
		setwidth(width);
	}
	width += padH * 2;
	height += padV * 2;
	left -= padH;
	top -= padV;
	const radiusY = Math.min(height / 2, ry || rx);
	const radiusX = rx || radiusY;
	return (
		<svg overflow="visible" {...other} className="TextBubble">
			<rect className="TextBubble-back" x={left} y={top} width={width} height={height} rx={radiusX} ry={radiusY} />
			<text className="TextBubble-text" ref={textRef} textAnchor={textanchor || "middle"} alignmentBaseline="text-before-edge">{text}</text>
		</svg>
	)
}
