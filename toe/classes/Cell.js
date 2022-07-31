class Cell{
    constructor(_col,_row,_max_entropy){
        this.entropy = _max_entropy;
        this.col = _col;
        this.row = _row;
    }
    entropy;
    col;
    row;
    collasped = false;
    tile = null;
    set_tile(tile_hash){
        this.tile = tile_hash;
        this.collasped = true;
        this.entropy = 0;
    }
    update(){

    }
    render(){

    }
}