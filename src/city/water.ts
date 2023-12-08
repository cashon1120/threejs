import * as THREE from "three";
import { Water } from "three/addons/objects/Water";
import { scene, camera, renderer } from "../common";

const createWater = () => {
  const geometry = new THREE.PlaneGeometry(10000, 10000);
  const water = new Water(geometry, {
    side: THREE.DoubleSide,
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/images/water.webp",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(0, 500, 0),
    sunColor: '#021c47',
    waterColor: 0x0e2e87,
    distortionScale: 4,
    fog: scene.fog !== undefined,
  });
  water.rotateX(-Math.PI / 2);
  water.receiveShadow = true;
  scene.add(water)
  const render = () => {
    water.material.uniforms['time'].value += 1.0 / 60.0;
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
};

export default createWater;
