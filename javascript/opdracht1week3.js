// Javascript Document


// Variabelen
var canvas  = document.getElementById("gamecanvas");
var stage = new createjs.Stage(canvas);

new createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",ticker);

var dragon;
var eindeCanvas = stage.canvas.width;


// Toetsen afvangen
document.onkeydown = handleKeyDown;


// Dragon automatisch over beeld laten bewegen
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
        "links":      [40, 49]                              // Vliegen naar links met afbeelding 40 t/m 49
    },
    images:           ["../images/dragon.png"]              // Image inladen
});

var dragonanimation = new createjs.Sprite(dragon);
var dragonanimation2 = new createjs.Sprite(dragon);
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

var mijnBmp = new createjs.Bitmap(mijnImage);
mijnBmp.x = 10;
mijnBmp.y = 270;
stage.addChild(mijnBmp);


// Vijand toevoegen
var mijnImage2 = new Image();
mijnImage2.src = "../images/enemy.png"

var mijnBmp2 = new createjs.Bitmap(mijnImage2)
mijnBmp2.x = 900;
mijnBmp2.y = 270;
stage.addChild(mijnBmp2);

// Animatie van draak
function ticker ()
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
        mijnBmp.x = mijnBmp.x - 6;
        stage.update(mijnBmp);
        console.log("pijltoets rood links");
    }

    else if (e.keyCode == 68)
    {      
        mijnBmp.x = mijnBmp.x + 6;
        stage.update(mijnBmp);
        console.log("pijltoets rood rechts");  
    }

    else if (e.keyCode == 37)
    {
        mijnBmp2.x = mijnBmp2.x - 6;
        stage.update(mijnBmp2);
        console.log("pijltoets blauw links");
    }

    else if (e.keyCode == 39)
    {      
        mijnBmp2.x = mijnBmp2.x + 6;
        stage.update(mijnBmp2);
        console.log("pijltoets blauw rechts");  
    }

    else
    {
        console.log(e.keyCode);
    }
}






