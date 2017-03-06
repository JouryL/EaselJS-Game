// Javascript Document


// Canvas en de Ticker
var canvas = document.getElementById("gamecanvas");
var stage = new createjs.Stage(canvas);

new createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",ticker);


// Variabelen
var logoFontys;
var logoFontys2;
var logoFontys3;

var dragon;
var dragon2;

var dragonanimation;
var dragonanimation2;

var movementDragon;
var movementDragon2;

var mijnSpelerRood;
var mijnSpelerBlauw;

var ball;
var ball2;

var ScoreRoodtext;
var ScoreBlauwtext;

var username;
var highscore;

var spelerRoodRechts = false;
var spelerRoodLinks = false;

var spelerBlauwRechts = false;
var spelerBlauwLinks = false;

var cannonfiredRed = false;
var cannonfiredBlue = false;

var scoreSpelerRood = 0;
var scoreSpelerBlauw = 0;

var spelerRoodWin = false;
var SpelerBlauwWin = false;

var redWin = false;
var blueWin = false;

var restartKnop = false;

var eindeCanvas = stage.canvas.width;


// Toetsen afvangen
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
window.onload = init();

if (!e) 
{
    var e = window.event;
}


// Browser Detectie en Aanmaken van geluiden
if (navigator.appName == 'Microsoft Internet Explorer')
{
    var AudioShot = new Audio("../geluid/cannonshot.mp3");
    var AudioHit = new Audio("../geluid/dragonhit.mp3");
    var AudioSpawn = new Audio("../geluid/dragonspawn.mp3");
    console.log("Welcome to Internet Explorer, Please install any other browser NOW");
}

else 
{
    var AudioShot = new Audio("../geluid/cannonshot.wav");
    var AudioHit = new Audio("../geluid/dragonhit.wav");
    var AudioSpawn = new Audio("../geluid/dragonspawn.wav");
    var AudioHaha = new Audio("../geluid/evillaugh.wav");
    console.log("Welcome to the world of Google Chrome, Safari, or Firefox");
}


// Init Functie Game
function init()
{
    checkCookie();
}


// Start Scherm aanmaken
mijnImage1 = new Image();
mijnImage1.src = "../images/voorscherm.png"
startScherm = new createjs.Bitmap(mijnImage1);
stage.addChild(startScherm);
AudioSpawn.play();


// Start Knop aanmaken
mijnImage2 = new Image();
mijnImage2.src = "../images/button.png"
startKnop = new createjs.Bitmap(mijnImage2);
startKnop.x = 438;
startKnop.y = 220;

stage.addChild(startKnop);
startKnop.addEventListener("click", startSpel);


// Game Scherm aanmaken
mijnImage3 = new Image();
mijnImage3.src = "../images/background.png"
gameScherm = new createjs.Bitmap(mijnImage3);


// Game Ending Scherm speler blauw aanmaken
mijnImage4 = new Image();
mijnImage4.src = "../images/bluewin.png"
blueWin = new createjs.Bitmap(mijnImage4);


// Game Ending Scherm speler rood aanmaken
mijnImage5 = new Image();
mijnImage5.src = "../images/redwin.png"
redWin = new createjs.Bitmap(mijnImage5);

// Fontys logo nummer 1 aanmaken
mijnImage8 = new Image();
mijnImage8.src = "../images/fontys.png"
logoFontys = new createjs.Bitmap(mijnImage8);
logoFontys.x = 10;
logoFontys.y = 10;

// Fontys logo nummer 2 aanmaken
mijnImage9 = new Image();
mijnImage9.src = "../images/fontys.png"
logoFontys2 = new createjs.Bitmap(mijnImage9);
logoFontys2.x = 460;
logoFontys2.y = 10;

// Fontys logo nummer 3 aanmaken
mijnImage10 = new Image();
mijnImage10.src = "../images/fontys.png"
logoFontys3 = new createjs.Bitmap(mijnImage10);
logoFontys3.x = 910;
logoFontys3.y = 10;


