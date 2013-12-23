window.onerror = function(){return true;};
if(!live800)var live800={};
if(!live800.Sys){live800.Sys={};}
if(!live800.utils){live800.utils={};}

var isMobile = (function(a){
	if(a) a=a.toLowerCase();
	var deviceKeys=["iPhone","iPad","iPod","Android","Mobile","Linux","SymbianOS","BlackBerry","Phone"];
	for ( var i = 0; i < deviceKeys.length; i++) {
		var index =a.indexOf(deviceKeys[i].toLowerCase());
		if(index!=-1){
			return true;
		}		
	}
	return false;
})(navigator.userAgent);
var isSougou = (function(a){
	if(a) a=a.toLowerCase();
	var index = a.indexOf("se 2.x");
	if(index!=-1){
		return true;
	}else return false;
})(navigator.userAgent);
var isyl = (typeof releaseVersion !="undefined")&&releaseVersion=="yl";
var isOpenNewTab = isMobile||isSougou||isyl;

//proxy function 
if(live800_codeType=="steady"){
	if (!window.Sys){
		window.Sys=live800.Sys;	
	}else{
		if(!window.Sys.getObj)window.Sys.getObjt=live800.Sys.getObj;
	}
};
/**
 * Sys utils
 */
live800.navigateToUrl=function(url,targetWndName,attr,aTag){
	if(typeof live800_Language!="undefined"){
			url += "&lan=" + live800_Language;
		}
	try{parent.closeMini();}catch(e){;}
	if(isOpenNewTab){//alert(url);
		aTag.setAttribute('href',url);
		//alert(aTag.getAttribute('href'))
		return true;
	}
	var wnd,link=document.getElementById("live800:link");
	if(document.all&&isNeedCheckDomainBinding){
		if(document.URL.indexOf("preview.jsp")>-1){
			wnd=window.open(url,targetWndName,attr);
		}else{
			try {
				wnd=window.open("about:blank",targetWndName,attr);
				link.target=targetWndName;
				link.href=url;
				link.click();	
			} catch (e) {
				//wnd=window.open(url,name,attr);
			}
		}
	}else{
		wnd=window.open(url,targetWndName,attr);
	}
	if(typeof wnd !="undefined"){
		wnd.focus();
	}	
	return false;
};
live800.Sys.urlDecode=function(str){
	if("undefined" == typeof decodeURIComponent){
		return unescape(str).replace(/\+/g, ' ').replace(/%2B/g,'+');
  	} else {
		return unescape(str).replace(/\+/g, ' ').replace(/%2B/g,'+');
  	}
};
live800.Sys.getObj=function(id){
	return document.getElementById(id);
};
live800.Sys.urlToParams=function(urlContent){
	cmdMap = new Array();
	cmdParams = new Array();
    pos = -1;
    while (true)
	{
        newPos = urlContent.indexOf('&', pos+1);
        if (newPos>=0) {
            encodedProperty = urlContent.substring(pos+1, newPos);
        }
        else {
            encodedProperty = urlContent.substring(pos+1, urlContent.length);
        }

        equalsPos = encodedProperty.indexOf('=');
        paramName = encodedProperty.substring(0, equalsPos);
        paramValue = live800.Sys.urlDecode(encodedProperty.substring(equalsPos+1, encodedProperty.length));

        cmdParams[paramName] = paramValue;

        if (newPos==-1) {
            break;
        }
        pos = newPos;
    }
	return cmdParams;
};
live800.utils.paramsToUrl=function(params){
	var urlString="";
	for(var i in params){
		if(params[i]!=""){
			urlString+=params[i]+"&";
		}
	}
	   var pagereferrinsession=utils.getCookie("pageReferrInSession");
		if(pagereferrinsession==null || pagereferrinsession==" ")pagereferrinsession="";
		pagereferrinsession = "pagereferrer="+utils.URLEncode(pagereferrinsession);
		if(pagereferrinsession != ''){
		urlString += pagereferrinsession+"&";
		}
	return urlString.substring(0,urlString.length-1);
};
live800.utils.setCookie=function(name,value){
	if(typeof(value)=="undefined")return;
	var Days = 30;
    var exp  = new Date();    //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};
live800.utils.getCookie=function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	arr=document.cookie.match(reg);
    if(arr){return unescape(arr[2]);}else{return null;}
};
live800.utils.isCookie=function(){
        document.cookie = "testcookie=testvalue";
		var cookiestr = new String(document.cookie);
		var cookiename = "testcookie=testvalue";
		var beginpos = cookiestr.indexOf(cookiename);
		if (beginpos != -1) {
			return true;
		} else {
			return false;
		}
};
live800.utils.setSessionCookie=function(name,value){
	  document.cookie = name + "="+ escape (value);
};
live800.utils.delCookie=function(name){
	 var exp = new Date();
        exp.setTime(exp.getTime() - 1);
   	 var cval=this.getCookie(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
};
live800.utils.setLiveCookie=function(){
	this.delCookie("operatorId");
	this.delCookie("skillId");
	var params=live800.params;
	if(typeof params["live800_operator"]!="undefined"&&params["live800_operator"].length!=0&&params["live800_operator"]!="undefined")
	{
		this.setCookie("operatorId",params["live800_operator"]);
	}
	if(typeof params["live800_skill"]!="undefined"&&params["live800_skill"].length!=0&&params["live800_skill"]!="undefined")
	{
		this.setCookie("skillId",params["live800_skill"]);
	}
};
live800.utils.getGid=function(){
	if(typeof jid!="undefined"){
		return "jid="+jid;
	}else{
	return "";
	}
};
live800.utils.getParam=function(){
	var url="";
	var params = live800.Sys.urlToParams(live800_configContent);
	if(typeof params["live800_operator"]!="undefined"&&params["live800_operator"].length!=0&&params["live800_operator"]!="undefined"){
		url="operatorId="+params["live800_operator"];
	}
	if(typeof params["live800_skill"]!="undefined"&&params["live800_skill"].length!=0&&params["live800_skill"]!="undefined"){
		url=url+"skillId="+params["live800_skill"];
	}
	return url;
};
live800.utils.getTrustfulVisitorInfo=function(){
	var visitorInfoUrl="";
	if(typeof trustfulInfo!="undefined"&&trustfulInfo.length>0&&trustfulInfo!=null&&trustfulInfo!="null"){
		visitorInfoUrl="info="+trustfulInfo;
	}
	return visitorInfoUrl;
};
live800.utils.URLEncode=function(Str){
	if(Str==null||Str==""){
    return "";}
  	var newStr="";
  function toCase(sStr){
    return sStr.toString(16).toUpperCase();
    }
  for(var i=0,icode,len=Str.length;i<len;i++){
    icode=Str.charCodeAt(i);
    if( icode<0x10){
      newStr+="%0"+icode.toString(16).toUpperCase();}
    else if(icode<0x80){
      if(icode==0x20){
        newStr+="+";}
      else if((icode>=0x30&&icode<=0x39)||(icode>=0x41&&icode<=0x5A)||(icode>=0x61&&icode<=0x7A)){
        newStr+=Str.charAt(i);}
      else{
        newStr+="%"+toCase(icode);}
      }
    else if(icode<0x800){
      newStr+="%"+toCase(0xC0+(icode>>6));
      newStr+="%"+toCase(0x80+icode%0x40);
      }
    else{
      newStr+="%"+toCase(0xE0+(icode>>12));
      newStr+="%"+toCase(0x80+(icode>>6)%0x40);
      newStr+="%"+toCase(0x80+icode%0x40);
      }
    }
  return newStr;
};
live800.utils.getEnterUrl=function(){
	var url="";
	if(enterurl=="null"){
		enterurl=document.URL;}
	url=this.URLEncode(enterurl);
	return "enterurl="+url;
};
live800.params=live800.Sys.urlToParams(live800_configContent);
live800.utils.setLiveCookie();
if(live800_companyID == null || live800_companyID == ""){throw new Error("miss companyID");}
else{
var params=live800.params;
var utils=live800.utils;
var lim_protocol=document.location.protocol.substring(0,document.location.protocol.length-1);
preferences = new Array();
preferences["companyID"] = live800_companyID;
preferences["configID"] = live800_configID;
preferences["text"] =  (params["live800_text"] !=null ? unescape(params["live800_text"]) : unescape("%u5728%u7EBF%u5BA2%u670D"));
preferences["protocol"] =(lim_protocol=="file")?"http":lim_protocol;
preferences["baseUrl"] = live800_baseUrl;
preferences["baseHtmlUrl"] = live800_baseHtmlUrl;
preferences["baseWebapp"] = live800_baseWebApp;
preferences["baseChatHtmlDir"] = live800_baseChatHtmlDir;
preferences["visitorIDInSession"] = preferences["companyID"] + "chater";
var pagetitle;
		if (document.title.length > 80) {
			pagetitle = utils.URLEncode(document.title.substring(0, 80));
		} else {
			pagetitle = utils.URLEncode(document.title);
		}
		pagetitle = "pagetitle="+pagetitle;

var urlParams={
	'jid':utils.getGid(),
	'enterUrl':utils.getEnterUrl(),
	'info':utils.getTrustfulVisitorInfo(),
	'param':utils.getParam(),
	'pagetitle':pagetitle
};

function setSessionPageReferrer(){
	var pagereferr = live800.utils.getCookie("pageReferrInSession");
	   if(pagereferr==null){
	   pagereferr = document.referrer;
	   if(pagereferr == null){
	   pagereferr = " ";
	   }
	   if(pagereferr.length > 500){
	   pagereferr = pagereferr.substring(0, 500)
	   }
	    live800.utils.setSessionCookie("pageReferrInSession",pagereferr);
	   }
	   else if (pagereferr != null&&document.referrer!=null && document.referrer != pagereferr) {
			var dfer = document.referrer;
			var regStr = /[a-zA-Z0-9\u4E00-\u9FA5][\-a-zA-Z0-9\u4E00-\u9FA5]{0,62}(\.[a-zA-Z0-9\u4E00-\u9FA5][\-a-zA-Z0-9\u4E00-\u9FA5]{0,62})+(?=\/)/gi;
			var darr = dfer.match(regStr);
			//var farr = pagereferr.match(regStr);
			if (darr && document.domain != darr[0]) {
				live800.utils.setSessionCookie("pageReferrInSession",dfer);
			}
		}
} 
setSessionPageReferrer();
var layerHtml="";
if (document.body.getAttribute('lim:initchat') != "1") {
	layerHtml += '<a id="live800iconlink" target="_blank" href="javascript:void(0)" onclick="return live800.navigateToUrl(\'' + this.preferences["protocol"] + "://" + this.preferences["baseUrl"] + this.preferences["baseWebapp"] + this.preferences["baseChatHtmlDir"] + "/chatbox.jsp?companyID=" + this.preferences["companyID"] + "&amp;configID=" + this.preferences["configID"] + "&amp;" + utils.paramsToUrl(urlParams).replace(/&/g,"&amp;") + '\', \'chatbox' + this.preferences["companyID"] + '\', globalWindowAttribute,this);">';
	layerHtml += preferences["text"].replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); 
	layerHtml += '</a>';
	if(!document.getElementById("live800:link")){
	layerHtml += "<a href='javascript:void(0);' id='live800:link' style='visibility:hidden;position:absolute;top:0px;right:0px;'>&#160;</a>";
	 }
}
function text_generate()
{	
	return layerHtml;
}
if((typeof live800_codeType)=="undefined"){live800_codeType = null;}
if(live800_codeType=="custom"||live800_codeType==null||live800_codeType==""||live800_codeType=="null"){
         // alert(layerHtml);
		if(!live800.Sys.getObj("live"+live800_configID)){
			if((typeof live800_textrenderid)=="undefined"){document.write(layerHtml);}
			else{document.getElementById(live800_textrenderid).innerHTML=layerHtml;}
		}
	}
}
if(live800.utils.getCookie("operatorId")=="undefined"){
	live800.utils.delCookie("operatorId");
}
if(live800.utils.getCookie("skillId")=="undefined"){
	live800.utils.delCookie("skillId");
}
function startFlowCapacity(){
 if(live800.utils.isCookie() && document.body.getAttribute("lim:VisitorCapacity") != "1"){
       document.body.setAttribute("lim:VisitorCapacity","1");
	   var capacityCookie = live800.utils.getCookie("VisitorCapacity");
	   if(capacityCookie == null || capacityCookie == ''){
	   var execurl = preferences["protocol"] + "://" +  preferences["baseUrl"] +  preferences["baseWebapp"]+"/SurferServer?cmd=115&companyID="+ preferences["companyID"];
	   var capacityImg =  new Image();
	   capacityImg.onload=function(){live800.utils.setSessionCookie("VisitorCapacity","1"); };
	   capacityImg.src=execurl;
		     
	   }
	 }
}
setTimeout("startFlowCapacity()",5000);
