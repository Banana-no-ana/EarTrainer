function loadAudio(uri)
{
    var audio = new Audio();
    audio.oncanplaythrough = audioLoaded;
    audio.src = uri;
    return audio;
}