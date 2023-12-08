import * as THREE from "three";
import { scene, camera, renderer, controls } from "../common";
import createCar from "./car"
const paths = [
  { x: -80, y: 20, z: 80 },
  { x: -80, y: 2, z: -80 },
  { x: 80, y: 2, z: -80 },
  { x: 80, y: 20, z: 80 },
];


const createTrajectory = () => {
  const curve = new THREE.CatmullRomCurve3(
    paths.map((item) => new THREE.Vector3(item.x, item.y + 3, item.z))
  );
  //   curve.curveType = "chordal";
  curve.curveType = "catmullrom";
  curve.curveType = "centripetal";
  curve.closed = true;
  const points = curve.getPoints(500);
  const line = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      //   transparent: true,
      //   opacity: 0,
    })
  );

  scene.add(line);
  renderer.render(scene, camera);
  const car = createCar();
  scene.add(car);

  const loopTime = 10 * 1000; // loopTime: 循环一圈的时间
  function changePosition(t: number) {
    const position = curve.getPointAt(t); // t: 当前点在线条上的位置百分比，后面计算
    car.position.copy(position);
    return position;
  }

  function changeLookAt(t: number, position: any) {
    let tangent = curve.getTangentAt(t);
    let lookAtVec = tangent.add(position);
    car.lookAt(lookAtVec);
    return lookAtVec;
  }

  // 在渲染函数中获取当前时间
  const render = () => {
    let time = Date.now();
    let t = (10000 - (time % loopTime)) / loopTime; // 计算当前时间进度百分比
    // let t = (time % loopTime) / loopTime; // 计算当前时间进度百分比
    const position = changePosition(t);
    changeLookAt(t, position);
    // camera.position.set(position.x, position.y+ 3, position.z);
    // const cameraLookAt = changeLookAt(t + 0.2, position)
    // controls.target.set(cameraLookAt.x, cameraLookAt.y+ 3, cameraLookAt.z);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};

export default createTrajectory;
