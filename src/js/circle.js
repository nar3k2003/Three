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
import { isDrawingRectangle } from './rectangle.js'
import { isHoverMode, isSelectMode } from './select.js'

export const isDrawingCircle = ref(false)
export const isDrawingCircleMove = ref(false)
let circle = null
let centerPoint = null
const points = []
const updatePoints = new Vector3()
const segments = 64

export function toggleDrawingModeCircle() {
  if (isDrawingCircle.value) {
    isDrawingCircle.value = false
  } else if (!isDrawingCircle.value) {
    scene.children.forEach((child) => {
      if (!child.userData.ready) {
        scene.remove(child)
      }
    })
    isDrawingCircle.value = true
    isDrawingLine.value = false
    isDrawingRectangle.value = false
    isSelectMode.value = false
    isHoverMode.value = false
  }
}

export function createCircle(position) {
  if (!isDrawingCircle.value) return

  points.push(position.clone())

  if (points.length === 1) {
    isDrawingCircleMove.value = true

    const x1 = points[0].x,
    y1 = points[0].y

    circle = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 'black' }))

    centerPoint = new Points(new BufferGeometry(), new PointsMaterial({ color: 'black', size: 0.2 }))

    centerPoint.geometry.setFromPoints([new Vector3(x1, y1, 0)])

    const positionAttribute = new BufferAttribute(new Float32Array((segments + 1) * 3), 3)

    circle.geometry.setAttribute('position', positionAttribute)

    scene.add(circle)
    circle.add(centerPoint)
    console.log("scene: ", scene);

  }

  if (points.length === 2) {
    isDrawingCircleMove.value = false
    circle.userData.type = 'circle'
    circle.userData.isSelected = false
    circle.children[0].userData.ready = true
    circle.children[0].userData.parentType = 'circle'
    circle.children[0].userData.isSelected = false
    circle.userData.ready = true
    console.log("circle: ", circle);
    points.length = 0
    circle = null
  }
}

export function updateCircle(position) {
  if (!isDrawingCircleMove.value || points.length === 0) return

  updatePoints.copy(position)
  const radius = points[0].distanceTo(updatePoints)
  const center = points[0]
  const angleStep = (Math.PI * 2) / segments

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

  circle.geometry.setAttribute('position', positionAttribute)

  circle.traverse((child) => {
    child.geometry.computeBoundingSphere();
  });
}
