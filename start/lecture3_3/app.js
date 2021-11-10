import * as THREE from '../../libs/three126/three.module.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth, window.innerHeight, .1, 100);

        this.camera.position.set(0, 0, 0, 4);

        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {

    }

    render() {

    }
}

export { App };