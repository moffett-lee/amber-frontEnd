	$(function(){
	var jjrmodelidlist;  //用于存放从数据库取出的所有节假日的id
	var jjrmodeltimelist; //用于存放从数据库取出的所有节假日的time
	var jjrmodelztlist; //用于存放从数据库取出的所有节假日的状态
		
	createSelectYear();  //创建年份下拉,并给对应事件
	createMonthSelect();  //创建月份下拉，并给对应事件
	getjjrszModelByYear(withID("aboluo-yearSelect").value); //从数据库取出已经设置了的节假日的数据，例：休息，上班等
	//根据年，月，用table绘制日历。 年月变动则 重新绘制
	createTabledate(parseInt(withID("aboluo-yearSelect").value),parseInt(withID("aboluo-selectmonth").value));
	//上月下月的a标签给事件
	leftrightclick();
	//设置右边显示栏显示内容，显示栏还可以设置节假日的状态等
	setRigth(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate());
	});

//阻止冒泡
function stopBubble(e){
	if(e && e.stopPropagation){// 别的浏览器
		e.stopPropagation();
	}else{ //IE
		window.event.cancelBubble=true;
	}
}	
	//定义了yearselect并赋值,且添加事件，选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
function createSelectYear(){
	withClass("aboluo-calendar-select-year").innerHTML='<select name="aboluo-yearSelect" id="aboluo-yearSelect"></select>';
	var yearSelect= withID("aboluo-yearSelect");
	var Nowtime=new Date();
	var currYear=Nowtime.getFullYear();
	for(var i=0;i<=79;i++){
		yearSelect.options.add(new Option((i+1970)+"年",i+1970));
		if(currYear==i+1970){
		yearSelect.options[i].selected=true;
		}
	}
	yearSelect.onchange=function(e){
		var aclick=withClass("aboluo-aclick");
		//重新赋值给变全局变量,所有的带状态的日期;然后下一步将创建table,完成动态样式,
		//这里要重读数据就5个位置,选择年时,上一个月,下一个月,设置节假日button,返回今天button
		getjjrszModelByYear(withID("aboluo-yearSelect").value);
		createTabledate(withID("aboluo-yearSelect").value,withID("aboluo-selectmonth").value);
		if(aclick==""){
			//说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
			//这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
		 var pervdays1=getCurrMonthLashDay(withID("aboluo-yearSelect").value,withID("aboluo-selectmonth").value);
		    	if(new Date().getDate()>pervdays1){
					setRigth(withID("aboluo-yearSelect").value,withID("aboluo-selectmonth").value,pervdays1);	
				}else{
					setRigth(withID("aboluo-yearSelect").value,withID("aboluo-selectmonth").value,new Date().getDate());
				}
		}else{
			var adate=aclick.getAttribute("date");
			var aarr=adate.split("-");
			aarr[0]=parseInt(aarr[0]);
			aarr[1]=parseInt(aarr[1]);
			aarr[2]=parseInt(aarr[2]);
			var pervdays=getCurrMonthLashDay(withID("aboluo-yearSelect").value,withID("aboluo-selectmonth").value);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
				setRigth(withID("aboluo-yearSelect").value,withID("aboluo-selectmonth").value,aarr[2]);	
		}
		
	};
}

function getjjrszModelByYear(year){
	jjrmodelidlist=['1','2'];
	jjrmodeltimelist=['2015-08-30 00:00:00','2015-08-31 00:00:00']; //这里时间的格式为yyyy-MM-dd HH:mm:ss
	jjrmodelztlist=['1','2'];  //1为上班，2为休息
//	$.ajax({
//		type:"POST",
//		url:,
//		async:false,
//		data:{"year":year},
//		success:function(json){
//			if(json.code>0){
//				var data=json.data;
//				for(var i=0;i<data.length;i++){
//					jjrmodelidlist.push(data[i].jjr_id);
//					jjrmodeltimelist.push(data[i].jjr_time);
//					jjrmodelztlist.push(data[i].jjr_zt);
//				}
//			}
//		}
//	});
}


