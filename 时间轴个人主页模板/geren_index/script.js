(function($) {
    $.fn.extend({
        IMGDEMO:function(opt) {
            
            var opt 	= arguments[0] ? arguments[0] :false;
            var $button = $(this).children("li")	;			//容器;
            var $sec 	= 3000						; 			//自动播放默认时间;
            var $min 	= $button.last().width() 	;			//最小宽度;
            var $max 	= $button.first().width() 	;			//最大宽度;
            var $index 	= 1   						;			//轮播开始索引号;
            
            $default = {										//默认参数;
                speed	:	opt.speed 	? 	opt.speed 						:	"slow"	,
                by		:	opt.by 		? 	opt.by 							:	"click"	,
                auto	:	opt.auto 	? 	opt.auto						:	false	,
                sec		:	opt.sec 	? 	opt.sec < 1000 ? 1000 : opt.sec	:	$sec	,
                maxWidth:	$max														,
                minWidth:	$min														,
                index	:	$index
            };            
            $button.bind($default.by, this.run).autoPlay();		//绑定事件;
        },
        run:function() {										//运行方法;
            var $obj = $(this);
            if ($obj.width() == $default.minWidth) {
                var timeDo = window.setTimeout(function() {
                    $default.index = $obj.index();
                    $obj.anim();
                }, 100);
                $obj.mouseout(function() {
                    window.clearTimeout(timeDo);
                });
            }
        },
        autoPlay:function() {									//自动播放;
            if ($default.auto) {
                var $this = $(this);
                $this.autoDo();
                $this.mouseover(function() {
                    window.clearInterval(timeL);
                });
                $this.mouseout(function() {
                    $this.autoDo();
                });
            }
        },
        autoDo:function() {										//播放方法;
            var $len 	= 	$(this).length - 1;
            var $this 	= 	$(this);
            	timeL 	= 	window.setInterval(function() {
                				$this.eq($default.index).anim();
                				$default.index < $len ? $default.index++ :$default.index = 0;
            				}, $default.sec);
        },
        anim:function() {										//动画方法;
            var $fx = function() {
                $(this).siblings("li").animate({
                    width	:	$default.minWidth,
                    opacity	:	0.8
                }, $default.speed).css("cursor", "pointer");
                $(this).animate({
                    width	:	$default.maxWidth,
                    opacity	:	1
                }, $default.speed).css("cursor", "default");
				
                $(this).siblings("li").children("div").fadeOut();
                $(this).children("div").fadeTo($default.speed,0.7);
                $(this).dequeue();
            };
            $(this).queue($fx);
        }
    });
})(jQuery);
$(document).ready(function(e){
    var opt	=	{
        "speed"	:	"slow"		,	//变换速度,三速度可选 slow,normal,fast;
        "by"	:	"click"		,	//触发事件,click或者mouseover;
        "auto"	:	true		,	//是否自动播放;
        "sec"	:	4000	 		//自动播放间隔;
    };
    $("#demo").IMGDEMO(opt);
});