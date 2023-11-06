import * as THREE from "three";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";

import { scene, camera, renderer, controls } from "../common";
import { random } from "../utils";

const css2dRenderer = new CSS2DRenderer();

const createHouse = () => {
  const houses: THREE.Mesh[] = [];

  for (let i = 0; i < 20; i++) {
    const length = random(10, 20);
    const height = random(10, 30);
    const width = random(10, 20);
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
    mesh.position.set(x, height / 2, z);
    scene.add(mesh);
    houses.push(mesh);
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
