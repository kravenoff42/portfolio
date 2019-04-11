class Paddle{
    constructor(_x){
        this.x = _x;
        this.y = height*0.5;
        this.w = 10;
        this.h = 60;
    }
    update(ball){
        if (!this.hits_top_bottom()) this.y = mouseY
        return this.is_hit_by(ball)
    }
    show(){
        push()
        translate(this.x, this.y)
        noStroke()
        fill(colors.prime)
        rectMode(CENTER)
        rect(0,0,this.w,this.h)
        pop()
    }
    hits_top_bottom(){
        return ( mouseY+(this.h*0.5) >= height || mouseY-(this.h*0.5) <= 0 )
    }
    is_hit_by(ball){
        let xd = abs(ball.pos.x - this.x)
        let yd = abs(ball.pos.y - this.y)
        return (xd <= (ball.size*0.5)+(this.w*0.5) && yd <= this.h*0.5)
    }
}