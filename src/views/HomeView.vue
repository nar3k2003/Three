<template>
  <div>
    <h1>Task 1</h1>
    <button>Cilcle</button>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
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
  // CubicBezierCurve
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvasRef = ref()

onMounted(() => {
  const scene = new Scene()

  const aspectRatio = 1000 / 600
  const camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000)
  camera.position.set(0, 0, 15)
  camera.lookAt(0, 0, 0)

  const renderer = new WebGLRenderer({ canvas: canvasRef.value, antialias: true })
  renderer.setSize(1000, 600)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const light = new AmbientLight(0xffffff, 1)
  scene.add(light)

  const axesHelper = new AxesHelper(6)
  scene.add(axesHelper)

  const gridHelper = new GridHelper(10, 10)
  gridHelper.rotation.x = Math.PI / 2
  scene.add(gridHelper)

  const raycaster = new Raycaster()
  const mouse = new Vector2()
  const plane = new Plane(new Vector3(0, 0, 1), 0)

  const points = []

  const lineMaterial = new LineBasicMaterial({ color: 0xff0000 })

  let geometry = new BufferGeometry()
  let line = new Line(geometry, lineMaterial)
  scene.add(line)

  function createCircle(position) {
    const circleGeometry = new CircleGeometry(0.05, 32);
    const circleMaterial = new MeshBasicMaterial({ color: 0xff0000, side: 2 });
    const circle = new Mesh(circleGeometry, circleMaterial);

    circle.position.copy(position);
    scene.add(circle);

    points.push(position.clone());

    if (points.length === 2) {
      const lineGeometry = new BufferGeometry().setFromPoints(points);
      const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });
      const line = new Line(lineGeometry, lineMaterial);
      scene.add(line);
      console.log("StartPoint: ", points[0]);
      console.log("FinishPoint: ", points[1]);
      const distance = points[0].distanceTo(points[1])
      console.log("distance :", distance);


      points.length = 0;
    }
  }


  function onMouseClick(event) {
    const rect = renderer.domElement.getBoundingClientRect()

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    const intersectionPoint = new Vector3()
    if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
      createCircle(intersectionPoint)
    }
  }

  window.addEventListener('click', onMouseClick)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  return () => {
    window.removeEventListener('click', onMouseClick)
  }
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
