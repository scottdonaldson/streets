import { Point, distance, dot, length, unit } from './point';

let Entity = function(obj) {

	let location = Point({
		x: obj.x || 0,
		y: obj.y || 0,
		z: obj.z || 0
	});

	let direction = unit(Point()); // direction -- must be unit vector
	let speed = 0; // assume no speed initially
	let acceleration = Point(); // assume no acceleration initially

	let getLocation = () => location;
	let getDirection = () => direction;
	let getSpeed = () => speed;
	let getAcceleration = () => acceleration;

	let setLocation = pt => location = Point(pt);
	let setDirection = vector => direction = unit(vector);
	let setSpeed = value => speed = value;
	let setAcceleration = pt => acceleration = Point(pt);

	let onTick = {};

	let start = function(target) {

		onTick._startstop = function() {
			if ( getSpeed() >= (target || 1) ) {
				setSpeed(target || 1);
				setAcceleration( Point() );
			} else {
				setAcceleration( unit(direction).scale(0.01) );
			}
		};
	};

	let stop = function() {

		console.log('starting to stop');

		onTick._startstop = function() {
			if ( getSpeed() <= 0 ) {
				setSpeed(0);
				setAcceleration( Point() );
			} else {
				setAcceleration( unit(direction).scale(-0.01) );
			}
		};
	};

	let tick = function(cb) {

		// based on current conditions (speed and direction), set new location
		// mutates location but not direction
		location.add( direction.clone().scale(speed) );

		// set new direction and speed based on current acceleration
		direction = unit( direction.clone().add(acceleration) );
		speed += dot(acceleration, direction);

		for ( let key in onTick ) {
			let cb = onTick[key];
			if (cb) cb();
		}

		// optional callback
		if (cb) cb();

	};

	// angles and turning take place in XZ plane
	let turn = function(deg) {

		deg *= Math.PI / 180;

		let x = direction.x,
			y = direction.y,
			z = direction.z,
			cos = Math.cos, 
			sin = Math.sin;

		direction = Point({
			x: x * cos(deg) - z * sin(deg),
			y: y,
			z: x * sin(deg) + z * cos(deg)
		});
	};

	let getAngle = function(units) {

		let out = Math.atan(direction.x / direction.z);

		if ( !out || out === 'deg' || out === 'degrees') {
			out * 180 / Math.PI;
		}

		return out;
	};

	return {
		tick,
		start,
		stop,

		turn,
		getAngle,

		setLocation,
		setDirection,
		setSpeed,
		setAcceleration,

		getLocation,
		getDirection,
		getSpeed,
		getAcceleration
	};
};

export default Entity;