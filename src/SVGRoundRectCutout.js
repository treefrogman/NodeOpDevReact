// Generates a rectangle with a rounded rectangle cutout.
// The coordinates and dimensions apply to the outer rectangle.
// The cutout is defined by the insets.

export default function SVGRoundRectCutout(props) {
	const { x, y, width, height, top, left, right, bottom, rx, ry, ...other } = props;
	const radiusX = rx || ry || 0;
	const radiusY = ry || radiusX;
	const minusCorner = {
		width: width - left - right - 2 * radiusX,
		height: height - top - bottom - 2 * radiusY
	}
	return <path className="SVGRoundRectCutout" {...other} id="frameMouseMask" fillRule="evenodd" d={`M${props.x},${props.y} h${props.width} v${props.height} h-${props.width} z M${x + left + radiusX},${y + top} h${minusCorner.width} a${radiusX},${radiusY} 0 0 1 ${radiusX},${radiusY} v${minusCorner.height} a${radiusX},${radiusY} 0 0 1 -${radiusX},${radiusY} h-${minusCorner.width} a${radiusX},${radiusY} 0 0 1 -${radiusX},-${radiusY} v-${minusCorner.height} a${radiusX},${radiusY} 0 0 1 ${radiusX},-${radiusY} z`}></path>
}
