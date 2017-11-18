function Player(_col,_row,_type){
    this.col = _col;
    this.row = _row;
    this.dir = 0;
    this.type = _type;
    this.attack = 1;
    this.health = 1;
    this.swinging = false;
}

Player.prototype.update = function(){
    //if(frameCount%30===0){this.col++;}
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

Player.prototype.edge = function(){
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;
    
    if(this.col > maxCols){this.col = maxCols}
    if(this.col < 0){this.col = 0}
    if(this.row > maxRows){this.row = maxRows}
    if(this.row < 0){this.row = 0}
}

Player.prototype.collision = function(targetCol,targetRow){
    if(grid.occupied(targetCol,targetRow)){
        return true;
    }
    return false;
}
Player.prototype.attack = function(targetCol,targetRow){
    if(grid.occupied(targetCol,targetRow),grid.getType == "ENEMY"){
        return true;
    }
    return false;
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
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;
    
    let currCol = this.col;
    let currRow = this.row;
    
    let targetCol;
    let targetRow;
    
    switch(this.dir){
        case 0:
            //this.col++;
            targetCol = currCol;
            targetRow = currRow-1;
            break;
        case 1:
            // grid.move(this.col,this.row,this.col,this.row+1);
            targetCol = currCol;
            targetRow = currRow+1;
            //this.row++;
            break;
        case 2:
            // grid.move(this.col,this.row,this.col-1,this.row);
            targetCol = currCol-1;
            targetRow = currRow;
            //this.col--;
            break;
        case 3:
            // grid.move(this.col,this.row,this.col,this.row-1);
            targetCol = currCol+1;
            targetRow = currRow;
           //this.row--;
            break;
        
    }
    if(targetCol > maxCols){targetCol = maxCols}
    if(targetCol < 0){targetCol = 0}
    if(targetRow > maxRows){targetRow = maxRows}
    if(targetRow < 0){targetRow = 0}
    grid.move(currCol,currRow,targetCol,targetRow);
}