// Dragons automatisch rechts en links over het beeld laten bewegen
dragonLeft = new createjs.SpriteSheet(
{     
    frames:  
    {
        "width":      75,                                    // Breedte van de afbeelding
        "height":     70,                                    // Hoogte van de afbeelding
        "regX":       37,                                    // helft van de breedte
        "regY":       35,                                    // Onderkant van de afbeelding
        "count":      80                                     // Aantal frames in spritesheets
    },  
    animations:       
    {
        "rechts":     [0, 9],                                // Vliegen naar rechts van afbeelding 0 t/m 9
        "links":      [40, 49]
    },
    images:           ["../images/dragon.png"]               // Image inladen
});


// Dragons automatisch rechts en links over het beeld laten bewegen
dragonRight = new createjs.SpriteSheet(
{
    frames:  
    {
        "width":      75,                                    // Breedte van de afbeelding
        "height":     70,                                    // Hoogte van de afbeelding
        "regX":       37,                                    // helft van de breedte
        "regY":       35,                                    // Onderkant van de afbeelding
        "count":      80                                     // Aantal frames in spritesheets
    },  
    animations:       
    {
        "links1":      [40, 49],                               // Vliegen naar rechts van afbeelding 40 t/m 49
        "rechts2":     [0, 9],
    },
    images:           ["../images/dragon2.png"]               // Image inladen
});


// Snelheid en locatie van de dragon
dragonanimation = new createjs.Sprite(dragonLeft);
movementDragon = 25;
dragonanimation.x = 50;
dragonanimation.y = 50;
dragonanimation.gotoAndPlay("links");
dragonanimation.gotoAndPlay("rechts");


dragonanimation2 = new createjs.Sprite(dragonRight);
movementDragon2 = 25;
dragonanimation2.x = 974;
dragonanimation2.y = 50;
dragonanimation2.gotoAndPlay("links1");
dragonanimation2.gotoAndPlay("rechts1")



// Speler toevoegen
mijnImage7 = new Image();
mijnImage7.src = "../images/character.png"
mijnSpelerRood = new createjs.Bitmap(mijnImage7);
mijnSpelerRood.x = 10;
mijnSpelerRood.y = 270;
startKnop.addEventListener("click");
console.log("hey, laat me eens met rust");


// Vijand toevoegen
mijnImage6 = new Image();
mijnImage6.src = "../images/enemy.png"
mijnSpelerBlauw = new createjs.Bitmap(mijnImage6)
mijnSpelerBlauw.x = 914;
mijnSpelerBlauw.y = 270;


// Kogel speler rood toevoegen
mijnBullet = new Image();
mijnBullet.src = "../images/cannonball.png"
ball = new createjs.Bitmap(mijnBullet); 
ball.x = -50;                                               // Bullet bug fixen


// Kogel speler blauw toevoegen
mijnBullet2 = new Image();
mijnBullet2.src = "../images/cannonball2.png"
ball2 = new createjs.Bitmap(mijnBullet2);
ball2.x = -50;                                              // Bullet bug fixen


// Ticker Functions
function ticker ()
{
dragonmovement();
dragonmovement2();
cannonShootingRed();
cannonShootingBlue();
boemBatsKnal();
tickerKeyDownRood();
tickerKeyDownBlauw();
spelerRoodCanvas();
spelerBlauwCanvas();
kogelCanvas();
eindeSpelRood();
eindeSpelBlauw();
Fontys();
stage.update();
}


// Fontys Logo naar beneden laten Sliden
function Fontys()
{
    logoFontys.y = logoFontys.y + 1;
    if (logoFontys.y > 300)
    {
        logoFontys.y = 10;
    }

    logoFontys2.y = logoFontys2.y + 1;
    if (logoFontys2.y > 300)
    {
        logoFontys2.y = 10;
    }

    logoFontys3.y = logoFontys3.y + 1;
    if (logoFontys3.y > 300)
    {
        logoFontys3.y = 10;
    }
}


