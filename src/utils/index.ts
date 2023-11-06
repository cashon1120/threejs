
import * as THREE from 'three'

// 指定范围随机数
export const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min)) + min
}

// 屏幕坐标转设备坐标
export const getMousePosition = (event: MouseEvent, renderer: THREE.Renderer) => {
    const { clientLeft, clientTop, width, height } = renderer.domElement;
    const px = event.clientX - clientLeft;
    const py = event.clientY - clientTop;
    //屏幕坐标px、py转标准设备坐标x、y
    //width、height表示canvas画布宽高度
    const x = (px / width) * 2 - 1;
    const y = -(py / height) * 2 + 1;
    return {x, y}
}

