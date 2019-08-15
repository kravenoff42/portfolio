function Wall(_col,_row,_type){
   this.col = _col;
    this.row = _row;
    this.type = _type;
}

Wall.prototype.update = function(){
    
}

Wall.prototype.render = function(){
    let x = this.col * GRID_SIZE;
    let y = this.row * GRID_SIZE;
    //let r = GRID_SIZE/2;    
    push();
        translate(x,y);
        rect(0,0,GRID_SIZE,GRID_SIZE);
    pop();
}