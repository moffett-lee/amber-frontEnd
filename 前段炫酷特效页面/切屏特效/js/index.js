// index.js


$(function(){


//myCanvas---------------------------------------------------------------------------
	var clock_x = $(".main_banner_wrap").width()-150;
	var clock_y = $(".main_banner_wrap").height()-150;

	$("#myCanvas").css({"left":clock_x,"top":clock_y});

	var moveTimer = null;
	var disX = 0, disY = 0;
	var prevX = 0, prevY = 0;//上一记录点
	var iSpeedX = 0, iSpeedY = 0;//松手速度 = 松手点 - 上一记录点

	$("#myCanvas").mousedown(function(ev){	
		$(this).css("opacity",0.9);
		var seft = $(this);
		disX = ev.pageX-$(this).offset().left+$(this).parent().offset().left;
		disY = ev.pageY-$(this).offset().top+$(this).parent().offset().top;

		prevX = ev.pageX;
		prevY = ev.pageY;

		//console.log(prevX+"||"+prevY)

		$(document).mousemove(function(ev){
			var x = ev.pageX - disX;
			var y = ev.pageY - disY;
			if(x<=0){
				x = 0;
			}else if(x > clock_x){
				x = clock_x;
			}
			if(y<=0){
				y = 0;
			}else if(y > clock_y){
				y = clock_y;
			}
			seft.css({"left":x,"top":y});

			iSpeedX = ev.pageX - prevX;//松手速度 = 松手点 - 上一记录点
			iSpeedY = ev.pageY - prevY;

			prevX = ev.pageX;//随着拖动 不断更新 上一记录点
			prevY = ev.pageY;

			console.log(iSpeedX+"||"+iSpeedY)

		});
		$(document).mouseup(function(){
			seft.css("opacity",0.8);		
			$(document).off();			
			move();
		});
		return false;
	});

	function move(){
		clearInterval(moveTimer);
		moveTimer = setInterval(function(){
			iSpeedY += 1;
			var iL = $("#myCanvas").position().left+iSpeedX;
			var iT = $("#myCanvas").position().top+iSpeedY;
			if(iL>clock_x){
				iL = clock_x;
				iSpeedX *= -1;
				iSpeedX *= 0.95;
			}else if(iL < 0){
				iL = 0;
				iSpeedX *= -1;
				iSpeedX *= 0.95;
			}
			if(iT>clock_y){
				iT = clock_y;
				iSpeedY *= -1;
				iSpeedY *= 0.95;
				iSpeedX *= 0.95;
			}else if(iT < 0){
				iT = 0;
				iSpeedY *= -1;
				iSpeedY *= 0.95;
			}
			if(Math.abs(iSpeedX)<1&&Math.abs(iSpeedY)<1&&Math.abs(iT-clock_y)<1){
				clearInterval(moveTimer);
			}
			$("#myCanvas").css({"left": iL,"top": iT});			
		},30);
	};



	var iNow = 0;
	var arr = ["#ffae00","black"];

	myClock();
    setInterval(myClock,1000);//每一秒钟重绘一次	

    function myClock(){	

		var myCanvas = document.getElementById("myCanvas");
		var oC = myCanvas.getContext("2d");
	
		//得到时分秒
		var now = new Date(),
		sec = now.getSeconds(),
		min = now.getMinutes(),
		hour = now.getHours();
		hour = hour>=12 ? hour-12 : hour;

		iNow++;
		iNow = iNow%2;		

		oC.save();
			//初始化画布
			oC.clearRect(0,0,myCanvas.width,myCanvas.height);    
			oC.translate(75,75);
			oC.scale(0.5,0.5);
			oC.rotate(-Math.PI/2);
			
			//白色背景
			oC.save();
				oC.fillStyle = "#fff";
				oC.beginPath();
				oC.arc(0,0,140,0,Math.PI*2,true);
				oC.fill();
			oC.restore();

			oC.strokeStyle = "black";
			oC.fillStyle = "black";
			oC.lineWidth = 4;
			oC.lineCap = "round";				

			//时针刻度
			oC.save();
				oC.beginPath();
				for(var i=0; i<12; i++){	
					oC.moveTo(110,0);
					oC.lineTo(120,0);
					oC.rotate(Math.PI/6);
				}
				oC.stroke();
			oC.restore();

			//分针刻度
			oC.save();
				oC.fillStyle = "black";
				oC.lineWidth = 2;
				oC.beginPath();
				for(var i=0; i<60; i++){
					if(i%5 != 0){
						oC.moveTo(116,0);
						oC.lineTo(120,0);
					}
					oC.rotate(Math.PI/30);
				}
				oC.stroke();
			oC.restore();			
			
			oC.save();
				oC.rotate(Math.PI/2);
				oC.font = "30px impact";
				//12点
				oC.fillText("12",-15,-80);					
				//3点
				oC.fillText("3",88,13);					
				//6点
				oC.fillText("6",-8,104);				
				//9点
				oC.fillText("9",-103,11);					
			oC.restore();
			
			//画时针
			oC.save();
				oC.strokeStyle = "#ff3300";
				oC.rotate((Math.PI/6)*hour+(Math.PI/360)*min+(Math.PI/21600)*sec);	
				oC.lineWidth = 8;
				oC.beginPath();
				oC.moveTo(-20,0);
				oC.lineTo(60,0);
				oC.stroke();
			oC.restore();
			
			//画分针
			oC.save();
				oC.rotate((Math.PI/30)*min+(Math.PI/1800)*sec);
				oC.strokeStyle = "#27A9E3";
				oC.lineWidth = 6;
				oC.beginPath();
				oC.moveTo(-28,0);
				oC.lineTo(90,0);
				oC.stroke();
			oC.restore();

			//画秒针
			/*oC.save();
				oC.rotate(sec*Math.PI/30);
				oC.strokeStyle = "#D40000";
				oC.lineWidth = 3;
				oC.beginPath();
				oC.moveTo(-30,0);
				oC.lineTo(105,0);
				oC.stroke();
			oC.restore();*/
	
			//风车秒针
			oC.save();
				oC.rotate(sec*Math.PI/30);				

				oC.save();					
					oC.fillStyle = "#f23";
					oC.beginPath();
					oC.arc(94,0,10,0,Math.PI,true);
					oC.fill();
				oC.restore();

				oC.save();
					oC.rotate(Math.PI/2);
					oC.fillStyle = "#ffae00";
					oC.beginPath();
					oC.arc(10,-84,10,0,Math.PI,true);				
					oC.fill();
				oC.restore();

				oC.save();
					oC.fillStyle = "#27A9E3";
					oC.beginPath();
					oC.arc(74,0,10,Math.PI,Math.PI*2,true);
					oC.fill();
				oC.restore();

				oC.save();
					oC.rotate(Math.PI/2);
					oC.fillStyle = "#0eaf52";
					oC.beginPath();
					oC.arc(-10,-84,10,Math.PI,Math.PI*2,true);
					oC.fill();
				oC.restore();
			oC.restore()
			//风车秒针


			//表框
			oC.save();
				oC.lineCap = "butt";
				oC.lineWidth = 16;
				oC.save();				
					oC.strokeStyle = "#0eaf52";
					oC.beginPath();
					oC.arc(0,0,142,0,Math.PI*2,true);
					oC.stroke();
				oC.restore();

				oC.save();
					oC.strokeStyle = "#ffae00";
					oC.beginPath();
					oC.arc(0,0,142,0,Math.PI/iNow*5/3,true);
					oC.stroke();
				oC.restore();
			oC.restore();

			//中心点
			oC.save();
				oC.fillStyle = "#fff";
				oC.beginPath();
				oC.arc(0,0,4,0,Math.PI*2,true);
				oC.fill();
			oC.restore();
			

		oC.restore();



	};

//一、user_login_box(用户登陆)------------------------------------------------------------------

	$(document).click(function(){		//页面点击 隐藏
		$(".user_login_box").hide();
		$(".user_login").removeClass("btn_active");
	})
	 $(".user_login,.user_login_box").click(function(event){
		event.stopPropagation();		//阻止默认事件
	})
	 $(".user_login").each(function(){
		$(this).click(function(){
			$(this).toggleClass("btn_active");
			$(this).next().toggle();						//显示和隐藏 切换
			$(this).parent().siblings().find(".user_login_box").hide();
		})
	})




//主菜单--------------------------------------------------------------------------------------
	
	var index_1=0;				   //鼠标移入的序列号	

	//鼠标移入主菜单----------------------------------------------
	$("ul.navigation li a").hover(function(){
		$("ul.navigation li a").removeClass("on");
		$(this).addClass("on");
		audioPlayer();	
	},function(){
		$("#audioPlayer")[0].pause();
	});

	$("ul.navigation li a").hover(function(){	//鼠标移入
		index_1=$(this).parent().index();		
		$(".sub_nav ul .sub_list p").eq(index_1).stop(true,true).show(600).siblings().hide();
		audioPlayer();
	},function(){
		$("#audioPlayer")[0].pause();		
	});

	//hover音效
	function audioPlayer(){
		$("#audioPlayer").attr({"src":"/wp-content/uploads/2015/01/3.mp3"});
		$("#audioPlayer")[0].play();	
		$("#audioPlayer")[0].volume="0.5";	
	};
	
	

	//主菜单解决bug-------------------------------------------
	//解决 非火狐、非谷歌的兼容性      判断浏览器类型及版本号
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase()); 
	$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase()); 
	$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase()); 
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()); 
	
	//判断是webkit且版本小于35.0的(360-7.1)   或者    是IE浏览器
	if(($.browser.webkit&&parseFloat($.browser.version)<35)||$.browser.msie){
		$("#main_nav li a").css({"transition":"none",background:"none","transform":"rotateX(0deg)"});
		$("#main_nav li a").find("span:last-child").css({display:"none"});
		$("#main_nav li a").click(function(){
			$(this).css({background:"none","transform":"rotateX(0deg)"});
		});
		$("#main_nav li a").mouseover(function(){
			$(this).css({background:"none","transform":"rotateX(0deg)"});
		});
	}//主菜单解决bug-------------------------------------------
	
	

