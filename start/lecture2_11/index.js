import { Vec } from './Vec.js';

console.clear();
const a = new Vec();
const b = new Vec(4, 0);
const c = new Vec(4, 3);

console.log(`The distance form a to c is ${a.distanceTo(c).toFixed(2)}`);

console.log(`The angle between b and c is ${b.angleBetween(c).toFixed(2)}`);



const centre = new Vec(150, 150);
const radius = 100;
let theta = 0;

const star = document.getElementById("star");

function rotateStar() {
    requestAnimationFrame(rotateStar);

    theta += 0.05;

    const x = Math.cos(theta) * radius + centre.x;
    const y = Math.sin(theta) * radius + centre.y;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
}

rotateStar();