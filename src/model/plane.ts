import * as THREE from "three";
import { InitProps } from "./type";

const geometry = new THREE.PlaneGeometry(3000, 3000, 1, 1);
// 漫反射材质
const metrial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
  color: '#00ff00'
  // 显示三角形结构
  // wireframe: true
});

// 添加纹理
const texLoader = new THREE.TextureLoader()
const texture = texLoader.load('/images/grass.jpeg')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(51, 51)
const texMetrial = new THREE.MeshLambertMaterial({
  map: texture,
  side: THREE.DoubleSide,
})

const mesh = new THREE.Mesh(geometry, texMetrial);
mesh.position.set(0, 0, 0);
mesh.rotateX(Math.PI / 2);
// mesh.scale.set(0.5, 1, 1)

const init = (params: InitProps) => {
  const { scene } = params;
  scene.add(mesh);

//   const render = () => {
//     mesh.rotateX(0.01)
//     requestAnimationFrame(render)
//   }
//   render();
  // 返回模型，可在外层拿到引用
  return mesh
};

export default init;
