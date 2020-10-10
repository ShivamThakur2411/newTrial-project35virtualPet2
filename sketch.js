var dog, dogI, dogHappy;
var foodS, foodStock;
var database;
var fedTime, lastFed;
var food, noMilkImg;
var buttonFeed, buttonAdd;
var button, input;

function preload(){
	dogI = loadImage("Dog.png");
	dogHappy = loadImage("happyDog2.png");
}

function setup() {
	createCanvas(500, 500);
	 database = firebase.database();

	dog = createSprite(420,250);
	dog.scale = 0.15;
	dog.addImage(dogI);

	nameSetup();
	food = new Food();

	fedtime = database.ref('FeedTime');
	fedtime.on("value",function(data){
		lastFed = data.val();
	})  
}

function draw() {  
	background("red");

		fill(255,255,254);
		textSize(15);
		if(lastFed>=12){
			text("last Fed : " + lastFed%12 + "PM",200, 30);
		}else if(lastFed === 0){
			text("Last Fed : 12AM", 200, 30);
		}else{
			text("Last Fed : " + lastFed + "  AM", 200, 30);
		}

	feed = createButton("FEED THE DOG");
	feed.position(730, 66);
	feed.mousePressed(feedDog);

	addFood = createButton("ADD FOOD");
	addFood.position(450, 66);
	addFood.mousePressed(addFoods);

	if(dog.x < 300){
		dog.x = 420;
		dog.y = 250;
		dog.velocityX = 0;
		dog.addImage(dogI);
	}
		if(keyCode === 32){
			textSize(30);
			text("DON'T LET IT BE HUNGRY", 50, 250);
	}

  drawSprites();
}

function feedDog(){
	dog.addImage(dogHappy);

	food.updateFoodStock(food.getFoodStock()-1);
	database.ref('/').update({
		Food: food.getFoodStock(),
		FeedTime: hour()
	})
}

function addFoods(){
	dog.addImage(dogI);
	foodS++;
	database.ref('/').update({
		Food: foodS
	})
}

//the function for naming the dog;
function nameSetup(){
	var input = createInput("NAME THE PET");
	input.position(450, 100);
}