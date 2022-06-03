class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(v) {
		return new Vector2D(this.x + v.x, this.y + v.y);
	}
	sub(v) {
		return new Vector2D(this.x - v.x, this.y - v.y);
	}
	mul(s) {
		return new Vector2D(this.x * s, this.y * s);
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	angle() {
		return Math.atan2(this.y, this.x);
	}
	normalize() {
		let l = this.length();
		return new Vector2D(this.x / l, this.y / l);
	}
	reach(l) {
		return this.normalize().mul(l);
	}
	rotate(rad) {
		return new Vector2D(
			this.x * Math.cos(rad) - this.y * Math.sin(rad),
			this.x * Math.sin(rad) + this.y * Math.cos(rad)
		);
	}
	rotateAround(rad, v) {
		return this.sub(v).rotate(rad).add(v);
	}
	toString() {
		return `${this.x}, ${this.y}`;
	}
}
function v(x, y) {
	if (x instanceof Vector2D) return x;
	if (x.x !== undefined) return new Vector2D(x.x, x.y);
	if (Array.isArray(x)) return new Vector2D(x[0], x[1]);
	return new Vector2D(x, y);
}
function connectorCurve(p1, p2) {
	[p1, p2] = [v(p1), v(p2)];
	const diff = p2.sub(p1);
	const rad = Math.min(diff.length() * .2, 50);
	const tanDiff = diff.add(v(0, rad * 2 * (diff.y > 0 ? -1 : 1)))
	const tanDist = tanDiff.length();
	const tanTerm = tanDist**2 - (rad*2)**2;
	const tanRad = tanTerm **.5;
	const numerator = tanTerm + tanRad**2;
	const x = numerator/(2*tanDist);
	const y = ((4*tanDist**2*tanRad**2 - numerator**2)/(4*tanDist**2))**.5 * (diff.y <= 0 ? -1 : 1);
	const angle = tanDiff.reach(x).add(tanDiff.rotate(Math.PI/2).reach(y)).angle();
	const arcEnd = v(0, 0).rotateAround(angle, v(0, (diff.y <= 0 ? -1 : 1) * rad));
	return `M${p1} A${rad},${rad} 0 ${angle * diff.y <= 0 ? 1 : 0},${diff.y <= 0 ? 0 : 1} ${p1.add(arcEnd)} L${p2.sub(arcEnd)} A${rad},${rad} 0 ${angle * diff.y <= 0 ? 1 : 0},${diff.y <= 0 ? 1 : 0} ${p2}`;
}

export default function Høse(props) {
	const {startX, startY, endX, endY, ...rest} = props;
	return <path className="Høse" fill="none" d={connectorCurve([startX, startY], [endX, endY])} {...rest} />;
}


// if the port is inside the bbox of the other node, hide the hose
// if the hose doubles back, then if the bboxes' vertical components overlap, send the hose around the shortest outside path
// each port set (side of a node) has a part: all ports below send their hoses down, all ports above send their hoses up
