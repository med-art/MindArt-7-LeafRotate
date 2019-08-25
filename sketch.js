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

let introState = 1;

let drawState = 0;

let colTemp;

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
  uiLayer = createGraphics(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  leafLayer.colorMode(HSB, 360, 100, 100, 100);
  drawLayer.colorMode(RGB, 255, 255, 255, 100);
  //drawLayer.blendMode(REPLACE);
  dimensionCalc();
  //showIntro();
  writeTextUI();
  makeSwatch();
  noTint();
  image(bg, 0, 0, width, height);
  rot = PI;
  touchMoved();
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
    rectWidth = height / 5;
}

function touchStarted(){

  rotStart = atan2(mouseY - height / 2, mouseX - width / 2);

    if (mouseX < rectWidth/2) {
      if (mouseY < rectWidth) {
        colChoice = 0;
      } else if (mouseY > rectWidth && mouseY < rectWidth * 2) {
            colChoice = 1;
      } else if (mouseY > rectWidth * 2 && mouseY < rectWidth * 3) {
            colChoice = 2;
      } else if (mouseY > rectWidth * 3 && mouseY < rectWidth * 4) {
            colChoice = 3;
      } else if (mouseY > rectWidth * 4) {
         colChoice = 4;
      }
      return false;
  }
}


function touchMoved() {

  if (drawState === 0){

  leafLayer.push();
  leafLayer.clear();
  leafLayer.imageMode(CENTER);
  leafLayer.translate(width / 2, height / 2);
    rotEnd = atan2(mouseY - height / 2, mouseX - width / 2);
    rot = rot + (rotEnd - rotStart);
    rotStart = rotEnd;

  leafLayer.rotate(rot);
  leafLayer.translate(0,-height/6)
  leafLayer.tint(255,10);
  leafLayer.image(leaf[leafSelector], 0, 0, width / 2.5, width / 2.5);
  leafLayer.pop();



}

else if (drawState === 1){
      makeDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);

}

else if (drawState === 2){
      wetDrawing(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
}



return false;
}


function makeDrawing(_x, _y, pX, pY){
  drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 5, 15)); // for line work
    drawLayer.stroke(hexColours[colChoice]);
  drawLayer.line(_x, _y, pX, pY);
}

function wetDrawing(_x, _y, pX, pY){
//  colTemp = drawLayer.get(_x, _y);

  let off = (winMouseY * width + winMouseX) * 1 * 4;
  drawLayer.loadPixels();
  let _r = drawLayer.pixels[off];
  let _g = drawLayer.pixels[off + 1];
  let _b = drawLayer.pixels[off + 2];
  let _a = drawLayer.pixels[off + 3]*0.1;


  drawLayer.stroke(_r,_g,_b,_a);
  drawLayer.strokeWeight(constrain(abs((_y + _x) - (pX + pY)), 30, 35)); // for line work
    drawLayer.line(_x, _y, pX, pY);
}


function draw() {
  image(bg, 0, 0, width, height);
    image(leafLayer, 0, 0, width, height);
  image(drawLayer, 0, 0, width, height);
  image(uiLayer, 0, 0, width, height);

}
