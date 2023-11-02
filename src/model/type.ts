import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export interface InitProps {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    controls?: OrbitControls
}