import * as THREE from "three";
import gui, { guiPosition, guiColor } from "../utils/gui";
import { InitProps } from "./type";
import stats from "../utils/stats";

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(30, 30, 30);
geometry.translate(0, 0, 0,);
const material = new THREE.MeshLambertMaterial();
console.log(geometry);

const mesh1 = new THREE.Mesh(geometry, material);
mesh1.position.set(0, 0, 0);
mesh1.castShadow = true;
mesh1.receiveShadow = true;
group.add(mesh1);


// 添加纹理
const texLoader = new THREE.TextureLoader()
const texture = texLoader.load('/images/grass.jpeg')
const texMetrial = new THREE.MeshLambertMaterial({
  map: texture,
})


const mesh2 = new THREE.Mesh(geometry, texMetrial);
mesh2.position.set(60, 0, 0);
mesh2.castShadow = true;
group.add(mesh2);

group.position.set(50, 0, 0);

const init = (params: InitProps) => {
  const { renderer, scene, camera } = params;
  scene.add(group);
  function render() {
    stats.update();
    group.rotateX(0.01)
    // mesh1.rotateY(0.01)
    // mesh2.rotateZ(0.01)
    renderer.render(scene, camera); //执行渲染操作


    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();

  // 返回模型，可在外层拿到引用
  return group;
};

const folder = gui.addFolder("漫反射立方体");
folder.close();
guiPosition({ mesh: mesh1, folder });
guiColor({ mesh: mesh2, folder });

export default init;
