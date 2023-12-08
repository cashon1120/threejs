import * as THREE from "three";
import { scene, controls, camera, renderer } from "../common";
import createPointLight from "./pointLight";
import Corner from "./corner";
import Bar from "./bar";
import TWEEN from "@tweenjs/tween.js";
import { drawRect } from "../utils/index";

const WIDTH = 200;
const HEIGHT = 100;

const init = () => {
  const light = createPointLight();
  controls.minDistance = 200;
  controls.maxDistance = 400;

  controls.addEventListener("change", () => {
    light.target = group;
    light.position.copy(camera.position);
  });

  const group = new THREE.Group();
  const leftBottomCorner = new Corner({ x: 0, y: 0, rotate: 0, group });
  const leftTopCorner = new Corner({
    x: 0,
    y: HEIGHT,
    rotate: -Math.PI / 2,
    group,
  });
  const rightTopCorner = new Corner({
    x: WIDTH,
    y: HEIGHT,
    rotate: Math.PI,
    group,
  });
  const rightBottomCorner = new Corner({
    x: WIDTH,
    y: 0,
    rotate: -Math.PI * 1.5,
    group,
  });

  const leftBar = new Bar({ width: 4, height: 100, type: "x", group });
  const rightBar = new Bar({ width: 4, height: 100, x: WIDTH - 4, group });
  const topBar = new Bar({ width: WIDTH, height: 4, y: HEIGHT - 4, group });
  const bottomBar = new Bar({ width: WIDTH, height: 4, y: 0, group });

  scene.add(group);
  camera.position.set(WIDTH / 2, HEIGHT / 2, 280);
  camera.lookAt(WIDTH / 2, HEIGHT / 2, 0);
  controls.target.copy(new THREE.Vector3(WIDTH / 2, HEIGHT / 2, 0));
  controls.update();

    // leftTopCorner.translate({type: "y", value: 120});
    // rightTopCorner.translate({type: "y", value: 120});
    // topBar.translate({type: 'top', value: 120});
    // leftBar.transform({type: 'top', value: 120})
    // rightBar.transform({type: 'top', value: 120})

//   rightTopCorner.translate({type: 'x', value: 220})
//   rightBottomCorner.translate({type: 'x', value:220})
//   rightBar.translate({type: 'right', value: 220})
//   topBar.transform({type: 'right', value: 220})
//   bottomBar.transform({type: 'right', value: 220})

//   leftTopCorner.translate({ type: "x", value: -20 });
//   leftBottomCorner.translate({ type: "x", value: -20 });
//   leftBar.translate({ type: "left", value: -20 });
//   topBar.transform({ type: "left", value: 220 });
//   bottomBar.transform({ type: "left", value: 220 });

rightBottomCorner.translate({ type: "y", value: -20 });
leftBottomCorner.translate({ type: "y", value: -20 });
bottomBar.translate({ type: "bottom", value: -20})
leftBar.transform({type: 'bottom', value: 220})
  
  renderer.render(scene, camera);
};

export default init;
