/**
 * Created by tom.chang on 2015/4/28.
 */

(function(factory){
    if(typeof define === "function" && define.amd != undefined ){
        // AMD模式
        define(["jquery",'megapix-image','exif-js'], factory);
    } else {
        // 全局模式
        factory(jQuery,MegaPixImage,EXIF,true)
    }
})(function($,MegaPixImage,EXIF,noGlobal){
    var _ = {};

    if(noGlobal===true){
        var MegaPixImage=window.MegaPixImage
    }
    //browser support feature obj
    _.support={};
//css3 event
    function prefixEvent(t){if(t){var e=document.createElement("div"),n={Webkit:"webkit",Moz:"",O:"o"};for(var i in n)if(void 0!=e.style[i+"TransitionProperty"])return n[i]+String.fromCharCode(t[0].charCodeAt()-32)+t.slice(1)}}

    //css3 style浏览器兼容
    _.prefixStyle=function(style,css){
            var el = document.createElement('div')
            var vendors = 'webkitT,t,MozT,msT,OT'.split(','),svendors=[],prefix,split='-',_style=style;
            var first=style.slice(0,1);
            style=style.slice(1);
            for(var i in vendors){
                if( vendors[i].slice(-1).charCodeAt()>=97){
                    svendors[i]=vendors[i].replace(/\w$/,first)
                }else{
                    svendors[i]=vendors[i].replace(/\w$/,first.toUpperCase())
                }
                if(el.style[svendors[i]+style]!=undefined){
                    if(css||style){
                        return   split+vendors[i].slice(0,-1)+split+_style
                    }else{
                        return svendors[i]+style
                    }
                }
            }
    }

    /*逐帧图片播放函数*/
    /*
     *  用法:animateFrame($rabbit,0,14,50,true,false,1,null,"callBackFun","stepCallBack",null,null);
     *  说明:
     *  el: 装载动画的容器，可以是class，或者id
     *  firstFrame：第一帧的 p0（test0.png 从0开始命名）
     *  lastFrame：最后一帧的 p14
     *  frameGapTime：每一帧动画的间隔时间
     *  isGoToFirstBoo：动画播放完毕是否停留到第一帧  true false
     *  isLoopBoo：是否循环播放  true false
     *  loopTimes：循环次数  默认值1
     *  loopGapTime：循环播放之间的间隔时间   默认值null
     *  callBackFun：回调函数（当循环为false时，播放一次完毕才执行。当循环为true时，循环完才执行）
     *  stepFuc：每一帧动画执行的函数
     *  waitFrame：停留在第几帧
     *  waitTime：停留在第几帧时，停留等待的时间
     *
     */

    _.animateFrame=function(el, firstFrame, lastFrame, frameGapTime, isGoToFirstBoo, isLoopBoo, loopTimes, loopGapTime, callBackFun, stepFuc, waitFrame, waitTime) {
        var plugin = el.data("plugin"), frameClass,$list,
            isInit = plugin ? true : false, isPlay = plugin ? plugin.getPlayState() : false;
        if (isPlay) {
            return;
        }
        if (!isInit) {
            for (var i = 0; i <= lastFrame; i++) {
                frameClass="png-frame p" + (i + 1)+((i==0)? " show":"");
                el.append("<div class='"+frameClass+"'></div>");
            }
            $list = el.find(".png-frame");
            el.data("plugin", plugin = new Plugin());
        } else {
            plugin.reset();
            $list = plugin.list;
        }
        function Plugin() {
            var isPlay = true;
            this.list = $list;
            this.isInit = true;
            this.reset = reset;
            this.interval = null;
            this.timeout = null;
            this.isPlay = true;
            this.stop = function(){
                isPlay=false;
            }
            this.start = function(){
                isPlay=true;
            }
            this.getPlayState=function(){
                return isPlay
            }
        }

        function reset() {
            clearInterval(plugin.interval);
            $list.filter(function (item, index) {
                return index > 0
            }).removeClass("show");
            plugin.start();
            clearTimeout(plugin.timeout);
        }

        (function () {
            var count = firstFrame, next, time, prev;
            function frameEvent() {
                plugin.interval = setInterval(function () {
                    if(!plugin.getPlayState()){
                        return;
                    }
                    if (waitFrame && (waitFrame == count)) {
                        if (!time) {
                            time = +new Date;
                            return;
                        } else {
                            if (+new Date - time < waitTime) {
                                return;
                            } else {
                                waitFrame = null;
                            }
                        }
                    }
                    prev = count;
                    if (!isGoToFirstBoo) {
                        count++;
                    }
                    if (count == lastFrame) {
                        if (loopTimes)loopTimes--;
                        clearInterval(plugin.interval);
                        if (isLoopBoo && (loopTimes != 0 || loopTimes == null)) {
                            //循环播放 调用
                            plugin.timeout = setTimeout(function () {
                                if (isGoToFirstBoo) {
                                    count = 0;
                                }
                                frameEvent();
                            }, loopGapTime);
                        }
                        if (isLoopBoo && loopTimes == 0) {
                            plugin.stop();
                            if (typeof callBackFun == "function") {
                                callBackFun();
                            }
                        } else if(!isLoopBoo) {
                            plugin.stop();
                        }
                        if (typeof callBackFun == "function" && isLoopBoo == false) {
                            callBackFun();
                        }
                    }

                    if (isGoToFirstBoo) {
                        count++;
                    }
                    if (count == lastFrame + 1) {
                        count = 0;
                    }
                    $list.eq(count).addClass("show");
                    $list.eq(prev).removeClass("show");
                    if (typeof stepFuc == "function") {
                        stepFuc(count);
                    }

                }, frameGapTime);
            }
            frameEvent();
        })();
        return plugin;
    }


    /*
     */
    function parabola(open,leftOrNot,speed,strength,distance){

    }
    parabola.gender=function(x){


    }
    //enhance jquery plugin
    //from bootstrap

    function transitionEnd() {
        var el = document.createElement('bootstrap')
        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }
        return false // explicit for ie8 (  ._.)
    }

    //一个异步事件处理队列 实现了当后面事件全部完成时，回滚检查执行之前的未完成等待回调队列
    (function(){
        function DeferredList(len,callback){
            this.dfdList=[];
            this.$dfdList=[];
            this.callback=callback;
            var Gdfd= $.Deferred(),dfd;
            for(var i= 0,l=len;i<l;i++){
                dfd= new DeferredItem();
                Gdfd.then(dfd);
                if(i==0){
                    Gdfd.resolve();
                }
                Gdfd=dfd.defer;
                this.dfdList.push(dfd);
                this.$dfdList.push(dfd.defer);
            }
            if(typeof callback==="function"){
                $.when(this.$dfdList).then(callback)
            }
        }
        DeferredList.prototype.getItem=function(index){
            return this.dfdList[index]
        }
        DeferredList.prototype.dealItem=function(start){
            var beforeDone=true;
            for(var i= start-1;i>-1;i--){
                if(this.getItem(i).defer.state()!=="resolved"){
                    beforeDone=false
                }
            }
            if(beforeDone){
                this.getItem(start).changeState("filled");
                this.dealWaitList(start)
            }else{
                this.getItem(start).changeState("wait");
            }
            return this.getItem(start).cstate;
        }
        DeferredList.prototype.dealWaitList=function(start){
            var list=this.dfdList;
            for(var i= start+1,l=list.length;i<l;i++){
                if(this.getItem(i).cstate!=="wait"){
                    return false;
                }else{
                    this.getItem(i).changeState("filled")
                }
            }
        }
        function DeferredItem(){
            this.defer= $.Deferred();
            this.cstate="unfilled"; //wait filled
        }
        DeferredItem.prototype.addCallbacks=function(success,fail){
            this.defer.done(success).fail(fail);
        }
        DeferredItem.prototype.changeState=function(state){
            this.cstate=state;
            if(state==="filled"){
                this.defer.resolve();
            }
        }
        _.DeferredList=DeferredList;
    })();



    _.getParams=function(names){
        if(!names){
            return;
        }
        if(typeof names=="string"){
            names=[names];
        }
        if(typeof names.slice !="function"){
            return
        }
        var search=window.location.search.slice(1),list=search.split("&"),length= 0,r=[],temp;
        for(var j= 0,l=list.length;j<l;j++){
            temp=list[j].split("=");
            list[j]={};
            if(temp.length==2){
                list[j]["param"]=temp[0]
                list[j]["value"]=temp[1]
            }
        }
        for(var i= 0,l=names.length;i<l;i++){
            while(length<list.length){
                if(list[length]["param"]==names[i]){
                    r.push(decodeURI(list[length]["value"]));
                }else if(length==list.length-1&&!r[i]){
                    r.push(null);
                }
                length++;
            }
            length=0;
        }
        return r
    }
    var URL = window.URL && window.URL.createObjectURL ? window.URL :
        window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
            null;
    _.cropImage=function(opts){
        var hastouch = "ontouchstart" in window?true:false,
            tapstart = "touchstart mousedown",
            tapmove = "touchmove mousemove",
            tapend = "touchend mouseup";
        opts= $.extend({
            enableRatio:true,
            cropWidth:260,
            cropHeight:260,
            container:document.body,
            canvas:document.createElement("canvas"),
            success:function(o){
                // o.originSrc o.cropSrc
            },
            onChange:function(o){
                //o.cropSrc
            },
            onLoad:function(o){
                //o.originSrc
            }
        },opts)
        opts.devicePixelRatio=opts.enableRatio?window.devicePixelRatio:1;
        var G={preview:null,moveX:0,moveY:0,scale:1,rotate:0,ratio:opts.devicePixelRatio},transform= _.prefixStyle("transform"),
            canvas=opts.canvas,ctx=canvas.getContext('2d'), _x, _y,_scale,offset=$(canvas).offset(),$bindPreview=opts.bindPreview||$('<img/>'),canMove;
        $(canvas).prop({width:opts.cropWidth*opts.devicePixelRatio,height:opts.cropHeight*opts.devicePixelRatio}).css({
            width:opts.cropWidth,height:opts.cropHeight
        })
        if(opts.bindFile){
            if(typeof opts.bindFile=="string"){
                var temp;
                temp=new Image;
                temp.onload=getCropFile.bind(null,temp);
                temp.src=opts.bindFile;
                G.preview=temp;
            }else if($(opts.bindFile).is("input[type=file]")){
                opts.bindFile.attr("cropId", ++_.cropImage.id);
                setCropStyle({x:0,y:0,scale:1})
                $(document).delegate("[cropId="+_.cropImage.id+"]","change",function(){
                    $bindPreview.prop("src",'');
                    ctx.clearRect(0,0,canvas.width,canvas.height)
                    if(this.files&&this.files.length){
                        var temp,mega,preview=this.files[0],img=new Image;
                              //  EXIF.getData(preview, function() {

                        var picURL=URL.createObjectURL(preview);
                        if(preview.type=="image/jpeg"){
                            var img=new Image;
                            img.onload=function(){
                                EXIF.getData(img,function() {
                                    var mega = new MegaPixImage(img);
                                    mega.imageLoadListeners=null;
                                    mega.render($bindPreview[0], {
                                        maxWidth: 800,
                                        quality:1,
                                        imageType:"image/png",
                                        orientation: EXIF.getTag(this, 'Orientation') || 1
                                    }, function () {
                                        G.preview=$bindPreview[0];
                                        var o=getCropInfo();
                                        $bindPreview.prop("style",'')
                                        opts.onLoad({
                                            originSrc:img.src,width: o.dWidth,height: o.dHeight,ratio: G.ratio
                                            ,x: o.x,y: o.y,dWidth: o.dWidth,dHeight: o.dHeight,scale: o.scale})
                                    })
                                    //mega.imageLoadListeners[0]()
                                })
                                //URL.revokeObjectURL(picURL);
                            }
                            img.src=picURL
                        }else{
                            var img=new Image;
                            img.onload=function(){
                                G.preview=img;
                                var o=getCropInfo();
                                $bindPreview.prop("style",'')
                                opts.onLoad({
                                    originSrc:img.src,width: o.dWidth,height: o.dHeight,ratio: G.ratio
                                    ,x: o.x,y: o.y,dWidth: o.dWidth,dHeight: o.dHeight,scale: o.scale})
                            }
                            img.src=picURL;
                        }

                              //  });
                        //img.src = URL.createObjectURL(preview);
                    //    { maxWidth: 1024, maxHeight: 1024,quality:0.5 }
                    }
                    opts.bindFile.after(opts.bindFile.clone()).remove();
                })
            }else{
                G.preview=opts.bindFile;
                getCropFile();
            }
        }
        function getCropInfo(){
            var iWidth=G.preview.naturalWidth,iHeight=G.preview.naturalHeight,
                dWidth,dHeight, x=0,y= 0,scale;
            var oWidth=opts.cropWidth*opts.devicePixelRatio;
            var oHeight=opts.cropHeight*opts.devicePixelRatio;
            ctx.clearRect(0,0,canvas.width,canvas.height)
            if((oWidth/oHeight)<(iWidth/iHeight)){
                console.log("填高")
                scale=oHeight/iHeight;
                dHeight=oHeight;
                dWidth=iWidth*scale;
                x=-(iWidth*scale-oWidth)/2;
            }else{
                console.log("填宽")
                scale=oWidth/iWidth;
                dWidth=oWidth;
                dHeight=iHeight*scale;
                y=-(iHeight*scale-oHeight)/2;
            }
            return {x:x,y:y,dWidth:dWidth,dHeight:dHeight,scale:scale,iWidth:iWidth,iHeight:iHeight}
        }
        function getCropFile(option){
            var o=getCropInfo(), x=-o.dWidth/2*G.scale+ G.x,y=-o.dHeight/2*G.scale+ G.y,result;
            option=option||{};
            if(option.lowDpi&&opts.enableRatio){
                o.dHeight/=opts.devicePixelRatio;
                o.dWidth/=opts.devicePixelRatio;
                canvas.width/=opts.devicePixelRatio;
                canvas.height/=opts.devicePixelRatio;
            }
            ctx.save();
            if(option.background){
                ctx.fillStyle=option.background;
                ctx.fillRect(0,0,canvas.width,canvas.height)
            }
            ctx.translate(canvas.width/2,canvas.height/2);
            ctx.rotate(Math.PI*G.rotate/180)
            if(G.rotate==90){
                x=-o.dWidth/2*G.scale+ G.y;
                y=-o.dHeight/2*G.scale- G.x;
            }else if(G.rotate==180){
                x=-o.dWidth/2*G.scale-G.x;
                y=-o.dHeight/2*G.scale-G.y;
            }else if(G.rotate==270){
                x=-o.dWidth/2*G.scale-G.y;
                y=-o.dHeight/2*G.scale+G.x;
            }
            //console.log(G.preview,-o.dWidth/2*G.scale+ G.x,-o.dHeight/2*G.scale+ G.y, o.dWidth* G.scale, o.dHeight* G.scale)
            ctx.drawImage(G.preview,x,y, o.dWidth* G.scale, o.dHeight* G.scale);
            //,0,0,G.preview.width*G.scale, G.preview.height*G.scale);//,0,0, G.preview.width*G.scale, G.preview.height*G.scale);
            ctx.restore();
            result=canvas.toDataURL("image/"+option.type?option.type:'png');
            if(option.lowDpi&&opts.enableRatio){
                canvas.width*=opts.devicePixelRatio;
                canvas.height*=opts.devicePixelRatio;
            }
            return result;
        }
        if(!opts.useHammer){
            $(document).on(tapend,function(e) {
                canMove=false;
            });
            $(canvas).on(tapstart,function(e){
                canMove=true;
                e= e.originalEvent;
                offset=$(canvas).offset();
                var left=hastouch?e.targetTouches[0].clientX-offset.left:e.clientX-offset.left;
                var top= hastouch?e.targetTouches[0].clientY-offset.top:e.clientY-offset.top;
                _x=left;
                _y=top;
            })
            $(canvas).on(tapmove,function(e){
                if(!canMove){
                    return
                }
                e= e.originalEvent;
                var left=hastouch?e.targetTouches[0].clientX-offset.left:e.clientX-offset.left;
                var top= hastouch?e.targetTouches[0].clientY-offset.top:e.clientY-offset.top;
                G.moveX+=left-_x;
                G.moveY+=top-_y;
                $bindPreview.css(transform,"translate3d("+G.moveX+'px,'+G.moveY+"px,0)")
                _x=left;
                _y=top;
            })
        }
        function getRotateInfo(){

        }
        function setCropStyle(o){
            $.extend(G,o)
        }
        return  {getCropFile:getCropFile,getCropInfo:getCropInfo,setCropStyle:setCropStyle};
    }
    _.cropImage.id=0;


//组动画   循环替换一组元素的class 实现循环式替换动画效果，frameClass可以是一组不同的，也可以是同一个

    /**
     *
     * @param group
     * @param frameClass
     * @param duration
     * @param gap
     * @param startIndex
     * @param totalTimes
     * @returns {number}
     */

    _.animateGroup=function(opts){

        //group,frameClass,duration,gap,startIndex,loopTimes,cb
        var animArr=opts.group,reset,duration=opts.duration+(opts.gap|| 0),curEl=animArr.eq(0),index=opts.startIndex||0;
        function run(){
            curEl.addClass(opts.frameClass[index]||opts.frameClass[0])
        }
        if(!opts.waitTime){
           go();
        }else{
            setTimeout(function(){
                go();
            },opts.waitTime)
        }
    function go() {
        run();
        reset = setInterval(function () {
            if (opts.classSwitch !== false) {
                curEl.removeClass(opts.frameClass[index] || opts.frameClass[0]);
            }
            index++;
            if (index > animArr.length - 1) {
                opts.loopTimes--;
                index = 0;
            }
            curEl = animArr.eq(index);
            if (opts.loopTimes == null || opts.loopTimes != 0) {
                run();
            }
            if (opts.loopTimes == 0) {
                clearInterval(reset);
                typeof opts.callback == "function" && opts.callback();
            }
        }, duration + 70);
    }
        return reset;
    }

    if (noGlobal===true ) {
        window.tomLib =  _;
    }
    _.fillNumByWord =function(num,word,len){return (Array(len+1).join(word)).slice(0,len-(num+'').length)+num}
    _.browser={
            versions:function(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                    qq: u.match(/\sQQ/i) == " qq" //是否QQ
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }
    _.getParam=function(name){
            var search=window.location.search.slice(1),
                list=search.split("&"),length= 0,keyValArr
            while(length<list.length){
                keyValArr=list[length].split("=")
                if(keyValArr[0]==name){
                    return decodeURI(keyValArr[1]);
                }
                length++;
            }
            return null
    }
    return _;
});

/*

 document.ready = function (callback) {
 ///兼容FF,Google
 if (document.addEventListener) {
 document.addEventListener('DOMContentLoaded', function () {
 document.removeEventListener('DOMContentLoaded', arguments.callee, false);
 callback();
 }, false)
 }
 //兼容IE
 else if (document.attachEvent) {
 document.attachEvent('onreadytstatechange', function () {
 if (document.readyState == "complete") {
 document.detachEvent("onreadystatechange", arguments.callee);
 callback();
 }
 })
 }
 else if (document.lastChild == document.body) {
 callback();
 }
 }
 */


