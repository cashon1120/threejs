import * as THREE from "three";
import renderer from "../utils/render";
import scene from "../utils/scene";
import camera from "../utils/camera";

// 创建几何体
const geometry = new THREE.BoxGeometry(30, 30, 30);

// 创建材质, 基础材质不受光照影响
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.7,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);

function render() {
  renderer.render(scene, camera); //执行渲染操作
  mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();

export default mesh;