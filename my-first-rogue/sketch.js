var divCanvas;
var canvas;
var divInput;
//var gameObjects = [];
var player;
var GRID_SIZE = 16;
var running = true;
var cols;
var rows;
var grid;
const DENSITY = 0.25;
const ENEMY_DENSITY = DENSITY/4;

function setup() {
  divCanvas = select('#canvas');
  divInput = select('#input');
	canvas = createCanvas(400, 400);
  canvas.parent(divCanvas);
  
  rows = height / GRID_SIZE;
  cols = width / GRID_SIZE;
  
  grid = new Grid(cols,rows);
  
  player = new Player(0,0,"PLAYER");
  grid.placePlayer(player);
  grid.placeWalls();
  grid.placeEnemies();
  
}

function draw() {
  background(0);
  noStroke();
  getInput();
  
  grid.update();
  grid.render();
  // for (var obj in grid.objects) {
  //   grid.objects[obj].update();
  //   grid.objects[obj].render();
  // }
  
  
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
    if(player.dir == 3 && !player.collision(player.col,player.row-1)){
      //grid.move(player.col,player.row,player.col,player.row-1);
      //player.row--;
      player.move();
    }else{
      player.dir = 3;
    }
  } else if (keyIsDown(68) && step) {//d
    if(player.dir == 0 && !player.collision(player.col+1,player.row)){
      //grid.move(player.col,player.row,player.col+1,player.row);
      // player.col++;
      player.move();
    }else{
      player.dir = 0;
    }
  }else if (keyIsDown(83) && step) {//s
    if(player.dir == 1 && !player.collision(player.col,player.row+1)){
      //grid.move(player.col,player.row,player.col,player.row+1);
      // player.row++;
      player.move();
    }else{
      player.dir = 1;
    }
  }else if (keyIsDown(65) && step) {//a
    if(player.dir == 2 && !player.collision(player.col-1,player.row)){
      //grid.move(player.col,player.row,player.col-1,player.row);
      //player.col--;
      player.move();
    }else{
      player.dir = 2;
    }
  }
  
}

function mousePressed(){
  
}

function mouseReleased(){
  
}