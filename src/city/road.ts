import * as THREE from "three";
import { scene, camera, renderer } from "../common";
import createCar from "./car"

const car = createCar()
scene.add(car)

const createLine = () => {
  const arcShape = new THREE.Shape()
    .arc(0, 0, 123, 0, Math.PI * 2, false)
    .extractPoints(180);
  const holePath = new THREE.Shape()
    .arc(0, 0, 122, 0, Math.PI * 2, true)
    .extractPoints(180);

  const sp = new THREE.Shape(arcShape.shape);
  const hp = new THREE.Shape(holePath.shape);
  sp.holes.push(hp);
  let geometry = new THREE.ShapeGeometry(sp);
  console.log(geometry);
  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: "#fff",
    transparent: true,
    opacity: 0.1,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.translateY(1.02);
  mesh.receiveShadow = true;
  scene.add(mesh);
};

const createArc = () => {
  const arc = new THREE.ArcCurve(0, 0, 123, 0, 2 * Math.PI);
  const points = arc.getPoints(360);
  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: "#ffffff",
  });
  const mesh = new THREE.Line(geometry, material);
  mesh.translateY(2)
  mesh.rotateX(Math.PI / 2);
  scene.add(mesh);

  
};

const createRoad = () => {
  const arcShape = new THREE.Shape()
    .arc(0, 0, 130, 0, Math.PI * 2, false)
    .extractPoints(180);
  const holePath = new THREE.Shape()
    .arc(0, 0, 115, 0, Math.PI * 2, true)
    .extractPoints(180);

  const sp = new THREE.Shape(arcShape.shape);
  const hp = new THREE.Shape(holePath.shape);
  sp.holes.push(hp);
  let geometry = new THREE.ShapeGeometry(sp);
  geometry.rotateX(Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: "#151d35",
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.translateY(1.01);
  mesh.receiveShadow = true;
  scene.add(mesh);
  createLine();
  createArc();
  renderer.render(scene, camera);

  
};

export default createRoad;
