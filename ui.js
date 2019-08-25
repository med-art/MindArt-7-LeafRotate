
let button1, button2, button3, button4;
let colH1, colH2, colH3;
let rectWidth;
let colChoice = 0;

let brushColours = [239, 51, 64, 168, 199, 0, 255, 215, 0, 241, 230, 178, 0, 107, 56];
let hexColours = ["#EF3340", "#A8C700", "#FFD700", "#F1E6B2", "#007236"]

function writeTextUI() {

  colH2 = color(130, 0, 20);
  colH3 = color(240, 0, 50);
  colH1 = color(355, 0, 20);

  textSize(longEdge / 50);
  fill(0);
  noStroke();



  button2 = createButton('Draw');
  button2.position(rectWidth/2, windowHeight - lmax * 5);
  button2.class('deselect');
  button2.mousePressed(drawImg);

  button3 = createButton('Wet');
  button3.position(rectWidth/2 + (12*lmax), windowHeight - lmax * 5);
  button3.class('deselect');
  button3.mousePressed(paintImg);

  button1 = createButton('Rotate');
  button1.position(rectWidth/2 + (24*lmax), windowHeight - lmax * 5);
  button1.class('select');
  button1.mousePressed(rotateImg);

  button4 = createButton('Save');
  button4.position(windowWidth - (28 * lmax) - (lmax * 1.5), windowHeight - lmax * 5);
  button4.class('save');
  button4.mousePressed(saveImg);

  button5 = createButton('New Drawing');
  button5.position(windowWidth - (18 * lmax) - (lmax * 1.5), windowHeight - lmax * 5);
  button5.class('restart');
  button5.mousePressed(restart);
}


function rotateImg(){
  button1.class('select');
  button2.class('deselect');
  button3.class('deselect');
  drawState = 0;
}

function drawImg(){
  button1.class('deselect');
  button2.class('select');
  button3.class('deselect');
  drawState = 1;
}

function paintImg(){
  button1.class('deselect');
  button2.class('deselect');
  button3.class('select');
  drawState = 2;
}

function writeRestartUI() {


  textSize(longEdge / 50);
  fill(0);
  noStroke();

  button2.remove();
  button2 = createButton('Restart');
  button2.position(windowWidth - (15 * lmax) - (lmax * 3), windowHeight - lmax * 6);
  colH2 = color(355, 70, 80);
  button2.style('background-color', colH2);
  button2.style('font-size', '2.5vmax');
  button2.style('color', 'white');
  button2.style('border-radius', '2.5vmax')
  button2.style('width', '15vmax')
  button2.mousePressed(restart);
}


function restart() {
  drawLayer.clear();
  leafSelector = int(random(0, 13));
  rot = PI;
  touchMoved();


}

function saveImg() {
  save('dotscape' + month() + day() + hour() + second() + '.jpg');
}

function makeSwatch(){

  for (let i = 1; i < 6; i++) {
    uiLayer.fill(color(hexColours[i - 1]));
    uiLayer.noStroke();
    uiLayer.rect(0, (rectWidth * i) - rectWidth, rectWidth/2, rectWidth * i);
    image(uiLayer, 0, 0);
  }
}
