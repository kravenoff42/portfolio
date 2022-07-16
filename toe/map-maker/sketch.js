var divCanvas;
var canvas;
var divInput;
var GRID_SIZE = 32;
var cols;
var rows;
var grid = [];
var radAssets;
var currAsset;
var btnGetString;
var txtStringOut;


function setup() {
  divCanvas = select('#canvas');
  divInput = select('#input');
  btnGetString = document.getElementById('btnGetString');
  txtStringOut = select('#txtStringOut');
  
  btnGetString.addEventListener('click',printString);
  
  currAsset = "p";
  radAssets = document.getElementsByTagName('input');
  for (let radio in radAssets) {
      radAssets[radio].onchange = toggleAsset;
  }
  
  //grid.fill("n");
  
  canvas = createCanvas(320, 320);
  canvas.parent(divCanvas);
  
  rows = height / GRID_SIZE;
  cols = width / GRID_SIZE;
  for (let i = 0,len = rows*cols; i<len; i++) {
      grid.push("n");
  }
  
}

function draw() {
    background(0);
    noStroke();
    for (var tile in grid) {
        let col = tile%cols;
        let row = floor(tile/rows);
        let asset = grid[tile];
        let x = col*GRID_SIZE;
        let y = row*GRID_SIZE;
        renderTile(asset,x,y);
    }
  
}
function mouseClicked(){
    if(mouseX<0 ||mouseX>width||mouseY<0||mouseY>height){console.log('out of bounds'); return;}
    let col = floor(mouseX/GRID_SIZE);
    let row = floor(mouseY/GRID_SIZE);
    let index = col+(row*rows);
    console.log(index);
    grid[index] = currAsset;
    console.log(currAsset);
}
function renderTile(type,x,y){
    let half = GRID_SIZE/2;
    let small = GRID_SIZE*0.75;
    let smaller = GRID_SIZE/8;
    push();
    translate(x,y);
    switch(type){
        case "p":
            translate(half,half);
            fill(200);
            ellipseMode(CENTER);
            ellipse(-smaller/2,0,GRID_SIZE-smaller,GRID_SIZE);
            rectMode(CORNER);
            rect(half-smaller,-half,smaller,small);
            break;
        case "w":
            fill(255);
            rect(0,0,GRID_SIZE,GRID_SIZE);
            break;
        case "b":
            translate(half,half);
            fill(200,0,0);
            ellipseMode(CENTER);
            ellipse(0,0,GRID_SIZE*0.75,GRID_SIZE*0.75);
            fill(255);
            ellipse(half/2,0,half/2,half/2);
            rectMode(CORNER);
            break;
        default:
            
            break;
            
    }
    pop();
}
function toggleAsset(event){
    let id = this.id;
    
    switch(id){
        case "btnPlayer":
            currAsset = "p";
            break;
        case "btnWall":
            currAsset = "w";
            break;
        case "btnBasicEnemy":
            currAsset = "b";
            break;
        case "btnEmpty":
            currAsset = "n";
            break;
    }
    console.log("picked "+currAsset);
}
function printString(){
    let string = grid.join(',');
    txtStringOut.html(string);
}