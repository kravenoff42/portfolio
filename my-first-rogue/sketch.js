var divCanvas;
var canvas;
var divInput;
var score;
var player;
var GRID_SIZE = 24;
var running = true;
var cols;
var rows;
var grid;
const DENSITY = 0.15;
const ENEMY_DENSITY = DENSITY/3;
var level =0;
var healthBar;

function setup() {
  divCanvas = select('#canvas');
  divInput = select('#input');
  score = select('#score');
  healthBar = select("#healthBar");
	canvas = createCanvas(480, 480);
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
  // getInput();
  
  if(running){
  grid.clearDead();  
  grid.update();
  grid.checkGameState();
  grid.render();
  }else{
    gameOver();
  }
  
  renderScore();
  renderPlayerHealth();
}

function keyPressed(){
  if(keyCode === 32){
    player.swinging = true;
    
  }
}

function keyReleased(){
  if(keyCode === 32){
    player.swinging = false;
    
  }
}

function mousePressed(){
  player.swinging = true;
}

function mouseReleased(){
  player.swinging = false;
}
function gameOver(){
  translate(width/2,height/2);
  textAlign(CENTER);
  textSize(20);
  fill(255);
  textStyle(BOLD);
  textFont('Courier New');
  text("Game Over",0,0);
  translate(0,20);
  if(grid.playerCount>grid.enemyCount){
    text("You Won!",0,0);
  }else{
    text("You Died",0,0);
  }
  translate(0,20);
  text("Score: "+player.score,0,0);
}
function renderScore(){
  score.html(player.score);
}
function renderPlayerHealth(){
  let hp = "";
  for (let i =0;i<player.health;i++ ) {
    hp += "+";
  }
  healthBar.html(hp);
}