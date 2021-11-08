/**
 * Created by zhang-ting on 2015/8/12.
 */
function aclose(){
    document.getElementById("topbanner").style.display="none";
}
//导航菜单
//function underfx(){
//    var underline=document.getElementsByClassName(".content-nav ul li");
//    underline.addClass("underline");
//}
//function nounderfix(){
//    var nounderline=document.getElementsByClassName(".content-nav ul li");
//    nounderline.removeClass("underline");
//}
//鼠标悬，显示
function showpic(li){
    var pic=li.getElementsByTagName("ul")[0];
    pic.style.display="block";
}
function hidepic(li){
    var pic=li.getElementsByTagName("ul")[0];
    pic.style.display="none";
}

//时间轴
$(function(){
    $(".diary-year").addClass("close");
    $(".diary-year").last().removeClass("close");
    $(".diary-main .diary-year .diary-list").each(function (e, target) {
        var $target=  $(target),
            $ul = $target.find("ul");
        $target.height($ul.outerHeight()), $ul.css("position", "absolute");
    });

    $(".diary-main .diary-year>.years>a").click(function (e) {
        e.preventDefault();
        $(this).parents(".diary-year").toggleClass("close")
    });
})

//生活风景
window.onload=function()   //onload 事件句柄，文档装载结束时调用
    {
        var tag=document.getElementById("tag").children; //获取Tag下的li，即Tag标签
        var content=document.getElementById("tagContent").children; //获取Tag标签对应的内容
        content[0].style.display = "block"; //默认显示第一个标签的内容
        tag[0].className="current";
        var len= tag.length;
        for(var i=0; i<len; i++)   //无论点击谁都能实现当前显示，其余隐藏
        {
            tag[i].index=i; //为何如此？（看下面解释）
            tag[i].onclick = function()     //0级DOM的事件句柄注册
            {
                for(var n=0; n<len; n++)
                {
                    tag[n].className="";
                    content[n].style.display="none";
                }   //首先将全部的div隐藏
                tag[this.index].className = "current";
                content[this.index].style.display = "block";
            }
        }
    }
$(function(){
    $(".lifecon1 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon1 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon1 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon1 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon2 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon2 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon2 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon2 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon3 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon3 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon3 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon3 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon4 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon4 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon4 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon4 .life-pic li").eq(n-1).slideUp(100);
    })
    $(".lifecon5 .life-pic").mouseenter(function(){
        n=$(this).index();
        $(".lifecon5 .life-pic li").eq(n-1).slideDown(100);
    })
    $(".lifecon5 .life-pic").mouseleave(function(){
        n=$(this).index();
        $(".lifecon5 .life-pic li").eq(n-1).slideUp(100);
    })
})








//返回顶部
$(function(){
    $(window).scroll(function() {
        if($(window).scrollTop() >= 100){
            $('.totop').fadeIn(300);
        }else{
            $('.totop').fadeOut(300);
        }
    });
    $('.totop').click(function(){$('html,body').animate({scrollTop: '0px'}, 1000);}); //火箭动画停留时间，越小消失的越快~
});