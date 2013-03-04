/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() {
   $('#quickPlay').hover(function() {
  $(this).attr('src', 'img/mainMenu/QuickplayHighlight.png');
}, function() {
  $(this).attr('src', 'img/mainMenu/Quickplay.png');
});
$('#quickPlay').click(function() {
    $(this).attr('src', 'img/mainMenu/quickPlayPressed.png')
    window.location = quickplay.html;
});

$('#advancedPlay').hover(function() {
  $(this).attr('src', 'img/mainMenu/AdvancedplayHighlight.png');
}, function() {
  $(this).attr('src', 'img/mainMenu/Advancedplay.png');
});
$('#advancedPlay').click(function() {
    $(this).attr('src', 'img/mainMenu/StatisticsPressed.png')
    window.location = advancedPlay.html;
});

$('#statistics').hover(function() {
  $(this).attr('src', 'img/mainMenu/StatisticsHighlight.png');
}, function() {
  $(this).attr('src', 'img/mainMenu/Statistics.png');
});
$('#statistics').click(function() {
    $(this).attr('src', 'img/mainMenu/StatisticsPressed.png')
    window.location = statistics.html;
});

$('#chordDatabase').hover(function() {
  $(this).attr('src', 'img/mainMenu/ChorddatabaseHighlight.png');
}, function() {
  $(this).attr('src', 'img/mainMenu/Chorddatabase.png');
});
$('#chordDatabase').click(function() {
    $(this).attr('src', 'img/mainMenu/chordDatabasePressed.png')
    window.location = chordDatabase.html;
});

$('#settings').hover(function() {
  $(this).attr('src', 'img/mainMenu/SettingsHighlight.png');
}, function() {
  $(this).attr('src', 'img/mainMenu/Settings.png');
});
$('#settings').click(function() {
    $(this).attr('src', 'img/mainMenu/settingsPressed.png')
    window.location = settings.html;
});
 });
