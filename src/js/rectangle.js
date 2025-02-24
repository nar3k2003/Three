import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  Line,
  PointsMaterial,
  Points,
  Vector3,
} from 'three';
import { ref } from 'vue';
import { scene } from './scene.js';
import { isDrawingLine } from './line.js';
import { isDrawingCircle } from './circle.js';

export const isDrawingRectangle = ref(false);
export const isDrawingRectangleMove = ref(false);

let point2 = null;
let point3 = null;
let point4 = null;
let rectangleLine1 = null;
let rectangleLine2 = null;
let rectangleLine3 = null;
let rectangleLine4 = null;

const points = [];
const updatePoints = new Vector3();

export function toggleDrawingModeRectangle() {
  if (isDrawingRectangle.value) {
    isDrawingRectangle.value = false;
  } else {
    isDrawingRectangle.value = true;
    isDrawingLine.value = false;
    isDrawingCircle.value = false;
  }
}

export function createRectangle(position) {
  points.push(position.clone());

  if (points.length === 1) {
    isDrawingRectangleMove.value = true;

    const point1Geometry = new BufferGeometry();
    const point2Geometry = new BufferGeometry();
    const point3Geometry = new BufferGeometry();
    const point4Geometry = new BufferGeometry();

    point1Geometry.setFromPoints([new Vector3(position.x, position.y, 0)]);
    point2Geometry.setFromPoints([new Vector3(position.x, position.y, 0)]);
    point3Geometry.setFromPoints([new Vector3(position.x, position.y, 0)]);
    point4Geometry.setFromPoints([new Vector3(position.x, position.y, 0)]);

    const pointMaterial = new PointsMaterial({ color: 'blue', size: 0.2 });
    const point1 = new Points(point1Geometry, pointMaterial);
    point2 = new Points(point2Geometry, pointMaterial);
    point3 = new Points(point3Geometry, pointMaterial);
    point4 = new Points(point4Geometry, pointMaterial);

    const geometry1 = new BufferGeometry();
    const geometry2 = new BufferGeometry();
    const geometry3 = new BufferGeometry();
    const geometry4 = new BufferGeometry();

    const lineMaterial = new LineBasicMaterial({ color: 'blue' });
    rectangleLine1 = new Line(geometry1, lineMaterial);
    rectangleLine2 = new Line(geometry2, lineMaterial);
    rectangleLine3 = new Line(geometry3, lineMaterial);
    rectangleLine4 = new Line(geometry4, lineMaterial);

    scene.add(rectangleLine1, rectangleLine2, rectangleLine3, rectangleLine4);

    rectangleLine1.children.push(point1, point2);
    rectangleLine2.children.push(point2, point3);
    rectangleLine3.children.push(point3, point4);
    rectangleLine4.children.push(point4, point1);
  }

  if (points.length === 2) {
    isDrawingRectangleMove.value = false;
    points.length = 0;
  }
}

export function updateRectangle(position) {
  if (!isDrawingRectangleMove.value || points.length === 0) return;

  updatePoints.copy(position);

  const x1 = points[0].x, y1 = points[0].y;
  const x2 = updatePoints.x, y2 = updatePoints.y;

  const positions1 = new Float32Array([x1, y1, 0, x1, y2, 0]);
  const positions2 = new Float32Array([x1, y2, 0, x2, y2, 0]);
  const positions3 = new Float32Array([x2, y2, 0, x2, y1, 0]);
  const positions4 = new Float32Array([x2, y1, 0, x1, y1, 0]);

  rectangleLine1.geometry.setAttribute('position', new BufferAttribute(positions1, 3));
  rectangleLine2.geometry.setAttribute('position', new BufferAttribute(positions2, 3));
  rectangleLine3.geometry.setAttribute('position', new BufferAttribute(positions3, 3));
  rectangleLine4.geometry.setAttribute('position', new BufferAttribute(positions4, 3));

  point2.geometry.setAttribute('position', new BufferAttribute(new Float32Array([x1, y2, 0]), 3));
  point3.geometry.setAttribute('position', new BufferAttribute(new Float32Array([x2, y1, 0]), 3));
  point4.geometry.setAttribute('position', new BufferAttribute(new Float32Array([x2, y2, 0]), 3));
}
