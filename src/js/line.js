import { ref } from 'vue'
import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  Line,
  PointsMaterial,
  Points,
} from 'three'
import { scene } from './scene.js'
import { isDrawingCircle } from './circle.js'

export const isDrawingLine = ref(false)
const points = []

export function toggleDrawingModeLine() {
  if (isDrawingLine.value) {
    isDrawingLine.value = false
  } else {
    isDrawingLine.value = true
    isDrawingCircle.value = false
  }
}

export function createLine(position) {
  points.push(position.clone())

  const pointGeometry = new BufferGeometry()
  pointGeometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array([position.x, position.y, 0]), 3),
  )

  const pointMaterial = new PointsMaterial({ color: 'green', size: 0.2 })
  const centerPoint = new Points(pointGeometry, pointMaterial)
  scene.add(centerPoint)

  if (points.length === 2) {
    const lineGeometry = new BufferGeometry().setFromPoints(points)
    const lineMaterial = new LineBasicMaterial({ color: 'green' })
    const line = new Line(lineGeometry, lineMaterial)
    scene.add(line)
    points.length = 0
  }
}
