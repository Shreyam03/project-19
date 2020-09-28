var player,playerA,banana,bananaImage,BG,backgroundImage,ground,foodGroup,obstaclesGroup,obstacleImage,score,life,gameState;
function preload()
{
  obstacleImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
  backgroundImage=loadImage("jungle.jpg");
  playerA=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}
function setup() {
  createCanvas(400, 400);
  BG=createSprite(200,200,400,400);
  BG.addImage(backgroundImage);
  BG.x=BG.width/2;
  player=createSprite(50,325,10,100);
  player.addAnimation("monkey",playerA);
  player.scale=0.1;
  ground=createSprite(200,370,400,10);
  ground.visible=false;
  obstaclesGroup=new Group();
  bananaGroup=new Group();
  score=0;
  life=2;
  gameState=1;
}

function draw() {
  background(220);
  player.collide(ground);
  player.velocityY=player.velocityY+1;
  BG.velocityX=-5;
  if(BG.x<0)
  {
    BG.x=BG.width/2;
  }
  if(keyDown("space")&&player.y>300)
  {
    player.velocityY=-15;
  }
  spawnObstacles();
  spawnFood();
  if(player.isTouching(bananaGroup))
  {
    score=score+2
    bananaGroup.destroyEach();
  }
   if(player.isTouching(obstaclesGroup))
  {
     obstaclesGroup.destroyEach();
    player.scale=0.1;
  }
   
  drawSprites();
  strokeColor="black";
  text(score,380,100);
  switch(score)
  {
    case 10:player.scale = 0.12;
    break
    case 20:player.scale = 0.14;
    break
    case 30:player.scale=0.16;
    break
    case 40:player.scale=0.18;
    break;
  }
  
     
}
  
function spawnObstacles()
{
  if(World.frameCount%300===0)
  {
    var obstacle=createSprite(400,350,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-5;
    obstacle.lifetime=100;
    obstaclesGroup.add(obstacle);
  }
}
function spawnFood()
{
  if(World.frameCount%80===0)
  {
    var banana=createSprite(400,random(120,200),10,10)
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.scale=0.05;
    bananaGroup.add(banana);
  }
}