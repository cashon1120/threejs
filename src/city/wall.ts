import * as THREE from "three";
import { scene, camera, renderer } from "../common";

const createWall = () => {
  const arcShape = new THREE.Shape()
    .arc(0, 0, 150, 0, Math.PI * 2, false)
    .extractPoints(180);
  const holePath = new THREE.Shape()
    .arc(0, 0, 145, 0, Math.PI * 2, true)
    .extractPoints(180);

  const sp = new THREE.Shape(arcShape.shape);
  const hp = new THREE.Shape(holePath.shape);
  sp.holes.push(hp);
  let geometry = new THREE.ExtrudeGeometry(sp, {
    depth: 15,
    bevelEnabled: false,
    bevelThickness: 15, //倒角尺寸:拉伸方向
    bevelSize: 15, //倒角尺寸:垂直拉伸方向
    // bevelSegments: 20, //倒圆角：倒角细分精度，默认3
  });
  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    color: "#1058d3",
  });
  let mesh = new THREE.Mesh(geometry, material);
  // mesh.castShadow = true;
  mesh.translateY(15);
  scene.add(mesh);
  renderer.render(scene, camera);
};

export default createWall;
