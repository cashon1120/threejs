import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { scene, camera, renderer } from "../common";

interface Props {
  width: number;
  height: number;
  group: THREE.Group;
  depth?: number;
  x?: number;
  y?: number;
  z?: number;
  type?: "x" | "y";
}

interface Translate {
    type: "right" | "top" | "left" | "bottom";
  value: number;
  time?: number;
}

interface Transform {
  type: "right" | "top" | "left" | "bottom";
  value: number;
  time?: number;
}

class Bar {
  mesh: THREE.Mesh;
  group: THREE.Group;
  width: number;
  height: number;
  depth: number;
  constructor(params: Props) {
    const { width, height, group, depth = 2, x = 0, y = 0, z = 0 } = params;
    this.width = width;
    this.height = height;
    this.depth = depth;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color: "#f29e4b",
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.translateX(this.width / 2);
    this.mesh.translateY(this.height / 2);
    this.group = new THREE.Group();
    this.group.position.set(x, y, z);
    this.group.add(this.mesh);
    group.add(this.group);
  }
  translate = (params: Translate) => {
    const { type, value, time = 300 } = params;
    const target = this.group;
    const isHorizontal = type === "right" || type === "left";
    const isVertical = type === "top" || type === "bottom";
    const offsetValue = (type === "right" || type === 'top')  ? 4 : 0;
    const translateType = isHorizontal ? 'x' : 'y'
    const tween = new TWEEN.Tween(target.position)
      .to({ [translateType]: value - offsetValue }, time)
      .start();
    const render = () => {
      tween.update();
      renderer.render(scene, camera);
      if (target.position[translateType] !== value) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
  transform = (params: Transform) => {
    const { type, value, time = 300 } = params;
    const target = this.group;
    const _height = this.height;
    const _width = this.width;
    const isHorizontal = type === "right" || type === "left";
    const isVertical = type === "top" || type === "bottom";
    if (isHorizontal) {
      this.width = value;
    }
    if (isVertical) {
      this.height = value;
    }
    let positionTween = new TWEEN.Tween(target.position).to({ x: _width - value}, time)
    .start();
  
    const scaleType = isHorizontal ? "x" : "y";
    const tween = new TWEEN.Tween(target.scale)
      .to({ [scaleType]: value / (isHorizontal ? _width : _height) }, time)
      .start();
    const render = () => {
      tween.update();
      if(type === 'left'){
        positionTween.update();
      }
      renderer.render(scene, camera);
      if (target.scale[scaleType] !== value / (isHorizontal ? _width : _height)) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default Bar;
