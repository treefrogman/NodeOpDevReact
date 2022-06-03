import { useEffect, useState } from "react";

export default function useMousePosition() {
	const [MousePosition, setMousePosition] = useState({
		left: 0,
		top: 0
	});

	useEffect(() => {
		function handleMove(event) {
			setMousePosition({
				left: event.clientX,
				top: event.clientY
			});
		}

		window.addEventListener("mousemove", handleMove);
		return () => window.removeEventListener("mousemove", handleMove);
	}, []);

	return MousePosition;
}
