import * as THREE from "three";
import { ImprovedNoise } from "https://threejs.org/examples/jsm/math/ImprovedNoise.js";

let camera;
let scene;
let renderer;
let texture;

let bgColor;
let fogColor;

let worldWidth = 256;
let worldDepth = 256;

const clock = new THREE.Clock();
let matrix = new THREE.Matrix4();

const init = (memory_data) => {
  console.log(memory_data);

  //AXES
  //scene.add(new THREE.AxesHelper(1000));

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 1000, -400);
  camera.lookAt(0, 0, 0);

  bgColor = new THREE.Color(0x100021);
  fogColor = bgColor;

  //BACKGROUND
  scene.background = bgColor;

  //FOG
  scene.fog = new THREE.FogExp2(fogColor, 0.003);

  //HEIGHT DATA
  const data = generateHeight(worldWidth, worldDepth);

  //TERRAIN
  const terrainGeometry = new THREE.PlaneGeometry(
    7500,
    7500,
    worldWidth - 1,
    worldDepth - 1
  );
  terrainGeometry.rotateX(-Math.PI / 2);

  const vertices = terrainGeometry.attributes.position.array;

  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = data[i] * 10;
  }

  texture = new THREE.CanvasTexture(
    generateTexture(data, worldWidth, worldDepth)
  );
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  let terrainMesh = new THREE.Mesh(
    terrainGeometry,
    new THREE.MeshBasicMaterial({ map: texture, wireframe: false })
  );
  scene.add(terrainMesh);

  //RENDERER
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
  requestAnimationFrame(animate);
  matrix.makeRotationY((clock.getDelta() * 2 * Math.PI) / 60);

  // Apply matrix like this to rotate the camera.
  camera.position.applyMatrix4(matrix);

  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
};

export const createScene = (el, memory_data) => {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });

  init(memory_data);
  resize();
  animate();
};

window.addEventListener("resize", resize);

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

//GENERATE HEIGHT DATA
const generateHeight = (width, height) => {
  let seed = Math.PI / 4;
  window.Math.random = function () {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const size = width * height,
    data = new Uint8Array(size);
  const perlin = new ImprovedNoise(),
    z = Math.random() * 100;

  let quality = 1;

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = ~~(i / width);
      data[i] += Math.abs(
        perlin.noise(x / quality, y / quality, z) * quality * 1.75
      );
    }

    quality *= 5;
  }

  return data;
};

//GENERATE TEXTURE
const generateTexture = (data, width, height) => {
  let context, image, imageData, shade;

  const vector3 = new THREE.Vector3(0, 0, 0);

  const sun = new THREE.Vector3(1, 1, 1);
  sun.normalize();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext("2d");
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  image = context.getImageData(0, 0, canvas.width, canvas.height);
  imageData = image.data;

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    vector3.x = data[j - 2] - data[j + 2];
    vector3.y = 2;
    vector3.z = data[j - width * 2] - data[j + width * 2];
    vector3.normalize();

    shade = vector3.dot(sun);

    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
    imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
  }

  context.putImageData(image, 0, 0);

  // Scaled 4x

  const canvasScaled = document.createElement("canvas");
  canvasScaled.width = width * 4;
  canvasScaled.height = height * 4;

  context = canvasScaled.getContext("2d");
  context.scale(4, 4);
  context.drawImage(canvas, 0, 0);

  image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
  imageData = image.data;

  for (let i = 0, l = imageData.length; i < l; i += 4) {
    const v = ~~(Math.random() * 5);

    imageData[i] += v;
    imageData[i + 1] += v;
    imageData[i + 2] += v;
  }

  context.putImageData(image, 0, 0);

  return canvasScaled;
};
