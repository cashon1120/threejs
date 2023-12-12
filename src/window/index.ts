import * as THREE from "three";
import { scene, controls, camera, renderer } from "../common";
import createPointLight from "./lights/pointLight";
import createCoordinate from "./tools/coordinate";
import Track from "./model/track";
import Rect from "./class/rect";

const WIDTH = 200;
const HEIGHT = 100;

const init = () => {
  createPointLight({ x: -300, y: 50, z: 20 });
  createPointLight({ x: 300, y: 50, z: -20 });
  createPointLight({ x: 100, y: 300, z: -20 });
  createPointLight({ x: 100, y: -300, z: 20 });
  createPointLight({ x: 100, y: 50, z: 200 });
  createPointLight({ x: 100, y: 50, z: -200 });
  createPointLight({ x: 100, y: 50, z: 0 });
  //环境光:没有特定方向，整体改变场景的光照明暗，也不会产生投影
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // 创建辅助坐标尺
  createCoordinate();

  controls.minDistance = 200;
  controls.maxDistance = 400;

  // 灯光跟随摄像机
  // controls.addEventListener("change", () => {
  //   light.target = group;
  //   light.position.copy(camera.position);
  // });

  const group = new THREE.Group();

  const windowRect = new Rect({
    group,
    width: WIDTH,
    height: HEIGHT,
    depth: 6,
    barWidth: 4,
    color: "#f29e4b",
    // bottomBar: new Track({
    //   width: WIDTH,
    //   height: 4,
    //   depth: 6,
    //   group,
    //   x: WIDTH / 2,
    //   color: "#f29e4b",
    // }),
  });

  // new Track({
  //   width: WIDTH,
  //   height: 4,
  //   depth: 6,
  //   group,
  //   barWidth: 4,
  //   x: WIDTH / 2,
  //   color: "#f29e4b",
  // }).init()

  // const rect2 =  new Rect({
  //   group,
  //   width: 50,
  //   height: 50,
  //   depth: 4,
  //   barWidth: 4,
  //   y: 46,
  //   x: 10,
  //   color: '#f29e4b'
  // });

  // const leftBar = new Bar({
  //   width: 4,
  //   height: 100,
  //   depth: 6,
  //   group,
  //   color: "#f29e4b",
  //   x: 100,
  //   y: 50,
  // });

  // windowRect.transform({type: 'top', value: 120})
  // // windowRect.transform({type: 'right', value: 220})
  // // windowRect.transform({ type: "bottom", value: 120 });
  // // windowRect.transform({type: 'left', value: 220})

  // setTimeout(() => {
  //   windowRect.transform({ type: "top", value: 130 });
  //   // windowRect.transform({type: 'right', value: 220})
  //   // windowRect.transform({ type: "bottom", value: 130 });
  //   // windowRect.transform({type: 'left', value: 220})
  // }, 2000);

  // setTimeout(() => {
  //   // windowRect.transform({ type: "top", value: 140 });
  //   // windowRect.transform({type: 'right', value: 220})
  //   windowRect.transform({ type: "bottom", value: 130 });
  //   // windowRect.transform({type: 'left', value: 220})
  // }, 33000);

  scene.add(group);
  camera.position.set(WIDTH / 2, HEIGHT / 2, 280);
  camera.lookAt(WIDTH / 2, HEIGHT / 2, 0);
  controls.target.copy(new THREE.Vector3(WIDTH / 2, HEIGHT / 2, 0));
  controls.update();



  // 测试
  // const group1 = new THREE.Group();
  // const geometry = new THREE.BoxGeometry(20, 20, 20)
  // const material = new THREE.MeshLambertMaterial({
  //   color: '#f29e4b',
  // })
  // const mesh = new THREE.Mesh(geometry, material)
  // group1.add(mesh)
  // group.add(group1)
  // scene.add(group)
  // console.log(group.position)
  // group.position.set(50, 50, 50)
  // mesh.position.set(10, 10, 10)
  // renderer.render(scene, camera);

  const button = document.getElementById('submitButton')
  const option = document.getElementById('option')
  const inputValue = document.getElementById('inputValue')
  let type: 'left' | 'right' | 'bottom' | 'top' = 'bottom'
  let value = 0
  option?.addEventListener('change', (e: any) => {
    type = e.target.value
  })
  inputValue?.addEventListener('change', (e: any) => {
    value = e.target.value
  })
  button?.addEventListener('click', () => {
    windowRect.transform({type, value: Number(value)})
  })
};

export default init;
