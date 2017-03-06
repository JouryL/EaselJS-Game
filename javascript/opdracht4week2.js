// Javascript Document

// Variabelen

var canvas = document.getElementById("gamecanvas");
var stage = new createjs.Stage(canvas);

var good = new createjs.Text("You guessed the right number!","50px Verdana", "white");
	good.x = 100;
	good.y = 50;

var low = new createjs.Text("You guessed to low","50px Verdana", "white");
	low.x = 100;
	low.y = 50;

var high = new createjs.Text("You guessed to high","50px Verdana", "white");
	high.x = 100;
	high.y = 50;

var attempts = 0;

var x = Math.floor((Math.random()*10)+1);

var invoer = prompt("Enter a Number between 1 and 10 and Gamble!","");


// Getallen invoeren

if (invoer >= 1 && invoer <= 10)
{

}
else
{

}
while(invoer != x)
{
	if (invoer > x)
	{
		stage.addChild(high);
	}
	if (invoer < x)
	{
		stage.addChild(low);
	}
		attempts++;

		stage.update();
		invoer = prompt("Enter a Number between 1 and 10 and Gamble!","");
		stage = new createjs.Stage(canvas);

}
	if (invoer == x)
	{
		attempts++;
		stage.addChild(good);
		stage.update();
		alert("You made "+attempts+" attempt to get the right number");
	}
