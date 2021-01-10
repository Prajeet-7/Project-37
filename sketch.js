var dog, sadDog, happyDog, database;

var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood; 

var foodObj;

var changeGameState;
var readGameState;

var bedRoom_img, garden_img, washRoom_img;


function preload(){

    sadDog = loadImage("Images/Dog.png");
    happyDog = loadImage("Images/happy dog.png");

    bedRoom_img = loadImage("virtual pet images/Bed Room.png");
    garden_img = loadImage("virtual pet images/Garden.png");
    washRoom_img = loadImage("virtual pet images/Wash Room.png");

}


function setup() {

  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {

  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');

  fedTime.on("value",function(data){

    lastFed=data.val();

  });
 
  fill(255,255,254);
  textSize(15);


  if(lastFed>=12){

    text("Last Feed : "+ lastFed%12 + " PM", 350,30);

   }

   else if(lastFed==0){

     text("Last Feed : 12 AM",350,30);

   }

   else{

     text("Last Feed : "+ lastFed + " AM", 350,30);

   }

 
  drawSprites();

}


function readStock(data){

  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}



function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);


  database.ref('/').update({

    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })
}


function addFoods(){

  foodS++;

  database.ref('/').update({
    Food:foodS
  })

}


readState = database.ref('gameState');
readState.on("value", function data(){
  gameState = data.val();
});


function update(){
    database.ref('/').update({
      gameState:state
    });
}