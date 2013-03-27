/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() { 
  $(function() {
   $('#tabs-top').tabs();
  });
  
   //$('#backButton').click(function() {
   //          window.location = 'index.html';
   //})
   
   $('.playChord').click(function() {
		chords[2].cloneNode(true).play();
   });
   
   $('#backButton').hover(function() {
	   $(this).addClass('ui-state-hover');
	 }, function() {
	   $(this).removeClass('ui-state-hover');
	 });
 });