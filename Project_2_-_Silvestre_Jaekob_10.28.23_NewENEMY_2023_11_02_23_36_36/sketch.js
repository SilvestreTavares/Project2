let img;
let aimg;
let alien = [];
let cloud1img;
let cloud = [];
let c1timer = 150;
let a1timer = 100;
let timeCheck;
let score;
let cboxR = 50;
let cboxX; //declate the variables without any values
let cboxY;
let backgroundTheme;
let a2img;
let alien2 = [];
let a2timer = 250;

function preload() {
  img = loadImage("ship.png");
  aimg = loadImage("Alien/Enemy1.png");
  cloud1img = loadImage("cloud.png");
  a2img = loadImage("Alien/Enemy2.png");

  soundFormats("mp3");
  backgroundTheme = loadSound("music/bgm.mp3"); // looks like there was a spelling error here
}

function setup() {
  let canvas = createCanvas(800, 800);

  canvas.parent("game");

  timeCheck = 0;
  score = 0;
  noCursor(); //enable this code when you publish the final project

  backgroundMusic();
}

function backgroundMusic() {
  backgroundTheme.play();
  backgroundTheme.loop();
  backgroundTheme.setVolume(0.1);
  userStartAudio();
}

function draw() {
  background(0, 150, 240);
  noSmooth();

  stroke(255);
  fill(255, 255, 255, 255);
  textSize(20);
  text("Timer", 10, 20);
  currentTime = floor(millis() / 1000);
  text(currentTime, 10, 50);

  CloudOneSpawn();
  alien1spawn();
  alien2spawn();

  for (let c = 0; c < cloud.length; c++) {
    cloud[c].move();
    cloud[c].show();
  }

  for (let i = 0; i < alien.length; i++) {
    alien[i].move();
    alien[i].show();

    // we run the check within our draw loop, if our rollover code is true, fun the splice function
    if (alien[i].rollover()) {
      alien.splice(i, 1);

      window.location.reload();
    }
  }

  for (let e = 0; e < alien2.length; e++) {
    alien2[e].move();
    alien2[e].show();

    if (alien2[e].rollover()) {
      alien2.splice(e, 1);

      window.location.reload();
    }
  }

  image(img, mouseX - 50, 700, 100, 100);

  cboxX = mouseX;
  cboxY = 750;
  fill(255, 255, 255, 0);
  noStroke();
  ellipse(mouseX, cboxY, cboxR);

  console.log(a2timer);
}

class Alien {
  constructor() {
    this.x = random(30, 750);
    this.y = random(5, -250);
  }

  show() {
    //ll(0, 255, 0);
    // ellipse(this.x, this.y, 50);
    image(aimg, this.x, this.y, 50, 50);
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + 5;
  }

  // rollover has been updated to simply check the distance. If it's less than the radius, then return true.
  rollover() {
    let d = dist(cboxX, cboxY, this.x, this.y);

    if (d < cboxR) {
      return true;
    } else {
      return false;
    }
  }
}

class Alien2 {
  constructor() {
    this.x = random(0, 800);
    this.y = random(5, -250);
  }

  show() {
    image(a2img, this.x, this.y, 50, 50);
  }

  move() {
    this.y = this.y + 10;
  }

  rollover() {
    let d = dist(cboxX, cboxY, this.x, this.y);

    if (d < cboxR) {
      return true;
    } else {
      return false;
    }
  }
}

class CloudOne {
  constructor() {
    this.x = random(0, 800);
    this.y = -400;
  }

  show() {
    image(cloud1img, this.x, this.y, 400, 400);
  }

  move() {
    this.y = this.y + 2;
  }
}

function CloudOneSpawn() {
  if (c1timer > 0) {
    c1timer = c1timer - 1;
  }

  if (c1timer == 0) {
    cloud.push(new CloudOne());

    c1timer = 150;
  }
}

function alien1spawn() {
  if (a1timer > 0) {
    a1timer = a1timer - 1;
  }

  if (a1timer == 0) {
    alien.push(new Alien());
    a1timer = 20;
  }
}

function alien2spawn() {
  if (a2timer > 0) {
    a2timer = a2timer - 1;
  }

  if (a2timer == 0) {
    alien2.push(new Alien2());
    a2timer = 150;
  }
}
