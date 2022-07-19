class BasicEnemy extends Creature{
    constructor(_col,_row,_type,_dir,_scene){
        super(_col, _row, _type,'zombie',_dir,_scene)
    }
    update(){
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
    
    decide(){
        this.dir = Math.floor(Math.random() * 4);
        this.setTarget();
        if(grid.getType(this.target.col,this.target.row)=="PLAYER"){
            console.log("enemy sees player")
            this.attacking = true;
        }else{
            this.moving = true;
        }
    }
    
    
}
