import * as THREE from "three";
import { InitProps } from "./type";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gui, { guiPosition, guiColor } from "../utils/gui";

const loader = new OBJLoader();

const init = (params: InitProps) => {
  const { scene, camera, renderer } = params;
  loader.load("/model/GLman_level02.obj", (object: any) => {
    object.traverse(function (child: any) {
      if (child instanceof THREE.Mesh) {
        child.scale.y = 0.5;
        child.scale.x = 0.5;
        child.scale.z = 0.5;
        child.material = new THREE.MeshLambertMaterial({ color: "#ff0000" });
      }
    });
    function render() {
      object.rotateY(-0.01);
      // mesh1.rotateY(0.01)
      // mesh2.rotateZ(0.01)
      renderer.render(scene, camera); //执行渲染操作
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();

    const folder = gui.addFolder("人物");
    folder.close();
    guiPosition({ mesh: object, folder });
    guiColor({
      mesh: object,
      folder,
      onChange: (value) => {
        object.traverse(function (child: any) {
          if (child instanceof THREE.Mesh) {
            child.material.color.set(value);
          }
        });
      },
    });

    // 添加模型到场景中
    scene.add(object);
  });
};

export default init;
