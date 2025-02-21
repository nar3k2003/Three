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
import { isDrawingLine } from './line.js'

export const isDrawingCircle = ref(false)
export const isDrawingCircleMove = ref(false)
let currentCircle = null
const points = []
const updatePoints = new Vector3()
const segments = 64

export function toggleDrawingModeCircle() {
  if (isDrawingCircle.value) {
    isDrawingCircle.value = false
  } else {
    isDrawingCircle.value = true
    isDrawingLine.value = false
  }
}

export function createCircle(position) {
  points.push(position.clone())

  if (points.length === 1) {
    isDrawingCircleMove.value = true
    updatePoints.copy(position)

    const pointGeometry = new BufferGeometry()
    pointGeometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([position.x, position.y, 0]), 3),
    )
    const pointMaterial = new PointsMaterial({ color: 0xff0000, size: 0.2 })
    const centerPoint = new Points(pointGeometry, pointMaterial)
    scene.add(centerPoint)

    const geometry = new BufferGeometry()
    const positions = new Float32Array((segments + 1) * 3)
    const positionAttribute = new BufferAttribute(positions, 3)
    geometry.setAttribute('position', positionAttribute)

    const material = new LineBasicMaterial({ color: 0xff0000 })
    currentCircle = new Line(geometry, material)
    scene.add(currentCircle)
  }

  if (points.length === 2) {
    isDrawingCircleMove.value = false
    points.length = 0
  }
}

export function updateCircle(position) {
  if (!isDrawingCircleMove.value || points.length === 0) return

  updatePoints.copy(position)
  const radius = points[0].distanceTo(updatePoints)
  const center = points[0]
  const angleStep = (Math.PI * 2) / segments

  if (currentCircle) {
    scene.remove(currentCircle)
  }

  const geometry = new BufferGeometry()
  const positions = new Float32Array((segments + 1) * 3)
  const positionAttribute = new BufferAttribute(positions, 3)

  for (let segment = 0; segment <= segments; segment++) {
    const angle = angleStep * segment
    positionAttribute.setXYZ(
      segment,
      center.x + Math.cos(angle) * radius,
      center.y + Math.sin(angle) * radius,
      0,
    )
  }

  geometry.setAttribute('position', positionAttribute)
  const material = new LineBasicMaterial({ color: 0xff0000 })
  currentCircle = new Line(geometry, material)
  scene.add(currentCircle)
}
