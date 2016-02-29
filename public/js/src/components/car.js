import _ from 'lodash';
import { Point, distance } from './point';
import Entity from './entity';

let Car = function(obj, Scene) {

	let entity = Entity(obj),
		drive = entity.tick,
		t = 0,
		state = {
			angle: null,
			direction: null,
			speed: null
		};

	entity.onTick.increment = () => t++;

	entity.onTick.stateHandler = function() {

		state.direction = entity.getDirection();
		state.speed = entity.getSpeed();
		state.acceleration = entity.getAcceleration();

	};

	let casualDrive = function() {

		let targetSpeed = 0.35;

		entity.onTick.casualDrive = function() {

			let s = state.speed,
				a = state.acceleration,
				dir = state.direction,
				d = distance(entity.getLocation(), Point());

			// try to maintain targetSpeed
			if ( s < targetSpeed ) {
				entity.setAcceleration( dir.scale(0.01) );
			} else if ( s > targetSpeed ) {
				entity.setAcceleration( dir.scale(-0.01) );
			} else {
				entity.setAcceleration( dir.scale(0) );
			}
			
			if ( d > 120 ) {
				entity.turn(0.5);
			}
		};

		window.addEventListener('click', function() {

			targetSpeed = Math.random();

		});
	};

	return _.assign({
		drive,
		casualDrive
	}, entity);

};

export default Car;