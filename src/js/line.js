import {
  BufferGeometry,
  // BufferAttribute,
  LineBasicMaterial,
  Line,
  PointsMaterial,
  Points,
  Vector3,
} from 'three'
import { ref } from 'vue'
import { scene } from './scene.js'
import { isDrawingCircle } from './circle.js'
import { isDrawingRectangle } from './rectangle.js'
import { isHoverMode, isSelectMode } from './select.js'

export const isDrawingLine = ref(false)
export const isDrawingLineMove = ref(false)

const points = []
let line = null

export function toggleDrawingModeLine() {
  if (isDrawingLine.value) {
    isDrawingLine.value = false
  } else if (!isDrawingLine.value) {
      scene.children.forEach((child) => {
        if (!child.userData.ready) {
          scene.remove(child)
        }
      })
    isDrawingLine.value = true
    isDrawingCircle.value = false
    isDrawingRectangle.value = false
    isSelectMode.value = false
    isHoverMode.value = false
  }
}

export function createLine(position) {
  points.push(position.clone())
  if (!isDrawingLine.value) return

  if (points.length === 1) {
    isDrawingLineMove.value = true

    line = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 'black' }))

    const linePoints = [
      new Points(new BufferGeometry(), new PointsMaterial({ color: 'black', size: 0.2 })),
      new Points(new BufferGeometry(), new PointsMaterial({ color: 'black', size: 0.2 })),
    ]

    line.add(...linePoints)
    scene.add(line)
    console.log("scene: ", scene);

  }

  if (points.length === 2) {
    isDrawingLineMove.value = false
    line.userData.ready = true
    line.name = 'line'
    line.userData.type = 'line'
    line.userData.isSelected = false

    line.children.forEach((children) => {
      children.name = 'line'
      children.userData.parentType = 'line'
      children.userData.isSelected = false
      children.userData.ready = true
    })
    points.length = 0
    console.log("line: ", line);
    console.log("scene: ", scene);

    line = null
  }
}

export function updateLine(position) {
  if (!isDrawingLineMove.value || points.length === 0) return

  const x1 = points[0].x,
    y1 = points[0].y
  const x2 = position.x,
    y2 = position.y

  const updPoints = [
    new Vector3(x1, y1, 0),
    new Vector3(x2, y2, 0)
  ]

  line.geometry.setFromPoints(updPoints)
  updPoints.forEach((point, index) => {
    line.children[index].geometry.setFromPoints([point])
  })

  line.traverse((child) => {
    child.geometry.computeBoundingSphere();
  });
}
