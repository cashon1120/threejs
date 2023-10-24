import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true,
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

export default renderer
