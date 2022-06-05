import SVGRoundRectCutout from './SVGRoundRectCutout';
import NødeTitle from './NødeTitle';

export default function OuterNøde(props) {
	const { x, y, width, height } = props;
	const x0 = x || 0;
	const y0 = y || 0;
	const halfwidth = width / 2;
	const halfheight = height / 2;
	const topBottom = 20;
	const sides = 80;
	const pad = 10;
	const pad2 = pad * 2;
	const topBottomPad = topBottom + pad;
	const sidesPad = sides + pad;
	const radius = 4;
	return (
		<svg x={x0} y={topBottom + y0 - halfheight}>
			<SVGRoundRectCutout x={-pad - halfwidth} y={-pad - topBottom} width={width + pad2} height={height + pad2} top={topBottomPad} left={sidesPad} right={sidesPad} bottom={topBottomPad} rx={radius} />
			<NødeTitle title="Nøde" />
		</svg>
	);
}
