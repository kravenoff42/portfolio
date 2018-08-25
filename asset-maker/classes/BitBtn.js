class BitBtn(_col,_row,_type){
  this.x = _x;
  this.y = _y;
  this.height;
  this.width;
  this.color = _color;
  this.text = _text;
  this.bWeight = 2;
  this.bColor = color();

  update(){

  }
  render(){
      let x = this.col * GRID_SIZE;
      let y = this.row * GRID_SIZE;
      let half = GRID_SIZE/2;
      let small = GRID_SIZE*0.75;
      let smaller = GRID_SIZE/8;
      push();
          translate(x+half,y+half);
          rotate(HALF_PI*this.dir);
          fill(200);
          ellipseMode(CENTER);
          ellipse(-smaller/2,0,GRID_SIZE-smaller,GRID_SIZE);
          rectMode(CORNER);
          rect(half-smaller,-half,smaller,small);
          if(this.swinging){
              rect(0,half-smaller,GRID_SIZE,smaller);
          }

      pop();
  }

  clicked(currX,currY){
    return (currX > this.x &&
      currX < this.x + this.width &&
      currY > this.y &&
      currY < this.y + this.height);
  }
}
