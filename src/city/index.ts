import * as THREE from "three";
import { scene, controls, camera, renderer } from "../common";
import createHouse from "./house";
import createSpotLight from "./spotLight";
import createPointLight from "./pointLight";
import createRaycaster from "./raycaster";
import createSky from "./sky";
import createWall from "./wall";
import createTrajectory from "./trajectory";
import createWater from "./water";
import createRoad from "./road";

const init = () => {
  // 缩放距离范围
  controls.minDistance = 10;
  controls.maxDistance = 2000;
  // 禁止右键盘平移
  controls.enablePan = false;
  // 上下角度
  // controls.minPolarAngle = 0.5;
  // controls.maxPolarAngle = 1.45;

  // 禁止旋转
  // controls.enableRotate = false;
  // // 禁止缩放
  // controls.enableZoom = false;

  camera.position.set(200, 100, 200);
  controls.target.copy(new THREE.Vector3(0, 0, 0));
  controls.update();

  createSky();

  const createSpere = () => {
    // 这里是一个球体
    const geometry = new THREE.SphereGeometry(500, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: "#030321",
      side: THREE.DoubleSide,
      //   transparent: true,
      //   opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.name = "球体";
    scene.add(mesh);
    return mesh;
  };

  const createPlane = () => {
    // 地面
    const planeGeometry = new THREE.CircleGeometry(150, 32);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: "#110463",
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.set(0, 1, 0);
    planeMesh.rotateX(Math.PI / 2);
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);
  };

  const createStar = () => {
    const group = new THREE.Group();
    for (let i = 0; i < 500; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 2, 32, 16);
      const material = new THREE.MeshLambertMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: Math.random(),
      });
      const mesh = new THREE.Mesh(geometry, material);

      const rangeA = Math.random() * Math.PI * 2;
      const rangeB = Math.random() * Math.PI * 2;
      // 这是一个取球面坐标的公式
      const x = 500 * Math.sin(rangeA) * Math.cos(rangeB);
      const y = 500 * Math.sin(rangeA) * Math.sin(rangeB);
      const z = 500 * Math.cos(rangeA);
      mesh.position.set(x, y, z);
      group.add(mesh);
    }
    scene.add(group);
    const loop = () => {
      group.rotateX(0.001);
      group.rotateY(0.001);
      group.rotateZ(0.001);
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };
    loop();
  };

  createSpotLight();
  createSpere();
  createPointLight();
  createPlane();
  createStar();
  const houses: THREE.Group[] = createHouse();
  createRaycaster([...houses]);
  createWall();
  createTrajectory();
  createWater();
  createRoad()
};

export default init;
