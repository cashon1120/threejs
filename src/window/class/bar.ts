import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { scene, camera, renderer } from "../../common";

type AlignType = "right" | "top" | "left" | "bottom" | "center";

interface Props {
  width: number;
  height: number;
  depth: number;
  color?: string;
  group?: THREE.Group;
  x?: number;
  y?: number;
  z?: number;
  meshGroup?: THREE.Group;
  align?: AlignType;
}

interface Params {
  type: "right" | "top" | "left" | "bottom";
  value: number;
  time?: number;
}

class Bar {
  meshGroup: THREE.Group;
  geometry?: THREE.BoxGeometry;
  material?: THREE.Material;
  group: THREE.Group;
  parentGroup: THREE.Group;
  width: number;
  height: number;
  depth: number;
  align?: AlignType;
  x: number;
  y: number;
  z: number;
  constructor(params: Props) {
    const {
      width,
      height,
      depth = 3,
      color = "#eee",
      x = 0,
      y = 0,
      z = 0,
      meshGroup,
      group,
      align = "center",
    } = params;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.x = x;
    this.y = y;
    this.z = z;
    this.align = align;
    this.parentGroup = group || new THREE.Group();
    this.group = new THREE.Group();
    if (meshGroup) {
      this.meshGroup = meshGroup;
    } else {
      const geometry = new THREE.BoxGeometry(width, height, depth);
      this.geometry = geometry;
      const material = new THREE.MeshPhongMaterial({
        color,
      });
      this.material = material;
      this.meshGroup = new THREE.Group().add(new THREE.Mesh(geometry, material));
      this.group = new THREE.Group();
    }
  }
  init() {
    switch (this.align) {
      case "top":
        this.meshGroup.translateY(-this.height / 2);
        break;
      case "right":
        this.meshGroup.translateX(-this.width / 2);
        break;
      case "bottom":
        this.meshGroup.translateY(this.height / 2);
        break;
      case "left":
        this.meshGroup.translateX(this.width / 2);
        break;
    }
    this.group.position.set(this.x, this.y, this.z);
    this.group.add(this.meshGroup);
    if (this.parentGroup) {
      this.parentGroup.add(this.group);
    }
    return this;
  }
  translate = (params: Params) => {
    const { type, value, time = 300 } = params;
    const target = this.group;
    const isHorizontal = type === "right" || type === "left";
    const translateType = isHorizontal ? "x" : "y";
    const tween = new TWEEN.Tween(target.position)
      .to({ [translateType]: value }, time)
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
  transform = (params: Params) => {
    const { type, value, time = 300 } = params;
    if (!type) {
      throw new Error("请输入变化类型, 如: left | right | top | bottom");
    }
    const target = this.group;
    const _height = this.height;
    const _width = this.width;
    const isHorizontal = type === "right" || type === "left";
    const isVertical = type === "top" || type === "bottom";
    let positionTween: any;
    if (type === "top") {
      this.height = value;
      positionTween = new TWEEN.Tween(target.position)
        .to({ y: value / 2 }, time)
        .start();
    }

    if (type === "right") {
      positionTween = new TWEEN.Tween(target.position)
        .to({ x: value / 2 }, time)
        .start();
      this.width = value;
      console.log(1)
    }

    if (type === "bottom") {
      const targetValue = target.position.y - (value - this.height) / 2;
      positionTween = new TWEEN.Tween(target.position)
        .to({ y: targetValue }, time)
        .start();
      this.height = value;
    }

    if (type === "left") {
      const targetValue = target.position.x - (value - this.width) / 2;
      positionTween = new TWEEN.Tween(target.position)
        .to({ x: targetValue }, time)
        .start();
    }

    if (isHorizontal) {
      this.width = value;
    }
    if (isVertical) {
      this.height = value;
    }

    const scaleType = isHorizontal ? "x" : "y";
    const tween = new TWEEN.Tween(target.scale)
      .to({ [scaleType]: value / (isHorizontal ? _width : _height) }, time)
      .start();
    const render = () => {
      tween.update();
      positionTween.update();
      renderer.render(scene, camera);
      if (
        target.scale[scaleType] !==
        value / (isHorizontal ? _width : _height)
      ) {
        requestAnimationFrame(render);
      }
    };
    render();
  };
}

export default Bar;