//三、二级菜单，当滚动条滚到一定距离，让它相对浏览器定位(fixed)---------------------------------
	if($(".sub_nav").length>0){					//获取二级菜单到顶部的距离
		var navTop = $(".sub_nav").offset().top - $('.sub_nav').height()/5;
		$(window).scroll(function(){
			if ($(window).scrollTop() >= navTop) {
				$(".sub_nav").addClass("fixed");
				$(".sub_nav ul li a.smallogo").css({opacity:1});
				/*$(".main_banner").css({background:"#112233"});#d1d6da*/  //轮播图背景
			} else {
				$(".sub_nav").removeClass("fixed");
				$(".sub_nav ul li a.smallogo").css({opacity:0});
				/*$(".main_banner").css({background:""});*/
			}
		});
	}
	
	
//四、搜索框--------------------------------------------------------------------------------------
	var sValue=$(".search").val();
	var hotStimer=null;
	
	//获取鼠标焦点
	$(".search").focus(function(){
		if($(this).val()==sValue){
			$(this).val("");									//清空val值
			$(this).css({background:"#fff"});
		}
		//搜索下拉框 依次展开
		var i=0;
		clearInterval(hotStimer);
		hotStimer=setInterval(function(){		//添加open样式 展开
			$(".hot_search div").eq(i).addClass("open");
			i++;
			if(i==$(".hot_search div").length){
				clearInterval(hotStimer);
			}
		},150);
	});
	
	//失去鼠标焦点
	$(".search").blur(function(){
		if($(this).val()==""){
			$(this).val(sValue);							//还原val值
			$(this).css({background:"#ededed"});
		}
		//搜索下拉框 依次收缩
		var i=$(".hot_search div").length-1;
		clearInterval(hotStimer);
		hotStimer=setInterval(function(){		//移除open样式 收缩
			$(".hot_search div").eq(i).removeClass("open");
			i--;
			if(i<0){
				clearInterval(hotStimer);
			}
		},100);
	});
	
	//搜索下拉菜单选项点击时替换对应的val值
	var sHtml=null;	
	$(".hot_search div").click(function(event){
		event.stopPropagation();
		sHtml=$(this).find("a").html();
		$(".search").val(sHtml);
	});
	
	
	
