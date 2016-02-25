import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import OrbitControls from 'three-orbit-controls';

import Car from './car';

class SceneComponent extends React.Component {
	
	constructor() {
		super();

		this.state = { 
			t: 0,
			cars: [] 
		};
	}

	init() {

		let _this = this;

		let Scene = new THREE.Scene();
		let cars = [];
		let objects = { cars: [] };

		for ( let i = 0; i < 2; i++ ) {

			let position = {
				x: 60,
				z: -60
			};

			let car = Car(position);

			car.setSpeed(0.75);

			cars.push(car);

			let cube = new THREE.Mesh(
				new THREE.BoxGeometry(5, 5, 12),
				new THREE.MeshLambertMaterial({
					color: '#999'
				})
			);

			cube.position.set(position.x, position.y, position.z);

			objects.cars.push(cube);
			Scene.add(cube);
		}

		this.setState({ cars });

		let Plane = new THREE.Mesh(
			new THREE.PlaneGeometry(10000, 10000),
			new THREE.MeshLambertMaterial({ color: '#ccc' })
		);
		Plane.position.set(0, -2, 0);
		Plane.rotation.set( -Math.PI / 2, 0, 0 );
		Scene.add(Plane);

		let Sphere = new THREE.Mesh(
			new THREE.SphereGeometry(40, 40, 40),
			new THREE.MeshStandardMaterial({ 
				color: '#ee9',
				metalness: 0
			})
		);
		Scene.add(Sphere);

		const canvas = ReactDOM.findDOMNode(this);

		let Camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		Camera.position.set(140, 50, 140);

		let ThreeOrbitControls = OrbitControls(THREE);
		let controls = new ThreeOrbitControls( Camera, canvas );
		controls.mouseButtons = {
	        ORBIT: THREE.MOUSE.LEFT,
	        PAN: THREE.MOUSE.RIGHT
	    };

	    controls.maxPolarAngle = Math.PI / 2;
	    controls.maxDistance = 8000;
	    controls.damping = 0.5;

		let Renderer = new THREE.WebGLRenderer({
			antialias: true,
		    preserveDrawingBuffer: true,
			canvas,
			shadowMapEnabled: true
		});

		Renderer.setClearColor('#e2e2e2');
		Renderer.setSize(window.innerWidth, window.innerHeight);

		Camera.lookAt(new THREE.Vector3(0, 0, 0));

		let Light = new THREE.DirectionalLight('#eee');
		Light.position.set(0, 100, 0);
		Light.target = Sphere;
		Scene.add(Light);

		(function render() {

			let t = _this.state.t;

			_this.setState({ t: t + 1 });

 
			_this.state.cars.forEach(function(car, i) {

				let q = Math.sin(t / 100);

				// car 1 turns in a circle
				if ( i === 0 ) {
					car.turn(0.5);

				// car 2 bounces back and forth
				} else {
					car.setDirection({ x: q > 0 ? 1 : -1 });
				}

				car.drive();
				let loc = car.location();

				objects.cars[i].position.set(loc.x, loc.y + 2.5, loc.z);
				objects.cars[i].rotation.set( 0, car.getAngle(), 0 );
			});

			Renderer.render(Scene, Camera);

			window.requestAnimationFrame(render);
			// setTimeout(render, 1000);
		})();

		function onResize() {
			Camera.aspect = window.innerWidth / window.innerHeight;
			Camera.updateProjectionMatrix();

			Renderer.setSize(window.innerWidth, window.innerHeight);
		}

		window.addEventListener('resize', onResize);
	}

	componentDidMount() {
		this.init.call(this);
	}

	render() {
		return (
			<canvas />
		);
	}
}

export default SceneComponent;