// Animeren van de draak naar rechts
function dragonmovement()
{
    dragonanimation.x = dragonanimation.x + movementDragon;

    if (dragonanimation.x > stage.canvas.width)
    {
        movementDragon = movementDragon -1;
    }

    else if (dragonanimation.x < 10)
    {
        movementDragon = movementDragon +1;
    }
    stage.update(dragonanimation);
}


// Animeren van de draak naar links
function dragonmovement2()
{
    dragonanimation2.x = dragonanimation2.x - movementDragon2;

    if (dragonanimation2.x > stage.canvas.width)
    {
        movementDragon2 = movementDragon2 +1;
    }

    else if (dragonanimation2.x < 10)
    {
        movementDragon2 = movementDragon2 -1;
    }
    stage.update(dragonanimation2);
}


// Bewegen van character
function handleKeyDown (e)
{
    if (e.keyCode == 65)
    {
        spelerRoodLinks = true;
    }

    else if (e.keyCode == 70)
    {
        spelerRoodLinks = true;
    }

    else if (e.keyCode == 68)
    {      
        spelerRoodRechts = true;
    }

    else if (e.keyCode == 72)
    {      
        spelerRoodRechts = true;
    }

    else if (e.keyCode == 37)
    {
        spelerBlauwLinks = true;
    }

    else if (e.keyCode == 74)
    {
        spelerBlauwLinks = true;
    }

    else if (e.keyCode == 39)
    {      
        spelerBlauwRechts = true;
    }

    else if (e.keyCode == 76)
    {      
        spelerBlauwRechts = true;
    }    

    else if (e.keyCode == 32)
    {
        placeBullet();
    }

    else if (e.keyCode == 71)
    {
        placeBullet();
    }

    else if (e.keyCode == 13)
    {
        placeBullet2();
    }

    else if (e.keyCode == 75)
    {
        placeBullet2();
    }

    else if (e.keyCode == 54)
    {
        AudioHaha.play();
        console.log("wordt je nu uitgelachen door een spel? Schandalig!")
    }
    stage.update();
}


function handleKeyUp (e)
{
    if (e.keyCode == 65)
    {
        spelerRoodLinks = false;
    }

    else if (e.keyCode == 70)
    {
        spelerRoodLinks = false;
    }

    else if (e.keyCode == 68)
    {      
        spelerRoodRechts = false;
    }

    else if (e.keyCode == 72)
    {      
        spelerRoodRechts = false;
    }

    else if (e.keyCode == 37)
    {
        spelerBlauwLinks = false;
    }

    else if (e.keyCode == 74)
    {
        spelerBlauwLinks = false;
    }    

    else if (e.keyCode == 39)
    {      
        spelerBlauwRechts = false;  
    }

    else if (e.keyCode == 76)
    {      
        spelerBlauwRechts = false;  
    }
    stage.update();
}


function tickerKeyDownRood ()
{
    if (spelerRoodLinks == true)
    {
        mijnSpelerRood.x = mijnSpelerRood.x - 30;
        stage.update(mijnSpelerRood);
    }

    else if (spelerRoodRechts == true)
    {      
        mijnSpelerRood.x = mijnSpelerRood.x + 30;
        stage.update(mijnSpelerRood);
    }
}


