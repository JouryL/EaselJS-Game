// Javascript Document

var canvas = document.getElementById("gamecanvas");
var stage = new createjs.Stage(canvas);


// Tekst deel 1

var txt;

txt = new createjs.Text("Kiek um Goan", "50px Verdana", "White");

txt.x = 50;
txt.y = 50;


// Tekst deel 2

var txt2;

txt2 = new createjs.Text("Op z'n Brabants", "50px Verdana", "White");

txt2.x = 50;
txt2.y = 150;


// Toevoegen van een Ticker

new createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", tick);

var txt3;
var teller = 0;

function tick()
{
	teller = teller + 1;
	console.log(teller)

	if (teller == 100)
	{
		teller = 0;
	}

	txt3 = new createjs.Text("Teller = " + teller, "30px Verdana", "White");

	txt3.x = 50;
	txt3.y = 300;

	stage = new createjs.Stage(canvas);
	stage.addChild(txt, txt2, txt3);
	stage.update();
}












