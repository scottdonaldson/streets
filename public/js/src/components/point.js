const Point = function(obj = {}) {

	let x = obj.x || 0,
		y = obj.y || 0,
		z = obj.z || 0;

	function add(obj) {
		return Point({
			x: x += (obj.x || 0),
			y: y += (obj.y || 0),
			z: z += (obj.z || 0)
		});
	}

	function subtract(obj) {
		return Point({
			x: x -= (obj.x || 0),
			y: y -= (obj.y || 0),
			z: z -= (obj.z || 0)
		});
	}

	function scale(factor) {
		return Point({
			x: x *= factor,
			y: y *= factor,
			z: z *= factor
		});
	}

	let out = { add, subtract, scale, unit };

	Object.defineProperty(out, 'x', { get: () => x });
	Object.defineProperty(out, 'y', { get: () => y });
	Object.defineProperty(out, 'z', { get: () => z });

	return out;

};

const distance = function(pt1, pt2) {

	let x = pt2.x - pt1.x,
		y = pt2.y - pt1.y,
		z = pt2.z - pt2.y;

	x = Math.pow(x, 2);
	y = Math.pow(y, 2);
	z = Math.pow(z, 2);

	let d = Math.sqrt(x + y + z);

	return d;

};

const length = function(pt) {

	return distance(Point(), pt);

};

const unit = function(pt) {

	let f = length(pt);

	return Point({
		x: pt.x / f,
		y: pt.y / f,
		z: pt.z / f
	});
};

export {
	Point,
	distance,
	length,
	unit
};