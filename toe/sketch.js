var GRID_SIZE = 20;
const DENSITY = 0.15;
const ENEMY_DENSITY = DENSITY/3;
var running = true;
var grid;
var game;
var gameOptions = {
    tileSize: 32,
    tweenSpeed: 50,
    tileSpacing: 0
}
var tileOffset = gameOptions.tileSize *0.5;

function main() {
    var gameConfig = {
        type: Phaser.CANVAS,
        width: gameOptions.tileSize * GRID_SIZE,
        height: gameOptions.tileSize * GRID_SIZE,
        // physics: {
        //   default: 'arcade',
        //   arcade: {
        //       // gravity: { y: 300 },
        //       debug: false
        //   }
        // },
        scene: [playGame]
    };
    game = new Phaser.Game(gameConfig);
    window.focus()
    // console.log(game)
    // resize();
    // window.addEventListener("resize", this.resize, false);
}

var playGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function playGame(){
        Phaser.Scene.call(this, {key: "PlayGame"});
    },
    preload: function(){
        this.load.image('hole', './assets/hole.png');
        this.load.image('ground', './assets/ground.png');
        // this.load.image('fence', 'assets/fence.png');
        // this.load.image('fenceL', 'assets/fenceL.png');
        // this.load.image('fenceR', 'assets/fenceR.png');
        // this.load.image('fenceLR', 'assets/fenceLR.png');
        this.load.image('wall', 'assets/wall.png');
        // this.load.image('tombstone', 'assets/tombstone.png');
        // this.load.image('shovel', 'assets/shovel.png');
        this.load.image('diggerD', 'assets/diggerD.png');
        // this.load.image('zombieD', 'assets/zombieD.png');
        this.load.spritesheet('player', 'assets/player-4dir.png', { frameWidth: 32, frameHeight: 32, endFrame:4 });
        this.load.spritesheet('zombie', 'assets/zombie-4dir.png', { frameWidth: 32, frameHeight: 32, endFrame:4 });
    },
    create: function(){
        // this.fieldArray = [];
        this.add.image(0, 0, 'ground').setOrigin(0, 0);
        this.add.sprite(64,0, 'hole');

        this.enemyGroup = this.add.group();
        this.wallGroup = this.add.group();
        grid = new Grid(GRID_SIZE,GRID_SIZE,this,this.wallGroup,this.enemyGroup)
        this.player = new Player(2,2,'player',this);

        grid.placePlayer(this.player);
        grid.placeWalls();
        grid.placeEnemies();
        this.player.setTarget();

        this.input.keyboard.on("keydown", this.handleKey, this);
        this.input.on("pointerup", this.endSwipe, this);

    },
    update: function(){
    },
    endSwipe: function(e){
        var swipeTime = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(running){
            if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
                grid.clearDead();  
                grid.update();
                if(swipeNormal.x > 0.8) {
                    if(this.player.dir == 0){
                        this.player.move();
                    }else{
                        this.player.dir = 0;
                        this.player.setFrame(0);
                    }
                    console.log("right")
                }
                if(swipeNormal.y > 0.8) {
                    if(this.player.dir == 1){
                        this.player.move();
                    }else{
                        this.player.dir = 1;
                        this.player.setFrame(1);
                    }
                    // console.log("down")
                }
                if(swipeNormal.x < -0.8) {
                    if(this.player.dir == 2){
                        this.player.move();
                    }else{
                        this.player.dir = 2;
                        this.player.setFrame(2);
                    }
                    console.log("left")
                    // this.handleMove(0, -1);
                }
                if(swipeNormal.y < -0.8) {
                    if(this.player.dir == 3){
                        this.player.move();
                    }else{
                        this.player.dir = 3;
                        this.player.setFrame(3);
                    }
                    console.log("up")

                    // this.handleMove(-1, 0);
                }
                grid.checkGameState();
            }
        }
    },
    handleKey: function(e){
        switch(e.code){
        case "KeyD":
        case "ArrowRight":
            grid.clearDead();  
            grid.update();
            if(this.player.dir == 0){
                this.player.move();
            }else{
                this.player.dir = 0;
                this.player.setFrame(0);
            }
            grid.checkGameState();
            // this.handleMove(0, 1);
            break;
        case "KeyS":
        case "ArrowDown":
            grid.clearDead();  
            grid.update();
            if(this.player.dir == 1){
                this.player.move();
            }else{
                this.player.dir = 1;
                this.player.setFrame(1);
            }
            grid.checkGameState();
            // this.handleMove(1, 0);
            break;
        case "KeyA":
        case "ArrowLeft":
            grid.clearDead();  
            grid.update();
            if(this.player.dir == 2){
                this.player.move();
            }else{
                this.player.dir = 2;
                this.player.setFrame(2);
            }
            grid.checkGameState();
            // this.handleMove(0, -1);
            break;
        case "KeyW":
        case "ArrowUp":
            grid.clearDead();  
            grid.update();
            if(this.player.dir == 3){
                this.player.move();
            }else{
                this.player.dir = 3;
                this.player.setFrame(3);
            }
            // this.handleMove(-1, 0);
            grid.checkGameState();
            break;
        }
    },
    gameOver: function(){

    }
}
);
// function resize(){
//   console.log(game.canvas)

//   var windowWidth = window.innerWidth;
//   var windowHeight = window.innerHeight;
//   var windowRatio = windowWidth / windowHeight;
//   var gameRatio = game.config.width / game.config.height;
//   if(windowRatio < gameRatio){
//     game.canvas.style.width = windowWidth + "px";
//     game.canvas.style.height = (windowWidth / gameRatio) + "px";
//   }
//   else{
//     game.canvas.style.width = (windowHeight * gameRatio) + "px";
//     game.canvas.style.height = windowHeight + "px";
//   }
// }
window.onload = main()