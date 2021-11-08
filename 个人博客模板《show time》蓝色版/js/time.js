$(document).ready(function () {


	
	//nav
	var oH2 = document.getElementById("mnavh"); 
	var oUl = document.getElementById("starlist");  
	oH2.onclick = function ()
	{
		var style = oUl.style;
		style.display = style.display == "block" ? "none" : "block";
		oH2.className = style.display == "block" ? "open" : ""
	}
		
    var obj=null;
    var As=document.getElementById('starlist').getElementsByTagName('a');
     obj = As[0];
     for(i=1;i<As.length;i++){if(window.location.href.indexOf(As[i].href)>=0)
     obj=As[i];}
     obj.id='selected';

  /*
  
  search
  
  */
    $('.search_ico').click(function () {
        $('.search_bar').toggleClass('search_open');
        if ($('#keyboard').val().length > 2) {
            $('#keyboard').val('');
            $('#searchform').submit();
        } else {
            return false;
        }
    });
	
	
    //header
	var new_scroll_position = 0;
	var last_scroll_position;
	var header = document.getElementById("header");

	window.addEventListener('scroll', function(e) {
	  last_scroll_position = window.scrollY;

	  if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
		header.classList.remove("slideDown");
		header.classList.add("slideUp");

	  } else if (new_scroll_position > last_scroll_position) {
		header.classList.remove("slideUp");
		header.classList.add("slideDown");
	  }

	  new_scroll_position = last_scroll_position;
	});
	
	
//scroll
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        window.scrollReveal = new scrollReveal({reset: true});
    };
	
		
	});