function waterFloat(elm,t,d,v){
var i = elm;
var runIt = function (elm,t,d,v) {
    elm.animate({top:'+='+v},t,"linear",function(){
		$({deg: -d}).animate({deg: d}, {
			duration: t,
			step: function(now){
				elm.css({
					transform: "rotate(" + now + "deg)"
				});
			}
		},"linear");
		elm.animate({top:'-='+v},t,"linear",function(){
			$({deg: d}).animate({deg: -d}, {
			duration: t,
			step: function(now){
            elm.css({
                transform: "rotate(" + now + "deg)"
				});
			}
		},"linear");
			runIt(elm,t,d,v);
		});	
	});
}
runIt(i,t,d,v);
}
