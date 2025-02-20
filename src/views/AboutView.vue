<template>
  <div>
    <h1>Task 1</h1>
    <button @click="toggleDrawingModeLine">
      {{ isDrawingLine ? "Stop Line" : "Start Line" }}
    </button>
    <button @click="toggleDrawingModeCircle">
      {{ isDrawingCircle ? "Stop Circle" : "Start Circle" }}
    </button>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { initScene } from "@/js/scene.js";
import { toggleDrawingModeLine, isDrawingLine } from "@/js/line.js";
import { toggleDrawingModeCircle, isDrawingCircle } from "@/js/circle.js";
import { onMouseClickLine, onMouseClickCircle, onMouseMoveCircle } from "@/js/event.js";

const canvasRef = ref();

onMounted(() => {
  initScene(canvasRef);

  window.addEventListener("click", (event) => onMouseClickLine(event, canvasRef));
  window.addEventListener("click", (event) => onMouseClickCircle(event, canvasRef));
  window.addEventListener("mousemove", (event) => onMouseMoveCircle(event, canvasRef));
});

onUnmounted(() => {
  window.removeEventListener("click", (event) => onMouseClickLine(event, canvasRef));
  window.removeEventListener("click", (event) => onMouseClickCircle(event, canvasRef));
  window.removeEventListener("mousemove", (event) => onMouseMoveCircle(event, canvasRef));
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
