import * as THREE from "three";

const createWheels = () => {
  const arcShape = new THREE.Shape()
    .arc(0, 0, 1, 0, Math.PI * 2, true)
    .extractPoints(180);
  const holePath = new THREE.Shape()
    .arc(0, 0, 0.5, 0, Math.PI * 2, false)
    .extractPoints(180);

  const sp = new THREE.Shape(arcShape.shape);
  const hp = new THREE.Shape(holePath.shape);
  sp.holes.push(hp);
  let geometry = new THREE.ExtrudeGeometry(sp, {
    depth: 1,
    bevelEnabled: false,
    // bevelThickness: 15, //倒角尺寸:拉伸方向
    // bevelSize: 15, //倒角尺寸:垂直拉伸方向
    // bevelSegments: 20, //倒圆角：倒角细分精度，默认3
  });
  geometry.rotateY(Math.PI / 2);
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    color: "#000000",
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -3, 0);
  mesh.castShadow = true;
  return mesh;
};

const createCar = () => {
  const group = new THREE.Group();
  const carGeometry = new THREE.BoxGeometry(4, 4, 8);
  const carMaterial = new THREE.MeshLambertMaterial({
    color: "#ffffff",
  });
  const carMesh = new THREE.Mesh(carGeometry, carMaterial);
  carMesh.position.set(0, 0, 0);
  const wheel_left_front = createWheels();
  const wheel_right_front = createWheels();
  const wheel_left_back = createWheels();
  const wheel_right_back = createWheels();
  wheel_left_front.translateX(-2);
  wheel_left_front.translateZ(-4);

  wheel_right_front.translateX(1);
  wheel_right_front.translateZ(-4);

  wheel_left_back.translateX(-2);
  wheel_left_back.translateZ(3);

  wheel_right_back.translateX(1);
  wheel_right_back.translateZ(3);

  const headGeometry = new THREE.BoxGeometry(4, 2, 4);
  const headMesh = new THREE.Mesh(headGeometry, carMaterial);
  headMesh.castShadow = true;
  carMesh.castShadow = true;
  headMesh.position.set(0, -1, -4);
  group.add(carMesh);
  group.add(headMesh);
  group.add(wheel_left_front);
  group.add(wheel_right_front);
  group.add(wheel_left_back);
  group.add(wheel_right_back);
  group.castShadow = true;
  return group;
};


export default createCar