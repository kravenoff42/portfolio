function Grid (_cols,_rows){
    this.cols = _cols || 10;
    this.rows = _rows || 10;
    this.objects = [];
    for (let i=0,len = _cols; i<len;i++) {
        this.objects.push(new Array(_rows));
        this.objects[i].fill(null);
    }
    this.enemyCount = 0;
    this.playerCount = 0;
}

Grid.prototype.occupied = function(targetCol,targetRow){
    if(this.edge(targetCol,targetRow)){return;}
    if(this.objects[targetCol][targetRow]!=null){
        return true;
    }
    return false;
}

Grid.prototype.placeWalls = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(random()<DENSITY && !(i<=1 && j<=1)){
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
                this.enemyCount++;
            }
        }
    }
}
Grid.prototype.placePlayer = function(p){
    this.objects[0][0] = p;
    this.playerCount++;
}
Grid.prototype.clearDead = function(){
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            let type = this.getType(j,i);
            
            if(this.occupied(j,i)){
                if(this.objects[j][i].health<=0){
                    this.objects[j][i] = null;
                    if(type=="ENEMY"){this.enemyCount--}
                    if(type=="PLAYER"){this.playerCount--}
                }
            }
        }
    }
}
Grid.prototype.checkGameState = function(){
    if(this.enemyCount<=0 || this.playerCount<=0){
        running = false;
    }
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
    player.render();
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            if(this.occupied(j,i)){
                if(this.objects[j][i].type!="PLAYER"){
                    this.objects[j][i].render();
                }
            }
        }
    }
}
Grid.prototype.getType = function(targetCol,targetRow){
    if(this.occupied(targetCol,targetRow)){
        return this.objects[targetCol][targetRow].type;
    }
    return null;
}
Grid.prototype.move = function(currCol,currRow,targetCol,targetRow){
    if(this.edge(targetCol,targetRow)){
        return;
    }
    if (this.occupied(targetCol,targetRow)){
        return;
    }
    this.objects[currCol][currRow].col = targetCol;
        this.objects[currCol][currRow].row = targetRow;
        let tempObj = this.objects[currCol][currRow];
        this.objects[currCol][currRow] = null;
        this.objects[targetCol][targetRow] = tempObj;
}
Grid.prototype.edge = function(col,row){
    let maxCols = (width / GRID_SIZE)-1;
    let maxRows = (height / GRID_SIZE)-1;
    
    if(col > maxCols ||
    col < 0 ||
    row > maxRows ||
    row < 0 /*||
    col === null ||
    row === null*/){
        return true;
    }
    return false;
}
    
Grid.prototype.placeLevel = function(number){
    let level = maps[number].split(',');
    for (let tile in level) {
        switch(level[tile]){
            case "p":
                
                break;
            case "w":
    
                break;
            case "b":
                
                break;
            default:
                
                break;
        }
    }
}

Grid.prototype.placeLevel = function(number){
}