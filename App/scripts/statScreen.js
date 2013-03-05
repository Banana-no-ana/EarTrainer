/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 $(document).ready(function() { 
  $(function() {
   $('#tabs-left').tabs();
  });
  
   //$('#backButton').click(function() {
   //          window.location = 'index.html';
   //})
   
   $('#backButton').hover(function() {
	   $(this).addClass('ui-state-hover');
	 }, function() {
	   $(this).removeClass('ui-state-hover');
	 });
 });