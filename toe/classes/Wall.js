class Wall extends Phaser.GameObjects.Sprite{
    constructor(_col,_row,_type,_scene){
        super(_scene, _col*gameOptions.tileSize+tileOffset, _row*gameOptions.tileSize+tileOffset, 'wall', 0 )
        this.col = _col;
        this.row = _row;
        this.type = _type;
        this.scene.add.existing(this);
    }
    col;
    row;
    update(){
        
    }
    
    render(){
        let x = this.col * GRID_SIZE;
        let y = this.row * GRID_SIZE;
        //let r = GRID_SIZE/2;    
        push();
            translate(x,y);
            rect(0,0,GRID_SIZE,GRID_SIZE);
        pop();
    }
}