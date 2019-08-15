function Layer(){
  this.corners = floor(random(3,13));
  this.radius = random(5,height/4);
  this.sym = random([3,4,6,8,12]);
  this.orbitRadius = random(width/3);
  this.color = colors.rand();
}
Layer.prototype.show = function(){
    push();
      for(let j = 1;j<=this.sym+1;j++){
        push();
          let orbAngle =map(j, 1, this.sym+1, 0, TWO_PI);
          let posX = this.orbitRadius * cos(orbAngle);
          let posY = this.orbitRadius * sin(orbAngle);
          this.drawShape(posX,posY,orbAngle);
        pop();
      }
    pop();

  }
Layer.prototype.drawShape = function(x,y,orbAngle){
  translate(x,y);
   stroke(this.color);
  beginShape();
  for(let i = 1;i<=this.corners+1;i++){
    let angle = orbAngle + map(i, 1, this.corners+1, 0, TWO_PI);
    let x = this.radius * cos(angle);
    let y = this.radius * sin(angle);
    vertex(x,y);
  }
  endShape(CLOSE);
}

