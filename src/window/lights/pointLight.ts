import * as THREE from "three";

import { scene, gui, guiPosition, guiBoolean } from "../../common";

interface Props {
    x: number,
    y: number,
    z: number
}

const createPointLight = (props: Props) => {
    const {x, y, z} = props;
  // 创建点光源
  const light = new THREE.DirectionalLight("#ffffff", 3);
  light.position.set(x, y, z);
  light.castShadow = true;
  light.shadow.radius = 5;
  light.shadow.mapSize.set(2048, 2048);
  // 设置三维场景计算阴影的范围
  light.shadow.camera.left = -50;
  light.shadow.camera.right = 50;
  light.shadow.camera.top = 200;
  light.shadow.camera.bottom = -200;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 1000;

  // const helper = new THREE.DirectionalLightHelper(light, 5);
  // scene.add(helper);
  scene.add(light);

  const pointFolder = gui.addFolder("平行光源");
  pointFolder.close();
  pointFolder.add(light, "intensity", 0, 10000).name("平行光源");
  guiPosition({
    mesh: light,
    name: "平行光源",
    min: -400,
    max: 400,
    folder: pointFolder,
  });
  guiBoolean({
    defaultValue: true,
    name: "显示/隐藏",
    folder: pointFolder,
    onChange: (value: boolean) => {
      light.visible = value;
    },
  });

  return light;
};

export default createPointLight;
