var dragging = false;
var dragStart = 0;
var dragScale = 1;

var scoreXStart = 0;
var scoreX = 0;

var scoreSegment = 0;
var helpState = 1; //1 for down, 2 for up;

var showHelp1 = true;

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
	
	showHelp1 = false;
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
	$('.smallScoreContainer').css('left', -scoreX * 125 / 600);
	
	//$('#smallScoreBar1').css('left', 750 - (70 + (scoreX * (125 / 600)  + 172) % 750));
	//$('#smallScoreBar2').css('left', 750 - (70 + (scoreX * (125 / 600)  + 297) % 750));
	//$('#smallScoreBar3').css('left', 750 - (70 + (scoreX * (125 / 600)  + 422) % 750));
	//$('#smallScoreBar4').css('left', 750 - (70 + (scoreX * (125 / 600)  + 547) % 750));
	//$('#smallScoreBar5').css('left', 750 - (70 + (scoreX * (125 / 600)  + 672) % 750));
	//$('#smallScoreBar6').css('left', 750 - (70 + (scoreX * (125 / 600)  + 797) % 750));
	
	
	window.requestAnimationFrame(frameRequest);
}



function mouseToScreenSpace(evt)
{
	rect = document.getElementById('screen').getBoundingClientRect();
	
	return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}

function ChordInputInit(div, enabled, initialValue, correctValue)
{
	div.enabled = enabled;
	div.val = initialValue;
	div.correctVal = correctValue;
	
	div.dragging = false;
	div.dragStart = 0;

	div.yStart = 0;
	div.y = initialValue * 60;
	
	div.notesBig = document.getElementById(div.id + "NL");
	div.notesSmall = document.getElementById(div.id + "NS");
	
	if (!div.enabled)
	{
		$(div).addClass("chordInputFixed");
		$(div.notesBig).addClass("sampleChordLFixed");
		$(div.notesSmall).addClass("sampleChordSFixed");
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
	$(this.notesSmall).css('top', 16 - this.y / 23);
	
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
	this.dragging = false;
	this.releaseCapture();
	
	evaluateAnswer(this);
}

function evaluateAnswer(ip)
{
	var elem = document.getElementById('result');

	chords[ip.val].currentTime = 0;
	chords[ip.val].play();
	
	elem.waitTime = 90;
	elem.correct = ip.val == ip.correctVal;
	elem.evaluate = ip.enabled;
	elem.element = ip;
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
				
				$(this.element).removeClass('chordInputIncorrect');
				$(this.element).addClass('chordInputCorrect');
				
				$(this.element.notesBig).removeClass('sampleChordLIncorrect');
				$(this.element.notesBig).addClass('sampleChordLCorrect');
				
				$(this.element.notesSmall).removeClass('sampleChordSIncorrect');
				$(this.element.notesSmall).addClass('sampleChordSCorrect');
			}
			else
			{
				$(this).addClass('resultIncorrect');
				$(this).removeClass('resultCorrect');
				
				$(this.element).removeClass('chordInputCorrect');
				$(this.element).addClass('chordInputIncorrect');
				
				$(this.element.notesBig).removeClass('sampleChordLCorrect');
				$(this.element.notesBig).addClass('sampleChordLIncorrect');
				
				$(this.element.notesSmall).removeClass('sampleChordSCorrect');
				$(this.element.notesSmall).addClass('sampleChordSIncorrect');
			}
		}
		else
		{
			$(this).removeClass('resultCorrect');
			$(this).removeClass('resultIncorrect');
		}
			
		$(this).removeClass('resultTime');
	}

	window.requestAnimationFrame(this.frameRequest);
}

function hintClicked() {
    if(helpState === 1){
        $('#hintButton').animate( {
        bottom: '130px'        
        }, 1000);
        helpState = 2;
        
        $('#helpText').fadeIn(1500);
    } else {
        $('#hintButton').animate( {
        bottom: '0px'        
        }, 1000);
        helpState = 1;
        $('#helpText').fadeOut(1500);
    }
    
    
    
}

function help_frameRequest()
{
	if (showHelp1)
	{
		if (!$('#helpArrow1').is(':animated'))
			$('#helpArrow1').effect("bounce", { times:1, distance: 3 }, 800);
			
		if (!$('#helpBox1').is(':animated'))
			$('#helpBox1').effect("bounce", { times:1, distance: 3 }, 800);
	}
	else
	{
		$('#helpBox1').css('opacity', $('#helpBox1').css('opacity') - 0.05);
		$('#helpArrow1').css('opacity', $('#helpArrow1').css('opacity') - 0.05);
		
		if ($('#helpArrow1').css('opacity') <= 0)
			$('#helpArrow1').css('display', 'none');
		
		if ($('#helpBox1').css('opacity') <= 0)
			$('#helpBox1').css('display', 'none');
	}
	
	window.requestAnimationFrame(help_frameRequest);
}


var raf = window.requestAnimationFrame
	   || window.webkitRequestAnimationFrame
	   || window.mozRequestAnimationFrame
	   || window.oRequestAnimationFrame
	   || window.msRequestAnimationFrame
	   || myRequestAnimationFrame;
	   
window.requestAnimationFrame = raf;

$(document).ready(function(){
	// Init window events.
	$(document).mousemove(document_mousemove);
	$(document).mousedown(document_mousedown);
	$(document).mouseup(document_mouseup);
   
	window.requestAnimationFrame(frameRequest);
	
	// Disable image dragging.
	window.ondragstart = function() { return false; } 
	
	// Init chord input boxes.
	ChordInputInit(document.getElementById('chordInput1'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput2'), true, 0, 1);
	ChordInputInit(document.getElementById('chordInput3'), false, 2, 2);
	ChordInputInit(document.getElementById('chordInput4'), true, 0, 6);
	ChordInputInit(document.getElementById('chordInput5'), true, 0, 0);
	ChordInputInit(document.getElementById('chordInput6'), false, 1, 1);
	ChordInputInit(document.getElementById('chordInput7'), true, 0, 3);
	ChordInputInit(document.getElementById('chordInput8'), false, 2, 2);
	ChordInputInit(document.getElementById('chordInput9'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput10'), true, 0, 1);
	ChordInputInit(document.getElementById('chordInput11'), true, 0, 2);
	ChordInputInit(document.getElementById('chordInput12'), false, 6, 6);
	ChordInputInit(document.getElementById('chordInput13'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput14'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput15'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput16'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput17'), true, 0, 1);
	ChordInputInit(document.getElementById('chordInput18'), true, 0, 3);
	ChordInputInit(document.getElementById('chordInput19'), false, 2, 2);
	ChordInputInit(document.getElementById('chordInput20'), true, 0, 0);
	ChordInputInit(document.getElementById('chordInput21'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput22'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput23'), false, 0, 0);
	ChordInputInit(document.getElementById('chordInput24'), false, 0, 0);
	
	// Init result box.
	var result = document.getElementById('result');	
	result.time = 0;
	result.imageShift = 0;
	result.frameRequest = result_frameRequest.bind(result);
	window.requestAnimationFrame(result.frameRequest);
	
	window.requestAnimationFrame(help_frameRequest);
	help_frameRequest();
	
         
	 $('#hintButton').click(hintClicked);
	 
	 $('#playScore').click(function()
	 {
		bars[scoreSegment].play();
	 });
});