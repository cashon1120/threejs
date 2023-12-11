import * as THREE from "three";
import Bar from "../class/bar";

interface Props {
  group: THREE.Group;
  width: number;
  height: number;
  barWidth: number; // 材质的宽度, 注意和width的区别
  depth: number;
  x?: number;
  y?: number;
  z?: number;
  leftBar?: Bar;
  topBar?: Bar;
  rightBar?: Bar;
  bottomBar?: Bar;
  color?: string;
}

class Track extends Bar {
  bar: Bar;
  constructor(params: Props) {
    super(params);
    const {
      width,
      height,
      depth = 3,
      color = "#eee",
      x = 0,
      y = 0,
      z = 0,
    } = params;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
    });
    this.group = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, material);

    const geometry2 = new THREE.BoxGeometry(width, height + 1, depth - 2);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#ffe500',
    });
    this.group = new THREE.Group();
    const mesh2 = new THREE.Mesh(geometry2, material2); 

    this.group.add(mesh);
    this.group.add(mesh2);
    this.group.position.set(x, y, z);
    this.bar = new Bar({
      width,
      height,
      depth,
      meshGroup: this.group,
      align: "bottom",
    });
  }
  init() {
    this.bar.init();
    return this;
  }
}

export default Track;
