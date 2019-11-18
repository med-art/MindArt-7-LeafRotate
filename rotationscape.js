let leaf = [];
let leafStroke = [];
let leafFill = [];
let leafLayer;
let hueDrift, brightDrift, satDrift;
let alphatest;
let longEdge, shortEdge, circleRad, vMax, wmax, hmax;
let rot = 0
let rotStart = 0;
let rotEnd = 0;
let drawState = 1;
let getCol = "#EF3340";
let leafSelector = 0;
let _r, _b, _g, _a;
let click;
let introLayer;
let sliderImg, sliderIcon;
let sliderPressed = 0;

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');
  click = loadSound('assets/click.mp3')
  for (i = 0; i < 6; i++) {
    leaf[i] = loadImage('assets/l' + [i] + '_shadow.png');
    leafStroke[i] = loadImage('assets/l' + [i] + '_stroke.png');
    leafFill[i] = loadImage('assets/l' + [i] + '_fill.png');
  }
  alphatest = loadImage('assets/alpha.png');
  sliderIcon = loadImage('assets/slider.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ignores retina displays
  // Create all layers for this sketch, and set their colourModes.
  // to Store main leaves
  leafLayer = createGraphics(width, height);
  leafLayer.colorMode(HSB, 360, 100, 100, 100);
  strokeLayer = createGraphics(width, height);
  permaLayer = createGraphics(width, height);
  permaLayer.background(127);
  //Visible draw Layer
  drawLayer = createGraphics(width, height);
  drawLayer.colorMode(RGB, 255, 255, 255, 100);
  drawLayer.stroke(0, 0, 0, 0);
  drawLayer.fill(0, 0, 0, 0);
  // Hidden layer, used to create a wider line to read Pixel values from
  hiddenLayer = createGraphics(width, height);
  hiddenLayer.colorMode(RGB, 255, 255, 255, 100);
  hiddenLayer.stroke(0, 0, 0, 0);
  hiddenLayer.fill(0, 0, 0, 0);
  textLayer = createGraphics(width, height);
  introLayer = createGraphics(width, height);
  leafChoice = createGraphics(width, height);
  sliderImg = createGraphics(width, height);
  scalarImg = createGraphics(width, height);
  dimensionCalc();
  slideShow();
}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    vMax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    vMax = height / 100;
    circleRad = shortEdge * 0.45;
  }
}

function mouseReleased() {
  drawLayer.stroke(0, 0, 0, 0);
  drawLayer.fill(0, 0, 0, 0);
  hiddenLayer.stroke(0, 0, 0, 0);
  hiddenLayer.fill(0, 0, 0, 0);
  sliderTouch = 0;
}

function touchMoved() {
  if (drawState === 0) {
    rotateLeaf(mouseX, mouseY);
  } else if (drawState === 1) {
    makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
  } else if (drawState === 2) {
    wetDrawing(winMouseX, winMouseY);
  }
  if (sliderTouch === 1) {
    if (mouseX > (4 * hmax) && mouseX < (12 * hmax) && mouseY > (4 * hmax) && mouseY < height / 2 - (4 * hmax)) {
      makeSlider();
      rotateLeaf(mouseX, mouseY);
    }
    if (mouseX > (4 * hmax) && mouseX < (13 * hmax) && mouseY > (height / 2) + (4 * hmax) && mouseY < height - (4 * hmax)) {
      makeScaler();
      scalar = mouseY / height;
      leafLayer.push();
      leafLayer.clear();
      leafLayer.imageMode(CENTER);
      leafLayer.translate(width / 2, height / 2);
      leafLayer.rotate(rot);
      leafLayer.translate(0, -height / 6);
      leafLayer.image(leaf[leafSelector], 0, 0, (shortEdge / 0.5) * scalar, (shortEdge / .5) * scalar);
      leafLayer.pop();
      strokeLayer.push();
      strokeLayer.clear();
      strokeLayer.imageMode(CENTER);
      strokeLayer.translate(width / 2, height / 2);
      strokeLayer.rotate(rot);
      strokeLayer.translate(0, -height / 6);
      strokeLayer.image(leafFill[leafSelector], 0, 0, (shortEdge / .5) * scalar, (shortEdge / .5) * scalar);
      strokeLayer.pop();
      //rotateLeaf(mouseX, mouseY);
    }
  }
  return false;
}

