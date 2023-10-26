import * as THREE from "three";
import { InitProps } from "./type";

const geometry = new THREE.PlaneGeometry(100, 50, 1, 1);
// 漫反射材质
const metrial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
  color: '#00ff00'
  // 显示三角形结构
  // wireframe: true
});

const mesh = new THREE.Mesh(geometry, metrial);
mesh.position.set(10, 0, 50);
const init = (params: InitProps) => {
  const { scene } = params;
  scene.add(mesh);
};

export default init;
