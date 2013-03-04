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
             window.setTimeout(function() {
             $(this).attr('src', 'img/mainMenu/quickPlayPressed.png');
             }, 100);
             window.location = 'exercise.html';
         });

         $('#advancedPlay').hover(function() {
           $(this).attr('src', 'img/mainMenu/AdvancedplayHighlight.png');
         }, function() {
           $(this).attr('src', 'img/mainMenu/Advancedplay.png');
         });
         $('#advancedPlay').click(function() {    
             window.setTimeout(function() {
             $(this).attr('src', 'img/mainMenu/StatisticsPressed.png');    
                 }, 100);
             window.location = 'difficulty.html';
         });

         $('#statistics').hover(function() {
           $(this).attr('src', 'img/mainMenu/StatisticsHighlight.png');
         }, function() {
           $(this).attr('src', 'img/mainMenu/Statistics.png');
         });
         $('#statistics').click(function() {
         window.setTimeout(function() {
             $(this).attr('src', 'img/mainMenu/StatisticsPressed.png');
             }, 100);
             window.location = 'statistics.html';
         });

         $('#chordDatabase').hover(function() {
           $(this).attr('src', 'img/mainMenu/ChorddatabaseHighlight.png');
         }, function() {
           $(this).attr('src', 'img/mainMenu/Chorddatabase.png');
         });
         $('#chordDatabase').click(function() {
         window.setTimeout(function() {
             $(this).attr('src', 'img/mainMenu/chordDatabasePressed.png');
             }, 100);
             window.location = 'chordDatabase.html';
         });

         $('#settings').hover(function() {
           $(this).attr('src', 'img/mainMenu/SettingsHighlight.png');
         }, function() {
           $(this).attr('src', 'img/mainMenu/Settings.png');
         });
         $('#settings').click(function() {
         window.setTimeout(function() {
             $(this).attr('src', 'img/mainMenu/settingsPressed.png');
             }, 100);
             window.location = 'settings.html';
         });

         $('#tuningFork').hover(function() {
           $(this).attr('src', 'img/mainMenu/NewTuningForkHighlight.png');
         }, function() {
           $(this).attr('src', 'img/mainMenu/NewTuningFork.png');
         });
         $('#tuningFork').click(function() {
         window.setTimeout(function() {
             $(this).attr('src', 'img/mainMenu/NewTuningForkPressed.png');
             }, 100);
             window.location = 'tuning_fork.html';
         });
 });

