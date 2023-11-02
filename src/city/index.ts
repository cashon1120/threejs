import * as THREE from "three";

import { scene, controls, camera, renderer } from "../common";

const init = () => {
  // 缩放距离范围
  controls.minDistance = 100;
  controls.maxDistance = 1000;
  // 禁止右键盘平移
  controls.enablePan = false;
  // 上下角度
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = 1.45;
  camera.position.set(200, 100, 200);
  controls.target.copy(new THREE.Vector3(0, 0, 0));
  controls.update();
  // 这里是一个球体
  const envGeometry = new THREE.SphereGeometry(500, 50, 50);
  const envMaterial = new THREE.MeshBasicMaterial({
    color: "#030321",
    side: THREE.DoubleSide,
    //   transparent: true,
    //   opacity: 0.5,
  });
  const envMesh = new THREE.Mesh(envGeometry, envMaterial);
  envMesh.position.set(0, 0, 0);
  scene.add(envMesh);

  const createStar = () => {
    for (let i = 0; i < 1000; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 2, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: Math.random(),
      });
      const mesh = new THREE.Mesh(geometry, material);

      const rangeA = Math.random() * Math.PI;
      const rangeB = Math.random() * Math.PI;
      // 这是一个取球面坐标的公式
      const x = 500 * Math.sin(rangeA) * Math.cos(rangeB);
      const y = 500 * Math.sin(rangeA) * Math.sin(rangeB);
      const z = 500 * Math.cos(rangeA);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    }
  };
  createStar();
  renderer.render(scene, camera);
};

export default init;
