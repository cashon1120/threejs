import "./style.css";

import scene from "./utils/scene";
import {createLight} from './utils/light'
import initOrbitContros from "./utils/orbitControls";
import camera from "./utils/camera";
import renderer from "./utils/render";
import {createGui} from "./utils/gui";
import createHelper from "./utils/helper";
import init from './360/index'
import initCubeBasic from "./model/cube_basic"


// 创建辅助坐标和平面
createHelper(scene)

// 创建灯光
createLight(scene)

// 创建Gui
createGui(renderer, scene, camera)

// 创建相机控件
const controls = initOrbitContros(renderer, scene, camera)
// controls.minDistance = 1;
// controls.maxDistance = 1;
// 禁止右键盘平移
controls.enablePan = false
init({renderer, scene, camera, controls})

renderer.render(scene, camera);

// 窗口大小改变回调, 这里可以加一个节流
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
