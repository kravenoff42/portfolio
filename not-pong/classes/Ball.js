class Ball{
    constructor(){
        this.pos = createVector(width/2, height*0.25);
        this.vect = createVector(4,4);
        this.size = 10;
    }
    update(){
        if (this.hits_top_bottom()) this.collide('vert')
        if (this.hits_left_right()) this.collide('horz')
        this.pos.add(this.vect)
    }
    show(){
        push()
        translate(this.pos.x, this.pos.y)
        noStroke()
        fill(colors.prime)
        rectMode(CENTER)
        rect(0,0,this.size,this.size)
        pop()
    }
    hits_top_bottom(){
        return ( this.pos.y >= height || this.pos.y <= 0 )
    }
    hits_left_right(){
        return (this.pos.x >= width || this.pos.x <= 0 )
    }
    collide( side ){
        if (side == 'vert') this.vect.y *= -1
        if (side == 'horz') this.vect.x *= -1
    }
}