//五、轮播图-------------------------------------------------------------------------------------
	
	var len=$(".main_banner li").length;
	var index_2=0;
	var timer=800;
	var intervaltimer=0;
	var isMoving=false;
	
	function slide(slideMode){//轮播方法		
		if (isMoving==false){
			isMoving=true;
			var prev; var next; var hidden;
			var curr=$("#imgCard"+index_2);//当前正中显示
			
			if(index_2==0){								//当前正中显示的是第0张时 prev为最后一张
				prev=$("#imgCard"+(len-1));					
			}else{												//否则  序列号-1
				prev=$("#imgCard"+(index_2-1)); 		
			}
			if(index_2==(len-1)){					//当前正中显示的是最后一张时 next为第0张
				next=$("#imgCard0");
			}else{											//否则  序列号+1
				next=$("#imgCard"+(index_2+1));
			}
	
			if(slideMode){			//slideMode为1(true)，执行slide(1)，上一张
				if(index_2-2>=0){									//index_2						2		3		4
					hidden=$("#imgCard"+(index_2-2));//									0		1		2
				}else{													//index_2		0		1
					hidden=$("#imgCard"+(len+index_2-2));//			3		4
				}
				prev.css("z-index","5");			//点击prev按钮  让prev位置上的这张图片 层级最高 显示
				next.css("z-index","1");
				curr.css("z-index","2");			
				hidden.css("z-index","1");
				//当index_2自减，各图片往右运动效果
				hidden.css({width:"450px",height:"180px",top:"60px","left":"0px","opacity":0});
				hidden.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"0px",opacity:1},timer);
				curr.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"600px",opacity:1},timer);
				next.stop(true,true).animate({width:"450px",height:"180px",top:"60px","left":"730px","opacity":0},timer,function(){next.find("span").css("opacity",0); isMoving = false;});
				//prev  -->  curr     prev中的图片li轮换到curr的位置      其他一次轮换
				prev.find("span").css("opacity",0);
				$(".main_banner_box li").find("p").css({"bottom":"-50px"});//所有标题隐藏
				prev.stop(true,true).animate({width:"670px",height:"280px",left:"255px",top:0,opacity:1},timer,function(){
					$(this).find("p").animate({"bottom":"0px"});	//当前这张图片的标题运动出来
				});
				index_2--;
			}else{			//执行next 操作
				if(index_2+2>=len){								//index_2								3		4	
					hidden=$("#imgCard"+(index_2+2-len));//										0		1
				}else{													//index_2		0		1		2
					hidden=$("#imgCard"+(index_2+2));//						2		3		4
				}
				prev.css("z-index","1");
				next.css("z-index","5");			//点击next按钮  让next位置上的这张图片 层级最高 显示
				curr.css("z-index","2");
				hidden.css("z-index","1");
				//当index_2自增，各图片往左运动效果
				hidden.css({width:"450px",height:"180px",top:"60px","left":"730px","opacity":0});
				hidden.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"600px",opacity:1},timer);							
				curr.stop(true,true).animate({width:"580px",height:"240px",top:"20px",left:"0px",opacity:1},timer);
				//next  -->  curr     next中的图片li轮换到curr的位置      其他一次轮换
				next.find("span").css("opacity",0);
				$(".main_banner_box li").find("p").css({"bottom":"-50px"});//所有标题隐藏
				next.stop(true,true).animate({width:"670px",height:"280px",left:"255px",top:0,opacity:1},timer,function(){
					$(this).find("p").animate({"bottom":"0px"});	//当前这张图片的标题运动出来
				});
				prev.stop(true,true).animate({width:"450px",height:"180px",left:"0px",top:"60px",opacity:0},timer,function(){
					isMoving = false;
				}); 
				index_2++;	
			}//if else
	
			hidden.find("span").css("opacity",0.5);
			curr.find("span").css("opacity",0.5);
	
			if(index_2==len) index_2=0;
			if(index_2<0) index_2=len+index_2;			//限制index_2的范围
			$(".btn_list span").removeClass('curr').eq(index_2).addClass('curr');//给序列号按钮添加、移除样式
		}
	}//slide()


	if(len>3){
		//序列号按钮 跳序切换 方法
		$(".btn_list span").click(function(event){
			
			if (isMoving ) return;
			var oIndex=$(this).index();
	
			if(oIndex==index_2) return;//点击按钮的序列号与当前图片的序列号一致，return
			clearInterval(intervaltimer)
			intervaltimer=null;
	
			var flag=false;
			//当前显示图片的序列号  和  被点击按钮的序列号  间隔超过1且不是首尾两个的时候
			if(Math.abs(index_2-oIndex)>1&&Math.abs(len-Math.abs(index_2-oIndex))!=1){
				//统一样式
				$(".main_banner_box li").css({width:"300px",height:"120px",left:"600px",top:"60px",opacity:0});
				//如果当前的序列号   比    被点击按钮序列号     大     而且     不相邻、不是首尾  
				if(index_2>oIndex&&len-Math.abs(index_2-oIndex)!=1){
					flag=true;
					index_2=oIndex+1;		//oIndex+1    通过slide()  运动回上一张    oIndex
				}else{//比   小     而且     不相邻、不是首尾
					index_2=oIndex-1;		//oIndex-1     通过slide()  运动到下一张    oIndex
					if(index_2<0) index_2=len-1;
				}
			}else{//当前 比 被点击  大	且   相邻									//从0    跳到     4		要执行上一张方法
				if((index_2>oIndex&&len-(index_2-oIndex)!=1)||(index_2<oIndex&&len+(index_2-oIndex)==1)){
					flag=true;			//执行上一张
				}
			}
			slide(flag);
			intervaltimer=setInterval(slide,3000);//自动轮播
			
		});
	
		$(".main_banner_box li").on("mousemove",function(){
			if($(this).css("width")=="670px"){//鼠标移入为当前正中显示的图片li，则清除定时器
				clearInterval(intervaltimer);
				intervaltimer=null;
			}
		}).on("mouseout",function(){//鼠标移除重新滚动
				clearInterval(intervaltimer);
				intervaltimer=null;
				intervaltimer=setInterval(slide,3000);
		});
		
		$(".js_pre").click(function(event){//上一张
			if (isMoving ) return;
			clearInterval(intervaltimer);
			intervaltimer=null;
			slide(1);
			intervaltimer=setInterval(slide,3000);
		});
	
		$(".js_next").click(function(event){//下一张
			if (isMoving ) return;
			clearInterval(intervaltimer);
			intervaltimer=null;
			slide();
			intervaltimer=setInterval(slide,3000);        
		});
		
		intervaltimer=setInterval(slide,3000);
		
	}else{
		
		$(".js_pre").hide();
		$(".js_next").hide();
		
	}//if else
	

	
