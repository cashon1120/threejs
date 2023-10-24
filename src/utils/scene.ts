import * as THREE from "three";
import {ambient, pointLight, pointLightHelper} from './light'
// 创建场景
const scene = new THREE.Scene();

// 添加辅助观察坐标
const axesHelper = new THREE.AxesHelper(350);
scene.add(axesHelper);

scene.add(pointLight);
scene.add(pointLightHelper);
scene.add(ambient);

export default scene;