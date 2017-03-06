// Javascript Document


// Variabelen
var canvas  = document.getElementById("gamecanvas");
var stage = new createjs.Stage(canvas);

new createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",ticker);

var dragon;

var spelerRoodRechts = false;
var spelerRoodLinks = false;

var spelerBlauwRechts = false;
var spelerBlauwLinks = false;

var cannonfiredRed = false;
var cannonfiredBlue = false;

var eindeCanvas = stage.canvas.width;


// Toetsen afvangen
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;


// Dragon automatisch rechts over het beeld laten bewegen
dragon = new createjs.SpriteSheet(
{     
    frames:  
    {
        "width":      75,                                   // Breedte van de afbeelding
        "height":     70,                                   // Hoogte van de afbeelding
        "regX":       37,                                   // helft van de breedte
        "regY":       35,                                   // Onderkant van de afbeelding
        "count":      80                                    // Aantal frames in spritesheets
    },  
    animations:       
    {
        "rechts":     [0, 9],                               // Vliegen naar rechts van afbeelding 0 t/m 9
    },
    images:           ["../images/dragon.png"]              // Image inladen
});


var dragonanimation = new createjs.Sprite(dragon);
var speed = 5;
dragonanimation.x = 50;
dragonanimation.y = 50;

window.onload = function()

{
    dragonanimation.gotoAndPlay("rechts");
    stage.addChild(dragonanimation);
}


// Speler toevoegen
var mijnImage = new Image();
mijnImage.src = "../images/character.png"

var mijnSpelerRood = new createjs.Bitmap(mijnImage);
mijnSpelerRood.x = 10;
mijnSpelerRood.y = 270;
stage.addChild(mijnSpelerRood);


// Vijand toevoegen
var mijnImage2 = new Image();
mijnImage2.src = "../images/enemy.png"

var mijnSpelerBlauw = new createjs.Bitmap(mijnImage2)
mijnSpelerBlauw.x = 900;
mijnSpelerBlauw.y = 270;
stage.addChild(mijnSpelerBlauw);


// Kogel speler rood toevoegen
var mijnBullet = new Image();
mijnBullet.src = "../images/cannonball.png"
var ball = new createjs.Bitmap(mijnBullet); 


// Kogel speler blauw toevoegen
var mijnBullet2 = new Image();
mijnBullet2.src = "../images/cannonball2.png"
var ball2 = new createjs.Bitmap(mijnBullet2);

// Ticker Functions
function ticker ()
{
dragonmovement();
cannonShooting();
boemBatsKnal();
stage.update();
tickerKeyDown();
spelerRoodCanvas();
spelerBlauwCanvas();
kogelCanvas();
}


// Animeren van de draak
function dragonmovement()
{
    stage.update();
    dragonanimation.x = dragonanimation.x + 1;

    dragonanimation.x = dragonanimation.x + speed;

    if (dragonanimation.x > stage.canvas.width)
    {
        speed = speed *-1;
    }

    else if (dragonanimation.x < 0)
    {
        speed = speed *-1;
    }
    stage.update(dragonanimation);
}
stage.update();


if (!e) 
{
    var e = window.event;
}


// Bewegen van character
function handleKeyDown (e)
{
    if (e.keyCode == 65)
    {
        spelerRoodLinks = true;
    }

    else if (e.keyCode == 68)
    {      
        spelerRoodRechts = true;
    }

    else if (e.keyCode == 37)
    {
        spelerBlauwLinks = true;
    }

    else if (e.keyCode == 39)
    {      
        spelerBlauwRechts = true;
    }

    else if (e.keyCode == 32)
    {
        placeBullet();
        console.log("Cannon Red is loaded");
    }

    else if (e.keyCode == 13)
    {
        placeBullet2();
        console.log("Cannon Blue is loaded")
    }

    else
    {
        console.log(e.keyCode);
    }
    stage.update();
}


