var database;
var fundo;
var gamestate = 0;
var playercount;
var distance = 0;
var allPlayers;

var form, player, game;

var cars, car1, car2, car3, car4;

function setup(){
  database = firebase.database();
  
  createCanvas(displayWidth ,displayHeight);

  game = new Game();
  game.getState();
  game.start();

}

function draw(){
  background("purple");

  if(playercount === 4){
    game.update(1);
  }
  if(gamestate === 1){
    clear();
    game.play();
  }

  drawSprites();
}

