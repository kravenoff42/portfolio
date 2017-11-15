var divCanvas;
var canvas;
var divInput;
var gameObjects = [];
var player;
var GRID_SIZE = 16;
var running = true;

function setup() {
  divCanvas = select('#canvas');
  divInput = select('#input');
	canvas = createCanvas(600, 600);
  canvas.parent(divCanvas);
  
  player = new Player(0,0,"PLAYER");
  gameObjects.push(player);
}

function draw() {
  background(0);
  noStroke();
  getInput();
  for (var obj in gameObjects) {
    gameObjects[obj].update();
    gameObjects[obj].render();
  }
}

function keyPressed(){
  if(keyCode === 32){player.swinging = true}
}

function keyReleased(){
  if(keyCode === 32){player.swinging = false}
}


function getInput() {
  let step = false;
  if(frameCount%4===0){step = true;}
  if (keyIsDown(87) && step) {//w
    if(player.dir == 3){
      player.row--;
      player.edge();
    }else{
      player.dir = 3;
    }
  } else if (keyIsDown(68) && step) {//d
    if(player.dir == 0){
      player.col++;
      player.edge();
    }else{
      player.dir = 0;
    }
  }else if (keyIsDown(83) && step) {//s
    if(player.dir == 1){
      player.row++;
      player.edge();
    }else{
      player.dir = 1;
    }
  }else if (keyIsDown(65) && step) {//a
    if(player.dir == 2){
      player.col--;
      player.edge();
    }else{
      player.dir = 2;
    }
  }
  
}

function mousePressed(){
  
}

function mouseReleased(){
  
}