function handleKeyUp (e)
{
    if (e.keyCode == 65)
    {
        spelerRoodLinks = false;
    }

    else if (e.keyCode == 68)
    {      
        spelerRoodRechts = false;
    }

    else if (e.keyCode == 37)
    {
        spelerBlauwLinks = false;
    }

    else if (e.keyCode == 39)
    {      
        spelerBlauwRechts = false;  
    }
}


function tickerKeyDown ()
{
    if (spelerRoodLinks == true)
    {
        mijnSpelerRood.x = mijnSpelerRood.x - 6;
        stage.update(mijnSpelerRood);
        console.log("pijltoets rood links");
    }

    else if (spelerRoodRechts == true)
    {      
        mijnSpelerRood.x = mijnSpelerRood.x + 6;
        stage.update(mijnSpelerRood);
        console.log("pijltoets rood rechts");  
    }

    else if (spelerBlauwLinks == true)
    {
        mijnSpelerBlauw.x = mijnSpelerBlauw.x - 6;
        stage.update(mijnSpelerBlauw);
        console.log("pijltoets blauw links");
    }

    else if (spelerBlauwRechts == true)
    {      
        mijnSpelerBlauw.x = mijnSpelerBlauw.x + 6;
        stage.update(mijnSpelerBlauw);
        console.log("pijltoets blauw rechts");  
    }
    stage.update();
}


// Speler Rood in het canvas houden
function spelerRoodCanvas()
{   
    if (mijnSpelerRood.x <= 0) 
    {
        mijnSpelerRood.x = 0;
    }
    if (mijnSpelerRood.x >= 924)
    {
        mijnSpelerRood.x = 924;
    }
}


// Speler Blauw in het canvas houden
function spelerBlauwCanvas()
{
    if (mijnSpelerBlauw.x <= 0)
    {
        mijnSpelerBlauw.x = 0;
    }
    if (mijnSpelerBlauw.x >= 924)
    {
        mijnSpelerBlauw.x = 924;
    }
}


// Kogels binnen canvas houden
function kogelCanvas()
{
    if (ball.y < -40)               
    {
        ball.y = -40;
        cannonfiredRed = false;
        stage.removeChild(ball);
        console.log("Kogel Rood Heeft Gemist");
    }

    if (ball2.y < -40)
    {
        ball2.y = -40;
        cannonfiredBlue = false;
        stage.removeChild(ball2);
        console.log("Kogel Blauw Heeft Gemist");
    }
}


// Plaatsen van de kogel van speler rood
function placeBullet()
{
        ball.x = mijnSpelerRood.x + 43.5;
        ball.y = mijnSpelerRood.y + 5;
        stage.addChild(ball);
        cannonfiredRed = true;
}


// Plaatsen van de kogel van speler blauw
function placeBullet2()
{
        ball2.x = mijnSpelerBlauw.x + 43.5;
        ball2.y = mijnSpelerBlauw.y + 5;
        stage.addChild(ball2);
        cannonfiredBlue = true;
}


function cannonShooting()
{
    if (cannonfiredRed == true)
    {
        ball.y = ball.y - 15;
    }

    if (cannonfiredBlue == true)
    {
        ball2.y = ball2.y - 15;
    }
    stage.update();
}


// Boem Bats Knal Functies
function distance(obj1, obj2)
{
    var difx = obj2.x - obj1.x;
    var dify = obj2.y - obj1.y;
    return Math.sqrt((difx*difx)+(dify*dify));
}

function boemBatsKnal()
{
    if (distance(ball, dragonanimation) < 35) 
    {
        console.log("+100 Points For Player Red!");
        stage.removeChild(dragonanimation);
        stage.removeChild(ball);
        dragonanimation.x = 20;
        dragonanimation.y = Math.random()* 80;
        stage.addChild(dragonanimation);
    }
    if (distance(ball2, dragonanimation) < 35) 
    {
        console.log("+100 Points For Player Blue");
        stage.removeChild(dragonanimation);
        stage.removeChild(ball2);
        dragonanimation.x = 20;
        dragonanimation.y = Math.random()* 80;
        stage.addChild(dragonanimation);
    }
    stage.update();
}
