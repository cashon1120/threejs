import * as THREE from "three";
import { scene, controls, camera, renderer } from "../common";
import createPointLight from "./pointLight";
import createCoordinate from "./tools/coordinate";
import Track from "./model/track";
import Corner from "./corner";
import Bar from "./class/bar";
import Rect from "./class/rect";
import TWEEN from "@tweenjs/tween.js";
import { drawRect } from "../utils/index";

const WIDTH = 200;
const HEIGHT = 100;

const init = () => {
  const light = createPointLight();
  //环境光:没有特定方向，整体改变场景的光照明暗，也不会产生投影
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  // 创建辅助坐标尺
  createCoordinate();

  controls.minDistance = 200;
  controls.maxDistance = 400;

  controls.addEventListener("change", () => {
    light.target = group;
    light.position.copy(camera.position);
  });

  const group = new THREE.Group();

  const windowRect = new Rect({
    group,
    width: WIDTH,
    height: HEIGHT,
    depth: 6,
    barWidth: 4,
    color: "#f29e4b",
    bottomBar: new Track({
      width: WIDTH,
      height: 4,
      depth: 6,
      group,
      barWidth: 4,
      x: WIDTH / 2,
      color: "#f29e4b",
    }).init(),
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

  const leftBar = new Bar({
    width: 4,
    height: 100,
    depth: 6,
    group,
    color: "#f29e4b",
    x: 100,
    y: 50,
  });

  // windowRect.transform({type: 'top', value: 120})
  // windowRect.transform({type: 'right', value: 220})
  // windowRect.transform({type: 'bottom', value: 120})
  windowRect.transform({type: 'left', value: 220})

  // const leftBar = new Bar({ width: 4, height: 100, type: "x", group });
  // const rightBar = new Bar({ width: 4, height: 100, x: WIDTH, group });
  // const topBar = new Bar({ width: WIDTH, height: 4, y: HEIGHT, group });
  // const bottomBar = new Bar({ width: WIDTH, height: 4, y: 0, group });

  scene.add(group);
  camera.position.set(WIDTH / 2, HEIGHT / 2, 280);
  camera.lookAt(WIDTH / 2, HEIGHT / 2, 0);
  controls.target.copy(new THREE.Vector3(WIDTH / 2, HEIGHT / 2, 0));
  controls.update();

  // topBar.translate({type: 'top', value: 120});
  // leftBar.transform({type: 'top', value: 120})
  // rightBar.transform({type: 'top', value: 120})

  // rightBar.translate({type: 'right', value: 220})
  // topBar.transform({type: 'right', value: 220})
  // bottomBar.transform({type: 'right', value: 220})

  // leftBar.translate({ type: "left", value: -20 });
  // topBar.transform({ type: "left", value: 220 });
  // bottomBar.transform({ type: "left", value: 220 });

  // bottomBar.translate({ type: "bottom", value: 220})
  // leftBar.transform({type: 'bottom', value: -20})

  renderer.render(scene, camera);
};

export default init;
