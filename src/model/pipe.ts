import * as THREE from "three";
import { InitProps } from "./type";

const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(90, -40, 60),
  new THREE.Vector3(120, 30, 30),
]);
const geometry = new THREE.TubeGeometry(path, 200, 5, 30);
const texLoader = new THREE.TextureLoader();
//纹理贴图
const texture = texLoader.load("/images/earth.png");
texture.wrapS = THREE.RepeatWrapping;
//纹理沿着管道方向阵列(UV坐标U方向)
texture.repeat.x = 10;
const material = new THREE.MeshLambertMaterial({
  map: texture,
  side: THREE.DoubleSide, //双面显示看到管道内壁
});
const mesh = new THREE.Mesh(geometry, material);
const pointsArr = path.getSpacedPoints(500);
const init = (params: InitProps) => {
  const { scene, camera, renderer } = params;
  scene.add(mesh);
  let i = 0;
  function render() {
    if (i < pointsArr.length - 1) {
      camera.position.copy(pointsArr[i]);
      camera.lookAt(pointsArr[i + 1]);
      i += 1;
    } else {
      i = 0;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
//   render();
};

export default init;