//六、在线首发-----------------------------------------------------------------------------------
	var len_2=$(".new_songs ul").length;
	var now_2=0;
	$("#albumPrev").click(function(){		//上一组
		if(now_2>=0){
			now_2--;
			if(now_2==-1){now_2=len_2-1;}
			$(".new_songs ul").eq(now_2).addClass("show").siblings().removeClass("show");
			$(".new_songs em.pageNum").html(now_2+1);
		}
	});
	$("#albumNext").click(function(){		//下一组
		if(now_2<=len_2){
			now_2++;
			if(now_2==len_2){now_2=0;}
			$(".new_songs ul").eq(now_2).addClass("show").siblings().removeClass("show");
			$(".new_songs em.pageNum").html(now_2+1);
		}
	});
	

	var _html2=$(".new_songs ul.show li.albumBox").eq(2).find("p").html();
	var _html3=$(".new_songs ul.show li.albumBox").eq(3).find("p").html();
	_html2+="<font>HOT</font>";
	_html3+="<font>HOT</font>";
	$(".new_songs ul.show li.albumBox").eq(2).find("p").html(_html2);
	$(".new_songs ul.show li.albumBox").eq(3).find("p").html(_html3);

	
	
//七、MV首播-----------------------------------------------------------------------------------
	var index_3=0;					//MV首播按钮序列号
	var index_33=0;				//首发MV按钮序列号（MV页面）
	var index_333=0;				//热门MV按钮序列号（MV页面）
	var cont_1=$(".index_mv_body .mvList");
	var cont_2=$(".shoufa_mv_body .mvList");
	var cont_3=$(".hot_mv_body .mvList");
	
	//MV首播 (首页)-------------------------------------
	$(".index_mv_title ul li").click(function(){	//选项卡
		index_3=$(this).index();
		mvSlide($(this),index_3,cont_1);
	});
	
	//首发MV (MV页面)--------------------------------
	$(".shoufa_mv_title ul li").click(function(){	//选项卡
		index_33=$(this).index();
		mvSlide($(this),index_33,cont_2);
	});
	
	//热门MV（MV页面）------------------------------------
	$(".hot_mv_title ul li").click(function(){	//选项卡
		index_333=$(this).index();
		mvSlide($(this),index_333,cont_3);
	});
	
	//封装MV列表切换效果，共用
	function mvSlide(btn,n,cont){
		btn.find("a").addClass("cur").parent().siblings().find("a").removeClass("cur");
		cont.eq(n).fadeIn().siblings("div").fadeOut();	
		cont.eq(n).addClass("curShow").siblings().removeClass("curShow");	
	}

	var iHtml = "<b></b>";
	$(".index_mv_body .mvList ul.sb li").eq(0).append(iHtml);
	$(".index_mv_body .mvList ul.sb li").eq(1).append(iHtml);
	$(".shoufa_mv_body .mvList ul.sb li").eq(0).append(iHtml);
	$(".shoufa_mv_body .mvList ul.sb li").eq(1).append(iHtml);
	


