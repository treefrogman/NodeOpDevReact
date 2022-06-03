import { useState, useLayoutEffect } from "react";

function useBBox(ref, content) {
	const [dim, setDim] = useState({
		height: 0,
		width: 0,
		top: 0,
		left: 0,
	});
	useLayoutEffect(() => {
		if (ref && ref.current) {
			const { height, width, x, y } = ref.current.getBBox();
			setDim({
				height,
				width,
				top: y,
				left: x,
			});
		}
	}, [ref, content]);
	return dim;
}

export default useBBox;
