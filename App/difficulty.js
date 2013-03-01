function DifficultyScreen()
{
	this.exerciseOptions = new Array();

	this.exerciseOptions[0] = new ExerciseOption('I', new Vector2(20, 70));
	this.exerciseOptions[1] = new ExerciseOption('V', new Vector2(160, 70));
	this.exerciseOptions[2] = new ExerciseOption('Common', new Vector2(20, 130));
	this.exerciseOptions[3] = new ExerciseOption('Stuff', new Vector2(160, 130));
	this.exerciseOptions[4] = new ExerciseOption('IV', new Vector2(20, 190));
	this.exerciseOptions[5] = new ExerciseOption('Augmented G', new Vector2(160, 190));
	this.exerciseOptions[6] = new ExerciseOption('ii', new Vector2(20, 250));
	this.exerciseOptions[7] = new ExerciseOption('Applied Chords', new Vector2(160, 250));
	this.exerciseOptions[8] = new ExerciseOption('Mode\nMixutre', new Vector2(20, 310));
	this.exerciseOptions[9] = new ExerciseOption('Things', new Vector2(160, 310));
	this.exerciseOptions[10] = new ExerciseOption('Augmented', new Vector2(20, 370));
	this.exerciseOptions[11] = new ExerciseOption('Chromatic', new Vector2(160, 370));
	
	this.exerciseOptions[12] = new ExerciseOption('Show Notes', new Vector2(80, 430));
	
	this.buttons = new Array();
	this.buttons[0] = new StartButton(new Vector2(650, 130));
	this.buttons[1] = new ReturnButton(new Vector2(650, 370));
	
	this.fade = false;
	this.time = 0;
	
	this.mouseclick = DifficultyScreen.prototype.mouseclick.bind(this);
}

DifficultyScreen.prototype.enable = function()
{
	canvas.addEventListener('click', this.mouseclick);
}

DifficultyScreen.prototype.disable = function()
{
	canvas.removeEventListener('click', this.mouseclick);
}

DifficultyScreen.prototype.main = function()
{
	for (var i = 0; i < this.exerciseOptions.length; i++)
		this.exerciseOptions[i].main();
		
	for (var i = 0; i < this.buttons.length; i++)
		this.buttons[i].main();
		
	if (this.fade)
		this.time = Math.max(this.time - 0.1, 0);
	else
		this.time = Math.min(this.time + 0.1, 1);
	
	
}

DifficultyScreen.prototype.draw = function(ctx)
{
	ctx.globalAlpha = this.time;

	ctx.save();
	ctx.font='20px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('Select Chord Exercises',120,50);
	ctx.restore();
	
	for (var i = 0; i < this.exerciseOptions.length; i++)
		this.exerciseOptions[i].draw(ctx);
		
	for (var i = 0; i < this.buttons.length; i++)
		this.buttons[i].draw(ctx);
}

DifficultyScreen.prototype.mouseclick = function()
{
	for (var i = 0; i < this.exerciseOptions.length; i++)
		if (this.exerciseOptions[i].hitTest(mousePos))
		{
			this.exerciseOptions[i].checked ^= true;
		
		}
}



function ExerciseOption(text, position)
{
	this.text = text;
	this.position = position;
	this.t = 0;
	
	this.checked = false;
}

ExerciseOption.prototype.hitTest = function(point)
{
	var localPoint = Vector2.subtract(point, this.position);
	
	return localPoint.x > 0 && localPoint.x < 25
		&& localPoint.y > 0 && localPoint.y < 25;
}

ExerciseOption.prototype.main = function()
{
	
}

ExerciseOption.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
	ctx.font='20px Times New Roman';
	ctx.textAlign = 'left';
	
	if (this.checked)
		ctx.drawImage(checkboxCheckedImg, 0, 0);
	else
		ctx.drawImage(checkboxImg, 0, 0);
	
	var text = this.text.split('\n')
	for (var i = 0; i < text.length; i++)
		ctx.fillText(text[i], 35, 20 + 20 * i);
		
	ctx.restore();
}



function StartButton(position)
{
	this.position = position;
}

StartButton.prototype.hitTest = function(point)
{
	var localPoint = Vector2.subtract(point, this.position);
	
	return localPoint.x > 0 && localPoint.x < 25
		&& localPoint.y > 0 && localPoint.y < 25;
}

StartButton.prototype.main = function()
{
	
}

StartButton.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.setTransform(1.5, 0, 0, 1.5, this.position.x - 80, this.position.y - 80);
	ctx.drawImage(startButtonImg, 0, 0);
	
	ctx.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
	ctx.font='34px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('Start', 10, 0);
		
	ctx.restore();
}



function ReturnButton(position)
{
	this.position = position;
}

ReturnButton.prototype.hitTest = function(point)
{
	var localPoint = Vector2.subtract(point, this.position);
	
	return localPoint.x > 0 && localPoint.x < 25
		&& localPoint.y > 0 && localPoint.y < 25;
}

ReturnButton.prototype.main = function()
{
	
}

ReturnButton.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.setTransform(1.5, 0, 0, 1.5, this.position.x - 80, this.position.y - 80);
	ctx.drawImage(returnButtonImg, 0, 0);
	
	ctx.setTransform(1, 0, 0, 1, this.position.x, this.position.y);
	ctx.font='34px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('Return', 20, 0);
		
	ctx.restore();
}