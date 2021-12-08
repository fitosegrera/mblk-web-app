<script>
  import { onMount } from "svelte";

  export let memory_data;

  onMount(async () => {
    const p5Module = await import("p5");
    let P5 = p5Module.default;
    new P5(sketch);

    // console.log(memory_data);
  });

  const sketch = (p5) => {
    let canv;

    let blob_1, blob_2;
    let blob1_posX, blob1_posY, blob2_posX, blob2_posY;

    //Background variables
    const skyBoxSize = 2000;

    //WEBGL Variables
    let cam;
    const speed = 20;
    const mouseSensitivity = 0.1;

    //////// Terrain Variables
    let scale;
    let w;
    let h;
    let flying;
    let cols;
    let rows;
    let gndSize;
    let terrain = [[]];
    let colors = [[]];
    let angles = [[]];
    let blobPosX = [[]];
    let blobPosY = [[]];
    let blobPosZ = [[]];
    let blobSpeedX = [[]];
    let blobSpeedY = [[]];
    let blobSpeedZ = [[]];
    ////////

    //////// Brain data variables
    let rawData;
    let rawDataMatrix;
    let attention;
    let relaxation;
    let rotX = 15; //memory_data.gyroscope.x;
    let rotY = 15; //memory_data.gyroscope.y;
    let rotZ = 15; //memory_data.gyroscope.z;

    let memoryData = JSON.parse(memory_data);

    console.log("memory_data", memoryData[0]);

    p5.preload = () => {
      blob_1 = p5.loadImage("http://localhost:3333/blob_3");
      blob_2 = p5.loadImage("http://localhost:3333/blob_3");
    };

    p5.setup = () => {
      canv = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
      canv.parent("generative");
      p5.background(0, 0);
      p5.angleMode(p5.DEGREES);
      p5.noiseDetail(10, 0.5);
      p5.textureMode(p5.NORMAL);
      // p5.rectMode(p5.CORNER);

      blob1_posX = 0;
      blob1_posY = 0;
      blob2_posX = 0;
      blob2_posY = 0;

      w = p5.width;
      h = p5.height;
      scale = 150;
      flying = 0;
      gndSize = 8000;

      rawData = memoryData[0].raw.split(" ");
      rawData.splice(0, 1);

      //console.log('rawData length:', rawData.length);

      rows = 5; //p5.round(p5.sqrt(rawData.length));
      cols = rows;

      //console.log('cols', cols, 'rows', rows, 'rows x cols', cols * rows);

      terrain = new Array(rows);
      rawDataMatrix = new Array(rows);
      colors = new Array(rows);
      angles = new Array(rows);
      blobPosX = new Array(rows);
      blobPosY = new Array(rows);
      blobPosZ = new Array(rows);
      blobSpeedX = new Array(rows);
      blobSpeedY = new Array(rows);
      blobSpeedZ = new Array(rows);

      for (let y = 0; y < rows; y++) {
        terrain[y] = new Array(cols);
        rawDataMatrix[y] = new Array(cols);
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
          colors[y][x] = blob_2.get(
            p5.round(p5.random(blob_2.width)),
            p5.round(p5.random(blob_2.height))
          );

          angles[y][x] = {
            x: p5.map(rawDataMatrix[y][x], -1000, 1000, -180, 0),
            y: p5.map(rawDataMatrix[y][x], -1000, 1000, 0, 180),
            z: p5.random(rotZ),
          };

          let speedLimit = 5;
          blobPosX[y][x] = p5.random(-gndSize / 3, gndSize / 3);
          blobPosY[y][x] = p5.random(scale, -gndSize / 3);
          blobPosZ[y][x] = p5.random(-gndSize / 3, gndSize / 2);
          blobSpeedX[y][x] = p5.random(-speedLimit, speedLimit);
          blobSpeedY[y][x] = p5.random(-speedLimit, speedLimit);
          blobSpeedZ[y][x] = p5.random(-speedLimit, speedLimit);

          //console.log(rawDataMatrix[y][x]);
        }
      }

      let shift = 2;
      cam = p5.createCamera();
      cam.move(0, -scale, 0);
      cam.pan(p5.random(-shift, shift));
      // cam.tilt(p5.random(10, -shift * 9));
      cam.tilt(260);

      //p5.background(colors[0][1]);
    };

    p5.draw = () => {
      //p5.background(colors[0][1]);
      //drawBlobs();
      //p5.debugMode();
      controls();
      //cameraWalk();

      // flying -= 0.01;
      // noiseSpace(flying);
      //let ambientColor = p5.color(255, 0, 255, 250);
      //p5.ambientMaterial(ambientColor);
      p5.shininess(25);
      p5.noStroke();

      p5.translate(-w / 2, -h, 0);
      renderSpace();
      //p5.translate(w / 2, h - 4 * scale, w);
      renderSoftMemory();
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    let mouseCaptured = false;

    // p5.mouseClicked = () => {
    // 	if (!mouseCaptured) {
    // 		mouseCaptured = true;
    // 		p5.requestPointerLock();
    // 	}
    // };

    const renderSpace = () => {
      //p5.ambientLight(colors[0][0]);
      // // console.log(p5.red(colors[0][0]));
      // p5.directionalLight(255, 255, 255, 0, 0, gndSize / 2);
      // p5.specularMaterial(200);
      // p5.shininess(30);
      // p5.noStroke();
      // p5.texture(blob_1);
      // p5.push();
      // p5.translate(0, p5.height, 0);
      // p5.rotateX(90);
      // //p5.plane(gndSize, gndSize);
      // p5.translate(0, 0, gndSize / 2);
      // // translate(0, 0, 0);
      // p5.noStroke();
      // //p5.box(gndSize, gndSize, gndSize);
      // p5.pop();
    };

    const renderSoftMemory = () => {
      //p5.scale(0.5);
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          p5.push();
          p5.texture(blob_2);
          p5.translate(blobPosX[x][y], blobPosY[x][y], blobPosZ[x][y]);
          p5.rotateX(
            angles[x][y].x * p5.map(rawDataMatrix[x][y], -1000, 1000, 0, 90)
          );
          p5.rotateY(
            angles[x][y].y * p5.map(rawDataMatrix[x][y], -1000, 1000, 0, 180)
          );
          p5.rotateZ(
            angles[x][y].z * p5.map(rawDataMatrix[x][y], -1000, 1000, 0, 360)
          );
          p5.box(scale);
          p5.pop();

          angles[x][y].x += rawDataMatrix[x][y] / 50000;
          angles[x][y].y += rawDataMatrix[x][y] / 45000;
          angles[x][y].z += rawDataMatrix[x][y] / 50000;

          blobPosX[x][y] += blobSpeedX[x][y];
          if (blobPosX[x][y] <= -gndSize / 2 || blobPosX[x][y] >= gndSize / 2) {
            blobSpeedX[x][y] *= -1;
          }

          blobPosY[x][y] += blobSpeedY[x][y];
          //console.log(blobPosY[x][y]);
          if (blobPosY[x][y] >= p5.height || blobPosY[x][y] <= -gndSize / 2) {
            blobSpeedY[x][y] *= -1;
          }

          blobPosZ[x][y] += blobSpeedZ[x][y];
          if (blobPosZ[x][y] <= -gndSize / 2 || blobPosZ[x][y] >= gndSize / 2) {
            blobSpeedZ[x][y] *= -1;
          }
        }
      }

      // p5.push();
      // p5.fill(255, 0, 255);
      // p5.translate(0, 0, -gndSize / 2);
      // p5.box(scale * 10, scale * 4, 5);
      // p5.pop();

      // p5.push;
      // p5.fill(0, 255, 255);
      // p5.translate(0, 0, gndSize / 2);
      // p5.box(scale * 10, scale * 4, 5);
      // p5.pop();
    };

    const controls = () => {
      if (mouseCaptured) {
        if (p5.keyIsDown(27)) {
          mouseCaptured = false;
          p5.exitPointerLock();
        }

        cam.pan(-p5.movedX * mouseSensitivity);
        cam.tilt(p5.movedY * mouseSensitivity);
        cam.move(
          // D - right, A - left
          (p5.keyIsDown(68) ? speed : 0) + (p5.keyIsDown(65) ? -speed : 0),
          // Q - down, E - up
          (p5.keyIsDown(81) ? speed : 0) + (p5.keyIsDown(69) ? -speed : 0),
          // S - backward, W - forward
          (p5.keyIsDown(83) ? speed : 0) + (p5.keyIsDown(87) ? -speed : 0)
        );
      }
    };
  };
</script>
