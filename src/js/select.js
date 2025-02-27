import { ref } from "vue";
import { scene, camera } from "./scene.js";
import { getIntersectionPoint, getIntersects } from "./raycaster.js";
import { isDrawingLine, isDrawingLineMove } from "./line.js";
import { isDrawingCircle, isDrawingCircleMove } from "./circle.js";
import { isDrawingRectangle, isDrawingRectangleMove } from "./rectangle.js";


export const isSelectMode = ref(false);
export const isHoverMode = ref(false);

export function toggleSelectMode() {
  if (isSelectMode.value) {
    isSelectMode.value = false;
    isHoverMode.value = false;

  } else {
    isSelectMode.value = true;
    isHoverMode.value = true;
    isDrawingLine.value = false;
    isDrawingCircle.value = false;
    isDrawingRectangle.value = false;
    isDrawingLineMove.value = false;
    isDrawingCircleMove.value = false;
    isDrawingRectangleMove.value = false;
  }
}

let lastObject = null;

export function hoverMode(event, canvasRef, store) {
  const originalColor = store.state.select.color.originalColor;
  const hoverColor = store.state.select.color.hoverColor;

  if (!isHoverMode.value) return;

  // const intersectionPoint = getIntersectionPoint(event, canvasRef, camera);
  // if (!intersectionPoint) return;

  const intersects = getIntersects(event, canvasRef, camera, scene);
  // console.log("intersectsH: ", intersects);

  if (intersects.length > 0) {
    const object = intersects[0].object;

    lastObject = object;

    if (object.material) {
      object.material.color.set(hoverColor);
    }
    if (object.parent && object.parent.material) {
      object.parent.material.color.set(hoverColor);
    }
  } else {
    if (lastObject) {
      if (lastObject.material) {
        lastObject.material.color.set(originalColor);
      }
      if (lastObject.parent && lastObject.parent.material) {
        lastObject.parent.material.color.set(originalColor);
      }
      lastObject = null;
    }
  }
}


export function selectMode(event, canvasRef, store) {
  if (!isSelectMode.value) return;

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera);
  if (!intersectionPoint) return;

  const intersects = getIntersects(event, canvasRef, camera, scene);
  console.log("intersectsC: ", intersects);
  console.log("scene: ", scene);
  console.log("store: ", store);
}




