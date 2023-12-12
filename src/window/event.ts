import Rect from "./class/rect";

const initEvent = (rect: Rect) => {
  const MAX_WIDTH = 500;
  const MAX_HEIGHT = 200;
  const MIN_WIDTH = 50;
  const MIN_HEIGHT = 50;
  let left = 150;
  let top = 50;
  let height = 100;
  let width = 200;
  const box = document.getElementById("box");
  const topBar = document.getElementById("top");
  const rightBar = document.getElementById("right");
  const bottomBar = document.getElementById("bottom");
  const leftBar = document.getElementById("left");
  const widthValue = document.getElementById("width_value");
  const heightValue = document.getElementById("height_value");
  if (widthValue) {
    widthValue.innerHTML = width + "";
  }
  if (heightValue) {
    heightValue.innerHTML = height + "";
  }
  let mousedown = false;
  let _tempTop = top;
  let _tempHeight = height;
  let _tempLeft = left;
  let _tempWidth = width;
  let type: "top" | "left" | "right" | "bottom" = "top";
  const begin = {
    x: 0,
    y: 0,
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!mousedown) {
      return;
    }
    const { clientX, clientY } = e;
    let offset = 0;
    if (box) {
      switch (type) {
        case "top":
          offset = begin.y - clientY;
          _tempTop = top - offset;
          if (_tempTop < 0) {
            _tempTop = 0;
            return;
          }
          _tempHeight = height + offset;
          if (_tempHeight < MIN_HEIGHT) {
            _tempHeight = MIN_HEIGHT;
            return;
          }
          if (heightValue) {
            heightValue.innerHTML = _tempHeight + "";
          }
          box.style.top = _tempTop + "px";
          box.style.height = _tempHeight + "px";
          break;
        case "bottom":
          offset = clientY - begin.y;
          _tempHeight = height + offset;
          if (_tempHeight < MIN_HEIGHT) {
            _tempHeight = MIN_HEIGHT;
            return;
          }
          if (top + _tempHeight > MAX_HEIGHT) {
            return;
          }
          if (heightValue) {
            heightValue.innerHTML = _tempHeight + "";
          }
          box.style.height = _tempHeight + "px";
          break;

        case "left":
          offset = begin.x - clientX;
          _tempLeft = left - offset;
          if (_tempLeft < 0) {
            _tempLeft = 0;
            return;
          }
          _tempWidth = width + offset;
          if (_tempWidth < MIN_WIDTH) {
            _tempWidth = MIN_WIDTH;
            return;
          }
          if (widthValue) {
            widthValue.innerHTML = _tempWidth + "";
          }
          box.style.left = _tempLeft + "px";
          box.style.width = _tempWidth + "px";
          break;

        case "right":
          offset = clientX - begin.x;
          _tempWidth = width + offset;
          if (left + _tempWidth > MAX_WIDTH) {
            return;
          }
          if (_tempWidth < MIN_WIDTH) {
            _tempWidth = MIN_WIDTH;
            return;
          }
          if (widthValue) {
            widthValue.innerHTML = _tempWidth + "";
          }
          box.style.width = _tempWidth + "px";
          break;
      }
    }
  };

  const onMouseDown = (e: any) => {
    mousedown = true;
    type = e.target.dataset.type;
    const { clientX, clientY } = e;
    begin.x = clientX;
    begin.y = clientY;
    document.addEventListener("mousemove", onMouseMove);
  };

  topBar?.addEventListener("mousedown", onMouseDown);
  bottomBar?.addEventListener("mousedown", onMouseDown);
  leftBar?.addEventListener("mousedown", onMouseDown);
  rightBar?.addEventListener("mousedown", onMouseDown);

  document?.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onMouseMove);
    height = _tempHeight;
    top = _tempTop;
    left = _tempLeft;
    width = _tempWidth;
    mousedown = false;
    rect.transform({
      type,
      value: type === "bottom" || type === "top" ? height : width,
    });
  });
};

export default initEvent;
