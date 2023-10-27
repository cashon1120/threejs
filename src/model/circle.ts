import * as THREE from "three";
import gui, { guiPosition, guiColor } from "../utils/gui";
import { InitProps } from "./type";


const geometry = new THREE.SphereGeometry(20, 300, 300)
const texLoader = new THREE.TextureLoader()
const texture = texLoader.load('/images/earth.png')

const material = new THREE.MeshLambertMaterial({
    map: texture
})

const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-50, 0, 0)
const init = (params: InitProps) => {
    const { scene } = params;
    scene.add(mesh);
    return mesh
  };

  const folder = gui.addFolder("球体");
  folder.close();
  guiPosition({ mesh: mesh, folder });
  guiColor({ mesh: mesh, folder });
  
  export default init;
  
