var youdao = window.youdao || {};
(function() {
	youdao.script = document.createElement("script");
	youdao.script.type = "text/javascript";
	youdao.script.async = true;
	youdao.script.src = "http://conv.youdao.com/pub/conversion.js";
	var a = document.getElementsByTagName("script")[0];
	a.parentNode.insertBefore(youdao.script, a)
})();