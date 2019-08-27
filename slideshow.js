let introText = ["Touch", "Listen", "Look"];
let slide = 0;
let delayTime = 7000;
let introState = 0;

function slideShow() {

  if (slide === introText.length) {
    textLayer.clear();
    introState = 3;
    writeTextUI();
    makeSwatch();
    restart();
  }

  if (slide < introText.length) {

    textLayer.clear();
    textLayer.fill("#FA6122");
    textLayer.rectMode(CORNER);
    textLayer.rect(0, 0, width, height);
    textLayer.fill(color("WHITE"));
    textLayer.textSize(lmax * 6);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    textLayer.text(introText[slide], width / 2, hmax * 50, width * 0.8, height);

    image(bg, 0, 0, width, height);
    image(textLayer, 0, 0, width, height);

    if (slide > 0) {
      slide++;
      setTimeout(slideShow, delayTime);
    }

  }
}
