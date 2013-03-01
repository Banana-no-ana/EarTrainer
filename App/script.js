var mousePos = new Vector2(0, 0);

var crect = null;
var startTime = null;
var canvas = null;
var ctx = null;

var loggedIn = false;




var menuItemImg = null;
var checkboxImg = null;
var checkboxCheckedImg = null;
var startButtonImg = null;
var returnButtonImg = null;
var largeScoreImg = null;
var largeScoreDividerImg = null;

var currentScreen = null;
var startScreen = null;
var difficultyScreen = null;
var exerciseScreen = null;


function initialize()
{
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	
	document.addEventListener('mousemove', mouseUpdate);
	
	menuItemImg = loadImage("img/TitleMenuItem.png");
	checkboxImg = loadImage("img/Checkbox.png");
	checkboxCheckedImg = loadImage("img/CheckboxChecked.png");
	startButtonImg = loadImage("img/StartExercises.png");
	returnButtonImg = loadImage("img/ReturnToStart.png");
	largeScoreImg = loadImage("img/ScoreLarge.png");
	largeScoreDividerImg = loadImage("img/ScoreLargeDivider.png");
	
	startScreen = new StartScreen();
	difficultyScreen = new DifficultyScreen();
	exerciseScreen = new ExerciseScreen();
	currentScreen = startScreen;
	currentScreen.enable();
	
	var raf = window.requestAnimationFrame
	       || window.webkitRequestAnimationFrame
		   || window.mozRequestAnimationFrame
		   || window.oRequestAnimationFrame
		   || window.msRequestAnimationFrame
		   || myRequestAnimationFrame;
		   
    window.requestAnimationFrame = raf;
	window.requestAnimationFrame(frameRequest);
}

function frameRequest()
{
	main()
	draw();
	
	requestAnimationFrame(frameRequest);
}

function main()
{
	currentScreen.main();
}

function draw()
{
	console.log('drawing...');
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	currentScreen.draw(ctx);

	
	ctx.font = '12px Arial'
	ctx.textAlign = 'left'
	ctx.fillText(mousePos.x + ',' + mousePos.y, 0, 484);
}

function mouseUpdate(evt)
{
	rect = canvas.getBoundingClientRect();
	mousePos = { x:evt.clientX - rect.left, y:evt.clientY - rect.top };
}

function loadImage(uri)
{
    var img = new Image();
    img.onload = imageLoaded;
    img.src = uri;
    return img;
}

function loadAudio(uri)
{
    var audio = new Audio();
    audio.oncanplaythrough = audioLoaded;
    audio.src = uri;
    return audio;
}

function imageLoaded()
{


}

function myRequestAnimationFrame(callback)
{
	window.setTimeout(callback, 1000 / 60);
}

initialize();