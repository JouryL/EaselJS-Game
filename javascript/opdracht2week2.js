// Javascript Document

var canvas = document.getElementById("gamecanvas");
var stage = new createjs.Stage(canvas);

// Toevoegen van een Ticker die beweegt

var speed = 120;

var object = new createjs.Shape();
object.graphics.beginFill("white").drawRect(0,0,100, 100);
object.y = 200;
stage.addChild(object);

new createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",tick);

function tick()
{
	object.x = object.x + speed;

	if (object.x > stage.canvas.width)
	{
		speed = speed *-1;
	}

	else if (object.x < 0)
	{
		speed = speed *-1;
	}
	stage.update(object);
}
stage.update();