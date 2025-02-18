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
import { onMounted, ref, onUnmounted } from "vue";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Raycaster,
  Vector2,
  Vector3,
  CircleGeometry,
  MeshBasicMaterial,
  Mesh,
  AxesHelper,
  GridHelper,
  Plane,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  PointsMaterial,
  Points,
  // Object3D,
  // BufferAttribute,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvasRef = ref();
const isDrawingLine = ref(false);
const isDrawingCircle = ref(false);
const scene = new Scene();
const points = [];
const raycaster = new Raycaster();
const mouse = new Vector2();
const plane = new Plane(new Vector3(0, 0, 1), 0);
let renderer, camera, controls;

onMounted(() => {
  const aspectRatio = 1000 / 600;
  camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000);
  camera.position.set(0, 0, 15);
  camera.lookAt(0, 0, 0);

  renderer = new WebGLRenderer({ canvas: canvasRef.value, antialias: true });
  renderer.setSize(1000, 600);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new AmbientLight(0xffffff, 1);
  scene.add(light);

  const axesHelper = new AxesHelper(6);
  scene.add(axesHelper);

  const gridHelper = new GridHelper(10, 10);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});

function toggleDrawingModeLine() {
  if (isDrawingLine.value) {
    isDrawingLine.value = false;
    window.removeEventListener("click", onMouseClickLine);
    points.length = 0;
  } else {
    isDrawingLine.value = true;
    isDrawingCircle.value = false;
    window.addEventListener("click", onMouseClickLine);
    window.removeEventListener("click", onMouseClickCircle);
    points.length = 0;
  }
}

function toggleDrawingModeCircle() {
  if (isDrawingCircle.value) {
    isDrawingCircle.value = false;
    window.removeEventListener("click", onMouseClickCircle);
    points.length = 0;
  } else {
    isDrawingCircle.value = true;
    isDrawingLine.value = false;
    window.addEventListener("click", onMouseClickCircle);
    window.removeEventListener("click", onMouseClickLine);
    points.length = 0;
  }
}

function onMouseClickLine(event) {
  if (!isDrawingLine.value) return;
  if (event.target !== canvasRef.value) return;

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersectionPoint = new Vector3();
  if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
    createLine(intersectionPoint);
  }
}

function onMouseClickCircle(event) {
  if (!isDrawingCircle.value) return;
  if (event.target !== canvasRef.value) return;

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersectionPoint = new Vector3();
  if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
    createCircle(intersectionPoint);
  }
}

function createLine(position) {
  points.push(position.clone());

  const circleGeometry = new CircleGeometry(0.05, 32);
  const circleMaterial = new MeshBasicMaterial({ color: 0xff0000, side: 2 });
  const circle = new Mesh(circleGeometry, circleMaterial);

  // const pointGeometry = new BufferGeometry().setFromPoints([position]);
  // const pointMaterial = new PointsMaterial({ color: 0xff0000, side: 0.1});
  // const centerPoint = new Points(pointGeometry, pointMaterial);

  console.log("position: ", position.clone());


  // centerPoint.position.copy(position);
  circle.position.copy(position);
  scene.add(circle);
  // scene.add(centerPoint);


  if (points.length === 2) {
    const lineGeometry = new BufferGeometry().setFromPoints(points);
    const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });
    const line = new Line(lineGeometry, lineMaterial);
    scene.add(line);
    points.length = 0;
  }
}

function createCircle(position) {
  points.push(position.clone());

  if (points.length === 2) {
    const radius = points[0].distanceTo(points[1]);
    const center = points[0];
    const segments = 64;
    const angleStep = (Math.PI * 2) / segments;

    const positions = [];

    for (let segment = 0; segment <= segments; segment++) {
      const angle = angleStep * segment;
      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;

      positions.push(new Vector3(x, y, 0));
    }

    const geometry = new BufferGeometry().setFromPoints(positions);
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    const circle = new Line(geometry, material);
    scene.add(circle);

    const pointGeometry = new BufferGeometry().setFromPoints([center]);
    const pointMaterial = new PointsMaterial({ color: 0xff0000, size: 0.2 });
    const centerPoint = new Points(pointGeometry, pointMaterial);
    circle.children.push(centerPoint);
    points.length = 0;
  }
}


onUnmounted(() => {
  window.removeEventListener("click", onMouseClickLine);
  window.removeEventListener("click", onMouseClickCircle);
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
