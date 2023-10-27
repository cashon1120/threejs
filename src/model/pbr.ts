import * as THREE from "three";
import gui, { guiPosition, guiColor } from "../utils/gui";
import { InitProps } from "./type";

const geometry = new THREE.SphereGeometry(20, 200, 200);

const material = new THREE.MeshStandardMaterial({
  metalness: 0.5,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 50);
const init = (params: InitProps) => {
  const { scene } = params;
  scene.add(mesh);
  return mesh;
};

const folder = gui.addFolder("金属材质");
folder.close();
guiPosition({ mesh: mesh, folder });
guiColor({ mesh: mesh, folder });

export default init;
