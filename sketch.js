var ball;
var score = 0;
var lives = 3;
var gamestate = "serve"
var bricks;
var paddle;

function setup() {
  createCanvas(400,400);
  ball = createSprite(200,200,10,10);
ball.shapeColor="blue";
ball.velocityY=0;
paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor = "blue";

edges = createEdgeSprites();
bricks = new Group();

}


function createBrickRow(y, color) {
  for(c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}



function draw() {
  background("black");
  createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");
  textSize(20);
  text("Score: "+score,40,25);
  text("Lives: "+lives, 40, 45);
  
    
    if(gamestate == "serve" && keyDown("space")){
      gamestate = "play";
      ball.velocityY = -7;
      ball.velocityX = -7;
      bricks.setVelocityYEach(0.2);
      
      
      
      
      
  
  }
  if(gamestate == "serve"){
    text("Click to serve the ball.", 120,250);
    ball.velocityX =0;
    ball.velocityY =0;
    ball.x = 200;
    ball.y = 200;
  }
  else if(gamestate =="end") {
    text("Game Over", 150, 250);
    ball.remove;
  }
  else {
    gameplay();
  }
  
  drawSprites();
}



function brickHit(ball, brick) {
 brick.remove();
 score = score+5;
}
  
if (ball.velocityY<12 && ball.velocityY>-12)
{ ball.velocityX*=1.05;
ball.velocityY*=1.05;
  
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = "serve";
  }
  else {
    gamestate = "end";
  }
}

function gameplay(){
  paddle.x = mouseX;
  paddle.x=ball.x;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  //rotation = rotation + 5;
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[2]);
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {

  }
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("You Won The Game!!",150,200);
  }
  if(ball.isTouching(edges[3])) {
    lifeover();
  }
}



