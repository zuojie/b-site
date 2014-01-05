(function() {
	var b = "1.0.3.1";
	if (window._mvq && !(window._mvq instanceof Array)) {
		return
	}
	var d = window._mv_loader = {};
	d._cmdRunnerList = [];
	d.mv = 0;
	d.mba = 0;
	var h = new Date() - 0;
	d.random = [h + "1", h + "2", h + "3"];
	d.getRandom = function(l) {
		var k = d.random[d[l]];
		if (l == "mv") {
			d.mv++
		} else {
			d.mba++
		}
		return k
	};
	d.reg = function(k, l) {
		this._cmdRunnerList.push([k, l])
	};
	d.KD = d.cmdList = [];
	d.runCmd = function() {
		for (var n = 0, k = this._cmdRunnerList.length; n < k; n++) {
			var m = this._cmdRunnerList[n];
			m[1].apply(m[0], arguments)
		}
	};
	d.support = function(l) {
		function k(p) {
			this.runner = p
		}
		k.prototype = {
			push: function() {
				var q = arguments.length;
				for (var r = 0; r < q; r++) {
					var p = [];
					Array.prototype.push.apply(p, arguments[r]);
					var s = p.shift();
					this.runner[s] && this.runner[s].apply(this.runner, p)
				}
			}
		};
		var o = window._mv_loader,
			m = o.cmdList,
			n = new k(l);
		o.reg(n, n.push);
		n.push.apply(n, m);
		return
	};
	var i = {};
	if ("https:" == document.location.protocol) {
		var c = ["https://material-ssl.mediav.com/bjjs/mba.js", "https://static-ssl.mediav.com/mv.js", "", "", "", "https://material-ssl.mediav.com/bjjs/fpass.js"]
	} else {
		var c = ["http://material.mediav.com/bjjs/mba.js", "http://static.mediav.com/mv.js", "", "", "", "http://material.mediav.com/bjjs/fpass.js"]
	}
	var f = ["xueersi.com"];

	function e(m) {
		var o = false;
		for (var n = 0, k = f.length; n < k; n++) {
			m.indexOf(f[n]) >= 0 && (o = true)
		}
		return o
	}
	if (e(document.domain)) {
		c[1] = 0;
		c[0] = "http://material.mediav.com/bjjs/mba_xueersi.js"
	}
	if (document.domain.indexOf("yougou") >= 0) {
		c[0] = "https:" == document.location.protocol ? "https://material-ssl.mediav.com/bjjs/mba_yougou.js?20130906" : "http://material.mediav.com/bjjs/mba_yougou.js?20130906";
		c[1] = 0
	}
	if (_mvq && _mvq[0] && _mvq[0][1] == "m-21811-0") {
		if ("https:" == document.location.protocol) {
			c[2] = "https://material-ssl.mediav.com/bjjs/js/ihg_tracker.js"
		} else {
			c[2] = "http://material.mediav.com/bjjs/js/ihg_tracker.js"
		}
	}
	if (document.domain.indexOf("masamaso.com") >= 0) {
		c[1] = 0
	}
	if (_mvq && _mvq[0] && _mvq[0][1] == "m-9-1") {
		c[1] = 0;
		if ("https:" == document.location.protocol) {
			c[0] = "https://material-ssl.mediav.com/bjjs/mba_jingdong.js?1"
		} else {
			c[0] = "http://material.mediav.com/bjjs/mba_jingdong.js?1"
		}
	}

	function g(k) {
		k.sort(function(m, l) {
			if (m[0].indexOf("$setGeneral") < 0 || m[0].indexOf("$setAccount") < 0) {
				return true
			}
			if (m[0].indexOf("$logConversion") >= 0 || m[0].indexOf("$logData") >= 0) {
				return false
			}
		})
	}

	function j() {
		var q = window._mv_config = window._mv_config || {};
		n && n[0] && (q.siteid = n[0][1]);
		var p = window.mv_switch || 31;
		q.siteid && i[q.siteid] && (p = i[q.siteid]);
		var n = window._mvq;
		if (window._mvq) {
			for (var m = 0, k = n.length; m < k; m++) {
				d.runCmd.call(d, n[m]);
				d.cmdList.push(n[m])
			}
		}
		window._mvq = n = {};
		n.push = function() {
			d.runCmd.apply(d, arguments);
			Array.prototype.push.apply(d.cmdList, arguments)
		};
		for (var m = 0, k = c.length; m < k; m++) {
			if (p & Math.pow(2, m)) {
				try {
					c[m] && a(c[m])
				} catch (o) {}
			}
		}
	}

	function a(l) {
		if (!l) {
			return
		}
		var k = document.createElement("script");
		k.type = "text/javascript";
		k.async = true;
		k.src = l;
		var m = document.getElementsByTagName("script")[0];
		m.parentNode.insertBefore(k, m)
	}
	j()
})();