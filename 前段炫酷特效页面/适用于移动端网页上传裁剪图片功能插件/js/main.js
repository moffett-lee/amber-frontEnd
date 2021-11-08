var baseUrl=baseUrl||"./js/";
require.config({
    //测试防止js文件缓存
    //urlArgs: "bust=" +  (new Date()).getTime(),
    /*模块依赖配置*/
    baseUrl:baseUrl,
    shim: {
        'jquery.ui.core': ['jquery'],
        'jquery.ui.widget': ['jquery'],
        'jquery.ui.mouse': ['jquery'],
        'jquery.ui.slider':['jquery'],
        "zepto.touch":"Zepto",
        "zepto.fx":"Zepto"
    },	 /*模块路径配置*/
    paths: {
        "exif-js":"exif",
    "jquery": "jquery-2.1.4",
    "jquery.eraser":"jquery.eraser",
    "underscore": "underscore.min",
    "backbone": "backbone.min",
     "Zepto":"zepto.min",
    "zepto.touch":"zepto.touch",
    "zepto.fx":"zepto.fx",
    "tomLib":"tom.Lib",
        "zxxLib":"zxx.Lib",
     "jquery-private":"jquery-private",
     "tom":"tomRequire",
     "tomTest":"tomRequire",
     "lodash":"lodash",
        "jcanvas":"jcanvas",
        "hammer":"Hammer/hammer.min",
        "hammer.fake":"Hammer/hammer.fakemultitouch",
        "hammer.showtouch":"Hammer/hammer.showtouches",
        "tomPlugin":"plugins/tom-jqplugins",
        'Caman':"caman.full",
        'slider':"rangeslider.js-1.3.3/rangeslider.min",
        "iscroll-lite":"iscroll-lite",
        "megapix-image":"megapix-image",
        'fastclick':'fastclick'
    }  ,
    /*模块规则配置*/
    map:{
        '*': {
            'jquery': 'jquery-private',
            'tomLib':'tomLib'
        },
        "jquery-private":{
            "jquery":"jquery"
        }
    }
});
