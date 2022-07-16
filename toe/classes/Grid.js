class Grid{
    constructor(_cols,_rows,_scene,_wallGroup,_enemyGroup){
        this.scene=_scene
        this.cols = _cols || 10;
        this.rows = _rows || 10;
        this.enemyGroup = _enemyGroup
        this.wallGroup = _wallGroup
        for (let i=0,len = _cols; i<len;i++) {
            this.objects.push(new Array(_rows));
            this.objects[i].fill(null);
        }
    }
    objects = [];
    enemyCount = 0;
    playerCount = 0;
    occupied(targetCol,targetRow){
        if(this.edge(targetCol,targetRow)){return;}
        if(this.objects[targetCol][targetRow]!=null){
            return true;
        }
        return false;
    }
    placeWalls(){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                if(Math.random()<DENSITY && !(i<=1 && j<=1)){
                    let dir = Math.floor(Math.random() * 4)
                    this.objects[j][i]= new Wall(j,i,"WALL",this.scene);
                }
            }
        }
    }
    placeEnemies(){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                if(Math.random()<ENEMY_DENSITY && !this.occupied(j,i)){
                    let dir = Math.floor(Math.random() * 4)
                    this.objects[j][i] = new BasicEnemy(j,i,"ENEMY",dir,this.scene);
                    this.enemyCount++;
                }
            }
        }
    }
    placePlayer(p){
        this.objects[0][0] = p;
        this.playerCount++;
    }
    clearDead(){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
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
    checkGameState(){
        if(this.enemyCount<=0 || this.playerCount<=0){
            running = false;
        }
    }
    update(){
        for(let i = 0;i<rows;i++){
            for(let j = 0;j<cols;j++){
                if(this.occupied(j,i)){
                    this.objects[j][i].update();
                }
            }
        }
    }
    render(){
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
    getType(targetCol,targetRow){
        if(this.occupied(targetCol,targetRow)){
            return this.objects[targetCol][targetRow].type;
        }
        return null;
    }
    move(currCol,currRow,targetCol,targetRow){
        if(this.edge(targetCol,targetRow)){
            return;
        }
        if (this.occupied(targetCol,targetRow)){
            return;
        }
        if (this.objects[currCol][currRow] != null){
        this.objects[currCol][currRow].col = targetCol;
        this.objects[currCol][currRow].row = targetRow;
        let tempObj = this.objects[currCol][currRow];
        this.objects[currCol][currRow] = null;
        this.objects[targetCol][targetRow] = tempObj;}
    }
    edge(col,row){
        let maxCols = (game.canvas.width / GRID_SIZE)-1;
        let maxRows = (game.canvas.height / GRID_SIZE)-1;
        
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
        
    placeLevel(number){
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
}