function rotateLeaf(_x, _y) {
  // rotEnd = atan2(_x - height / 2, _y - width / 2);
  // rot = rot + (rotEnd - rotStart);
  rot = (_y / height) * 6 * PI;
  //rotStart = rotEnd;
  leafLayer.push();
  leafLayer.clear();
  leafLayer.imageMode(CENTER);
  leafLayer.translate(width / 2, height / 2);
  leafLayer.rotate(rot);
  leafLayer.translate(0, -height / 6);
  leafLayer.image(leaf[leafSelector], 0, 0, (shortEdge / 0.5) * scalar, (shortEdge / .5) * scalar);
  leafLayer.pop();

  strokeLayer.push();
  strokeLayer.clear();
  strokeLayer.imageMode(CENTER);
  strokeLayer.translate(width / 2, height / 2);
  strokeLayer.rotate(rot);
  strokeLayer.translate(0, -height / 6);
  strokeLayer.image(leafFill[leafSelector], 0, 0, (shortEdge / .5) * scalar, (shortEdge / .5) * scalar);
  strokeLayer.pop();
}

function makeDrawing(_x, _y, pX, pY) {

  if (sliderTouch === 0){
  drawLayer.blendMode(BLEND);
  drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 60)); // for line work
  drawLayer.stroke(colArray[brushSelected]);
  drawLayer.line(_x, _y, pX, pY);
  drawLayer.blendMode(REMOVE)
  drawLayer.image(strokeLayer, 0, 0, width, height);
  // THE PROBLEM IS HERE
  // permaLayer.blendMode(BLEND);
  permaLayer.image(drawLayer, 0, 0, width, height);
  // hiddenLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 40, 110)); // for line work
  // hiddenLayer.stroke(getCol);
  // hiddenLayer.line(_x, _y, pX, pY);
}
}

function wetDrawing(_x, _y) {
  let off = (winMouseY * width + winMouseX) * 1 * 4;
  _r = hiddenLayer.pixels[off];
  _g = hiddenLayer.pixels[off + 1];
  _b = hiddenLayer.pixels[off + 2];
  _a = hiddenLayer.pixels[off + 3] * 0.095;
  drawLayer.fill(_r, _g, _b, _a);
  drawLayer.circle(_x, _y, 30, 30);
  hiddenLayer.fill(_r, _g, _b, _a);
  hiddenLayer.circle(_x, _y, 30, 30);
  drawLayer.loadPixels();
  hiddenLayer.loadPixels();
}

function draw() {
  if (introState === 3) {
    if (interrupt) {
      image(bg, 0, 0, width, height);
      image(leafChoice, 0, 0, width, height);
    } else {
      image(bg, 0, 0, width, height);
      image(leafLayer, 0, 0, width, height);
      blendMode(HARD_LIGHT);
      image(permaLayer, 0, 0, width, height);
      blendMode(BLEND);
      image(sliderImg, 0, 0, width, height);
      image(scalarImg, 0, 0, width, height);
    }
  } else {
    blendMode(BLEND);
    background(color("#ef6500"));
    if (slide > 0) {
      stroke(150);
      strokeWeight(7);
      //line(xintro[throughDotCount - 1], yintro[throughDotCount - 1], mouseX, mouseY);
      image(introLayer, 0, 0, width, height);
    }
    if (slide === 0) {} else {
      textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
    } // this if else statgement needs to be replaced with a better system. The current state tracking is not working
    image(textLayer, 0, 0, width, height);
  }
}
