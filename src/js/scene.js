import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  AxesHelper,
  GridHelper,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const scene = new Scene()
export let camera, renderer, controls

export function initScene(canvasRef) {
  const aspectRatio = 1000 / 600
  camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000)
  camera.position.set(0, 0, 15)
  camera.lookAt(0, 0, 0)

  renderer = new WebGLRenderer({ canvas: canvasRef.value, antialias: true })
  renderer.setSize(1000, 600)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  const light = new AmbientLight(0xffffff, 1)
  scene.add(light)

  const axesHelper = new AxesHelper(6)
  scene.add(axesHelper)

  const gridHelper = new GridHelper(11, 11)
  gridHelper.rotation.x = Math.PI / 2
  scene.add(gridHelper)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
}
