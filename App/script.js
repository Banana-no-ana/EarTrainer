var mousePos = new Vector2(0, 0);

var crect = null;
var startTime = null;
var canvas = null;
var ctx = null;

var loggedIn = false;

var resource = null;

var startScreen = null;
var difficultyScreen = null;
var exerciseScreen = null;

var nextScreen = null;
var currentScreen = null;

var transitionScreen = false;
var transitionTime = 0;


function initialize()
{
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	
	document.addEventListener('mousemove', mouseUpdate);
	
	resource = new ResourceManager();
	
	startScreen = new StartScreen();
	difficultyScreen = new DifficultyScreen();
	exerciseScreen = new ExerciseScreen();
	changeScreen(startScreen);
	
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
	
	window.requestAnimationFrame(frameRequest);
}

function main()
{
	currentScreen.main();
	
	if (transitionScreen)
	{
		if (nextScreen != null)
			currentScreen.opacity = 1 - transitionTime;
		else
			currentScreen.opacity = transitionTime;
		
		if (transitionTime >= 1)
		{
			if (nextScreen != null)
			{
				transitionTime = 0;
				currentScreen = nextScreen;
				nextScreen = null;
			}
			else
			{
				transitionTime = 0;
				transitionScreen = false;
				currentScreen.enable();
			}
		}
		
		transitionTime += 0.1;
	}
}

function draw()
{
	console.log('drawing...');
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.setTransform(50, 0, 0, 1, 0, 0);
	ctx.drawImage(resource.general.img.background, 0, 0);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	
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

function changeScreen(newScreen)
{
	transitionScreen = true;
	
	if (newScreen == null)
		newScreen = startScreen;
	
	if (currentScreen != null)
	{
		currentScreen.disable();
		nextScreen = newScreen;
	}
	else
	{
		currentScreen = newScreen;
	}
}



function myRequestAnimationFrame(callback)
{
	window.setTimeout(callback, 1000 / 60);
}

initialize();