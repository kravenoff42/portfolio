function Colors(){
	this.back = color(43,48,58);
	this.prime = color(2,128,144);
	this.dark = color(15,24,39);
	this.second = color(103,60,79);
	this.third = color(127,85,125);
	this.trim = color(119,156,171);
	this.text = color(255,255,255);
  /* 
  
	 this.back = color(25,34,49);
    this.prime = color(73,78,107);
    this.dark = color(15,24,39);
    this.second = color(152,94,109);
    this.trim = color(152,135,143);
		this.text = color(255,255,255);
	
  this.back = color(50,25 ,80);
    this.prime = color(190,85,180);
    this.dark = color(45,10,50);
    this.trim = color(45,170,190);
		this.text = color(255,255,255);
  */
}
Colors.prototype.rand = function(){
  switch(random(['prime','dark','trim','second'])){
    case 'back':
      return this.back;
    case 'prime':
      return this.prime;
    case 'dark':
      return this.dark;
    case 'trim':
      return this.trim;
    case 'text':
      return this.text;
    case 'second':
      return this.second;
  }
}
  