function tickerKeyDownBlauw ()
{
    if (spelerBlauwLinks == true)
    {
        mijnSpelerBlauw.x = mijnSpelerBlauw.x - 30;
        stage.update(mijnSpelerBlauw);
    }

    else if (spelerBlauwRechts == true)
    {      
        mijnSpelerBlauw.x = mijnSpelerBlauw.x + 30;
        stage.update(mijnSpelerBlauw);
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

    if (mijnSpelerRood.x >= 410)
    {
        mijnSpelerRood.x = 410;
    }
}


// Speler Blauw in het canvas houden
function spelerBlauwCanvas()
{
    if (mijnSpelerBlauw.x <= 517)
    {
        mijnSpelerBlauw.x = 517;
    }

    if (mijnSpelerBlauw.x >= 924)
    {
        mijnSpelerBlauw.x = 924;
    }
}


// Plaatsen van de kogel van speler rood
function placeBullet()
{
    AudioShot.play();
    ball.x = mijnSpelerRood.x + 43.5;
    ball.y = mijnSpelerRood.y + 5;
    stage.addChild(ball);
    cannonfiredRed = true;
}


// Plaatsen van de kogel van speler blauw
function placeBullet2()
{
    AudioShot.play();
    ball2.x = mijnSpelerBlauw.x + 43.5;
    ball2.y = mijnSpelerBlauw.y + 5;
    stage.addChild(ball2);
    cannonfiredBlue = true;
}


// Kogels binnen canvas houden
function kogelCanvas()
{
    if (ball.y < 0)               
    {
        ball.y = -45;
        cannonfiredRed = false;
        stage.removeChild(ball);
        console.log("Kogel Rood is verwijderd");
    }

    if (ball2.y < 0)
    {
        ball2.y = -45;
        cannonfiredBlue = false;
        stage.removeChild(ball2);
        console.log("Kogel Blauw is verwijderd");
    }
}


function cannonShootingRed()
{
    if (cannonfiredRed == true)
    {
        ball.y = ball.y - 75;
    }
}


function cannonShootingBlue()
{
    if (cannonfiredBlue == true)
    {
        ball2.y = ball2.y - 75;
    }
    stage.update();
}


// Score toevoegen
ScoreRoodtext = new createjs.Text("Player Red: "+ scoreSpelerRood, "20px verdana");
ScoreBlauwtext = new createjs.Text("Player Blue: "+ scoreSpelerBlauw, "20px verdana");
ScoreRoodtext.y = 5;
ScoreRoodtext.x = 5;
ScoreBlauwtext.y = 5;
ScoreBlauwtext.x = 830;


// Functies voor het botsen van de kogels en de dragons
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
        AudioHit.play();
        console.log("+100 Points For Player Red!");
        stage.removeChild(dragonanimation);
        stage.removeChild(ball);
        dragonanimation.x = 20;
        dragonanimation.y = Math.random()* 80;
        stage.addChild(dragonanimation);
 
        //Score update voor Rood (dragon)
        stage.removeChild(ScoreRoodtext);
        scoreSpelerRood = scoreSpelerRood + 100;
        ScoreRoodtext = new createjs.Text("Player Red: "+ scoreSpelerRood, "20px verdana");
        ScoreRoodtext.y = 5;
        ScoreRoodtext.x = 5;
        stage.addChild(ScoreRoodtext);
        stage.update(ScoreRoodtext);
    }

    if (distance(ball, dragonanimation2) < 35)
    {
        AudioHit.play();
        console.log("+100 Points For Player Red!");
        stage.removeChild(dragonanimation2);
        stage.removeChild(ball);
        dragonanimation2.x = 974;
        dragonanimation2.y = Math.random()* 80;
        stage.addChild(dragonanimation2);

        //Score update voor Rood (dragon2)
        stage.removeChild(ScoreRoodtext);
        scoreSpelerRood = scoreSpelerRood + 100;
        ScoreRoodtext = new createjs.Text("Player Red: "+ scoreSpelerRood, "20px verdana");
        ScoreRoodtext.y = 5;
        ScoreRoodtext.x = 5;
        stage.addChild(ScoreRoodtext);
        stage.update(ScoreRoodtext);
    }

    if (distance(ball2, dragonanimation) < 35) 
    {
        AudioHit.play();
        console.log("+100 Points For Player Blue");
        stage.removeChild(dragonanimation);
        stage.removeChild(ball2);
        dragonanimation.x = 20;
        dragonanimation.y = Math.random()* 80;
        stage.addChild(dragonanimation);

        //Score update voor Blauw (dragon)
        stage.removeChild(ScoreBlauwtext);
        scoreSpelerBlauw = scoreSpelerBlauw + 100;
        ScoreBlauwtext = new createjs.Text("Player Blue: "+ scoreSpelerBlauw, "20px verdana");
        ScoreBlauwtext.y = 5;
        ScoreBlauwtext.x = 830;
        stage.addChild(ScoreBlauwtext);
        stage.update(ScoreBlauwtext);        
    }

    if (distance(ball2, dragonanimation2) < 35)
    {
        AudioHit.play();
        console.log("+100 Points For Player Blue");
        stage.removeChild(dragonanimation2);
        stage.removeChild(ball2);
        dragonanimation2.x = 974;
        dragonanimation2.y = Math.random()* 80;
        stage.addChild(dragonanimation2);

        //Score update voor Blauw (dragon2)
        stage.removeChild(ScoreBlauwtext);
        scoreSpelerBlauw = scoreSpelerBlauw + 100;
        ScoreBlauwtext = new createjs.Text("Player Blue: "+ scoreSpelerBlauw, "20px verdana");
        ScoreBlauwtext.y = 5;
        ScoreBlauwtext.x = 830;
        stage.addChild(ScoreBlauwtext);
        stage.update(ScoreBlauwtext);        
    }
    stage.update();
}
 

