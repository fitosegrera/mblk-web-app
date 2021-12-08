import * as THREE from "three";
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
import { Reflector } from "https://threejs.org/examples/jsm/objects/Reflector.js";
// import { Vibrant } from 'https://cdnjs.cloudflare.com/ajax/libs/vibrant.js/1.0.0/Vibrant.min.js';

let camera;
let scene;
let renderer;
let controls;
let raycaster;

//controls
let moveForward;
let moveBackward;
let moveLeft;
let moveRight;
let canJump;

let prevTime;
let velocity;
let direction;
let vertex;
let color;

// 3d objects
let scale;
let cols;
let rows;
let gndSize;
let rawData;
let rawDataMatrix;
let terrain = [[]];
let colors = [[]];
let angles = [[]];
let blobs = [[]];
let blobPosX = [[]];
let blobPosY = [[]];
let blobPosZ = [[]];
let blobSpeedX = [[]];
let blobSpeedY = [[]];
let blobSpeedZ = [[]];

let mirrorBox;

let mainTexture;

let bgColor;
let fogColor;
let gndColor;

let blobScaleX;
let blobScaleY;
let blobScaleZ;

const init = (memory_data) => {
  console.log(memory_data);

  gndSize = 2000;

  //AXES
  scene.add(new THREE.AxesHelper(1000));

  //CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    gndSize
  );
  camera.position.y = 10;

  controls = new PointerLockControls(camera, document.body);

  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  controls.addEventListener("lock", () => {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });

  controls.addEventListener("unlock", () => {
    blocker.style.display = "block";
    instructions.style.display = "";
  });

  scene.add(controls.getObject());

  bgColor = new THREE.Color(0x110011);
  fogColor = bgColor;
  gndColor = new THREE.Color(0x110011);

  //BACKGROUND
  scene.background = bgColor;

  //FOG
  scene.fog = new THREE.FogExp2(fogColor, 0.003);

  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  //BLOBS

  blobScaleX = 75;
  blobScaleY = 75;
  blobScaleZ = 75;

  const boxGeometry = new THREE.BoxGeometry(blobScaleX, blobScaleY, blobScaleZ);

  let boxMaterial = createMaterial("http://localhost:3333/blob_1");

  renderBlobs(boxGeometry, boxMaterial, memory_data);

  // lights
  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xcccccc);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);
  ///////

  //renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);
};

const animate = () => {
  requestAnimationFrame(animate);

  updateBlobs();

  const time = performance.now();

  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const delta = (time - prevTime) / 100;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }

  prevTime = time;

  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
};

export const createScene = (el, memory_data) => {
  //VARIABLES
  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  canJump = false;

  prevTime = performance.now();
  velocity = new THREE.Vector3();
  direction = new THREE.Vector3();
  vertex = new THREE.Vector3();
  color = new THREE.Color();

  //////////////

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

const renderBlobs = (geom, mat, data) => {
  scale = 150;

  rawData = data.raw.split(" ");
  rawData.splice(0, 1);

  //console.log('rawData length:', rawData.length);

  rows = Math.round(Math.sqrt(rawData.length));
  cols = rows;

  angles = new Array(rows);
  rawDataMatrix = new Array(rows);
  blobs = new Array(rows);
  blobPosX = new Array(rows);
  blobPosY = new Array(rows);
  blobPosZ = new Array(rows);
  blobSpeedX = new Array(rows);
  blobSpeedY = new Array(rows);
  blobSpeedZ = new Array(rows);

  for (let y = 0; y < rows; y++) {
    terrain[y] = new Array(cols);
    rawDataMatrix[y] = new Array(cols);
    blobs[y] = new Array(cols);
    angles[y] = new Array(cols);
    colors[y] = new Array(cols);
    blobPosX[y] = new Array(cols);
    blobPosY[y] = new Array(cols);
    blobPosZ[y] = new Array(cols);
    blobSpeedX[y] = new Array(cols);
    blobSpeedY[y] = new Array(cols);
    blobSpeedZ[y] = new Array(cols);

    for (let x = 0; x < cols; x++) {
      let index = x + y * rows;
      //console.log('index', x + y * rows);
      rawDataMatrix[y][x] = rawData[index];

      let tmpScale = (Math.random() * rawDataMatrix[y][x]) / 2;
      const boxGeometry = new THREE.BoxGeometry(tmpScale, tmpScale, tmpScale);

      blobs[y][x] = new THREE.Mesh(boxGeometry, mat);

      blobs[y][x].position.x = getRandomArbitrary(-gndSize / 2, gndSize / 2);
      blobs[y][x].position.y = getRandomArbitrary(blobScaleY, gndSize / 2);
      blobs[y][x].position.z = getRandomArbitrary(-gndSize / 2, gndSize / 2);
      blobs[y][x].rotation.x = Math.PI / getRandomArbitrary(1, 5);
      scene.add(blobs[y][x]);

      angles[y][x] = {
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360,
      };
      blobPosX[y][x] = 0; //getRandomArbitrary(-gndSize / 2, gndSize / 2);
      blobPosY[y][x] = 0; //getRandomArbitrary(scale * 10, gndSize);
      blobPosZ[y][x] = 0; //getRandomArbitrary(-gndSize / 2, gndSize / 2);
      blobSpeedX[y][x] = getRandomArbitrary(-1, 1);
      blobSpeedY[y][x] = getRandomArbitrary(-1, 1);
      blobSpeedZ[y][x] = getRandomArbitrary(-1, 1);

      //console.log(rawDataMatrix[y][x]);
    }
  }
};

const updateBlobs = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      blobs[y][x].rotation.y += blobSpeedY[y][x] / 100;
      blobs[y][x].rotation.x -= blobSpeedX[y][x] / 100;
      blobs[y][x].rotation.z += blobSpeedZ[y][x] / 100;
      blobs[y][x].position.y += blobSpeedY[y][x];
      blobs[y][x].position.x -= blobSpeedX[y][x];
      blobs[y][x].position.z += blobSpeedZ[y][x];

      if (
        blobs[y][x].position.x >= gndSize / 2 - blobScaleX / 2 ||
        blobs[y][x].position.x <= -gndSize / 2 + blobScaleX / 2
      ) {
        blobSpeedX[y][x] *= -1;
      }

      if (
        blobs[y][x].position.y <= 0 + blobScaleX / 2 ||
        blobs[y][x].position.y >= gndSize / 2 - blobScaleX / 2
      ) {
        blobSpeedY[y][x] *= -1;
      }

      if (
        blobs[y][x].position.z >= gndSize / 2 ||
        blobs[y][x].position.z <= -gndSize / 2
      ) {
        blobSpeedZ[y][x] *= -1;
      }
    }
  }
};

const createMaterial = (src) => {
  // create a texture loader.
  const textureLoader = new THREE.TextureLoader();

  // load a texture
  mainTexture = textureLoader.load(src);

  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new THREE.MeshStandardMaterial({
    map: mainTexture,
  });

  return material;
};
