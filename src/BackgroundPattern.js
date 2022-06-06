const patterns = {
	hex: size => {
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
};

export default function BackgroundPattern(props) {
	const { pattern, size } = props;
	const patternInfo = patterns[pattern](size);
	return (
		<pattern id={pattern} patternUnits="userSpaceOnUse" width={patternInfo.w} height={patternInfo.h}>
			<path d={patternInfo.path} className="BackgroundPattern-lines" />
		</pattern>
	);
}
