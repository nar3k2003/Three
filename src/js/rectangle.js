import { BufferGeometry, LineBasicMaterial, Line, PointsMaterial, Points, Vector3 } from 'three'
import { ref } from 'vue'
import { scene } from './scene.js'
import { isDrawingLine } from './line.js'
import { isDrawingCircle } from './circle.js'

export const isDrawingRectangle = ref(false)
export const isDrawingRectangleMove = ref(false)

const rectangles = []
const points = []

export function toggleDrawingModeRectangle() {
  if (isDrawingRectangle.value) {
    isDrawingRectangle.value = false
  } else {
    isDrawingRectangle.value = true
    isDrawingLine.value = false
    isDrawingCircle.value = false
  }
}

export function createRectangle(position) {
  points.push(position.clone())

  if (points.length === 1) {
    isDrawingRectangleMove.value = true

    for (let i = 0; i < 4; i++) {
      rectangles[i] = new Line(new BufferGeometry(), new LineBasicMaterial({ color: 'blue' }))
      scene.add(rectangles[i])
      rectangles[i].userData.type = 'rectangle'
    }
    rectangles.forEach((line) => {
      const linePoints = [
        new Points(new BufferGeometry(), new PointsMaterial({ color: 'blue', size: 0.2 })),
        new Points(new BufferGeometry(), new PointsMaterial({ color: 'blue', size: 0.2 })),
      ]
      line.add(...linePoints)
      line.children.forEach((point) => {
        point.userData.parentType = 'rectangle'
      })
    })
  }

  if (points.length === 2) {
    isDrawingRectangleMove.value = false
    points.length = 0
    console.log("rectangles: ", rectangles);
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
    rectangles[i].children.forEach((point, j) => {
      point.geometry.setFromPoints([linePoints[j]])
    })
    rectangles[i].geometry.setFromPoints(linePoints)
  })
}
