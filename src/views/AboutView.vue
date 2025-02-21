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
import { ref, onMounted } from "vue";
import { initScene } from "@/js/scene.js";
import { toggleDrawingModeLine, isDrawingLine } from "@/js/line.js";
import { toggleDrawingModeCircle, isDrawingCircle } from "@/js/circle.js";
import { addClickEvent } from "@/js/event.js";

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
