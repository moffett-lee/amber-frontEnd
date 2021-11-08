/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

//        var screenSize = cc.EGLView.getInstance().getFrameSize();
//        var resourceSize = cc.size(800, 450);
//        var designSize = cc.size(800, 450);
//
//        var screenSize2 = cc.EGLView.getInstance().getFrameSize();
//
//
//        alert("==oo========"+screenSize2.width+"======"+screenSize2.height);

        var screenSize = cc.size(480, 320);
        var resourceSize = cc.size(480, 320);
        var designSize = cc.size(480, 320);

        var searchPaths = [];
        var resDirOrders = [];

        searchPaths.push("res");
        cc.FileUtils.getInstance().setSearchPaths(searchPaths);



//        var lizhiPar = cc.ParticleSystem.create("res/baozha.plist");
//
//        lizhiPar.setPosition(cc.p(240,160));
//
//        this.rootNode.addChild(lizhiPar);

//
//        var platform = cc.Application.getInstance().getTargetPlatform();
//        if (platform == cc.TARGET_PLATFORM.MOBILE_BROWSER) {
//            if (screenSize.height > 450) {
//                resDirOrders.push("HD");
//            }
//            else {
//                resourceSize = cc.size(400, 225);
//                designSize = cc.size(400, 225);
//                resDirOrders.push("Normal");
//            }
//        }
//        else if (platform == cc.TARGET_PLATFORM.PC_BROWSER) {
//            resDirOrders.push("HD");
//        }

//        cc.FileUtils.getInstance().setSearchResolutionsOrder(resDirOrders);
//
//        director.setContentScaleFactor(resourceSize.width / designSize.width);

//        director.setContentScaleFactor(2);

//        cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);


//        cc.EGLView.getInstance()._adjustSizeToBrowser();
//        cc.EGLView.getInstance()._resizeWithBrowserSize(true);
//        cc.EGLView.getInstance().setDesignResolutionSize(480, 320, cc.RESOLUTION_POLICY.SHOW_ALL);

//        cc.EGLView.getInstance()._adjustSizeToBrowser();
//        cc.EGLView.getInstance()._resizeWithBrowserSize(true);

//        cc.EGLView.getInstance()._adjustSizeToBrowser();
//        cc.EGLView.getInstance()._resizeWithBrowserSize(true);

        cc.EGLView.getInstance().resizeWithBrowserSize(true);
        cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);

//                      alert("wewerwr");
        // turn on display FPS
//        cc.TARGET_PLATFORM.MOBILE_BROWSER;

//        cc.IS_SHOW_DEBUG_ON_PAGE = true;

        if(cc.Browser.isMobile){
            cc.log("==isMobile==");
            director.setAnimationInterval(1.0 / 50);

        }else{
            cc.log("=not=isMobile==");
            director.setAnimationInterval(1.0 / this.config['frameRate']);
        }

        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
//        director.setAnimationInterval(1.0 / this.config['frameRate']);

        qyp_view_width = document.documentElement.clientWidth;

        qyp_view_height = document.documentElement.clientHeight;


        //load resources
//        alert("11111");

//        qyp_isgame_locked = false;



//        cc.log("===navigator.appName===="+navigator.appName+"====");
//
//        cc.log("===navigator.appVersion===="+navigator.appVersion+"====");
//
//        cc.log("===navigator.platform===="+navigator.platform+"====");

        cc.MyLoaderScene.preload(g_resources, function () {
            director.replaceScene(new this.startScene());
        }, this);




//        GameAPI.loadAPI();


        return true;
    }
});

var myApp = new cocos2dApp(WelcomeScene);



window.onfocus = function (){

    cc.log("====onfocus==");

//    alert("恢复焦点等待");

    if(!qyp_isgame_pause){
        cc.Director.getInstance().resume();
    }

    var cocos2dConfig = document['ccConfig'];

    var animationInterval = 1/cocos2dConfig['frameRate'];

//    cc.log("animationInterval==="+animationInterval);

    cc.Director.getInstance().setAnimationInterval(animationInterval);

//    for(var s = +new Date(); s + 5000 > +new Date();){}

//    for(var s = +new Date(); s + 2000 > +new Date();){}

//    var designSize = cc.size(480, 320);







//    cc.EGLView.getInstance().resizeWithBrowserSize(true);

//    cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);


}

//窗体失去焦点时,显示dir控件
window.onblur = function(){
    cc.log("====onblur==");

//    alert("失去焦点等待");

    cc.Director.getInstance().pause();

    cc.Director.getInstance().setAnimationInterval(1/10);

//    qyp_isgame_locked = true;

//    while(qyp_isgame_locked){
//        for(var s = +new Date(); s + 2000 > +new Date();){}
//    }
//    for(var s = +new Date(); s + 2000 > +new Date();){}
//    for(var s = +new Date(); s + 7000 > +new Date();){}

//    alert("失去焦点等待");
//    var designSize = cc.size(480, 320);
//
//    cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL);




}



