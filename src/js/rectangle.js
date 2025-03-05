import { BufferGeometry, LineBasicMaterial, Line, PointsMaterial, Points, Vector3 } from 'three'
import { ref } from 'vue'
import { scene } from './scene.js'
import { isDrawingLine } from './line.js'
import { isDrawingCircle } from './circle.js'
import { isHoverMode, isSelectMode } from './select.js'

export const isDrawingRectangle = ref(false)
export const isDrawingRectangleMove = ref(false)

const rectangles = []
const points = []

export function toggleDrawingModeRectangle() {
  if (isDrawingRectangle.value) {
    isDrawingRectangle.value = false
  } else {
    [...scene.children].forEach((child) => {
      if (!child.userData || !child.userData.ready) {
        scene.remove(child)
      }
    });
    rectangles.length = 0
    isDrawingRectangle.value = true
    isDrawingLine.value = false
    isDrawingCircle.value = false
    isSelectMode.value = false
    isHoverMode.value = false
  }
}

export function createRectangle(position) {
  if (!isDrawingRectangle.value) return

  points.push(position.clone())

  if (points.length === 1) {
    isDrawingRectangleMove.value = true

    for (let i = 0; i < 4; i++) {
      rectangles[i] = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 'black' }))
      scene.add(rectangles[i])
    }

    rectangles.forEach((line) => {
      if (!line) return

      const point1 = new Points(new BufferGeometry(), new PointsMaterial({ color: 'black', size: 0.2 }))
      const point2 = new Points(new BufferGeometry(), new PointsMaterial({ color: 'black', size: 0.2 }))
      point2.visible = false

      line.add(point1, point2)

      line.userData = { type: 'rectangle', isSelected: false, ready: false }

      line.children.forEach((point) => {
        point.userData = { parentType: 'rectangle', isSelected: false, ready: false }
      })
    })
  }

  if (points.length === 2) {
    rectangles.forEach((line) => {
      if (!line) return

      line.userData.ready = true
      line.name = 'rectangle'

      line.children.forEach((point) => {
        point.userData.ready = true
      })
    })

    isDrawingRectangleMove.value = false
    points.length = 0
  }
}

export function updateRectangle(position) {
  if (!isDrawingRectangleMove.value || points.length === 0) return

  const x1 = points[0].x,
    y1 = points[0].y
  const x2 = position.x,
    y2 = position.y

  const updPoints = [
    new Vector3(x1, y1, 0),
    new Vector3(x1, y2, 0),
    new Vector3(x2, y2, 0),
    new Vector3(x2, y1, 0),
  ]

  const linePositions = [
    [updPoints[0], updPoints[1]],
    [updPoints[1], updPoints[2]],
    [updPoints[2], updPoints[3]],
    [updPoints[3], updPoints[0]],
  ]

  linePositions.forEach((linePoints, i) => {
    if (!rectangles[i]) return

    rectangles[i].children.forEach((point, j) => {
      if (point.geometry) {
        point.geometry.setFromPoints([linePoints[j]])
      }
    })
    rectangles[i].geometry.setFromPoints(linePoints)
  })

  rectangles.forEach((rectangle) => {
    if (rectangle) {
      rectangle.traverse((child) => {
        if (child.geometry) {
          child.geometry.computeBoundingSphere()
        }
      })
    }
  })
}
