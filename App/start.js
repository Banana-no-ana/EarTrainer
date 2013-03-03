

function StartScreen()
{
	this.menuItems = new Array();

	this.menuItems[0] = new MenuItem("Quick Play", new Vector2(10, 50));
	this.menuItems[1] = new MenuItem("Advanced Play", new Vector2(25, 120));
	this.menuItems[2] = new MenuItem("Statistics", new Vector2(40, 190));
	this.menuItems[3] = new MenuItem("Chord Database", new Vector2(55, 260));
	this.menuItems[4] = new MenuItem("Options", new Vector2(70, 330));
	this.menuItems[5] = new MenuItem("Log Out", new Vector2(85, 400));
	
	this.opacity = 0;
	
	this.mouseclick = StartScreen.prototype.mouseclick.bind(this);
}

StartScreen.prototype.enable = function()
{
	canvas.addEventListener('click', this.mouseclick);
}

StartScreen.prototype.disable = function()
{
	canvas.removeEventListener('click', this.mouseclick);
}

StartScreen.prototype.main = function()
{
	for (var i = 0; i < 6; i++)
		this.menuItems[i].main();
}

StartScreen.prototype.draw = function(ctx)
{
	ctx.save();
	
	ctx.globalAlpha = this.opacity;
	ctx.font='40px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('Ear Training App',600,200);
	ctx.fillText('(Prototype)',600,300);
	
	for (var i = 0; i < 6; i++)
		this.menuItems[i].draw(ctx);
		
	ctx.restore();
}

StartScreen.prototype.mouseclick = function()
{
	for (var i = 0; i < 6; i++)
	{
		if (this.menuItems[i].hitTest(mousePos))
		{
			if (i == 0)
				changeScreen(exerciseScreen);
			else if (i == 1)
				changeScreen(difficultyScreen);
		}
		
	}
}



function MenuItem(text, position)
{
	this.text = text;
	this.position = position;
	this.t = 0;

}

MenuItem.prototype.hitTest = function(point)
{
	var localPoint = Vector2.subtract(point, this.position);
	
	return localPoint.x > 0 && localPoint.x < 300
		&& localPoint.y > 0 && localPoint.y < 70;
}

MenuItem.prototype.main = function()
{
	if (this.hitTest(mousePos))
		this.t = Math.min(this.t + 1, 3);
	else
		this.t = Math.max(this.t - 1, 0);
		
	this.scale = 1 + this.t / 3 * 0.2
}

MenuItem.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.setTransform(this.scale, 0, 0, this.scale, this.position.x, this.position.y);
	ctx.globalCompositeOperation = 'lighter';
	ctx.font='30px Arial';
	ctx.textAlign = 'center';
	ctx.drawImage(resource.startScreen.img.menuItem, 0, 0);
	ctx.fillText(this.text, 150, 50);
	ctx.restore();
}