function BasicEnemy(_col,_row,_type,_dir){
    this.col = _col;
    this.row = _row;
    this.type = _type;
    this.dir = _dir || 0;
    this.attack = 1;
    this.health = 1;
    this.attacking = false;
    this.deciding = true;
    this.moving = false;
}

BasicEnemy.prototype.update = function(){
    if(frameCount%15==0){
        if(this.deciding){
            this.decide();
            this.deciding = false;
            this.moving = true;
        }else if(this.moving){
            this.move();
            this.moving = false;
            this.deciding = true;
        }
    }
}

BasicEnemy.prototype.render = function(){
    let x = this.col * GRID_SIZE;
    let y = this.row * GRID_SIZE;
    let r = GRID_SIZE/2;
    push();
        translate(x+r,y+r);
        rotate(HALF_PI*this.dir);
        fill(200,0,0);
        ellipseMode(CENTER);
        ellipse(0,0,GRID_SIZE*0.75,GRID_SIZE*0.75);
        fill(255);
        ellipse(r/2,0,r/2,r/2);
        rectMode(CORNER);
        if(this.attacking){
            rect(0,-r+2,GRID_SIZE,2);
            rect(0,2,GRID_SIZE,2);
            rect(0,r-2,GRID_SIZE,2);
        }
    pop();
}

BasicEnemy.prototype.edge = function(){
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;
    
    if(this.col > maxCols){this.col = maxCols}
    if(this.col < 0){this.col = 0}
    if(this.row > maxRows){this.row = maxRows}
    if(this.row < 0){this.row = 0}
}

BasicEnemy.prototype.collision = function(targetCol,targetRow){
    for(let i = 0, len = gameObjects.length;i<len;i++){
        if(gameObjects[i].col == targetCol && gameObjects[i].row == targetRow){
            return true;
        }
    }
    return false;
}
BasicEnemy.prototype.attack = function(){
    for(let i = 0, len = gameObjects.length;i<len;i++){
        if(gameObjects[i].col == targetCol && gameObjects[i].row == targetRow && gameObjects[i].type =="PLAYER"){
            gameObjects[i].damage(this.attack);
        }
    }
}
BasicEnemy.prototype.damage = function(dmgDealt){
    this.health -= dmgDealt;
}
BasicEnemy.prototype.heal = function(){
    this.health++;
}
BasicEnemy.prototype.die = function(){
    
}
BasicEnemy.prototype.move = function(){
    //console.log("enemy will move from "+(this.col)+", "+this.row);
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
    
    //console.log("targeting: "+targetCol+", "+targetRow);
    grid.move(currCol,currRow,targetCol,targetRow);
}
BasicEnemy.prototype.decide = function(targetCol,targetRow){
    // for(let i = 0, len = gameObjects.length;i<len;i++){
    //     if(gameObjects[i].col == targetCol && gameObjects[i].row == targetRow && gameObjects[i].type =="PLAYER"){
            
    //     }
    // }
    this.dir = random([0,1,2,3]);
    console.log("enemy has chosen "+this.dir);
}
