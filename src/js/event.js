import { getIntersectionPoint } from './raycaster.js'
import { createCircle, updateCircle, isDrawingCircle } from './circle.js'
import { createLine, updateLine, isDrawingLine } from './line.js'
import { createRectangle, updateRectangle, isDrawingRectangle } from './rectangle.js'
import { camera } from './scene.js'
import { isSelectMode, selectMode, isHoverMode, hoverMode } from './select.js'

export function addClickEvent(canvasRef, store) {
  console.log("store: ", store.getters.getColor);

  window.addEventListener("click", (event) => {
    if (isDrawingLine.value) {
      if (event.target !== canvasRef.value) return
      const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
      if (intersectionPoint) createLine(intersectionPoint)
    } else if (isDrawingCircle.value) {
      if (event.target !== canvasRef.value) return
      const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
      if (intersectionPoint) createCircle(intersectionPoint)
    } else if (isDrawingRectangle.value) {
      if (event.target !== canvasRef.value) return
      const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
      if (intersectionPoint) createRectangle(intersectionPoint)
    } else if(!isDrawingLine.value && !isDrawingCircle.value && !isDrawingRectangle.value ) {
      if (event.target !== canvasRef.value) return;
      isSelectMode.value = true;
      isHoverMode.value = true;
      selectMode(event, canvasRef, store);
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (isDrawingLine.value) {
      if (event.target !== canvasRef.value) return
      const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
      if (intersectionPoint) updateLine(intersectionPoint)
    } else if (isDrawingCircle.value) {
      if (event.target !== canvasRef.value) return
      const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
      if (intersectionPoint) updateCircle(intersectionPoint)
    } else if (isDrawingRectangle.value) {
      if (event.target !== canvasRef.value) return
      const intersectionPoint = getIntersectionPoint(event, canvasRef, camera)
      if (intersectionPoint) updateRectangle(intersectionPoint)
    } else if(!isDrawingLine.value && !isDrawingCircle.value && !isDrawingRectangle.value ) {
      if (event.target !== canvasRef.value) return;
      isSelectMode.value = true;
      isHoverMode.value = true;
      hoverMode(event, canvasRef, store);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      isDrawingLine.value = false;
      isDrawingCircle.value = false;
      isDrawingRectangle.value = false;
      isSelectMode.value = true;
    }
  });
}

