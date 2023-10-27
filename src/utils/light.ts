import * as THREE from "three";
import gui, {guiPosition, guiBoolean} from "../utils/gui";

// 创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
pointLight.position.set(0, 300, 0);
pointLight.castShadow = true;

// 创建平行光
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(-300, -200, 200);

// 创建聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(400, 200, 150);
spotLight.castShadow = true;

// 光源辅助观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 3);

//环境光:没有特定方向，整体改变场景的光照明暗，也不会产生投影
const ambient = new THREE.AmbientLight(0xffffff, 0.4);

// 设置gui
const folder = gui.addFolder('光源')
folder.close()
folder.add(ambient, "intensity", 0, 2).name("环境光强度");
guiBoolean({
  defaultValue: true,
  name: "显示/隐藏环境光",
  folder,
  onChange: (value) => {
    ambient.visible = value;
  },
});

// 添加点光源gui
folder.add(pointLight, "intensity", 0, 2).name("点光源" )
guiPosition({mesh: pointLight, name: '点光源', min: -300, max: 300, folder})
guiBoolean({
  defaultValue: true,
  name: "显示/隐藏点光源",
  folder,
  onChange: (value) => {
    pointLight.visible = value;
  },
});

const createLight = (scene: THREE.Scene) => {
  scene.add(pointLightHelper);
  scene.add(ambient);
  scene.add(pointLight);
  // scene.add(spotLight)
  // scene.add(directionLight)
};



export {
  createLight,
  pointLight,
  pointLightHelper,
  ambient,
  directionLight,
  spotLight,
};
