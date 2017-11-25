function BasicEnemy(_col,_row,_type,_dir){
    this.col = _col;
    this.row = _row;
    this.type = _type;
    this.dir = _dir || 0;
    this.attackDmg = 1;
    this.health = 1;
    this.attacking = false;
    this.deciding = true;
    this.moving = false;
    this.target = {};
        this.target.col;
        this.target.row;
    this.setTarget();

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

// BasicEnemy.prototype.edge = function(){
//     let maxCols = (width / GRID_SIZE)-1;
//     let maxRows = (height / GRID_SIZE)-1;
    
//     if(this.col > maxCols){this.col = maxCols}
//     if(this.col < 0){this.col = 0}
//     if(this.row > maxRows){this.row = maxRows}
//     if(this.row < 0){this.row = 0}
// }

// BasicEnemy.prototype.collision = function(targetCol,targetRow){
//     for(let i = 0, len = gameObjects.length;i<len;i++){
//         if(gameObjects[i].col == targetCol && gameObjects[i].row == targetRow){
//             return true;
//         }
//     }
//     return false;
// }
BasicEnemy.prototype.attack = function(){
    if(grid.occupied(this.target.col,this.target.row),grid.getType == "PLAYER"){
        grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
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
    this.setTarget();
    grid.move(this.col,this.row,this.target.col,this.target.row);
}
BasicEnemy.prototype.decide = function(){
    // for(let i = 0, len = gameObjects.length;i<len;i++){
    //     if(gameObjects[i].col == targetCol && gameObjects[i].row == targetRow && gameObjects[i].type =="PLAYER"){
            
    //     }
    // }
    this.dir = random([0,1,2,3]);
    this.setTarget();
    
}

BasicEnemy.prototype.setTarget = function(){
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
    if(targetCol){this.target.col = targetCol;}
    if(targetRow){this.target.row = targetRow;}
}
