import "./style.css";

import {
  scene,
  initOrbitContros,
  camera,
  renderer,
} from './common'
import init from './city/index'

// 创建相机控件
const controls = initOrbitContros(renderer, scene, camera)
// controls.minDistance = 1;
// controls.maxDistance = 1;
// 禁止右键盘平移
controls.enablePan = false
init({renderer, scene, camera, controls})

renderer.render(scene, camera);
