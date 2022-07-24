class Actor extends Phaser.GameObjects.Sprite{
    constructor(_col, _row, _type,_sprite_name,_dir,_scene){
        super(_scene, _col*gameOptions.tileSize+tileOffset, _row*gameOptions.tileSize+tileOffset, _sprite_name, _dir )
        this.col = _col;
        this.row = _row;
        this.creatureType = _type;
        this.dir = _dir;
        this.setTarget();
        this.scene.add.existing(this);
    }
    col;
    row;
    dir = 0;
    sight_range;
    earing_range;
    touch_range;
    experience = 0.8;
    level = 1.0;
    attackDmg = 1;
    health = 1;
    deciding = true;
    moving = false;
    attacking = false;
    target = {
        col:"",
        row:""
    };
    moved = false;
    value = 10;
    setLevel(exp){
        let nth = 3;
        let divisor = 4;
        let denominator = 5;
        return ((exp*denominator)/divisor)**(1.0/nth);
    }
    expNeeded(){
        let nth = 3
        let divisor = 4;
        let denominator = 5;
        return Math.round((divisor*((this.level+1)**nth)/denominator)-this.experience)
    }
    getLevel(){
        return Math.round(this.level);
    }
    exp(){
        return Math.round(this.experience);
    }
    attack(){
        if(grid.objects[this.target.col][this.target.row] != null &&
            grid.getType(this.target.col,this.target.row) != "WALL" 
            ){
            grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
        }
    }
    damage(dmgDealt){
        this.health -= dmgDealt;
        if(this.health<=0){
            return this.getLevel();
        }else{
            return 0;
        }
        // return this.health<=0;
    }
    heal(){
        this.health++;
    }
    move(){
        this.setTarget();
        grid.move(this.col,this.row,this.target.col,this.target.row);
        this.moved = true;
    }
    setTarget(){
        let targetCol;
        let targetRow;
        switch(this.dir){
            case 0:
                if(this.col == GRID_SIZE){break;}
                targetCol = this.col+1;
                targetRow = this.row;
                break;
            case 1:
                if(this.row == GRID_SIZE){break;}
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
        // console.log(this);
        // console.log(targetCol,targetRow);
        if(targetCol){
            this.target.col = targetCol;
        }//else{this.target.col = -1}
        if(targetRow){
            this.target.row = targetRow;
        }//else{this.target.row = -1}
    }
}