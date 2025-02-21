import { getIntersectionPoint } from './raycaster.js'
import { createCircle, updateCircle, isDrawingCircle, isDrawingCircleMove } from './circle.js'
import { createLine, updateLine, isDrawingLine, isDrawingLineMove } from './line.js'
import { camera } from './scene.js'

export function addClickEvent(canvasRef) {

  window.addEventListener('click', (event) => {
    if (isDrawingLine.value){
      onMouseClickLine(event, canvasRef)
    } else if (isDrawingCircle.value) {
      onMouseClickCircle(event, canvasRef)
    }
  })

  window.addEventListener('mousemove', (event) => {
    if (isDrawingLineMove.value){
      onMouseMoveLine(event, canvasRef)
    } else if (isDrawingCircleMove.value) {
      onMouseMoveCircle(event, canvasRef)
    }
  })
}

function onMouseClickLine(event, canvasRef) {
  if (!isDrawingLine.value) return
  if (event.target !== canvasRef.value) return

  isDrawingLineMove.value = !isDrawingLineMove.value

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) createLine(intersectionPoint)
}

function onMouseMoveLine(event, canvasRef) {
  if (!isDrawingLineMove.value) return
  if (event.target !== canvasRef.value) return

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) updateLine(intersectionPoint)
}

function onMouseClickCircle(event, canvasRef) {
  if (!isDrawingCircle.value) return
  if (event.target !== canvasRef.value) return

  isDrawingCircleMove.value = !isDrawingCircleMove.value

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) createCircle(intersectionPoint)
}

function onMouseMoveCircle(event, canvasRef) {
  if (!isDrawingCircleMove.value) return
  if (event.target !== canvasRef.value) return

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
  if (intersectionPoint) updateCircle(intersectionPoint)
}
