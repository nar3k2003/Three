import { getIntersectionPoint } from './raycaster.js'
import { createCircle, updateCircle, isDrawingCircle, isDrawingCircleMove } from './circle.js'
import { createLine, isDrawingLine } from './line.js'
import { camera } from './scene.js'

export function onMouseClickLine(event, canvasRef) {
  if (!isDrawingLine.value) return
  if (event.target !== canvasRef.value) return

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) createLine(intersectionPoint)
}

export function onMouseClickCircle(event, canvasRef) {
  if (!isDrawingCircle.value) return
  if (event.target !== canvasRef.value) return

  isDrawingCircleMove.value = !isDrawingCircleMove.value

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) createCircle(intersectionPoint)
}

export function onMouseMoveCircle(event, canvasRef) {
  if (!isDrawingCircleMove.value) return
  if (event.target !== canvasRef.value) return

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) updateCircle(intersectionPoint)
}
