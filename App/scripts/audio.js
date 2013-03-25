var chords = new Array();
var bars = new Array();

var loadCount = 0;
var extension = '.ogg';

function loadAudio(uri)
{
    var audio = new Audio();
	
	loadCount++;
    audio.oncanplaythrough = audioLoaded;
	
    audio.src = uri;
    return audio;
}

function audioLoaded()
{
	loadCount--;
}

if (!new Audio().canPlayType('audio/ogg'))
{
	if (new Audio().canPlayType('audio/mp3'))
		extension = '.mp3'
	else
		extension = "";
}


chords[0] = loadAudio('audio/I' + extension);
chords[1] = loadAudio('audio/ii' + extension);
chords[2] = loadAudio('audio/iii' + extension);
chords[3] = loadAudio('audio/IV' + extension);
chords[4] = loadAudio('audio/V' + extension);
chords[5] = loadAudio('audio/VI' + extension);
chords[6] = loadAudio('audio/vii' + extension);

bars[0] = loadAudio('audio/bar1' + extension);
bars[1] = loadAudio('audio/bar2' + extension);
bars[2] = loadAudio('audio/bar3' + extension);
bars[3] = loadAudio('audio/bar4' + extension);
bars[4] = loadAudio('audio/bar5' + extension);