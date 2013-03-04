/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

$('#tabs-content').addClass('js');

    $(".topTabs li").each(function() {		
            $(this).click(function() {
                    var tabId = $(this).attr('id');
                    var tabId = tabId.split('-');
                    var tabContent = document.getElementById('tab-content-' + tabId[1]);
                    tabContent.style.display = 'block';
                    $(this).addClass('selected');
                    $(this).siblings().removeClass('selected');			
                    $(tabContent).siblings().css('display','none');	
            });
    });
    
    $('#backButton').click(function() {    
             
             window.location = 'index.html';
         });
 
});