//八、歌曲推荐-----------------------------------------------------------------------------------
	var songs_rcmd_top=$(".songs_rcmd").offset().top - $(".songs_rcmd").height()/5*6;
	var songs_rcmd_timer=null;											//计算高度
	var index_4;
	var songs_rcmd_off=true;
	$(window).scroll(function(){	//窗口滚动事件
		var oScrollTop=$(document).scrollTop();
		if(oScrollTop>songs_rcmd_top){//当页面滚动距离大于这个值时，列表展开
			index_4=0;
			clearInterval(songs_rcmd_timer);
			songs_rcmd_timer=setInterval(function(){//分三组一起翻出
				$("#latest li").eq(index_4).addClass("show");
				$("#popular li").eq(index_4).addClass("show");
				$("#rank li").eq(index_4).addClass("show");
				index_4++;			//document.title=index_4;
				if(index_4==$("#latest li").length){
					clearInterval(	songs_rcmd_timer);
				}
			},30);
		}else{//当页面滚动距离小于这个值时，列表收缩
			index_4=$("#latest li").length;
			clearInterval(songs_rcmd_timer);
			songs_rcmd_timer=setInterval(function(){	
				$("#latest li").eq(index_4).removeClass("show");
				$("#popular li").eq(index_4).removeClass("show");
				$("#rank li").eq(index_4).removeClass("show");
				index_4--;			//document.title=index_4;
				if(index_4<0){
					clearInterval(	songs_rcmd_timer);
				}
			},100);
		}
	});
	


	//排行榜-----------------

	$("#rank li").eq(0).find("a.musicName").prepend("<i class='first_place'>1</i>");
	$("#rank li").eq(1).find("a.musicName").prepend("<i class='second_place'>2</i>");
	$("#rank li").eq(2).find("a.musicName").prepend("<i class='third_place'>3</i>");
	for(var r=3;r<9;r++){
		$("#rank li").eq(r).find("a.musicName").prepend("<i>"+(r+1)+"</i>");
	}



	
