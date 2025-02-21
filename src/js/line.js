import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  Line,
  PointsMaterial,
  Points,
  Vector3,
} from 'three'
import { ref } from 'vue'
import { scene } from './scene.js'
import { isDrawingCircle } from './circle.js'

export const isDrawingLine = ref(false)
export const isDrawingLineMove = ref(false)

const points = []
let currentLine = null
let endPoint = null
const updatePoints = new Vector3()

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

  if (points.length === 1) {
    isDrawingLineMove.value = true
    const pointGeometry = new BufferGeometry()
    const startPointGeometry = new BufferGeometry()

    startPointGeometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([position.x, position.y, 0]), 3),
    )

    pointGeometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([position.x, position.y, 0]), 3),
    )
    const pointMaterial = new PointsMaterial({ color: 'green', size: 0.2 })
    const startPoint = new Points(startPointGeometry, pointMaterial)
    endPoint = new Points(pointGeometry, pointMaterial)
    scene.add(startPoint)
    scene.add(endPoint)

    const geometry = new BufferGeometry()
    const positions = new Float32Array(3)
    const positionAttribute = new BufferAttribute(positions, 3)
    geometry.setAttribute('position', positionAttribute)

    const lineMaterial = new LineBasicMaterial({ color: 'green' })
    currentLine = new Line(geometry, lineMaterial)
    scene.add(currentLine)
  }

  if (points.length === 2) {
    isDrawingLineMove.value = false
    points.length = 0
    currentLine = null
  }
}

export function updateLine(position) {
  if (!isDrawingLineMove.value || points.length === 0) return
  updatePoints.copy(position)

  const positions = new Float32Array(6)
  const positionAttribute = new BufferAttribute(positions, 3)

  const positionPoint = new Float32Array(3)
  const positionPointAttribute = new BufferAttribute(positionPoint, 3)

  positionAttribute.setXYZ(0, points[0].x, points[0].y, 0)
  positionAttribute.setXYZ(1, updatePoints.x, updatePoints.y, 0)
  positionPointAttribute.setXYZ(0, updatePoints.x, updatePoints.y, 0)

  endPoint.geometry.setAttribute('position', positionPointAttribute)
  currentLine.geometry.setAttribute('position', positionAttribute)
}
