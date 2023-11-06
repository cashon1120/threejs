import * as THREE from "three";
import {
  scene,
  camera,
  renderer,
  gui,
  guiPosition,
  guiBoolean,
} from "../common";

const createSpotLight = () => {
    // 创建聚光灯
    const light = new THREE.SpotLight(0xffffff, 100000);
    light.angle = Math.PI / 1.5;
    light.position.set(0, 100, 0);
    light.castShadow = true;
    const target = new THREE.Object3D();
    target.position.set(0, 20, 0);
    light.target = target;
    // 聚光灯光源辅助观察
    const helper = new THREE.SpotLightHelper(light, 10);
    scene.add(helper);
    scene.add(light);
    scene.add(light.target);
    const folder = gui.addFolder("聚光灯光源");
    folder.close();
    folder.add(light, "intensity", 0, 100000).name("聚光灯光源");
    guiPosition({
      mesh: light,
      name: "聚光灯光源",
      min: -300,
      max: 300,
      folder,
    });
    guiBoolean({
      defaultValue: true,
      name: "显示/隐藏点光源",
      folder,
      onChange: (value) => {
        light.visible = value;
      },
    });

    let deg = Math.PI / 180;
    // 旋转动画
    const loop = () => {
      deg += 0.01;
      light.position.set(200 * Math.cos(-deg), 128, 200 * Math.sin(-deg));
      requestAnimationFrame(loop);
      renderer.render(scene, camera);
    };
    // loop();
  };

  export default createSpotLight