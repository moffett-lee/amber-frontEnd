(function() {
	function b(g, f, h) {
		if (g.addEventListener) {
			g.addEventListener(f, h, false)
		} else {
			g.attachEvent && g.attachEvent("on" + f, h)
		}
	}

	function m(g) {
		if (typeof window.onload != "function") {
			window.onload = g
		} else {
			var f = window.onload;
			window.onload = function() {
				f();
				g()
			}
		}
	}

	function e() {
		var g = {};
		for (type in {
			Top: "",
			Left: ""
		}) {
			var f = type == "Top" ? "Y" : "X";
			if (typeof window["page" + f + "Offset"] != "undefined") {
				g[type.toLowerCase()] = window["page" + f + "Offset"]
			} else {
				f = document.documentElement.clientHeight ? document.documentElement : document.body;
				g[type.toLowerCase()] = f["scroll" + type]
			}
		}
		return g
	}

	function a() {
		var g = document.body,
			f;
		if (window.innerHeight) {
			f = window.innerHeight
		} else {
			if (g.parentElement.clientHeight) {
				f = g.parentElement.clientHeight
			} else {
				if (g && g.clientHeight) {
					f = g.clientHeight
				}
			}
		}
		return f
	}

	function d(f) {
		this.parent = document.body;
		this.createEl(this.parent, f);
		this.size = Math.random() * 20 + 10;
		this.el.style.width = Math.round(this.size) + "px";
		this.el.style.height = Math.round(this.size) + "px";
		this.maxLeft = document.body.offsetWidth - this.size;
		this.maxTop = document.body.offsetHeight - this.size;
		this.left = Math.random() * this.maxLeft;
		this.top = e().top + 1;
		this.angle = 1.4 + 0.2 * Math.random();
		this.minAngle = 1.4;
		this.maxAngle = 1.6;
		this.angleDelta = 0.01 * Math.random();
		this.speed = 2 + Math.random()
	}
	var c = false;
	m(function() {
		c = true
	});
	var n = true;
	window.createSnow = function(h, g) {
		if (c) {
			var i = [],
				f = setInterval(function() {
					n && g > i.length && Math.random() < g * 0.0025 && i.push(new d(h));
					!n && !i.length && clearInterval(f);
					for (var j = e().top, l = a(), k = i.length - 1; k >= 0; k--) {
						if (i[k]) {
							if (i[k].top < j || i[k].top + i[k].size + 1 > j + l) {
								i[k].remove();
								i[k] = null;
								i.splice(k, 1)
							} else {
								i[k].move();
								i[k].draw()
							}
						}
					}
				}, 40);
			b(window, "scroll", function() {
				for (var j = i.length - 1; j >= 0; j--) {
					i[j].draw()
				}
			})
		} else {
			m(function() {
				createSnow(h, g)
			})
		}
	};
	window.removeSnow = function() {
		n = false
	};
	d.prototype = {
		createEl: function(g, f) {
			this.el = document.createElement("img");
			this.el.setAttribute("src", "images/Snowflake.png");
			this.el.style.position = "absolute";
			this.el.style.display = "block";
			this.el.style.zIndex = "99999";
			this.el.className = "Snowflake";
			this.parent.appendChild(this.el)
		},
		move: function() {
			if (this.angle < this.minAngle || this.angle > this.maxAngle) {
				this.angleDelta = -this.angleDelta
			}
			this.angle += this.angleDelta;
			this.left += this.speed * Math.cos(this.angle * Math.PI);
			this.top -= this.speed * Math.sin(this.angle * Math.PI);
			if (this.left < 0) {
				this.left = this.maxLeft
			} else {
				if (this.left > this.maxLeft) {
					this.left = 0
				}
			}
		},
		draw: function() {
			this.el.style.top = Math.round(this.top) + "px";
			this.el.style.left = Math.round(this.left) + "px"
		},
		remove: function() {
			this.parent.removeChild(this.el);
			this.parent = this.el = null
		}
	}
})();