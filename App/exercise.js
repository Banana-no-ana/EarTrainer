function ExerciseScreen()
{	
	this.largeScore = new LargeScore();
	this.smallScore = new SmallScore();

	this.buttons = new Array();
	this.buttons[0] = new CheckAnswerButton(new Vector2(500, 380), new Vector2(2));
	this.buttons[1] = new OpenMenuButton(new Vector2(-20, 380), new Vector2(2));
	
	this.opacity = 0;
	
	this.mousedown = ExerciseScreen.prototype.mousedown.bind(this);
	this.mouseup = ExerciseScreen.prototype.mouseup.bind(this);
	
	this.dragging = false;
	this.dragStart = new Vector2(0, 0)
	this.dragScale = 1;
	this.xStart = 0;
	
	this.x = 0;
	this.segment = 0;
}

ExerciseScreen.prototype.enable = function()
{
	document.addEventListener('mousedown', this.mousedown);
	document.addEventListener('mouseup', this.mouseup);
}

ExerciseScreen.prototype.disable = function()
{
	document.removeEventListener('mousedown', this.mousedown);
	document.removeEventListener('mouseup', this.mouseup);
}

ExerciseScreen.prototype.main = function()
{
	for (var i = 0; i < this.buttons.length; i++)
		this.buttons[i].main();
		
	this.largeScore.main();
	this.smallScore.main();
	
	
	
	if (this.dragging)
	{
		this.x = Math.max(this.xStart + (this.dragStart.x - mousePos.x) * this.dragScale, -20);
		this.segment = Math.floor((this.x + 300) / 600);
	}
	else
	{
		var dif = this.x - this.segment * 600
		if (Math.abs(dif) < 25)
			this.x = this.segment * 600
		else
			this.x += (dif > 0 ? -1 : 1) * 25;
	}
		
	this.largeScore.x = this.x;
	this.smallScore.x = this.x;
}

ExerciseScreen.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.globalAlpha = this.opacity;

	ctx.font = '12px Arial'
	ctx.textAlign = 'left'
	ctx.fillText(this.x + ',' + this.largeScore.divider1.position.x, 0, 424);
	
	for (var i = 0; i < this.buttons.length; i++)
		this.buttons[i].draw(ctx);
	
	this.largeScore.draw(ctx);
	this.smallScore.draw(ctx);
	
	ctx.restore();
}

ExerciseScreen.prototype.mousedown = function()
{
	if (!this.dragging)
	{
		this.dragging = true;
		this.dragStart = mousePos;
		this.xStart = this.largeScore.x;
		
		if (mousePos.y > 100)
			this.dragScale = 1;
		else
			this.dragScale = 5;
	}
}

ExerciseScreen.prototype.mouseup = function()
{
	this.dragging = false;
}

ExerciseScreen.prototype.changeScreen = function(newScreen)
{
	this.nextScreen = newScreen;
	this.changeScreens = true;
	this.disable();
}



function LargeScore()
{
	this.x = 0;
	this.divider1 = new ScoreBar();
	this.divider2 = new ScoreBar();
	this.divider1.position = new Vector2(0, 120);
	this.divider2.position = new Vector2(0, 120);
}

LargeScore.prototype.main = function()
{
	this.divider1.position.x = 1200 - (70 + (this.x + 1060) % 1200)
	this.divider2.position.x = 1200 - (70 + (this.x + 460) % 1200);
}

LargeScore.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 120);
	ctx.drawImage(resource.exerciseScreen.img.largeScore, 0, 0);
	
	ctx.restore();
	
	this.divider1.draw(ctx);
	this.divider2.draw(ctx);
}


function SmallScore()
{
	this.x = 0;
	this.dividers = new Array();
	
	for (var i = 0; i < 6; i++)
	{
		this.dividers[i] = new ScoreBar();
		this.dividers[i].scale = new Vector2(0.2, 0.35);
	}
}

SmallScore.prototype.main = function()
{
	for (var i = 0; i < this.dividers.length; i++)
		this.dividers[i].position.x = 75 + 750 - (70 + (this.x * (125 / 600)  + 172 + i * 125) % 750);
}

SmallScore.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.beginPath();
	ctx.rect(80,0, 640,110);
	ctx.clip();
	
	ctx.setTransform(1, 0, 0, 1, 80, 0);
	ctx.drawImage(resource.exerciseScreen.img.smallScore, 0, 0);
	
	
	
	for (var i = 0; i < this.dividers.length; i++)
		this.dividers[i].draw(ctx);
	
	
	
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = 3;
	ctx.strokeRect(0, 0, 640, 107);
	
	ctx.strokeStyle = '#0000FF';
	ctx.lineWidth = 2;
	ctx.strokeRect(235, 3, 170, 100);
	
	ctx.restore();
}




function ScoreBar()
{
	this.position = new Vector2(0, 0);
	this.scale = new Vector2(1);
}

ScoreBar.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
	ctx.drawImage(resource.exerciseScreen.img.scoreBar, 0, 0);
	
	ctx.restore();
}



function CheckAnswerButton(position, scale)
{
	this.position = position;
	this.scale = scale;
}

CheckAnswerButton.prototype.main = function()
{

}


CheckAnswerButton.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
	ctx.drawImage(resource.exerciseScreen.img.checkAnswer, 0, 0);
	
	ctx.restore();
}

function OpenMenuButton(position, scale)
{
	this.position = position;
	this.scale = scale;
}

OpenMenuButton.prototype.main = function()
{

}

OpenMenuButton.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.setTransform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
	ctx.drawImage(resource.exerciseScreen.img.openMenu, 0, 0);
	
	ctx.restore();
}