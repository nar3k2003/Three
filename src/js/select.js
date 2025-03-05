import { ref } from "vue";
import { scene, camera } from "./scene.js";
import { getIntersectionPoint, getIntersects } from "./raycaster.js";

export const isSelectMode = ref(false);
export const isHoverMode = ref(false);

let lastObject = null;

export function hoverMode(event, canvasRef, store) {
  const originalColor = store.state.select.color.originalColor;
  const hoverColor = store.state.select.color.hoverColor;
  const clickColor = store.state.select.color.clickColor;

  if (!isHoverMode.value) return;

  const intersects = getIntersects(event, canvasRef, camera, scene);

  if (intersects.length > 0) {
    const object = intersects[0].object;

    lastObject = object;

    if (object.material) {
      object.material.color.set(hoverColor);
    }

  } else {
    if (lastObject && lastObject.userData.isSelected === true) {
      lastObject.material.color.set(clickColor);
    } else if(lastObject && lastObject.userData.isSelected === false){
      lastObject.material.color.set(originalColor);
    }
  }
}

export function selectMode(event, canvasRef, store) {
  if (!isSelectMode.value) return;

  const intersectionPoint = getIntersectionPoint(event, canvasRef, camera);
  if (!intersectionPoint) return;

  const intersects = getIntersects(event, canvasRef, camera, scene);
  if (intersects.length === 0) {
    store.getters.selectedObject.forEach((object) => {
      object.userData.isSelected = false;
      object.material.color.set(store.getters.getColor.originalColor);
    });
    store.commit("clearSelectObjects");
    return;
  }

  const intersectedObject = intersects[0].object;

  if (!event.ctrlKey) {
    store.getters.selectedObject.forEach((object) => {
      object.userData.isSelected = false;
      object.material.color.set(store.getters.getColor.originalColor);
    });
    store.commit("clearSelectObjects");
  } else if (event.ctrlKey) {
    if (intersectedObject.userData.isSelected) {
      intersectedObject.userData.isSelected = false;
      intersectedObject.material.color.set(store.getters.getColor.originalColor)
      store.commit("deselectObject", intersectedObject);
      return
    } else {
      intersectedObject.userData.isSelected = true;
      intersectedObject.material.color.set(store.getters.getColor.clickColor)
      store.commit("selectCtrlObject", intersectedObject);
      return
    }
  }


  if (intersects.length > 0) {
    store.commit("selectObject", intersectedObject);
  }
}



