import * as THREE from "three";
import { DragControls } from "three/addons/controls/DragControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { renderer, camera, controls, scene } from "../common";
import { getMousePosition } from "../utils/index";

const createRaycaster = (houses: THREE.Mesh[]) => {
  renderer.domElement.addEventListener("mouseup", () => {
    controls.enableRotate = true;
  });

  // 测试
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  const material = new THREE.MeshLambertMaterial({
    color: "#fafafa",
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 40, 0);
  scene.add(mesh);

  const transformControls = new TransformControls(camera, renderer.domElement);
  transformControls.addEventListener('mousedown', () => {
    console.log(1)
    controls.enableRotate = false;
    controls.enableZoom = false
  })
  transformControls.addEventListener('mouseup', () => {
    console.log(2)
    controls.enableRotate = true;
    controls.enableZoom = true
  })
    // transformControls.showX = false
    // transformControls.showY = false
    // transformControls.showZ = false
  transformControls.size = 1;
  transformControls.attach(mesh);
  transformControls.setMode("rotate");
  scene.add(transformControls);

  renderer.domElement.addEventListener("mousedown", (event: MouseEvent) => {
 
    const position = getMousePosition(event, renderer);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(position.x, position.y), camera);
    const intersects = raycaster.intersectObjects(houses);
    if (intersects.length > 0) {
      controls.enableRotate = false;
      console.log(intersects.map((item: any) => item.object.name));
      const object = intersects[0];
      //   new DragControls(intersects, camera, renderer.domElement)
    }
  });
};

export default createRaycaster;
