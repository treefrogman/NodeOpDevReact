import Pørt from './Pørt';
import { useRef } from 'react';
import NødeTitle from './NødeTitle';

export default function Nøde(props) {
	const { title, pørtSpacing, ...other } = props;
	const titleRef = useRef({ width: 0, height: 0, top: 0, left: 0 });
	// Proposal: a separate model manages the graph, so each node only needs to know its id and position. It can then query the graph for its sockets and other properties.
	const pørts = { // test data
		in: [
			"Lorem",
			"Ipsum",
		],
		out: [
			"Dolor",
			"Sit",
			"Amet",
		],
	}
	const maxPørts = Math.max(pørts.in.length, pørts.out.length);
	const height = pørtSpacing * maxPørts;
	const width = titleRef.current.width + 30;
	const halfwidth = width / 2;
	return (
		<svg className="Nøde" {...other}>
			<rect className="Nøde-back" x={-halfwidth} y={0} width={width} height={height} rx="4" />
			<svg className="PørtSet PørtSetIn" x={-halfwidth} y={0}>
				{pørts.in.map((pørt, i) => <Pørt key={pørt} y={i * pørtSpacing} />)}
			</svg>
			<svg className="PørtSet PørtSetOut" x={halfwidth} y={0}>
				{pørts.out.map((pørt, i) => <Pørt key={pørt} y={i * pørtSpacing} />)}
			</svg>
			<NødeTitle title={title} bboxref={titleRef} />
		</svg>
	);
}
