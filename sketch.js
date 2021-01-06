var PLAY = 1;
var END = 0;
var gameState = PLAY;
var up;
var man, manImg;
var ground, invisibleGround, groundImage;
var back,backIMG;
var plant,tree,plantimg,chickenimg,treeimg,bearimg;
var edges;
var score=100;

var gameOver;

localStorage["HighestScore"] = 100;

function preload(){
  
   backIMG = loadImage("land.png");
   groundImage = loadImage("background.png");
   plantimg = loadImage("atree.png");
   chickenimg = loadImage("chicken.png");
   bearimg = loadImage("bear.png");
   treeimg = loadImage("dtree.png");
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
  man.setCollider("rectangle", 100, 50, 0, 0, 0);
  man.debug=true;
  invisibleGround = createSprite(400,30,400,10);
  invisibleGround.visible = false;
  plantsGroup= new Group();
  obstaclesGroup= new Group();
  
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

    if(plantsGroup.collide(man)){
       score = score - 1;
       plant.changeImage("dead_tree", treeimg);
       plantsGroup.remove(plant);
       plant.velocityX = -8;
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
    plantsGroup.destroyEach();
    plantsGroup.velocityXEach=0;
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
  if(frameCount % 120 === 0) {
    plant = createSprite(displayWidth+100,Math.round(random(50,displayHeight-50)),50,150);
    plant.addImage(plantimg);
    plant.addImage("dead_tree", treeimg);
    
    plant.shapeColor="violet";
    //obstacle.debug = true;
    plant.velocityX = -8;
    
    plant.scale = 0.4;
    plant.lifetime = 400;

    plantsGroup.add(plant);
    
  }
  if(frameCount % 100 === 0) {
    chicken = createSprite(displayWidth+100,Math.round(random(30,displayHeight-50)),40,150);
    chicken.addImage(chickenimg);

    chicken.velocityX = -8;
    
    chicken.scale = 0.4;
    chicken.lifetime = 400;

    obstaclesGroup.add(chicken);
  }
  if(frameCount % 110 === 0) {
    bear = createSprite(displayWidth+100,Math.round(random(40,displayHeight-50)),30,150);
    bear.addImage(bearimg);
    
    bear.velocityX = -8;
    bear.scale = 0.4;
    bear.lifetime = 400;
    
    obstaclesGroup.add(bear);
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
var tree, treeImage1, treeImage2, treesGroup;

var man, manImage, canvas;

function preload(){
manImage = loadAnimation("man1.gif");
treeImage1 = loadImage("atree.png");
treeImage2 = loadImage("dtree.png");
}

function setup(){

  var canvas = createCanvas(displayWidth, displayHeight);

  man = createSprite(displayWidth - 800, displayHeight- 40, 40, 80);
  man.debug = true;
  man.setCollider("rectangle", 0,0, 40, 300)
  man.addAnimation("man", manImage);

  treesGroup = new Group ();

}

function draw(){
  background("white");
//for(var i =0; i< treesGroup.length, i++)
 // tree.depth = man.depth
 if(treesGroup.collide(man)){
   console.log(treesGroup.length);
  tree.addImage("tree2", treeImage2);
  tree.changeImage("tree2", treeImage2);
  tree.scale = 0.5;
  tree.velocityX = -3;
  treesGroup.remove(tree);
   console.log("Hi")
 }

   spawnTree();
   drawSprites();
  
}

function spawnTree(){

  if(frameCount % 250 === 0){
    console.log(frameCount);
    tree = createSprite(displayWidth , displayHeight- 40, 40, 80);
    tree.debug = true;
    tree.addImage( "tree1", treeImage1);
    tree.setCollider("rectangle", 0,0, 100, 100);
    tree.velocityX = -3;

    man.depth = tree.depth;
    man.depth = man.depth + 1;

    treesGroup.add(tree);
  }
 
}
*/