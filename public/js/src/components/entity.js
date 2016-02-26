import { Point, distance, length, unit } from './point';

let Entity = function(obj) {

	let location = Point({
		x: obj.x || 0,
		y: obj.y || 0,
		z: obj.z || 0
	});

	let vector = Point({ x: 1, y: 0, z: 0 }); // length(v) = speed, unit(v) = direction

	let tick = function() {

		location = location.add( vector );

	};

	let turn = function(deg) {

		deg *= Math.PI / 180;

		let x = vector.x,
			y = vector.y,
			z = vector.z,
			cos = Math.cos, 
			sin = Math.sin;

		vector = Point({
			x: x * cos(deg) - z * sin(deg),
			y: y,
			z: x * sin(deg) + z * cos(deg)
		});
	};

	let getAngle = function(units) {

		let out = Math.atan(vector.x / vector.z);

		if ( !out || out === 'deg' || out === 'degrees') {
			out * 180 / Math.PI;
		}

		return out;
	};

	let setSpeed = function(factor) {

		vector = unit(vector).scale(factor);

	};

	let setDirection = function(pt) {

		let s = length(vector); // get the current speed

		pt = Point(pt).scale(s); // scale the new direction point by this speed

		vector = pt; // set new direction

	};

	return {
		tick,
		turn,
		getAngle,
		setSpeed,
		setDirection,
		getSpeed: () => length(vector),
		getDirection: () => unit(vector),
		vector: () => vector,
		location: () => location
	};
};

export default Entity;