$(document).ready(function () {

	//banner
    $('#banner').easyFader();
	
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
	
	//scroll to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
        );
    });
	
	//aside
    var Sticky = new hcSticky('aside', {
      stickTo: 'article',
      innerTop: 200,
      followScroll: false,
      queries: {
        480: {
          disable: true,
          stickTo: 'body'
        }
      }
    });

//scroll
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        window.scrollReveal = new scrollReveal({reset: true});
    };
	
//tab	
    var oLi = document.getElementById("tab").getElementsByTagName("a");
	var oUls = document.getElementById("content").getElementsByTagName("ul");
	
	for(var i = 0; i < oLi.length; i++)
	{
		oLi[i].index = i;
		oLi[i].onmouseover = function ()
		{
			for(var n = 0; n < oLi.length; n++) oLi[n].className="";
			this.className = "current";
			for(var n = 0; n < oUls.length; n++) oUls[n].style.display = "none";
			oUls[this.index].style.display = "block"
		}	
	};
		
	});