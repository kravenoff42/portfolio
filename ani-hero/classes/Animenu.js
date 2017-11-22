function Animenu(_x,_y,_size,_array,_index){
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.radius = _size*0.4;
    this.animations = _array;
    this.selected = _index || 0;
    this.boxHeight = _y+_size;
    this.boxWidth = this.getBoxWidth();
}

Animenu.prototype.render = function(){
    push();
        noStroke();
        fill(colors.prime);
        translate(this.x,this.y);
        this.lastButton();
        this.pageButtons();
        this.nextButton();
    pop();
    this.cursor();
}

Animenu.prototype.checkClicked = function(x,y){
    let clicked = createVector(x,y);
    let pages = this.getBtnCoords();
    for (let i in pages) {
        let d = dist(clicked.x,clicked.y,pages[i].x,pages[i].y)
        if(d<this.radius*2){
            this.updateSelected(i,pages.length-1)
        }
    }
}

Animenu.prototype.cursor = function(){
    let coords = this.getBtnCoords();
    let hovering = false;
    for (let i in coords) {
        let d = dist(mouseX,mouseY,coords[i].x,coords[i].y)
        if(d<this.radius){
            hovering = true;
        }
    }
    
    if(hovering){cursor(HAND);}
    else {cursor(ARROW);}
}

Animenu.prototype.getBtnCoords = function(){
    let coords = [];
    let x=this.size+this.x+this.radius;
    let y=this.y+(this.size/2);
    for (let a in this.animations) {
        if(a == this.selected){x+=this.radius/4}
        coords.push(createVector(x,y));
        x += this.size;
    }
    let lastBtn = createVector(this.x+this.size/2,this.y+this.size/2);
    coords.unshift(lastBtn);
    let nextBtn = createVector(x,y);
    coords.push(nextBtn);
    return coords;
}

Animenu.prototype.getBoxWidth = function(){
    let coords = this.getBtnCoords();
    let lastCenter = coords[coords.length-1];
    let boxWidth = (lastCenter.x+this.size/2)-this.x;
    return boxWidth+this.x;
}

Animenu.prototype.selectAnimation = function(animation){
  window.setAnimation(animation);
}

Animenu.prototype.updateSelected = function(clicked,last){
    let end = this.animations.length-1;
    let s;
    if(clicked==0){
        s = this.selected-1;
        if(s<0){s = end}
        this.selected = s;
    }else if(clicked==last){
        s = this.selected+1;
        if(s>end){s = 0}
        this.selected = s;
    }else{
        this.selected = clicked-1;
    }
    this.selectAnimation(this.animations[this.selected]);
}

Animenu.prototype.lastButton = function(){
    push();
        translate(this.size/2,this.size/2);
        beginShape();
            for(let i = 0;i<3;i++){
              let angle = map(i, 0, 3, 0, TWO_PI) + PI;
              let x = this.radius * cos(angle);
              let y = this.radius * sin(angle);
              vertex(x,y);
            }
        endShape(CLOSE);
    pop();
}
Animenu.prototype.nextButton = function(){
    translate(this.size,0);
    push();
        translate(this.size/2,this.size/2);
        beginShape();
            for(let i = 0;i<3;i++){
              let angle = map(i, 0, 3, 0, TWO_PI);
              let x = this.radius * cos(angle);
              let y = this.radius * sin(angle);
              vertex(x,y);
            }
        endShape(CLOSE);
    pop();
}
Animenu.prototype.pageButtons = function(){
    for (let a in this.animations) {
        translate(this.size,0);
        push();
            ellipseMode(CENTER);
            let r = this.radius*0.8;
            if(a == this.selected){r*=2}
            ellipse(this.size/2,this.size/2,r,r)
        pop();
    }
    
}