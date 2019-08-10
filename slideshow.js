let textStroke = 0;
let textStroke2 = 0;

function showIntro() {
  image(bg, 0, 0, width, height);
  textSize(lmax * 5);
  textAlign(CENTER);
  text("Circular Dotscape", width / 2, height * 0.4);
  textSize(lmax * 3.5);
  text("Touch the screen to begin", width / 2, height * 0.6);
  if (textStroke < 80) {
    fill(textStroke++);
    setTimeout(showIntro, 10);
  }
}

function exitIntro() {
  writeTextUI();
  nextGrid();

  introState = 0;
}
