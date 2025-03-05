import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  GridHelper,
  Color,
  Raycaster,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const scene = new Scene();
export let camera, renderer, controls;
export const raycaster = new Raycaster();

export function initScene(canvasRef) {
  const aspectRatio = 1000 / 600;
  camera = new PerspectiveCamera(45, aspectRatio, 0.01, 1000);
  camera.position.set(0, 0, 16);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
  camera.aspectRatio = aspectRatio;

  renderer = new WebGLRenderer({ canvas: canvasRef.value, antialias: true });
  renderer.setSize(1000, 600);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const light = new AmbientLight(0xffffff, 1);
  scene.add(light);

  const gridHelper = new GridHelper(12, 12);
  gridHelper.rotation.x = Math.PI / 2;

  scene.background = new Color("white");

  // const raycasterHelper = new RaycasterHelper(raycaster);
  // scene.add(raycasterHelper);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
