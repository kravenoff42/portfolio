class Grid{
    constructor(_cols,_rows,_scene,_wallGroup,_enemyGroup){
        this.scene=_scene
        this.cols = _cols || 10;
        this.rows = _rows || 10;
        this.enemyGroup = _enemyGroup
        this.wallGroup = _wallGroup
        this.max_entropy =17;
        for (let i=0,len = _cols; i<len;i++) {
            this.objects.push(new Array(_rows));
            this.objects[i].fill(null);
        }
        for(let i = 0;i<this.rows;i++){
            this.cells.push(new Array(_rows));
            for(let j = 0;j<this.cols;j++){
                this.cells[i][j]= new Cell(j,i,this.max_entropy);
            }
        }
    }
    cells = [];
    objects = [];
    enemyCount = 0;
    playerCount = 0;
    occupied(targetCol,targetRow){
        // console.log(this.objects);
        // console.log("Target");
        // console.log(targetCol,targetRow);
        // console.log(this.objects[targetCol]);

        if(this.edge(targetCol,targetRow)){return true;}
        if(this.objects[targetCol][targetRow]!=null){
            return true;
        }
        return false;
    }
    placeWalls(){
        let k = 0;
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){

                this.objects[j][i]= new Wall(j,i,"WALL",(k % 56),this.scene);
                this.scene.add.text(j*gameOptions.tileSize, i*gameOptions.tileSize, (k % 56).toString(), { font: '"Press Start 2P"',color: 'white' });
                k++;
                // if(Math.random()<DENSITY && !this.occupied(j,i)){
                //     // let dir = Math.floor(Math.random() * 4)
                //     this.objects[j][i]= new Wall(j,i,"WALL",this.scene);
                //     this.wallGroup.add(this.objects[j][i]);
                // }
            }
        }
    }
    placeEnemies(){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                if(Math.random()<ENEMY_DENSITY && !this.occupied(j,i)){
                    let dir = Math.floor(Math.random() * 4)
                    this.objects[j][i] = new BasicEnemy(j,i,"ENEMY",dir,this.scene);
                    this.enemyGroup.add(this.objects[j][i]);
                    this.enemyCount++;
                }
            }
        }
    }
    placePlayer(p){
        this.objects[p.col][p.row] = p;
        this.playerCount++;
    }
    clearDead(){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                let type = this.getType(j,i);
                
                if(this.occupied(j,i)){
                    if(this.objects[j][i].health<=0){
                        this.objects[j][i].destroy();
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
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols;j++){
                if(this.occupied(j,i)){
                    this.objects[j][i].update();
                }
            }
        }
    }
    // render(){
    //     player.render();
    //     for(let i = 0;i<this.rows;i++){
    //         for(let j = 0;j<this.cols;j++){
    //             if(this.occupied(j,i)){
    //                 if(this.objects[j][i].type!="PLAYER"){
    //                     this.objects[j][i].render();
    //                 }
    //             }
    //         }
    //     }
    // }
    getType(targetCol,targetRow){
        if(this.occupied(targetCol,targetRow)){
            return this.objects[targetCol][targetRow].creatureType;
        }
        return null;
    }
    move(currCol,currRow,targetCol,targetRow){
        if (!(this.edge(targetCol,targetRow)) && !(this.occupied(targetCol,targetRow))){
        // if (this.objects[currCol][currRow] != null){
            // console.log(this.objects[currCol][currRow]);
            this.objects[currCol][currRow].col = targetCol;
            this.objects[currCol][currRow].row = targetRow;
            this.objects[currCol][currRow].x = targetCol*gameOptions.tileSize+tileOffset;
            this.objects[currCol][currRow].y = targetRow*gameOptions.tileSize+tileOffset;
            let tempObj = this.objects[currCol][currRow];
            this.objects[currCol][currRow] = null;
            this.objects[targetCol][targetRow] = tempObj;
            // console.log(this.objects[currCol][currRow]);
        }
    }
    edge(col,row){
        if(col > GRID_SIZE ||
        col < 0 ||
        row > GRID_SIZE ||
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

