function ExerciseScreen()
{	
	this.largeScore = new LargeScore();

	this.buttons = new Array();
	
	this.fade = false;
	this.time = 0;
	
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
		
	if (this.fade)
		this.time = Math.max(this.time - 0.1, 0);
	else
		this.time = Math.min(this.time + 0.1, 1);
}

ExerciseScreen.prototype.draw = function(ctx)
{
	ctx.globalAlpha = this.time;

	ctx.save();
	ctx.font='20px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('Exercise Screen',120,50);
	
	ctx.font = '12px Arial'
	ctx.textAlign = 'left'
	ctx.fillText(this.x + ',' + this.largeScore.divider1.x, 0, 424);
	
	ctx.restore();
	
	for (var i = 0; i < this.buttons.length; i++)
		this.buttons[i].draw(ctx);
	
	this.largeScore.draw(ctx);
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




function LargeScore()
{
	this.x = 0;
	this.divider1 = new LargeScoreDivider();
	this.divider2 = new LargeScoreDivider();
}

LargeScore.prototype.main = function()
{
	this.divider1.x = 1200 - (70 + (this.x + 1060) % 1200)
	this.divider2.x = 1200 - (70 + (this.x + 460) % 1200);
}

LargeScore.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 120);
	ctx.drawImage(largeScoreImg, 0, 0);
	
	ctx.restore();
	
	this.divider1.draw(ctx);
	this.divider2.draw(ctx);
}

function LargeScoreDivider()
{
	this.x = 0;
}

LargeScoreDivider.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.setTransform(1, 0, 0, 1, this.x, 120);
	ctx.drawImage(largeScoreDividerImg, 0, 0);
	
	ctx.restore();
}
