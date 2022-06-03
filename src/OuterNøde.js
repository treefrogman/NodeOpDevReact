import SVGRoundRectCutout from './utils/SVGRoundRectCutout';
import NødeTitle from './NødeTitle';

export default function OuterNøde(props) {
	const { width, height } = props;
	const halfwidth = width / 2;
	const topBottom = 20;
	const sides = 80;
	const pad = 10;
	const pad2 = pad * 2;
	const topBottomPad = topBottom + pad;
	const sidesPad = sides + pad;
	const radius = 4;
	return (
		<svg x={halfwidth} y={topBottom}>
			<SVGRoundRectCutout x={-pad - halfwidth} y={-pad - topBottom} width={width + pad2} height={height + pad2} top={topBottomPad} left={sidesPad} right={sidesPad} bottom={topBottomPad} rx={radius} />
			<NødeTitle title="Nøde" />
		</svg>
	);
}
