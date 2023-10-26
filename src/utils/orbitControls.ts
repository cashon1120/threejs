import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import stats from "../utils/stats";

// 相机控件
const initOrbitContros = (renderer: THREE.Renderer, scene: THREE.Scene, camera: THREE.Camera, ) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", () => {
      stats.update();
      renderer.render(scene, camera);
    });
}

export default initOrbitContros