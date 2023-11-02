import * as THREE from "three";
import { scene, camera, renderer, stats } from "../common";

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("/images/earth.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});
const group = new THREE.Group();
for (let i = 0; i < 5000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);
  sprite.scale.set(1, 1, 1);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5);
  const y = 600 * Math.random();
  const z = 1000 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}

const init = () => {
  scene.add(group);
  function loop() {
    // loop()每次执行都会更新雨滴的位置，进而产生动画效果
    group.children.forEach((sprite) => {
      // 雨滴的y坐标每次减1
      sprite.position.y -= 1;
      if (sprite.position.y < 0) {
        // 如果雨滴落到地面，重置y，从新下落
        sprite.position.y = 600;
      }
    });
    renderer.render(scene, camera)
    stats.update()
    requestAnimationFrame(loop);
  }
  loop();
};

export default init;
