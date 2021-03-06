(function(a, b) {
	function k(a, b, f) {
		if (d[a]) throw new Error("Module " + a + " has been defined already.");
		c(b) && (f = b), d[a] = {
			factory: f,
			inited: !1
		}, a === e && j(a)
	}

	function j(a) {
		var e = {}, f = d[a];
		if (c(d[a].factory)) {
			var g = d[a].factory.apply(b, [i, e, b]);
			f.ret = g === b ? e : g
		} else f.ret = d[a].factory;
		f.inited = !0
	}

	function i(a) {
		if (!d[a]) throw new Error("Module " + a + " is not defined.");
		var b = d[a];
		b.inited === !1 && j(a);
		return b.ret
	}

	function c(a) {
		return Object.prototype.toString.call(a) === "[object Function]"
	}
	if (!a.define) {
		var d = {}, e = null,
			f = document.getElementsByTagName("script");
		for (var g = 0, h = f.length; g < h && !e; g++) e = f[g].getAttribute("data-main");
		if (!e) throw new Error("No data-main attribute in script tag.");
		a.define = k
	}
})(window);
define("lib/jquery-1.7", function(a, b) {
	(function(a, b) {
		function cA(a) {
			return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
		}

		function cx(a) {
			if (!cm[a]) {
				var b = c.body,
					d = f("<" + a + ">").appendTo(b),
					e = d.css("display");
				d.remove();
				if (e === "none" || e === "") {
					cn || (cn = c.createElement("iframe"), cn.frameBorder = cn.width = cn.height = 0), b.appendChild(cn);
					if (!co || !cn.createElement) co = (cn.contentWindow || cn.contentDocument).document, co.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), co.close();
					d = co.createElement(a), co.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cn)
				}
				cm[a] = e
			}
			return cm[a]
		}

		function cw(a, b) {
			var c = {};
			f.each(cs.concat.apply([], cs.slice(0, b)), function() {
				c[this] = a
			});
			return c
		}

		function cv() {
			ct = b
		}

		function cu() {
			setTimeout(cv, 0);
			return ct = f.now()
		}

		function cl() {
			try {
				return new a.ActiveXObject("Microsoft.XMLHTTP")
			} catch (b) {}
		}

		function ck() {
			try {
				return new a.XMLHttpRequest
			} catch (b) {}
		}

		function ce(a, c) {
			a.dataFilter && (c = a.dataFilter(c, a.dataType));
			var d = a.dataTypes,
				e = {}, g, h, i = d.length,
				j, k = d[0],
				l, m, n, o, p;
			for (g = 1; g < i; g++) {
				if (g === 1)
					for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
				l = k, k = d[g];
				if (k === "*") k = l;
				else if (l !== "*" && l !== k) {
					m = l + " " + k, n = e[m] || e["* " + k];
					if (!n) {
						p = b;
						for (o in e) {
							j = o.split(" ");
							if (j[0] === l || j[0] === "*") {
								p = e[j[1] + " " + k];
								if (p) {
									o = e[o], o === !0 ? n = p : p === !0 && (n = o);
									break
								}
							}
						}
					}!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
				}
			}
			return c
		}

		function cd(a, c, d) {
			var e = a.contents,
				f = a.dataTypes,
				g = a.responseFields,
				h, i, j, k;
			for (i in g) i in d && (c[g[i]] = d[i]);
			while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
			if (h)
				for (i in e)
					if (e[i] && e[i].test(h)) {
						f.unshift(i);
						break
					}
			if (f[0] in d) j = f[0];
			else {
				for (i in d) {
					if (!f[0] || a.converters[i + " " + f[0]]) {
						j = i;
						break
					}
					k || (k = i)
				}
				j = j || k
			} if (j) {
				j !== f[0] && f.unshift(j);
				return d[j]
			}
		}

		function cc(a, b, c, d) {
			if (f.isArray(b)) f.each(b, function(b, e) {
				c || bG.test(a) ? d(a, e) : cc(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
			});
			else if (!c && b != null && typeof b == "object")
				for (var e in b) cc(a + "[" + e + "]", b[e], c, d);
			else d(a, b)
		}

		function cb(a, c) {
			var d, e, g = f.ajaxSettings.flatOptions || {};
			for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
			e && f.extend(!0, a, e)
		}

		function ca(a, c, d, e, f, g) {
			f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
			var h = a[f],
				i = 0,
				j = h ? h.length : 0,
				k = a === bV,
				l;
			for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = ca(a, c, d, e, l, g)));
			(k || !l) && !g["*"] && (l = ca(a, c, d, e, "*", g));
			return l
		}

		function b_(a) {
			return function(b, c) {
				typeof b != "string" && (c = b, b = "*");
				if (f.isFunction(c)) {
					var d = b.toLowerCase().split(bR),
						e = 0,
						g = d.length,
						h, i, j;
					for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
				}
			}
		}

		function bE(a, b, c) {
			var d = b === "width" ? a.offsetWidth : a.offsetHeight,
				e = b === "width" ? bz : bA;
			if (d > 0) {
				c !== "border" && f.each(e, function() {
					c || (d -= parseFloat(f.css(a, "padding" + this)) || 0), c === "margin" ? d += parseFloat(f.css(a, c + this)) || 0 : d -= parseFloat(f.css(a, "border" + this + "Width")) || 0
				});
				return d + "px"
			}
			d = bB(a, b, b);
			if (d < 0 || d == null) d = a.style[b] || 0;
			d = parseFloat(d) || 0, c && f.each(e, function() {
				d += parseFloat(f.css(a, "padding" + this)) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + this + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + this)) || 0)
			});
			return d + "px"
		}

		function br(a, b) {
			b.src ? f.ajax({
				url: b.src,
				async: !1,
				dataType: "script"
			}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bi, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
		}

		function bq(a) {
			var b = (a.nodeName || "").toLowerCase();
			b === "input" ? bp(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bp)
		}

		function bp(a) {
			if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
		}

		function bo(a) {
			return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
		}

		function bn(a, b) {
			var c;
			if (b.nodeType === 1) {
				b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
				if (c === "object") b.outerHTML = a.outerHTML;
				else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
					if (c === "option") b.selected = a.defaultSelected;
					else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
				} else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
				b.removeAttribute(f.expando)
			}
		}

		function bm(a, b) {
			if (b.nodeType === 1 && !! f.hasData(a)) {
				var c, d, e, g = f._data(a),
					h = f._data(b, g),
					i = g.events;
				if (i) {
					delete h.handle, h.events = {};
					for (c in i)
						for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
				}
				h.data && (h.data = f.extend({}, h.data))
			}
		}

		function bl(a, b) {
			return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
		}

		function X(a) {
			var b = Y.split(" "),
				c = a.createDocumentFragment();
			if (c.createElement)
				while (b.length) c.createElement(b.pop());
			return c
		}

		function W(a, b, c) {
			b = b || 0;
			if (f.isFunction(b)) return f.grep(a, function(a, d) {
				var e = !! b.call(a, d, a);
				return e === c
			});
			if (b.nodeType) return f.grep(a, function(a, d) {
				return a === b === c
			});
			if (typeof b == "string") {
				var d = f.grep(a, function(a) {
					return a.nodeType === 1
				});
				if (R.test(b)) return f.filter(b, d, !c);
				b = f.filter(b, d)
			}
			return f.grep(a, function(a, d) {
				return f.inArray(a, b) >= 0 === c
			})
		}

		function V(a) {
			return !a || !a.parentNode || a.parentNode.nodeType === 11
		}

		function N() {
			return !0
		}

		function M() {
			return !1
		}

		function n(a, b, c) {
			var d = b + "defer",
				e = b + "queue",
				g = b + "mark",
				h = f._data(a, d);
			h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
				!f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
			}, 0)
		}

		function m(a) {
			for (var b in a) {
				if (b === "data" && f.isEmptyObject(a[b])) continue;
				if (b !== "toJSON") return !1
			}
			return !0
		}

		function l(a, c, d) {
			if (d === b && a.nodeType === 1) {
				var e = "data-" + c.replace(k, "-$1").toLowerCase();
				d = a.getAttribute(e);
				if (typeof d == "string") {
					try {
						d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
					} catch (g) {}
					f.data(a, c, d)
				} else d = b
			}
			return d
		}

		function h(a) {
			var b = g[a] = {}, c, d;
			a = a.split(/\s+/);
			for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
			return b
		}
		var c = a.document,
			d = a.navigator,
			e = a.location,
			f = function() {
				function K() {
					if (!e.isReady) {
						try {
							c.documentElement.doScroll("left")
						} catch (a) {
							setTimeout(K, 1);
							return
						}
						e.ready()
					}
				}
				var e = function(a, b) {
					return new e.fn.init(a, b, h)
				}, f = a.jQuery,
					g = a.$,
					h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
					j = /\S/,
					k = /^\s+/,
					l = /\s+$/,
					m = /\d/,
					n = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
					o = /^[\],:{}\s]*$/,
					p = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
					q = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
					r = /(?:^|:|,)(?:\s*\[)+/g,
					s = /(webkit)[ \/]([\w.]+)/,
					t = /(opera)(?:.*version)?[ \/]([\w.]+)/,
					u = /(msie) ([\w.]+)/,
					v = /(mozilla)(?:.*? rv:([\w.]+))?/,
					w = /-([a-z]|[0-9])/ig,
					x = /^-ms-/,
					y = function(a, b) {
						return (b + "").toUpperCase()
					}, z = d.userAgent,
					A, B, C, D = Object.prototype.toString,
					E = Object.prototype.hasOwnProperty,
					F = Array.prototype.push,
					G = Array.prototype.slice,
					H = String.prototype.trim,
					I = Array.prototype.indexOf,
					J = {};
				e.fn = e.prototype = {
					constructor: e,
					init: function(a, d, f) {
						var g, h, j, k;
						if (!a) return this;
						if (a.nodeType) {
							this.context = this[0] = a, this.length = 1;
							return this
						}
						if (a === "body" && !d && c.body) {
							this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
							return this
						}
						if (typeof a == "string") {
							a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [null, a, null] : g = i.exec(a);
							if (g && (g[1] || !d)) {
								if (g[1]) {
									d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = n.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
									return e.merge(this, a)
								}
								h = c.getElementById(g[2]);
								if (h && h.parentNode) {
									if (h.id !== g[2]) return f.find(a);
									this.length = 1, this[0] = h
								}
								this.context = c, this.selector = a;
								return this
							}
							return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
						}
						if (e.isFunction(a)) return f.ready(a);
						a.selector !== b && (this.selector = a.selector, this.context = a.context);
						return e.makeArray(a, this)
					},
					selector: "",
					jquery: "1.7",
					length: 0,
					size: function() {
						return this.length
					},
					toArray: function() {
						return G.call(this, 0)
					},
					get: function(a) {
						return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
					},
					pushStack: function(a, b, c) {
						var d = this.constructor();
						e.isArray(a) ? F.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
						return d
					},
					each: function(a, b) {
						return e.each(this, a, b)
					},
					ready: function(a) {
						e.bindReady(), B.add(a);
						return this
					},
					eq: function(a) {
						return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
					},
					first: function() {
						return this.eq(0)
					},
					last: function() {
						return this.eq(-1)
					},
					slice: function() {
						return this.pushStack(G.apply(this, arguments), "slice", G.call(arguments).join(","))
					},
					map: function(a) {
						return this.pushStack(e.map(this, function(b, c) {
							return a.call(b, c, b)
						}))
					},
					end: function() {
						return this.prevObject || this.constructor(null)
					},
					push: F,
					sort: [].sort,
					splice: [].splice
				}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
					var a, c, d, f, g, h, i = arguments[0] || {}, j = 1,
						k = arguments.length,
						l = !1;
					typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
					for (; j < k; j++)
						if ((a = arguments[j]) != null)
							for (c in a) {
								d = i[c], f = a[c];
								if (i === f) continue;
								l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
							}
						return i
				}, e.extend({
					noConflict: function(b) {
						a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
						return e
					},
					isReady: !1,
					readyWait: 1,
					holdReady: function(a) {
						a ? e.readyWait++ : e.ready(!0)
					},
					ready: function(a) {
						if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
							if (!c.body) return setTimeout(e.ready, 1);
							e.isReady = !0;
							if (a !== !0 && --e.readyWait > 0) return;
							B.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").unbind("ready")
						}
					},
					bindReady: function() {
						if (!B) {
							B = e.Callbacks("once memory");
							if (c.readyState === "complete") return setTimeout(e.ready, 1);
							if (c.addEventListener) c.addEventListener("DOMContentLoaded", C, !1), a.addEventListener("load", e.ready, !1);
							else if (c.attachEvent) {
								c.attachEvent("onreadystatechange", C), a.attachEvent("onload", e.ready);
								var b = !1;
								try {
									b = a.frameElement == null
								} catch (d) {}
								c.documentElement.doScroll && b && K()
							}
						}
					},
					isFunction: function(a) {
						return e.type(a) === "function"
					},
					isArray: Array.isArray || function(a) {
						return e.type(a) === "array"
					},
					isWindow: function(a) {
						return a && typeof a == "object" && "setInterval" in a
					},
					isNumeric: function(a) {
						return a != null && m.test(a) && !isNaN(a)
					},
					type: function(a) {
						return a == null ? String(a) : J[D.call(a)] || "object"
					},
					isPlainObject: function(a) {
						if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
						try {
							if (a.constructor && !E.call(a, "constructor") && !E.call(a.constructor.prototype, "isPrototypeOf")) return !1
						} catch (c) {
							return !1
						}
						var d;
						for (d in a);
						return d === b || E.call(a, d)
					},
					isEmptyObject: function(a) {
						for (var b in a) return !1;
						return !0
					},
					error: function(a) {
						throw a
					},
					parseJSON: function(b) {
						if (typeof b != "string" || !b) return null;
						b = e.trim(b);
						if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
						if (o.test(b.replace(p, "@").replace(q, "]").replace(r, ""))) return (new Function("return " + b))();
						e.error("Invalid JSON: " + b)
					},
					parseXML: function(c) {
						var d, f;
						try {
							a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
						} catch (g) {
							d = b
						}(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
						return d
					},
					noop: function() {},
					globalEval: function(b) {
						b && j.test(b) && (a.execScript || function(b) {
							a.eval.call(a, b)
						})(b)
					},
					camelCase: function(a) {
						return a.replace(x, "ms-").replace(w, y)
					},
					nodeName: function(a, b) {
						return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
					},
					each: function(a, c, d) {
						var f, g = 0,
							h = a.length,
							i = h === b || e.isFunction(a);
						if (d) {
							if (i) {
								for (f in a)
									if (c.apply(a[f], d) === !1) break
							} else
								for (; g < h;)
									if (c.apply(a[g++], d) === !1) break
						} else if (i) {
							for (f in a)
								if (c.call(a[f], f, a[f]) === !1) break
						} else
							for (; g < h;)
								if (c.call(a[g], g, a[g++]) === !1) break; return a
					},
					trim: H ? function(a) {
						return a == null ? "" : H.call(a)
					} : function(a) {
						return a == null ? "" : a.toString().replace(k, "").replace(l, "")
					},
					makeArray: function(a, b) {
						var c = b || [];
						if (a != null) {
							var d = e.type(a);
							a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? F.call(c, a) : e.merge(c, a)
						}
						return c
					},
					inArray: function(a, b, c) {
						var d;
						if (b) {
							if (I) return I.call(b, a, c);
							d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
							for (; c < d; c++)
								if (c in b && b[c] === a) return c
						}
						return -1
					},
					merge: function(a, c) {
						var d = a.length,
							e = 0;
						if (typeof c.length == "number")
							for (var f = c.length; e < f; e++) a[d++] = c[e];
						else
							while (c[e] !== b) a[d++] = c[e++];
						a.length = d;
						return a
					},
					grep: function(a, b, c) {
						var d = [],
							e;
						c = !! c;
						for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
						return d
					},
					map: function(a, c, d) {
						var f, g, h = [],
							i = 0,
							j = a.length,
							k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
						if (k)
							for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
						else
							for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
						return h.concat.apply([], h)
					},
					guid: 1,
					proxy: function(a, c) {
						if (typeof c == "string") {
							var d = a[c];
							c = a, a = d
						}
						if (!e.isFunction(a)) return b;
						var f = G.call(arguments, 2),
							g = function() {
								return a.apply(c, f.concat(G.call(arguments)))
							};
						g.guid = a.guid = a.guid || g.guid || e.guid++;
						return g
					},
					access: function(a, c, d, f, g, h) {
						var i = a.length;
						if (typeof c == "object") {
							for (var j in c) e.access(a, j, c[j], f, g, d);
							return a
						}
						if (d !== b) {
							f = !h && f && e.isFunction(d);
							for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
							return a
						}
						return i ? g(a[0], c) : b
					},
					now: function() {
						return (new Date).getTime()
					},
					uaMatch: function(a) {
						a = a.toLowerCase();
						var b = s.exec(a) || t.exec(a) || u.exec(a) || a.indexOf("compatible") < 0 && v.exec(a) || [];
						return {
							browser: b[1] || "",
							version: b[2] || "0"
						}
					},
					sub: function() {
						function a(b, c) {
							return new a.fn.init(b, c)
						}
						e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function d(c, d) {
							d && d instanceof e && !(d instanceof a) && (d = a(d));
							return e.fn.init.call(this, c, d, b)
						}, a.fn.init.prototype = a.fn;
						var b = a(c);
						return a
					},
					browser: {}
				}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
					J["[object " + b + "]"] = b.toLowerCase()
				}), A = e.uaMatch(z), A.browser && (e.browser[A.browser] = !0, e.browser.version = A.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? C = function() {
					c.removeEventListener("DOMContentLoaded", C, !1), e.ready()
				} : c.attachEvent && (C = function() {
					c.readyState === "complete" && (c.detachEvent("onreadystatechange", C), e.ready())
				}), typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
					return e
				});
				return e
			}(),
			g = {};
		f.Callbacks = function(a) {
			a = a ? g[a] || h(a) : {};
			var c = [],
				d = [],
				e, i, j, k, l, m = function(b) {
					var d, e, g, h, i;
					for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
				}, n = function(b, f) {
					f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
					for (; c && l < k; l++)
						if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
							e = !0;
							break
						}
					i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
				}, o = {
					add: function() {
						if (c) {
							var a = c.length;
							m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
						}
						return this
					},
					remove: function() {
						if (c) {
							var b = arguments,
								d = 0,
								e = b.length;
							for (; d < e; d++)
								for (var f = 0; f < c.length; f++)
									if (b[d] === c[f]) {
										i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
										if (a.unique) break
									}
						}
						return this
					},
					has: function(a) {
						if (c) {
							var b = 0,
								d = c.length;
							for (; b < d; b++)
								if (a === c[b]) return !0
						}
						return !1
					},
					empty: function() {
						c = [];
						return this
					},
					disable: function() {
						c = d = e = b;
						return this
					},
					disabled: function() {
						return !c
					},
					lock: function() {
						d = b, (!e || e === !0) && o.disable();
						return this
					},
					locked: function() {
						return !d
					},
					fireWith: function(b, c) {
						d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
						return this
					},
					fire: function() {
						o.fireWith(this, arguments);
						return this
					},
					fired: function() {
						return !!e
					}
				};
			return o
		};
		var i = [].slice;
		f.extend({
			Deferred: function(a) {
				var b = f.Callbacks("once memory"),
					c = f.Callbacks("once memory"),
					d = f.Callbacks("memory"),
					e = "pending",
					g = {
						resolve: b,
						reject: c,
						notify: d
					}, h = {
						done: b.add,
						fail: c.add,
						progress: d.add,
						state: function() {
							return e
						},
						isResolved: b.fired,
						isRejected: c.fired,
						then: function(a, b, c) {
							i.done(a).fail(b).progress(c);
							return this
						},
						always: function() {
							return i.done.apply(i, arguments).fail.apply(i, arguments)
						},
						pipe: function(a, b, c) {
							return f.Deferred(function(d) {
								f.each({
									done: [a, "resolve"],
									fail: [b, "reject"],
									progress: [c, "notify"]
								}, function(a, b) {
									var c = b[0],
										e = b[1],
										g;
									f.isFunction(c) ? i[a](function() {
										g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
									}) : i[a](d[e])
								})
							}).promise()
						},
						promise: function(a) {
							if (a == null) a = h;
							else
								for (var b in h) a[b] = h[b];
							return a
						}
					}, i = h.promise({}),
					j;
				for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
				i.done(function() {
					e = "resolved"
				}, c.disable, d.lock).fail(function() {
					e = "rejected"
				}, b.disable, d.lock), a && a.call(i, i);
				return i
			},
			when: function(a) {
				function m(a) {
					return function(b) {
						e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
					}
				}

				function l(a) {
					return function(c) {
						b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
					}
				}
				var b = i.call(arguments, 0),
					c = 0,
					d = b.length,
					e = Array(d),
					g = d,
					h = d,
					j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
					k = j.promise();
				if (d > 1) {
					for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
					g || j.resolveWith(j, b)
				} else j !== a && j.resolveWith(j, d ? [a] : []);
				return k
			}
		}), f.support = function() {
			var a = c.createElement("div"),
				b = c.documentElement,
				d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
			a.setAttribute("className", "t"), a.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>", d = a.getElementsByTagName("*"), e = a.getElementsByTagName("a")[0];
			if (!d || !d.length || !e) return {};
			g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = a.getElementsByTagName("input")[0], k = {
				leadingWhitespace: a.firstChild.nodeType === 3,
				tbody: !a.getElementsByTagName("tbody").length,
				htmlSerialize: !! a.getElementsByTagName("link").length,
				style: /top/.test(e.getAttribute("style")),
				hrefNormalized: e.getAttribute("href") === "/a",
				opacity: /^0.55/.test(e.style.opacity),
				cssFloat: !! e.style.cssFloat,
				unknownElems: !! a.getElementsByTagName("nav").length,
				checkOn: i.value === "on",
				optSelected: h.selected,
				getSetAttribute: a.className !== "t",
				enctype: !! c.createElement("form").enctype,
				submitBubbles: !0,
				changeBubbles: !0,
				focusinBubbles: !1,
				deleteExpando: !0,
				noCloneEvent: !0,
				inlineBlockNeedsLayout: !1,
				shrinkWrapBlocks: !1,
				reliableMarginRight: !0
			}, i.checked = !0, k.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, k.optDisabled = !h.disabled;
			try {
				delete a.test
			} catch (v) {
				k.deleteExpando = !1
			}!a.addEventListener && a.attachEvent && a.fireEvent && (a.attachEvent("onclick", function() {
				k.noCloneEvent = !1
			}), a.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), k.radioValue = i.value === "t", i.setAttribute("checked", "checked"), a.appendChild(i), l = c.createDocumentFragment(), l.appendChild(a.lastChild), k.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, a.innerHTML = "", a.style.width = a.style.paddingLeft = "1px", m = c.getElementsByTagName("body")[0], o = c.createElement(m ? "div" : "body"), p = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, m && f.extend(p, {
				position: "absolute",
				left: "-999px",
				top: "-999px"
			});
			for (t in p) o.style[t] = p[t];
			o.appendChild(a), n = m || b, n.insertBefore(o, n.firstChild), k.appendChecked = i.checked, k.boxModel = a.offsetWidth === 2, "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, k.inlineBlockNeedsLayout = a.offsetWidth === 2, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", k.shrinkWrapBlocks = a.offsetWidth !== 2), a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", q = a.getElementsByTagName("td"), u = q[0].offsetHeight === 0, q[0].style.display = "", q[1].style.display = "none", k.reliableHiddenOffsets = u && q[0].offsetHeight === 0, a.innerHTML = "", c.defaultView && c.defaultView.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", a.appendChild(j), k.reliableMarginRight = (parseInt((c.defaultView.getComputedStyle(j, null) || {
				marginRight: 0
			}).marginRight, 10) || 0) === 0);
			if (a.attachEvent)
				for (t in {
					submit: 1,
					change: 1,
					focusin: 1
				}) s = "on" + t, u = s in a, u || (a.setAttribute(s, "return;"), u = typeof a[s] == "function"), k[t + "Bubbles"] = u;
			f(function() {
				var a, b, d, e, g, h, i = 1,
					j = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
					l = "visibility:hidden;border:0;",
					n = "style='" + j + "border:5px solid #000;padding:0;'",
					p = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>";
				m = c.getElementsByTagName("body")[0], !m || (a = c.createElement("div"), a.style.cssText = l + "width:0;height:0;position:static;top:0;margin-top:" + i + "px", m.insertBefore(a, m.firstChild), o = c.createElement("div"), o.style.cssText = j + l, o.innerHTML = p, a.appendChild(o), b = o.firstChild, d = b.firstChild, g = b.nextSibling.firstChild.firstChild, h = {
					doesNotAddBorder: d.offsetTop !== 5,
					doesAddBorderForTableAndCells: g.offsetTop === 5
				}, d.style.position = "fixed", d.style.top = "20px", h.fixedPosition = d.offsetTop === 20 || d.offsetTop === 15, d.style.position = d.style.top = "", b.style.overflow = "hidden", b.style.position = "relative", h.subtractsBorderForOverflowNotVisible = d.offsetTop === -5, h.doesNotIncludeMarginInBodyOffset = m.offsetTop !== i, m.removeChild(a), o = a = null, f.extend(k, h))
			}), o && (o.innerHTML = "", n.removeChild(o)), o = l = g = h = m = j = a = i = null;
			return k
		}(), f.boxModel = f.support.boxModel;
		var j = /^(?:\{.*\}|\[.*\])$/,
			k = /([A-Z])/g;
		f.extend({
			cache: {},
			uuid: 0,
			expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
			noData: {
				embed: !0,
				object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
				applet: !0
			},
			hasData: function(a) {
				a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
				return !!a && !m(a)
			},
			data: function(a, c, d, e) {
				if ( !! f.acceptData(a)) {
					var g, h, i, j = f.expando,
						k = typeof c == "string",
						l = a.nodeType,
						m = l ? f.cache : a,
						n = l ? a[f.expando] : a[f.expando] && f.expando,
						o = c === "events";
					if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
					n || (l ? a[f.expando] = n = ++f.uuid : n = f.expando), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
					if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
					g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
					if (o && !h[c]) return g.events;
					k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
					return i
				}
			},
			removeData: function(a, b, c) {
				if ( !! f.acceptData(a)) {
					var d, e, g, h = f.expando,
						i = a.nodeType,
						j = i ? f.cache : a,
						k = i ? a[f.expando] : f.expando;
					if (!j[k]) return;
					if (b) {
						d = c ? j[k] : j[k].data;
						if (d) {
							f.isArray(b) ? b = b : b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" "));
							for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
							if (!(c ? m : f.isEmptyObject)(d)) return
						}
					}
					if (!c) {
						delete j[k].data;
						if (!m(j[k])) return
					}
					f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[f.expando] : a.removeAttribute ? a.removeAttribute(f.expando) : a[f.expando] = null)
				}
			},
			_data: function(a, b, c) {
				return f.data(a, b, c, !0)
			},
			acceptData: function(a) {
				if (a.nodeName) {
					var b = f.noData[a.nodeName.toLowerCase()];
					if (b) return b !== !0 && a.getAttribute("classid") === b
				}
				return !0
			}
		}), f.fn.extend({
			data: function(a, c) {
				var d, e, g, h = null;
				if (typeof a == "undefined") {
					if (this.length) {
						h = f.data(this[0]);
						if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
							e = this[0].attributes;
							for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
							f._data(this[0], "parsedAttrs", !0)
						}
					}
					return h
				}
				if (typeof a == "object") return this.each(function() {
					f.data(this, a)
				});
				d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
				if (c === b) {
					h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
					return h === b && d[1] ? this.data(d[0]) : h
				}
				return this.each(function() {
					var b = f(this),
						e = [d[0], c];
					b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
				})
			},
			removeData: function(a) {
				return this.each(function() {
					f.removeData(this, a)
				})
			}
		}), f.extend({
			_mark: function(a, b) {
				a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
			},
			_unmark: function(a, b, c) {
				a !== !0 && (c = b, b = a, a = !1);
				if (b) {
					c = c || "fx";
					var d = c + "mark",
						e = a ? 0 : (f._data(b, d) || 1) - 1;
					e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
				}
			},
			queue: function(a, b, c) {
				var d;
				if (a) {
					b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
					return d || []
				}
			},
			dequeue: function(a, b) {
				b = b || "fx";
				var c = f.queue(a, b),
					d = c.shift(),
					e = {};
				d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
					f.dequeue(a, b)
				}, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
			}
		}), f.fn.extend({
			queue: function(a, c) {
				typeof a != "string" && (c = a, a = "fx");
				return c === b ? f.queue(this[0], a) : this.each(function() {
					var b = f.queue(this, a, c);
					a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
				})
			},
			dequeue: function(a) {
				return this.each(function() {
					f.dequeue(this, a)
				})
			},
			delay: function(a, b) {
				a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
				return this.queue(b, function(b, c) {
					var d = setTimeout(b, a);
					c.stop = function() {
						clearTimeout(d)
					}
				})
			},
			clearQueue: function(a) {
				return this.queue(a || "fx", [])
			},
			promise: function(a, c) {
				function m() {
					--h || d.resolveWith(e, [e])
				}
				typeof a != "string" && (c = a, a = b), a = a || "fx";
				var d = f.Deferred(),
					e = this,
					g = e.length,
					h = 1,
					i = a + "defer",
					j = a + "queue",
					k = a + "mark",
					l;
				while (g--)
					if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
				m();
				return d.promise()
			}
		});
		var o = /[\n\t\r]/g,
			p = /\s+/,
			q = /\r/g,
			r = /^(?:button|input)$/i,
			s = /^(?:button|input|object|select|textarea)$/i,
			t = /^a(?:rea)?$/i,
			u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
			v = f.support.getSetAttribute,
			w, x, y;
		f.fn.extend({
			attr: function(a, b) {
				return f.access(this, a, b, !0, f.attr)
			},
			removeAttr: function(a) {
				return this.each(function() {
					f.removeAttr(this, a)
				})
			},
			prop: function(a, b) {
				return f.access(this, a, b, !0, f.prop)
			},
			removeProp: function(a) {
				a = f.propFix[a] || a;
				return this.each(function() {
					try {
						this[a] = b, delete this[a]
					} catch (c) {}
				})
			},
			addClass: function(a) {
				var b, c, d, e, g, h, i;
				if (f.isFunction(a)) return this.each(function(b) {
					f(this).addClass(a.call(this, b, this.className))
				});
				if (a && typeof a == "string") {
					b = a.split(p);
					for (c = 0, d = this.length; c < d; c++) {
						e = this[c];
						if (e.nodeType === 1)
							if (!e.className && b.length === 1) e.className = a;
							else {
								g = " " + e.className + " ";
								for (h = 0, i = b.length; h < i; h++)~ g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
								e.className = f.trim(g)
							}
					}
				}
				return this
			},
			removeClass: function(a) {
				var c, d, e, g, h, i, j;
				if (f.isFunction(a)) return this.each(function(b) {
					f(this).removeClass(a.call(this, b, this.className))
				});
				if (a && typeof a == "string" || a === b) {
					c = (a || "").split(p);
					for (d = 0, e = this.length; d < e; d++) {
						g = this[d];
						if (g.nodeType === 1 && g.className)
							if (a) {
								h = (" " + g.className + " ").replace(o, " ");
								for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
								g.className = f.trim(h)
							} else g.className = ""
					}
				}
				return this
			},
			toggleClass: function(a, b) {
				var c = typeof a,
					d = typeof b == "boolean";
				return f.isFunction(a) ? this.each(function(c) {
					f(this).toggleClass(a.call(this, c, this.className, b), b)
				}) : this.each(function() {
					if (c === "string") {
						var e, g = 0,
							h = f(this),
							i = b,
							j = a.split(p);
						while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
					} else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
				})
			},
			hasClass: function(a) {
				var b = " " + a + " ",
					c = 0,
					d = this.length;
				for (; c < d; c++)
					if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
				return !1
			},
			val: function(a) {
				var c, d, e, g = this[0];
				if (!arguments.length) {
					if (g) {
						c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
						if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
						d = g.value;
						return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
					}
					return b
				}
				e = f.isFunction(a);
				return this.each(function(d) {
					var g = f(this),
						h;
					if (this.nodeType === 1) {
						e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
							return a == null ? "" : a + ""
						})), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
						if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
					}
				})
			}
		}), f.extend({
			valHooks: {
				option: {
					get: function(a) {
						var b = a.attributes.value;
						return !b || b.specified ? a.value : a.text
					}
				},
				select: {
					get: function(a) {
						var b, c, d, e, g = a.selectedIndex,
							h = [],
							i = a.options,
							j = a.type === "select-one";
						if (g < 0) return null;
						c = j ? g : 0, d = j ? g + 1 : i.length;
						for (; c < d; c++) {
							e = i[c];
							if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
								b = f(e).val();
								if (j) return b;
								h.push(b)
							}
						}
						return j && !h.length && i.length ? f(i[g]).val() : h
					},
					set: function(a, b) {
						var c = f.makeArray(b);
						f(a).find("option").each(function() {
							this.selected = f.inArray(f(this).val(), c) >= 0
						}), c.length || (a.selectedIndex = -1);
						return c
					}
				}
			},
			attrFn: {
				val: !0,
				css: !0,
				html: !0,
				text: !0,
				data: !0,
				width: !0,
				height: !0,
				offset: !0
			},
			attr: function(a, c, d, e) {
				var g, h, i, j = a.nodeType;
				if (!a || j === 3 || j === 8 || j === 2) return b;
				if (e && c in f.attrFn) return f(a)[c](d);
				if ("getAttribute" in a) {
					i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
					if (d !== b) {
						if (d === null) {
							f.removeAttr(a, c);
							return b
						}
						if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
						a.setAttribute(c, "" + d);
						return d
					}
					if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
					g = a.getAttribute(c);
					return g === null ? b : g
				}
				return f.prop(a, c, d)
			},
			removeAttr: function(a, b) {
				var c, d, e, g, h = 0;
				if (a.nodeType === 1) {
					d = (b || "").split(p), g = d.length;
					for (; h < g; h++) e = d[h].toLowerCase(), c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1)
				}
			},
			attrHooks: {
				type: {
					set: function(a, b) {
						if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
						else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
							var c = a.value;
							a.setAttribute("type", b), c && (a.value = c);
							return b
						}
					}
				},
				value: {
					get: function(a, b) {
						return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null
					},
					set: function(a, b, c) {
						if (w && f.nodeName(a, "button")) return w.set(a, b, c);
						a.value = b
					}
				}
			},
			propFix: {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			prop: function(a, c, d) {
				var e, g, h, i = a.nodeType;
				if (!a || i === 3 || i === 8 || i === 2) return b;
				h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
				return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
			},
			propHooks: {
				tabIndex: {
					get: function(a) {
						var c = a.getAttributeNode("tabindex");
						return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
					}
				}
			}
		}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
			get: function(a, c) {
				var d, e = f.prop(a, c);
				return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
			},
			set: function(a, b, c) {
				var d;
				b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
				return c
			}
		}, v || (y = {
			name: !0,
			id: !0
		}, w = f.valHooks.button = {
			get: function(a, c) {
				var d;
				d = a.getAttributeNode(c);
				return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
			},
			set: function(a, b, d) {
				var e = a.getAttributeNode(d);
				e || (e = c.createAttribute(d), a.setAttributeNode(e));
				return e.nodeValue = b + ""
			}
		}, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function(a, b) {
			f.attrHooks[b] = f.extend(f.attrHooks[b], {
				set: function(a, c) {
					if (c === "") {
						a.setAttribute(b, "auto");
						return c
					}
				}
			})
		}), f.attrHooks.contenteditable = {
			get: w.get,
			set: function(a, b, c) {
				b === "" && (b = "false"), w.set(a, b, c)
			}
		}), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
			f.attrHooks[c] = f.extend(f.attrHooks[c], {
				get: function(a) {
					var d = a.getAttribute(c, 2);
					return d === null ? b : d
				}
			})
		}), f.support.style || (f.attrHooks.style = {
			get: function(a) {
				return a.style.cssText.toLowerCase() || b
			},
			set: function(a, b) {
				return a.style.cssText = "" + b
			}
		}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
			get: function(a) {
				var b = a.parentNode;
				b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
				return null
			}
		})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
			f.valHooks[this] = {
				get: function(a) {
					return a.getAttribute("value") === null ? "on" : a.value
				}
			}
		}), f.each(["radio", "checkbox"], function() {
			f.valHooks[this] = f.extend(f.valHooks[this], {
				set: function(a, b) {
					if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
				}
			})
		});
		var z = /\.(.*)$/,
			A = /^(?:textarea|input|select)$/i,
			B = /\./g,
			C = / /g,
			D = /[^\w\s.|`]/g,
			E = /^([^\.]*)?(?:\.(.+))?$/,
			F = /\bhover(\.\S+)?/,
			G = /^key/,
			H = /^(?:mouse|contextmenu)|click/,
			I = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
			J = function(a) {
				var b = I.exec(a);
				b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
				return b
			}, K = function(a, b) {
				return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || a.id === b[2]) && (!b[3] || b[3].test(a.className))
			}, L = function(a) {
				return f.event.special.hover ? a : a.replace(F, "mouseenter$1 mouseleave$1")
			};
		f.event = {
			add: function(a, c, d, e, g) {
				var h, i, j, k, l, m, n, o, p, q, r, s;
				if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
					d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
						return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
					}, i.elem = a), c = L(c).split(" ");
					for (k = 0; k < c.length; k++) {
						l = E.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
							type: m,
							origType: l[1],
							data: e,
							handler: d,
							guid: d.guid,
							selector: g,
							namespace: n.join(".")
						}, p), g && (o.quick = J(g), !o.quick && f.expr.match.POS.test(g) && (o.isPositional = !0)), r = j[m];
						if (!r) {
							r = j[m] = [], r.delegateCount = 0;
							if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
						}
						s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
					}
					a = null
				}
			},
			global: {},
			remove: function(a, b, c, d) {
				var e = f.hasData(a) && f._data(a),
					g, h, i, j, k, l, m, n, o, p, q;
				if ( !! e && !! (m = e.events)) {
					b = L(b || "").split(" ");
					for (g = 0; g < b.length; g++) {
						h = E.exec(b[g]) || [], i = h[1], j = h[2];
						if (!i) {
							j = j ? "." + j : "";
							for (l in m) f.event.remove(a, l + j, c, d);
							return
						}
						n = f.event.special[i] || {}, i = (d ? n.delegateType : n.bindType) || i, p = m[i] || [], k = p.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
						if (c || j || d || n.remove)
							for (l = 0; l < p.length; l++) {
								q = p[l];
								if (!c || c.guid === q.guid)
									if (!j || j.test(q.namespace))
										if (!d || d === q.selector || d === "**" && q.selector) p.splice(l--, 1), q.selector && p.delegateCount--, n.remove && n.remove.call(a, q)
							} else p.length = 0;
						p.length === 0 && k !== p.length && ((!n.teardown || n.teardown.call(a, j) === !1) && f.removeEvent(a, i, e.handle), delete m[i])
					}
					f.isEmptyObject(m) && (o = e.handle, o && (o.elem = null), f.removeData(a, ["events", "handle"], !0))
				}
			},
			customEvent: {
				getData: !0,
				setData: !0,
				changeData: !0
			},
			trigger: function(c, d, e, g) {
				if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
					var h = c.type || c,
						i = [],
						j, k, l, m, n, o, p, q, r, s;
					h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
					if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
					c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "", (g || !e) && c.preventDefault();
					if (!e) {
						j = f.cache;
						for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
						return
					}
					c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
					if (p.trigger && p.trigger.apply(e, d) === !1) return;
					r = [
						[e, p.bindType || h]
					];
					if (!g && !p.noBubble && !f.isWindow(e)) {
						s = p.delegateType || h, n = null;
						for (m = e.parentNode; m; m = m.parentNode) r.push([m, s]), n = m;
						n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
					}
					for (l = 0; l < r.length; l++) {
						m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d);
						if (c.isPropagationStopped()) break
					}
					c.type = h, c.isDefaultPrevented() || (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
					return c.result
				}
				return
			},
			dispatch: function(c) {
				c = f.event.fix(c || a.event);
				var d = (f._data(this, "events") || {})[c.type] || [],
					e = d.delegateCount,
					g = [].slice.call(arguments, 0),
					h = !c.exclusive && !c.namespace,
					i = (f.event.special[c.type] || {}).handle,
					j = [],
					k, l, m, n, o, p, q, r, s, t, u;
				g[0] = c, c.delegateTarget = this;
				if (e && !c.target.disabled && (!c.button || c.type !== "click"))
					for (m = c.target; m != this; m = m.parentNode || this) {
						o = {}, q = [];
						for (k = 0; k < e; k++) r = d[k], s = r.selector, t = o[s], r.isPositional ? t = (t || (o[s] = f(s))).index(m) >= 0 : t === b && (t = o[s] = r.quick ? K(m, r.quick) : f(m).is(s)), t && q.push(r);
						q.length && j.push({
							elem: m,
							matches: q
						})
					}
				d.length > e && j.push({
					elem: this,
					matches: d.slice(e)
				});
				for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
					p = j[k], c.currentTarget = p.elem;
					for (l = 0; l < p.matches.length && !c.isImmediatePropagationStopped(); l++) {
						r = p.matches[l];
						if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = (i || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
					}
				}
				return c.result
			},
			props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
			fixHooks: {},
			keyHooks: {
				props: "char charCode key keyCode".split(" "),
				filter: function(a, b) {
					a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
					return a
				}
			},
			mouseHooks: {
				props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),
				filter: function(a, d) {
					var e, f, g, h = d.button,
						i = d.fromElement;
					a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
					return a
				}
			},
			fix: function(a) {
				if (a[f.expando]) return a;
				var d, e, g = a,
					h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
				a = f.Event(g);
				for (d = i.length; d;) e = i[--d], a[e] = g[e];
				a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
				return h.filter ? h.filter(a, g) : a
			},
			special: {
				ready: {
					setup: f.bindReady
				},
				focus: {
					delegateType: "focusin",
					noBubble: !0
				},
				blur: {
					delegateType: "focusout",
					noBubble: !0
				},
				beforeunload: {
					setup: function(a, b, c) {
						f.isWindow(this) && (this.onbeforeunload = c)
					},
					teardown: function(a, b) {
						this.onbeforeunload === b && (this.onbeforeunload = null)
					}
				}
			},
			simulate: function(a, b, c, d) {
				var e = f.extend(new f.Event, c, {
					type: a,
					isSimulated: !0,
					originalEvent: {}
				});
				d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
			}
		}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
			a.removeEventListener && a.removeEventListener(b, c, !1)
		} : function(a, b, c) {
			a.detachEvent && a.detachEvent("on" + b, c)
		}, f.Event = function(a, b) {
			if (this instanceof f.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? N : M) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0;
			else return new f.Event(a, b)
		}, f.Event.prototype = {
			preventDefault: function() {
				this.isDefaultPrevented = N;
				var a = this.originalEvent;
				!a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
			},
			stopPropagation: function() {
				this.isPropagationStopped = N;
				var a = this.originalEvent;
				!a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
			},
			stopImmediatePropagation: function() {
				this.isImmediatePropagationStopped = N, this.stopPropagation()
			},
			isDefaultPrevented: M,
			isPropagationStopped: M,
			isImmediatePropagationStopped: M
		}, f.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		}, function(a, b) {
			f.event.special[a] = f.event.special[b] = {
				delegateType: b,
				bindType: b,
				handle: function(a) {
					var b = this,
						c = a.relatedTarget,
						d = a.handleObj,
						e = d.selector,
						g, h;
					if (!c || d.origType === a.type || c !== b && !f.contains(b, c)) g = a.type, a.type = d.origType, h = d.handler.apply(this, arguments), a.type = g;
					return h
				}
			}
		}), f.support.submitBubbles || (f.event.special.submit = {
			setup: function() {
				if (f.nodeName(this, "form")) return !1;
				f.event.add(this, "click._submit keypress._submit", function(a) {
					var c = a.target,
						d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
					d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
						this.parentNode && f.event.simulate("submit", this.parentNode, a, !0)
					}), d._submit_attached = !0)
				})
			},
			teardown: function() {
				if (f.nodeName(this, "form")) return !1;
				f.event.remove(this, "._submit")
			}
		}), f.support.changeBubbles || (f.event.special.change = {
			setup: function() {
				if (A.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
						a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
					}), f.event.add(this, "click._change", function(a) {
						this._just_changed && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
					});
					return !1
				}
				f.event.add(this, "beforeactivate._change", function(a) {
					var b = a.target;
					A.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
						this.parentNode && !a.isSimulated && f.event.simulate("change", this.parentNode, a, !0)
					}), b._change_attached = !0)
				})
			},
			handle: function(a) {
				var b = a.target;
				if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
			},
			teardown: function() {
				f.event.remove(this, "._change");
				return A.test(this.nodeName)
			}
		}), f.support.focusinBubbles || f.each({
			focus: "focusin",
			blur: "focusout"
		}, function(a, b) {
			var d = 0,
				e = function(a) {
					f.event.simulate(b, a.target, f.event.fix(a), !0)
				};
			f.event.special[b] = {
				setup: function() {
					d++ === 0 && c.addEventListener(a, e, !0)
				},
				teardown: function() {
					--d === 0 && c.removeEventListener(a, e, !0)
				}
			}
		}), f.fn.extend({
			on: function(a, c, d, e, g) {
				var h, i;
				if (typeof a == "object") {
					typeof c != "string" && (d = c, c = b);
					for (i in a) this.on(i, c, d, a[i], g);
					return this
				}
				d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
				if (e === !1) e = M;
				else if (!e) return this;
				g === 1 && (h = e, e = function(a) {
					f().off(a);
					return h.apply(this, arguments)
				}, e.guid = h.guid || (h.guid = f.guid++));
				return this.each(function() {
					f.event.add(this, a, e, d, c)
				})
			},
			one: function(a, b, c, d) {
				return this.on.call(this, a, b, c, d, 1)
			},
			off: function(a, c, d) {
				if (a && a.preventDefault && a.handleObj) {
					var e = a.handleObj;
					f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
					return this
				}
				if (typeof a == "object") {
					for (var g in a) this.off(g, c, a[g]);
					return this
				}
				if (c === !1 || typeof c == "function") d = c, c = b;
				d === !1 && (d = M);
				return this.each(function() {
					f.event.remove(this, a, d, c)
				})
			},
			bind: function(a, b, c) {
				return this.on(a, null, b, c)
			},
			unbind: function(a, b) {
				return this.off(a, null, b)
			},
			live: function(a, b, c) {
				f(this.context).on(a, this.selector, b, c);
				return this
			},
			die: function(a, b) {
				f(this.context).off(a, this.selector || "**", b);
				return this
			},
			delegate: function(a, b, c, d) {
				return this.on(b, a, c, d)
			},
			undelegate: function(a, b, c) {
				return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
			},
			trigger: function(a, b) {
				return this.each(function() {
					f.event.trigger(a, b, this)
				})
			},
			triggerHandler: function(a, b) {
				if (this[0]) return f.event.trigger(a, b, this[0], !0)
			},
			toggle: function(a) {
				var b = arguments,
					c = a.guid || f.guid++,
					d = 0,
					e = function(c) {
						var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
						f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
						return b[e].apply(this, arguments) || !1
					};
				e.guid = c;
				while (d < b.length) b[d++].guid = c;
				return this.click(e)
			},
			hover: function(a, b) {
				return this.mouseenter(a).mouseleave(b || a)
			}
		}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
			f.fn[b] = function(a, c) {
				c == null && (c = a, a = null);
				return arguments.length > 0 ? this.bind(b, a, c) : this.trigger(b)
			}, f.attrFn && (f.attrFn[b] = !0), G.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), H.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
		}),
		function() {
			function x(a, b, c, e, f, g) {
				for (var h = 0, i = e.length; h < i; h++) {
					var j = e[h];
					if (j) {
						var k = !1;
						j = j[a];
						while (j) {
							if (j[d] === c) {
								k = e[j.sizset];
								break
							}
							if (j.nodeType === 1) {
								g || (j[d] = c, j.sizset = h);
								if (typeof b != "string") {
									if (j === b) {
										k = !0;
										break
									}
								} else if (m.filter(b, [j]).length > 0) {
									k = j;
									break
								}
							}
							j = j[a]
						}
						e[h] = k
					}
				}
			}

			function w(a, b, c, e, f, g) {
				for (var h = 0, i = e.length; h < i; h++) {
					var j = e[h];
					if (j) {
						var k = !1;
						j = j[a];
						while (j) {
							if (j[d] === c) {
								k = e[j.sizset];
								break
							}
							j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
							if (j.nodeName.toLowerCase() === b) {
								k = j;
								break
							}
							j = j[a]
						}
						e[h] = k
					}
				}
			}
			var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
				d = "sizcache" + (Math.random() + "").replace(".", ""),
				e = 0,
				g = Object.prototype.toString,
				h = !1,
				i = !0,
				j = /\\/g,
				k = /\r\n/g,
				l = /\W/;
			[0, 0].sort(function() {
					i = !1;
					return 0
				});
			var m = function(b, d, e, f) {
				e = e || [], d = d || c;
				var h = d;
				if (d.nodeType !== 1 && d.nodeType !== 9) return [];
				if (!b || typeof b != "string") return e;
				var i, j, k, l, n, q, r, t, u = !0,
					v = m.isXML(d),
					w = [],
					x = b;
				do {
					a.exec(""), i = a.exec(x);
					if (i) {
						x = i[3], w.push(i[1]);
						if (i[2]) {
							l = i[3];
							break
						}
					}
				} while (i);
				if (w.length > 1 && p.exec(b))
					if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
					else {
						j = o.relative[w[0]] ? [d] : m(w.shift(), d);
						while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
					} else {
						!f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
						if (d) {
							n = f ? {
								expr: w.pop(),
								set: s(f)
							} : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
							while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
						} else k = w = []
					}
				k || (k = j), k || m.error(q || b);
				if (g.call(k) === "[object Array]")
					if (!u) e.push.apply(e, k);
					else
				if (d && d.nodeType === 1)
					for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
				else
					for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
				else s(k, e);
				l && (m(l, h, e, f), m.uniqueSort(e));
				return e
			};
			m.uniqueSort = function(a) {
				if (u) {
					h = i, a.sort(u);
					if (h)
						for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
				}
				return a
			}, m.matches = function(a, b) {
				return m(a, null, null, b)
			}, m.matchesSelector = function(a, b) {
				return m(b, null, null, [a]).length > 0
			}, m.find = function(a, b, c) {
				var d, e, f, g, h, i;
				if (!a) return [];
				for (e = 0, f = o.order.length; e < f; e++) {
					h = o.order[e];
					if (g = o.leftMatch[h].exec(a)) {
						i = g[1], g.splice(1, 1);
						if (i.substr(i.length - 1) !== "\\") {
							g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
							if (d != null) {
								a = a.replace(o.match[h], "");
								break
							}
						}
					}
				}
				d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
				return {
					set: d,
					expr: a
				}
			}, m.filter = function(a, c, d, e) {
				var f, g, h, i, j, k, l, n, p, q = a,
					r = [],
					s = c,
					t = c && c[0] && m.isXML(c[0]);
				while (a && c.length) {
					for (h in o.filter)
						if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
							k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
							if (l.substr(l.length - 1) === "\\") continue;
							s === r && (r = []);
							if (o.preFilter[h]) {
								f = o.preFilter[h](f, s, d, r, e, t);
								if (!f) g = i = !0;
								else if (f === !0) continue
							}
							if (f)
								for (n = 0;
									(j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
							if (i !== b) {
								d || (s = r), a = a.replace(o.match[h], "");
								if (!g) return [];
								break
							}
						}
					if (a === q)
						if (g == null) m.error(a);
						else break;
					q = a
				}
				return s
			}, m.error = function(a) {
				throw "Syntax error, unrecognized expression: " + a
			};
			var n = m.getText = function(a) {
				var b, c, d = a.nodeType,
					e = "";
				if (d) {
					if (d === 1) {
						if (typeof a.textContent == "string") return a.textContent;
						if (typeof a.innerText == "string") return a.innerText.replace(k, "");
						for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
					} else if (d === 3 || d === 4) return a.nodeValue
				} else
					for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
				return e
			}, o = m.selectors = {
					order: ["ID", "NAME", "TAG"],
					match: {
						ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
						NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
						ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
						TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
						CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
						POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
						PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
					},
					leftMatch: {},
					attrMap: {
						"class": "className",
						"for": "htmlFor"
					},
					attrHandle: {
						href: function(a) {
							return a.getAttribute("href")
						},
						type: function(a) {
							return a.getAttribute("type")
						}
					},
					relative: {
						"+": function(a, b) {
							var c = typeof b == "string",
								d = c && !l.test(b),
								e = c && !d;
							d && (b = b.toLowerCase());
							for (var f = 0, g = a.length, h; f < g; f++)
								if (h = a[f]) {
									while ((h = h.previousSibling) && h.nodeType !== 1);
									a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
								}
							e && m.filter(b, a, !0)
						},
						">": function(a, b) {
							var c, d = typeof b == "string",
								e = 0,
								f = a.length;
							if (d && !l.test(b)) {
								b = b.toLowerCase();
								for (; e < f; e++) {
									c = a[e];
									if (c) {
										var g = c.parentNode;
										a[e] = g.nodeName.toLowerCase() === b ? g : !1
									}
								}
							} else {
								for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
								d && m.filter(b, a, !0)
							}
						},
						"": function(a, b, c) {
							var d, f = e++,
								g = x;
							typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
						},
						"~": function(a, b, c) {
							var d, f = e++,
								g = x;
							typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
						}
					},
					find: {
						ID: function(a, b, c) {
							if (typeof b.getElementById != "undefined" && !c) {
								var d = b.getElementById(a[1]);
								return d && d.parentNode ? [d] : []
							}
						},
						NAME: function(a, b) {
							if (typeof b.getElementsByName != "undefined") {
								var c = [],
									d = b.getElementsByName(a[1]);
								for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
								return c.length === 0 ? null : c
							}
						},
						TAG: function(a, b) {
							if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
						}
					},
					preFilter: {
						CLASS: function(a, b, c, d, e, f) {
							a = " " + a[1].replace(j, "") + " ";
							if (f) return a;
							for (var g = 0, h;
								(h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
							return !1
						},
						ID: function(a) {
							return a[1].replace(j, "")
						},
						TAG: function(a, b) {
							return a[1].replace(j, "").toLowerCase()
						},
						CHILD: function(a) {
							if (a[1] === "nth") {
								a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
								var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
								a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
							} else a[2] && m.error(a[0]);
							a[0] = e++;
							return a
						},
						ATTR: function(a, b, c, d, e, f) {
							var g = a[1] = a[1].replace(j, "");
							!f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
							return a
						},
						PSEUDO: function(b, c, d, e, f) {
							if (b[1] === "not")
								if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
								else {
									var g = m.filter(b[3], c, d, !0 ^ f);
									d || e.push.apply(e, g);
									return !1
								} else
							if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
							return b
						},
						POS: function(a) {
							a.unshift(!0);
							return a
						}
					},
					filters: {
						enabled: function(a) {
							return a.disabled === !1 && a.type !== "hidden"
						},
						disabled: function(a) {
							return a.disabled === !0
						},
						checked: function(a) {
							return a.checked === !0
						},
						selected: function(a) {
							a.parentNode && a.parentNode.selectedIndex;
							return a.selected === !0
						},
						parent: function(a) {
							return !!a.firstChild
						},
						empty: function(a) {
							return !a.firstChild
						},
						has: function(a, b, c) {
							return !!m(c[3], a).length
						},
						header: function(a) {
							return /h\d/i.test(a.nodeName)
						},
						text: function(a) {
							var b = a.getAttribute("type"),
								c = a.type;
							return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
						},
						radio: function(a) {
							return a.nodeName.toLowerCase() === "input" && "radio" === a.type
						},
						checkbox: function(a) {
							return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
						},
						file: function(a) {
							return a.nodeName.toLowerCase() === "input" && "file" === a.type
						},
						password: function(a) {
							return a.nodeName.toLowerCase() === "input" && "password" === a.type
						},
						submit: function(a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" || b === "button") && "submit" === a.type
						},
						image: function(a) {
							return a.nodeName.toLowerCase() === "input" && "image" === a.type
						},
						reset: function(a) {
							var b = a.nodeName.toLowerCase();
							return (b === "input" || b === "button") && "reset" === a.type
						},
						button: function(a) {
							var b = a.nodeName.toLowerCase();
							return b === "input" && "button" === a.type || b === "button"
						},
						input: function(a) {
							return /input|select|textarea|button/i.test(a.nodeName)
						},
						focus: function(a) {
							return a === a.ownerDocument.activeElement
						}
					},
					setFilters: {
						first: function(a, b) {
							return b === 0
						},
						last: function(a, b, c, d) {
							return b === d.length - 1
						},
						even: function(a, b) {
							return b % 2 === 0
						},
						odd: function(a, b) {
							return b % 2 === 1
						},
						lt: function(a, b, c) {
							return b < c[3] - 0
						},
						gt: function(a, b, c) {
							return b > c[3] - 0
						},
						nth: function(a, b, c) {
							return c[3] - 0 === b
						},
						eq: function(a, b, c) {
							return c[3] - 0 === b
						}
					},
					filter: {
						PSEUDO: function(a, b, c, d) {
							var e = b[1],
								f = o.filters[e];
							if (f) return f(a, c, b, d);
							if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
							if (e === "not") {
								var g = b[3];
								for (var h = 0, i = g.length; h < i; h++)
									if (g[h] === a) return !1;
								return !0
							}
							m.error(e)
						},
						CHILD: function(a, b) {
							var c, e, f, g, h, i, j, k = b[1],
								l = a;
							switch (k) {
								case "only":
								case "first":
									while (l = l.previousSibling)
										if (l.nodeType === 1) return !1;
									if (k === "first") return !0;
									l = a;
								case "last":
									while (l = l.nextSibling)
										if (l.nodeType === 1) return !1;
									return !0;
								case "nth":
									c = b[2], e = b[3];
									if (c === 1 && e === 0) return !0;
									f = b[0], g = a.parentNode;
									if (g && (g[d] !== f || !a.nodeIndex)) {
										i = 0;
										for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
										g[d] = f
									}
									j = a.nodeIndex - e;
									return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
							}
						},
						ID: function(a, b) {
							return a.nodeType === 1 && a.getAttribute("id") === b
						},
						TAG: function(a, b) {
							return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
						},
						CLASS: function(a, b) {
							return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
						},
						ATTR: function(a, b) {
							var c = b[1],
								d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
								e = d + "",
								f = b[2],
								g = b[4];
							return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
						},
						POS: function(a, b, c, d) {
							var e = b[2],
								f = o.setFilters[e];
							if (f) return f(a, c, b, d)
						}
					}
				}, p = o.match.POS,
				q = function(a, b) {
					return "\\" + (b - 0 + 1)
				};
			for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
			var s = function(a, b) {
				a = Array.prototype.slice.call(a, 0);
				if (b) {
					b.push.apply(b, a);
					return b
				}
				return a
			};
			try {
				Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
			} catch (t) {
				s = function(a, b) {
					var c = 0,
						d = b || [];
					if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
					else if (typeof a.length == "number")
						for (var e = a.length; c < e; c++) d.push(a[c]);
					else
						for (; a[c]; c++) d.push(a[c]);
					return d
				}
			}
			var u, v;
			c.documentElement.compareDocumentPosition ? u = function(a, b) {
				if (a === b) {
					h = !0;
					return 0
				}
				return !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
			} : (u = function(a, b) {
				if (a === b) {
					h = !0;
					return 0
				}
				if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
				var c, d, e = [],
					f = [],
					g = a.parentNode,
					i = b.parentNode,
					j = g;
				if (g === i) return v(a, b);
				if (!g) return -1;
				if (!i) return 1;
				while (j) e.unshift(j), j = j.parentNode;
				j = i;
				while (j) f.unshift(j), j = j.parentNode;
				c = e.length, d = f.length;
				for (var k = 0; k < c && k < d; k++)
					if (e[k] !== f[k]) return v(e[k], f[k]);
				return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
			}, v = function(a, b, c) {
				if (a === b) return c;
				var d = a.nextSibling;
				while (d) {
					if (d === b) return -1;
					d = d.nextSibling
				}
				return 1
			}),
			function() {
				var a = c.createElement("div"),
					d = "script" + (new Date).getTime(),
					e = c.documentElement;
				a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
					if (typeof c.getElementById != "undefined" && !d) {
						var e = c.getElementById(a[1]);
						return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
					}
				}, o.filter.ID = function(a, b) {
					var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
					return a.nodeType === 1 && c && c.nodeValue === b
				}), e.removeChild(a), e = a = null
			}(),
			function() {
				var a = c.createElement("div");
				a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
					var c = b.getElementsByTagName(a[1]);
					if (a[1] === "*") {
						var d = [];
						for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
						c = d
					}
					return c
				}), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
					return a.getAttribute("href", 2)
				}), a = null
			}(), c.querySelectorAll && function() {
				var a = m,
					b = c.createElement("div"),
					d = "__sizzle__";
				b.innerHTML = "<p class='TEST'></p>";
				if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
					m = function(b, e, f, g) {
						e = e || c;
						if (!g && !m.isXML(e)) {
							var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
							if (h && (e.nodeType === 1 || e.nodeType === 9)) {
								if (h[1]) return s(e.getElementsByTagName(b), f);
								if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
							}
							if (e.nodeType === 9) {
								if (b === "body" && e.body) return s([e.body], f);
								if (h && h[3]) {
									var i = e.getElementById(h[3]);
									if (!i || !i.parentNode) return s([], f);
									if (i.id === h[3]) return s([i], f)
								}
								try {
									return s(e.querySelectorAll(b), f)
								} catch (j) {}
							} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
								var k = e,
									l = e.getAttribute("id"),
									n = l || d,
									p = e.parentNode,
									q = /^\s*[+~]/.test(b);
								l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
								try {
									if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
								} catch (r) {} finally {
									l || k.removeAttribute("id")
								}
							}
						}
						return a(b, e, f, g)
					};
					for (var e in a) m[e] = a[e];
					b = null
				}
			}(),
			function() {
				var a = c.documentElement,
					b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
				if (b) {
					var d = !b.call(c.createElement("div"), "div"),
						e = !1;
					try {
						b.call(c.documentElement, "[test!='']:sizzle")
					} catch (f) {
						e = !0
					}
					m.matchesSelector = function(a, c) {
						c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
						if (!m.isXML(a)) try {
							if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
								var f = b.call(a, c);
								if (f || !d || a.document && a.document.nodeType !== 11) return f
							}
						} catch (g) {}
						return m(c, null, null, [a]).length > 0
					}
				}
			}(),
			function() {
				var a = c.createElement("div");
				a.innerHTML = "<div class='test e'></div><div class='test'></div>";
				if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
					a.lastChild.className = "e";
					if (a.getElementsByClassName("e").length === 1) return;
					o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
						if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
					}, a = null
				}
			}(), c.documentElement.contains ? m.contains = function(a, b) {
				return a !== b && (a.contains ? a.contains(b) : !0)
			} : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
				return !!(a.compareDocumentPosition(b) & 16)
			} : m.contains = function() {
				return !1
			}, m.isXML = function(a) {
				var b = (a ? a.ownerDocument || a : 0).documentElement;
				return b ? b.nodeName !== "HTML" : !1
			};
			var y = function(a, b, c) {
				var d, e = [],
					f = "",
					g = b.nodeType ? [b] : b;
				while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
				a = o.relative[a] ? a + "*" : a;
				for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
				return m.filter(f, e)
			};
			m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
		}();
		var O = /Until$/,
			P = /^(?:parents|prevUntil|prevAll)/,
			Q = /,/,
			R = /^.[^:#\[\.,]*$/,
			S = Array.prototype.slice,
			T = f.expr.match.POS,
			U = {
				children: !0,
				contents: !0,
				next: !0,
				prev: !0
			};
		f.fn.extend({
			find: function(a) {
				var b = this,
					c, d;
				if (typeof a != "string") return f(a).filter(function() {
					for (c = 0, d = b.length; c < d; c++)
						if (f.contains(b[c], this)) return !0
				});
				var e = this.pushStack("", "find", a),
					g, h, i;
				for (c = 0, d = this.length; c < d; c++) {
					g = e.length, f.find(a, this[c], e);
					if (c > 0)
						for (h = g; h < e.length; h++)
							for (i = 0; i < g; i++)
								if (e[i] === e[h]) {
									e.splice(h--, 1);
									break
								}
				}
				return e
			},
			has: function(a) {
				var b = f(a);
				return this.filter(function() {
					for (var a = 0, c = b.length; a < c; a++)
						if (f.contains(this, b[a])) return !0
				})
			},
			not: function(a) {
				return this.pushStack(W(this, a, !1), "not", a)
			},
			filter: function(a) {
				return this.pushStack(W(this, a, !0), "filter", a)
			},
			is: function(a) {
				return !!a && (typeof a == "string" ? T.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
			},
			closest: function(a, b) {
				var c = [],
					d, e, g = this[0];
				if (f.isArray(a)) {
					var h = 1;
					while (g && g.ownerDocument && g !== b) {
						for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
							selector: a[d],
							elem: g,
							level: h
						});
						g = g.parentNode, h++
					}
					return c
				}
				var i = T.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
				for (d = 0, e = this.length; d < e; d++) {
					g = this[d];
					while (g) {
						if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
							c.push(g);
							break
						}
						g = g.parentNode;
						if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
					}
				}
				c = c.length > 1 ? f.unique(c) : c;
				return this.pushStack(c, "closest", a)
			},
			index: function(a) {
				return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
			},
			add: function(a, b) {
				var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
					d = f.merge(this.get(), c);
				return this.pushStack(V(c[0]) || V(d[0]) ? d : f.unique(d))
			},
			andSelf: function() {
				return this.add(this.prevObject)
			}
		}), f.each({
			parent: function(a) {
				var b = a.parentNode;
				return b && b.nodeType !== 11 ? b : null
			},
			parents: function(a) {
				return f.dir(a, "parentNode")
			},
			parentsUntil: function(a, b, c) {
				return f.dir(a, "parentNode", c)
			},
			next: function(a) {
				return f.nth(a, 2, "nextSibling")
			},
			prev: function(a) {
				return f.nth(a, 2, "previousSibling")
			},
			nextAll: function(a) {
				return f.dir(a, "nextSibling")
			},
			prevAll: function(a) {
				return f.dir(a, "previousSibling")
			},
			nextUntil: function(a, b, c) {
				return f.dir(a, "nextSibling", c)
			},
			prevUntil: function(a, b, c) {
				return f.dir(a, "previousSibling", c)
			},
			siblings: function(a) {
				return f.sibling(a.parentNode.firstChild, a)
			},
			children: function(a) {
				return f.sibling(a.firstChild)
			},
			contents: function(a) {
				return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
			}
		}, function(a, b) {
			f.fn[a] = function(c, d) {
				var e = f.map(this, b, c),
					g = S.call(arguments);
				O.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !U[a] ? f.unique(e) : e, (this.length > 1 || Q.test(d)) && P.test(a) && (e = e.reverse());
				return this.pushStack(e, a, g.join(","))
			}
		}), f.extend({
			filter: function(a, b, c) {
				c && (a = ":not(" + a + ")");
				return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
			},
			dir: function(a, c, d) {
				var e = [],
					g = a[c];
				while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
				return e
			},
			nth: function(a, b, c, d) {
				b = b || 1;
				var e = 0;
				for (; a; a = a[c])
					if (a.nodeType === 1 && ++e === b) break;
				return a
			},
			sibling: function(a, b) {
				var c = [];
				for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
				return c
			}
		});
		var Y = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
			Z = / jQuery\d+="(?:\d+|null)"/g,
			$ = /^\s+/,
			_ = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
			ba = /<([\w:]+)/,
			bb = /<tbody/i,
			bc = /<|&#?\w+;/,
			bd = /<(?:script|style)/i,
			be = /<(?:script|object|embed|option|style)/i,
			bf = new RegExp("<(?:" + Y.replace(" ", "|") + ")", "i"),
			bg = /checked\s*(?:[^=]|=\s*.checked.)/i,
			bh = /\/(java|ecma)script/i,
			bi = /^\s*<!(?:\[CDATA\[|\-\-)/,
			bj = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				area: [1, "<map>", "</map>"],
				_default: [0, "", ""]
			}, bk = X(c);
		bj.optgroup = bj.option, bj.tbody = bj.tfoot = bj.colgroup = bj.caption = bj.thead, bj.th = bj.td, f.support.htmlSerialize || (bj._default = [1, "div<div>", "</div>"]), f.fn.extend({
			text: function(a) {
				return f.isFunction(a) ? this.each(function(b) {
					var c = f(this);
					c.text(a.call(this, b, c.text()))
				}) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)) : f.text(this)
			},
			wrapAll: function(a) {
				if (f.isFunction(a)) return this.each(function(b) {
					f(this).wrapAll(a.call(this, b))
				});
				if (this[0]) {
					var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
					this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
						var a = this;
						while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
						return a
					}).append(this)
				}
				return this
			},
			wrapInner: function(a) {
				return f.isFunction(a) ? this.each(function(b) {
					f(this).wrapInner(a.call(this, b))
				}) : this.each(function() {
					var b = f(this),
						c = b.contents();
					c.length ? c.wrapAll(a) : b.append(a)
				})
			},
			wrap: function(a) {
				return this.each(function() {
					f(this).wrapAll(a)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
				}).end()
			},
			append: function() {
				return this.domManip(arguments, !0, function(a) {
					this.nodeType === 1 && this.appendChild(a)
				})
			},
			prepend: function() {
				return this.domManip(arguments, !0, function(a) {
					this.nodeType === 1 && this.insertBefore(a, this.firstChild)
				})
			},
			before: function() {
				if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
					this.parentNode.insertBefore(a, this)
				});
				if (arguments.length) {
					var a = f(arguments[0]);
					a.push.apply(a, this.toArray());
					return this.pushStack(a, "before", arguments)
				}
			},
			after: function() {
				if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
					this.parentNode.insertBefore(a, this.nextSibling)
				});
				if (arguments.length) {
					var a = this.pushStack(this, "after", arguments);
					a.push.apply(a, f(arguments[0]).toArray());
					return a
				}
			},
			remove: function(a, b) {
				for (var c = 0, d;
					(d = this[c]) != null; c++)
					if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
				return this
			},
			empty: function() {
				for (var a = 0, b;
					(b = this[a]) != null; a++) {
					b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
					while (b.firstChild) b.removeChild(b.firstChild)
				}
				return this
			},
			clone: function(a, b) {
				a = a == null ? !1 : a, b = b == null ? a : b;
				return this.map(function() {
					return f.clone(this, a, b)
				})
			},
			html: function(a) {
				if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Z, "") : null;
				if (typeof a == "string" && !bd.test(a) && (f.support.leadingWhitespace || !$.test(a)) && !bj[(ba.exec(a) || ["", ""])[1].toLowerCase()]) {
					a = a.replace(_, "<$1></$2>");
					try {
						for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
					} catch (e) {
						this.empty().append(a)
					}
				} else f.isFunction(a) ? this.each(function(b) {
					var c = f(this);
					c.html(a.call(this, b, c.html()))
				}) : this.empty().append(a);
				return this
			},
			replaceWith: function(a) {
				if (this[0] && this[0].parentNode) {
					if (f.isFunction(a)) return this.each(function(b) {
						var c = f(this),
							d = c.html();
						c.replaceWith(a.call(this, b, d))
					});
					typeof a != "string" && (a = f(a).detach());
					return this.each(function() {
						var b = this.nextSibling,
							c = this.parentNode;
						f(this).remove(), b ? f(b).before(a) : f(c).append(a)
					})
				}
				return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
			},
			detach: function(a) {
				return this.remove(a, !0)
			},
			domManip: function(a, c, d) {
				var e, g, h, i, j = a[0],
					k = [];
				if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bg.test(j)) return this.each(function() {
					f(this).domManip(a, c, d, !0)
				});
				if (f.isFunction(j)) return this.each(function(e) {
					var g = f(this);
					a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
				});
				if (this[0]) {
					i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
						fragment: i
					} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
					if (g) {
						c = c && f.nodeName(g, "tr");
						for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bl(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
					}
					k.length && f.each(k, br)
				}
				return this
			}
		}), f.buildFragment = function(a, b, d) {
			var e, g, h, i, j = a[0];
			b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !be.test(j) && (f.support.checkClone || !bg.test(j)) && !f.support.unknownElems && bf.test(j) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
			return {
				fragment: e,
				cacheable: g
			}
		}, f.fragments = {}, f.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(a, b) {
			f.fn[a] = function(c) {
				var d = [],
					e = f(c),
					g = this.length === 1 && this[0].parentNode;
				if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
					e[b](this[0]);
					return this
				}
				for (var h = 0, i = e.length; h < i; h++) {
					var j = (h > 0 ? this.clone(!0) : this).get();
					f(e[h])[b](j), d = d.concat(j)
				}
				return this.pushStack(d, a, e.selector)
			}
		}), f.extend({
			clone: function(a, b, c) {
				var d = a.cloneNode(!0),
					e, g, h;
				if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
					bn(a, d), e = bo(a), g = bo(d);
					for (h = 0; e[h]; ++h) g[h] && bn(e[h], g[h])
				}
				if (b) {
					bm(a, d);
					if (c) {
						e = bo(a), g = bo(d);
						for (h = 0; e[h]; ++h) bm(e[h], g[h])
					}
				}
				e = g = null;
				return d
			},
			clean: function(a, b, d, e) {
				var g;
				b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
				var h = [],
					i;
				for (var j = 0, k;
					(k = a[j]) != null; j++) {
					typeof k == "number" && (k += "");
					if (!k) continue;
					if (typeof k == "string")
						if (!bc.test(k)) k = b.createTextNode(k);
						else {
							k = k.replace(_, "<$1></$2>");
							var l = (ba.exec(k) || ["", ""])[1].toLowerCase(),
								m = bj[l] || bj._default,
								n = m[0],
								o = b.createElement("div");
							b === c ? bk.appendChild(o) : X(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
							while (n--) o = o.lastChild;
							if (!f.support.tbody) {
								var p = bb.test(k),
									q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
								for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
							}!f.support.leadingWhitespace && $.test(k) && o.insertBefore(b.createTextNode($.exec(k)[0]), o.firstChild), k = o.childNodes
						}
					var r;
					if (!f.support.appendChecked)
						if (k[0] && typeof(r = k.length) == "number")
							for (i = 0; i < r; i++) bq(k[i]);
						else bq(k);
					k.nodeType ? h.push(k) : h = f.merge(h, k)
				}
				if (d) {
					g = function(a) {
						return !a.type || bh.test(a.type)
					};
					for (j = 0; h[j]; j++)
						if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
						else {
							if (h[j].nodeType === 1) {
								var s = f.grep(h[j].getElementsByTagName("script"), g);
								h.splice.apply(h, [j + 1, 0].concat(s))
							}
							d.appendChild(h[j])
						}
				}
				return h
			},
			cleanData: function(a) {
				var b, c, d = f.cache,
					e = f.event.special,
					g = f.support.deleteExpando;
				for (var h = 0, i;
					(i = a[h]) != null; h++) {
					if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
					c = i[f.expando];
					if (c) {
						b = d[c];
						if (b && b.events) {
							for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
							b.handle && (b.handle.elem = null)
						}
						g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
					}
				}
			}
		});
		var bs = /alpha\([^)]*\)/i,
			bt = /opacity=([^)]*)/,
			bu = /([A-Z]|^ms)/g,
			bv = /^-?\d+(?:px)?$/i,
			bw = /^-?\d/,
			bx = /^([\-+])=([\-+.\de]+)/,
			by = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			}, bz = ["Left", "Right"],
			bA = ["Top", "Bottom"],
			bB, bC, bD;
		f.fn.css = function(a, c) {
			return arguments.length === 2 && c === b ? this : f.access(this, a, c, !0, function(a, c, d) {
				return d !== b ? f.style(a, c, d) : f.css(a, c)
			})
		}, f.extend({
			cssHooks: {
				opacity: {
					get: function(a, b) {
						if (b) {
							var c = bB(a, "opacity", "opacity");
							return c === "" ? "1" : c
						}
						return a.style.opacity
					}
				}
			},
			cssNumber: {
				fillOpacity: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {
				"float": f.support.cssFloat ? "cssFloat" : "styleFloat"
			},
			style: function(a, c, d, e) {
				if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
					var g, h, i = f.camelCase(c),
						j = a.style,
						k = f.cssHooks[i];
					c = f.cssProps[i] || i;
					if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
					h = typeof d, h === "string" && (g = bx.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
					if (d == null || h === "number" && isNaN(d)) return;
					h === "number" && !f.cssNumber[i] && (d += "px");
					if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
						j[c] = d
					} catch (l) {}
				}
			},
			css: function(a, c, d) {
				var e, g;
				c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
				if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
				if (bB) return bB(a, c)
			},
			swap: function(a, b, c) {
				var d = {};
				for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
				c.call(a);
				for (e in b) a.style[e] = d[e]
			}
		}), f.curCSS = f.css, f.each(["height", "width"], function(a, b) {
			f.cssHooks[b] = {
				get: function(a, c, d) {
					var e;
					if (c) {
						if (a.offsetWidth !== 0) return bE(a, b, d);
						f.swap(a, by, function() {
							e = bE(a, b, d)
						});
						return e
					}
				},
				set: function(a, b) {
					if (!bv.test(b)) return b;
					b = parseFloat(b);
					if (b >= 0) return b + "px"
				}
			}
		}), f.support.opacity || (f.cssHooks.opacity = {
			get: function(a, b) {
				return bt.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
			},
			set: function(a, b) {
				var c = a.style,
					d = a.currentStyle,
					e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
					g = d && d.filter || c.filter || "";
				c.zoom = 1;
				if (b >= 1 && f.trim(g.replace(bs, "")) === "") {
					c.removeAttribute("filter");
					if (d && !d.filter) return
				}
				c.filter = bs.test(g) ? g.replace(bs, e) : g + " " + e
			}
		}), f(function() {
			f.support.reliableMarginRight || (f.cssHooks.marginRight = {
				get: function(a, b) {
					var c;
					f.swap(a, {
						display: "inline-block"
					}, function() {
						b ? c = bB(a, "margin-right", "marginRight") : c = a.style.marginRight
					});
					return c
				}
			})
		}), c.defaultView && c.defaultView.getComputedStyle && (bC = function(a, c) {
			var d, e, g;
			c = c.replace(bu, "-$1").toLowerCase();
			if (!(e = a.ownerDocument.defaultView)) return b;
			if (g = e.getComputedStyle(a, null)) d = g.getPropertyValue(c), d === "" && !f.contains(a.ownerDocument.documentElement, a) && (d = f.style(a, c));
			return d
		}), c.documentElement.currentStyle && (bD = function(a, b) {
			var c, d, e, f = a.currentStyle && a.currentStyle[b],
				g = a.style;
			f === null && g && (e = g[b]) && (f = e), !bv.test(f) && bw.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
			return f === "" ? "auto" : f
		}), bB = bC || bD, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
			var b = a.offsetWidth,
				c = a.offsetHeight;
			return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
		}, f.expr.filters.visible = function(a) {
			return !f.expr.filters.hidden(a)
		});
		var bF = /%20/g,
			bG = /\[\]$/,
			bH = /\r?\n/g,
			bI = /#.*$/,
			bJ = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
			bK = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
			bL = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
			bM = /^(?:GET|HEAD)$/,
			bN = /^\/\//,
			bO = /\?/,
			bP = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			bQ = /^(?:select|textarea)/i,
			bR = /\s+/,
			bS = /([?&])_=[^&]*/,
			bT = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
			bU = f.fn.load,
			bV = {}, bW = {}, bX, bY, bZ = ["*/"] + ["*"];
		try {
			bX = e.href
		} catch (b$) {
			bX = c.createElement("a"), bX.href = "", bX = bX.href
		}
		bY = bT.exec(bX.toLowerCase()) || [], f.fn.extend({
			load: function(a, c, d) {
				if (typeof a != "string" && bU) return bU.apply(this, arguments);
				if (!this.length) return this;
				var e = a.indexOf(" ");
				if (e >= 0) {
					var g = a.slice(e, a.length);
					a = a.slice(0, e)
				}
				var h = "GET";
				c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
				var i = this;
				f.ajax({
					url: a,
					type: h,
					dataType: "html",
					data: c,
					complete: function(a, b, c) {
						c = a.responseText, a.isResolved() && (a.done(function(a) {
							c = a
						}), i.html(g ? f("<div>").append(c.replace(bP, "")).find(g) : c)), d && i.each(d, [c, b, a])
					}
				});
				return this
			},
			serialize: function() {
				return f.param(this.serializeArray())
			},
			serializeArray: function() {
				return this.map(function() {
					return this.elements ? f.makeArray(this.elements) : this
				}).filter(function() {
					return this.name && !this.disabled && (this.checked || bQ.test(this.nodeName) || bK.test(this.type))
				}).map(function(a, b) {
					var c = f(this).val();
					return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
						return {
							name: b.name,
							value: a.replace(bH, "\r\n")
						}
					}) : {
						name: b.name,
						value: c.replace(bH, "\r\n")
					}
				}).get()
			}
		}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
			f.fn[b] = function(a) {
				return this.bind(b, a)
			}
		}), f.each(["get", "post"], function(a, c) {
			f[c] = function(a, d, e, g) {
				f.isFunction(d) && (g = g || e, e = d, d = b);
				return f.ajax({
					type: c,
					url: a,
					data: d,
					success: e,
					dataType: g
				})
			}
		}), f.extend({
			getScript: function(a, c) {
				return f.get(a, b, c, "script")
			},
			getJSON: function(a, b, c) {
				return f.get(a, b, c, "json")
			},
			ajaxSetup: function(a, b) {
				b ? cb(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), cb(a, b);
				return a
			},
			ajaxSettings: {
				url: bX,
				isLocal: bL.test(bY[1]),
				global: !0,
				type: "GET",
				contentType: "application/x-www-form-urlencoded",
				processData: !0,
				async: !0,
				accepts: {
					xml: "application/xml, text/xml",
					html: "text/html",
					text: "text/plain",
					json: "application/json, text/javascript",
					"*": bZ
				},
				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText"
				},
				converters: {
					"* text": a.String,
					"text html": !0,
					"text json": f.parseJSON,
					"text xml": f.parseXML
				},
				flatOptions: {
					context: !0,
					url: !0
				}
			},
			ajaxPrefilter: b_(bV),
			ajaxTransport: b_(bW),
			ajax: function(a, c) {
				function w(a, c, l, m) {
					if (s !== 2) {
						s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
						var o, r, u, w = c,
							x = l ? cd(d, v, l) : b,
							y, z;
						if (a >= 200 && a < 300 || a === 304) {
							if (d.ifModified) {
								if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
								if (z = v.getResponseHeader("Etag")) f.etag[k] = z
							}
							if (a === 304) w = "notmodified", o = !0;
							else try {
								r = ce(d, x), w = "success", o = !0
							} catch (A) {
								w = "parsererror", u = A
							}
						} else {
							u = w;
							if (!w || a) w = "error", a < 0 && (a = 0)
						}
						v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
					}
				}
				typeof a == "object" && (c = a, a = b), c = c || {};
				var d = f.ajaxSetup({}, c),
					e = d.context || d,
					g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
					h = f.Deferred(),
					i = f.Callbacks("once memory"),
					j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0,
					t, u, v = {
						readyState: 0,
						setRequestHeader: function(a, b) {
							if (!s) {
								var c = a.toLowerCase();
								a = m[c] = m[c] || a, l[a] = b
							}
							return this
						},
						getAllResponseHeaders: function() {
							return s === 2 ? n : null
						},
						getResponseHeader: function(a) {
							var c;
							if (s === 2) {
								if (!o) {
									o = {};
									while (c = bJ.exec(n)) o[c[1].toLowerCase()] = c[2]
								}
								c = o[a.toLowerCase()]
							}
							return c === b ? null : c
						},
						overrideMimeType: function(a) {
							s || (d.mimeType = a);
							return this
						},
						abort: function(a) {
							a = a || "abort", p && p.abort(a), w(0, a);
							return this
						}
					};
				h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
					if (a) {
						var b;
						if (s < 2)
							for (b in a) j[b] = [j[b], a[b]];
						else b = a[v.status], v.then(b, b)
					}
					return this
				}, d.url = ((a || d.url) + "").replace(bI, "").replace(bN, bY[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bR), d.crossDomain == null && (r = bT.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bY[1] && r[2] == bY[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bY[3] || (bY[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), ca(bV, d, c, v);
				if (s === 2) return !1;
				t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bM.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
				if (!d.hasContent) {
					d.data && (d.url += (bO.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
					if (d.cache === !1) {
						var x = f.now(),
							y = d.url.replace(bS, "$1_=" + x);
						d.url = y + (y === d.url ? (bO.test(d.url) ? "&" : "?") + "_=" + x : "")
					}
				}(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bZ + "; q=0.01" : "") : d.accepts["*"]);
				for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
				if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
					for (u in {
						success: 1,
						error: 1,
						complete: 1
					}) v[u](d[u]);
					p = ca(bW, d, c, v);
					if (!p) w(-1, "No Transport");
					else {
						v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
							v.abort("timeout")
						}, d.timeout));
						try {
							s = 1, p.send(l, w)
						} catch (z) {
							s < 2 ? w(-1, z) : f.error(z)
						}
					}
					return v
				}
				v.abort();
				return !1
			},
			param: function(a, c) {
				var d = [],
					e = function(a, b) {
						b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
					};
				c === b && (c = f.ajaxSettings.traditional);
				if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
					e(this.name, this.value)
				});
				else
					for (var g in a) cc(g, a[g], c, e);
				return d.join("&").replace(bF, "+")
			}
		}), f.extend({
			active: 0,
			lastModified: {},
			etag: {}
		});
		var cf = f.now(),
			cg = /(\=)\?(&|$)|\?\?/i;
		f.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				return f.expando + "_" + cf++
			}
		}), f.ajaxPrefilter("json jsonp", function(b, c, d) {
			var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
			if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cg.test(b.url) || e && cg.test(b.data))) {
				var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
					i = a[h],
					j = b.url,
					k = b.data,
					l = "$1" + h + "$2";
				b.jsonp !== !1 && (j = j.replace(cg, l), b.url === j && (e && (k = k.replace(cg, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
					g = [a]
				}, d.always(function() {
					a[h] = i, g && f.isFunction(i) && a[h](g[0])
				}), b.converters["script json"] = function() {
					g || f.error(h + " was not called");
					return g[0]
				}, b.dataTypes[0] = "json";
				return "script"
			}
		}), f.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /javascript|ecmascript/
			},
			converters: {
				"text script": function(a) {
					f.globalEval(a);
					return a
				}
			}
		}), f.ajaxPrefilter("script", function(a) {
			a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
		}), f.ajaxTransport("script", function(a) {
			if (a.crossDomain) {
				var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
				return {
					send: function(f, g) {
						d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
							if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
						}, e.insertBefore(d, e.firstChild)
					},
					abort: function() {
						d && d.onload(0, 1)
					}
				}
			}
		});
		var ch = a.ActiveXObject ? function() {
				for (var a in cj) cj[a](0, 1)
			} : !1,
			ci = 0,
			cj;
		f.ajaxSettings.xhr = a.ActiveXObject ? function() {
			return !this.isLocal && ck() || cl()
		} : ck,
		function(a) {
			f.extend(f.support, {
				ajax: !! a,
				cors: !! a && "withCredentials" in a
			})
		}(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
			if (!c.crossDomain || f.support.cors) {
				var d;
				return {
					send: function(e, g) {
						var h = c.xhr(),
							i, j;
						c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
						if (c.xhrFields)
							for (j in c.xhrFields) h[j] = c.xhrFields[j];
						c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
						try {
							for (j in e) h.setRequestHeader(j, e[j])
						} catch (k) {}
						h.send(c.hasContent && c.data || null), d = function(a, e) {
							var j, k, l, m, n;
							try {
								if (d && (e || h.readyState === 4)) {
									d = b, i && (h.onreadystatechange = f.noop, ch && delete cj[i]);
									if (e) h.readyState !== 4 && h.abort();
									else {
										j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
										try {
											k = h.statusText
										} catch (o) {
											k = ""
										}!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
									}
								}
							} catch (p) {
								e || g(-1, p)
							}
							m && g(j, k, m, l)
						}, !c.async || h.readyState === 4 ? d() : (i = ++ci, ch && (cj || (cj = {}, f(a).unload(ch)), cj[i] = d), h.onreadystatechange = d)
					},
					abort: function() {
						d && d(0, 1)
					}
				}
			}
		});
		var cm = {}, cn, co, cp = /^(?:toggle|show|hide)$/,
			cq = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
			cr, cs = [
				["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
				["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
				["opacity"]
			],
			ct;
		f.fn.extend({
			show: function(a, b, c) {
				var d, e;
				if (a || a === 0) return this.animate(cw("show", 3), a, b, c);
				for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cx(d.nodeName)));
				for (g = 0; g < h; g++) {
					d = this[g];
					if (d.style) {
						e = d.style.display;
						if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
					}
				}
				return this
			},
			hide: function(a, b, c) {
				if (a || a === 0) return this.animate(cw("hide", 3), a, b, c);
				var d, e, g = 0,
					h = this.length;
				for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
				for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
				return this
			},
			_toggle: f.fn.toggle,
			toggle: function(a, b, c) {
				var d = typeof a == "boolean";
				f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
					var b = d ? a : f(this).is(":hidden");
					f(this)[b ? "show" : "hide"]()
				}) : this.animate(cw("toggle", 3), a, b, c);
				return this
			},
			fadeTo: function(a, b, c, d) {
				return this.filter(":hidden").css("opacity", 0).show().end().animate({
					opacity: b
				}, a, c, d)
			},
			animate: function(a, b, c, d) {
				function g() {
					e.queue === !1 && f._mark(this);
					var b = f.extend({}, e),
						c = this.nodeType === 1,
						d = c && f(this).is(":hidden"),
						g, h, i, j, k, l, m, n, o;
					b.animatedProperties = {};
					for (i in a) {
						g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
						if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
						c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cx(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
					}
					b.overflow != null && (this.style.overflow = "hidden");
					for (i in a) j = new f.fx(this, b, i), h = a[i], cp.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = cq.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
					return !0
				}
				var e = f.speed(b, c, d);
				if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
				a = f.extend({}, a);
				return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
			},
			stop: function(a, c, d) {
				typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
				return this.each(function() {
					function h(a, b, c) {
						var e = b[c];
						f.removeData(a, c, !0), e.stop(d)
					}
					var b, c = !1,
						e = f.timers,
						g = f._data(this);
					d || f._unmark(!0, this);
					if (a == null)
						for (b in g) g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
					else g[b = a + ".run"] && g[b].stop && h(this, g, b);
					for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
					(!d || !c) && f.dequeue(this, a)
				})
			}
		}), f.each({
			slideDown: cw("show", 1),
			slideUp: cw("hide", 1),
			slideToggle: cw("toggle", 1),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(a, b) {
			f.fn[a] = function(a, c, d) {
				return this.animate(b, a, c, d)
			}
		}), f.extend({
			speed: function(a, b, c) {
				var d = a && typeof a == "object" ? f.extend({}, a) : {
					complete: c || !c && b || f.isFunction(a) && a,
					duration: a,
					easing: c && b || b && !f.isFunction(b) && b
				};
				d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
				if (d.queue == null || d.queue === !0) d.queue = "fx";
				d.old = d.complete, d.complete = function(a) {
					f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
				};
				return d
			},
			easing: {
				linear: function(a, b, c, d) {
					return c + d * a
				},
				swing: function(a, b, c, d) {
					return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
				}
			},
			timers: [],
			fx: function(a, b, c) {
				this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
			}
		}), f.fx.prototype = {
			update: function() {
				this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
			},
			cur: function() {
				if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
					var a, b = f.css(this.elem, this.prop);
					return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
				}
				return this.elem[this.prop]
			},
			custom: function(a, c, d) {
				function h(a) {
					return e.step(a)
				}
				var e = this,
					g = f.fx;
				this.startTime = ct || cu(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
					e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
				}, h() && f.timers.push(h) && !cr && (cr = setInterval(g.tick, g.interval))
			},
			show: function() {
				var a = f._data(this.elem, "fxshow" + this.prop);
				this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
			},
			hide: function() {
				this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
			},
			step: function(a) {
				var b, c, d, e = ct || cu(),
					g = !0,
					h = this.elem,
					i = this.options;
				if (a || e >= i.duration + this.startTime) {
					this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
					for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
					if (g) {
						i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
							h.style["overflow" + b] = i.overflow[a]
						}), i.hide && f(h).hide();
						if (i.hide || i.show)
							for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
						d = i.complete, d && (i.complete = !1, d.call(h))
					}
					return !1
				}
				i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
				return !0
			}
		}, f.extend(f.fx, {
			tick: function() {
				var a, b = f.timers,
					c = 0;
				for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
				b.length || f.fx.stop()
			},
			interval: 13,
			stop: function() {
				clearInterval(cr), cr = null
			},
			speeds: {
				slow: 600,
				fast: 200,
				_default: 400
			},
			step: {
				opacity: function(a) {
					f.style(a.elem, "opacity", a.now)
				},
				_default: function(a) {
					a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
				}
			}
		}), f.each(["width", "height"], function(a, b) {
			f.fx.step[b] = function(a) {
				f.style(a.elem, b, Math.max(0, a.now))
			}
		}), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
			return f.grep(f.timers, function(b) {
				return a === b.elem
			}).length
		});
		var cy = /^t(?:able|d|h)$/i,
			cz = /^(?:body|html)$/i;
		"getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
			var b = this[0],
				c;
			if (a) return this.each(function(b) {
				f.offset.setOffset(this, a, b)
			});
			if (!b || !b.ownerDocument) return null;
			if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
			try {
				c = b.getBoundingClientRect()
			} catch (d) {}
			var e = b.ownerDocument,
				g = e.documentElement;
			if (!c || !f.contains(g, b)) return c ? {
				top: c.top,
				left: c.left
			} : {
				top: 0,
				left: 0
			};
			var h = e.body,
				i = cA(e),
				j = g.clientTop || h.clientTop || 0,
				k = g.clientLeft || h.clientLeft || 0,
				l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
				m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
				n = c.top + l - j,
				o = c.left + m - k;
			return {
				top: n,
				left: o
			}
		} : f.fn.offset = function(a) {
			var b = this[0];
			if (a) return this.each(function(b) {
				f.offset.setOffset(this, a, b)
			});
			if (!b || !b.ownerDocument) return null;
			if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
			var c, d = b.offsetParent,
				e = b,
				g = b.ownerDocument,
				h = g.documentElement,
				i = g.body,
				j = g.defaultView,
				k = j ? j.getComputedStyle(b, null) : b.currentStyle,
				l = b.offsetTop,
				m = b.offsetLeft;
			while ((b = b.parentNode) && b !== i && b !== h) {
				if (f.support.fixedPosition && k.position === "fixed") break;
				c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cy.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
			}
			if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
			f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
			return {
				top: l,
				left: m
			}
		}, f.offset = {
			bodyOffset: function(a) {
				var b = a.offsetTop,
					c = a.offsetLeft;
				f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
				return {
					top: b,
					left: c
				}
			},
			setOffset: function(a, b, c) {
				var d = f.css(a, "position");
				d === "static" && (a.style.position = "relative");
				var e = f(a),
					g = e.offset(),
					h = f.css(a, "top"),
					i = f.css(a, "left"),
					j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
					k = {}, l = {}, m, n;
				j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
			}
		}, f.fn.extend({
			position: function() {
				if (!this[0]) return null;
				var a = this[0],
					b = this.offsetParent(),
					c = this.offset(),
					d = cz.test(b[0].nodeName) ? {
						top: 0,
						left: 0
					} : b.offset();
				c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
				return {
					top: c.top - d.top,
					left: c.left - d.left
				}
			},
			offsetParent: function() {
				return this.map(function() {
					var a = this.offsetParent || c.body;
					while (a && !cz.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
					return a
				})
			}
		}), f.each(["Left", "Top"], function(a, c) {
			var d = "scroll" + c;
			f.fn[d] = function(c) {
				var e, g;
				if (c === b) {
					e = this[0];
					if (!e) return null;
					g = cA(e);
					return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
				}
				return this.each(function() {
					g = cA(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
				})
			}
		}), f.each(["Height", "Width"], function(a, c) {
			var d = c.toLowerCase();
			f.fn["inner" + c] = function() {
				var a = this[0];
				return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
			}, f.fn["outer" + c] = function(a) {
				var b = this[0];
				return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
			}, f.fn[d] = function(a) {
				var e = this[0];
				if (!e) return a == null ? null : this;
				if (f.isFunction(a)) return this.each(function(b) {
					var c = f(this);
					c[d](a.call(this, b, c[d]()))
				});
				if (f.isWindow(e)) {
					var g = e.document.documentElement["client" + c],
						h = e.document.body;
					return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
				}
				if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
				if (a === b) {
					var i = f.css(e, d),
						j = parseFloat(i);
					return f.isNumeric(j) ? j : i
				}
				return this.css(d, typeof a == "string" ? a : a + "px")
			}
		}), a.jQuery = a.$ = f
	})(window);
	return $.noConflict(!0)
});
define("lib/jquery-extension/form", function(a) {
	function c() {
		if ( !! b.fn.ajaxSubmit.debug) {
			var a = "[jquery.form] " + Array.prototype.join.call(arguments, "");
			window.console && window.console.log ? window.console.log(a) : window.opera && window.opera.postError && window.opera.postError(a)
		}
	}
	var b = a("lib/jquery-1.7");
	b.fn.ajaxSubmit = function(a) {
		function u(e) {
			function C(a) {
				if (!o.aborted && !B) {
					try {
						z = w(n)
					} catch (d) {
						c("cannot access response document: ", d), a = v
					}
					if (a === u && o) {
						o.abort("timeout");
						return
					}
					if (a == v && o) {
						o.abort("server abort");
						return
					}
					if (!z || z.location.href == j.iframeSrc)
						if (!r) return;
					n.detachEvent ? n.detachEvent("onload", C) : n.removeEventListener("load", C, !1);
					var e = "success",
						f;
					try {
						if (r) throw "timeout";
						var g = j.dataType == "xml" || z.XMLDocument || b.isXMLDoc(z);
						c("isXml=" + g);
						if (!g && window.opera && (z.body == null || z.body.innerHTML == "") && --A) {
							c("requeing onLoad callback, DOM not available"), setTimeout(C, 250);
							return
						}
						var h = z.body ? z.body : z.documentElement;
						o.responseText = h ? h.innerHTML : null, o.responseXML = z.XMLDocument ? z.XMLDocument : z, g && (j.dataType = "xml"), o.getResponseHeader = function(a) {
							var b = {
								"content-type": j.dataType
							};
							return b[a]
						}, h && (o.status = Number(h.getAttribute("status")) || o.status, o.statusText = h.getAttribute("statusText") || o.statusText);
						var i = (j.dataType || "").toLowerCase(),
							l = /(json|script|text)/.test(i);
						if (l || j.textarea) {
							var p = z.getElementsByTagName("textarea")[0];
							if (p) o.responseText = p.value, o.status = Number(p.getAttribute("status")) || o.status, o.statusText = p.getAttribute("statusText") || o.statusText;
							else if (l) {
								var q = z.getElementsByTagName("pre")[0],
									t = z.getElementsByTagName("body")[0];
								q ? o.responseText = q.textContent ? q.textContent : q.innerText : t && (o.responseText = t.textContent ? t.textContent : t.innerText)
							}
						} else i == "xml" && !o.responseXML && o.responseText != null && (o.responseXML = D(o.responseText));
						try {
							y = F(o, i, j)
						} catch (a) {
							e = "parsererror", o.error = f = a || e
						}
					} catch (a) {
						c("error caught: ", a), e = "error", o.error = f = a || e
					}
					o.aborted && (c("upload aborted"), e = null), o.status && (e = o.status >= 200 && o.status < 300 || o.status === 304 ? "success" : "error"), e === "success" ? (j.success && j.success.call(j.context, y, "success", o), k && b.event.trigger("ajaxSuccess", [o, j])) : e && (f == undefined && (f = o.statusText), j.error && j.error.call(j.context, o, e, f), k && b.event.trigger("ajaxError", [o, j, f])), k && b.event.trigger("ajaxComplete", [o, j]), k && !--b.active && b.event.trigger("ajaxStop"), j.complete && j.complete.call(j.context, o, e), B = !0, j.timeout && clearTimeout(s), setTimeout(function() {
						j.iframeTarget || m.remove(), o.responseXML = null
					}, 100)
				}
			}

			function x() {
				function h() {
					try {
						var a = w(n).readyState;
						c("state = " + a), a.toLowerCase() == "uninitialized" && setTimeout(h, 50)
					} catch (b) {
						c("Server abort: ", b, " (", b.name, ")"), C(v), s && clearTimeout(s), s = undefined
					}
				}
				var a = g.attr("target"),
					e = g.attr("action");
				f.setAttribute("target", l), d || f.setAttribute("method", "POST"), e != j.url && f.setAttribute("action", j.url), !j.skipEncodingOverride && (!d || /post/i.test(d)) && g.attr({
					encoding: "multipart/form-data",
					enctype: "multipart/form-data"
				}), j.timeout && (s = setTimeout(function() {
					r = !0, C(u)
				}, j.timeout));
				var i = [];
				try {
					if (j.extraData)
						for (var k in j.extraData) i.push(b('<input type="hidden" name="' + k + '" />').attr("value", j.extraData[k]).appendTo(f)[0]);
					j.iframeTarget || (m.appendTo("body"), n.attachEvent ? n.attachEvent("onload", C) : n.addEventListener("load", C, !1)), setTimeout(h, 15), f.submit()
				} finally {
					f.setAttribute("action", e), a ? f.setAttribute("target", a) : g.removeAttr("target"), b(i).remove()
				}
			}

			function w(a) {
				var b = a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document;
				return b
			}
			var f = g[0],
				h, i, j, k, l, m, n, o, p, q, r, s, t = !! b.fn.prop;
			if (e)
				if (t)
					for (i = 0; i < e.length; i++) h = b(f[e[i].name]), h.prop("disabled", !1);
				else
					for (i = 0; i < e.length; i++) h = b(f[e[i].name]), h.removeAttr("disabled");
			if (b(":input[name=submit],:input[id=submit]", f).length) alert('Error: Form elements must not have name or id of "submit".');
			else {
				j = b.extend(!0, {}, b.ajaxSettings, a), j.context = j.context || j, l = "jqFormIO" + (new Date).getTime(), j.iframeTarget ? (m = b(j.iframeTarget), q = m.attr("name"), q == null ? m.attr("name", l) : l = q) : (m = b('<iframe name="' + l + '" src="' + j.iframeSrc + '" />'), m.css({
					position: "absolute",
					top: "-1000px",
					left: "-1000px"
				})), n = m[0], o = {
					aborted: 0,
					responseText: null,
					responseXML: null,
					status: 0,
					statusText: "n/a",
					getAllResponseHeaders: function() {},
					getResponseHeader: function() {},
					setRequestHeader: function() {},
					abort: function(a) {
						var d = a === "timeout" ? "timeout" : "aborted";
						c("aborting upload... " + d), this.aborted = 1, m.attr("src", j.iframeSrc), o.error = d, j.error && j.error.call(j.context, o, d, a), k && b.event.trigger("ajaxError", [o, j, d]), j.complete && j.complete.call(j.context, o, d)
					}
				}, k = j.global, k && !(b.active++) && b.event.trigger("ajaxStart"), k && b.event.trigger("ajaxSend", [o, j]);
				if (j.beforeSend && j.beforeSend.call(j.context, o, j) === !1) {
					j.global && b.active--;
					return
				}
				if (o.aborted) return;
				p = f.clk, p && (q = p.name, q && !p.disabled && (j.extraData = j.extraData || {}, j.extraData[q] = p.value, p.type == "image" && (j.extraData[q + ".x"] = f.clk_x, j.extraData[q + ".y"] = f.clk_y)));
				var u = 1,
					v = 2;
				j.forceSync ? x() : setTimeout(x, 10);
				var y, z, A = 50,
					B, D = b.parseXML || function(a, b) {
						window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml");
						return b && b.documentElement && b.documentElement.nodeName != "parsererror" ? b : null
					}, E = b.parseJSON || function(a) {
						return window.eval("(" + a + ")")
					}, F = function(a, c, d) {
						var e = a.getResponseHeader("content-type") || "",
							f = c === "xml" || !c && e.indexOf("xml") >= 0,
							g = f ? a.responseXML : a.responseText;
						f && g.documentElement.nodeName === "parsererror" && b.error && b.error("parsererror"), d && d.dataFilter && (g = d.dataFilter(g, c)), typeof g == "string" && (c === "json" || !c && e.indexOf("json") >= 0 ? g = E(g) : (c === "script" || !c && e.indexOf("javascript") >= 0) && b.globalEval(g));
						return g
					}
			}
		}
		if (!this.length) {
			c("ajaxSubmit: skipping submit process - no element selected");
			return this
		}
		var d, e, f, g = this;
		typeof a == "function" && (a = {
			success: a
		}), d = this.attr("method"), e = this.attr("action"), f = typeof e == "string" ? b.trim(e) : "", f = f || window.location.href || "", f && (f = (f.match(/^([^#]+)/) || [])[1]), a = b.extend(!0, {
			url: f,
			success: b.ajaxSettings.success,
			type: d || "GET",
			iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
		}, a);
		var h = {};
		this.trigger("form-pre-serialize", [this, a, h]);
		if (h.veto) {
			c("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
			return this
		}
		if (a.beforeSerialize && a.beforeSerialize(this, a) === !1) {
			c("ajaxSubmit: submit aborted via beforeSerialize callback");
			return this
		}
		var i = a.traditional;
		i === undefined && (i = b.ajaxSettings.traditional);
		var j, k, l, m = this.formToArray(a.semantic);
		a.data && (a.extraData = a.data, j = b.param(a.data, i));
		if (a.beforeSubmit && a.beforeSubmit(m, this, a) === !1) {
			c("ajaxSubmit: submit aborted via beforeSubmit callback");
			return this
		}
		this.trigger("form-submit-validate", [m, this, a, h]);
		if (h.veto) {
			c("ajaxSubmit: submit vetoed via form-submit-validate trigger");
			return this
		}
		var n = b.param(m, i);
		j && (n = n ? n + "&" + j : j), a.type.toUpperCase() == "GET" ? (a.url += (a.url.indexOf("?") >= 0 ? "&" : "?") + n, a.data = null) : a.data = n;
		var o = [];
		a.resetForm && o.push(function() {
			g.resetForm()
		}), a.clearForm && o.push(function() {
			g.clearForm()
		});
		if (!a.dataType && a.target) {
			var p = a.success || function() {};
			o.push(function(c) {
				var d = a.replaceTarget ? "replaceWith" : "html";
				b(a.target)[d](c).each(p, arguments)
			})
		} else a.success && o.push(a.success);
		a.success = function(b, c, d) {
			var e = a.context || a;
			for (var f = 0, h = o.length; f < h; f++) o[f].apply(e, [b, c, d || g, g])
		};
		var q = b("input:file", this).length > 0,
			r = "multipart/form-data",
			s = g.attr("enctype") == r || g.attr("encoding") == r;
		if (a.iframe !== !1 && (q || a.iframe || s)) a.closeKeepAlive ? b.get(a.closeKeepAlive, function() {
			u(m)
		}) : u(m);
		else {
			if (b.browser.msie && d == "get" && typeof a.type == "undefined") {
				var t = g[0].getAttribute("method");
				typeof t == "string" && (a.type = t)
			}
			b.ajax(a)
		}
		this.trigger("form-submit-notify", [this, a]);
		return this
	}, b.fn.ajaxForm = function(a) {
		if (this.length === 0) {
			var d = {
				s: this.selector,
				c: this.context
			};
			if (!b.isReady && d.s) {
				c("DOM not ready, queuing ajaxForm"), b(function() {
					b(d.s, d.c).ajaxForm(a)
				});
				return this
			}
			c("terminating; zero elements found by selector" + (b.isReady ? "" : " (DOM not ready)"));
			return this
		}
		return this.ajaxFormUnbind().bind("submit.form-plugin", function(c) {
			c.isDefaultPrevented() || (c.preventDefault(), b(this).ajaxSubmit(a))
		}).bind("click.form-plugin", function(a) {
			var c = a.target,
				d = b(c);
			if (!d.is(":submit,input:image")) {
				var e = d.closest(":submit");
				if (e.length == 0) return;
				c = e[0]
			}
			var f = this;
			f.clk = c;
			if (c.type == "image")
				if (a.offsetX != undefined) f.clk_x = a.offsetX, f.clk_y = a.offsetY;
				else
			if (typeof b.fn.offset == "function") {
				var g = d.offset();
				f.clk_x = a.pageX - g.left, f.clk_y = a.pageY - g.top
			} else f.clk_x = a.pageX - c.offsetLeft, f.clk_y = a.pageY - c.offsetTop;
			setTimeout(function() {
				f.clk = f.clk_x = f.clk_y = null
			}, 100)
		})
	}, b.fn.ajaxFormUnbind = function() {
		return this.unbind("submit.form-plugin click.form-plugin")
	}, b.fn.formToArray = function(a) {
		var c = [];
		if (this.length === 0) return c;
		var d = this[0],
			e = a ? d.getElementsByTagName("*") : d.elements;
		if (!e) return c;
		var f, g, h, i, j, k, l;
		for (f = 0, k = e.length; f < k; f++) {
			j = e[f], h = j.name;
			if (!h) continue;
			if (a && d.clk && j.type == "image") {
				!j.disabled && d.clk == j && (c.push({
					name: h,
					value: b(j).val()
				}), c.push({
					name: h + ".x",
					value: d.clk_x
				}, {
					name: h + ".y",
					value: d.clk_y
				}));
				continue
			}
			i = b.fieldValue(j, !0);
			if (i && i.constructor == Array)
				for (g = 0, l = i.length; g < l; g++) c.push({
					name: h,
					value: i[g]
				});
			else i !== null && typeof i != "undefined" && c.push({
				name: h,
				value: i
			})
		}
		if (!a && d.clk) {
			var m = b(d.clk),
				n = m[0];
			h = n.name, h && !n.disabled && n.type == "image" && (c.push({
				name: h,
				value: m.val()
			}), c.push({
				name: h + ".x",
				value: d.clk_x
			}, {
				name: h + ".y",
				value: d.clk_y
			}))
		}
		return c
	}, b.fn.formSerialize = function(a) {
		return b.param(this.formToArray(a))
	}, b.fn.fieldSerialize = function(a) {
		var c = [];
		this.each(function() {
			var d = this.name;
			if ( !! d) {
				var e = b.fieldValue(this, a);
				if (e && e.constructor == Array)
					for (var f = 0, g = e.length; f < g; f++) c.push({
						name: d,
						value: e[f]
					});
				else e !== null && typeof e != "undefined" && c.push({
					name: this.name,
					value: e
				})
			}
		});
		return b.param(c)
	}, b.fn.fieldValue = function(a) {
		for (var c = [], d = 0, e = this.length; d < e; d++) {
			var f = this[d],
				g = b.fieldValue(f, a);
			if (g === null || typeof g == "undefined" || g.constructor == Array && !g.length) continue;
			g.constructor == Array ? b.merge(c, g) : c.push(g)
		}
		return c
	}, b.fieldValue = function(a, c) {
		var d = a.name,
			e = a.type,
			f = a.tagName.toLowerCase();
		c === undefined && (c = !0);
		if (c && (!d || a.disabled || e == "reset" || e == "button" || (e == "checkbox" || e == "radio") && !a.checked || (e == "submit" || e == "image") && a.form && a.form.clk != a || f == "select" && a.selectedIndex == -1)) return null;
		if (f == "select") {
			var g = a.selectedIndex;
			if (g < 0) return null;
			var h = [],
				i = a.options,
				j = e == "select-one",
				k = j ? g + 1 : i.length;
			for (var l = j ? g : 0; l < k; l++) {
				var m = i[l];
				if (m.selected) {
					var n = m.value;
					n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value);
					if (j) return n;
					h.push(n)
				}
			}
			return h
		}
		return b(a).val()
	}, b.fn.clearForm = function() {
		return this.each(function() {
			b("input,select,textarea", this).clearFields()
		})
	}, b.fn.clearFields = b.fn.clearInputs = function() {
		var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var b = this.type,
				c = this.tagName.toLowerCase();
			a.test(b) || c == "textarea" ? this.value = "" : b == "checkbox" || b == "radio" ? this.checked = !1 : c == "select" && (this.selectedIndex = -1)
		})
	}, b.fn.resetForm = function() {
		return this.each(function() {
			(typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) && this.reset()
		})
	}, b.fn.enable = function(a) {
		a === undefined && (a = !0);
		return this.each(function() {
			this.disabled = !a
		})
	}, b.fn.selected = function(a) {
		a === undefined && (a = !0);
		return this.each(function() {
			var c = this.type;
			if (c == "checkbox" || c == "radio") this.checked = a;
			else if (this.tagName.toLowerCase() == "option") {
				var d = b(this).parent("select");
				a && d[0] && d[0].type == "select-one" && d.find("option").selected(!1), this.selected = a
			}
		})
	}, b.fn.ajaxSubmit.debug = !1
});
define("lib/utils", function(a, b) {
	var c = Array.prototype,
		d = c.slice;
	Object.create || (Object.create = function(a) {
		function b() {}
		if (arguments.length > 1) throw new Error("Object.create implementation only accepts the first parameter.");
		b.prototype = a;
		return new b
	}), Function.prototype.bind || (Function.prototype.bind = function(a) {
		var b = this;
		if (typeof b != "function") throw new TypeError("Function.prototype.bind called on incompatible " + b);
		var c = d.call(arguments, 1),
			e = function() {
				if (this instanceof e) {
					var f = function() {};
					f.prototype = b.prototype;
					var g = new f,
						h = b.apply(g, c.concat(d.call(arguments)));
					return Object(h) === h ? h : g
				}
				return b.apply(a, c.concat(d.call(arguments)))
			};
		return e
	});
	var e = a("lib/jquery-1.7");
	a("lib/jquery-extension/tipArrows/tipArrows"), e.fn.extend({
		placeHolder: function() {
			var a = "placeholder" in document.createElement("input");
			e.placeHolder = {};
			var b = function(a, b) {
				var c = a.css("color"),
					d = b.info || "例如",
					f = function() {
						if (a[0].value === "" || a[0].value === d) a.addClass("placeholder"), a.css("color", b.color || "#999999"), a[0].value = d
					}, g = function() {
						a.removeClass("placeholder"), a.css("color", c)
					};
				f(), a.bind("focus.clearIt", function() {
					a[0].value === d && (a[0].value = "")
				}), a.bind("blur.restoreIt", function() {
					f()
				}), a.val = function() {
					if (arguments.length === 0) return a.holded() ? "" : e.fn.val.apply(a, arguments);
					arguments[0] === "" || arguments[0] === null ? (a[0].value = "", f()) : (g(), e.fn.val.apply(a, arguments))
				}, a.bind("keydown", function() {
					a.css("color", c)
				}), a.bind("check", function() {
					a.css("color", c)
				}), a.holded = function() {
					return a.attr("placeholder") === a[0].value && a.hasClass("placeholder")
				}
			};
			return function(c) {
				if (this.size() !== 0) {
					var d = this,
						f = this[0];
					!f.form || e(f.form).submit(function() {
						e(f).hasClass("placeholder") && f.value == e(f).attr("placeholder") && (f.value = "")
					}), e.placeHolder[d.selector] = d, d.attr("placeholder", c.info || "例如"), a || b(d, c)
				}
			}
		}(),
		clickCopy: function() {
			if (!e.browser.msie) {
				var a = "/copyComponent.swf",
					b = 0;
				return function(c, d) {
					var f = this,
						g = "onlyForCopyText_" + b,
						h = "forCopyTextCallback_" + b;
					window[g] = function() {
						return e.isFunction(c) ? c() : ""
					}, window[h] = function() {
						e.isFunction(d) && d(f)
					};
					var i = e('<object type="application/x-shockwave-flash" data="' + a + '" width="100" height="20" style="position:absolute;">' + '<param name="menu" value="false">' + '<param name="scale" value="noScale">' + '<param name="allowScriptAccess" value="always">' + '<param name="wmode" value="transparent">' + '<param name="flashvars" value="btnStr=&nbsp;&btnCopiedStr=&nbsp;&copyFunc=' + g + "&copiedDelay=500&onCopied=" + h + '&mode=debug">' + "</object>");
					i.appendTo(f), f.css("position") === "static" && f.css("position", "relative"), i.css({
						top: 0,
						left: 0,
						width: f.outerWidth(),
						height: f.outerHeight()
					}), i.click(function(a) {
						a.stopPropagation()
					}), b++
				}
			}
			var c = function(a, b) {
				window.clipboardData && e.isFunction(a) && (window.clipboardData.clearData(), window.clipboardData.setData("Text", a()) ? b() : alert("您的浏览器不支持直接复制功能，请手工复制或者查看帮助中的常见问题进行设置。"))
			};
			return function(a, b) {
				this.click(function(d) {
					var f = this;
					c(a, function() {
						e.isFunction(b) && b(f)
					}), d.preventDefault()
				})
			}
		}(),
		copyClick4RenGong: function(a) {
			this.clickCopy(function() {
				return f(a())
			}, function(a) {
				e(a).find("span").html("已复制"), window.setTimeout(function() {
					e(a).find("span").html("复制")
				}, 500)
			})
		}
	});
	var f = function(a) {
		return e("<div></div>").html(a).text()
	};
	return {
		storage: function(a, b) {
			var c = function(a, b) {
				var c = window.localStorage;
				if (b === undefined) return c.getItem(a);
				if (a !== undefined && b !== undefined) {
					c.setItem(a, b);
					return b
				}
			}, d = function(a, b) {
					var c = document.documentElement;
					c.addBehavior("#default#userData");
					if (b === undefined) {
						c.load("fanyiweb2");
						return c.getAttribute(a)
					}
					if (a !== undefined && b !== undefined) {
						c.setAttribute(a, b), c.save("fanyiweb2");
						return b
					}
				};
			if ( !! window.localStorage) return c(a, b);
			if ( !! document.documentElement.addBehavior) return d(a, b)
		},
		cookie: function(a, b, c) {
			function e(a) {
				var b = document.cookie.match(new RegExp("(^| )" + a + "=([^;]*)(;|$)"));
				return b != null ? decodeURIComponent(b[2]) : null
			}

			function d(a, b, c) {
				var d = 30,
					e = new Date;
				e.setTime(e.getTime() + d * 24 * 60 * 60 * 1e3), document.cookie = a + "=" + b + ";expires=" + e.toGMTString()
			}
			if (!b) return e(a);
			d(a, b, c)
		},
		tab: function(a, b) {
			e(a + ".selected").size() === 0 && (e(a).eq(0).addClass("selected"), e(e(a).eq(0).data("rel")).show()), e(a).click(function() {
				var c = e(a + ".selected"),
					d = e(c.data("rel")),
					f = e(this),
					g = e(f.data("rel"));
				d.hide(), c.removeClass("selected"), f.addClass("selected"), g.show(), e.isFunction(b) && b(f, g)
			})
		},
		timero: function(a, b) {
			var c = function(a, b) {
				this.func = a, this.time = b
			};
			c.prototype = {
				run: function() {
					var a = this;
					this.clear(), this.timeout = setTimeout(function() {
						e.isFunction(a.func) && a.func()
					}, a.time)
				},
				clear: function() {
					clearTimeout(this.timeout)
				}
			};
			return new c(a, b)
		},
		timerProxy: function() {
			var a = function() {
				!window.timerProxyTimeout || window.clearTimeout(window.timerProxyTimeout)
			};
			return function b(c, d) {
				this.timerProxy.clearProxy = b.clearProxy = a, a(), window.timerProxyTimeout = window.setTimeout(function() {
					e.isFunction(c) && c()
				}, d)
			}
		}(),
		iInterval: function() {
			var a = {}, b = 0,
				c = function(b) {
					typeof a[b] !== undefined && clearInterval(a[b])
				}, d = function(b, d, f) {
					c(b), a[b] = setInterval(function() {
						e.isFunction(d) && d()
					}, f)
				};
			return function(a, e) {
				var f = Function.prototype.bind.apply(d, [undefined, b].concat(Array.prototype.slice.call(arguments))),
					g = c.bind(undefined, b);
				b += 1;
				return {
					start: f,
					stop: g
				}
			}
		}(),
		makeArray: function(a) {
			return Array.prototype.slice.call(a, 0)
		},
		synchronize: function(a) {
			var b = this;
			a.synchronizeed = !1;
			var c = function() {
				a.synchronizeed = !1
			};
			return function() {
				if (!a.synchronizeed) {
					a.synchronizeed = !0;
					var d = b.makeArray(arguments);
					d.push(c), a.apply(this, d)
				}
			}
		},
		check: function() {
			var a = {
				mobile: /^0*(13|15|18)(\d{9}|\d-\d{3}-\d{5}|\d-\d{4}-\d{4}|\d{2}-\d{3}-\d{4}|\d{2}-\d{4}-\d{3})$/,
				phone: /^((0*\d{1,4}|\+\d{1,4}|\(\d{1,4}\))[ -]?)?(\d{2,4}[ -]?)?\d{3,4}[ -]?\d{3,4}([ -]\d{1,5})?$/,
				email: /^([a-z0-9_][a-z0-9_.-]*)?[a-z0-9_]@([a-z0-9-]+\.){0,4}([a-z0-9][a-z0-9-]{0,61})?[a-z0-9]\.[a-z]{2,6}$/i,
				qq: /^[1-9]\d{4,14}$/,
				empty: /^$/,
				"null": /.+/
			}, b = function(b, c, d, f) {
					if (!e.isFunction(f) || !e.isFunction(d)) throw Error("The rightHandle or wrongHandle must be functions.");
					if (e.isFunction(b)) b(c) ? f() : d();
					else {
						b = b.exec ? b : a[b];
						if (!b.exec) throw Error("Wrong regular expression.");
						b.exec(""), b.exec(c) !== null ? f() : d()
					}
				}, c = function(a, c, d) {
					var f = [];
					f.isValid = a === "and";
					for (var g = 0, h = c.length; g < h; g++) {
						var i = c[g];
						b(i.ck, d, function() {
							i.msg !== undefined && f.push(i.msg), a === "and" && (f.isValid = !1), e.isFunction(i.fail) && i.fail(i.msg)
						}, function() {
							a === "or" && (f.isValid = !0), e.isFunction(i.pass) && i.pass()
						})
					}
					return f
				}, d = function(a, b, c) {
					return "<" + (b || "i") + ' class="' + (c || "") + ' error-message">' + a + "</" + (b || "i") + ">"
				}, f = function(a, b, c) {
					e(c.elem).addClass("data-error");
					if (e.isFunction(c.error)) c.error(b);
					else {
						var f = a === "and" ? b[0] : b.join("，或");
						c.errorBox ? e(c.errorBox).html(f) : e(c.elem).after(d(f, c.tagName, c.className))
					}
				}, g = function(a) {
					e(a.elem).removeClass("data-error"), e.isFunction(a.errorReset) ? a.errorReset() : a.errorBox ? e(a.errorBox).html("") : e(e(a.elem).parent()).find("i.error-message").remove()
				}, h = function(a) {
					if (e(a.elem).size() === 0 || !! a.backDoor && a.backDoor()) return !0;
					g(a);
					var b = a.xor || "or",
						d = e.isFunction(a.val) ? a.val() : e(a.elem).val(),
						h = c(b, a.validate, e.trim(d));
					h.isValid || f(b, h, a);
					return h.isValid
				}, i = function(a) {
					var b = !0;
					k(a, function(a) {
						h(a) || (b = !1)
					}), b && a.callback()
				}, j = function(a) {
					k(a, function(a) {
						e(a.elem).die("blur.dataCheck focus.dataCheck"), a.autoCheck && e(a.elem).live("blur.dataCheck", function() {
							h(a)
						}), e(a.elem).live("focus.dataCheck", function() {
							g(a)
						})
					})
				}, k = function(a, b) {
					var c = a.configs;
					for (var d = 0; d < c.length; d++)(function(d) {
						var f = c[d];
						e.isFunction(a.error) && !e.isFunction(f.error) && (f.error = a.error), e.isFunction(a.errorReset) && !e.isFunction(f.errorReset) && (f.errorReset = a.errorReset);
						if (typeof f.autoCheck == "undefined") {
							var g = typeof a.autoCheck == "undefined" ? !0 : a.autoCheck;
							f.autoCheck = g
						}
						b(f)
					})(d)
				}, l = function(a) {
					this.configSet = a, this.config()
				};
			l.prototype = {
				constructor: l,
				config: function() {
					j(this.configSet)
				},
				run: function() {
					i(this.configSet)
				}
			};
			return function(a) {
				return new l(a)
			}
		}(),
		showTip: function() {
			var a = function(a, b) {
				a.empty(), a.remove(), e.isFunction(b) && b(), a = null
			};
			return function(b, c, d, f, g, h) {
				var i = e('<div class="msg-tips">' + d + "</div>"),
					j = e('<a rel="no-follow" href="javascript:void(0)" class="iKnow">我知道了</a>');
				f.find(".msg-tips").size() === 0 && (j.appendTo(i), i.appendTo(f));
				var k = Object.create(b);
				i.$t(k), i.css({
					left: c.left - (i.outerWidth() + k.size.height),
					top: -(k.size.left + k.offPos) + c.top
				}), j.bind("click.closeIt", function() {
					a(i, g), j.unbind("click.closeIt"), j = null
				}), e.isFunction(h) && h();
				return function(b) {
					a(i, b)
				}
			}
		}(),
		loadScript: function(a, b, c) {
			var d = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
				f = document.createElement("script");
			e.extend(c, {
				type: "text/javascript",
				src: a,
				charset: "utf-8"
			});
			for (var g in c) c.hasOwnProperty(g) && f.setAttribute(g, c[g]);
			var h = !1;
			f.onload = f.onreadystatechange = function() {
				!h && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (e.isFunction(b.suc) && b.suc(), f.onload = f.onreadystatechange = null, d && f.parentNode && d.removeChild(f), f = null, h = !0)
			}, f.onerror = function() {
				e.isFunction(b.fail) && b.fail()
			}, d.insertBefore(f, d.firstChild)
		},
		addFavorite: function(a, b) {
			try {
				window.external.addFavorite(a, b)
			} catch (c) {
				try {
					window.sidebar.addPanel(b, a, "")
				} catch (c) {
					alert("加入收藏失败，请手动添加。")
				}
			}
		},
		decodeText: f
	}
});
define("lib/jquery-extension/tipArrows/tipArrows", function(a, b) {
	function d(a) {
		if (!a.el) throw new Error("The el parameter should not be null.");
		this.config = a, this.init()
	}
	var c = a("lib/jquery-1.7");
	c.fn.extend({
		$t: function(a) {
			var b = a || {};
			this.each(function() {
				b.el = c(this);
				return new d(b)
			})
		}
	}), d.bind = function(a) {
		return new d(a)
	}, d.prototype = {
		constructor: d,
		init: function() {
			this.initConfig(), this.addIn(), this.setBorderWidth(), this.setBorderStyle(), this.setColor(), this.setOffPos(), this.setMarginOffset()
		},
		initConfig: function() {
			this.el = this.config.el, this.type = this.config.type || "up"
		},
		addIn: function() {
			var a = this,
				b = a.type;
			a.tipArrow = c('<div style="position: absolute; font-size: 0; line-height:0;">\n                         <span class="border" style="position: absolute;border-style: dashed;border-color: transparent;_border-color:tomato;_filter:chroma(color=tomato);"></span>\n                         <span class="padding" style="position: absolute;border-style: dashed;border-color: transparent;_border-color:tomato; _filter:chroma(color=tomato);"></span>\n                        </div>'), a.tipBorder = a.tipArrow.find(".border"), a.tipPadding = a.tipArrow.find(".padding"), a.el.append(a.tipArrow)
		},
		setBorderWidth: function() {
			var a = this.config.size,
				b = this.config.borderWidth,
				c = {
					up: [0, "right", "height", "left"],
					right: ["left", 0, "right", "height"],
					down: ["height", "left", 0, "right"],
					left: ["right", "height", "left", 0]
				}[this.type],
				d = [],
				e = [];
			for (var f = 0; f < 4; f++)(function(f) {
				var g = c[f];
				g !== 0 ? (d.push(a[g] + "px"), e.push(a[g] - b + "px")) : (d.push(0), e.push(0))
			})(f);
			this.tipBorder.css({
				"border-width": d.join(" ")
			}), this.tipPadding.css({
				"border-width": e.join(" ")
			})
		},
		setBorderStyle: function() {
			var a = {
				left: "right",
				right: "left",
				down: "top",
				up: "bottom"
			}, b = "border-" + a[this.type] + "-style";
			this.tipBorder.css(b, "solid"), this.tipPadding.css(b, "solid")
		},
		setColor: function() {
			var a = {
				left: "right",
				right: "left",
				down: "top",
				up: "bottom"
			}, b = "border-" + a[this.type] + "-color";
			this.tipBorder.css(b, this.config.borderColor), this.tipPadding.css(b, this.config.paddingColor)
		},
		setOffPos: function() {
			var a = this.config.offPos + "px",
				b = -(this.config.size.height - this.config.borderWidth) + "px";
			this.type === "up" && c.browser.msie && c.browser.version <= 6 && (b = -(this.config.size.height - this.config.borderWidth + 2) + "px");
			var d = {
				left: {
					top: a,
					left: b
				},
				up: {
					left: a,
					top: b
				},
				right: {
					top: a,
					right: 0
				},
				down: {
					left: a,
					bottom: 0
				}
			};
			this.config.pos ? this.tipArrow.css(this.config.pos) : !d[this.type] || this.tipArrow.css(d[this.type])
		},
		setMarginOffset: function() {
			var a = -this.config.borderWidth + "px",
				b = {
					left: {
						"margin-left": a,
						"margin-top": a
					},
					up: {
						"margin-left": a,
						"margin-top": a
					},
					right: {
						"margin-top": a
					},
					down: {
						"margin-left": a
					}
				};
			this.tipBorder.css(b[this.type])
		}
	}, b.$t = d
});
define("business/log", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = a("business/consts");
	b.log = function(a) {
		var b = c.param(a);
		(new Image).src = "rl.do?" + b, d.status === "product" && _gaq.push(["_trackEvent", a.action !== undefined ? a.action : "null", a.position !== undefined ? a.position : "null"])
	}, b.init = function() {
		c(".clog-js").live("click", function() {
			var a = c(this),
				d = {};
			d.action = a.data("act"), d.position = a.data("pos"), b.log(d)
		}), c(".flog-js").live("click", function() {
			var a = c(this),
				d = {};
			d.category = "FILE_OPERATION", d.action = a.data("act"), d.position = a.data("pos"), b.log(d)
		})
	}
});
define("business/consts", function(a, b) {
	return {
		mincharge: "0.01",
		maxcharge: "20000",
		status: "product",
		discount: "100",
		baseUrl: "http://f.youdao.com",
		en2zh: "0.45",
		zh2en: "0.29",
		state: "off",
		resourceBase: "http://shared.ydstatic.com/at/2.0.6b"
	}
});
define("business/tmpl", function(a, b) {
	function t(a) {
		switch (r(a)) {
			case "string":
			case "number":
			case "array":
				return a.length;
			case "object":
				var b = 0;
				for (var c in a) a.hasOwnProperty(c) && b++;
				return b
		}
		return 0
	}

	function s(a, b) {
		if (typeof a != typeof b) return !1;
		switch (r(a)) {
			case "string":
			case "number":
				return a === b;
			case "array":
				if (a.length === b.length) {
					for (var c = 0, d = a.length; c < d; c++) {
						if (s(a[c], b[c])) continue;
						return !1
					}
					return !0
				}
				return !1;
			case "object":
				if (t(a) === t(b)) {
					for (var e in a) {
						if (s(a[e], b[e])) continue;
						return !1
					}
					return !0
				}
				return !1
		}
	}

	function r(a) {
		return Object.prototype.toString.apply(a) === "[object Array]" ? "array" : typeof a
	}

	function q(a, b) {
		var c = !1;
		n(a) > b && (c = !0, a = a.substr(0, b));
		return c ? a + "..." : a
	}

	function p(a) {
		var b = 0;
		a.replace(/\<br/g, function() {
			b++
		});
		return b
	}

	function o(a) {
		var b = 0;
		a.replace(/\n/g, function() {
			b++
		});
		return b
	}

	function n(a) {
		var b = a.length;
		a.replace(/[\u0080-\ufff0]/g, function() {
			b++
		});
		return b
	}

	function m(a) {
		a = a.replace(/\n\s/g, "<br/>&nbsp;").replace(/\n/g, "<br/>").replace(/\s{2}/g, " &nbsp; ");
		while (p(a) >= 10) a = a.substr(0, a.lastIndexOf("<br/>"));
		return a
	}

	function l(a) {
		return '<a href="user.s?method=orderResult&orderId=' + a + '" class="see-all clog-js" data-act="View-all">查看全部</a>'
	}

	function k(a, b, c, e, f, g) {
		return '<a class="control-btn-blue" data-act="' + b + '" href="' + c + '" target="_blank" hidefocus="true">' + a + '</a><a href="' + g + '" data-act="' + f + '" class="control-btn-green" target="_blank" hidefocus="true">' + e + "</a>" + '<img src="' + d.resourceBase + '/styles/new.jpg" style="position:absolute;top:50px;left:475px;*left:465px">'
	}

	function j(a, b, c, d) {
		return '<a class="' + a + ' clog-js" data-act="' + c + '" href="' + d + '" target="_blank" hidefocus="true">' + b + "</a></div></div>"
	}

	function i(a, b, c) {
		return '<a class="' + a + ' clog-js" data-act="' + c + '" href="javascript:void(0)" hidefocus="true">' + b + "</a></div></div>"
	}
	var c = a("lib/jquery-1.7"),
		d = a("business/consts"),
		e = [],
		f = function(a) {
			return '<div class="message-box ' + (a || "") + '"><a href="javascript:void(0)" class="close"></a><div class="content">'
		}, g = function(a) {
			return '<div class="message-box ' + (a || "") + '"><div class="content">'
		}, h = function(a, b, c) {
			return parseInt(a) === 100 ? '价格： <i class="big-word num-word">' + b + "元</i><br/>" : '<span class="line-through">原价： <i class="big-word num-word">' + b + "元</i></span>&nbsp;&nbsp;&nbsp;" + '优惠价： <i class="big-word num-word">' + c + "元</i></span><br/>"
		};
	return {
		login: function() {
			return '<div class="notice">登录后，可方便查询翻译进度、结果</div>' + f("login-container") + '<div class="netease">' + '<span class="title">使用<i>网易通行证</i>登录</span>' + '<div class="assign-error-msg">' + '<label for="accountName">账号：</label><input id="accountName" type="text" value="" />' + "</div>" + '<div class="assign-error-msg">' + '<label for="accountPassword">密码：</label><input id="accountPassword" type="password" value="" />' + "</div>" + '<span class="align-text">' + '<input id="storeLoginStatus" name="storeLoginStatus" type="checkbox" checked />' + '<label for="autoLogin">下次自动登录</label> <a href="http://reg.163.com/RecoverPassword.shtml" target="_blank">忘记密码？</a>' + "</span>" + '</div><div class="others">' + "<div>您也可以使用下面的账户登录</div>" + '<div id="qq_connect_btn" class="clog-js" data-act="qq-login"></div>' + '<input type="button" class="weibo-login clog-js" data-act="weibo-login" id="wb_connect_btn" />' + "</div>" + i("control-btn login-submit align-text", '确定</a><i class="error account-error"></i><span class="register-passport">还没有网易通行证？ <a class="clog-js" data-act="register" href="http://reg.163.com/reg/reg.jsp?product=f&url=' + d.baseUrl + '" target="_blank">立即注册</a></span>', "")
		},
		defaulfEmail: function(a) {
			return "接收邮箱： <i>" + a.email + '</i> <a href="javascript:void(0)" class="otherEmail">[使用其他邮箱]</a>'
		},
		otherEmail: function(a) {
			var b = a && a.email && a.email.indexOf("@") > -1 ? a.email : "";
			return '<div class="assign-error-msg"><label for="assignEmail">接收邮箱：</label><input id="sentTo" type="text" value="' + b + '" />' + '<i class="email-error"></i>' + "</div>"
		},
		beginToPay: function(a) {
			var b = a && a.email && a.email.indexOf("@") > -1 ? this.defaulfEmail(a) : this.otherEmail(a),
				c = a.lang === "en-zh" ? "单词数统计" : "字数统计";
			return f() + c + '： <i class="text-num">' + a.length + "</i> 字<br />" + h(d.discount, a.cost, a.realCost) + "语言：" + a.lang.split("-").join("→").replace("zh", "中文").replace("en", "英文") + '<div class="default-email">' + b + "</div>" + i("control-btn confirm", "确定支付", "Confirm-Payment")
		},
		lackToPay: function(a) {
			var b = a.lang === "en-zh" ? "单词数统计" : "字数统计";
			return f() + b + '： <i class="text-num">' + a.length + "</i> 字<br />" + h(d.discount, a.cost, a.realCost) + "语言：" + a.lang.replace("zh", "中文").replace("en", "英文") + "<br/>" + '<span class="tips">您的账户余额为 <i class="leave-money">' + a.amount + "</i> 元，不足以支付，请您充值</span>" + i("control-btn charge", "去充值", "To-Chongzhi")
		},
		forbidToPay: function() {
			var a = "由于现在是非工作时间，所有译员都已经下班，本次充值金额将保存到您的账户中，可以下次使用。";
			return f() + a + "<br />" + "有问题可致电：<i>400-6608-163</i><br />" + "或发送邮件到：<i>fanyi-service@service.netease.com</i>" + "</div></div>"
		},
		paySuccess: function(a) {
			var b = "<i>您已经成功支付！</i><br />";
			return f() + b + "<br />" + '本窗口将在 <span id="countDownM">' + a + "</span> 秒后自动关闭！" + "</div></div>"
		},
		landingSubmit: function(a, b) {
			return a === 2 ? f() + b + "</div></div>" : a === 1 ? f() + '<span id="landingPopMsg">' + b + "</span>" + j("control-btn", "立即体验", "landing-end", ".") : a === 3 ? f("landingWithJf") + '<span id="landingPopMsg">' + b + "</span>" + '<div id="landingWithJfMobile">' + '<label for="mobile">手机号码：</label>' + '<input id="mobile" type="text" />' + '<input id="sendValidate" type="button" value="发送验证码" />' + '<div id="landingWithJfErrorMsg">请输入正确的手机号码</div>' + "</div>" + '<div id="landingWithJfValidate">' + '<label for="validate">验证码：</label>' + '<input id="validate" type="text" disabled="true" />' + "</div>" + '<div class="control-btn-visited landingPH clog-js" data-act="landing-failed">立即兑换</div>' + i("control-btn landingButton clog-js", "立即兑换", "landing-apply") : f() + b + i("control-btn", "确定", "landing-failed")
		},
		order: function(a) {
			var b = function(a) {
				var b = a.srcText,
					c = a.desText ? a.desText : "",
					d = {
						translating: function(a) {
							var c = n(b) > 190 || o(b) > 10 ? l(a.id) : "",
								d = a.expectTime === 1 ? 1 : a.expectTime + "~" + parseInt(a.expectTime + 3);
							return '<div class="history-item translating"><span class="time-and-see">' + a.createTime + c + "</span>" + '<span class="trans-resource history-layout">' + m(q(b, 190)) + "</span>" + '<span class="content-separate fix-vertical-middle">-&gt;</span>' + '<span class="trans-result history-layout fix-vertical-middle">' + "译员正在为您翻译中，通常" + d + "分钟便可完成" + "</span>" + "</div>"
						},
						"new": function(a) {
							var c = n(b) > 190 || o(b) > 10 ? l(a.id) : "";
							return '<div class="history-item havent-pay"><span class="time-and-see">' + a.createTime + c + "</span>" + '<span class="trans-resource history-layout">' + m(q(b, 190)) + "</span>" + '<span class="content-separate fix-vertical-middle"></span>' + '<span class="trans-result history-layout fix-vertical-middle">' + "<i>未支付订单</i>" + "<br />" + '<a data-id="' + a.id + '" data-act="continue-payment" class="continue clog-js" href="javascript:void(0)">[支付]</a>' + '<a data-id="' + a.id + '" data-act="continue-edit" class="edit clog-js" href="javascript:void(0)">[编辑]</a>' + "</span>" + "</div>"
						},
						finish: function(a) {
							var d = n(b) > 190 || n(c) > 190 || o(b) > 10 || o(c) > 10 ? l(a.id) : "";
							return '<div class="history-item"><span class="time-and-see">' + a.createTime + d + "</span>" + '<span class="trans-resource history-layout">' + m(q(b, 190)) + "</span>" + '<span class="content-separate fix-vertical-middle">-&gt;</span>' + '<span class="trans-result history-layout">' + m(q(c, 190)) + "</span>" + '<div class="go-check"><a class="clog-js" data-act="view-detail" href="./user.s?method=orderResult&orderId=' + a.id + '">详情</a>' + ' | <a href="#" data-id="' + a.id + '" class="copyTranslation clog-js" data-act="copy-translation"><span>复制</span></a></div>' + "</div>"
						},
						invalid: function(a) {
							var c = n(b) > 190 || o(b) > 10 ? l(a.id) : "",
								d = a.invReason ? a.invReason : "我们暂不提供针对起名、古诗词、自创诗歌等内容的创意性翻译，参见《有道专业翻译服务条款》第12条。您支付的翻译款已全部退至您的账户中，可随时使用。有疑问请拨打电话400-6608-163。";
							return '<div class="history-item"><span class="time-and-see">' + a.createTime + c + "</span>" + '<span class="trans-resource history-layout">' + m(q(b, 190)) + "</span>" + '<span class="content-separate fix-vertical-middle">-&gt;</span>' + '<span class="trans-result history-layout">' + d + "</span>" + "</div>"
						}
					};
				return a.status === 0 ? d["new"](a) : a.status === 100 ? d.invalid(a) : a.status >= 10 && a.status <= 20 ? d.translating(a) : d.finish(a)
			}, c = {};
			e.length > 0 ? (s(e, a) || (c.change = "yes", c.finish = "yes"), e = []) : a && a.length > 0 && (c.change = "yes"), c.htmlcode = "";
			for (var d = 0; d < a.length; d++) e.push(a[d]), c.htmlcode += b(a[d]);
			return c
		},
		loginUser: function(a) {
			a = a || {};
			var b = a.name ? a.name.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : "",
				c = a.bill ? a.bill.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : "";
			return '<div class="closeWrap clear"><a class="close" href="javascript:void(0);"></a></div> <div class="user-content"><span class="title">个人信息 <a class="modifyInfo flog-js" data-act="change-info" href="javascript:void(0);">[修改信息]</a></span><label for="userName">姓名：</label><div id="userName" class="form-item-layout">' + (b || "无") + '<input name="nameInfo" type="hidden" value="' + (b || "") + '" /></div>' + '<label for="userPhone"><strong>*</strong>电话：</label>' + '<div id="userPhone" class="form-item-layout">' + (a.phone || "无") + '<input name="phoneInfo" type="hidden" value="' + (a.phone || "") + '" /></div>' + '<label for="userEmail"><strong>*</strong>常用邮箱：</label>' + '<div id="userEmail" class="form-item-layout">' + (a.email || "无") + '<input name="emailInfo" type="hidden" value="' + (a.email || "") + '" /></div>' + '<label for="userQQ">QQ号码：</label>' + '<div id="userQQ" class="form-item-layout">' + (a.qq || "无") + '<input name="qqInfo" type="hidden" value="' + (a.qq || "") + '" /></div>' + '<label for="userBillI">发票抬头：</label> ' + '<div id="userBill" class="form-item-layout">' + (c || "无") + '<input name="billInfo" type="hidden" value="' + c + '" /></div></div>' + '<div class="confirmWrap"><a id="goToTrans" class="form-item-layout control-btn flog-js" data-act="confirm-submit" href="javascript:void(0)" rel="nofollow">确认提交</a></div>'
		},
		otherUser: function(a) {
			a = a || {};
			var b = a.bill ? a.bill.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : "",
				c = !a.username ? "" : '<a class="save-to-contact flog-js" data-act="save-contact" href="javascript:void(0)">[保存到联系方式]</a>',
				d = !a.username ? '<a href="javascript:void(0)" class="login-ctrl clog-js" data-act="click_to_login" hidefocus="true" rel="nofollow">点此登录</a>，<i style="font-weight:normal;color:#666">将自动读取已有信息，并可使用余额支付</i>' : "";
			return '<div class="closeWrap clear"><a class="close" href="javascript:void(0);"></a></div> <div class="user-content"><span class="title">个人信息 <i>(<strong>*</strong>为必填)</i></span><label for="userNameI">姓名：</label><div class="form-item-layout"><input id="userNameI" name="nameInfo" value="' + (a.name || "") + '" /></div>' + '<label for="userPhoneI"><i class="important"><strong>*</strong></i>电话：</label> ' + '<div class="form-item-layout"><input id="userPhoneI" name="phoneInfo" value="' + (a.phone || "") + '" /></div>' + '<label for="userEmailI"><i class="important"><strong>*</strong></i>常用邮箱：</label> ' + '<div class="form-item-layout"><input id="userEmailI" name="emailInfo" value="' + (a.email || "") + '" /></div> ' + '<label for="userQQI">QQ号码：</label>' + '<div class="form-item-layout"><input id="userQQI" name="qqInfo" value="' + (a.qq || "") + '" /></div>' + '<label for="userBillI">发票抬头：</label> ' + '<div class="form-item-layout"><input id="userBillI" name="billInfo" value="' + b + '" /></div></div>' + '<div class="confirmWrap"><a id="goToTrans" class="form-item-layout control-btn flog-js" data-act="confirm-submit" href="javascript:void(0)" rel="nofollow">确认提交</a></div>'
		},
		docSubmitMsg: function(a, b) {
			var c = null,
				d = j("control-btn", "我知道了", "redirect-file", "./file.do?method=sendMail&type=rengong&orderId=" + b.id + "&email=" + b.email);
			a ? b.available === -1 ? c = "现在是非工作时间，客户专员会在下个工作日早上电话通知您具体价格和翻译时间。请您耐心等待，谢谢！" : c = "客户专员会在接到订单后 10 分钟内分析订单，然后电话通知您具体价格和翻译时间。请您耐心等待，谢谢！" : c = "<i>您的订单提交失败, 请稍后再试！</i><br />";
			return g() + c + "<br />" + "有问题可致电：<i>400-6608-163</i><br />" + "或发送邮件到：<i>fanyi-service@service.netease.com</i>" + d
		},
		chooseBaojia: function(a, b) {
			var c = null,
				d = k("", "redirect-file", "./file.do?method=sendMail&type=rengong&orderId=" + b.id + "&email=" + b.email, "", "redirect-file", "./file.do?method=sendMail&type=auto&orderId=" + b.id + "&email=" + b.email);
			a ? c = "<strong>抱歉，客服MM下班了，您可以选择：</strong>" : c = "<i>您的订单提交失败, 请稍后再试！</i><br />";
			return '<div class="message-box-baojia"><div class="content">' + c + "<br />" + d + "<br/><ul><li>1、自助下单获取价格更快捷，且价格和客服报价一致。</li>" + "<li>2、若您的文档需有排版等特殊要求，建议选择客服明天联系。</li>" + "<li>3、客服的工作时间为每天：9点-18点，非工作时间建议您自助报价。</li></ul></div></div>"
		},
		cancelReason: function(a) {
			return f() + '<div class="cancel-title">取消自动报价的原因:</div>' + '<input id="orderId" name="orderId" type="hidden" value="' + a + '">' + '<div class="reason-radio"><input type="radio" value="价格太贵" name="reason" class="radioButton" ><span>价格太贵</span><br/><input type="radio" value="语言检测错误" name="reason" class="radioButton"><span>语言检测错误</span></div>' + '<div class="reason-radio"><input type="radio" value="字数统计误差较大" name="reason" class="radioButton"><span>字数统计误差较大</span><br/><input type="radio" value="时间上无法满足" name="reason" class="radioButton"><span>时间上无法满足</span></div>' + '<div class="other-reason-radio"><input type="radio" value="其它" name="reason" class="radioButton"><span>其它</span>&nbsp;&nbsp;<input type="text" placeholder="请注明" name="otherReason" id="otherReason" style="height:22px;width:200px;font-size:12px"/> </div>' + '<a class="cancel-btn-blue"  href="#" hidefocus="true">等待客服联系</a><a class="cancel-btn-green"  href="#" hidefocus="true">取消订单</a>' + "</div></div>"
		},
		levelDiff: function() {
			return '<div class="message-box2"><a href="javascript:void(0)" class="close"></a><div class="content"><table id="doc-table" cellspacing="0" cellpadding=""><thead><tr><td>质量等级</td><td>中译英</td><td>英译中</td><td class="main">文档用途</td><td class="sub">译员配置</td><td>处理流程</td><td>售后服务</td></tr></thead><tbody><tr><td class="level">高级</td><td>240元/千字</td><td>360元/千字</td><td class="main">适用于<i>企业内部或者公开场合小范围交流</i>，不适用于专业性极强领域。</td><td class="sub">3-5年经验，累计翻译字数达200万。</td><td>译员翻译+1轮高级审校</td><td>3次免费修改</td></tr><tr><td class="level">专业</td><td>330元/千字</td><td>495元/千字</td><td class="main">适用于<i>专业领域、重要场合</i>，对专业性及译者极高要求。</td><td class="sub">5年以上，累计翻译字数达500万，根据细分领域分单。</td><td>译员翻译+2轮专家审校+质检抽验</td><td>5次免费修改</td></tr><tr><td class="top"><i>特殊备注：</i></td><td colspan="6"><p>1、字数均按照原文统计。仅包含可编辑的文字；若文档中的图片等不可编辑的文字需要翻译，需要另外计费。</p><p>2、行业统计规范，电子版本以MS WORD中统计为准，即:</p><p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;英译中---“字数统计”---“字数”</p><p>&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;中译英---“字数统计”---“字符数不计空格”</p><p>3、对于证书、证件等不可编辑的文档，统一按份报价。</p><p>4、排版、打印、盖章等都是额外的服务，收费另计。</p></td></tr></tbody></table></div></div>'
		},
		fastTip: function() {
			return '<div class="message-box-fast"><a href="javascript:void(0)" class="close"></a><div class="content"><div class="title">请您知晓： 快速翻译，不提供以下2种类型的服务：</div><li>1、包含大量技术词汇、专业知识的复杂文本内容。</li><li>2、广告语、公司起名、诗歌、菜单等需要高度创意的文本内容。</li><li class="explain">以上2种服务，请提交<a href="/?path=file">&nbsp;文档翻译&nbsp;</a>，会有专业的客服为您服务。若您提交快速翻译，<i>我们有权取消订单并退款。</i></li><br/><div class="title"> 获得高质量快速翻译结果的6个技巧：</div><li class="title2">1、提供上下文或参考资料。</li><li class="explain">这些信息，您可以填写在备注区域，它们会帮助译员理解原文含义。</li><li class="title2">2、告诉译员译文用于何处。</li><li class="explain">您需要的翻译的风格如何？词汇需要固定译法吗？语法有特定的要求吗？这些也可以填写在备注区。</li><li class="title2">3、请不要包含大量技术专业词汇。</li><li class="explain">此类翻译请提交<a href="/?path=file">&nbsp;文档翻译&nbsp;</a>，除非您只需要初略的草案结果，那么请在备注区告诉我们。</li><li class="title2">4、请不要提交需要高度创意处理的翻译需求。</li><li class="explain">公司起名、广告语、诗歌、菜单等翻译需求需要高度的创意处理，请您提交<a href="/?path=file">&nbsp;文档翻译&nbsp;</a>。</li><li class="title2">5、姓名、地址有固定的标准译法。</li><li class="explain">请您查看<a href="http://zhuanyefanyi.blog.163.com/blog/static/202094076201321132520244/">&nbsp;这里&nbsp;</a>，您了解这些原则后，或许您自己翻译就可以得到想要的结果。</li><li class="title2">6、除非非常紧急，我们不建议您把篇幅较长（2000字以上）文本提交快速翻译。</li><li class="explain">长篇文本，建议您提交<a href="/?path=file">&nbsp;文档翻译&nbsp;</a>，分拆成多个片段在快速翻译中提交，可能会带来术语不一致等问题。</li></div></div>'
		},
		complainSubmitMsg: function() {
			var a = "<i>您的投诉提交成功！</i><br />";
			return f() + a + "<br />" + "有问题可致电：<i>400-6608-163</i><br />" + "或发送邮件到：<i>fanyi-service@service.netease.com</i>" + i("control-btn", "确定", "")
		},
		favoratePanelMsg: function(a) {
			var b = "";
			c.browser.webkit || c.browser.opera ? b = '<div id="favPanel"><div id="tipsDesc">按<span>CTRL+D</span>快速收藏有道专业翻译，下次轻松访问！</div><div id="stopSuggest"><a id="stopSuggestA" class="clog-js" data-act="cancel-favorite-tips" href="javascript:void(0);">不再提示</a></div></div>' : b = '<div id="favPanel"><div id="tipsDesc">把专业翻译加入收藏夹，下次轻松访问</div><div id="addFavorite"><a id="addFavoriteA" class="clog-js" data-act="add-to-favorites" href="javascript:void(0);">加为收藏</a></div><div id="stopSuggest"><a id="stopSuggestA" class="clog-js" data-act="cancel-favorites-tips" href="javascript:void(0);">不再提示</a></div></div>';
			return function() {
				return b
			}
		}()
	}
});
define("business/utils", function(a, b) {
	function J(a) {
		var b = [],
			c = [],
			d = 0,
			h = 0,
			i = 0,
			j = 0,
			l = !1,
			m = !1,
			n = !0,
			o = !1;
		for (var p = 0, q = a.length; p < q; p++) {
			var r = a.charAt(p),
				u = !1,
				v = !1;
			k(r) ? (u = v = !0, n = !0, o = !1) : s(r) ? t(r) ? (i++, n = !0, o = !1) : !l && !m && n && (i++, o = !0, n = !1) : D(r) ? (!l && !m && (l = !0), n = !1, o && (o = !1, i--)) : y(r) ? (!m && !l && (m = !0), n = !1, o && (o = !1, i--)) : H(r) ? (u = v = !0, d++, n = !0, o = !1) : (u = v = !0, h++, n = !0, o = !1);
			if (l && (u || p == q - 1) || m && (v || p == q - 1)) {
				var w = p;
				w == q - 1 && (w = p + 1);
				var x = a.substring(j, w);
				l ? b[b.length] = x : m && (c[c.length] = x);
				if (l || m) j = p;
				l = !1, m = !1
			}
			u && v && (j = p + 1, l = !1, m = !1)
		}
		var z = c.length,
			A = b.length,
			B = A + d,
			C = B + z;
		B == 0 && (A = z, B = z, C = z);
		var E = C + h,
			F = h / E;
		if (F >= .4) return [e, 0];
		var G = A / B;
		if (G >= .7) return [f, E + i];
		var I = d / B;
		return I >= .7 ? [g, E + i] : [e, 0]
	}

	function I(a) {
		if (c.trim(a) === "") return [e, 0];
		var b = [],
			d = [],
			h = 0,
			i = 0,
			j = 0,
			l = 0,
			m = 0,
			n = !1,
			o = !1;
		for (var p = 0, q = a.length; p < q; p++) {
			var r = a.charAt(p),
				t = !1,
				u = !1;
			k(r) || s(r) ? (t = u = !0, h++) : D(r) ? (n || (n = !0), u = !0) : y(r) ? (o || (o = !0), t = !0) : H(r) ? (t = u = !0, i++) : (t = u = !0, j++);
			if (n && (t || p === q - 1) || o && (u || p === q - 1)) {
				var v = p;
				v === q - 1 && (v = p + 1);
				var w = a.substring(m, v);
				if (w.length > 24) return [e, 0];
				w.length > 10 && l++, n ? b[b.length] = w : o && (d[d.length] = w);
				if (n || o) m = p;
				n = !1, o = !1
			}
			t && u && (m = p + 1, n = !1, o = !1)
		}
		var x = d.length,
			z = b.length,
			A = z + i,
			B = A + x;
		A === 0 && (z = x, A = x, B = x);
		var C = B + j,
			E = j / C;
		if (E >= .4) return [e, 0];
		var F = z / A;
		if (F >= .8) {
			if (l / z >= .4 && l >= 2) return [e, 0];
			return [f, C]
		}
		var G = i / A;
		return G >= .8 ? [g, C] : [e, 0]
	}

	function H(a) {
		var b = a.charCodeAt(0);
		return b >= E[0] && b <= E[1] || b >= F[0] && b <= F[1] || b >= G[0] && b <= G[1] ? !0 : !1
	}

	function D(a) {
		var b = a.charCodeAt(0);
		return b >= z[0] && b <= z[1] || b >= A[0] && b <= A[1] || b >= B[0] && b <= B[1] || b >= C[0] && b <= C[1] ? !0 : !1
	}

	function y(a) {
		var b = a.charCodeAt(0);
		return b >= w[0] && b <= w[1] || b >= x[0] && b <= x[1] ? !0 : !1
	}

	function v(a) {
		var b = a.charCodeAt(0);
		for (var c = 0; c < u.length; c++)
			if (b >= u[c][0] && b <= u[c][1]) return !0;
		return !1
	}

	function t(a) {
		return p[a] === !0
	}

	function s(a) {
		return o[a.charCodeAt(0)] === !0
	}

	function k(a) {
		var b = a.charCodeAt(0);
		return a === "　" ? !0 : b <= 32 || b === 255 ? !0 : !1
	}

	function j(a, b) {
		var c = a[0];
		return c === e ? !1 : c === f && h === b ? !0 : c === g && i === b ? !0 : !1
	}
	var c = a("lib/jquery-1.7"),
		d = a("business/consts"),
		e = 0,
		f = 1,
		g = 2,
		h = "en",
		i = "zh";
	b.getExpectCost = function(a) {
		return a > 1e3 ? Math.ceil((a - 1e3) / 8 + 100) : Math.ceil(a / 10)
	}, b.isMatch = function(a, b) {
		var c = b.split("-")[0],
			d = J(a);
		return j(d, c)
	}, b.getCost = function(a, b) {
		var c = null,
			j = null,
			k = J(a),
			l = k[0];
		if (l === e) return null;
		if (b === "auto")
			if (l === f) c = h, j = i;
			else
		if (l === g) c = i, j = h;
		else return null;
		else {
			var m = b.split("-");
			c = m[0], j = m[1]
		}
		var n = {}, o = k[1],
			p = 0,
			q = 0;
		if (h === c && i === j) p = d.en2zh * o, q = Math.round(d.en2zh * d.discount) / 100 * o;
		else if (i === c && h === j) p = d.zh2en * o, q = Math.round(d.zh2en * d.discount) / 100 * o;
		else return null;
		p = Math.round(p * 100) / 100, q = Math.round(q * 100) / 100, n.word = o, n.cost = p, n.realCost = q, n.discount = d.discount, n.lang = c;
		return n
	}, b.getLang = function(a) {
		var b = null,
			c = null,
			d = J(a),
			j = d[0];
		if (j === e) return null;
		if (j === f) b = h, c = i;
		else if (j === g) b = i, c = h;
		else return null;
		return b + "-" + c
	};
	var l = [
		["'", "‘", "’"],
		['"', "“", "”"],
		[",", "，"],
		[".", "。"],
		[";", "；"],
		[":", "："],
		["、"],
		["·"],
		["/", "／"],
		["?", "？"],
		["\\", "＼"],
		["|", "｜"],
		["`"],
		["~", "～"],
		["!", "！"],
		["@", "＠"],
		["#", "＃"],
		["$", "＄"],
		["¥", "￥"],
		["%", "％"],
		["^", "＾", "…"],
		["&", "＆"],
		["_"],
		["(", ")"],
		["（", "）"],
		["[", "]"],
		["［", "］"],
		["{", "}"],
		["<", ">"],
		["+", "＋"],
		["-", "－"],
		["*", "＊", "×"],
		["÷"],
		["=", "＝"]
	],
		m = [
			[10078, 12301, 12303, 12318, 65379],
			[12305, 12309, 12311, 12313, 12315],
			[8250, 12297, 12299]
		],
		n = ["，", "。", "？", "：", "（", "）", "【", "】", "￥", "、", "·"],
		o = {}, p = {};
	for (var q = 0; q < l.length; q++)
		for (var r = 0; r < l[q].length; r++) o[l[q][r].charCodeAt(0)] = !0;
	for (var q = 0; q < m.length; q++)
		for (var r = 0; r < m[q].length; r++) o[m[q][r] - 1] = !0, o[m[q][r]] = !0;
	for (var q = 0; q < n.length; q++) p[n[q]] = !0;
	var u = [
		[33, 47],
		[58, 64],
		[91, 96],
		[123, 126]
	],
		w = [48, 57],
		x = [65296, 65305],
		z = [65, 90],
		A = [97, 122],
		B = [65313, 65338],
		C = [65345, 65370],
		E = [19968, 40959],
		F = [13312, 19903],
		G = [63744, 64255]
});
define("business/validator", function(a, b) {
	var c = "^([1-9]\\d*|0)(\\.\\d{1,2})?$",
		d = new RegExp(c);
	b.isValidCharge = function(a) {
		return a === undefined || a === null ? !1 : d.test(a)
	};
	var e = "(\\.doc|\\.docx|\\.txt|\\.pdf|\\.rar|\\.zip)$",
		f = new RegExp(e, "i");
	b.isValidFile = function(a) {
		return a === undefined || a === null ? !1 : f.test(a)
	};
	var g = "^0*(13|15|18)(\\d{9}|\\d-\\d{3}-\\d{5}|\\d-\\d{4}-\\d{4}|\\d{2}-\\d{3}-\\d{4}|\\d{2}-\\d{4}-\\d{3})$",
		h = new RegExp(g);
	b.isMobile = function(a) {
		return a === undefined || a === null ? !1 : a.length < 8 || a.length > 24 ? !1 : h.test(a)
	};
	var i = "^((0*\\d{1,4}|\\+\\d{1,4}|\\(\\d{1,4}\\))[ -]?)?(\\d{2,4}[ -]?)?\\d{3,4}[ -]?\\d{3,4}([ -]\\d{1,5})?$",
		j = new RegExp(i);
	b.isPhone = function(a) {
		return a === undefined || a === null ? !1 : a.length < 8 || a.length > 24 ? !1 : h.test(a) || j.test(a)
	};
	var k = "^([a-z0-9_][a-z0-9_.-]*)?[a-z0-9_]@([a-z0-9-]+\\.){0,4}([a-z0-9][a-z0-9-]{0,61})?[a-z0-9]\\.[a-z]{2,6}$",
		l = new RegExp(k, "i");
	b.isEmail = function(a) {
		return a === undefined || a === null ? !1 : a.length < 6 || a.length > 32 ? !1 : l.test(a)
	}
});
define("business/validators", function(a, b) {
	return {
		userName: [{
			ck: "empty"
		}, {
			msg: "请输入2-8个字符",
			ck: /^.{2,8}$/
		}],
		phone: [{
			ck: "mobile"
		}, {
			msg: "请输入正确的电话号码",
			ck: "phone"
		}],
		email: [{
			msg: "请输入正确的邮箱地址",
			ck: "email"
		}],
		qq: [{
			ck: "empty"
		}, {
			msg: "请输入正确的QQ号码",
			ck: "qq"
		}],
		bill: [{
			ck: "empty"
		}, {
			msg: "请输入2-64个字符",
			ck: /^.{2,64}$/
		}],
		reason: [{
			msg: "请输入投诉原因",
			ck: "null"
		}],
		account: [{
			msg: "请输入您的账号",
			ck: "null"
		}, {
			msg: "请输入正确的邮箱地址",
			ck: "email"
		}],
		password: [{
			msg: "请输入您的密码",
			ck: "null"
		}]
	}
});
define("business/input", function(a) {
	var b = a("lib/jquery-1.7");
	a("lib/jquery-extension/textChange");
	var c = a("lib/utils"),
		d = a("business/consts"),
		e = a("business/log"),
		f = a("business/utils"),
		g = b("#inputText"),
		h = b("#language"),
		i = b("i.trans-error-message"),
		j = b(".error-tel"),
		k = b(".pay-num"),
		l = b(".realpay-num"),
		m = b(".text-num"),
		n = b(".lang-text"),
		o = b("#demandNote"),
		p = b("#userPhoneI"),
		q = b(".time-num"),
		r = b("#christmas .f-price"),
		s = b("#christmas .real-price"),
		t = !1,
		u = function() {
			m.html(0), q.html(0), k.html(0), n.html("字数统计："), B()
		}, v = function() {
			c.storage("INPUTSTORELANG", h.val()), c.storage("INPUTSTORETEXT", g.val()), c.storage("INPUTDEMAMDNOTE", o.val())
		}, w = function() {
			var a = c.timero(function() {
				v()
			}, 1e3);
			g.bind("textchange", function() {
				t || (t = !0, e.log({
					action: "input-times"
				})), a.run()
			}), g.bind("blur", function() {
				v()
			}), g.bind("focus", function() {
				h.removeClass("data-error"), g.removeClass("data-error"), i.html("")
			}), g.bind("keyup", function() {
				h.removeClass("data-error"), g.removeClass("data-error"), i.html(""), (g.val() === null || g.val() === "") && u()
			}), o.bind("textchange", function() {
				a.run()
			}), o.bind("blur", function() {
				v()
			}), p.bind("focus", function() {
				j.html("")
			}), p.bind("keyup", function() {
				j.html("")
			})
		}, x = function(a) {
			return f.getCost(a, h.val())
		}, y = function(a, b) {
			var c = f.getExpectCost(a);
			if (b === "en") {
				var d = Math.ceil(c * 1.8);
				c = d === 1 ? d : d + "~" + parseInt(d + 3)
			} else c = c === 1 ? c : c + "~" + parseInt(c + 3);
			return c
		}, z = function(a) {
			var b = a * .2;
			return b.toFixed(2)
		}, A = function(a) {
			if (d.state === "on") {
				var b = z(a);
				r.html(b), s.html((a - b).toFixed(2)), b > 0 ? k.addClass("invalid-price") : k.removeClass("invalid-price")
			}
		}, B = function() {
			d.state === "on" && (r.html(0), s.html(0), k.removeClass("invalid-price"))
		}, C = function() {
			var a = x(g.val());
			B(), a !== null ? (a.word > 3e3 && i.html("文本长度超过3000，请您分段提交，或使用文档翻译"), m.html(a.word), k.html(a.cost), q.html(y(a.word, a.lang)), a.lang === "en" ? n.html("单词数统计：") : n.html("字数统计："), l.html(a.realCost), A(a.realCost)) : (m.html(0), k.html(0), q.html(0), l.html(0), n.html("字数统计："))
		}, D = function() {
			c.storage("INPUTSTORETEXT") ? I(c.storage("INPUTSTORETEXT")) : I("")
		}, E = function() {
			var a = p.closest(".user-phone").is(":hidden"); !! c.storage("INPUTSTORETEL") && !a && p.val(c.storage("INPUTSTORETEL"))
		}, F = function() {
			!c.storage("INPUTSTORELANG") || H(c.storage("INPUTSTORELANG"))
		}, G = function() {
			!c.storage("INPUTDEMAMDNOTE") || J(c.storage("INPUTDEMAMDNOTE"))
		}, H = function(a) {
			h.val(a)
		}, I = function(a) {
			g.val(a), C(), (a === null || a === "") && u()
		}, J = function(a) {
			o.val(a)
		}, K = function() {
			g.bind("focus", function() {
				C()
			});
			var a = c.timero(function() {
				C()
			}, 1e3);
			g.bind("textchange", function() {
				a.run()
			}), g.bind("blur", function() {
				C()
			})
		}, L = function() {
			o.val(""), h.val("auto"), g.val(""), u()
		}, M = function() {
			g.placeHolder({
				info: "请勿在此提交起名、古文、诗歌、菜单等创意性翻译。以上类型，请提交文档或咨询客服。"
			}), o.placeHolder({
				info: "如翻译领域、用途、专业词汇等相关说明"
			}), p.placeHolder({
				info: "可获得免费翻译状态短信提醒"
			}), o.bind("textchange", function() {
				var a = f.getCost(b(this).val(), "auto");
				a !== null && a.word > 300 ? b(".demand-error-message").html("备注内容不能超过300字") : b(".demand-error-message").html("")
			})
		}, N = function(a) {
			t = a
		};
	b(".clear-content").live("click", function() {
		g.val(""), g.focus()
	});
	var O = function() {
		K(), w(), D(), E(), F(), G(), M()
	}, P = function(a, b, c) {
			H(a), I(b), J(c)
		};
	return {
		getFavorablePrice: z,
		initInput: O,
		setInputLogged: N,
		loadInput: P,
		resetInput: L
	}
});
define("lib/jquery-extension/textChange", function(a, b) {
	var c = a("lib/jquery-1.7");
	c.event.special.textchange = {
		setup: function(a, b) {
			c(this).data("lastValue", this.contentEditable === "true" ? c(this).html() : c(this).val()), c(this).bind("keyup.textchange", c.event.special.textchange.handler), c(this).bind("cut.textchange paste.textchange input.textchange", c.event.special.textchange.delayedHandler)
		},
		teardown: function(a) {
			c(this).unbind(".textchange")
		},
		handler: function(a) {
			c.event.special.textchange.triggerIfChanged(c(this))
		},
		delayedHandler: function(a) {
			var b = c(this);
			setTimeout(function() {
				c.event.special.textchange.triggerIfChanged(b)
			}, 25)
		},
		triggerIfChanged: function(a) {
			var b = a[0].contentEditable === "true" ? a.html() : a.val();
			b !== a.data("lastValue") && (a.trigger("textchange", [a.data("lastValue")]), a.data("lastValue", b))
		}
	}, c.event.special.hastext = {
		setup: function(a, b) {
			c(this).bind("textchange", c.event.special.hastext.handler)
		},
		teardown: function(a) {
			c(this).unbind("textchange", c.event.special.hastext.handler)
		},
		handler: function(a, b) {
			b === "" && b !== c(this).val() && c(this).trigger("hastext")
		}
	}, c.event.special.notext = {
		setup: function(a, b) {
			c(this).bind("textchange", c.event.special.notext.handler)
		},
		teardown: function(a) {
			c(this).unbind("textchange", c.event.special.notext.handler)
		},
		handler: function(a, b) {
			c(this).val() === "" && c(this).val() !== b && c(this).trigger("notext")
		}
	}
});
define("business/account", function(a, b) {
	var c = a("lib/jquery-1.7");
	a("lib/jquery-extension/textChange");
	var d = a("lib/lightips"),
		e = a("lib/utils"),
		f = a("business/log"),
		g = a("business/tmpl"),
		h = a("lib/login/netease.login"),
		i = a("lib/suggest/suggest"),
		j = null,
		k = !1,
		l = c("#hd div.account-item"),
		m = function(a) {
			return a.status === "1" && a.id === j
		}, n = function(a) {
			var b = "user.do?method=getUserInfo",
				d = function() {};
			typeof arguments[1] != "undefined" && c.isFunction(arguments[1]) && (d = arguments[1]), c.ajax({
				url: b,
				cache: !1
			}).done(function(b) {
				a(b)
			}).fail(function(a) {
				a && a.msg && alert(a.msg), d(a)
			})
		}, o = function(a, b) {
			var c = a.replace(/[^\x00-\xff]/g, "ci").length;
			c > b && (a = a.substr(0, b) + "...");
			return a.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")
		}, p = function(a, b, g, h, i) {
			f.log({
				action: i + "login-success"
			}), k = j !== a, j = a;
			var m = e.decodeText(b);
			l.attr({
				title: m,
				"data-username": a
			}), l.html(o(b, 28)), c("#hd div.nav-list").addClass("login-suc"), c.isFunction(g) && g(k), h && d.closeMsg()
		}, q = function(a, b) {
			h.init({
				params: {
					username: c("#accountName").val(),
					password: c("#accountPassword").val(),
					savelogin: c("#storeLoginStatus").prop("checked") === !0 ? 1 : 0
				},
				success: function() {
					p(c("#accountName").val(), c("#accountName").val(), a, b, "")
				},
				error: function(a, b) {
					c(".login-container .account-error").html(b).show()
				},
				start: function() {}
			}).run()
		}, r = function() {
			var a = function(a, b) {
				QC.Login.signOut(), QC.init({
					appId: "100246411"
				}, !0), QC.Login.reset(), QC.Login({
					btnId: "qq_connect_btn",
					size: "A_M",
					scope: "get_user_info"
				}, function(c) {
					QC.Login.getMe(function(d, f) {
						e.cookie("userId", "qq_" + d), e.cookie("userName", escape(c.nickname)), p("qq_" + d, c.nickname, a, b, "QQ-")
					})
				})
			};
			return function(b, c) {
				typeof QC != "undefined" ? a(b, c) : e.loadScript("http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js", {
					suc: function() {
						setTimeout(function() {
							r(b, c)
						}, 100)
					}
				}, {
					"data-appid": "100246411",
					"data-redirecturi": "http://*.youdao.com/qqCallback.html"
				})
			}
		}(),
		s = function() {
			var a = {
				elem: "#accountName",
				validate: [{
					msg: "请输入您的账号",
					ck: "null"
				}, {
					msg: "请输入正确的邮箱地址",
					ck: "email"
				}],
				xor: "and",
				error: function(a) {
					c(".login-container .account-error").html(a[0]).show()
				}
			}, b = {
					elem: "#accountPassword",
					validate: [{
						msg: "请输入您的密码",
						ck: "null"
					}],
					error: function(a) {
						c(".login-container .account-error").html(a[0]).show()
					}
				}, f = function(a) {
					d.open(g.login(), function() {}, !1), c("div.message-container a.login-submit").bind("click", function(b) {
						a.run(), b.stopPropagation()
					}), c("div.message-container a.close").click(function() {
						d.closeMsg()
					})
				}, h = function() {
					var b = e.check({
						callback: function() {
							c("#accountPassword").focus(), c(".login-container .account-error").html("")
						},
						configs: [a]
					});
					c("#accountName").focus(), c("#accountName").placeHolder({
						info: "如 name@example.com"
					}), i.type.email.onEnter = function(a) {
						b.run()
					}, i.bind(c("#accountName"), i.type.email)
				}, j = function(a) {
					c("#accountPassword").on("keyup", function(b) {
						(b.keyCode === 13 || b.keyCode === 9) && a.run()
					})
				};
			return function(d, g) {
				var i = e.check({
					callback: function() {
						q(d, g)
					},
					configs: [a, b]
				});
				f(i), h(), j(i), r(d, g), c("#wb_connect_btn").bind("click", function(a) {
					window.open("weiboCall.jsp")
				})
			}
		}(),
		t = function(a, b, c) {
			n(function(d) {
				m(d) ? a(d) : (b(), s(function(d) {
					d ? c() : t(a, b, c)
				}, !1))
			})
		}, u = function(a, b) {
			c(a).bind("click", function() {
				n(function(a) {
					a.status === "1" ? b() : (f.log({
						action: "login-on-promotion"
					}), s(b, !1))
				})
			})
		};
	c(function() {
		j = c.trim(l.data("username")), c("#doc1").delegate("a.see-more,a.my-account,a.translate-result,a.charge-service", "click", function() {
			var a = c(this).data("href");
			n(function(b) {
				m(b) ? location.href = a : s(function() {
					location.href = a
				}, !0)
			})
		})
	});
	return {
		login: s,
		current: n,
		loginFirstThen: t,
		initLoginForLanding: u
	}
});
define("lib/lightips", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = function() {
			var a, b;
			window.innerHeight && window.scrollMaxY ? (a = document.body.scrollWidth, b = window.innerHeight + window.scrollMaxY) : (a = Math.max(document.body.scrollWidth, document.body.offsetWidth), b = Math.max(document.body.scrollHeight, document.body.offsetHeight));
			var c, d;
			c = document.documentElement.clientWidth || document.body.clientWidth, d = document.documentElement.clientHeight || document.body.clientHeight;
			var e = Math.max(b, d),
				f = Math.max(a, c);
			return {
				page: {
					width: f,
					height: e
				},
				window: {
					width: c,
					height: d
				}
			}
		}, e = function(a) {
			var b = c(window).height(),
				d = c(window).width(),
				e = document.body.scrollTop || document.documentElement.scrollTop,
				f = document.body.scrollLeft || document.documentElement.scrollLeft;
			a.css({
				top: (b - a.height()) / 2 + e,
				left: (d - a.width()) / 2 + f
			})
		}, f = function(a, b) {
			var f;
			if (c(".light-box").size() === 0) {
				var h = c.browser.msie && c.browser.version === "6.0" ? '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;filter:alpha(opacity=0);-moz-opacity:0"></iframe>' : "";
				f = c('<div class="light-box">' + h + "</div>").appendTo("body")
			}
			var i = function() {
				f.css({
					height: d().page.height,
					width: d().page.width
				})
			};
			i();
			var k = {
				open: function() {
					f.show(), e(a), a.show()
				},
				close: function(d) {
					f.hide(), a.fadeOut(function() {
						c.isFunction(d) ? d() : !! b && c.isFunction(b.onclose) && b.onclose()
					})
				}
			};
			e(a), c(window).resize(function() {
				e(a), i()
			}), c(window).scroll(function() {
				i(), e(a)
			}), a.mousedown(function(a) {
				a.stopPropagation()
			}), a.delegate("a.close", "click", function() {
				typeof j != "undefined" && clearInterval(j), g.close()
			});
			return k
		}, g = null,
		h, i = function(a) {
			a !== undefined && (c(document).unbind("mousedown.lboxClose"), a || c(document).bind("mousedown.lboxClose", function(a) {
				g.close(), a.stopPropagation()
			}))
		};
	b.msgContainer = function(a) {
		c(a).size() > 0 && (h = c(a));
		return h
	}, b.open = function(a, d, e, i) {
		h || (h = c('<div class="message-container"></div>').appendTo("body")), !c.isFunction(d) && typeof d != "boolean" && typeof d == "object" ? i = d : typeof e != "boolean" && typeof e == "object" && (i = e), g || (g = f(h, i)), b.updateMsg(a, d, e), g.open();
		return b
	}, b.updateMsg = function(a, d, e) {
		typeof a == "undefined" || !a.size ? typeof a == "string" && (h.empty(), h.html(a)) : (h.empty(), h.append(a)), c.isFunction(a) && (d = a), typeof a == "boolean" && (e = a), typeof d == "boolean" && (e = d), c.isFunction(d) && d(h), typeof e == "boolean" && i(e);
		return b
	};
	var j;
	b.closeMsg = function(a) {
		typeof j != "undefined" && clearInterval(j), !g || g.close(a);
		return b
	};
	var k = function(a) {
		a(), k = function() {}
	};
	b.countDownMsg = function(a, c, d) {
		b.open(a, function() {}, !0), j = setInterval(function() {
			c--, c === 0 ? (clearInterval(j), g.close()) : c > 0 && d(c)
		}, 1e3)
	}
});
define("lib/login/netease.login", function(a, b) {
	var c = a("lib/jquery-1.7");
	a("lib/jquery-extension/cookie"), a("lib/jquery-extension/md5");
	var d = {
		411: "次数限制：您的IP地址有异常登录行为",
		412: "次数限制：您尝试的次数已经太多,请过一段时间再试",
		414: "次数限制：您的IP登录失败次数过多,请稍后再试",
		415: "次数限制：您今天登录错误次数已经太多,请明天再试",
		416: "次数限制：您的IP今天登录过于频繁，请稍后再试",
		417: "次数限制：您的IP今天登录次数过多，请明天再试",
		418: "次数限制：您今天登录次数过多,请明天再试",
		419: "次数限制：您的登录操作过于频繁，请稍候再试",
		420: "用户名不存在",
		422: "账号被锁定，请您解锁后再登录!",
		428: "账号异常",
		460: "密码不正确",
		500: "系统繁忙，请您稍后再试！",
		503: "系统维护，请您稍后再试！"
	}, e = "https://reg.163.com/logins.jsp",
		f = {
			username: "",
			password: "",
			type: "0",
			url: "/loginCallback.html",
			url2: "/loginCallback.html",
			product: "dict",
			savelogin: "0",
			domains: "163.com,126.com,yeah.net,youdao.com,yodao.com",
			noRedirect: 1
		}, g = "NTES_LOGINED";
	(function() {
		var a = window.location.protocol,
			b = window.location.host,
			c = window.location.pathname,
			d = [a, "//", b];
		c.indexOf("atranslate") !== -1 && d.push("/atranslate"), f.url = d.join("") + f.url, f.url2 = d.join("") + f.url2
	})();
	var h = function() {
		this.params = {}, this.success = null, this.error = null, this.start = null, this.end = null, this.iframe = null
	};
	h.prototype = {
		init: function(a) {
			this.params = c.extend({}, f, a.params), this.md5Password(), c.isFunction(a.success) && (this.success = a.success), c.isFunction(a.error) && (this.error = a.error), c.isFunction(a.start) && (this.start = a.start), c.isFunction(a.end) && (this.end = a.end);
			return this
		},
		md5Password: function() {
			var a = this.params.password;
			a.length !== 0 && (a = a.replace(/(\'|\\)/g, "\\$1"), this.params.password = c.md5(a))
		},
		check: function() {
			var a = c.cookie(g),
				b = a === null || a === "false" ? !1 : !0;
			if (b) return !0;
			var d = {
				call: "getUserAlertNums",
				t2: "" + +(new Date) / 1e4
			};
			c.ajax({
				url: "/userview",
				type: "GET",
				dataType: "json",
				data: d,
				timeout: 3e4,
				cache: !0,
				success: function(a) {}
			});
			return c.cookie("NTES_SESS") != null ? !0 : !1
		},
		run: function() {
			this.iframe === null && (this.iframe = c('<iframe style="position:absolute;left:-200%;top:0;width:0;height:0;"></iframe>').appendTo("body")), c.isFunction(this.start) && this.start(), this.iframe.attr("src", this.generateUrl());
			return this
		},
		generateUrl: function() {
			var a = [];
			for (var b in this.params) a[a.length] = b + "=" + window.encodeURIComponent(this.params[b]);
			a[a.length] = "timestamp=" + c.now();
			return e + "?" + a.join("&")
		},
		callbackHandler: function(a) {
			c.isFunction(this.end) && this.end();
			if (a.errorUsername) {
				var b = this.getDomain();
				b.length > 0 && c.cookie(g, null, {
					path: "/",
					domain: b
				}), c.isFunction(this.error) && (this.error.call(this, a.errorType, d[a.errorType], a.errorUsername), a.errorType === "428" && (location.href = decodeURIComponent(a.url) + "&url=" + encodeURIComponent(location)))
			} else {
				var b = this.getDomain();
				c.cookie(g, "true", {
					path: "/",
					domain: b
				}), c.isFunction(this.success) && this.success.call(this, a.username)
			}
		},
		getDomain: function() {
			var a = "",
				b = window.location.hostname;
			b.indexOf(".163.com") != -1 ? a = ".163.com" : b.indexOf(".youdao.com") != -1 && (a = ".youdao.com");
			return a
		}
	}, window.dao = {}, dao.login = function() {
		return new h
	}();
	return dao.login
});
define("lib/jquery-extension/cookie", function(a, b) {
	var c = a("lib/jquery-1.7");
	c.cookie = function(a, b, d) {
		if (typeof b == "undefined") {
			var j = null;
			if (document.cookie && document.cookie != "") {
				var k = document.cookie.split(";");
				for (var l = 0; l < k.length; l++) {
					var m = c.trim(k[l]);
					if (m.substring(0, a.length + 1) == a + "=") {
						j = decodeURIComponent(m.substring(a.length + 1));
						break
					}
				}
			}
			return j
		}
		d = d || {}, b === null && (b = "", d.expires = -1);
		var e = "";
		if (d.expires && (typeof d.expires == "number" || d.expires.toUTCString)) {
			var f;
			typeof d.expires == "number" ? (f = new Date, f.setTime(f.getTime() + d.expires * 24 * 60 * 60 * 1e3)) : f = d.expires, e = "; expires=" + f.toUTCString()
		}
		var g = d.path ? "; path=" + d.path : "",
			h = d.domain ? "; domain=" + d.domain : "",
			i = d.secure ? "; secure" : "";
		document.cookie = [a, "=", encodeURIComponent(b), e, g, h, i].join("")
	}
});
define("lib/jquery-extension/md5", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = function(a, b) {
			return a << b | a >>> 32 - b
		}, e = function(a, b) {
			var c, d, e, f, g;
			e = a & 2147483648, f = b & 2147483648, c = a & 1073741824, d = b & 1073741824, g = (a & 1073741823) + (b & 1073741823);
			return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
		}, f = function(a, b, c) {
			return a & b | ~a & c
		}, g = function(a, b, c) {
			return a & c | b & ~c
		}, h = function(a, b, c) {
			return a ^ b ^ c
		}, i = function(a, b, c) {
			return b ^ (a | ~c)
		}, j = function(a, b, c, g, h, i, j) {
			a = e(a, e(e(f(b, c, g), h), j));
			return e(d(a, i), b)
		}, k = function(a, b, c, f, h, i, j) {
			a = e(a, e(e(g(b, c, f), h), j));
			return e(d(a, i), b)
		}, l = function(a, b, c, f, g, i, j) {
			a = e(a, e(e(h(b, c, f), g), j));
			return e(d(a, i), b)
		}, m = function(a, b, c, f, g, h, j) {
			a = e(a, e(e(i(b, c, f), g), j));
			return e(d(a, h), b)
		}, n = function(a) {
			var b, c = a.length,
				d = c + 8,
				e = (d - d % 64) / 64,
				f = (e + 1) * 16,
				g = Array(f - 1),
				h = 0,
				i = 0;
			while (i < c) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
			b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29;
			return g
		}, o = function(a) {
			var b = "",
				c = "",
				d, e;
			for (e = 0; e <= 3; e++) d = a >>> e * 8 & 255, c = "0" + d.toString(16), b = b + c.substr(c.length - 2, 2);
			return b
		}, p = function(a) {
			a = a.replace(/\x0d\x0a/g, "\n");
			var b = "";
			for (var c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(d & 63 | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(d & 63 | 128))
			}
			return b
		};
	c.extend({
		md5: function(a) {
			var b = [],
				c, d, f, g, h, i, q, r, s, t = 7,
				u = 12,
				v = 17,
				w = 22,
				x = 5,
				y = 9,
				z = 14,
				A = 20,
				B = 4,
				C = 11,
				D = 16,
				E = 23,
				F = 6,
				G = 10,
				H = 15,
				I = 21;
			a = p(a), b = n(a), i = 1732584193, q = 4023233417, r = 2562383102, s = 271733878;
			for (c = 0; c < b.length; c += 16) d = i, f = q, g = r, h = s, i = j(i, q, r, s, b[c + 0], t, 3614090360), s = j(s, i, q, r, b[c + 1], u, 3905402710), r = j(r, s, i, q, b[c + 2], v, 606105819), q = j(q, r, s, i, b[c + 3], w, 3250441966), i = j(i, q, r, s, b[c + 4], t, 4118548399), s = j(s, i, q, r, b[c + 5], u, 1200080426), r = j(r, s, i, q, b[c + 6], v, 2821735955), q = j(q, r, s, i, b[c + 7], w, 4249261313), i = j(i, q, r, s, b[c + 8], t, 1770035416), s = j(s, i, q, r, b[c + 9], u, 2336552879), r = j(r, s, i, q, b[c + 10], v, 4294925233), q = j(q, r, s, i, b[c + 11], w, 2304563134), i = j(i, q, r, s, b[c + 12], t, 1804603682), s = j(s, i, q, r, b[c + 13], u, 4254626195), r = j(r, s, i, q, b[c + 14], v, 2792965006), q = j(q, r, s, i, b[c + 15], w, 1236535329), i = k(i, q, r, s, b[c + 1], x, 4129170786), s = k(s, i, q, r, b[c + 6], y, 3225465664), r = k(r, s, i, q, b[c + 11], z, 643717713), q = k(q, r, s, i, b[c + 0], A, 3921069994), i = k(i, q, r, s, b[c + 5], x, 3593408605), s = k(s, i, q, r, b[c + 10], y, 38016083), r = k(r, s, i, q, b[c + 15], z, 3634488961), q = k(q, r, s, i, b[c + 4], A, 3889429448), i = k(i, q, r, s, b[c + 9], x, 568446438), s = k(s, i, q, r, b[c + 14], y, 3275163606), r = k(r, s, i, q, b[c + 3], z, 4107603335), q = k(q, r, s, i, b[c + 8], A, 1163531501), i = k(i, q, r, s, b[c + 13], x, 2850285829), s = k(s, i, q, r, b[c + 2], y, 4243563512), r = k(r, s, i, q, b[c + 7], z, 1735328473), q = k(q, r, s, i, b[c + 12], A, 2368359562), i = l(i, q, r, s, b[c + 5], B, 4294588738), s = l(s, i, q, r, b[c + 8], C, 2272392833), r = l(r, s, i, q, b[c + 11], D, 1839030562), q = l(q, r, s, i, b[c + 14], E, 4259657740), i = l(i, q, r, s, b[c + 1], B, 2763975236), s = l(s, i, q, r, b[c + 4], C, 1272893353), r = l(r, s, i, q, b[c + 7], D, 4139469664), q = l(q, r, s, i, b[c + 10], E, 3200236656), i = l(i, q, r, s, b[c + 13], B, 681279174), s = l(s, i, q, r, b[c + 0], C, 3936430074), r = l(r, s, i, q, b[c + 3], D, 3572445317), q = l(q, r, s, i, b[c + 6], E, 76029189), i = l(i, q, r, s, b[c + 9], B, 3654602809), s = l(s, i, q, r, b[c + 12], C, 3873151461), r = l(r, s, i, q, b[c + 15], D, 530742520), q = l(q, r, s, i, b[c + 2], E, 3299628645), i = m(i, q, r, s, b[c + 0], F, 4096336452), s = m(s, i, q, r, b[c + 7], G, 1126891415), r = m(r, s, i, q, b[c + 14], H, 2878612391), q = m(q, r, s, i, b[c + 5], I, 4237533241), i = m(i, q, r, s, b[c + 12], F, 1700485571), s = m(s, i, q, r, b[c + 3], G, 2399980690), r = m(r, s, i, q, b[c + 10], H, 4293915773), q = m(q, r, s, i, b[c + 1], I, 2240044497), i = m(i, q, r, s, b[c + 8], F, 1873313359), s = m(s, i, q, r, b[c + 15], G, 4264355552), r = m(r, s, i, q, b[c + 6], H, 2734768916), q = m(q, r, s, i, b[c + 13], I, 1309151649), i = m(i, q, r, s, b[c + 4], F, 4149444226), s = m(s, i, q, r, b[c + 11], G, 3174756917), r = m(r, s, i, q, b[c + 2], H, 718787259), q = m(q, r, s, i, b[c + 9], I, 3951481745), i = e(i, d), q = e(q, f), r = e(r, g), s = e(s, h);
			var J = o(i) + o(q) + o(r) + o(s);
			return J.toLowerCase()
		}
	})
});
define("lib/suggest/suggest", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = function(a, b) {
			if (c(a).length === 0) throw new Error("绑定元素为空！");
			this.el = a, this.init(b)
		};
	window.$s = d, d.keyCode = {
		UP: 38,
		DOWN: 40,
		ENTER: 13,
		TAB: 9
	}, d.def = {
		dataProvider: function(a) {
			a()
		},
		dataProcessing: function(a) {
			return a
		},
		item: function(a, b) {
			return b
		}
	}, d.type = {
		email: {
			data: ["163.com", "126.com", "yeah.net", "popo.163.com", "netease.com", "vip.163.com", "vip.126.com", "188.com"],
			dataProcessing: function(a, b) {
				var d = b.split("@"),
					e = a;
				d.length === 2 && (e = c.grep(a, function(a, b) {
					if (a.indexOf(d[1]) >= 0) return a
				}));
				return e
			},
			item: function(a, b, c) {
				var d = a.split("@"),
					e = d[0].replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return e + "@" + b
			}
		}
	}, d.bind = function(a, b) {
		c(a).attr("autoComplete", "off");
		return new d(a, b)
	}, d.unbind = function() {
		c(window).unbind("scroll.winS").unbind("resize.winR")
	}, d.prototype = {
		init: function(a) {
			this.initDataProvider(a), this.initDataProcessing(a), this.initItem(a), this.createSuggest(), this.handleEvent(a)
		},
		initDataProvider: function(a) {
			c.isFunction(a.data) ? this.dataProvider = a.data : a.data.length > 0 ? this.dataProvider = function(b) {
				c.isFunction(b) && b(a.data)
			} : this.dataProvider = $s.def.dataProvider
		},
		initDataProcessing: function(a) {
			c.isFunction(a.dataProcessing) ? this.dataProcessing = a.dataProcessing : this.dataProcessing = $s.def.dataProcessing
		},
		initItem: function(a) {
			c.isFunction(a.item) ? this.item = a.item : this.item = $s.def.item
		},
		handleEvent: function(a) {
			this.refreshWhenContentChange(), this.emptyAndHideWhenBlur(), this.highlightSelectedWhenPressUpAndDown(), this.insertTheSelectedAndBlurWhenPressEnter(a.onEnter), this.updatePositionOnWindowEvent()
		},
		updatePositionOnWindowEvent: function() {
			var a = this;
			c(window).bind("scroll.winS", function() {
				a.position()
			}).bind("resize.winR", function() {
				a.position()
			})
		},
		position: function() {
			var a = c(this.el).offset().left,
				b = c(this.el).offset().top + c(this.el).outerHeight(),
				d = 2,
				e = c(this.el).outerWidth() - d;
			!this.suggestContainer || this.suggestContainer.css({
				top: b - 1,
				left: a,
				"min-width": e
			})
		},
		createSuggest: function() {
			c(".auto-suggest").size() === 0 ? this.suggestContainer = c("<ul></ul>").appendTo("body").hide().addClass("auto-suggest") : this.suggestContainer = c(".auto-suggest"), this.suggestContainer.mousedown(function(a) {
				a.stopPropagation()
			}), this.position()
		},
		refreshSuggestContent: function() {
			this.suggestContainer.empty(), this.createSuggestContent(), this.initSuggestContent(), this.defaultSelectedTheFirstOne()
		},
		insertSelectItem: function() {
			this.insertTheChosenOne(), this.suggestContainer.empty(), this.suggestContainer.hide()
		},
		emptyAndHideWhenBlur: function() {
			var a = this;
			c(this.el).bind("blur", function() {
				a.insertSelectItem()
			})
		},
		refreshWhenContentChange: function() {
			var a = this;
			c(a.el).bind("keyup", function(b) {
				window.clearTimeout(a.delay), a.delay = window.setTimeout(function() {
					a.isAvailableKeyCodeOfUserName(b) && (c(".auto-suggest").length <= 0 && a.createSuggest(), a.refreshSuggestContent(), a.suggestContainer.show())
				}, 100)
			})
		},
		isAvailableKeyCodeOfUserName: function(a) {
			return a.which !== $s.keyCode.UP && a.which !== $s.keyCode.DOWN && a.which !== $s.keyCode.ENTER && a.which !== $s.keyCode.TAB
		},
		insertTheChosenOne: function() {
			c(".auto-suggest li").eq(this.curSuggest).length != 0 && c(".auto-suggest li").eq(this.curSuggest).html().split("@")[0] !== "" && (c(this.el).val(c(".auto-suggest li").eq(this.curSuggest).html().replace(/&lt;/g, "<").replace(/&gt;/g, ">")), c(this.el).focus())
		},
		insertTheSelectedAndBlurWhenPressEnter: function(a) {
			var b = this;
			c(this.el).bind("keyup", function(d) {
				if (d.which === $s.keyCode.ENTER || d.which === $s.keyCode.TAB) b.insertSelectItem(), c.isFunction(a) && a(b)
			})
		},
		setSelectedStatusOn: function(a) {
			this.suggests.removeClass("selected"), typeof a == "number" ? (this.suggests.eq(a).addClass("selected"), this.curSuggest = a) : (c(a).addClass("selected"), this.curSuggest = this.suggests.index(c(a)))
		},
		highlightSelectedWhenPressUpAndDown: function() {
			this.curSuggest = 0;
			var a = this;
			c(this.el).bind("keyup", function(b) {
				if (b.which === $s.keyCode.UP || b.which === $s.keyCode.DOWN) {
					var c = b.which === $s.keyCode.UP ? -1 : 1;
					a.setSelectedStatusOn((a.curSuggest + c) % a.suggests.length)
				}
			})
		},
		createSuggestContent: function() {
			var a = this,
				b = c(a.el).val();
			this.dataProvider(function(d) {
				c.each(a.dataProcessing(d, b), function(d, e) {
					c("<li></li>").html(a.item(b, e, d)).appendTo(a.suggestContainer)
				})
			})
		},
		initSuggestContent: function() {
			var a = this;
			this.suggests = c(".auto-suggest li").hover(function() {
				a.setSelectedStatusOn(c(this))
			})
		},
		defaultSelectedTheFirstOne: function() {
			this.curSuggest = 0, c(".auto-suggest li").eq(0).addClass("selected")
		}
	};
	return d
});
define("business/head", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = a("business/account"),
		e = c("#docTransMenu"),
		f = c(".Menu-Mask"),
		g;
	c("#hd .doc-trans").bind("mouseover", function() {
		clearTimeout(g), e.hasClass("hidden") && (e.removeClass("hidden"), f.show())
	}).bind("mouseout", function() {
		g = setTimeout(function() {
			e.hasClass("hidden") || (e.addClass("hidden"), f.hide())
		}, 200)
	}), e.bind("mouseover", function() {
		clearTimeout(g), e.hasClass("hidden") && (e.removeClass("hidden"), f.show())
	}).bind("mouseout", function() {
		g = setTimeout(function() {
			e.hasClass("hidden") || (e.addClass("hidden"), f.hide())
		}, 200)
	}), c("#docTransMenu li").bind("mouseover", function() {
		c(this).hasClass("hover") || c(this).addClass("hover")
	}).bind("mouseout", function() {
		c(this).hasClass("hover") && c(this).removeClass("hover")
	}), c("a.login-ctrl").live("click", function() {
		d.login(function() {
			var a = c(".hd-logo .tips");
			a && !a.hasClass("login-tips") && a.addClass("login-tips")
		}, !0)
	})
});
define("business/orders", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = a("lib/lightips"),
		e = a("lib/utils"),
		f = a("business/consts"),
		g = a("business/log"),
		h = a("business/tmpl"),
		i = a("business/utils"),
		j = a("business/validator"),
		k = a("business/validators"),
		l = a("business/input"),
		m = a("business/account"),
		n = "user.do?method=submitOrder",
		o = "user.do?method=updateOrder",
		p = "user.s?method=charge&source=fast",
		q = "user.do?method=chongzhi&source=fast",
		r = "user.do?method=submitPayment",
		s = "user.do?method=getAmount",
		t = "user.do?method=getOrder",
		u = "user.do?method=getTranslateList",
		v = 3e4,
		w = c("#trans-history-list"),
		x = c("#inputText"),
		y = c("#language"),
		z = c("div.user-phone"),
		A = c("form.quick-trans"),
		B, C, D = function(a, b, d) {
			var e = b === "all" ? u + "&userId=" + a : t + "&userId=" + a + "&orderId=" + b;
			c.ajax({
				url: e,
				cache: !1
			}).done(function(a) {
				d(a)
			}).fail(function(a) {
				a && a.msg && alert(a.msg)
			})
		}, E = function(a, b) {
			var d = !a.orderId ? n : o;
			c.post(d, a).done(function(a) {
				B = null, l.setInputLogged(!1), K(), z.css({
					display: "none"
				}), a.status === "1" ? b(a) : a && a.msg && alert(a.msg)
			}).fail(function(a) {
				a && a.msg && alert(a.msg)
			})
		}, F = function(a, b, d) {
			var e = typeof arguments[3] != "undefined" ? typeof arguments[3] : function() {};
			c.ajax({
				url: s + "&userId=" + a.userId + "&orderId=" + a.orderId,
				cache: !1
			}).done(function(e) {
				e.status === "1" ? (a.amount = e.amount, a.cost = e.cost, e.amount >= e.cost ? c.isFunction(b) && b(a) : c.isFunction(d) && d(a)) : e && e.msg && alert(e.msg)
			}).fail(function(a) {
				e(a)
			})
		}, G = function(a, b) {
			g.log({
				action: "not-enough"
			}), b()
		}, H = function(a, b, d) {
			g.log({
				action: "Enough-paid"
			});
			var e = r + "&userId=" + a.userId + "&orderId=" + a.orderId;
			c.ajax({
				url: e,
				cache: !1
			}).done(function(c) {
				c.status === "1" ? b(c) : d(c), be(a.userId)
			}).fail(function(a) {
				a.msg && alert(a.msg)
			})
		}, I = function() {
			d.countDownMsg(h.paySuccess(5), 5, function(a) {
				c("#countDownM").html(a)
			})
		}, J = function(a, b, j, m) {
			var n = i.getCost(a.text, a.lang),
				o = c.extend(Object.create(a), {
					userId: m && m.id ? m.id : a.id,
					email: m && m.email ? m.email : a.email,
					orderId: j || a.orderId,
					length: n.word,
					cost: f.state === "on" ? (n.cost - l.getFavorablePrice(n.cost)).toFixed(2) : n.cost,
					realCost: n.realCost
				});
			d.open(h.beginToPay(o), function(a) {
				g.log({
					action: "info-confirm-show"
				});
				var b = e.check({
					callback: function() {
						if (o.available === -1) Y(o, function() {
							bg()
						});
						else {
							c("#sentTo").val() !== undefined && (o.email = c("#sentTo").val());
							return E(o, function(a) {
								o = c.extend(o, a), l.resetInput();
								return F(o, function(a) {
									H(a, I, function(b) {
										b.available === -1 ? Y(a, function() {
											bg()
										}) : b && b.msg && alert(b.msg)
									})
								}, function(a) {
									G(a, function() {
										J(a, !0), location.href = q + "&orderId=" + a.orderId + "&userId=" + a.userId
									})
								})
							})
						}
					},
					configs: [{
						elem: "#sentTo",
						errorBox: "i.email-error",
						validate: k.email
					}]
				});
				a.find(".confirm").click(function(a) {
					c(this).addClass("control-btn-visited"), b.run()
				}), a.find(".close").click(function() {
					bg()
				}), a.find(".otherEmail").click(function() {
					a.find(".default-email").html(h.otherEmail(o))
				})
			}, b)
		}, K = function() {
			e.storage("INPUTSTORELANG", ""), e.storage("INPUTSTORETEXT", ""), e.storage("INPUTDEMAMDNOTE", "")
		}, L = function() {
			var a = i.getLang(x.val());
			a = a ? a : "", m.loginFirstThen(function(b) {
				J({
					text: x.val(),
					memo: c.placeHolder["#demandNote"].val(),
					lang: y.val() === "auto" ? a : y.val(),
					phone: c.placeHolder["#userPhoneI"].val()
				}, !1, B, b)
			}, function() {
				g.log({
					action: "login-after-submit"
				})
			}, function() {
				bg(), L()
			}), e.storage("INPUTSTORETEL", c.placeHolder["#userPhoneI"].val())
		}, M = e.check({
			callback: function() {
				g.log({
					action: "fast-submit"
				}), L()
			},
			configs: [{
				elem: "#language",
				errorBox: "i.trans-error-message",
				validate: [{
					msg: "输入文字与选择语言不一致",
					ck: function() {
						return y.val() === "auto" || !! i.isMatch(x.val(), y.val())
					},
					fail: function() {
						g.log({
							action: "choose-language-error"
						})
					}
				}]
			}, {
				elem: "#inputText",
				xor: "and",
				val: function() {
					return c.placeHolder["#inputText"].val()
				},
				errorBox: "i.trans-error-message",
				validate: [{
					msg: "请输入翻译内容",
					ck: "null",
					fail: function() {
						g.log({
							action: "input-empty-error"
						})
					}
				}, {
					msg: "输入内容错误",
					ck: function() {
						return null !== i.getCost(x.val(), y.val())
					},
					fail: function() {
						g.log({
							action: "input-error"
						})
					}
				}, {
					msg: "输入文字与选择语言不一致",
					ck: function() {
						return y.val() === "auto" || !! i.isMatch(x.val(), y.val())
					},
					fail: function() {
						g.log({
							action: "choose-language-error"
						})
					}
				}, {
					msg: "文本长度超过3000，请您分段提交，或使用文档翻译",
					ck: function() {
						var a = i.getCost(x.val(), y.val());
						return a && a.word <= 3e3
					}
				}]
			}, {
				elem: "#userPhoneI",
				xor: "or",
				val: function() {
					return c.placeHolder["#userPhoneI"].val()
				},
				backDoor: function() {
					return !z.is(":visible")
				},
				errorBox: "span.error-tel",
				validate: [{
					msg: "电话号码格式不正确",
					ck: function() {
						return c.placeHolder["#userPhoneI"].val() === "" || !! j.isPhone(c.placeHolder["#userPhoneI"].val())
					},
					fail: function() {
						g.log({
							action: "phone-input-error"
						})
					}
				}]
			}, {
				elem: "#alreadyRead",
				error: function() {},
				validate: [{
					msg: "请阅读并勾选《有道专业翻译服务条款》",
					ck: function() {
						return c("#alreadyRead").attr("checked")
					},
					fail: function(a) {
						alert(a), g.log({
							action: "protocol-unselected"
						})
					}
				}]
			}, {
				elem: "#demandNote",
				errorBox: "i.demand-error-message",
				validate: [{
					msg: "备注内容不能超过300字",
					ck: function() {
						return c.placeHolder["#demandNote"].val().length <= 300
					}
				}]
			}],
			autoCheck: !1
		}),
		N = function() {}, O = function() {}, P = {}, Q = function(a) {
			var b = h.order(a);
			b.change === "yes" && (b.finish === "yes" && g.log({
				action: "order-completed"
			}), w.html(b.htmlcode))
		}, R = function(a) {
			P = {};
			for (var b = 0, c = a.length; b < c; b++) {
				var d = a[b].id;
				P[d] = a[b].desText
			}
		}, S = function(a) {
			return c.trim(P[a])
		}, T = function() {
			c("a.copyTranslation").each(function() {
				var a = c(this);
				a.copyClick4RenGong(function() {
					g.log({
						action: "copy-fastpage"
					});
					return S(a.data("id"))
				})
			})
		}, U = function(a) {
			a && C && clearInterval(C), C = setInterval(function() {
				be(a)
			}, v)
		}, V = function(a) {
			m.loginFirstThen(function(b) {
				D(b.id, a, function(b) {
					b.status === "1" && (l.resetInput(), B = a, l.loadInput(b.lang, b.text, b.memo))
				})
			}, function() {
				g.log({
					action: "login-after-edit"
				})
			}, function() {
				d.closeMsg(), bg()
			})
		}, W = function(a) {
			m.loginFirstThen(function(b) {
				D(b.id, a, function(c) {
					c.status === "1" && J(c, !1, a, b)
				})
			}, function() {
				g.log({
					action: "login-after-submit"
				})
			}, function() {
				d.closeMsg(), bg()
			})
		}, X = function() {
			c("#trans-history-list .continue").live("click", function() {
				W(c(this).data("id")), N()
			}), c("#trans-history-list .edit").live("click", function() {
				V(c(this).data("id")), N()
			})
		}, Y = function(a, b) {
			d.updateMsg(h.forbidToPay(a), function(a) {
				g.log({
					action: "paid-exception"
				}), a.find(".close").click(function() {
					c.isFunction(b) && b()
				})
			})
		}, Z = function(a) {
			var b = a ? a + "分钟" : "半个小时";
			c(".message-tip").html("还有" + b + "我们将结束服务，请您注意时间"), c(".message-tip").css({
				cursor: "auto"
			}), c(".message-tip").unbind("click")
		}, $ = function() {
			A.addClass("out-of-work"), x.blur(), c(".not-working-time").height(A.height()), c(".not-working-time-text").css({
				top: (A.height() - c(".not-working-time-text").height()) / 2
			})
		}, _ = function(a, b) {
			a === 0 ? Z(b) : a === -1 ? $() : A.removeClass("out-of-work")
		}, ba = function(a, b, c, d, f, h, i) {
			if (!e.storage(a) && i.size() > 0) return e.showTip({
				type: "right",
				size: {
					left: 7,
					right: 7,
					height: 15
				},
				offPos: d,
				borderColor: "#e9c442",
				borderWidth: 1,
				paddingColor: "#fcfcf1"
			}, c, b, i, function() {
				g.log({
					action: f
				}), e.storage(a, !0)
			}, function() {
				g.log({
					action: h
				})
			}).bind(undefined, function() {
				g.log({
					action: f
				}), e.storage(a, !0)
			})
		}, bb = ba.bind(undefined, "isShowUnPaidOrderTip", "温馨提示：<br/>您有“未支付订单”！<br/>在这里可以快速地支付和编辑。", {
			left: 180,
			top: 5
		}, 15, "tips-unpaid-record-close", "tips-unpaid-record"),
		bc = ba.bind(undefined, "isShowPaidOrderTip", "温馨提示：<br/>您已经支付成功！<br/>稍后，您可以在这里或接收邮箱，查看翻译结果，并对质量作出评价。", {
			left: 75,
			top: 8
		}, 40, "tips-enough-paid-close", "tips-enough-paid"),
		bd = function(a) {
			Q(a.transList), R(a.transList), T(), O = bc(c("#trans-history-list .translating").eq(0).find(".trans-result")), N = bb(c("#trans-history-list .havent-pay").eq(0).find(".trans-result"))
		}, be = function(a) {
			D(a, "all", function(a) {
				_(a.available, a.ending), a.status === "1" ? bd(a) : c("#trans-history-list").empty()
			})
		}, bf = function(a) {
			a ? (c("div.user-phone").hide(), c("#userPhoneI").val(a), e.storage("INPUTSTORETEL", a)) : c("div.user-phone").show()
		}, bg = function() {
			c(".form-item-submit").click(function(a) {
				M.run(), a.stopPropagation()
			}), m.current(function(a) {
				bf(a.phone), be(a.username), X(), U(a.username)
			}), c("#fast-tip").click(function(a) {
				d.open(h.fastTip(), function() {
					c(".message-box-fast .close").click(function() {
						d.closeMsg(function() {
							d.closeMsg()
						})
					})
				})
			})
		};
	return {
		checkToPay: F,
		initOrders: bg
	}
});
define("business/index", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = a("lib/utils"),
		e = a("business/log"),
		f = a("business/tmpl"),
		g = a("business/head"),
		h = "http://f.youdao.com/?vendor=favorites-tips",
		i = "有道专业翻译",
		j = function(a, b, c) {
			d.timerProxy(d.synchronize(function() {
				var d = arguments[arguments.length - 1];
				a.hasClass(b) ? d() : a.removeClass(c).addClass(b).hide().fadeIn("fast", function() {
					d()
				})
			}), 100)
		}, k = function(a) {
			a.hasClass("intro-quick-trans") ? j(a, "intro-doc-trans", "intro-quick-trans") : j(a, "intro-quick-trans", "intro-doc-trans")
		}, l = function() {
			c("#trans-introduction-class li").bind("mouseover", function() {
				c(this).hasClass("hover") || c(this).addClass("hover")
			}).bind("mouseout", function() {
				c(this).hasClass("hover") && c(this).removeClass("hover")
			});
			var a = c("#bd div.trans-introduction"),
				b = d.iInterval(function() {
					k(a)
				}, 5e3);
			b.start(), c(".trans-introduction").on("mouseover", function() {
				b.stop()
			}), c(".trans-introduction").on("mouseout", function() {
				b.start()
			})
		}, m = function() {
			var a = c("#favorite-panel");
			d.storage("SHOWFAVORITE") !== "none" && (a.html(f.favoratePanelMsg()), c("#addFavoriteA").bind("click", function() {
				d.addFavorite(h, i)
			}), c("#stopSuggestA").bind("click", function() {
				d.storage("SHOWFAVORITE", "none"), a.empty().hide()
			}))
		}, n = function() {
			var a = d.cookie("trans-record");
			a || (c(".hd-logo .tips").show(), c(".tips .close").on("click", function() {
				c(".hd-logo .tips").hide(), d.cookie("trans-record", "true")
			})), c(".fast-trans-info").hover(function() {
				c(".big-bg-order-area .tips").show()
			}, function() {
				c(".big-bg-order-area .tips").hide()
			}), c(".doc-trans-info").hover(function() {
				c("#trans-introduction .tips").show()
			}, function() {
				c("#trans-introduction .tips").hide()
			})
		}, o = function() {
			c(".btn-order").bind("click", function() {
				e.log({
					action: "fast"
				})
			}), c(".menu-thesis").bind("click", function() {
				e.log({
					action: "thesis-click"
				})
			}), c(".trans-thesis").bind("click", function() {
				e.log({
					action: "thesis-click"
				})
			}), c(".menu-resume").bind("click", function() {
				e.log({
					action: "resume-click"
				})
			}), c(".trans-resume").bind("click", function() {
				e.log({
					action: "resume-click"
				})
			}), c(".menu-abroad").bind("click", function() {
				e.log({
					action: "abroad-click"
				})
			}), c(".trans-abroad").bind("click", function() {
				e.log({
					action: "abroad-click"
				})
			}), c(".menu-intro").bind("click", function() {
				e.log({
					action: "intro-click"
				})
			}), c(".trans-intro").bind("click", function() {
				e.log({
					action: "intro-click"
				})
			}), c(".menu-contract").bind("click", function() {
				e.log({
					action: "contract-click"
				})
			}), c(".trans-contract").bind("click", function() {
				e.log({
					action: "contract-click"
				})
			}), c(".trans-more").bind("click", function() {
				e.log({
					action: "more-click"
				})
			})
		};
	c(function() {
		l(), m(), n(), e.init(), o()
	})
});
define("business/about", function(a, b) {
	var c = a("business/head")
});
define("business/example", function(a, b) {
	var c = a("business/head")
});
define("business/trans", function(a, b) {
	var c = a("lib/jquery-1.7"),
		d = a("business/head"),
		e = a("business/log"),
		f = function() {
			c(".btn-order").bind("click", function() {
				e.log({
					action: c(this).data("type") + "submit"
				})
			})
		};
	c(function() {
		f()
	})
});
define("business/userinfo", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = a("business/log"),
		e = a("business/validators"),
		f = a("business/head");
	c.check({
		callback: function() {},
		configs: [{
			elem: "#userNameI",
			validate: e.userName
		}, {
			elem: "#userPhoneI",
			validate: e.phone
		}, {
			elem: "#userEmailI",
			validate: e.email
		}, {
			elem: "#userQQI",
			validate: e.qq
		}]
	}), b(function() {
		d.init(), b(".accord-table .tips .close").on("click", function() {
			b(this.parentElement).hide()
		})
	})
});
define("business/infoInput", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = function() {
			var a = b("#userPhoneI"),
				c = b("#userEmailI");
			a.placeHolder({
				info: "用于报价，固话请填写区号"
			}), c.placeHolder({
				info: "用于接收翻译结果"
			})
		}, e = function() {
			d()
		};
	return {
		initInfo: e
	}
});
define("business/orderView", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = a("business/log"),
		e = b(".evaluate-confirm"),
		f = function(a) {
			d.log({
				category: "FILE_OPERATION",
				action: a
			})
		}, g = [{
			elem: "#modifyContent",
			validate: [{
				msg: "请输入修改内容",
				ck: "null",
				fail: function() {
					f("no-content")
				}
			}],
			className: "modify-content-fail",
			xor: "and"
		}],
		h = function() {
			e.on("click", function() {
				if (e.hasClass("disable")) return !1;
				b("#fastEvaluate").submit()
			}), b(".evaluate-modify").on("click", function() {
				e.hasClass("disable") || (e.addClass("disable"), b(".modify-apply").show());
				return !1
			}), b(".btn-modify").on("click", function() {
				i.run()
			}), b(".btn-cancel").on("click", function() {
				e.hasClass("disable") && (e.removeClass("disable"), b(".modify-apply").hide());
				return !1
			})
		}, i = c.check({
			callback: function() {
				setTimeout(function() {
					b("#modifyResult").submit()
				}, 0)
			},
			configs: g
		});
	b(function() {
		d.init(), h(), b("#resultCopy").copyClick4RenGong(function() {
			d.log({
				action: "copy-detailpage"
			});
			return b.trim(b("#resultCopy").closest(".history-item").find(".trans-result").html())
		})
	})
});
define("business/orderInfo", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = a("business/log"),
		e = a("business/account"),
		f = b(".evaluate-confirm");
	b("a.login-ctrl").live("click", function() {
		e.login(function() {}, !0)
	});
	var g = 2,
		h = 3,
		i = 4,
		j = 5,
		k = function() {
			var a = b("div.hd").hasClass("invalid"),
				c = b("div.hd").hasClass("off-duty"),
				d = l() === j;
			return a || c || d
		}, l = function() {
			return b("ul.step li.current").data("status")
		}, m = function() {
			b.ajax({
				url: "file.do?method=viewOrder&orderId=" + b("#orderId").html() + "&email=" + b("#email").html(),
				method: "GET",
				cache: !1,
				success: function(a) {
					var c = n(a);
					b("div.detail-info").empty().append(c)
				}
			})
		}, n = function(a) {
			var b = "<!-- 文档更新内容开始 勿删！ -->",
				c = "<!-- 文档更新内容结束 勿删！ -->",
				d = a.indexOf(b),
				e = a.lastIndexOf(c),
				f = b.length;
			return a.substring(d + f, e)
		}, o = function() {
			k() || s.start()
		}, p = function() {
			var a = b("#userId").val(),
				c = b("#orderId").text(),
				d = t + "&id=" + c + "&userId=" + a,
				e = {
					url: d,
					cache: !1
				};
			b.ajax(e).done(function(a) {
				a.status === 1 ? m() : a.status === 0 ? (s.stop(), location.href = "file.do?method=filePay&orderId=" + c) : a.status === -1 && a.msg && alert(a.msg)
			}).fail(function(a) {
				a && a.msg && alert(a.msg)
			});
			return !1
		}, q = function() {
			b("#accountPay").live("click", p), b("#recharge").live("click", function() {
				b(".detail-info").removeClass("branch"), s.start()
			}), f.on("click", function() {
				if (f.hasClass("disable")) return !1;
				b("#confirmResult").submit()
			}), b(".evaluate-modify").on("click", function() {
				f.hasClass("disable") || (f.addClass("disable"), b(".modify-apply").show());
				return !1
			}), b(".evaluate-submit").on("click", function() {
				b("#submitEvaluate").submit()
			}), b("#modifyResultUpload").on("change", function() {
				var a = this.value;
				a = a.substring(a.lastIndexOf("\\") + 1) + "(已上传)", b(".upload-file").text(a)
			}), b(".btn-modify").on("click", function() {
				v.run()
			}), b(".btn-cancel").on("click", function() {
				f.hasClass("disable") && (f.removeClass("disable"), b(".modify-apply").hide());
				return !1
			}), b.browser.msie && b.browser.version < 7 && b(".description label").on("click", function() {
				b("#modifyResultUpload").trigger("click")
			})
		}, r = function(a) {
			d.log({
				category: "FILE_OPERATION",
				action: a
			})
		}, s = c.iInterval(m, 3e4),
		t = "filePay.s?method=submitPayWithAccountJSON",
		u = [{
			elem: "#modifyContent",
			validate: [{
				msg: "请输入修改内容",
				ck: "null",
				fail: function() {
					r("no-content")
				}
			}],
			className: "modify-content-fail",
			xor: "and"
		}],
		v = c.check({
			callback: function() {
				setTimeout(function() {
					b("#modifyResult").submit()
				}, 0)
			},
			configs: u
		});
	b(function() {
		d.init(), o(), q()
	})
});
define("business/autoBaojia", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("business/consts"),
		d = a("lib/utils"),
		e = a("business/tmpl"),
		f = a("lib/lightips"),
		g = a("business/log"),
		h = a("business/account"),
		i = b("#form");
	b("a.login-ctrl").live("click", function() {
		h.login(function() {}, !0)
	});
	var j = function(a, c, d) {
		var e = {
			method: "getBaojiaTimeAndPrice",
			lang: c,
			level: a,
			word: d
		};
		b.ajax({
			url: "file.do",
			data: e,
			dataType: "json",
			success: function(a, c, d) {
				b(".file-price").html(a.price), b(".file-time").html(a.expectTime.substring(0, 16)), b(".file-discount").html(a.orderDiscount)
			},
			error: function(a, c, d) {
				b(".file-price").html("未知"), b(".file-time").html("未知")
			}
		})
	}, k = function() {
			b("#confirmBaojia").bind("click", function() {
				g.log({
					action: "pay_continue"
				}), setTimeout(function() {
					i.submit()
				}, 0)
			});
			var a = b("#orderId").val();
			b("#cancelBaojia").bind("click", function() {
				g.log({
					action: "pay_cancel"
				}), f.open(e.cancelReason(a), function() {
					b(".message-box .close").click(function() {
						f.closeMsg(function() {
							f.closeMsg()
						})
					}), b(".message-box .cancel-btn-green").click(function() {
						var c = b('input[name="reason"]:checked').val(),
							d = b("#otherReason").val();
						location.href = "file.do?method=cancelBaojia&type=cancel&&orderId=" + a + "&reason=" + c + "&otherReason=" + d
					}), b(".message-box .cancel-btn-blue").click(function() {
						var c = b('input[name="reason"]:checked').val(),
							d = b("#otherReason").val();
						location.href = "file.do?method=cancelBaojia&&type=rengong&orderId=" + a + "&reason=" + c + "&otherReason=" + d
					})
				})
			}), b("#levelDiff").bind("click", function() {
				g.log({
					action: "what_different"
				}), f.open(e.levelDiff(), function() {
					b(".message-box .close").click(function() {
						f.closeMsg(function() {
							f.closeMsg()
						})
					})
				})
			}), i.bind("submit", function() {
				i.attr("action", l);
				return !0
			}), b("#img1").live("click", function() {
				g.log({
					action: "select_quality"
				}), b("#level").val("1"), b("#img1").attr("src", c.resourceBase + "/styles/blue-select.jpg"), b("#img2").attr("src", c.resourceBase + "/styles/green.jpg"), b("#img3").attr("src", c.resourceBase + "/styles/red.jpg")
			}), b("#img2").live("click", function() {
				g.log({
					action: "select_quality"
				}), b("#level").val("2"), b("#img1").attr("src", c.resourceBase + "/styles/blue.jpg"), b("#img2").attr("src", c.resourceBase + "/styles/green-select.jpg"), b("#img3").attr("src", c.resourceBase + "/styles/red.jpg")
			}), b("#img3").live("click", function() {
				g.log({
					action: "select_quality"
				}), b("#level").val("3"), b("#img1").attr("src", c.resourceBase + "/styles/blue.jpg"), b("#img2").attr("src", c.resourceBase + "/styles/green.jpg"), b("#img3").attr("src", c.resourceBase + "/styles/red-select.jpg")
			}), b(".updatePrice").live("click", function() {
				var a = b("#level").val(),
					c = b('input[name="lang"]:checked').val(),
					d = b(".file-word").text();
				j(a, c, d)
			}), b("#why-tip").hover(function() {
				b("#lang-tip2").show(), g.log({
					action: "what_difference"
				})
			}, function() {
				b("#lang-tip2").hide()
			}), b("#word-tip").hover(function() {
				b("#word-tip2").show()
			}, function() {
				b("#word-tip2").hide()
			}), b("#wordcount-tip").hover(function() {
				b("#wordcount-tip2").show()
			}, function() {
				b("#wordcount-tip2").hide()
			}), b("#lang-tip").hover(function() {
				b("#lang-tip1").show(), g.log({
					action: "confirm_language_tip"
				})
			}, function() {
				b("#lang-tip1").hide()
			}), b("#level-tip").hover(function() {
				b("#level-tip1").show(), g.log({
					action: "what_different"
				})
			}, function() {
				b("#level-tip1").hide()
			})
		}, l = "file.do?method=comfirmBaojia";
	b(function() {
		g.init(), k()
	})
});
define("business/quiktran", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("business/log"),
		d = a("business/input"),
		e = a("business/account"),
		f = a("business/orders"),
		g = a("business/head");
	b("a.login-ctrl").live("click", function() {
		e.login(function() {
			f.initOrders()
		}, !0)
	}), b(function() {
		d.initInput(), f.initOrders(), c.init()
	})
});
define("business/filetran", function(a) {
	function C() {
		c(".modifyInfo").live("click", function() {
			B()
		}), c(".save-to-contact").live("click", function() {
			w.run()
		})
	}

	function B() {
		p = !0, c(".user-info").html(g.otherUser(b)), j.initInfo(), l = c("#userBillI"), l.css("display", "").placeHolder({
			info: "抬头，如公司名称等"
		})
	}

	function A() {
		c(".user-info").html(g.loginUser(b))
	}

	function z() {
		i.current(function(a) {
			b === null ? b = a : a.status === "1" && (b = a), a.status !== "1" || !a.phone ? B() : A(), C()
		}, function(a) {})
	}
	var b = null,
		c = a("lib/jquery-1.7");
	a("lib/jquery-extension/form");
	var d = a("lib/lightips"),
		e = a("lib/utils"),
		f = a("business/log"),
		g = a("business/tmpl"),
		h = a("business/validators"),
		i = a("business/account"),
		j = a("business/infoInput"),
		k = a("business/head"),
		l, m = c("#form"),
		n = c(".confirmSubmit"),
		o = !1,
		p = !1,
		q = !1,
		r = function(a) {
			f.log({
				category: "FILE_OPERATION",
				action: a
			})
		}, s = [{
			elem: "#language",
			validate: [{
				msg: "请选择语言",
				ck: /^.+-.+$/,
				fail: function() {
					r("no-lang")
				}
			}],
			className: "language"
		}, {
			elem: "#fileInfo",
			validate: [{
				msg: "请选择文件",
				ck: "null",
				fail: function() {
					r("no-file")
				}
			}, {
				msg: "不支持的文件类型",
				ck: /(.doc|.docx|.txt|.pdf|.rar|.zip)$/i,
				fail: function() {
					r("invalid-file-type")
				}
			}],
			className: "file",
			xor: "and"
		}],
		t = [{
			elem: "#userNameI",
			validate: h.userName
		}, {
			elem: "#userPhoneI",
			validate: [{
				ck: "mobile",
				fail: function() {
					var a = c.trim(c("#userPhoneI").val()) === "" ? "no-phone" : "invalid-phone";
					r(a)
				}
			}, {
				msg: "请输入正确的电话号码",
				ck: "phone",
				fail: function() {
					var a = c.trim(c("#userPhoneI").val()) === "" ? "no-phone" : "invalid-phone";
					r(a)
				}
			}]
		}, {
			elem: "#userEmailI",
			validate: [{
				msg: "请输入正确的邮箱地址",
				ck: "email",
				fail: function() {
					var a = c.trim(c("#userEmailI").val()) === "" ? "no-email" : "invalid-email";
					r(a)
				}
			}]
		}, {
			elem: "#userQQI",
			validate: h.qq
		}, {
			elem: "#userBillI",
			validate: h.bill
		}],
		u = e.check({
			callback: function() {
				o = !0, b.status === "-1" ? c("a.login-ctrl").trigger("click") : (n.show(), c(".ie6mask").show())
			},
			configs: s
		}),
		v = e.check({
			callback: function() {
				n.clone().appendTo(m), c("#form .confirmSubmit").hide(), p && x(), q = !0, m.submit()
			},
			configs: t
		}),
		w = e.check({
			callback: function() {
				x()
			},
			configs: t
		}),
		x = function() {
			c.extend(b, {
				name: c("#userNameI").val(),
				email: c("#userEmailI").val(),
				phone: c("#userPhoneI").val(),
				qq: c("#userQQI").val(),
				bill: l.val() === "抬头，如公司名称等" ? "" : l.val()
			});
			var a = Object.create(b);
			a.userId = b.id;
			var d = "user.do?method=setUserInfo&" + c.param(a);
			c.ajax(d).done(function(a) {
				a.status === "1" ? A() : a && a.msg && alert(a.msg)
			}).fail(function() {
				alert("保存失败!!!")
			})
		};
	c("a.login-ctrl").live("click", function() {
		i.login(function() {
			o && i.current(function(a) {
				b === null ? b = a : a.status === "1" && (b = a), a.status !== "1" || !a.phone ? B() : A(), n.show(), c(".ie6mask").show()
			}, function(a) {})
		}, !0)
	});
	var y = function() {
		c("#moreText").placeHolder({
			info: "请输入"
		}), c("#moreFieldText").placeHolder({
			info: "请输入"
		});
		var a = window.screen.availHeight,
			b = c(".user-info"),
			d = b.height();
		b.css({
			offset: (a - d) / 2,
			"margin-top": (a - d) / 2
		}), c.browser.msie && c.browser.version < 7 && c(".forIEShadow").height(c("#doc1").height())
	};
	c(function() {
		f.init(), z(), y(), c("#goToConfirmTrans").bind("click", function() {
			u.run()
		}), n.delegate(".close", "click", function() {
			c(".ie6mask").hide(), n.hide(), c("#form .confirmSubmit").remove()
		}), n.delegate("#goToTrans", "click", function() {
			q ? alert("您已经提交过了！，不用重复提交") : v.run()
		}), m.ajaxForm({
			dataType: "json",
			beforeSubmit: function() {
				if (c("#alreadyRead").prop("checked") === !1) {
					alert("请阅读并勾选《有道专业翻译服务条款》");
					return !1
				}
				return !0
			},
			success: function(a, b) {
				n.hide(), c("#form .confirmSubmit").remove(), b === "success" && a.chooseAuto === !0 && (f.log({
					action: "select_offer_method"
				}), d.open(g.chooseBaojia(!0, a), function() {
					c(".message-box-baojia .close").click(function() {
						window.location.reload()
					}), c(".message-box-baojia .control-btn-blue").click(function() {
						f.log({
							action: "manual_offer"
						}), window.location.reload()
					}), c(".message-box-baojia .control-btn-green").click(function() {
						f.log({
							action: "auto_offer"
						}), window.location.reload()
					})
				})), b === "success" && a.chooseAuto === !1 ? d.open(g.docSubmitMsg(!0, a), function() {
					c(".message-box .close,.message-box .control-btn").click(function() {
						window.location.reload()
					})
				}) : d.open(g.docSubmitMsg(!1, null), function() {
					c(".message-box .close,.message-box .control-btn").click(function() {
						d.closeMsg(function() {
							d.closeMsg()
						})
					})
				})
			}
		})
	})
});
define("business/orderpay", function(a) {
	var b = a("lib/jquery-1.7"),
		c = a("business/log"),
		d = a("business/orders"),
		e = a("business/consts"),
		f = b(".order-info"),
		g = b(".submit-btn"),
		h = "user.do?method=submitPayment",
		i = "user.s?method=charge&source=fast",
		j = "user.s?method=deleteOrderAfterPay",
		k, l = function(a) {
			var b = parseInt(e.discount) === 100 ? '价格： <i class="big-word num-word">' + a.cost + "元</i><br/>" : '<span class="line-through">原价： <i class="big-word num-word">' + a.cost + "元</i></span>&nbsp;&nbsp;&nbsp;" + '优惠价： <i class="big-word num-word">' + a.realCost + "元</i></span><br/>",
				c = a.lang === "en-zh" ? "单词数统计" : "字数统计";
			return c + '： <i class="big-word num-word">' + a.length + "字</i><br />" + b + '语言：<i class="big-word name-word">' + a.lang.replace("zh", "中文").replace("en", "英文") + "</i><br/>" + '<span class="tips">您的账户余额为 <i class="big-word num-word">' + a.amount + "元</i>，不足以支付，请您充值</span>" + '<a class="control-btn charge clog-js" data-act="To-Chongzhi" href="javascript:void(0)" hidefocus="true">去充值</a>'
		}, m = function() {
			b(".confirm-pay-newpage").click(function() {
				var a = {};
				a.userId = b(this).data("userid"), a.orderId = b(this).data("orderid"), a.length = b(this).data("word"), a.realCost = b(this).data("cost"), a.cost = parseFloat(a.realCost / e.discount * 100).toFixed(2), a.lang = b(this).data("srclang") + "→" + b(this).data("deslang"), a.amount = b(this).data("amount"), d.checkToPay(a, function(a) {
					c.log({
						action: "Enough-paid-2"
					});
					var d = h + "&userId=" + a.userId + "&orderId=" + a.orderId;
					b.ajax({
						url: d,
						cache: !1
					}).done(function(b) {
						b.status === "1" ? location.href = "user.s?method=orderResult&orderId=" + a.orderId : b && b.msg && alert(b.msg)
					}).fail(function(a) {
						a.msg && alert(a.msg)
					})
				}, function(a) {
					location.href = "user.do?method=chongzhi&orderId=" + a.orderId + "&userId=" + a.userId
				})
			}), b(".del").click(function() {
				var a = b(this).data("id");
				if (a && confirm("您确定要删除么，记录删除后将无法找回")) {
					var c = j + "&orderId=" + a;
					b.ajax({
						url: c,
						cache: !1
					}).done(function(c) {
						c.msg === "success" ? b("#" + a).css({
							display: "none"
						}) : c && c.msg && alert(c.msg)
					}).fail(function(a) {
						a.msg && alert(a.msg)
					})
				}
			})
		};
	b(function() {
		m(), c.init()
	})
});
define("business/charge", function(a) {
	function m() {
		var a = b.trim(h.val());
		if (!e.isValidCharge(a)) {
			i.show().html("请输入正确的充值金额"), d.log({
				action: "charge-error"
			});
			return !1
		}
		if (a < parseFloat(f.mincharge)) {
			i.show().html("充值金额不能少于" + f.mincharge + "元");
			return !1
		}
		if (a > parseInt(f.maxcharge, 10)) {
			i.show().html("充值金额不能大于" + f.maxcharge + "元");
			return !1
		}
		var c = parseFloat(b("#balance").html()) + parseFloat(h.val());
		if (parseFloat(b("#price").html()) > c) {
			i.html("支付金额小于订单金额，请重新输入").show();
			return !1
		}
		return !0
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = a("business/log"),
		e = a("business/validator"),
		f = a("business/consts"),
		g = b("#form"),
		h = b("#rechargeNum"),
		i = b("#chargeErrorMsg"),
		j = b("#payLessError"),
		k = b("#source"),
		l = a("business/account");
	b("a.login-ctrl").live("click", function() {
		l.login(function() {}, !0)
	}), b(function() {
		d.init(), h.bind({
			keydown: function() {
				i.hide()
			},
			focus: function() {
				j && j.hide()
			},
			blur: function() {
				if ( !! j) {
					var a = b.trim(h.val());
					if (a && !e.isValidCharge(a)) {
						j.html("请输入正确的充值金额").show();
						return
					}
					if (a && a < parseFloat(f.mincharge)) {
						j.show().html("充值金额不能少于" + f.mincharge + "元");
						return !1
					}
					if (a && a > parseInt(f.maxcharge, 10)) {
						j.show().html("充值金额不能大于" + f.maxcharge + "元");
						return !1
					}
					var c = (parseFloat(b("#balance").html()) * 1e3 + parseFloat(h.val()) * 1e3) / 1e3;
					parseFloat(b("#price").html()) > c ? (j.html("支付金额小于订单金额，请重新输入").show(), d.log({
						action: "pay_not_enough"
					})) : parseFloat(b("#price").html()) < c ? (j.html("多余金额，下次可以直接支付").show(), d.log({
						action: "pay_over_enough"
					})) : j.hide()
				}
			}
		}), b(document.body).bind("click", function() {
			b("#nextStep").show(), i.hide()
		}), b("#form input").bind("click", function() {
			i.hide()
		}), b("#moreBank").bind("click", function() {
			b("#line1").hide(), b("#line2").show(), b("#line3").show()
		}), g.bind("submit", function() {
			if (b("#alreadyRead").prop("checked") === !1) {
				alert("请阅读并勾选《有道专业翻译服务条款》");
				return !1
			}
			if (!m()) {
				b("#nextStep").hide();
				return !1
			}
			var a = b('input[name="payMethod"]:checked').val();
			if (b.trim(a) === "") {
				b("#nextStep").hide(), i.show().html("请选择支付方式");
				return !1
			}
			g.attr("action", "neteasePay.s");
			return !0
		}), b("a.login-ctrl").live("click", function() {
			l.login(function() {}, !0)
		}), b(".control-btn").bind("click", function() {
			l.current(function(a) {
				a.status === "1" ? setTimeout(function() {
					g.submit()
				}, 0) : l.login(function() {}, !0)
			}), typeof scope != "undefined" && scope.pageId == "chongzhi" && d.log({
				action: "pay_next_step"
			}), setTimeout(function() {
				g.submit()
			}, 0)
		})
	})
});
define("business/filePay", function(a) {
	function m() {
		var a = b.trim(h.val());
		if (!e.isValidCharge(a)) {
			i.show().html("请输入正确的充值金额"), d.log({
				action: "charge-error"
			});
			return !1
		}
		if (a < parseFloat(f.mincharge)) {
			i.show().html("充值金额不能少于" + f.mincharge + "元");
			return !1
		}
		if (a > parseInt(f.maxcharge, 10)) {
			i.show().html("充值金额不能大于" + f.maxcharge + "元");
			return !1
		}
		var c = (parseFloat(b("#balance").html()) * 1e3 + parseFloat(h.val()) * 1e3) / 1e3;
		if (parseFloat(b("#price").html()) > c) {
			i.html("支付金额小于订单金额，请重新输入").show();
			return !1
		}
		return !0
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = a("business/log"),
		e = a("business/validator"),
		f = a("business/consts"),
		g = b("#form"),
		h = b("#rechargeNum"),
		i = b("#chargeErrorMsg"),
		j = a("business/account"),
		k = b("#payLessError"),
		l = b("#source"),
		j = a("business/account");
	b("a.login-ctrl").live("click", function() {
		j.login(function() {}, !0)
	}), b(function() {
		d.init(), h.bind({
			keydown: function() {
				i.hide()
			},
			focus: function() {
				k && k.hide()
			},
			blur: function() {
				if ( !! k) {
					var a = b.trim(h.val());
					if (a && !e.isValidCharge(a)) {
						k.html("请输入正确的充值金额").show();
						return
					}
					if (a && a < parseFloat(f.mincharge)) {
						k.show().html("充值金额不能少于" + f.mincharge + "元");
						return !1
					}
					if (a && a > parseInt(f.maxcharge, 10)) {
						k.show().html("充值金额不能大于" + f.maxcharge + "元");
						return !1
					}
					var c = (parseFloat(b("#balance").html()) * 1e3 + parseFloat(h.val()) * 1e3) / 1e3;
					parseFloat(b("#price").html()) > c ? (k.html("支付金额小于订单金额，请重新输入").show(), d.log({
						action: "pay_not_enough"
					})) : parseFloat(b("#price").html()) < c ? (k.html("多余金额，下次可以直接支付").show(), d.log({
						action: "pay_over_enough"
					})) : k.hide()
				}
			}
		}), b(document.body).bind("click", function() {
			b("#nextStep").show(), i.hide()
		}), b("#form input").bind("click", function() {
			i.hide()
		}), b("#moreBank").bind("click", function() {
			b("#line1").hide(), b("#line2").show(), b("#line3").show()
		}), g.bind("submit", function() {
			if (b("#alreadyRead").prop("checked") === !1) {
				alert("请阅读并勾选《有道专业翻译服务条款》");
				return !1
			}
			if (!m()) {
				b("#nextStep").hide();
				return !1
			}
			var a = b('input[name="payMethod"]:checked').val();
			if (b.trim(a) === "") {
				b("#nextStep").hide(), i.show().html("请选择支付方式");
				return !1
			}
			l.val() === "file" ? g.attr("action", "neteasePay.s") : l.val() === "fileAccount" && g.attr("action", "neteasePay.s");
			return !0
		}), b("a.login-ctrl").live("click", function() {
			j.login(function() {}, !0)
		}), b(".control-btn").bind("click", function() {
			typeof scope != "undefined" && scope.pageId == "chongzhi" && d.log({
				action: "pay_next_step"
			}), setTimeout(function() {
				g.submit()
			}, 0)
		})
	})
});
define("business/complain", function(a) {
	function h(a, c, d, e) {
		var f = {}, h = "id: " + a + "\n" + "level: " + d + "\n\n" + b.trim(e);
		f.sendDataToSys = {
			prodtype: "fanyi",
			q: "at",
			comments: h
		}, f.sendDataToUser = {
			userId: c,
			orderId: a,
			level: d,
			method: "updateOrderInfo"
		};
		var i = "http://feedback.youdao.com/quality_report_thanks.jsp?" + b.param(f.sendDataToSys);
		g(i), f.sendDataToSys.cache = !1, f.sendDataToSys.method = "complain";
		return f
	}

	function g(a) {
		var b = f.length >= 20 ? 0 : f.length;
		f[b] = new Image, f[b].src = a
	}

	function e(a) {
		var c = b(".bd-content").data("checked"),
			d = c === "3",
			e = a === "" ? 0 : a.length;
		if (d && (e === 0 || e > 600)) {
			var f = "";
			e === 0 && (f = "请填写为何不满意，我们会立即作出反馈"), e > 600 && (f = "请将内容控制到600字以内"), b(".grade-error").text(f), b(".grade-error").addClass("grade-error-show"), b("#reason").focus();
			return !1
		}
		return !0
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/utils"),
		d = a("business/log");
	b(function() {
		d.init(), b('input:radio[name="grade-level"]').click(function() {
			var a = b(".bd-content"),
				c = b(this).val();
			if (c === a.data("checked")) return !1;
			c === "3" ? b(".grade-content").addClass("bad-choice") : b(".grade-content").removeClass("bad-choice"), b(".grade-content").addClass("radio-checked"), b(".grade-error").removeClass("grade-error-show"), a.data("checked", c)
		}), b(".control-btn").bind("click", function() {
			if (!b(".grade-content").hasClass("radio-checked")) return !1;
			var a = b("#id").val(),
				c = b("#userId").val(),
				d = b.trim(b("#reason").val()),
				f = b('input[name="grade-level"]:checked').val();
			if (!e(d)) return !1;
			var g = h(a, c, f, d);
			b.ajax({
				url: "user.do",
				data: g.sendDataToUser,
				success: function(a, c, d) {
					b(".grade-content").addClass("grade-control")
				}
			}), f !== "1" && b.ajax({
				url: "system.do",
				data: g.sendDataToSys,
				success: function(a, b, c) {},
				error: function(a, b, c) {
					alert(b)
				}
			});
			return !1
		}), b("#resultCopy").copyClick4RenGong(function() {
			d.log({
				action: "copy-reportpage"
			});
			return b.trim(b("#resultCopy").closest(".grade-item").find(".grade-to").html())
		})
	});
	var f = []
});
define("business/edmComplain", function(a) {
	function j(a) {
		var b = i.length >= 20 ? 0 : i.length;
		i[b] = new Image, i[b].src = a
	}

	function h() {
		g = d.check({
			callback: function() {
				var a = b.trim(b("#reason").val()),
					d = {
						prodtype: "fanyi",
						q: "at-edm",
						reporter: b.trim(b("#name").val()),
						email: b.trim(b("#email").val()),
						comments: a
					};
				j("http://feedback.youdao.com/quality_report_thanks.jsp?" + b.param(d)), c.open(e.complainSubmitMsg(), function() {
					b(".message-box .close,.message-box .control-btn").click(function() {
						c.closeMsg(function() {
							window.location.reload()
						})
					})
				})
			},
			configs: [{
				elem: "#name",
				validate: f.userName
			}, {
				elem: "#email",
				validate: f.email
			}, {
				elem: "#reason",
				validate: f.reason
			}]
		})
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/lightips"),
		d = a("lib/utils"),
		e = a("business/tmpl"),
		f = a("business/validators"),
		g = null;
	b(function() {
		h(), b(".control-btn").bind("click", function() {
			g.run()
		})
	});
	var i = []
});
define("business/landingWithSms", function(a) {
	function p(a) {
		c.open(e.landingSubmit(0, a), function() {
			b(".message-box .close,.message-box .control-btn").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function m(a) {
		c.open(e.landingSubmit(1, a), function() {
			b(".message-box .close").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function l() {
		if ( !! i()) {
			var a = {
				url: "user.s?method=trialApplyWithSms&mobile=" + b.trim(b("#mobile").val()) + "&validate=" + encodeURIComponent(b.trim(b("#validate").val())),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 2 ? p(s) : a.msg === 1 ? m("恭喜，" + a.username + n) : a.msg === -1 ? m(o) : p(q)
			}).fail(function() {
				p(q)
			})
		}
	}

	function k() {
		if (!i()) c.closeMsg();
		else {
			var a = {
				url: "user.s?method=sendValidate&mobile=" + b.trim(b("#mobile").val()),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 1 ? (c.closeMsg(), j()) : a.msg === -1 ? m(o) : p(r)
			}).fail(function() {
				p(r)
			})
		}
	}

	function j() {
		var a = 30;
		b("#validate").attr("disabled", !1), b("#sendValidate").attr("disabled", !0).val("重新发送(" + a + ")"), h.html("验证码已经发送至您的手机").show();
		var c = setInterval(function() {
			a = a - 1, a > 0 ? b("#sendValidate").val("重新发送(" + a + ")") : (clearInterval(c), b("#sendValidate").attr("disabled", !1).val("重新发送"), h.html("").hide())
		}, 1e3)
	}

	function i() {
		var a = b.trim(b("#mobile").val());
		if (a === "") {
			h.html("手机号码不能为空").show();
			return !1
		}
		if (!f.isMobile(a)) {
			h.html("请输入正确的手机号码").show();
			return !1
		}
		h.html("").hide();
		return !0
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/lightips"),
		d = a("business/log"),
		e = a("business/tmpl"),
		f = a("business/validator"),
		g = a("business/account");
	b(function() {
		d.init(), g.initLoginForLanding("#landingButton", l), g.initLoginForLanding("#sendValidate", k), b("#validate").bind("keyup", function() {
			b.trim(b(this).val()) === "" ? (b("#landingButton").hide(), b("#landingPH").show()) : (b("#landingPH").hide(), b("#landingButton").show())
		})
	});
	var h = b("#landingWithSmsErrorMsg"),
		n = "<br />您已成功领取20元翻译红包<br />赶快去体验高效专业的人工翻译吧！",
		o = "您只能领取一次红包，欢迎您使用有道专业翻译！",
		q = "系统出错，请稍后再试。",
		r = "发送验证码失败，请稍后再试。",
		s = "您输入的验证码不正确。"
});
define("business/landingWithJf", function(a) {
	function w(a) {
		c.open(e.landingSubmit(1, a), function() {
			b(".message-box .close").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function v(a) {
		c.open(e.landingSubmit(0, a), function() {
			b(".message-box .close,.message-box .control-btn").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function n() {
		var a = b("#landingWithJfErrorMsg"),
			c = b.trim(b("#mobile").val());
		if (c === "") {
			a.html("手机号码不能为空").show();
			return !1
		}
		if (!f.isMobile(c)) {
			a.html("请输入正确的手机号码").show();
			return !1
		}
		a.html("").hide();
		return !0
	}

	function m() {
		var a = b("#code_err"),
			c = b.trim(b("#input_code").val());
		if (c === "") {
			a.html("优惠券号码不能为空").show();
			return !1
		}
		if (c.length !== 12) {
			a.html("请输入正确的优惠券号码").show();
			return !1
		}
		a.html("").hide();
		return !0
	}

	function l() {
		var a = {
			url: "user.s?method=trialApplyWithJf&validate=" + b.trim(b("#input_code").val()) + "&mobile=" + b.trim(b("#mobile").val()) + "&phoneValidate=" + encodeURIComponent(b.trim(b("#validate").val())),
			cache: !1
		};
		b.ajax(a).done(function(a) {
			a.msg === 3 ? v(t) : a.msg === 2 ? v(s) : a.msg === 1 ? w("恭喜，" + a.username + o) : a.msg === -1 ? w(p) : v(r)
		}).fail(function() {
			v(r)
		})
	}

	function k() {
		var a = 30,
			c = b("#landingWithJfErrorMsg");
		b("#validate").attr("disabled", !1), b("#sendValidate").attr("disabled", !0).val("重新发送(" + a + ")"), c.html("验证码已经发送至您的手机").show();
		var d = setInterval(function() {
			a = a - 1, a > 0 ? b("#sendValidate").attr("disabled", !0).val("重新发送(" + a + ")") : (clearInterval(d), b("#sendValidate").attr("disabled", !1).val("重新发送"), c.html("").hide())
		}, 1e3)
	}

	function j() {
		if ( !! n()) {
			var a = {
				url: "user.s?method=sendValidateJf&mobile=" + b.trim(b("#mobile").val()) + "&validate=" + b.trim(b("#input_code").val()),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 1 ? k() : a.msg === -1 ? w(p) : v(u)
			}).fail(function() {
				v(u)
			})
		}
	}

	function i() {
		c.open(e.landingSubmit(3, q), function() {
			b("#validate").bind("keyup", function() {
				b.trim(b(this).val()) === "" ? (b(".landingButton").hide(), b(".landingPH").css({
					display: "block"
				})) : (b(".landingPH").hide(), b(".landingButton").css({
					display: "block"
				}))
			}), b("#sendValidate").click(function() {
				j()
			}), b(".message-box .landingButton").click(function() {
				l()
			}), b(".message-box .close").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/lightips"),
		d = a("business/log"),
		e = a("business/tmpl"),
		f = a("business/validator"),
		g = a("business/account");
	b(function() {
		d.init(), h(i), b("#input_code").live("click", function() {
			b("#input_code").val() === "输入优惠券..." && b("#input_code").val("")
		})
	});
	var h = function(a) {
		b("#btn_bonus").bind("click", function() {
			!m() || g.current(function(b) {
				b.status === "1" ? a() : (d.log({
					action: "login-on-bonus"
				}), g.login(a, !1))
			}, function(a) {})
		})
	}, o = "<br />您已成功领取翻译体验金<br />赶快去体验高效专业的人工翻译吧！",
		p = "您只能领取一次体验金，欢迎您使用有道专业翻译！",
		q = "为保证我们的服务品质，请勿多次领取！输入手机号获取验证码后，即可兑换体验金。",
		r = "系统出错，请稍后再试。",
		s = "您输入的优惠券号码不正确。",
		t = "您输入的验证码不正确。",
		u = "发送验证码失败，请稍后再试。"
});
define("business/landingWithDh", function(a) {
	function p(a) {
		c.open(e.landingSubmit(0, a), function() {
			b(".message-box .close,.message-box .control-btn").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function m(a) {
		c.open(e.landingSubmit(1, a), function() {
			b(".message-box .close").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function l() {
		if ( !! i()) {
			var a = {
				url: "user.s?method=trialApplyWithDh&mobile=" + b.trim(b("#mobile").val()) + "&validate=" + encodeURIComponent(b.trim(b("#validate").val())),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 2 ? p(s) : a.msg === 1 ? m("恭喜，" + a.username + n) : a.msg === -1 ? m(o) : p(q)
			}).fail(function() {
				p(q)
			})
		}
	}

	function k() {
		if (!i()) c.closeMsg();
		else {
			var a = {
				url: "user.s?method=sendValidateDh&mobile=" + b.trim(b("#mobile").val()),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 1 ? (c.closeMsg(), j()) : a.msg === -1 ? m(o) : p(r)
			}).fail(function() {
				p(r)
			})
		}
	}

	function j() {
		var a = 30;
		b("#validate").attr("disabled", !1), b("#sendValidate").attr("disabled", !0).val("重新发送(" + a + ")"), h.html("验证码已经发送至您的手机").show();
		var c = setInterval(function() {
			a = a - 1, a > 0 ? b("#sendValidate").val("重新发送(" + a + ")") : (clearInterval(c), b("#sendValidate").attr("disabled", !1).val("重新发送"), h.html("").hide())
		}, 1e3)
	}

	function i() {
		var a = b.trim(b("#mobile").val());
		if (a === "") {
			h.html("手机号码不能为空").show();
			return !1
		}
		if (!f.isMobile(a)) {
			h.html("请输入正确的手机号码").show();
			return !1
		}
		h.html("").hide();
		return !0
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/lightips"),
		d = a("business/log"),
		e = a("business/tmpl"),
		f = a("business/validator"),
		g = a("business/account");
	b(function() {
		d.init(), g.initLoginForLanding("#landingButton", l), g.initLoginForLanding("#sendValidate", k), b("#validate").bind("keyup", function() {
			b.trim(b(this).val()) === "" ? (b("#landingButton").hide(), b("#landingPH").show()) : (b("#landingPH").hide(), b("#landingButton").show())
		})
	});
	var h = b("#landingWithSmsErrorMsg"),
		n = "<br />您已成功领取20元翻译红包<br />赶快去体验高效专业的人工翻译吧！",
		o = "您只能领取一次红包，欢迎您使用有道专业翻译！",
		q = "系统出错，请稍后再试。",
		r = "发送验证码失败，请稍后再试。",
		s = "您输入的验证码不正确。"
});
define("business/landingWithLx", function(a) {
	function p(a) {
		c.open(e.landingSubmit(0, a), function() {
			b(".message-box .close,.message-box .control-btn").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function m(a) {
		c.open(e.landingSubmit(1, a), function() {
			b(".message-box .close").click(function() {
				c.closeMsg(function() {
					c.closeMsg()
				})
			})
		})
	}

	function l() {
		if ( !! i()) {
			var a = {
				url: "user.s?method=trialApplyWithLx&mobile=" + b.trim(b("#mobile").val()) + "&validate=" + encodeURIComponent(b.trim(b("#validate").val())),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 2 ? p(s) : a.msg === 1 ? m("恭喜，" + a.username + n) : a.msg === -1 ? m(o) : p(q)
			}).fail(function() {
				p(q)
			})
		}
	}

	function k() {
		if (!i()) c.closeMsg();
		else {
			var a = {
				url: "user.s?method=sendValidateLx&mobile=" + b.trim(b("#mobile").val()),
				cache: !1
			};
			b.ajax(a).done(function(a) {
				a.msg === 1 ? (c.closeMsg(), j()) : a.msg === -1 ? m(o) : p(r)
			}).fail(function() {
				p(r)
			})
		}
	}

	function j() {
		var a = 30;
		b("#validate").attr("disabled", !1), b("#sendValidate").attr("disabled", !0).val("重新发送(" + a + ")"), h.html("验证码已经发送至您的手机").show();
		var c = setInterval(function() {
			a = a - 1, a > 0 ? b("#sendValidate").val("重新发送(" + a + ")") : (clearInterval(c), b("#sendValidate").attr("disabled", !1).val("重新发送"), h.html("").hide())
		}, 1e3)
	}

	function i() {
		var a = b.trim(b("#mobile").val());
		if (a === "") {
			h.html("手机号码不能为空").show();
			return !1
		}
		if (!f.isMobile(a)) {
			h.html("请输入正确的手机号码").show();
			return !1
		}
		h.html("").hide();
		return !0
	}
	var b = a("lib/jquery-1.7"),
		c = a("lib/lightips"),
		d = a("business/log"),
		e = a("business/tmpl"),
		f = a("business/validator"),
		g = a("business/account");
	b(function() {
		d.init(), g.initLoginForLanding("#landingButton", l), g.initLoginForLanding("#sendValidate", k), b("#validate").bind("keyup", function() {
			b.trim(b(this).val()) === "" ? (b("#landingButton").hide(), b("#landingPH").show()) : (b("#landingPH").hide(), b("#landingButton").show())
		})
	});
	var h = b("#landingWithSmsErrorMsg"),
		n = "<br />您已成功领取100元翻译红包<br />赶快去体验高效专业的人工翻译吧！",
		o = "您只能领取一次红包，欢迎您使用有道专业翻译！",
		q = "系统出错，请稍后再试。",
		r = "发送验证码失败，请稍后再试。",
		s = "您输入的验证码不正确。"
});
define("business/service", function(a, b) {
	var c = a("business/head")
});
define("business/introFast", function(a, b) {
	a("business/head")
});
define("business/business", function(a) {
	a("lib/jquery-1.7"), a("lib/jquery-extension/form"), a("lib/utils"), a("business/log"), a("business/tmpl"), a("business/utils"), a("business/validator"), a("business/validators"), a("business/input"), a("business/account"), a("business/head"), a("business/orders"), a("business/index"), a("business/about"), a("business/example"), a("business/trans"), a("business/userinfo"), a("business/infoInput"), a("business/orderView"), a("business/orderInfo"), a("business/autoBaojia"), a("business/quiktran"), a("business/filetran"), a("business/orderpay"), a("business/charge"), a("business/filePay"), a("business/complain"), a("business/edmComplain"), a("business/landingWithSms"), a("business/landingWithJf"), a("business/landingWithDh"), a("business/landingWithLx"), a("business/about"), a("business/example"), a("business/trans"), a("business/service"), a("business/introFast")
});