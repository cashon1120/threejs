import * as THREE from "three";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";
import TWEEN from "@tweenjs/tween.js";

import { scene, camera, renderer, controls } from "../common";
import { random } from "../utils";

const css2dRenderer = new CSS2DRenderer();

const createHouse = () => {
  const houses: THREE.Group[] = [];
  const animations: any = [];

  for (let i = 0; i < 10; i++) {
    const length = random(5, 10);
    const height = random(5, 20);
    const width = random(5, 10);
    const geometry = new THREE.BoxGeometry(length, height, width);
    const material = new THREE.MeshLambertMaterial({
      color: "#1058d3",
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    const name = `${i + 1} 号楼`;
    mesh.name = name;
    const x = random(-100, 100);
    const z = random(-100, 100);
    const group = new THREE.Group();
    const newObj = new THREE.Object3D();
    newObj.position.set(0, -(height / 2), 0);
    group.position.set(x, 0, z);
    mesh.position.set(0, height / 2, 0);
    group.add(mesh);
    group.add(newObj);
    scene.add(group);
    houses.push(group);
    let animation: any;

    animation = new TWEEN.Tween(group.scale)
      .to({ x: 1, y: 0.5, z: 1 }, 2000)
      .start()
      .easing(TWEEN.Easing.Exponential.InOut);
    animations.push(animation);
    const div = document.createElement("div");
    div.id = "tag";
    div.style.color = "#fff";
    div.style.fontSize = "12px";
    div.innerHTML = name;
    document.body.appendChild(div);
    const tag = new CSS2DObject(div);
    tag.position.set(x, height + 1, z);
    scene.add(tag);
  }

  const animation = () => {
    animations.forEach((item: any) => {
      item.update();
      // new TWEEN.Tween(item.position).to({ x: 0, y: 0, z: 0 }, 2000).start();
      // new TWEEN.Tween(item.scale).to({ y: 0.5 }, 2000).start();
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  };
  // animation();
  renderer.render(scene, camera);

  const { width, height } = renderer.domElement;
  // 标注信息一定要加的一些属性
  css2dRenderer.setSize(width, height);
  css2dRenderer.render(scene, camera);
  document.body.appendChild(css2dRenderer.domElement);
  css2dRenderer.domElement.style.position = "absolute";
  css2dRenderer.domElement.style.top = "0px";
  css2dRenderer.domElement.style.pointerEvents = "none";

  controls.addEventListener("change", () => {
    css2dRenderer.render(scene, camera);
  });

  window.addEventListener("resize", () => {
    const { width, height } = renderer.domElement;
    css2dRenderer.setSize(width, height);
    css2dRenderer.render(scene, camera);
  });

  return houses;
};

export default createHouse;
