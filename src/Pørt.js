// for dragging pørts to connect them, there is a pørtSpawn object that is used to create new pørts
// whenever you mouse over a pørt, the pørtSpawn object will align itself with the pørt
// this way, there only ever need be one draggable pørt at a time
// 

import React from 'react';
import './Pørt.css';

export default function Pørt(props) {
	return (
		<svg {...props}>
			<circle className="Pørt-hitbox"></circle>
			<circle className="Pørt-ring"></circle>
		</svg>
	);
}
