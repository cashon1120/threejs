import scene from "./scene";
import { createLight } from "./light";
import initOrbitContros from "./orbitControls";
import camera from "./camera";
import renderer from "./render";
import { createGui } from "./gui";
import createHelper from "./helper";

// 创建辅助坐标和平面
createHelper(scene)

// 创建灯光
createLight(scene)

// 创建Gui
createGui(renderer, scene, camera)

// 窗口大小改变回调, 这里可以加一个节流
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

export {
  scene,
  createLight,
  initOrbitContros,
  camera,
  renderer,
  createGui,
  createHelper,
};