// Functies voor het starten van de game
function startSpel()
{
    if (startScherm != null)
    {
        stage.removeChild(startScherm);
        startScherm = null;
    }

    if (startKnop != null)
    {
        stage.removeChild(startKnop);
        startKnop = null;
    }

    stage.addChild(gameScherm);
    stage.addChild(dragonanimation);
    stage.addChild(dragonanimation2);
    stage.addChild(mijnSpelerRood);
    stage.addChild(mijnSpelerBlauw);
    stage.addChild(ball);
    stage.addChild(ball2);
    stage.addChild(ScoreRoodtext);
    stage.addChild(ScoreBlauwtext);
    stage.addChild(logoFontys);
    stage.addChild(logoFontys2);
    stage.addChild(logoFontys3);
}


// Functies voor het eindigen van de game als speler rood wint
function eindeSpelRood()
{
    if (scoreSpelerRood == 500)
    {
        stage.removeChild(gameScherm);
        stage.removeChild(dragonanimation);
        stage.removeChild(dragonanimation2);
        stage.removeChild(mijnSpelerRood);
        stage.removeChild(mijnSpelerBlauw);
        stage.removeChild(ball);
        stage.removeChild(ball2);
        stage.removeChild(ScoreRoodtext);
        stage.removeChild(ScoreBlauwtext);

        stage.addChild(redWin);
    }
}


// Functies voor het eindigen van de game als speler blauw wint
function eindeSpelBlauw()
{
    if (scoreSpelerBlauw == 500)
    {
        stage.removeChild(gameScherm);
        stage.removeChild(dragonanimation);
        stage.removeChild(dragonanimation2);
        stage.removeChild(mijnSpelerRood);
        stage.removeChild(mijnSpelerBlauw);
        stage.removeChild(ball);
        stage.removeChild(ball2);
        stage.removeChild(ScoreRoodtext);
        stage.removeChild(ScoreBlauwtext);

        stage.addChild(blueWin);
    }
}


// CookieMonster
function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");

    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }

    if (c_start == -1)
    {
        c_value = null;
    }

    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);

    if (c_end == -1)
    {
        c_end = c_value.length;
    }
        c_value = unescape(c_value.substring(c_start,c_end));
    }

    return c_value;
    }


    function setCookie(c_name,value,exdays)
    {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }


    function checkCookie()
    {
       var username=getCookie("username");
       var highscore=getCookie("highscore");

    if (username!=null && username!="")
    {
       alert("Welcome Back " + username);
    }

    else
    {
      username=prompt("Please enter yo name: ","");

    if (username!=null && username!="")
    {
        setCookie("username",username,365);
        setCookie("highscore", 0, 365);
    }
}
}
