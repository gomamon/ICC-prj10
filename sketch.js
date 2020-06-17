var crimData = null;
let url;

let font;
let canvW, canvH;

var drops = [];
var grow = 0.7;
let cnt;
let alignSize;

let isStop = false;

function Drop(x, y, data) {

  this.x = x;
  this.y = -10;
  this.w = 10;
  this.h = 5;
  this.length = 10;
  this.speed = random(0, 2);
  this.endY = map(data, 0, 9000, 0, canvH);
  this.isfall = true;

  this.show = function() {
    if (this.isfall) {
      strokeWeight(4);
      stroke(color('#f54542'));
      line(this.x, this.y, this.x, this.y + this.length);
    }

    this.y = this.y + this.speed;
    this.speed = this.speed + 0.1;

    if (this.y > this.endY) {
      this.speed = 0;
      this.length = 0;
      this.w = this.w + grow;
      this.h = this.h + grow / 2;
      this.isfall = false;

      textSize(this.w / 3);
      fill(color('#f54542'));
      noStroke();
      textAlign(CENTER, BASELINE);
      text(data, x - alignSize / 2, this.y, alignSize);
    }

    if (this.w > map(data, 0, 8000, 0, alignSize * 3)) {
      this.x = x;
      this.y = -10;
      this.length = 10;
      this.speed = 0;
      this.w = 10;
      this.h = 5;
      this.isfall = true;
    }
  };

  this.result = function() {
    textSize(20);
    fill(color('#f54542'));
    noStroke();
    textAlign(CENTER, BASELINE);
    text(data, x - alignSize / 2, this.endY, alignSize);
  }
}


function preload() {
  url = 'http://openapi.seoul.go.kr:8088/64436a4750746f6f363367666d5843/json/octastatapi316/1/50';

  font = loadFont('SongMyung.ttf');
  img = loadImage('death.png');
  // loadJSON('data.json', urlCallback);
  loadJSON(url, urlCallback);

}

function setup() {
  canvW = windowWidth;
  canvH = windowHeight;

  createCanvas(windowWidth, windowHeight);

  alignSize = canvW / (cnt - 1);
  cnt = crimData.list_total_count;

  for (var i = 1; i < cnt; i++) {
    drops.push(new Drop(alignSize * (i - 1) - alignSize / 2, canvH, crimData.row[i].BALSAENG_1));
  }

  textSize(10);
  textAlign(LEFT, TOP);
  noStroke();

}

function draw() {
  background(3);

  for (var i = 0; i < drops.length; i = i + 1) {
    if (isStop != true)
      drops[i].show();
    else
      drops[i].result();
  }


  noStroke();
  for (let i = 1; i < cnt; i++) {
    textSize(15);
    fill(255);
    textAlign(CENTER, BASELINE);
    textFont(font);
    text(crimData.row[i].JACHIGU, (alignSize) * (i - 1), 20, alignSize);
  }

  image(img, canvW / 2 - 100, canvH - 250, 300, 100);

}

function urlCallback(data) {
  crimData = data.octastatapi316
  cnt = crimData.list_total_count;

}

function keyPressed() {
  if (keyCode == 32) {
    console.log(isStop);
    if (isStop == false)
      isStop = true;
    else
      isStop = false;

  }
}