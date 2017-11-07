var divHero;
var canvas;
var divInput;
var renderedObjects = [];
var colors;

function setup() {
  colors = new Colors();
  divHero = select('#ani-hero');
  divInput = select('#input');
	canvas = createCanvas(windowWidth, windowHeight*0.75);
  canvas.parent(divHero);
  let r;
  switch(random(
    [/*'SquareWalker','OrbitCircle','Collidiscope','Bubbles','SpaceFlyer','Rain',*/'ShapeZoom','Ripples']
  )){
    case 'SquareWalker':
      renderedObjects.push(new SquareWalker());
      break;
    case 'OrbitCircle':
      renderedObjects.push(new OrbitCircle());
      break;
    case 'Collidiscope':
      r = floor(random(3,6));
      for(let i = 0; i<r;i++){
        renderedObjects.push(new Collidiscope());
      }
      break;
    case 'ShapeZoom':
      r = 3; //floor(random(3,6));
      for(let i = 0; i<r;i++){
        renderedObjects.push(new ShapeZoom());
      }
      break;
    case 'Ripples':
      r = 5;
      renderedObjects.push(new Ripple(0));

  }
}

function draw() {
  background(colors.back);
  for(let i = renderedObjects.length-1;i>=0;i--){
    renderedObjects[i].show();
    let stail = renderedObjects[i].update();
    if (stail){
      renderedObjects.slice(i, 1);
    }
  }
  console.log(renderedObjects.length);
}
