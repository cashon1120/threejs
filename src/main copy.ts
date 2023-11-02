import "./style.css";

import scene from "./utils/scene";
import {createLight} from './utils/light'
import initOrbitContros from "./utils/orbitControls";
import camera from "./utils/camera";
import renderer from "./utils/render";
import {createGui} from "./utils/gui";
import createHelper from "./utils/helper";

// 导入模型
import initCubeBasic from "./model/cube_basic"
import initCubeLambert from "./model/cube_lambert"
import initCircle from "./model/circle"
import initPlane from "./model/plane"
import initGroup from "./model/group"
import initObj from "./model/objLoader"
import initPbr from "./model/pbr"
import initPipe from "./model/pipe";
import sprite from "./model/sprite"

// 创建辅助坐标和平面
createHelper(scene)

// 创建灯光
createLight(scene)

// 创建Gui
createGui(renderer, scene, camera)

// 创建相机控件
initOrbitContros(renderer, scene, camera)

// initCubeLambert({renderer, scene, camera})

// initCubeBasic({renderer, scene, camera})

initPlane({renderer, scene, camera})

initGroup({renderer, scene, camera})

initCircle({renderer, scene, camera})

// initObj({renderer, scene, camera})

initPbr({renderer, scene, camera})

initPipe({renderer, scene, camera})
sprite({renderer, scene, camera})
// const num = 100; //控制长方体模型数量
// for (let i = 0; i < num; i++) {
//   const geometry = new THREE.BoxGeometry(5, 5, 5);
//   const material = new THREE.MeshLambertMaterial({
//     color: 0x00ffff,
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   // 随机生成长方体xyz坐标
//   const x = (Math.random() - 0.5) * 200;
//   const y = (Math.random() - 0.5) * 200;
//   const z = (Math.random() - 0.5) * 200;
//   mesh.position.set(x, y, z);
//   scene.add(mesh); // 模型对象插入场景中
// }

renderer.render(scene, camera);

// 窗口大小改变回调, 这里可以加一个节流
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
