function Grid (_cols,_rows){
    this.cols = _cols || 10;
    this.rows = _rows || 10;
    this.objects = [];
    for (let i=0,len = _cols; i<len;i++) {
        this.objects.push(new Array(_rows));
        this.objects[i].fill(null);
    }
    this.index = [];
}

Grid.prototype.occupied = function(targetCol,targetRow){
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;
    
    if(targetCol == 0||targetCol == maxCols||targetRow==0||targetRow==maxRows){return true;}
    if(this.objects[targetCol][targetRow]!=null){
        return true;
    }
    return false;
}

Grid.prototype.placeWalls = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(random()<DENSITY && !this.occupied(j,i)){
                this.objects[j][i]= new Wall(j,i,"WALL");
            }
        }
    }
}
Grid.prototype.placeEnemies = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(random()<ENEMY_DENSITY && !this.occupied(j,i)){
                this.objects[j][i] = new BasicEnemy(j,i,"ENEMY");
                return;
            }
        }
        return;
    }
}
Grid.prototype.placePlayer = function(p){
    this.objects[0][0] = p;
}
Grid.prototype.clearDead = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(this.occupied(j,i)){
                if(this.objects[j][i].health<=0){
                    this.objects[j][i] = null;
                }
            }
        }
    }
}
Grid.prototype.checkPlayer = function(){
    
}
Grid.prototype.update = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(this.occupied(j,i)){
                this.objects[j][i].update();
            }
        }
    }
}
Grid.prototype.render = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(this.occupied(j,i)){
                this.objects[j][i].render();
            }
        }
    }
}
Grid.prototype.getType = function(){
    if(this.objects[targetCol][targetRow]!=null){
        return this.objects[targetCol][targetRow].type;
    }
    return null;
}
Grid.prototype.move = function(currCol,currRow,targetCol,targetRow){
    if (this.occupied(targetCol,targetRow)){
        return;
    }
    this.objects[currCol][currRow].col = targetCol;
        this.objects[currCol][currRow].row = targetRow;
        let tempObj = this.objects[currCol][currRow];
        this.objects[currCol][currRow] = null;
        this.objects[targetCol][targetRow] = tempObj;
}