import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, width / height, 100, 5000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);


export default camera