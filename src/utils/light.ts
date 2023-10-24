import * as THREE from "three";

// 创建光源
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
pointLight.position.set(400, 200, 150);

// 光源辅助观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff, 0.4);

export {
    pointLight,
    pointLightHelper,
    ambient
}