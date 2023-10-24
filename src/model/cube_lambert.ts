import * as THREE from "three";
import renderer from "../utils/render";
import scene from "../utils/scene";
import camera from "../utils/camera";
import stats from "../utils/stats";
// 创建几何体
const geometry = new THREE.BoxGeometry(30, 30, 30);

// 漫反射材质
const lamberMaterial = new THREE.MeshLambertMaterial();
const mesh = new THREE.Mesh(geometry, lamberMaterial);
mesh.position.set(50, 0, 0);

function render() {
  renderer.render(scene, camera); //执行渲染操作
  stats.update()
  mesh.rotateX(0.01); //每次绕y轴旋转0.01弧度
  mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
  mesh.rotateZ(0.01); //每次绕y轴旋转0.01弧度
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();

export default mesh;