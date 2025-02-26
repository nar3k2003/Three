<template>
  <div>
    <button @click="toggleDrawingModeLine" :class="{active: isDrawingLine}">
      Line
    </button>
    <button @click="toggleDrawingModeCircle" :class="{active: isDrawingCircle}">
      Circle
    </button>
    <button @click="toggleDrawingModeRectangle" :class="{active: isDrawingRectangle}">
      Rectangle
    </button>
    <button @click="toggleSelectMode" :class="{active: isSelectMode}">
      Select mode
    </button>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { initScene } from "@/js/scene.js";
import { addClickEvent } from "@/js/event.js";
import { isDrawingCircle, toggleDrawingModeCircle } from "@/js/circle";
import { isDrawingLine, toggleDrawingModeLine } from "@/js/line";
import { isDrawingRectangle, toggleDrawingModeRectangle } from "@/js/rectangle";
import { isSelectMode, toggleSelectMode} from "@/js/select";

const canvasRef = ref();

import { useStore } from "vuex";
const store = useStore();


onMounted(() => {
  initScene(canvasRef);
  addClickEvent(canvasRef, store);
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

.active{
  background-color: green;
  color: white;

}
</style>
