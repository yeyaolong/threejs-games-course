import { Point } from './Point.js';
import { Rectangle } from './Rectangle.js';

const pt = new Point(10, 65);
const rect1 = new Rectangle(10, 10, 100, 50);
const rect2 = new Rectangle(50, 20, 200, 80);
console.log('The area of rect1 is ' + rect1.area);
console.log('rect1 overlaps rect2 ' + rect1.overlap(rect2));
rect1.move(0, 100);
console.log('rect1 overlaps rect2 ' + rect1.overlap(rect2));