<template>
  <div>
    <h1>Task 1</h1>
    <button @click="toggleDrawingModeLine">
      {{ isDrawingLine ? "Stop Line" : "Start Line" }}
    </button>
    <button @click="toggleDrawingModeCircle">
      {{ isDrawingCircle ? "Stop Circle" : "Start Circle" }}
    </button>
    <button @click="toggleDrawingModeRectangle">
      {{ isDrawingRectangle ? "Stop Rectangle" : "Start Rectangle" }}
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

const canvasRef = ref();

onMounted(() => {
  initScene(canvasRef);
  addClickEvent(canvasRef)
});

</script>

<style scoped>
canvas {
  display: block;
}
</style>
