import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";
import { scene, controls, camera, renderer } from "../common";

const css2dRenderer = new CSS2DRenderer();

const geometry = new THREE.SphereGeometry(10, 32, 16);
geometry.scale(1, 1, -1);

const createTag = () => {
  const div = document.createElement("div");
  div.id = "tag";
  div.innerHTML = "这是茶几";
  document.body.appendChild(div);
  const tag = new CSS2DObject(div);
  tag.position.set(-5, -1, 0);
  return tag;
};

const init = () => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load("/images/house.webp", () => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    // 这里要和WebGLRenderer一样添加一些事件
    controls?.addEventListener("change", () => {
      css2dRenderer.render(scene, camera);
    });
    window.addEventListener("resize", () => {
      css2dRenderer.setSize(window.innerWidth, window.innerHeight);
      css2dRenderer.render(scene, camera);
    });
    const mesh = new THREE.Mesh(geometry, material);
    camera.position.set(1, 0, 0);
    camera.lookAt(0, 0, 0);
    if (controls) {
      controls?.target.set(0, 0, 0);
      controls.enableZoom = false;
    }
    controls?.update();
    scene.add(createTag());
    scene.add(mesh);
    renderer.render(scene, camera);

    // 添加标注
    css2dRenderer.setSize(window.innerWidth, window.innerHeight);
    css2dRenderer.render(scene, camera);
    document.body.appendChild(css2dRenderer.domElement);
    css2dRenderer.domElement.style.position = "absolute";
    css2dRenderer.domElement.style.top = "0px";
    css2dRenderer.domElement.style.pointerEvents = "none";
  });
};

export default init;
