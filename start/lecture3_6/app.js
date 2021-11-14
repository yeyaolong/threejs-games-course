import * as THREE from '../../libs/three126/three.module.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App {
    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(0, 0, 4);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaaaaaa);

        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
        this.scene.add(ambient);

        const light = new THREE.DirectionalLight();
        light.position.set(0.2, 1, 1);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        //Replace Box with Circle, Cone, Cylinder, Dodecahedron, Icosahedron, Octahedron, Plane, Sphere, Tetrahedron, Torus or TorusKnot
        // const geometry = new THREE.BoxGeometry(); // 盒子
        // const geometry = new THREE.CircleGeometry(1, 32); // 圆
        // const geometry = new THREE.ConeGeometry(); // 锥体
        // const geometry = new THREE.CylinderGeometry(); // 圆筒
        // const geometry = new THREE.DodecahedronGeometry(); // 十二面体
        // const geometry = new THREE.IcosahedronGeometry(); // 二十面体
        // const geometry = new THREE.OctahedronGeometry(); // 八面体
        // const geometry = new THREE.PlaneGeometry(); // 平面
        // const geometry = new THREE.SphereGeometry();
        // const geometry = new THREE.TetrahedronGeometry(); // 四面体
        // const geometry = new THREE.TorusGeometry(); // 圆环
        const geometry = new THREE.TorusKnotGeometry(); // 圆环结
        // const geometry = this.createStarGeometry(); // 创建一个五角星
        // const geometry = this.createPolygon(); // 创建一个多边形

        const material = new THREE.MeshStandardMaterial({ color: 0xFF0000 });

        this.mesh = new THREE.Mesh(geometry, material);

        this.scene.add(this.mesh);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.renderer.setAnimationLoop(this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this));
    }

    createStarGeometry(innerRadius = 0.4, outerRadius = 0.8, points = 5) {
            const shape = new THREE.Shape();

            const PI2 = Math.PI * 2;
            const inc = PI2 / (points * 2); // 五角星有10个点，外径上5个点，内径上5个点，所以这里要乘以2

            shape.moveTo(outerRadius, 0);
            let inner = true;

            for (let theta = inc; theta < PI2; theta += inc) {
                const radius = (inner) ? innerRadius : outerRadius; // 在内径上画或者在外径上画
                shape.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
                inner = !inner;
            }

            const extrudeSettings = {
                steps: 1, // 用于沿着挤出样条的深度细分的点的数量，默认值为1
                depth: 1,
                bevelEnabled: false // 对挤出的形状,是否应用斜角，默认值为true。
            }

            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }
        /**
         * 画一个多边形
         * @param {*} radius 半径
         * @param {*} points 角的数量
         * @returns 
         */
    createPolygon(radius = 0.8, points = 6) {
        const shape = new THREE.Shape();

        const PI2 = Math.PI * 2;
        const inc = PI2 / (points);

        shape.moveTo(radius, 0);

        for (let theta = inc; theta < PI2; theta += inc) {
            shape.lineTo(radius * Math.cos(theta), radius * Math.sin(theta));
        }

        const extrudeSettings = {
            steps: 1,
            depth: 0.1,
            bevelEnabled: false
        }

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.mesh.rotateY(0.01);
        this.renderer.render(this.scene, this.camera);
    }
}

export { App };