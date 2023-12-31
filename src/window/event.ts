import Rect from "./class/rect";

const getById = (id: string) => {
  return document.getElementById(id);
};

const initEvent = (rect: Rect) => {
  const MAX_WIDTH = 500;
  const MAX_HEIGHT = 200;
  const MIN_WIDTH = 50;
  const MIN_HEIGHT = 50;
  let left = 150;
  let top = 50;
  let height = 100;
  let width = 200;
  const box = getById("box");
  const topBar = getById("top");
  const rightBar = getById("right");
  const bottomBar = getById("bottom");
  const leftBar = getById("left");
  const widthValue = getById("width_value");
  const heightValue = getById("height_value");

  let mousedown = false;
  let _tempTop = top;
  let _tempHeight = height;
  let _tempLeft = left;
  let _maxLeft = 0;
  let _maxTop = 0;
  let _minLeft = 0;
  let _minTop = 0;
  let _tempWidth = width;
  let type: "top" | "left" | "right" | "bottom" = "top";
  const begin = {
    x: 0,
    y: 0,
  };

  const setHeightValue = (value: number) => {
    if (heightValue) {
      heightValue.innerHTML = value + "";
    }
  };

  const setWidthValue = (value: number) => {
    if (widthValue) {
      widthValue.innerHTML = value + "";
    }
  };

  const setBoxStyle = (params: any) => {
    Object.keys(params).forEach((key: any) => {
      if (box) {
        box.style[key] = params[key] + "px";
      }
    });
  };

  setHeightValue(height);
  setWidthValue(width);

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
          _tempHeight = height + offset;
          _minTop = 0;
          _maxTop = 0;
          if (_tempHeight < MIN_HEIGHT) {
            _tempHeight = MIN_HEIGHT;
            _minTop = height - MIN_HEIGHT + top;
            setHeightValue(MIN_HEIGHT);
            return;
          }
          if (_tempHeight > MAX_HEIGHT) {
            _tempHeight = MAX_HEIGHT;
            _maxTop = height - MAX_HEIGHT + top;
            setHeightValue(MAX_HEIGHT);
            return;
          }
          setHeightValue(_tempHeight);
          setBoxStyle({ top: _tempTop, height: _tempHeight });
          break;

        case "bottom":
          offset = clientY - begin.y;
          _tempHeight = height + offset;
          _tempHeight = Math.min(Math.max(_tempHeight, MIN_HEIGHT), MAX_HEIGHT);
          setHeightValue(_tempHeight);
          setBoxStyle({ height: _tempHeight });
          break;

        case "left":
          offset = begin.x - clientX;
          _tempLeft = left - offset;
          _tempWidth = width + offset;
          _minLeft = 0;
          _maxLeft = 0;
          if (_tempWidth < MIN_WIDTH) {
            _tempWidth = MIN_WIDTH;
            _minLeft = width - MIN_WIDTH + left;
            setWidthValue(MIN_WIDTH);
            return;
          }
          if (_tempWidth > MAX_WIDTH) {
            _tempWidth = MAX_WIDTH;
            _maxLeft = width - MAX_WIDTH + left;
            setWidthValue(MAX_WIDTH);
            return;
          }
          setWidthValue(_tempWidth);
          setBoxStyle({ left: _tempLeft, width: _tempWidth });
          break;

        case "right":
          offset = clientX - begin.x;
          _tempWidth = width + offset;
          _tempWidth = Math.min(Math.max(_tempWidth, MIN_WIDTH), MAX_WIDTH);
          setWidthValue(_tempWidth);
          setBoxStyle({ width: _tempWidth });
          break;
      }
    }
  };

  const onMouseDown = (e: any) => {
    mousedown = true;
    type = e.target.dataset.type;
    if (type === "left" || type == "right") {
      document.body.className = "col";
    } else {
      document.body.className = "row";
    }
    const { clientX, clientY } = e;
    begin.x = clientX;
    begin.y = clientY;
    document.addEventListener("mousemove", onMouseMove);
  };

  const onMouseup = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.body.className = "";
    height = _tempHeight;
    top = _tempTop;
    left = _tempLeft;
    width = _tempWidth;
    _tempTop = _maxTop || _minTop || _tempTop;
    _tempLeft = _maxLeft || _minLeft || _tempLeft;
    mousedown = false;
    _maxLeft = 0;
    _maxTop = 0;
    _minLeft = 0;
    _minTop = 0;
    rect.transform({
      type,
      value: type === "bottom" || type === "top" ? height : width,
    });
  };

  topBar?.addEventListener("mousedown", onMouseDown);
  bottomBar?.addEventListener("mousedown", onMouseDown);
  leftBar?.addEventListener("mousedown", onMouseDown);
  rightBar?.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseup);
};

export default initEvent;
