function ResourceManager()
{
	this.general =
	{
		img:
		{
			background:loadImage("img/Background.png")
		}
	}
	
	this.startScreen = 
	{
		img:
		{
			menuItem:loadImage("img/TitleMenuItem.png")
		}
	
	};
	
	this.difficultyScreen =
	{
		img:
		{
			checkbox:loadImage("img/Checkbox.png"),
			checkboxChecked:loadImage("img/CheckboxChecked.png"),
			startButton:loadImage("img/StartExercises.png"),
			returnButton:loadImage("img/ReturnToStart.png")
		}
	};
	
	
	this.exerciseScreen = 
	{
		img:
		{
			largeScore:loadImage("img/ScoreLarge.png"),
			smallScore:loadImage("img/ScoreSmall.png"),
			scoreBar:loadImage("img/ScoreBar.png"),
			checkAnswer:loadImage("img/CheckAnswer.png"),
			openMenu:loadImage("img/OpenMenu.png")
		}
	};
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