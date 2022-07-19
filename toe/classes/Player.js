class Player extends Creature{
    constructor(_col,_row,_type,_scene){
        super(_col, _row, _type,'player',0,_scene)
    }
    swinging = false;
    update(){
        
        // if(this.swinging){
            // console.log('swinging');
            this.setTarget();
            this.attack();
        // }
        // if(frameCount%5==0){
        //     if(this.moved){
        //         this.moved = false;
        //     }else{
        //         if (keyIsDown(68)) {//d
        //             if(this.dir == 0){//right
        //                 this.move();
        //             }else{
        //                 this.dir = 0;
        //             }
        //         }else if (keyIsDown(83)) {//s
        //             if(this.dir == 1){//down
        //                 this.move();
        //             }else{
        //                 this.dir = 1;
        //             }
        //         }else if (keyIsDown(65)) {//a
        //             if(this.dir == 2){//left
        //                 this.move();
        //             }else{
        //                 this.dir = 2;
        //             }
        //         }else if (keyIsDown(87)) {//w
        //             if(this.dir == 3){//up
        //                 this.move();
        //             }else{
        //                 this.dir = 3;
        //             }
        //         }
        //     }
        // }
    }
    attack(){
        if(grid.getType(this.target.col,this.target.row) == "ENEMY"){
            let targetValue =  grid.objects[this.target.col][this.target.row].damage(this.attackDmg);
            this.score += targetValue;
        }
    }
    die(){
        if(this.health <= 0){
            running = false;
        }
    }
}