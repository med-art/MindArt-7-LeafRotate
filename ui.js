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

      rectWidth = height / 5;

    button2.position(rectWidth / 2, lmax * 1);
    button3.position(rectWidth / 2, lmax * 5);
    button1.position(rectWidth / 2, lmax * 9);

    button4.position(rectWidth / 2, windowHeight - lmax * 5);
    button5.position(rectWidth / 2, windowHeight - lmax * 10);
  }

else if (width <= height) {

    rectWidth = width / 5;
    button2.position(1*lmax, windowHeight - lmax * 15);
    button3.position(13 * lmax, windowHeight - lmax * 15);
    button1.position(25 * lmax, windowHeight - lmax * 15);

    button4.position(windowWidth - (28 * lmax) - (lmax * 1.5), windowHeight - lmax * 15);
    button5.position(windowWidth - (18 * lmax) - (lmax * 1.5), windowHeight - lmax * 15);
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
}



function restart() {
  drawLayer.clear();
  leafSelector = int(random(0, 13));
  rot = PI;
  drawState = 0;
  touchMoved();
  rotateImg();


}

function saveImg() {
  save('dotscape' + month() + day() + hour() + second() + '.jpg');
}

function makeSwatch() {



  if (width > height) {

    rectWidth = height / 5;

    for (let i = 1; i < 6; i++) {
      uiLayer.fill(color(hexColours[i - 1]));
      uiLayer.noStroke();
      uiLayer.rect()
      uiLayer.rect(0, (rectWidth * i) - rectWidth, rectWidth / 2, rectWidth * i);
      image(uiLayer, 0, 0);
    }
  }

// portrait, UI on bottom
  if (width <= height) {

  rectWidth = width / 5;

    for (let i = 1; i < 6; i++) {
      uiLayer.fill(color(hexColours[i - 1]));
      uiLayer.noStroke();
      uiLayer.rect(rectWidth*(i-1), height-(rectWidth/2), rectWidth*(i), height);
      image(uiLayer, 0, 0);
    }
  }

}
