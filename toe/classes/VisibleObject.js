class VisibleObject extends Phaser.GameObjects.Sprite{
    constructor(_col, _row,_sprite_name,_frame,_scene){
        super(_scene, _col*gameOptions.tileSize+tileOffset, _row*gameOptions.tileSize+tileOffset, _sprite_name, _frame )
        this.col = _col;
        this.row = _row;
        this.scene.add.existing(this);
    }
    col;
    row;
}