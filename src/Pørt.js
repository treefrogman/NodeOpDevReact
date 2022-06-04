// for dragging pørts to connect them, there is a pørtSpawn object that is used to create new pørts
// whenever you mouse over a pørt, the pørtSpawn object will align itself with the pørt
// this way, there only ever need be one draggable pørt at a time
// 

import React from 'react';
import TextBubble from './TextBubble';
import './Pørt.css';

export default function Pørt(props) {
	return (
		<svg {...props} className="Pørt">
			<circle className="Pørt-hitbox"></circle>
			<TextBubble text="TextBubble" y="-7" x="10" textanchor="left" padV="2" padH="7" ry="100" />
			<circle className="Pørt-ring"></circle>
		</svg>
	);
}


/*

				i've taken the wrong approach with these pørt hover effects and labels.
				the pørts should have their inside labels as planned (but nyi), but the outer labels should be attached to the pørtSpawn object
*/
