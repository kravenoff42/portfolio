function Player(_col,_row,_type){
    this.col = _col;
    this.row = _row;
    this.dir = 0;
    this.type = _type;
    this.attackDmg = 1;
    this.health = 1;
    this.swinging = false;
    this.target = {};
        this.target.col;
        this.target.row;
    this.setTarget();

}

Player.prototype.update = function(){
    if(this.swinging){
        this.setTarget();
        this.attack();
    }
  if(frameCount%4===0){
      if (window.keyIsDown(68)) {//d
      console.log('d');
        if(this.dir == 0){
          this.move();
        }else{
          this.dir = 0;
        }
      }else if (window.keyIsDown(83)) {//s
      console.log('s');
        if(this.dir == 1){
          this.move();
        }else{
          this.dir = 1;
        }
      }else if (window.keyIsDown(65)) {//a
      console.log('a');
        if(this.dir == 2){
          this.move();
        }else{
          this.dir = 2;
        }
      }else if (window.keyIsDown(87)) {//w
      console.log('w');
        if(this.dir == 3){
          this.move();
        }else{
          this.dir = 3;
        }
      }
  }
}

Player.prototype.setTarget = function(){
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;

    let targetCol;
    let targetRow;
    switch(this.dir){
        case 0:
            if(this.col == maxCols){return;}
            targetCol = this.col+1;
            targetRow = this.row;
            break;
        case 1:
            if(this.row == maxRows){return;}
            targetCol = this.col;
            targetRow = this.row+1;
            break;
        case 2:
            if(this.col == 0){return;}
            targetCol = this.col-1;
            targetRow = this.row;
            break;
        case 3:
            if(this.row == 0){return;}
            targetCol = this.col;
            targetRow = this.row-1;
            break;
    }
    this.target.col = targetCol;
    this.target.row = targetRow;
}

Player.prototype.render = function(){
    let x = this.col * GRID_SIZE;
    let y = this.row * GRID_SIZE;
    let r = GRID_SIZE/2;
    push();
        translate(x+r,y+r);
        rotate(HALF_PI*this.dir);
        fill(200);
        ellipseMode(CENTER);
        ellipse(0,0,GRID_SIZE-2,GRID_SIZE);
        rectMode(CORNER);
        rect(r-2,-r,2,GRID_SIZE*0.75);
        if(this.swinging){
            rect(0,r-2,GRID_SIZE,2);
        }
            
    pop();
}

// Player.prototype.edge = function(){
//     let maxCols = (width / GRID_SIZE)-1;
//     let maxRows = (height / GRID_SIZE)-1;
    
//     if(this.col > maxCols){this.col = maxCols}
//     if(this.col < 0){this.col = 0}
//     if(this.row > maxRows){this.row = maxRows}
//     if(this.row < 0){this.row = 0}
// }

// Player.prototype.collision = function(targetCol,targetRow){
//     if(grid.occupied(targetCol,targetRow)){
//         return true;
//     }
//     return false;
// }
Player.prototype.attack = function(){
    if(grid.occupied(this.target.col,this.target.row),grid.getType == "ENEMY"){
        grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
    }
}
Player.prototype.damage = function(dmgDealt){
    this.health -= dmgDealt;
    
}
Player.prototype.heal = function(){
    this.health++;
}
Player.prototype.die = function(){
    if(this.health <= 0){
        running = false;
    }
}
Player.prototype.move = function(){
    this.setTarget();
    grid.move(this.col,this.row,this.target.col,this.target.row);
}