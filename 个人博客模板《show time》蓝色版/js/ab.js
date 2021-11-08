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
	
	//
 
 (function(){
    var len = 100; // 默认显示的字数
    var content = document.getElementById("content"); // content 获取内容 div 对象
    var text = content.innerHTML;  // text 为内容
    var span = document.createElement("span"); // 创建一个 SPAN 标签
    var n = document.createElement("a");  // 创建一个 A 标签
    span.innerHTML = text.substring(0,len); // SPAN 标签的内容为 text 的前 len 个字符
    n.innerHTML = text.length > len ? "...展开" : ""; // 创建的 A 标签内容，如果内容字数大于 len，那么为“..展开”，否则为空
    n.href = "javascript:void(0)"; // 设置 A 标签的链接地址（随意）
    n.onclick = function(){ // 点击 A 链接执行下面函数
    // 如果 A 标签的内容为“..展开”，那么 A 标签内容变成“收起”，SPAN 标签的内容为 DIV 全部内容，否则内容为前 len 个字符
    if (n.innerHTML == "...展开"){
      n.innerHTML = "收起";
      span.innerHTML = text;
    }else{
      n.innerHTML = "...展开";
      span.innerHTML = text.substring(0,len);
    }
   }
    content.innerHTML = "";   // 设置 DIV 内容为空
    content.appendChild(span); // 把 SPAN 元素加到 DIV 中
    content.appendChild(n);   // 把 A 元素加到 DIV 中
  })();
	
	$('.navlist li').click(function(){
                $(this).addClass('navcurrent').siblings().removeClass('navcurrent');
                $('.navtab>div:eq('+$(this).index()+')').show().siblings().hide();
            });

		
	});