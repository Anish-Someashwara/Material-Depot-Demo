import * as THREE from 'three';
import Bike from './Bike.js';
import RaycasterManager from './RaycasterManager.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Loaders from './Loaders.js';
import Lights from './Lights.js';
import Ground from './Ground.js';
import UILoader from './UI/UILoader.js';
import ResourceManager from './ResourceManager.js';
// import DebuggerDatGUI from './DebuggerDatGUI.js';




let _instance = null;
export default class Experience {
	constructor() {
		if (_instance) {
			return _instance;
		}
		_instance = this;

		this.loaders = new Loaders();
		this.resourceManager = new ResourceManager();


		this.clock = new THREE.Clock();
		THREE.ColorManagement.enabled = true;
		this.scene = new THREE.Scene();


		//Dom Elements
		this.domElements = {
			canvas: document.getElementById('webgl'),
			categories: document.getElementById('categories-section'),
			items: document.getElementById('items-section'),
			bikeDiv: document.getElementById('bike-section'),
		};

		// Sizes
		this.sizes = {
			x: this.domElements.bikeDiv.clientWidth,
			y: this.domElements.bikeDiv.clientHeight,
		};

		this.intersectedObjects = []; // Push those objects with whom you want to check intersection with mouse.

		this.camera = new Camera();
		this.renderer = new Renderer();
		this.uiLoader = new UILoader();
		this.lights = new Lights();
		this.ground = new Ground();
		this.bike = new Bike();
		this.raycasterManager = new RaycasterManager();
		// this.debuggerDatGUI = new DebuggerDatGUI();
		
		// Axis Helper
		// const axesHelper = new THREE.AxesHelper(500);
		// this.scene.add(axesHelper);
		// axesHelper.visible = true;

		window.addEventListener('resize', () => {this.resize();});

		
		this.update();

		// setTimeout(() => {
			this.uiLoader.hideLoader();
		// }, 500);

	}

	resize() {
		this.camera && this.camera.resize();
		this.renderer && this.renderer.resize();
	}

	update() {
		const delta = this.clock.getDelta();
		const elapsed = this.clock.getElapsedTime();
		if (this.camera) this.camera.update(delta);
		if (this.bike) this.bike.update(delta);
		if (this.renderer) this.renderer.update();
		window.requestAnimationFrame(() => { this.update(); });
	}
}
