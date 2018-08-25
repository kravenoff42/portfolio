let divCanvas;
let canvas;
let divInput;
const UNIT = 10;
const _1 = UNIT;
const _2 = UNIT * 2;
const _3 = UNIT * 3;
const _4 = UNIT * 4;
const _5 = UNIT * 5;
const _10 = UNIT * 10;
const _05 = UNIT * 0.5;
let cols;
let rows;
let skinColor,shirtColor,pantColor,pantShadow,shoeColor,hairColor;
let skinTone

function setup() {
  colorMode(HSL, 255);
  divInput = select('#input');

  divCanvas = select('#canvas');
	canvas = createCanvas(480, 480);
  canvas.parent(divCanvas);
  noLoop();

  skinTone = 190;
  skinColor = color(25,200,skinTone);
  shirtColor = color(0,255,128);
  shoeColor = color(25,200,80);
  pantColor = color(150,255,128);
  pantShadow = color(150,255,80);

  background(0,0,200);
  push();
  translate(width/2,height/2);

  stroke(0);
  //shirt
  fill(shirtColor);
  rect(-_5,-_5,_10,_5);
  arc(0,-_5+1,_10,_2,PI,TWO_PI);
  line(-_3,0,-_3,-_3);
  line(_3,0,_3,-_3);
  //pants
  fill(pantColor);
  rect(-_3,0,_1*6,_5);
  noStroke();
  fill(pantShadow);
  triangle(-_05,_2,_05,_2,0,_5);
  stroke(0);
  //shoes
  fill(shoeColor);
  //left
  arc(-(_1+_05),_5,_3,_2,  PI, TWO_PI,CLOSE);
  //right
  arc(_1+_05,_5,_3, _2, PI, TWO_PI,CLOSE);
  //head
  fill(skinColor);
  ellipse(0,-_10,_10,_10);
  //hands
  //left
  ellipse(-(_3+_05),0,_3,_3);
  //right
  ellipse(_3+_05,0,_3,_3);
  //border
  noFill();
  rect(-_5,-(_10+_5),_10,_10*2);
  strokeWeight(3);
  rect(-_10,-_10*2,_10*2,_10*3);
  //origin
  stroke(0,255,128);
  ellipse(0,0,3,3);
  pop();
}

function draw() {

}

function keyPressed(){

}

function keyReleased(){

}

function mousePressed(){
}

function mouseReleased(){
}
