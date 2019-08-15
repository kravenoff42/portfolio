var divHero;
var canvas;
var divInput;
var renderedObjects = [];
var objMax = 1;
var colors;
var animations;
var animenu;

function setup() {
	textX = -(width);
  colors = new Colors();
  
  divHero = select('#ani-hero');
  divInput = select('#input');
	canvas = createCanvas(windowWidth, windowHeight);
	divHero.html = "";
  canvas.parent(divHero);

  animations = [/*'SpaceFlyer','Rain',*/'SquareWalker','Ripples','Bubbles','OrbitCircle','Collidiscope','ShapeZoom'];

  let selectedAni = setAnimation(random(animations));
  animenu = new Animenu(10,10,20,animations,selectedAni);
}

function draw() {
  background(colors.back);
	for(let i = renderedObjects.length-1;i>=0;i--){
    renderedObjects[i].show();
	}
  for(let i = renderedObjects.length-1;i>=0;i--){
    renderedObjects[i].show();
    let stail = renderedObjects[i].update();
    if (stail===true){
      renderedObjects.splice(i, 1);
    }else if(stail=="new" && renderedObjects.length < objMax){
			renderedObjects[i].newObj();
			break;
		}
  }
	animenu.render();
	
}

function mouseClicked(){
  animenu.checkClicked(mouseX,mouseY);
}

function setAnimation(animation){
  renderedObjects = [];
  let index = animations.indexOf(animation);
  switch(animation){
    case 'SquareWalker':
      objMax = floor(random(3,6));
      for(let i = 0; i<objMax;i++){
        renderedObjects.push(new SquareWalker());
      }
      break;
    case 'OrbitCircle':
			objMax = 8;
      for(let i = 1; i<=objMax;i++){
				renderedObjects.push(new OrbitCircle(QUARTER_PI*i));
			}
      break;
    case 'Collidiscope':
      objMax = floor(random(3,6));
      for(let i = 0; i<objMax;i++){
        renderedObjects.push(new Collidiscope());
      }
      break;
    case 'ShapeZoom':
      objMax = floor(random(3,6));
      for(let i = 0; i<objMax;i++){
        renderedObjects.push(new ShapeZoom());
      }
      break;
    case 'Ripples':
      objMax = floor(random(5,8));
      renderedObjects.push(new Ripple());
			break;
    case 'Bubbles':
      objMax = 30; 
      renderedObjects.push(new Bubble());
			break;
  }
  return index;
}