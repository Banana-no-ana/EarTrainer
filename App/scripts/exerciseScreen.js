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
	
	div.addEventListener('mousemove', chordInput_mousemove.bind(div));
	div.addEventListener('mousedown', chordInput_mousedown.bind(div));
	div.addEventListener('mouseup', chordInput_mouseup.bind(div));
	
	div.frameRequest = chordInput_frameRequest.bind(div);
	window.requestAnimationFrame(div.frameRequest);
}

function chordInput_frameRequest()
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

function chordInput_mousemove(evt)
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

function chordInput_mousedown(evt)
{
	if (!this.enabled)
		return;

	var mouse = mouseToScreenSpace(evt);
	
	this.dragging = true;
	this.dragStart = mouse;
	this.yStart = this.y;
	
	this.setCapture();
	
	
	var elem = document.getElementById('result');
	elem.evaluate = false;
}

function chordInput_mouseup(evt)
{
	if (!this.enabled)
		return;
		
	this.dragging = false;
	this.releaseCapture();
	
	evaluateAnswer(this);
}

function evaluateAnswer(ip)
{
	var elem = document.getElementById('result');

	
	elem.waitTime = 70;
	elem.correct = true;
	elem.evaluate = true;
}

function result_frameRequest()
{
	if (this.waitTime > 0)
	{
		$(this).addClass('resultTime');
		this.waitTime -= 1;
		this.time += 1;
		
		if (this.time > 4)
		{
			this.time = 0;
			this.imageShift = (this.imageShift + 110) % 880;
			$(this).css('top', -this.imageShift);
		}
	}
	else
	{
		if (this.evaluate)
		{
			if (this.correct)
			{
				$(this).addClass('resultCorrect');
				$(this).removeClass('resultIncorrect');
			}
			else
			{
				$(this).addClass('resultIncorrect');
				$(this).removeClass('resultCorrect');
			}
		}
		else
		{
			$(this).removeClass('resultCorrect');
			$(this).removeClass('resultIncorrect');
		}
			
		$(this).removeClass('resultTime');
	}
	
	if (this.waitTime <= 0 && this.correct == 1)
	{
		
	}
	
	
	window.requestAnimationFrame(this.frameRequest);
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
		
	var result = document.getElementById('result');
	
	result.time = 0;
	result.imageShift = 0;
	
	result.frameRequest = result_frameRequest.bind(result);
	window.requestAnimationFrame(result.frameRequest);
        
	$('.result').hover(function() {
		alert('Once the user changes the Roman Numerals, the dial changes to indicate whether user is correct or not, and auto continues to the next section if they are');
	  
	 }, function() {
	   $(this).attr('title', '');
	 });
});