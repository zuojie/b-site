var live800_companyID = "210734";
var enterurl = null;
enterurl = "http://f.youdao.com/";
var isOldSkin = false;
var server_prefix_list = ['http://st10.live800.com/live800', 'http://st.live800.com/live800', 'http://st8.live800.com/live800', 'http://st16.live800.com/live800'];
var isNeedCheckDomainBinding = false;
var globalWindowAttribute = 'toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=570,height=424';
jid = "2116824014";
var live800_baseUrl = "chat10.live800.com";
var live800_baseHtmlUrl = "chat10.live800.com";
var live800_baseWebApp = "/live800";
var live800_baseChatHtmlDir = "/chatClient";
live800_Language = "zh";
live800_configID = "181500";
live800_codeType = "custom";
var live800_textrenderid = "onlineService";
live800_configContent = "live800_text=%25u5728%25u7EBF%25u54A8%25u8BE2&live800_switch=1&live800_skill=10526";
var skill = {
	id: 10526,
	isOnline: false
};

(function() {
	var live800Script = document.createElement('script');
	live800Script.type = 'text/javascript';
	var proto = 'https:' == document.location.protocol ? 'https://' : 'http://';
	live800Script.src = proto + 'st.live800.com/live800/chatClient/textStatic.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(live800Script, s);
})();