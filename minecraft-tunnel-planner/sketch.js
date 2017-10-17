const squareSize = 10;
var divInput;
var txtStartX;
var txtStartY;
var txtStartZ;
var txtEndX;
var txtEndY;
var txtEndZ;
var btnSubmit;
var chkIgnoreY;
var canvas;
var tunnnelCalc;
var steps;

function setup() {
  divInput = select('#input');
  txtStartX = select('#startX');
  txtStartY = select('#startY');
  txtStartZ = select('#startZ');
  txtEndX = select('#endX');
  txtEndY = select('#endY');
  txtEndZ = select('#endZ');
  divOutput = select('#output');
  btnSubmit = select('#btnSubmit');
  chkIgnoreY = select('#chkIgnoreY');
  tunnelCalc = true;

  let w = window.innerWidth*0.9;
  canvas = createCanvas(w,w/2);
  canvas.parent(divOutput);

  background(0);

  btnSubmit.mouseClicked(makeTunnel);
  testValues();
  noLoop();
}

// function draw(){
//   if(!tunnelCalc){return;}
//   push();
//     noFill();
//     // fill(255,255,255,100);
//     strokeWeight(2);
//     stroke(255);
//     translate(10,10);
//     rect(0,0,100,100);
//   pop();
// }

function makeTunnel(){
  steps = calcTunnel();
  translate(10,10);
  noFill();
  stroke(255);
  strokeWeight(2);
  // rect(0,0,squareSize,squareSize);
  // translate(squareSize,0);
  // rect(0,0,squareSize,squareSize);
  drawHorizontalTunnel(steps);
}

function testValues(){
  txtStartX.value(0);
  txtEndX.value(10);
  txtStartY.value(0);
  txtEndY.value(0);
  txtStartZ.value(0);
  txtEndZ.value(10);
}

function drawHorizontalTunnel(){
  let ratio;
  let x1 = 0;
  let z1 = 0;
  let x2 = txtStartX.value() - txtEndX.value();
  let z2 = txtStartZ.value() - txtEndZ.value();
  let xStep = steps[0];
  let zStep = steps[2];

  if(x2*squareSize<z2*squareSize){
    ratio = abs((width/2-20)/(z2*squareSize));
  }else{
    ratio = abs((width/2-20)/(x2*squareSize));
  }

  for(let i=x1; i<x2;i++){
    rect(0,0,squareSize,squareSize);
    // translate(squareSize,10);
    // for(let j =z1;j<z2;j++){
    //   rect(0,0,squareSize,squareSize);
    //   translate(10,squareSize);
    // }
  }
  console.log(ratio);
  // scale(ratio);
}

function calcTunnel(){
  let x = txtStartX.value() - txtEndX.value();
  let y = txtStartY.value() - txtEndY.value();
  let z = txtStartZ.value() - txtEndZ.value();
  // console.log(x,y,z);
  let gcdXY = gcd(x,y);
  let gcdXZ = gcd(x,z);

  z = reduce(z,gcdXZ);
  y = reduce(y,gcdXY);
  x = reduce(x,gcdXY);
  if(chkIgnoreY.checked()){
    textSize(15);
    text('X: '+x,10,20);
    text(x,10,20);
    console.log(x,z);
  }else{
    console.log(x,y,z);
  }

  tunnelCalc = true;
  return [x,y,z];
}

function findSlope(a,b){
  if(a==0 || b==0){return 0;}
  return a/b;
}

function reduce(a,b){
  if(a==0 || b==0){return 0;}
  return a/b;
}

function gcd(a,b){
    if ( ! b) {
        return a;
    }
    return gcd(b, a % b);
}