//创建月的下拉框，并赋值,且添加事件，选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
function createMonthSelect(){
	var selectmonth=newElement('select');
	selectmonth.name="aboluo-selectmonth";
	selectmonth.id="aboluo-selectmonth";
	selectmonth.onchange=function(e){
		var aclick=withClass("aboluo-aclick");
		createTabledate(withID("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value);
		if(aclick==""){
			//说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
			//这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
		 var pervdays1=getCurrMonthLashDay(withID("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value);
		    	if(new Date().getDate()>pervdays1){
					setRigth(withID("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value,pervdays1);	
				}else{
					setRigth(withID("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value,new Date().getDate());
				}
		}else{
			var adate=aclick.getAttribute("date");
			var aarr=adate.split("-");
			aarr[0]=parseInt(aarr[0]);
			aarr[1]=parseInt(aarr[1]);
			aarr[2]=parseInt(aarr[2]);
			var pervdays=getCurrMonthLashDay(withID("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
				setRigth(withID("aboluo-yearSelect").value,selectmonth.options[selectmonth.selectedIndex].value,aarr[2]);	
		}
	
	
	
	};
	var Nowtime=new Date();
	var currMonth=Nowtime.getMonth();
    for(var i=0;i<12;i++){
		selectmonth.options.add(new Option((i+1)+"月",i+1));
		if(currMonth==i){
			selectmonth.options[i].selected=true;
		}
	}
    var next=withClass("aboluo-month-a-next");
    var parent=next.parentNode;
    parent.insertBefore(selectmonth,next);
}


//根据传入的年月，创建对应的table日期,并且在每个td中创建a标签用于事件，与样式内边框的设置
function createTabledate(year,yue){
	var rilitabledele=withClass("aboluo-rilitbody");
	if(rilitabledele!="" && rilitabledele!=null && rilitabledele!='undefined'){
	rilitabledele.parentNode.removeChild(rilitabledele);
	}
	var rilitable=newElement('tbody');
	rilitable.setAttribute("class","aboluo-rilitbody");
	var rili=withClass("aboluo-rilitable");
	rili.appendChild(rilitable);
	//先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
	var date=setdateinfo(year,yue,1);
	var weekday=date.getDay();
	var pervLastDay;
	if(weekday!=0){
		pervLastDay=weekday-1;
	}else{
		pervLastDay=weekday+6;
	}
	//得到上个月最后一天;
	var pervMonthlastDay=getPervMonthLastDay(year,yue);
	//上月最后几天循环
	var lastdays=pervMonthlastDay-pervLastDay+1;
	var tr=newElement('tr');
	tr.style.borderBottom="1px solid #e3e4e6";
	for(var i=lastdays;i<=pervMonthlastDay;i++){
		var td=newElement("td");
		var a=getA(parseInt(yue)-1==0?parseInt(year)-1:year,parseInt(yue)-1==0?12:parseInt(yue)-1,i);
		a.style.color="#BFBFC5";
//		a.href ='javascript:pervA('+parseInt(yue)-1==0?parseInt(year)-1:year+','+parseInt(yue)-1==0?12:parseInt(yue)-1+','+i+');';
		td.appendChild(a);
		td.setAttribute("class","aboluo-pervMonthDays");
		tr.appendChild(td);
	}
	//这个月开始的循环
	var startDays=8-weekday==8?1:8-weekday;
	for(var i=1;i<=startDays;i++){
		var td=newElement("td");
		var b=getA(year,yue,i);
		td.appendChild(b);
		tr.appendChild(td);
	}
	rilitable.appendChild(tr);
	//指定年月最后一天
	var currMonthLashDay=getCurrMonthLashDay(year,yue);
	//当月除开第一行的起点
	var currmonthStartDay=currMonthLashDay-(currMonthLashDay-startDays)+1;
	//当月还剩余的天数
	var syts=currMonthLashDay-startDays;
	//循环次数
	var xhcs=0;
	if(check(syts/7)){
	//是小数
	xhcs=Math.ceil(syts/7);//向上取整
	}else{
	xhcs=syts/7;	
	}
	
	//这是下个月开始的变量;
	var jilvn=1;
	for(var i=0;i<xhcs;i++){
		var tr1=newElement('tr');
		if(i!=xhcs-1){
			tr1.style.borderBottom="1px solid #e3e4e6";
		}
		for(var n=1;n<=7;n++){
			var td=newElement('td');
			if(startDays==0){
				var c=getA(parseInt(yue)+1==parseInt(13)?parseInt(year)+1:year,parseInt(yue)+1==parseInt(13)?1:parseInt(yue)+1,jilvn);
				c.style.color="#BFBFC5";
				td.appendChild(c);
				td.setAttribute("class","aboluo-nextMonthDays");
				jilvn++;
				tr1.appendChild(td);
				continue;
			}else{
			startDays++;
			var d=getA(year,yue,startDays);
			td.appendChild(d);
				if(startDays==currMonthLashDay){
					startDays=0;
				}
			tr1.appendChild(td);	
			}
		
		}
		rilitable.appendChild(tr1);
	}
	setHolidayred();//设置星期六星期天的样式
	setTrHeight();//设置table日期的行高
	setA(); //设置td中a的事件
}



//给上一个月最后几天点击跳转月份
function pervA(year,yue,day){
	createTabledate(year,yue);  //创建对应的table(日期)
	setRigth(year,yue,day);    //设置右边明细栏内容
	updateSelect(year,yue);    //改变年月select值
}

//给上一个月最后几天点击跳转月份
function nextA(year,yue,day){
	createTabledate(year,yue);
	setRigth(year,yue,day);
	updateSelect(year,yue);
}

function updateSelect(year,yue){
	var selectmonth=withID("aboluo-selectmonth");
	var selectyear=withID("aboluo-yearSelect");
	selectmonth.value=yue;
	selectyear.value=year;
}



//遍历table将date事件等
function setHolidayred(){
	var rows=withClass("aboluo-rilitbody").rows;
	for(var i=0;i<rows.length;i++){
		for(var j=0;j<rows[i].cells.length;j++){
			var cell=rows[i].cells[j];
			var a=rows[i].cells[j].childNodes[0];
			var adate=a.getAttribute("date");
			var arr=adate.split("-");
			var date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth();
			var day=date.getDate();
			if(arr[0]==year && arr[1]==month+1 && arr[2]==day){
				cell.setAttribute("class","aboluo-tdcurrToday");
				a.setAttribute("class","aboluo-currToday");
			}
			if(j>=rows[i].cells.length-2 ){
				if(cell.getAttribute("class")!="aboluo-nextMonthDays" && cell.getAttribute("class")!="aboluo-pervMonthDays"){
					a.style.color="red";
				}
			}
		}
	}
}

//给rightdiv创建元素并赋值，根据传入的年月日给内部的元素赋值 ,月份是 1-12
function setRigth(year,yue,day){
	//先清空
	withClass("aboluo-xssj").innerHTML="";
	withClass("aboluo-ssjjr").innerHTML="";
	year=year.toString();
	yue=yue.toString();
	day=day.toString();
	//设置rigthdiv的marginleft;
	var rigthdiv=withClass("aboluo-rightdiv");
	var w=withClass("aboluo-w-700");
	rigthdiv.style.marginLeft=(w.offsetWidth*0.7+4)+"px";  //设置margin-left
	//给p中添加span显示值
	var span=newElement('span');
	var date=setdateinfo(year,yue,day);
	span.innerHTML=formatByYearyueday(year,yue,day);
	var span1=newElement('span');
	var week=getWeek(date.getDay());
	span1.innerHTML=week;
	var aboluoxssj=withClass("aboluo-xssj");
	aboluoxssj.appendChild(span);
	aboluoxssj.appendChild(span1);
	var currday=withClass("aboluo-currday");
	currday.innerHTML=day;
	currday.style.lineHeight=currday.offsetHeight+"px";    //实际在得到长宽时不能用style.height，得用.offsetHeight,但是设置的时候要用style.height=...
	var szrq=withClass("aboluo-ssjjr");
	szrq.style.marginTop="20px";
	var span2=newElement('span');
	span2.innerHTML="设置日志状态:";
	szrq.appendChild(span2);
	var szrqselect=newElement("select");
	szrqselect.style.width=(withClass("aboluo-rightdiv").offsetWidth*0.9)+"px";
	szrqselect.options.add(new Option("无","0")); //0代表还原
	//这里要判断一下如果是星期67就只能设置上班,如果是星期1-5就只能设置休息
	var bool=isweekend(year,yue,day);
	if(bool){
	szrqselect.options.add(new Option("上班","1"));
	}else{
	szrqselect.options.add(new Option("休息","2"));
	}
	szrq.appendChild(szrqselect);
	var szrqbutton=newElement('input');
	szrqbutton.type="button";
	szrqbutton.className="btn";  //设置class
	szrqbutton.value="确认";
	szrqbutton.setAttribute("onclick","javascript:aboluoSetrq();");
	szrq.appendChild(szrqbutton);
	setaclass(year,yue,day);
}

function formatByYearyueday(year,yue,day){
	year=year.toString();
	yue=yue.toString();
	day=day.toString();
	return year+"-"+(yue.length<2?'0'+yue:yue)+"-"+(day.length<2?'0'+day:day);
}

function formatByDate(date){
	date=date.substring(0,10);
	var daxx=date.toString().split("-");
	return daxx[0]+"-"+(daxx[1].length<2?'0'+daxx[1]:daxx[1])+"-"+(daxx[2].length<2?'0'+daxx[2]:daxx[2]);
}

//给tbody中的td中的A设置事件，上个月的天数,这个月的天数,下个月的天数三种对应的事件
//这里还有个功能就是判断当前的A中日期是不是数据库中有带状态的日期,如果是就给相当的样式
function setA(){
	var tbody=withClass("aboluo-rilitbody");
	var arr=tbody.getElementsByTagName("a");
	for(var i=0;i<arr.length;i++){
		var date=arr[i].getAttribute("date");
		var datearr=date.split("-");
			if(arr[i].parentNode.className=="aboluo-pervMonthDays"){
			arr[i].setAttribute("onclick","javascript:pervA("+datearr[0]+","+datearr[1]+","+datearr[2]+",this);javascript:stopBubble(this);")
			}else if(arr[i].parentNode.className=="aboluo-nextMonthDays"){
				arr[i].setAttribute("onclick","javascript:nextA("+datearr[0]+","+datearr[1]+","+datearr[2]+",this);javascript:stopBubble(this);")	
			}else{
			arr[i].setAttribute("onclick","javascript:setRigth("+datearr[0]+","+datearr[1]+","+datearr[2]+");javascript:stopBubble(this);");
			}
		for(var n=0;n<jjrmodelidlist.length;n++){
			if(formatByDate(jjrmodeltimelist[n])==formatByDate(date)){
				if(jjrmodelztlist[n]==1){ //1上班
					var span=newElement('span');
					span.setAttribute("class","aboluo-td-a-ban");
					arr[i].style.background="#f5f5f5";
					arr[i].setAttribute("ztid",jjrmodelidlist[n]);
					arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
					span.innerHTML="班";
					arr[i].appendChild(span);
				}else if(jjrmodelztlist[n]==2){ //2休息
					var span=newElement('span');
					span.setAttribute("class","aboluo-td-a-xiu");
					arr[i].setAttribute("ztid",jjrmodelidlist[n]);
					arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
					arr[i].style.background="#fff0f0";
					span.innerHTML="休";
					arr[i].appendChild(span);
				}else if(jjrmodelztlist[n]==0){ // 这里为了保证操作过的节假日的唯一性,不给样式只设置a的ztid
					arr[i].setAttribute("ztid",jjrmodelidlist[n]);
					arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
				}
			}
		}	
	}
}

//a点击选中样式,先清除再设置选中样式
function setaclass(year,yue,day){
	var a=withClass("aboluo-aclick");
		a.className="";
		var date=new Date();
		var year1=date.getFullYear();
		var month1=date.getMonth();
		var day1=date.getDate();
		if(year1==year && yue==month1+1 && day1==day){
		}else{
			var tbody=withClass("aboluo-rilitbody");
			var arr=tbody.getElementsByTagName("a");
			for(var i=0;i<arr.length;i++){
				var date=arr[i].getAttribute("date");
				var datearr=date.split("-");
				if(datearr[0]==year && datearr[1]==yue && datearr[2]==day){
					arr[i].setAttribute("class","aboluo-aclick");
				}
			}
		}

}


//获取当前选取的日期
function getAclickDomDate(){
	var aclick=withClass("aboluo-aclick");
	if(aclick==""){
		//说明没选,那么就给当天,按12月算
		var date=new Date();
		return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	}else{
		return aclick.getAttribute("date");
	}
}

//获取当前选中的a元素
function getAclickDom(){
	var aclick=withClass("aboluo-aclick");
	if(aclick==""){
		//说明没选,那么就给当天,按12月算
		return withClass("aboluo-currToday");
	}else{
		return aclick;
	}
}


//创建元素
function newElement(val){
	return document.createElement(val);
}

//创建date对象并赋值
function setdateinfo(year,yue,day){
	var date=new Date();
	date.setFullYear(parseInt(year));
	date.setMonth(parseInt(yue)-1);
	date.setDate(parseInt(day));
	return date;
}

//根据年月日判断是不是星期六星期天 //yue 按12算
function isweekend(year,yue,day){
	var date=new Date();
	date.setFullYear(year);
	date.setMonth(yue-1);
	date.setDate(day);
	var week=date.getDay();
	if(week==0 || week==6){
		return true;
	}
	return false;
}

//根据getDay()返回对应的星期字符串
function getWeek(val){
	var weekxq=new Array();
	weekxq[0]="星期日";
	weekxq[1]="星期一";
	weekxq[2]="星期二";
	weekxq[3]="星期三";
	weekxq[4]="星期四";
	weekxq[5]="星期五";
	weekxq[6]="星期六";
	return weekxq[val];
}

//判断c是否是小数
function check(c){
	var r=/^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
	return r.test(c);
}

//得到指定月的上个月最后一天传进来按 12月算
function getPervMonthLastDay(year,yue){
	//当月就是  yue-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
	return parseInt(new Date(year,yue-1,0).getDate());
}

//得到指定月最后一天 传进来按 12月算
function getCurrMonthLashDay(year,yue){
	if(yue>=12){
		year=year+1;
		yue=yue-12;
	}
	return parseInt(new Date(year,yue,0).getDate());
}


//创建a标签并设置公用属性
function getA(year,yue,day){
	var a=newElement("a");
	a.href="javascript:;";
	a.innerHTML=day;
	a.style.textDecoration="none";
	a.setAttribute("date",year+"-"+yue+"-"+day);
	return a;
}



//给左右的a添加事件
function leftrightclick(){
	var lefta=withClass("aboluo-month-a-perv");
	var righta=withClass("aboluo-month-a-next");
	righta.onclick=function(){
		var monthselect=withID("aboluo-selectmonth");
		var monthvalue=parseInt(monthselect.value);
		var yearselect=withID("aboluo-yearSelect");
		var yearvalue=parseInt(yearselect.value)
		if(monthvalue==12){
			yearvalue+=1;
			//这里已经变了一年了,所以就要根据年重读数据
			getjjrszModelByYear(yearvalue);
			monthvalue=1;
		}else{
			monthvalue+=1;
		}
		monthselect.value=monthvalue;
		yearselect.value=yearvalue;
		var aclick=withClass("aboluo-aclick");
		createTabledate(yearselect.value,monthselect.value);
		
		//如果没有找到这个class说明没有点击或是点击的当天
		if(aclick==""){
		var pervdays1=getCurrMonthLashDay(yearselect.value,monthselect.value+1);
			if(new Date().getDate()>pervdays1){
				setRigth(yearselect.value,monthselect.value,pervdays1);	
			}else{
				setRigth(yearselect.value,monthselect.value,new Date().getDate());
			}
		}else{
		var adate=aclick.getAttribute("date");
		var aarr=adate.split("-");
		aarr[0]=parseInt(aarr[0]);
		aarr[1]=parseInt(aarr[1]);
		aarr[2]=parseInt(aarr[2]);
		var pervdays=getCurrMonthLashDay(aarr[0],aarr[1]+1);
		if(aarr[2]>pervdays){
			aarr[2]=pervdays;
		}
		setRigth(aarr[1]+1==13?aarr[0]+1:aarr[0],aarr[1]+1==13?1:aarr[1]+1,aarr[2]);	
		}
	}
	lefta.onclick=function(){
		var monthselect=withID("aboluo-selectmonth");
		var monthvalue=parseInt(monthselect.value);
		var yearselect=withID("aboluo-yearSelect");
		var yearvalue=parseInt(yearselect.value)
		if(monthvalue==1){
			yearvalue-=1;
			//这里已经变了一年了,所以就要根据年重读数据
			getjjrszModelByYear(yearvalue);
			monthvalue=12;
		}else{
			monthvalue-=1;
		}
		monthselect.value=monthvalue;
		yearselect.value=yearvalue;
		var aclick=withClass("aboluo-aclick");
		createTabledate(yearselect.value,monthselect.value);
		//如果没有找到这个class说明没有点击或是点击的当天
		if(aclick==""){
		//这个时候向上一个月,那么	
		var pervdays1=getPervMonthLastDay(yearselect.value,monthselect.value);
			if(new Date().getDate()>pervdays1){
				setRigth(yearselect.value,monthselect.value,pervdays1);	
			}else{
				setRigth(yearselect.value,monthselect.value,new Date().getDate());
			}
		}else{
		var adate=aclick.getAttribute("date");
		var aarr=adate.split("-");
		aarr[0]=parseInt(aarr[0]);
		aarr[1]=parseInt(aarr[1]);
		aarr[2]=parseInt(aarr[2]);
		var pervdays=getPervMonthLastDay(aarr[0],aarr[1]);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
		setRigth(aarr[1]-1==0?aarr[0]-1:aarr[0],aarr[1]-1==0?12:aarr[1]-1,aarr[2]);	
		}
	}
	
	var today=withClass("aboluo-toToday");
	today.onclick=function(){
		var monthselect=withID("aboluo-selectmonth");
		var yearselect=withID("aboluo-yearSelect");
		var date=new Date();
		monthselect.value=date.getMonth()+1;
		yearselect.value=date.getFullYear();
		getjjrszModelByYear(date.getFullYear());
		createTabledate(yearselect.value,monthselect.value);
		setRigth(date.getFullYear(),date.getMonth()+1,date.getDate());
		
	}
}

//动态设置tr高度,动态给td中的A设置高度与宽度
function setTrHeight(){
	var table=withClass("aboluo-rilidiv");
	var thead=withClass("aboluo-rilithead");
	var tbody=withClass("aboluo-rilitbody");
	var tbodyheight=table.offsetHeight-thead.offsetHeight;
	var rows=tbody.getElementsByTagName('tr');
	for(var i=0;i<rows.length;i++){
		rows[i].style.height=(tbodyheight/rows.length-2)+"px";
		var tds=rows[i].getElementsByTagName("td");
		for(var j=0;j<tds.length;j++){
			var a=tds[j].childNodes[0];
			a.style.width=(tds[j].offsetWidth-10)+"px";
			a.style.height=(tds[j].offsetHeight-7)+"px";
			a.style.lineHeight=(tds[j].offsetHeight-7)+"px";
		}
	}
}
//得到id对象
function withID(id){
	return document.getElementById(id);
}
//得到传入参数为class的对象(同名返回第一个)
function withClass(id){
	var targets= targets ||  document.getElementsByTagName("*");
	var list=[];
	for(var k in targets){
		var target=targets[k];
		if(target.className==id){
			return target;
		}
	}
	return "";
}

//设置选中的日期做什么操作
function aboluoSetrq(){
	//选中的日期
	var curra=getAclickDom();
	var date=curra.getAttribute("date");  //得到日期
	var ztid=curra.getAttribute("ztid"); //得到ztid，如果空，就是新增,不为空是修改
	var jjrzt=curra.getAttribute("jjrzt");  //节假日当前状态
	var szjjr=withClass("aboluo-ssjjr");    //要设置的当前日期状态
	var a=szjjr.childNodes[1];
	$.ajax({
		   type:"POST",
	   	   url: '',
		   data:{"date":date,"zt":szjjr.childNodes[1].value,"ztid":ztid,"jjrzt":jjrzt}, //这里用ajax可以改变状态
		   async:false,
		   success:function(json){
			   if(json.code>0){
				   var date=getAclickDomDate();
				   var datearr=date.split("-");
				    getjjrszModelByYear(datearr[0]);
					createTabledate(datearr[0],datearr[1]);  //创建对应的table(日期)
					setRigth(datearr[0],datearr[1],datearr[2]);    //设置右边明细栏内容
			   }else{
				  alert("设置失败");
			   }
		   },
		   error:function(json){
			   alert("设置失败");
		   }
	});
}
/* 代码整理：懒人之家 www.lanrenzhijia.com */