import { Raycaster, Vector2, Vector3, Plane } from 'three'

export const raycaster = new Raycaster()
export const mouse = new Vector2()
export const plane = new Plane(new Vector3(0, 0, 1), 0)

export let intersects = []

raycaster.params.Line.threshold = 0.2
raycaster.params.Points.threshold = 0.2

export function getIntersectionPoint(event, canvasRef, camera) {
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  const intersectionPoint = new Vector3()
  if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
    return intersectionPoint
  }
  return null
}

export function getIntersects(event, canvasRef, camera, scene) {
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  intersects = raycaster.intersectObjects(scene.children, true)
  console.log("intersects: ", intersects);
  // console.log("raycaster.ray.direction: ", raycaster.ray.direction);
  // console.log("raycaster.ray.origin: ", raycaster.ray.origin);
  // console.log("raycaster.ray: ", raycaster.ray);
  // console.log("raycaster: ", raycaster);
  console.log("scene: ", scene);

  return intersects

  // return raycaster.intersectObjects(scene.children, true)
}
