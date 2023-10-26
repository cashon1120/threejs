import * as THREE from "three";
import gui, { guiPosition, guiColor } from "../utils/gui";
import { InitProps } from "./type";
import stats from "../utils/stats";

// 创建几何体
const geometry = new THREE.BoxGeometry(30, 30, 30);

// 漫反射材质
const material = new THREE.MeshLambertMaterial({
  // 显示三角形结构
  // wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(50, 0, 0);
mesh.castShadow = true;

const init = (params: InitProps) => {
  const { renderer, scene, camera } = params;
    scene.add(mesh)
  function render() {
    renderer.render(scene, camera); //执行渲染操作
    stats.update();
    mesh.rotateX(0.01); //每次绕y轴旋转0.01弧度
    mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
    mesh.rotateZ(0.01); //每次绕y轴旋转0.01弧度
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
};

const folder = gui.addFolder("漫反射立方体");
folder.close();
guiPosition({ mesh: mesh, folder });
guiColor({ mesh: mesh, folder });

export default init;
