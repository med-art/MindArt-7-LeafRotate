let introText = ["Touchez", "Regardez", "Ecoutez", "Touchez"];
let slide = 0, introState = 0, delayTime = 1000, startButton;

function slideShow() {
  if (slide === 0) {
    startButton = createButton(introText[0]);
    startButton.class("startButton");
    startButton.position((width / 2) - (12 * vMax), (height / 2) - (4 * vMax));
  }
  if (slide === introText.length) {
    textLayer.clear();
    introState = 3;
    //windowResized();
    writeTextUI();
    rotateLeaf(width/2,height);
    counter = 0;
  } else if (slide < introText.length && slide > 0) {
    textLayer.clear();
    textLayer.fill(255, 5);
    textLayer.textSize(vMax * 8);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    if (slide > 0) {
      if (slide === introText.length - 1) {
        delayTime = 1000;
      }
      slide++;
      setTimeout(slideShow, delayTime);
    }
  }
}
