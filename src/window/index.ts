import * as THREE from "three";
import { scene, controls, camera } from "../common";
import createPointLight from "./lights/pointLight";
import createCoordinate from "./tools/coordinate";
import Track from "./model/track";
import initEvent from "./event";
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
  const light = createPointLight({ x: 100, y: 50, z: 0 });

  // 创建辅助坐标尺, 会加载字体文件，会有点卡
  createCoordinate();

  controls.minDistance = 200;
  controls.maxDistance = 300;

  // 灯光跟随摄像机
  controls.addEventListener("change", () => {
    light.target = group;
    light.position.copy(camera.position);
  });

  const group = new THREE.Group();

  const windowRect = new Rect({
    group,
    width: WIDTH,
    height: HEIGHT,
    barDepth: 8,
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
  initEvent(windowRect)
  new Track({
    width: WIDTH,
    height: 4,
    depth: 6,
    group,
    x: WIDTH / 2,
    color: "#f29e4b",
  }).init()

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


  scene.add(group);
  camera.position.set(WIDTH / 2, HEIGHT / 2, 280);
  camera.lookAt(WIDTH / 2, HEIGHT / 2, 0);
  controls.target.copy(new THREE.Vector3(WIDTH / 2, HEIGHT / 2, 0));
  controls.update();
};

export default init;
