<template>
  <div>
    <div class="buttons">
      <button @click="toggleDrawingModeLine" :class="{ active: isDrawingLine }">Line</button>
      <button @click="toggleDrawingModeCircle" :class="{ active: isDrawingCircle }">Circle</button>
      <button @click="toggleDrawingModeRectangle" :class="{ active: isDrawingRectangle }">
        Rectangle
      </button>
      <div class="select" :class="{ activeSel: isSelectMode }">Select mode</div>
    </div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { initScene } from '@/js/scene.js'
import { addClickEvent } from '@/js/event.js'
import { isDrawingCircle, toggleDrawingModeCircle } from '@/js/circle'
import { isDrawingLine, toggleDrawingModeLine } from '@/js/line'
import { isDrawingRectangle, toggleDrawingModeRectangle } from '@/js/rectangle'
import { isSelectMode,  } from '@/js/select'

const canvasRef = ref()

import { useStore } from 'vuex'
const store = useStore()

watch(
  () => store.getters.selectedObject,
  (newValue, oldValue) => {

    if (newValue && newValue.length > 0) {
      const lastNewObject = newValue[newValue.length - 1]
      if (lastNewObject.material) {
        lastNewObject.material.color.set(store.getters.getColor.clickColor)
        lastNewObject.userData.isSelected = true
      }
    }

    if (oldValue && oldValue.length > 0) {
      const lastOldObject = oldValue[oldValue.length - 1]
      if (lastOldObject.material) {
        lastOldObject.material.color.set(store.getters.getColor.originalColor)
        lastOldObject.userData.isSelected = false
      }
    }
  },
)

onMounted(() => {
  initScene(canvasRef)
  addClickEvent(canvasRef, store)
});
</script>

<style scoped>
canvas {
  display: block;
  border: 1px solid rgb(145, 145, 145);
}

button {
  margin: 5px;
  padding: 5px;
  border: 1px solid rgb(145, 145, 145);
  background-color: white;
  color: rgb(145, 145, 145);
  cursor: pointer;
}

.select{
  margin: 5px;
  padding: 5px;
  border: 1px solid rgb(145, 145, 145);
  background-color: white;
  color: rgb(145, 145, 145);
  width: 100px;
  height: 20px;
  text-align: center;
}

.buttons{
  display: flex;
  justify-content: center;
}

.activeSel{
  background-color: grey;
  color: white;
}

.active {
  background-color: green;
  color: white;
}
</style>
