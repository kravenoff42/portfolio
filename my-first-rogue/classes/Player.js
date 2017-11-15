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
        ellipseMode(CENTER);
        ellipse(0,0,GRID_SIZE,GRID_SIZE);
        rectMode(CORNER);
        rect(r,-r,2,GRID_SIZE*0.75);
        if(this.swinging){
            rect(0,r-2,GRID_SIZE,2);
        }
            
            // switch(this.dir){
            //     case 0:
            //         ellipse(x+r,y+3,6,6);
            //         break;
            //     case 1:
            //         ellipse(x+GRID_SIZE-3,y+GRID_SIZE-3,6,6);
            //         break;
            //     case 2:
            //         ellipse(x,y+GRID_SIZE,6,6);
            //         break;
            //     case 3:
            //         ellipse(x+GRID_SIZE-3,y+r,6,6);
            //         break;
            // }
        
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

Player.prototype.collision = function(){
    
}
Player.prototype.attack = function(){
    
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