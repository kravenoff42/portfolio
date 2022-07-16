class Player extends Phaser.GameObjects.Sprite{
    constructor(_col,_row,_type,_scene){
        super(_scene, _col*gameOptions.tileSize, _row*gameOptions.tileSize, 'player','0')
        this.col = _col;
        this.row = _row;
        this.type = _type;
        this.setTarget();
        this.scene.add.existing(this);
    }
    col;
    row;
    dir = 0;
    attackDmg = 1;
    health = 3;
    swinging = false;
    target = {
        col:"",
        row:""
    };
    moved = false;
    score = 0;

    update(){
        
        if(this.swinging){
            console.log('swinging');
            this.setTarget();
            this.attack();
        }
        if(frameCount%5==0){
            if(this.moved){
                this.moved = false;
            }else{
                if (keyIsDown(68)) {//d
                    if(this.dir == 0){//right
                        this.move();
                    }else{
                        this.dir = 0;
                    }
                }else if (keyIsDown(83)) {//s
                    if(this.dir == 1){//down
                        this.move();
                    }else{
                        this.dir = 1;
                    }
                }else if (keyIsDown(65)) {//a
                    if(this.dir == 2){//left
                        this.move();
                    }else{
                        this.dir = 2;
                    }
                }else if (keyIsDown(87)) {//w
                    if(this.dir == 3){//up
                        this.move();
                    }else{
                        this.dir = 3;
                    }
                }
            }
        }
    }

    setTarget(){
        
        let maxCols = (game.canvas.width / GRID_SIZE)-1;
        let maxRows = (game.canvas.height / GRID_SIZE)-1;

        let targetCol;
        let targetRow;
        // console.log(this.dir);
        switch(this.dir){
            case 0:
                if(this.col == maxCols){console.log(this.col); break;}
                targetCol = this.col+1;
                targetRow = this.row;
                break;
            case 1:
                if(this.row == maxRows){console.log(this.row);break;}
                targetCol = this.col;
                targetRow = this.row+1;
                break;
            case 2:
                if(this.col == 0){console.log(this.col);break;}
                targetCol = this.col-1;
                targetRow = this.row;
                break;
            case 3:
                if(this.row == 0){console.log(this.row);break;}
                targetCol = this.col;
                targetRow = this.row-1;
                break;
        }
        if(targetCol!=undefined){
            this.target.col = targetCol;
        }else{this.target.col = -1}
        if(targetRow!=undefined){
            this.target.row = targetRow;
        }else{this.target.row = -1}
    }

    render(){
        let x = this.col * GRID_SIZE;
        let y = this.row * GRID_SIZE;
        let half = GRID_SIZE/2;
        let small = GRID_SIZE*0.75;
        let smaller = GRID_SIZE/8;
        push();
            translate(x+half,y+half);
            rotate(HALF_PI*this.dir);
            fill(200);
            ellipseMode(CENTER);
            ellipse(-smaller/2,0,GRID_SIZE-smaller,GRID_SIZE);
            rectMode(CORNER);
            rect(half-smaller,-half,smaller,small);
            if(this.swinging){
                rect(0,half-smaller,GRID_SIZE,smaller);
            }
                
        pop();
    }
    attack(){
        if(grid.getType(this.target.col,this.target.row) == "ENEMY"){
            grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
        }
    }
    damage(dmgDealt){
        console.log()
        this.health -= dmgDealt;
        
    }
    heal(){
        this.health++;
    }
    die(){
        if(this.health <= 0){
            running = false;
        }
    }
    move(){
        this.setTarget();
        // this.col = this.target.col
        // this.row = this.target.row
        // this.x =this.col * gameOptions.tileSize
        // this.y =this.row * gameOptions.tileSize


        grid.move(this.col,this.row,this.target.col,this.target.row);
        this.moved = true;
    }
}