//九、精选集-------------------------------------------------------------------------------
	var oList_omnibus=document.getElementById("omnibus_list");
	var oI=oList_omnibus.getElementsByTagName("i")[0];
	var aSpan=oList_omnibus.getElementsByTagName("span");
	$("#omnibus_list .post_big a").hover(function(){
		$(this).find("i").stop(true,true).animate({left:"0px"},300);
	},function(){
		$(this).find("i").stop(true,true).animate({left:"305px"},300,function(){
			oI.style.left="-305px";
		});
	});
	$("#omnibus_list .post_small a").hover(function(){
		$(this).find("span").stop(true,true).animate({left:"0px"},300);
	},function(){
		$(this).find("span").stop(true,true).animate({left:"130px"},300,function(){
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.left="-130px";
			}
		});
		
	});
	
	
	
	

});//$(function(){});        window.onload







//十、回到顶部---------------------------------------------------------------------------
	$("#toTop").click(function(){
		$("html,body").animate({scrollTop: "0px"},"slow");
		//点击音效
		$("#audioPlayer").attr({"src":"/wp-content/uploads/2015/01/1.mp3"});
		$("#audioPlayer")[0].play();
	});
	
	//二维码
	$(".footer_cont_right a.twoCode").hover(function(){
			$(this).find("img.tCode").stop(true, true).fadeIn();
		},function(){
			$(this).find("img.tCode").stop(true, true).delay(800).fadeOut();
	});
	
	
	
	
