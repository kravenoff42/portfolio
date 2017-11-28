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
    this.value = 10;
}

BasicEnemy.prototype.update = function(){
    if(frameCount%30==0){
        if(this.deciding){
            this.decide();
            this.deciding = false;
        }else if(this.attacking){
            this.attack();
            this.attacking = false;
            this.deciding = true;
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
    let half = GRID_SIZE/2;
    let small = GRID_SIZE*0.75;
    let smaller = GRID_SIZE/8;
    push();
        translate(x+half,y+half);
        rotate(HALF_PI*this.dir);
        fill(200,0,0);
        ellipseMode(CENTER);
        ellipse(0,0,GRID_SIZE*0.75,GRID_SIZE*0.75);
        
        if(this.attacking){
            console.log("swipe")
            rectMode(CORNER);
            rect(0,-half+smaller,GRID_SIZE,smaller);
            rect(0,-smaller/2,GRID_SIZE,smaller);
            rect(0,half-(2*smaller),GRID_SIZE,smaller);
        }
        fill(255);
        ellipse(half/2,0,half/2,half/2);
    pop();
}

BasicEnemy.prototype.attack = function(){
    if(grid.getType(this.target.col,this.target.row) == "PLAYER"){
        grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
    }
}
BasicEnemy.prototype.damage = function(dmgDealt){
    this.health -= dmgDealt;
    if(this.health<=0){player.score += this.value;}
}
BasicEnemy.prototype.heal = function(){
    this.health++;
}
BasicEnemy.prototype.move = function(){
    this.setTarget();
    grid.move(this.col,this.row,this.target.col,this.target.row);
}
BasicEnemy.prototype.decide = function(){
    this.dir = random([0,1,2,3]);
    this.setTarget();
    if(grid.getType(this.target.col,this.target.row)=="PLAYER"){
        console.log("enemy sees player")
        this.attacking = true;
    }else{
        this.moving = true;
    }
}

BasicEnemy.prototype.setTarget = function(){
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;

    let targetCol;
    let targetRow;
    switch(this.dir){
        case 0:
            if(this.col == maxCols){break;}
            targetCol = this.col+1;
            targetRow = this.row;
            break;
        case 1:
            if(this.row == maxRows){break;}
            targetCol = this.col;
            targetRow = this.row+1;
            break;
        case 2:
            if(this.col == 0){break;}
            targetCol = this.col-1;
            targetRow = this.row;
            break;
        case 3:
            if(this.row == 0){break;}
            targetCol = this.col;
            targetRow = this.row-1;
            break;
    }
    if(targetCol){
        this.target.col = targetCol;
    }else{this.target.col = -1}
    if(targetRow){
        this.target.row = targetRow;
    }else{this.target.row = -1}
}
