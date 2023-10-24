import "./style.css";
import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import stats from "./utils/stats";
import camera from "./utils/camera";
import scene from "./utils/scene";
import renderer from "./utils/render";
import gui from "./utils/gui";


// 导入模型
import cube_basic from "./model/cube_basic"
import cube_lambert from "./model/cube_lambert"

scene.add(cube_basic);
scene.add(cube_lambert);

const num = 100; //控制长方体模型数量
for (let i = 0; i < num; i++) {
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // 随机生成长方体xyz坐标
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  mesh.position.set(x, y, z);
  scene.add(mesh); // 模型对象插入场景中
}

renderer.render(scene, camera);

gui.add(cube_basic.position, "x", 0, 100).name('立方体1的x坐标');
gui.add(cube_basic.position, "y", 0, 100).name('立方体1的y坐标');
gui.add(cube_basic.position, "z", 0, 100).name('立方体1的z坐标');

// 相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  stats.update();
  renderer.render(scene, camera);
});

// 窗口大小改变回调, 这里可以加一个节流
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
