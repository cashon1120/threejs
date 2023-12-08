import * as THREE from "three";
import { scene} from "../common";

const createSky = () => {
  const loader = new THREE.CubeTextureLoader();
  const path = `/skybox/night/`; // 设置路径
  const format = ".jpg"; // 设定格式
  const texture = loader.load([
    path + "posx" + format,
    path + "negx" + format,
    path + "posy" + format,
    path + "negy" + format,
    path + "posz" + format,
    path + "negz" + format,
  ]);
  scene.background = texture
};

export default createSky;
