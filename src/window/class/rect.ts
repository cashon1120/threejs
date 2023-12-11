import Bar from "./bar";
import * as THREE from "three";

interface Props {
  group: THREE.Group;
  width: number;
  height: number;
  barWidth: number;
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

interface TranformProps {
  type: "right" | "top" | "left" | "bottom";
  value: number;
  time?: number;
}

/**
 * 矩形框，有4个边
 */
class Rect {
  leftBar: Bar;
  topBar: Bar;
  rightBar: Bar;
  bottomBar: Bar;
  barWidth: number;
  width: number;
  height: number;
  depth: number;
  group: THREE.Group;
  top: number;
  left: number;
  right: number;
  bottom: number;
  constructor(params: Props) {
    const {
      width,
      height,
      group,
      barWidth,
      depth = 2,
      x = 0,
      y = 0,
      z = 0,
      leftBar,
      topBar,
      rightBar,
      bottomBar,
      color = "#eeeeee",
    } = params;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.left = 0;
    this.top = height;
    this.right = width;
    this.bottom = 0;
    this.barWidth = barWidth;
    this.topBar =
      topBar ||
      new Bar({
        width: width,
        height: barWidth,
        x: this.width / 2,
        y: this.height,
        align: "top",
        depth,
        color,
      }).init();
    this.rightBar =
      rightBar ||
      new Bar({
        width: barWidth,
        height: height,
        x: this.width,
        y: height / 2,
        align: "right",
        depth,
        color,
      }).init();
    this.leftBar =
      leftBar ||
      new Bar({
        width: barWidth,
        height: height,
        y: height / 2,
        depth,
        color,
        align: "left",
      }).init();
    this.bottomBar =
      bottomBar ||
      new Bar({
        width: width,
        height: barWidth,
        x: this.width / 2,
        align: "bottom",
        depth,
        color,
      }).init();

    this.group = new THREE.Group();
    this.group.position.set(x, y, z);
    this.group.add(this.topBar.group);
    this.group.add(this.rightBar.group);
    this.group.add(this.bottomBar.group);
    this.group.add(this.leftBar.group);
    group.add(this.group);
  }
  transform = (params: TranformProps) => {
    const { type, value, time = 300 } = params;

    switch (type) {
      case "top":
        if (this.height === value) {
          return;
        }
        this.topBar.translate({
          type,
          value: value + this.bottom,
          time,
        });
        this.leftBar.transform({
          type,
          value,
          time,
        });
        this.rightBar.transform({
          type,
          value: value,
          time,
        });
        this.height = value;
        this.top = this.height + this.bottom;
        break;
      case "right":
        if (this.width === value) {
          return;
        }
        this.width = value;
        this.topBar.transform({
          type,
          value,
          time,
        });
        this.bottomBar.transform({
          type,
          value,
          time,
        });
        this.rightBar.translate({
          type,
          value: value,
          time,
        });
        this.width = value;
        break;
      case "bottom":
        if (this.height === value) {
          return;
        }
        this.bottomBar.translate({
          type,
          value: this.height - value,
          time,
        });
        this.leftBar.transform({
          type,
          value,
          time,
        });

        this.rightBar.transform({
          type,
          value,
          time,
        });
        this.bottom = this.height - value;
        this.height = value;
        break;

      case "left":
        if (this.width === value) {
          return;
        }
        this.leftBar.translate({
          type,
          value: this.width - value,
          time,
        });
        this.topBar.transform({
          type,
          value,
          time,
        });
        this.bottomBar.transform({
          type,
          value,
          time,
        });
        this.width = value;
        break;
    }
  };
}

export default Rect;
