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
	
	
	if (mouse.y < 480)
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

function ChordInputInit(div, enabled, initialValue)
{
	div.enabled = enabled;
	div.val = initialValue;
	
	div.dragging = false;
	div.dragStart = 0;

	div.yStart = 0;
	div.y = initialValue * 60;
	
	div.notesBig = document.getElementById(div.id + "NB");
	div.notesSmall = document.getElementById(div.id + "NS");
	
	if (!div.enabled)
	{
		$(div).addClass("chordInputFixed");
		$(div.notesBig).addClass("sampleChordFixed");
	}
	
	div.addEventListener('mousemove', ChordInputInit.prototype.mousemove.bind(div));
	div.addEventListener('mousedown', ChordInputInit.prototype.mousedown.bind(div));
	div.addEventListener('mouseup', ChordInputInit.prototype.mouseup.bind(div));
	
	div.frameRequest = ChordInputInit.prototype.frameRequest.bind(div);
	window.requestAnimationFrame(div.frameRequest);
}

ChordInputInit.prototype.frameRequest = function()
{
	if(this.dragging)
		dragging = false;

	if (!this.dragging)
	{
		var dif = this.y - this.val * 60
		if (Math.abs(dif) < 5)
			this.y = this.val * 60
		else
			this.y += (dif > 0 ? -1 : 1) * 5;
	}

	$(this).find('.chordInputContainer .romanNumeral').css('top', -6 - 420 - this.y);
	$(this.notesBig).css('top', 32 - this.y / 10);
	
	window.requestAnimationFrame(this.frameRequest);
}

ChordInputInit.prototype.mousemove = function(evt)
{
	if (!this.enabled)
		return;

	var mouse = mouseToScreenSpace(evt);
	
	if (this.dragging)
	{
		this.y = this.yStart + (this.dragStart.y - mouse.y);
		this.y += (this.y < 0 ? 420 : 0);
		this.y = ((this.y + 30) % 420) - 30;
		
		this.val = Math.floor((this.y + 30) / 60);
	}
}

ChordInputInit.prototype.mousedown = function(evt)
{
	if (!this.enabled)
		return;

	var mouse = mouseToScreenSpace(evt);
	
	this.dragging = true;
	this.dragStart = mouse;
	this.yStart = this.y;
	
	this.setCapture();
}

ChordInputInit.prototype.mouseup = function(evt)
{
	if (!this.enabled)
		return;
		
	this.dragging = false;
	this.releaseCapture();
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
	
	window.ondragstart = function() { return false; } 
	
	for (var i = 1; i <= 24; i++)
		ChordInputInit(document.getElementById('chordInput' + i), (i % 2) == 0, (i - 1) % 7);
        
	$('.result').hover(function() {
		alert('Once the user changes the Roman Numerals, the dial changes to indicate whether user is correct or not, and auto continues to the next section if they are');
	  
	 }, function() {
	   $(this).attr('title', '');
	 });
});