// mv页.js

//十一、MV页面 js-------------------------------------------------------------------------
	
	$("#mv_rank_list ul li").hover(function(){
		$(this).css({"z-index":"6"}).stop(true,true).animate({"left":"-10px","opacity":"1"},350).siblings().css({"z-index":"1"}).stop(true,true).animate({"left":"0px","opacity":"0.5"},350);
		},function(){
		$("#mv_rank_list ul li").css({"z-index":"1"}).stop(true,true).animate({"left":"0px","opacity":"1"},350);
	});

	$("#mv_classify_list ul li").hover(function(){
		$(this).stop(true,true).animate({"opacity":"1"},350).siblings().stop(true,true).animate({"opacity":"0.5"},350);
		},function(){
		$("#mv_classify_list ul li").stop(true,true).animate({"opacity":"1"},350);
	});
	
	
	$("#mvList .mv_rcmd").click(function(){
		var index_mv_rcmd1=$(this).index();
		$(this).find("span").addClass("active").parent().siblings("li").find("span").removeClass("active");
		$(this).find("i").addClass("on").parent().siblings("li").find("i").removeClass("on");	
	});



//十二、MV视频播放器---------------------------------------------------------------------------------------------------
	//数组 保存 MV.url
	var arrSongs=["http://up.chshcms.com/v/url/0/aHR0cDovL3YueWlueXVldGFpLmNvbS92aWRlby8yMTczMzE3/yuedisk.mp4",
	"http://up.chshcms.com/v/url/0/aHR0cDovL3YueWlueXVldGFpLmNvbS92aWRlby83NzIzNjg=/yuedisk.mp4",
	"http://up.chshcms.com/v/url/0/aHR0cDovL3YueWlueXVldGFpLmNvbS92aWRlby8yMjM5ODI1/yuedisk.mp4"]
	
	//爱情大师 - 崔子格       匆匆那年 - 王菲        喜欢你 - 邓紫棋
	$("#mvList li.mv_rcmd").click(function(){
		var _index_songs=$(this).index();
		video[0].src=arrSongs[_index_songs];
		video[0].play();	
		$(".playPause").css({"backgroundPosition":"-54px -10px"});
	});
	$("#mv_rank_list ul li").click(function(){
		var index_mv_rcmd2=$(this).index();
		video[0].src=arrSongs[index_mv_rcmd2];
		video[0].play();
		$(".playPause").css({"backgroundPosition":"-54px -10px"});
	});



	//MV视频播放器
	var video=$("#video");
	//video[0].volume="0.5";
	//播放暂停
	$(".playPause").click(function(){
		if(video[0].paused){		//video 要带上 [0]
			video[0].play();
			$(this).css({"backgroundPosition":"-54px -10px"});
		}else{
			video[0].pause();
			$(this).css({"backgroundPosition":"-12px -10px"});
		}
		return false;
	});
	
	//获取总时长 与 获取当前播放时间
	video.on("loadedmetadata",function(){
		var dur=changeTime(video[0].duration);
		$(".duration").text(dur);
	});
	video.on("timeupdate",function(){
		var cur=changeTime(video[0].currentTime);
		$(".current").text(cur);

		var cur_pos=video[0].currentTime; //当前播放时间
		var dur_max=video[0].duration; //总时长，两者相除 求比例	
		var scale=100*cur_pos/dur_max; 
		$(".timeBar").css("width",scale+"%");
	});

	//把获取的时间(单位为毫秒) 转化成秒 方法
	function changeTime(time){
		iNum=parseInt(time);
		var iM=toZero(Math.floor(time/60));
		var iS=toZero(Math.floor(time%60));
		return iM+":"+iS;
	}
	//补零
	function toZero(num){
		return num<=9?"0"+num:""+num;
	}

	//点击或拖动进度条
	var timeDrag=false;   /* 拖动状态 */
	$(".progressBar").mousedown(function(e){
	   timeDrag=true;
	   updatebar(e.pageX);
	});
	$(document).mouseup(function(e){
	   if(timeDrag){
		  timeDrag=false;
		  updatebar(e.pageX);
	   }
	});
	$(document).mousemove(function(e){
	   if(timeDrag){
		  updatebar(e.pageX);
	   }
	});
	 
	//进度条 操作
	var updatebar=function(x){
	var progress=$(".progressBar");
	var maxduration=video[0].duration; //总时间
	var position=x-progress.offset().left; //点击或拖动的位置
	var percentage=100*position/progress.width();

	//限制拖动范围
	if(percentage>100){
		percentage=100;
	}
	if(percentage<0){
		percentage=0;
	}
 
	//拖动滚动条 currenttime 相应变化
	$(".timeBar").css("width",percentage+"%");
		video[0].currentTime=maxduration*percentage/100;
	};


	//缓冲加载条
	var startBuffer=function(){
		var maxduration=video[0].duration;
		var currentBuffer=video[0].buffered.end(0);
		var percentage=100*currentBuffer/maxduration;
		$(".bufferBar").css("width",percentage+"%");

		if(currentBuffer<maxduration){
			setTimeout(startBuffer,500);
		}
	};
	setTimeout(startBuffer,500);


	//静音按钮
	$(".muted").click(function(){
		if(video[0].muted){
			$(this).css({"backgroundPosition":"-88px -10px"});
			video[0].muted=false;
		}else{
			$(this).css({"backgroundPosition":"-126px -10px"});
			video[0].muted=true;
		}
		return false;
	});

	//音量条 点击或拖动
	var timeDrag2=false;   /* 拖动状态 */
	$(".volumeBar").mousedown(function(e){
		timeDrag2=true;
		updatebar2(e.pageX);
	});
	$(document).mouseup(function(e){
		if(timeDrag2){
			timeDrag2=false;
			updatebar2(e.pageX);
		}
	});
	$(document).mousemove(function(e){
		if(timeDrag2){
			updatebar2(e.pageX);
		}
	});
	 
	//音量条 操作
	var updatebar2=function(x){
		var progress=$(".volumeBar");
		var maxduration=video[0].duration; //总时间
		var position=x-progress.offset().left; //点击或拖动的位置
		var percentage=100*position/progress.width();
	 
		//限制范围
		if(percentage>100){
			percentage=100;
		}
		if(percentage<0){
			percentage=0;
		}
	 
	//拖动滚动条 currenttime 相应变化
	$(".volume").css("width",percentage+"%");
		video[0].volume=percentage/100;
	};

	//全屏
	$(".fullscreen").on("click",function(){
		//兼容写法
		video[0].RequestFullScreen=video[0].RequestFullScreen||video[0].webkitRequestFullScreen||video[0].mozRequestFullScreen;
		//调用全屏方法
		video[0].RequestFullScreen();
		return false;
	});