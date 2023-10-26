import * as THREE from "three";
import gui, {guiPosition, guiColor} from "../utils/gui";
import stats from "../utils/stats";

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


const init = (
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.Camera
) => {
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
const folder = gui.addFolder('Basic立方体')
folder.close()
guiPosition({mesh: mesh, folder})
guiColor({mesh: mesh, folder})

export default init;