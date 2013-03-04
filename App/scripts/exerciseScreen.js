var dragging = false;
var dragStart = 0;
var dragScale = 1;

var scoreXStart = 0;
var scoreX = 0;

var scoreSegment = 0;

function document_mousemove(evt)
{
	var mouse = mouseToScreenSpace(evt);

	if (dragging)
	{
		scoreX = Math.max(scoreXStart + (dragStart.x - mouse.x) * dragScale, -20);
		scoreX = Math.min(scoreX, 3020);
		scoreSegment = Math.floor((scoreX + 300) / 600);
	}
}

function  document_mousedown(evt)
{
	var mouse = mouseToScreenSpace(evt);
	
	
	if (mouse.y < 320)
	{
		dragging = true;
		dragStart = mouse;
		scoreXStart = scoreX;
		
		if (mouse.y < 80)
			dragScale = 5;
		else
			dragScale = 1;
	}
}

function  document_mouseup(evt)
{
	dragging = false;
}

function frameRequest()
{
	if (!dragging)
	{
		var dif = scoreX - scoreSegment * 600
		if (Math.abs(dif) < 25)
			scoreX = scoreSegment * 600
		else
			scoreX += (dif > 0 ? -1 : 1) * 25;
	}
	
	$('.largeScoreContainer').css('left', -scoreX);
	
	$('#smallScoreBar1').css('left', 750 - (70 + (scoreX * (125 / 600)  + 172) % 750));
	$('#smallScoreBar2').css('left', 750 - (70 + (scoreX * (125 / 600)  + 297) % 750));
	$('#smallScoreBar3').css('left', 750 - (70 + (scoreX * (125 / 600)  + 422) % 750));
	$('#smallScoreBar4').css('left', 750 - (70 + (scoreX * (125 / 600)  + 547) % 750));
	$('#smallScoreBar5').css('left', 750 - (70 + (scoreX * (125 / 600)  + 672) % 750));
	$('#smallScoreBar6').css('left', 750 - (70 + (scoreX * (125 / 600)  + 797) % 750));
	
	
	window.requestAnimationFrame(frameRequest);
}



function mouseToScreenSpace(evt)
{
	rect = document.getElementById('screen').getBoundingClientRect();
	
	return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}

function ChordInput(div, enabled, initialValue)
{
	this.div = div;
	this.val = initialValue - 1;
	
	this.dragging = false;
	this.dragStart = 0;

	this.yStart = 0;
	this.y = (initialValue - 1) * 60;
	
	if (enabled)
	{
		this.div.addEventListener('mousemove', ChordInput.prototype.mousemove.bind(this));
		this.div.addEventListener('mousedown', ChordInput.prototype.mousedown.bind(this));
		this.div.addEventListener('mouseup', ChordInput.prototype.mouseup.bind(this));
	}
	else
	{
		$(this.div).removeClass("chordInput");
		$(this.div).addClass("chordInputFixed");
		$(this.div).next().removeClass("sampleChord");
		$(this.div).next().addClass("sampleChordFixed");
	}
	
	this.frameRequest = ChordInput.prototype.frameRequest.bind(this);
	window.requestAnimationFrame(this.frameRequest);
}

ChordInput.prototype.frameRequest = function()
{
	if (!this.dragging)
	{
		var dif = this.y - this.val * 60
		if (Math.abs(dif) < 5)
			this.y = this.val * 60
		else
			this.y += (dif > 0 ? -1 : 1) * 5;
	}

	$(this.div).find('.chordInputContainer .romanNumeral').css('top', -6 - 420 - this.y);
	$(this.div).next().css('top', 10 - this.y / 10);
	
	window.requestAnimationFrame(this.frameRequest);
}

ChordInput.prototype.mousemove = function(evt)
{
	var mouse = mouseToScreenSpace(evt);

	if (this.dragging)
	{
		this.y = this.yStart + (this.dragStart.y - mouse.y);
		this.y += (this.y < 0 ? 420 : 0);
		this.y = ((this.y + 30) % 420) - 30;
		
		this.val = Math.floor((this.y + 30) / 60);
	}
}

ChordInput.prototype.mousedown = function(evt)
{
	var mouse = mouseToScreenSpace(evt);
	
	this.dragging = true;
	this.dragStart = mouse;
	this.yStart = this.y;
}

ChordInput.prototype.mouseup = function(evt)
{
	this.dragging = false;
}




var raf = window.requestAnimationFrame
	   || window.webkitRequestAnimationFrame
	   || window.mozRequestAnimationFrame
	   || window.oRequestAnimationFrame
	   || window.msRequestAnimationFrame
	   || myRequestAnimationFrame;
	   
window.requestAnimationFrame = raf;

$(document).ready(function(){
	$(document).mousemove(document_mousemove);
	$(document).mousedown(document_mousedown);
	$(document).mouseup(document_mouseup);
   
	window.requestAnimationFrame(frameRequest);
	
	for (var i = 1; i <= 24; i++)
		new ChordInput(document.getElementById('chordInput' + i), (i % 2) == 0, i % 7);
        
	$('.result').hover(function() {
		alert('Once the user changes the Roman Numerals, the dial changes to indicate whether user is correct or not, and auto continues to the next section if they are');
	  
	 }, function() {
	   $(this).attr('title', '');
	 });
});