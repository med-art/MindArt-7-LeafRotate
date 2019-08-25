let button1, button2, button3, button4;
let colH1, colH2, colH3;
let rectWidth;
let colChoice = 0;

let brushColours = [239, 51, 64, 168, 199, 0, 255, 215, 0, 241, 230, 178, 0, 107, 56];
let hexColours = ["#EF3340", "#A8C700", "#FFD700", "#FA6122", "#007236", "#4C6A90"]

function writeTextUI() {

  colH2 = color(130, 0, 20);
  colH3 = color(240, 0, 50);
  colH1 = color(355, 0, 20);

  textSize(longEdge / 50);
  fill(0);
  noStroke();



  button2 = createButton('Draw');
  button2.class('deselect');
  button2.mousePressed(drawImg);

  button3 = createButton('Wet');
  button3.class('deselect');
  button3.mousePressed(paintImg);

  button1 = createButton('Rotate');
  button1.class('select');
  button1.mousePressed(rotateImg);

  button4 = createButton('Save');

  button4.class('save');
  button4.mousePressed(saveImg);

  button5 = createButton('New Drawing');

  button5.class('restart');
  button5.mousePressed(restart);

  if (width > height) {

      rectWidth = height / 6;

    button2.position(rectWidth / 2, 0);
    button3.position(rectWidth / 2, lmax * 3.5);
    button1.position(rectWidth / 2, lmax * 7);

    button4.position(rectWidth / 2, windowHeight - lmax * 8);
    button5.position(rectWidth / 2, windowHeight - lmax * 4);
  }

else if (width <= height) {

    rectWidth = width / 6;
    button2.position(0, windowHeight - rectWidth/2 - (4*lmax));
    button3.position(12 * lmax, windowHeight -  rectWidth/2- (4*lmax));
    button1.position(24 * lmax, windowHeight -  rectWidth/2- (4*lmax));

    button4.position(windowWidth - (28 * lmax) - (lmax * 1.5), windowHeight - rectWidth/2 - (4*lmax));
    button5.position(windowWidth - (18 * lmax) - (lmax * 1.5), windowHeight - rectWidth/2 - (4*lmax));
  }

}


function rotateImg() {
  button1.class('select');
  button2.class('deselect');
  button3.class('deselect');
  drawState = 0;
}

function drawImg() {
  button1.class('deselect');
  button2.class('select');
  button3.class('deselect');
  drawState = 1;
}

function paintImg() {
  button1.class('deselect');
  button2.class('deselect');
  button3.class('select');
  drawState = 2;
    drawLayer.loadPixels();
}



function restart() {
  drawLayer.clear();
  leafSelector = int(random(0, 13));
  rot = 0;
  drawState = 0;
  touchMoved();
  rotateImg();


}

function saveImg() {
  save('dotscape' + month() + day() + hour() + second() + '.jpg');
}

function makeSwatch() {



  if (width > height) {

    rectWidth = height / 6;

    for (let i = 1; i < 7; i++) {
      uiLayer.fill(color(hexColours[i - 1]));
      uiLayer.noStroke();
      uiLayer.rect()
      uiLayer.rect(0, (rectWidth * i) - rectWidth, rectWidth / 2, rectWidth * i);
      image(uiLayer, 0, 0);
    }
  }

// portrait, UI on bottom
  if (width <= height) {

  rectWidth = width / 6;

    for (let i = 1; i < 7; i++) {
      uiLayer.fill(color(hexColours[i - 1]));
      uiLayer.noStroke();
      uiLayer.rect(rectWidth*(i-1), height-(rectWidth/2), rectWidth*(i), height);
      image(uiLayer, 0, 0);
    }
  }

}
