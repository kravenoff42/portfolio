var divHero;
var canvas;
var divInput;
var renderedObjects = [];
var colors;

function setup() {
  colors = {
    back: color(60,30 ,90),
    prime: color(240,100,100),
    dark: color(50,10,50),
    trim: color(50,200,240),
    rand: function(){
      switch(random([/*'back',*/'prime','dark','trim'])){
        case 'back':
          return this.back;
        case 'prime':
          return this.prime;
        case 'dark':
          return this.dark;
        case 'trim':
          return this.trim;
      }
    }
  };
  divHero = select('#ani-hero');
  divInput = select('#input');
	canvas = createCanvas(windowWidth, windowHeight*0.75);
  canvas.parent(divHero);
  switch(random(
    [/*'SquareWalker','OrbitCircle',*/'Collidiscope']
  )){
    case 'SquareWalker':
      renderedObjects.push(new SquareWalker());
      break;
    case 'OrbitCircle':
      renderedObjects.push(new OrbitCircle());
      break;
    case 'Collidiscope':
      let r = floor(random(3,8));
      for(let i = 0; i<r;i++){
        renderedObjects.push(new Collidiscope());
      }
      break;
  }
}

function draw() {
  background(colors.back);
  for(let i = 0, len = renderedObjects.length;i<len;i++){
    renderedObjects[i].show();
    renderedObjects[i].update();
  }
}
