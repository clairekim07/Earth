var PLAY = 1;
var END = 0;
var gameState = PLAY;
var up;
var man, manImg;
var ground, invisibleGround, groundImage;
var back,backIMG;
var cloudsGroup, cloudImage;
var birdsGroup, birdImage;
var obstacle1,obstacle2,obstacle1img,obstacle2img;

var score=100;

var gameOver;

localStorage["HighestScore"] = 100;

function preload(){
  
  backIMG = loadImage("land.jpg");
  groundImage = loadImage("background.png");
   obstacle1img = loadImage("atree.png");
   obstacle2img = loadImage("dtree.png")
   
   manImg = loadImage("man1.gif");
 
}

function setup() {
  createCanvas(displayWidth,displayHeight)
  up=createSprite(10,10,1,40);
  
  back = createSprite(0,0);
  back.addImage(backIMG);
  back.visible = false;
  back.scale = 4;
  ground = createSprite(displayWidth/2,-30);
  ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
  ground.scale=1.3;
  
  man = createSprite(50,60,20,50);
  man.addImage(manImg);
  man.scale = 0.55;
  man.setCollider("rectangle", 40, 40, 20, 80, -45);
  man.debug=false;
  invisibleGround = createSprite(400,30,400,10);
  invisibleGround.visible = false;
  obstaclesGroup= new Group();0
  
  score = 100;
}

function draw() {

  //background("white");
  
  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/62);
    ground.velocityX = -4;
  
    if(keyDown(RIGHT_ARROW)) {
      man.x = man.x + 8;
    }
    if(keyDown(LEFT_ARROW)) {
      man.x = man.x - 8;
    }
    if(keyDown(UP_ARROW)) {
      man.y = man.y - 8;
    }
    if(keyDown(DOWN_ARROW)) {
      man.y = man.y + 8;
    }
  
    if(frameCount % 100 === 0){
      score=score+1;
    }
  
    if(score === 0){
      gameState = END;
    }
  
    if (ground.x < 0){
      ground.x = ground.width/15;
    }

    if(obstaclesGroup.isTouching(man)){
       score = score - 1;
       //obstacle1.changeImage(obstacle2img)
       }
       man.bounceOff(up);
    
       man.collide(invisibleGround); 
       man.collide(up);
  
  }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    man.velocityY = 0;
    obstaclesGroup.destroyEach();
    obstaclesGroup.velocityXEach=0;
    back.visible = true;
    ground.visible = false;
    score=0; 
    man.x = -50;
    man.y = -50;
    
    
    
  }
  
  spawnObstacles();
  drawSprites();
  textSize(30);
  fill("black");
  text("Earth Health: "+ score, 100,100);
  if(gameState === END){
  textSize(45);
    fill("White");
    text("Extintion Event. 7.6 million people are dead due to the ignorance of many to", 100,400);
    text("take care of our planet. The co2 built up in our atmosphere due to factories", 100,470);
    text("and coal buring technology. Global warming is real and it's happening to an", 100,540);
    text("unreasonably fast rate. Tsunamis, wildfires, hurricanes, and acid rain are", 100,610);
    text("just few events that are brought upon us because of global warming.", 100,680);

  }
     
  
}



function spawnObstacles() {
  if(frameCount % 30 === 0) {
    var obstacle = createSprite(displayWidth+100,Math.round(random(50,displayHeight-50)),50,150);
    obstacle.addImage(obstacle1img);
    obstacle.shapeColor="violet";
    //obstacle.debug = true;
    obstacle.velocityX = -8;
    
    
          
    obstacle.scale = 0.6;
    obstacle.lifetime = 350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  }

function reset(){
  gameState = PLAY;
  man.positionY=200;

  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 100;
  
}