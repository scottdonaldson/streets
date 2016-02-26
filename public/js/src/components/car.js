import _ from 'lodash';
import Entity from './entity';

let Car = function(obj) {

	let entity = Entity(obj),
		tick = entity.tick;

	let state = {};

	let drive = tick;

	return _.assign({
		drive
	}, entity);

};

export default Car;