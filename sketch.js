var PLAY = 1;
var END = 0;
var gameState = PLAY;
var up;
var man, manImg;
var ground, invisibleGround, groundImage;
var back,backIMG;
var obstacle,obstacle1,obstacle2,obstacle1img,obstacle11img,obstacle2img,obstacle22img;
var edges;
var score=100;

var gameOver;

localStorage["HighestScore"] = 100;

function preload(){
  
  backIMG = loadImage("land.png");
  groundImage = loadImage("background.png");
   obstacle1img = loadImage("atree.png");
   obstacle11img = loadImage("chicken.png");
   obstacle22img = loadImage("bear.png");
   
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
  man.setCollider("rectangle", 40, 10, 0, 0, 0);
  man.debug=true;
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
    edges = createEdgeSprites();
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
       obstacle.changeImage("dead_tree", obstacle2img);
       }
       
       man.bounceOff(up);
    
       man.collide(invisibleGround); 
       man.collide(edges); 
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
  
    fill("White");
    textSize(60);
    text("Extinction Event", 500,300);
    textSize(45);
    text("7.6 million people are dead due to the ignorance of many to", 100,400);
    text("take care of our planet. The CO₂ built up in our atmosphere due to factories,", 100,470);
    text("cars, etc. Global warming is real and it's happening at an unreasonably fast", 100,540);
    text("rate. Events like tsunamis, wildfires, hurricanes, acid rain, and etc are ", 100,610);
    text("brought upon us because of global warming. ", 100,680);

  }
     
  
}



function spawnObstacles() {
  if(frameCount % 70 === 0) {
    obstacle = createSprite(displayWidth+100,Math.round(random(50,displayHeight-50)),50,150);
    obstacle.addImage(obstacle1img);
    obstacle1 = createSprite(displayWidth+100,Math.round(random(40,displayHeight-50)),40,150);
    obstacle1.addImage(obstacle11img);

    obstacle2 = createSprite(displayWidth+100,Math.round(random(40,displayHeight-50)),40,150);
    obstacle2.addImage(obstacle22img);
    
    
    obstacle.shapeColor="violet";
    //obstacle.debug = true;
    obstacle.velocityX = -8;
    obstacle1.velocityX = -8;
    obstacle2.velocityX = -8;
    
    
          
    obstacle.scale = 0.4;
    obstacle.lifetime = 350;

    obstacle1.scale = 0.4;
    obstacle1.lifetime = 350;

    obstacle2.scale = 0.4;
    obstacle2.lifetime = 350;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstaclesGroup.add(obstacle1);
    obstaclesGroup.add(obstacle2);
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

/*
var tree, treeImage1, treeImage2;

var man, manImage, canvas;

function preload(){
manImage = loadAnimation("man1.gif");
treeImage1 = loadImage("atree.png");
treeImage2 = loadImage("dtree.png");
}

function setup(){

  var canvas = createCanvas(displayWidth, displayHeight);

  man = createSprite(displayWidth - 400, displayHeight- 40, 40, 80);
  //man.addAnimation("man", manImage);
  
  tree = createSprite(displayWidth , displayHeight- 40, 40, 80);
  tree.addImage( "tree1", treeImage1);
  tree.addImage("tree2", treeImage2);
  tree.velocityX = -1;

}

function draw(){
  background("white");

  tree.depth = man.depth;
  if(man.isTouching(tree)){
   tree.changeImage("tree2", treeImage2);
   man.shapeColor = "red";
    console.log("Hi")
  }

  drawSprites();
}
*/