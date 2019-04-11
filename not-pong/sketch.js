let div_canvas;
let canvas;
let div_input;
let colors;

let ball, player1, player2, paddle1, paddle2, score1, score2;

function setup() {
	textX = -(width);
  colors = new Colors()
  
  div_canvas = select('#divCanvas')
  div_input = select('#input')
	canvas = createCanvas(804, 500)
  canvas.parent(div_canvas)

  ball = new Ball()
  paddle1 = new Paddle(50)
  paddle2 = new Paddle(width-50)
}

function draw() {
  background(colors.back)

  stroke(colors.prime)
  strokeWeight(4)
  line( width/2, 20, width/2, height-20)

  if (paddle1.update(ball)) ball.collide('horz');
  if (paddle2.update(ball)) ball.collide('horz');
  ball.update()
  ball.show()
  paddle1.show()
  paddle2.show()
}