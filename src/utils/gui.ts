// 引入dat.gui.js的一个类GUI
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import renderer from "./render";
import scene from "./scene";
import camera from "./camera";

const gui = new GUI();
//改变交互界面style属性
gui.domElement.style.right = "0px";
gui.domElement.style.width = "300px";
gui.onChange(() => {
  renderer.render(scene, camera);
});


export default gui;
