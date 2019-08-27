let leaf = [];

let tempwinMouseX = 0;
let tempwinMouseY = 0;
let tempwinMouseX2 = 0;
let tempwinMouseY2 = 0;
let leafLayer, permaLine;
let dotSize = 4;
let dotQty = 20;
let ringQty = 0;
let hueDrift, brightDrift, satDrift;
let throughDotCount = 0;
let longEdge, shortEdge, circleRad, lmax, wmax, hmax;
let primaryArray = [360, 60, 240];
let colHue = 360,
  colSat = 100,
  colBri = 100;
let stage = 0;
let dotsCount = 0;
let hueCapture = 0;
let verifyX = 0;
let verifyY = 0;

let rot = 0
let rotStart = 0;
let rotEnd = 0;


let drawState = 1;

let colTemp;

let getCol = "#EF3340";

let leafSelector = 0;

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');
  for (i = 0; i < 14; i++) {
    leaf[i] = loadImage('assets/leaf' + [i] + '.png')
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ignores retina displays
  leafLayer = createGraphics(width, height);
  drawLayer = createGraphics(width, height);
  drawLayer2 = createGraphics(width, height);
  uiLayer = createGraphics(width, height);
  textLayer = createGraphics(width, height);
  leafChoice = createGraphics(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  leafLayer.colorMode(HSB, 360, 100, 100, 100);
  drawLayer.colorMode(RGB, 255, 255, 255, 100);
  drawLayer.stroke(0, 0, 0, 0);
  drawLayer.fill(0, 0, 0, 0);
  drawLayer2.colorMode(RGB, 255, 255, 255, 100);
  drawLayer2.stroke(0, 0, 0, 0);
  drawLayer2.fill(0, 0, 0, 0);
  //drawLayer.blendMode(REPLACE);
  dimensionCalc();
  //showIntro();
  slideShow();
  frameRate(400);

}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    lmax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    lmax = height / 100;
    circleRad = shortEdge * 0.45;
  }

}

function mousePressed() {


  if (interrupt === 1) {
    console.log("yes");
    leafCounter = 0;



    if (width < height) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          if (dist((i * (width / 3)) + shortEdge / 4, (j * (height / 4)) + shortEdge / 4, winMouseX, winMouseY) < shortEdge / 4) {
            console.log(leafCounter);
            leafSelector = leafCounter;
            interrupt = 0;
            rotateLeaf();

          }
                      leafCounter++;
        }
      }
    }

      if (width >= height) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 3; j++) {
            if (dist((i * (width / 4)) + shortEdge / 4, (j * (height / 3)) + shortEdge / 4, winMouseX, winMouseY) < shortEdge / 4) {
              console.log(leafCounter);
              leafSelector = leafCounter;
              interrupt = 0;
              rotateLeaf();

            }
                  leafCounter++;
          }
        }
      }
        leafCounter++;
      }
     else if (introState === 0) {
      audio.loop();
      slide = 1;
      slideShow();
      introState = 1;

    }  else if (introState === 3) {
      rotStart = atan2(mouseY - height / 2, mouseX - width / 2);
      if (width <= height && mouseY > (height - rectWidth / 2)) {
        getCol = uiLayer.get(winMouseX, winMouseY);
          drawImg();
      }
      if (width > height && mouseX < rectWidth / 2) {
        getCol = uiLayer.get(winMouseX, winMouseY);
          drawImg();
      }

    }



    //  return false;
  }

  function mouseReleased() {
    drawLayer.stroke(0, 0, 0, 0);
    drawLayer.fill(0, 0, 0, 0);
    drawLayer2.stroke(0, 0, 0, 0);
    drawLayer2.fill(0, 0, 0, 0);
  }


  function touchMoved() {

    if (drawState === 0) {
      rotateLeaf();


    } else if (drawState === 1) {
      makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);

    } else if (drawState === 2) {
      wetDrawing(winMouseX, winMouseY);
    }



    return false;
  }


  function rotateLeaf() {

    leafLayer.push();
    leafLayer.clear();
    leafLayer.imageMode(CENTER);
    leafLayer.translate(width / 2, height / 2);
    rotEnd = atan2(mouseY - height / 2, mouseX - width / 2);
    rot = rot + (rotEnd - rotStart);
    rotStart = rotEnd;

    leafLayer.rotate(rot);
    leafLayer.translate(0, -height / 10);
    leafLayer.tint(255, 10);
    leafLayer.image(leaf[leafSelector], 0, 0, (shortEdge / 1.15) * scalar, (shortEdge / 1.15) * scalar);
    leafLayer.pop();

  }

  function makeDrawing(_x, _y, pX, pY) {
    drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 3.5, 8)); // for line work
    drawLayer.stroke(getCol);
    drawLayer.line(_x, _y, pX, pY);
    drawLayer2.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 40, 110)); // for line work
    drawLayer2.stroke(getCol);
    drawLayer2.line(_x, _y, pX, pY);
  }


  function wetDrawing(_x, _y) {

    let _r = 0;
    let _b = 0;
    let _g = 0;
    let _a = 0;

    let off = (winMouseY * width + winMouseX) * 1 * 4;
    _r = drawLayer2.pixels[off];
    _g = drawLayer2.pixels[off + 1];
    _b = drawLayer2.pixels[off + 2];
    _a = drawLayer2.pixels[off + 3] * 0.1;


    drawLayer.fill(_r, _g, _b, _a);
    drawLayer.circle(_x, _y, 30, 30);
    drawLayer2.fill(_r, _g, _b, _a);
    drawLayer2.circle(_x, _y, 30, 30);
    drawLayer.loadPixels();
    drawLayer2.loadPixels();

  }


  function draw() {

    if (introState === 3) {
      if (interrupt) {
        image(bg, 0, 0, width, height);
        image(leafChoice, 0, 0, width, height);
      } else {
        image(bg, 0, 0, width, height);
        image(leafLayer, 0, 0, width, height);
        //blendMode(DARKEST);
        image(drawLayer, 0, 0, width, height);
        blendMode(BLEND);
        image(uiLayer, 0, 0, width, height);
      }
    }

  }
