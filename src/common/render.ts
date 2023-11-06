import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height);
// 设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

export default renderer
