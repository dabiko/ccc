/*
  html2canvas 0.4.1 <http://html2canvas.hertzen.com>
  Copyright (c) 2013 Niklas von Hertzen

  Released under MIT License
*/
(function (t, e, n) {
    "use strict";

    function r(t, e, n) {
        var r, a = t.runtimeStyle && t.runtimeStyle[e],
            o = t.style;
        return !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(n) && /^-?\d/.test(n) && (r = o.left, a && (t.runtimeStyle.left = t.currentStyle.left), o.left = "fontSize" === e ? "1em" : n || 0, n = o.pixelLeft + "px", o.left = r, a && (t.runtimeStyle.left = a)), /^(thin|medium|thick)$/i.test(n) ? n : Math.round(parseFloat(n)) + "px"
    }

    function a(t) {
        return parseInt(t, 10)
    }

    function o(t, e, a, o) {
        if (t = (t || "").split(","), t = t[o || 0] || t[0] || "auto", t = u.Util.trimText(t).split(" "), "backgroundSize" !== a || t[0] && !t[0].match(/cover|contain|auto/)) {
            if (t[0] = -1 === t[0].indexOf("%") ? r(e, a + "X", t[0]) : t[0], t[1] === n) {
                if ("backgroundSize" === a) return t[1] = "auto", t;
                t[1] = t[0]
            }
            t[1] = -1 === t[1].indexOf("%") ? r(e, a + "Y", t[1]) : t[1]
        } else;
        return t
    }

    function i(t, e, n, r, a, o) {
        var i, l, s, c, d = u.Util.getCSS(e, t, a);
        if (1 === d.length && (c = d[0], d = [], d[0] = c, d[1] = c), -1 !== ("" + d[0]).indexOf("%")) s = parseFloat(d[0]) / 100, l = n.width * s, "backgroundSize" !== t && (l -= (o || r).width * s);
        else if ("backgroundSize" === t)
            if ("auto" === d[0]) l = r.width;
            else if (/contain|cover/.test(d[0])) {
            var h = u.Util.resizeBounds(r.width, r.height, n.width, n.height, d[0]);
            l = h.width, i = h.height
        } else l = parseInt(d[0], 10);
        else l = parseInt(d[0], 10);
        return "auto" === d[1] ? i = l / r.width * r.height : -1 !== ("" + d[1]).indexOf("%") ? (s = parseFloat(d[1]) / 100, i = n.height * s, "backgroundSize" !== t && (i -= (o || r).height * s)) : i = parseInt(d[1], 10), [l, i]
    }

    function l(t, e) {
        var n = [];
        return {
            storage: n,
            width: t,
            height: e,
            clip: function () {
                n.push({
                    type: "function",
                    name: "clip",
                    arguments: arguments
                })
            },
            translate: function () {
                n.push({
                    type: "function",
                    name: "translate",
                    arguments: arguments
                })
            },
            fill: function () {
                n.push({
                    type: "function",
                    name: "fill",
                    arguments: arguments
                })
            },
            save: function () {
                n.push({
                    type: "function",
                    name: "save",
                    arguments: arguments
                })
            },
            restore: function () {
                n.push({
                    type: "function",
                    name: "restore",
                    arguments: arguments
                })
            },
            fillRect: function () {
                n.push({
                    type: "function",
                    name: "fillRect",
                    arguments: arguments
                })
            },
            createPattern: function () {
                n.push({
                    type: "function",
                    name: "createPattern",
                    arguments: arguments
                })
            },
            drawShape: function () {
                var t = [];
                return n.push({
                    type: "function",
                    name: "drawShape",
                    arguments: t
                }), {
                    moveTo: function () {
                        t.push({
                            name: "moveTo",
                            arguments: arguments
                        })
                    },
                    lineTo: function () {
                        t.push({
                            name: "lineTo",
                            arguments: arguments
                        })
                    },
                    arcTo: function () {
                        t.push({
                            name: "arcTo",
                            arguments: arguments
                        })
                    },
                    bezierCurveTo: function () {
                        t.push({
                            name: "bezierCurveTo",
                            arguments: arguments
                        })
                    },
                    quadraticCurveTo: function () {
                        t.push({
                            name: "quadraticCurveTo",
                            arguments: arguments
                        })
                    }
                }
            },
            drawImage: function () {
                n.push({
                    type: "function",
                    name: "drawImage",
                    arguments: arguments
                })
            },
            fillText: function () {
                n.push({
                    type: "function",
                    name: "fillText",
                    arguments: arguments
                })
            },
            setVariable: function (t, e) {
                return n.push({
                    type: "variable",
                    name: t,
                    arguments: e
                }), e
            }
        }
    }

    function s(t) {
        return {
            zindex: t,
            children: []
        }
    }
    var c, d, u = {};
    u.Util = {}, u.Util.log = function (e) {
            u.logging && t.console && t.console.log && t.console.log(e)
        }, u.Util.trimText = function (t) {
            return function (e) {
                return t ? t.apply(e) : ((e || "") + "").replace(/^\s+|\s+$/g, "")
            }
        }(String.prototype.trim), u.Util.asFloat = function (t) {
            return parseFloat(t)
        },
        function () {
            var t = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g,
                e = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
            u.Util.parseTextShadows = function (n) {
                if (!n || "none" === n) return [];
                for (var r = n.match(t), a = [], o = 0; r && r.length > o; o++) {
                    var i = r[o].match(e);
                    a.push({
                        color: i[0],
                        offsetX: i[1] ? i[1].replace("px", "") : 0,
                        offsetY: i[2] ? i[2].replace("px", "") : 0,
                        blur: i[3] ? i[3].replace("px", "") : 0
                    })
                }
                return a
            }
        }(), u.Util.parseBackgroundImage = function (t) {
            var e, n, r, a, o, i, l, s, c = " \r\n	",
                d = [],
                u = 0,
                h = 0,
                f = function () {
                    e && ('"' === n.substr(0, 1) && (n = n.substr(1, n.length - 2)), n && s.push(n), "-" === e.substr(0, 1) && (a = e.indexOf("-", 1) + 1) > 0 && (r = e.substr(0, a), e = e.substr(a)), d.push({
                        prefix: r,
                        method: e.toLowerCase(),
                        value: o,
                        args: s
                    })), s = [], e = r = n = o = ""
                };
            f();
            for (var p = 0, g = t.length; g > p; p++)
                if (i = t[p], !(0 === u && c.indexOf(i) > -1)) {
                    switch (i) {
                        case '"':
                            l ? l === i && (l = null) : l = i;
                            break;
                        case "(":
                            if (l) break;
                            if (0 === u) {
                                u = 1, o += i;
                                continue
                            }
                            h++;
                            break;
                        case ")":
                            if (l) break;
                            if (1 === u) {
                                if (0 === h) {
                                    u = 0, o += i, f();
                                    continue
                                }
                                h--
                            }
                            break;
                        case ",":
                            if (l) break;
                            if (0 === u) {
                                f();
                                continue
                            }
                            if (1 === u && 0 === h && !e.match(/^url$/i)) {
                                s.push(n), n = "", o += i;
                                continue
                            }
                    }
                    o += i, 0 === u ? e += i : n += i
                } return f(), d
        }, u.Util.Bounds = function (t) {
            var e, n = {};
            return t.getBoundingClientRect && (e = t.getBoundingClientRect(), n.top = e.top, n.bottom = e.bottom || e.top + e.height, n.left = e.left, n.width = t.offsetWidth, n.height = t.offsetHeight), n
        }, u.Util.OffsetBounds = function (t) {
            var e = t.offsetParent ? u.Util.OffsetBounds(t.offsetParent) : {
                top: 0,
                left: 0
            };
            return {
                top: t.offsetTop + e.top,
                bottom: t.offsetTop + t.offsetHeight + e.top,
                left: t.offsetLeft + e.left,
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }, u.Util.getCSS = function (t, n, r) {
            c !== t && (d = e.defaultView.getComputedStyle(t, null));
            var i = d[n];
            if (/^background(Size|Position)$/.test(n)) return o(i, t, n, r);
            if (/border(Top|Bottom)(Left|Right)Radius/.test(n)) {
                var l = i.split(" ");
                return 1 >= l.length && (l[1] = l[0]), l.map(a)
            }
            return i
        }, u.Util.resizeBounds = function (t, e, n, r, a) {
            var o, i, l = n / r,
                s = t / e;
            return a && "auto" !== a ? s > l ^ "contain" === a ? (i = r, o = r * s) : (o = n, i = n / s) : (o = n, i = r), {
                width: o,
                height: i
            }
        }, u.Util.BackgroundPosition = function (t, e, n, r, a) {
            var o = i("backgroundPosition", t, e, n, r, a);
            return {
                left: o[0],
                top: o[1]
            }
        }, u.Util.BackgroundSize = function (t, e, n, r) {
            var a = i("backgroundSize", t, e, n, r);
            return {
                width: a[0],
                height: a[1]
            }
        }, u.Util.Extend = function (t, e) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }, u.Util.Children = function (t) {
            var e;
            try {
                e = t.nodeName && "IFRAME" === t.nodeName.toUpperCase() ? t.contentDocument || t.contentWindow.document : function (t) {
                    var e = [];
                    return null !== t && function (t, e) {
                        var r = t.length,
                            a = 0;
                        if ("number" == typeof e.length)
                            for (var o = e.length; o > a; a++) t[r++] = e[a];
                        else
                            for (; e[a] !== n;) t[r++] = e[a++];
                        return t.length = r, t
                    }(e, t), e
                }(t.childNodes)
            } catch (r) {
                u.Util.log("html2canvas.Util.Children failed with exception: " + r.message), e = []
            }
            return e
        }, u.Util.isTransparent = function (t) {
            return "transparent" === t || "rgba(0, 0, 0, 0)" === t
        }, u.Util.Font = function () {
            var t = {};
            return function (e, r, a) {
                if (t[e + "-" + r] !== n) return t[e + "-" + r];
                var o, i, l, s = a.createElement("div"),
                    c = a.createElement("img"),
                    d = a.createElement("span"),
                    u = "Hidden Text";
                return s.style.visibility = "hidden", s.style.fontFamily = e, s.style.fontSize = r, s.style.margin = 0, s.style.padding = 0, a.body.appendChild(s), c.src = "data:images/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=", c.width = 1, c.height = 1, c.style.margin = 0, c.style.padding = 0, c.style.verticalAlign = "baseline", d.style.fontFamily = e, d.style.fontSize = r, d.style.margin = 0, d.style.padding = 0, d.appendChild(a.createTextNode(u)), s.appendChild(d), s.appendChild(c), o = c.offsetTop - d.offsetTop + 1, s.removeChild(d), s.appendChild(a.createTextNode(u)), s.style.lineHeight = "normal", c.style.verticalAlign = "super", i = c.offsetTop - s.offsetTop + 1, l = {
                    baseline: o,
                    lineWidth: 1,
                    middle: i
                }, t[e + "-" + r] = l, a.body.removeChild(s), l
            }
        }(),
        function () {
            function t(t) {
                return function (e) {
                    try {
                        t.addColorStop(e.stop, e.color)
                    } catch (r) {
                        n.log(["failed to add color stop: ", r, "; tried to add: ", e])
                    }
                }
            }
            var n = u.Util,
                r = {};
            u.Generate = r;
            var a = [/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/, /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];
            r.parseGradient = function (t, e) {
                var n, r, o, i, l, s, c, d, u, h, f, p, g = a.length;
                for (r = 0; g > r && !(o = t.match(a[r])); r += 1);
                if (o) switch (o[1]) {
                    case "-webkit-linear-gradient":
                    case "-o-linear-gradient":
                        if (n = {
                                type: "linear",
                                x0: null,
                                y0: null,
                                x1: null,
                                y1: null,
                                colorStops: []
                            }, l = o[2].match(/\w+/g))
                            for (s = l.length, r = 0; s > r; r += 1) switch (l[r]) {
                                case "top":
                                    n.y0 = 0, n.y1 = e.height;
                                    break;
                                case "right":
                                    n.x0 = e.width, n.x1 = 0;
                                    break;
                                case "bottom":
                                    n.y0 = e.height, n.y1 = 0;
                                    break;
                                case "left":
                                    n.x0 = 0, n.x1 = e.width
                            }
                        if (null === n.x0 && null === n.x1 && (n.x0 = n.x1 = e.width / 2), null === n.y0 && null === n.y1 && (n.y0 = n.y1 = e.height / 2), l = o[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))
                            for (s = l.length, c = 1 / Math.max(s - 1, 1), r = 0; s > r; r += 1) d = l[r].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/), d[2] ? (i = parseFloat(d[2]), i /= "%" === d[3] ? 100 : e.width) : i = r * c, n.colorStops.push({
                                color: d[1],
                                stop: i
                            });
                        break;
                    case "-webkit-gradient":
                        if (n = {
                                type: "radial" === o[2] ? "circle" : o[2],
                                x0: 0,
                                y0: 0,
                                x1: 0,
                                y1: 0,
                                colorStops: []
                            }, l = o[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/), l && (n.x0 = l[1] * e.width / 100, n.y0 = l[2] * e.height / 100, n.x1 = l[3] * e.width / 100, n.y1 = l[4] * e.height / 100), l = o[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g))
                            for (s = l.length, r = 0; s > r; r += 1) d = l[r].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/), i = parseFloat(d[2]), "from" === d[1] && (i = 0), "to" === d[1] && (i = 1), n.colorStops.push({
                                color: d[3],
                                stop: i
                            });
                        break;
                    case "-moz-linear-gradient":
                        if (n = {
                                type: "linear",
                                x0: 0,
                                y0: 0,
                                x1: 0,
                                y1: 0,
                                colorStops: []
                            }, l = o[2].match(/(\d{1,3})%?\s(\d{1,3})%?/), l && (n.x0 = l[1] * e.width / 100, n.y0 = l[2] * e.height / 100, n.x1 = e.width - n.x0, n.y1 = e.height - n.y0), l = o[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g))
                            for (s = l.length, c = 1 / Math.max(s - 1, 1), r = 0; s > r; r += 1) d = l[r].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/), d[2] ? (i = parseFloat(d[2]), d[3] && (i /= 100)) : i = r * c, n.colorStops.push({
                                color: d[1],
                                stop: i
                            });
                        break;
                    case "-webkit-radial-gradient":
                    case "-moz-radial-gradient":
                    case "-o-radial-gradient":
                        if (n = {
                                type: "circle",
                                x0: 0,
                                y0: 0,
                                x1: e.width,
                                y1: e.height,
                                cx: 0,
                                cy: 0,
                                rx: 0,
                                ry: 0,
                                colorStops: []
                            }, l = o[2].match(/(\d{1,3})%?\s(\d{1,3})%?/), l && (n.cx = l[1] * e.width / 100, n.cy = l[2] * e.height / 100), l = o[3].match(/\w+/), d = o[4].match(/[a-z\-]*/), l && d) switch (d[0]) {
                            case "farthest-corner":
                            case "cover":
                            case "":
                                u = Math.sqrt(Math.pow(n.cx, 2) + Math.pow(n.cy, 2)), h = Math.sqrt(Math.pow(n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), f = Math.sqrt(Math.pow(n.x1 - n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), p = Math.sqrt(Math.pow(n.x1 - n.cx, 2) + Math.pow(n.cy, 2)), n.rx = n.ry = Math.max(u, h, f, p);
                                break;
                            case "closest-corner":
                                u = Math.sqrt(Math.pow(n.cx, 2) + Math.pow(n.cy, 2)), h = Math.sqrt(Math.pow(n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), f = Math.sqrt(Math.pow(n.x1 - n.cx, 2) + Math.pow(n.y1 - n.cy, 2)), p = Math.sqrt(Math.pow(n.x1 - n.cx, 2) + Math.pow(n.cy, 2)), n.rx = n.ry = Math.min(u, h, f, p);
                                break;
                            case "farthest-side":
                                "circle" === l[0] ? n.rx = n.ry = Math.max(n.cx, n.cy, n.x1 - n.cx, n.y1 - n.cy) : (n.type = l[0], n.rx = Math.max(n.cx, n.x1 - n.cx), n.ry = Math.max(n.cy, n.y1 - n.cy));
                                break;
                            case "closest-side":
                            case "contain":
                                "circle" === l[0] ? n.rx = n.ry = Math.min(n.cx, n.cy, n.x1 - n.cx, n.y1 - n.cy) : (n.type = l[0], n.rx = Math.min(n.cx, n.x1 - n.cx), n.ry = Math.min(n.cy, n.y1 - n.cy))
                        }
                        if (l = o[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))
                            for (s = l.length, c = 1 / Math.max(s - 1, 1), r = 0; s > r; r += 1) d = l[r].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/), d[2] ? (i = parseFloat(d[2]), i /= "%" === d[3] ? 100 : e.width) : i = r * c, n.colorStops.push({
                                color: d[1],
                                stop: i
                            })
                }
                return n
            }, r.Gradient = function (n, r) {
                if (0 !== r.width && 0 !== r.height) {
                    var a, o, i = e.createElement("canvas"),
                        l = i.getContext("2d");
                    if (i.width = r.width, i.height = r.height, a = u.Generate.parseGradient(n, r)) switch (a.type) {
                        case "linear":
                            o = l.createLinearGradient(a.x0, a.y0, a.x1, a.y1), a.colorStops.forEach(t(o)), l.fillStyle = o, l.fillRect(0, 0, r.width, r.height);
                            break;
                        case "circle":
                            o = l.createRadialGradient(a.cx, a.cy, 0, a.cx, a.cy, a.rx), a.colorStops.forEach(t(o)), l.fillStyle = o, l.fillRect(0, 0, r.width, r.height);
                            break;
                        case "ellipse":
                            var s = e.createElement("canvas"),
                                c = s.getContext("2d"),
                                d = Math.max(a.rx, a.ry),
                                h = 2 * d;
                            s.width = s.height = h, o = c.createRadialGradient(a.rx, a.ry, 0, a.rx, a.ry, d), a.colorStops.forEach(t(o)), c.fillStyle = o, c.fillRect(0, 0, h, h), l.fillStyle = a.colorStops[a.colorStops.length - 1].color, l.fillRect(0, 0, i.width, i.height), l.drawImage(s, a.cx - a.rx, a.cy - a.ry, 2 * a.rx, 2 * a.ry)
                    }
                    return i
                }
            }, r.ListAlpha = function (t) {
                var e, n = "";
                do e = t % 26, n = String.fromCharCode(e + 64) + n, t /= 26; while (26 * t > 26);
                return n
            }, r.ListRoman = function (t) {
                var e, n = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
                    r = [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
                    a = "",
                    o = n.length;
                if (0 >= t || t >= 4e3) return t;
                for (e = 0; o > e; e += 1)
                    for (; t >= r[e];) t -= r[e], a += n[e];
                return a
            }
        }(), u.Parse = function (r, a) {
            function o() {
                return Math.max(Math.max(de.body.scrollWidth, de.documentElement.scrollWidth), Math.max(de.body.offsetWidth, de.documentElement.offsetWidth), Math.max(de.body.clientWidth, de.documentElement.clientWidth))
            }

            function i() {
                return Math.max(Math.max(de.body.scrollHeight, de.documentElement.scrollHeight), Math.max(de.body.offsetHeight, de.documentElement.offsetHeight), Math.max(de.body.clientHeight, de.documentElement.clientHeight))
            }

            function c(t, e) {
                var n = parseInt(ge(t, e), 10);
                return isNaN(n) ? 0 : n
            }

            function d(t, e, n, r, a, o) {
                "transparent" !== o && (t.setVariable("fillStyle", o), t.fillRect(e, n, r, a), ce += 1)
            }

            function h(t, e, r) {
                return t.length > 0 ? e + r.toUpperCase() : n
            }

            function f(t, e) {
                switch (e) {
                    case "lowercase":
                        return t.toLowerCase();
                    case "capitalize":
                        return t.replace(/(^|\s|:|-|\(|\))([a-z])/g, h);
                    case "uppercase":
                        return t.toUpperCase();
                    default:
                        return t
                }
            }

            function p(t) {
                return /^(normal|none|0px)$/.test(t)
            }

            function g(t, e, n, r) {
                null !== t && ue.trimText(t).length > 0 && (r.fillText(t, e, n), ce += 1)
            }

            function m(t, e, r, a) {
                var o = !1,
                    i = ge(e, "fontWeight"),
                    l = ge(e, "fontFamily"),
                    s = ge(e, "fontSize"),
                    c = ue.parseTextShadows(ge(e, "textShadow"));
                switch (parseInt(i, 10)) {
                    case 401:
                        i = "bold";
                        break;
                    case 400:
                        i = "normal"
                }
                return t.setVariable("fillStyle", a), t.setVariable("font", [ge(e, "fontStyle"), ge(e, "fontVariant"), i, s, l].join(" ")), t.setVariable("textAlign", o ? "right" : "left"), c.length && (t.setVariable("shadowColor", c[0].color), t.setVariable("shadowOffsetX", c[0].offsetX), t.setVariable("shadowOffsetY", c[0].offsetY), t.setVariable("shadowBlur", c[0].blur)), "none" !== r ? ue.Font(l, s, de) : n
            }

            function y(t, e, n, r, a) {
                switch (e) {
                    case "underline":
                        d(t, n.left, Math.round(n.top + r.baseline + r.lineWidth), n.width, 1, a);
                        break;
                    case "overline":
                        d(t, n.left, Math.round(n.top), n.width, 1, a);
                        break;
                    case "line-through":
                        d(t, n.left, Math.ceil(n.top + r.middle + r.lineWidth), n.width, 1, a)
                }
            }

            function b(t, e, n, r, a) {
                var o;
                if (he.rangeBounds && !a)("none" !== n || 0 !== ue.trimText(e).length) && (o = w(e, t.node, t.textOffset)), t.textOffset += e.length;
                else if (t.node && "string" == typeof t.node.nodeValue) {
                    var i = r ? t.node.splitText(e.length) : null;
                    o = x(t.node, a), t.node = i
                }
                return o
            }

            function w(t, e, n) {
                var r = de.createRange();
                return r.setStart(e, n), r.setEnd(e, n + t.length), r.getBoundingClientRect()
            }

            function x(t, e) {
                var n = t.parentNode,
                    r = de.createElement("wrapper"),
                    a = t.cloneNode(!0);
                r.appendChild(t.cloneNode(!0)), n.replaceChild(r, t);
                var o = e ? ue.OffsetBounds(r) : ue.Bounds(r);
                return n.replaceChild(a, r), o
            }

            function v(t, e, n) {
                var r, o, i = n.ctx,
                    l = ge(t, "color"),
                    s = ge(t, "textDecoration"),
                    c = ge(t, "textAlign"),
                    d = {
                        node: e,
                        textOffset: 0
                    };
                ue.trimText(e.nodeValue).length > 0 && (e.nodeValue = f(e.nodeValue, ge(t, "textTransform")), c = c.replace(["-webkit-auto"], ["auto"]), o = !a.letterRendering && /^(left|right|justify|auto)$/.test(c) && p(ge(t, "letterSpacing")) ? e.nodeValue.split(/(\b| )/) : e.nodeValue.split(""), r = m(i, t, s, l), a.chinese && o.forEach(function (t, e) {
                    /.*[\u4E00-\u9FA5].*$/.test(t) && (t = t.split(""), t.unshift(e, 1), o.splice.apply(o, t))
                }), o.forEach(function (t, e) {
                    var a = b(d, t, s, o.length - 1 > e, n.transform.matrix);
                    a && (g(t, a.left, a.bottom, i), y(i, s, a, r, l))
                }))
            }

            function k(t, e) {
                var n, r, a = de.createElement("boundelement");
                return a.style.display = "inline", n = t.style.listStyleType, t.style.listStyleType = "none", a.appendChild(de.createTextNode(e)), t.insertBefore(a, t.firstChild), r = ue.Bounds(a), t.removeChild(a), t.style.listStyleType = n, r
            }

            function C(t) {
                var e = -1,
                    n = 1,
                    r = t.parentNode.childNodes;
                if (t.parentNode) {
                    for (; r[++e] !== t;) 1 === r[e].nodeType && n++;
                    return n
                }
                return -1
            }

            function T(t, e) {
                var n, r = C(t);
                switch (e) {
                    case "decimal":
                        n = r;
                        break;
                    case "decimal-leading-zero":
                        n = 1 === ("" + r).length ? r = "0" + ("" + r) : "" + r;
                        break;
                    case "upper-roman":
                        n = u.Generate.ListRoman(r);
                        break;
                    case "lower-roman":
                        n = u.Generate.ListRoman(r).toLowerCase();
                        break;
                    case "lower-alpha":
                        n = u.Generate.ListAlpha(r).toLowerCase();
                        break;
                    case "upper-alpha":
                        n = u.Generate.ListAlpha(r)
                }
                return n + ". "
            }

            function S(t, e, n) {
                var r, a, o, i = e.ctx,
                    l = ge(t, "listStyleType");
                if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(l)) {
                    if (a = T(t, l), o = k(t, a), m(i, t, "none", ge(t, "color")), "inside" !== ge(t, "listStylePosition")) return;
                    i.setVariable("textAlign", "left"), r = n.left, g(a, r, o.bottom, i)
                }
            }

            function M(t) {
                var e = r[t];
                return e && e.succeeded === !0 ? e.img : !1
            }

            function R(t, e) {
                var n = Math.max(t.left, e.left),
                    r = Math.max(t.top, e.top),
                    a = Math.min(t.left + t.width, e.left + e.width),
                    o = Math.min(t.top + t.height, e.top + e.height);
                return {
                    left: n,
                    top: r,
                    width: a - n,
                    height: o - r
                }
            }

            function E(t, e, n) {
                var r, a = "static" !== e.cssPosition,
                    o = a ? ge(t, "zIndex") : "auto",
                    i = ge(t, "opacity"),
                    l = "none" !== ge(t, "cssFloat");
                e.zIndex = r = s(o), r.isPositioned = a, r.isFloated = l, r.opacity = i, r.ownStacking = "auto" !== o || 1 > i, n && n.zIndex.children.push(e)
            }

            function I(t, e, n, r, a) {
                var o = c(e, "paddingLeft"),
                    i = c(e, "paddingTop"),
                    l = c(e, "paddingRight"),
                    s = c(e, "paddingBottom");
                $(t, n, 0, 0, n.width, n.height, r.left + o + a[3].width, r.top + i + a[0].width, r.width - (a[1].width + a[3].width + o + l), r.height - (a[0].width + a[2].width + i + s))
            }

            function L(t) {
                return ["Top", "Right", "Bottom", "Left"].map(function (e) {
                    return {
                        width: c(t, "border" + e + "Width"),
                        color: ge(t, "border" + e + "Color")
                    }
                })
            }

            function O(t) {
                return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (e) {
                    return ge(t, "border" + e + "Radius")
                })
            }

            function z(t, e, n, r) {
                var a = function (t, e, n) {
                    return {
                        x: t.x + (e.x - t.x) * n,
                        y: t.y + (e.y - t.y) * n
                    }
                };
                return {
                    start: t,
                    startControl: e,
                    endControl: n,
                    end: r,
                    subdivide: function (o) {
                        var i = a(t, e, o),
                            l = a(e, n, o),
                            s = a(n, r, o),
                            c = a(i, l, o),
                            d = a(l, s, o),
                            u = a(c, d, o);
                        return [z(t, i, c, u), z(u, d, s, r)]
                    },
                    curveTo: function (t) {
                        t.push(["bezierCurve", e.x, e.y, n.x, n.y, r.x, r.y])
                    },
                    curveToReversed: function (r) {
                        r.push(["bezierCurve", n.x, n.y, e.x, e.y, t.x, t.y])
                    }
                }
            }

            function A(t, e, n, r, a, o, i) {
                e[0] > 0 || e[1] > 0 ? (t.push(["line", r[0].start.x, r[0].start.y]), r[0].curveTo(t), r[1].curveTo(t)) : t.push(["line", o, i]), (n[0] > 0 || n[1] > 0) && t.push(["line", a[0].start.x, a[0].start.y])
            }

            function B(t, e, n, r, a, o, i) {
                var l = [];
                return e[0] > 0 || e[1] > 0 ? (l.push(["line", r[1].start.x, r[1].start.y]), r[1].curveTo(l)) : l.push(["line", t.c1[0], t.c1[1]]), n[0] > 0 || n[1] > 0 ? (l.push(["line", o[0].start.x, o[0].start.y]), o[0].curveTo(l), l.push(["line", i[0].end.x, i[0].end.y]), i[0].curveToReversed(l)) : (l.push(["line", t.c2[0], t.c2[1]]), l.push(["line", t.c3[0], t.c3[1]])), e[0] > 0 || e[1] > 0 ? (l.push(["line", a[1].end.x, a[1].end.y]), a[1].curveToReversed(l)) : l.push(["line", t.c4[0], t.c4[1]]), l
            }

            function U(t, e, n) {
                var r = t.left,
                    a = t.top,
                    o = t.width,
                    i = t.height,
                    l = e[0][0],
                    s = e[0][1],
                    c = e[1][0],
                    d = e[1][1],
                    u = e[2][0],
                    h = e[2][1],
                    f = e[3][0],
                    p = e[3][1],
                    g = o - c,
                    m = i - h,
                    y = o - u,
                    b = i - p;
                return {
                    topLeftOuter: be(r, a, l, s).topLeft.subdivide(.5),
                    topLeftInner: be(r + n[3].width, a + n[0].width, Math.max(0, l - n[3].width), Math.max(0, s - n[0].width)).topLeft.subdivide(.5),
                    topRightOuter: be(r + g, a, c, d).topRight.subdivide(.5),
                    topRightInner: be(r + Math.min(g, o + n[3].width), a + n[0].width, g > o + n[3].width ? 0 : c - n[3].width, d - n[0].width).topRight.subdivide(.5),
                    bottomRightOuter: be(r + y, a + m, u, h).bottomRight.subdivide(.5),
                    bottomRightInner: be(r + Math.min(y, o + n[3].width), a + Math.min(m, i + n[0].width), Math.max(0, u - n[1].width), Math.max(0, h - n[2].width)).bottomRight.subdivide(.5),
                    bottomLeftOuter: be(r, a + b, f, p).bottomLeft.subdivide(.5),
                    bottomLeftInner: be(r + n[3].width, a + b, Math.max(0, f - n[3].width), Math.max(0, p - n[2].width)).bottomLeft.subdivide(.5)
                }
            }

            function N(t, e, n, r, a) {
                var o = ge(t, "backgroundClip"),
                    i = [];
                switch (o) {
                    case "content-box":
                    case "padding-box":
                        A(i, r[0], r[1], e.topLeftInner, e.topRightInner, a.left + n[3].width, a.top + n[0].width), A(i, r[1], r[2], e.topRightInner, e.bottomRightInner, a.left + a.width - n[1].width, a.top + n[0].width), A(i, r[2], r[3], e.bottomRightInner, e.bottomLeftInner, a.left + a.width - n[1].width, a.top + a.height - n[2].width), A(i, r[3], r[0], e.bottomLeftInner, e.topLeftInner, a.left + n[3].width, a.top + a.height - n[2].width);
                        break;
                    default:
                        A(i, r[0], r[1], e.topLeftOuter, e.topRightOuter, a.left, a.top), A(i, r[1], r[2], e.topRightOuter, e.bottomRightOuter, a.left + a.width, a.top), A(i, r[2], r[3], e.bottomRightOuter, e.bottomLeftOuter, a.left + a.width, a.top + a.height), A(i, r[3], r[0], e.bottomLeftOuter, e.topLeftOuter, a.left, a.top + a.height)
                }
                return i
            }

            function P(t, e, n) {
                var r, a, o, i, l, s, c = e.left,
                    d = e.top,
                    u = e.width,
                    h = e.height,
                    f = O(t),
                    p = U(e, f, n),
                    g = {
                        clip: N(t, p, n, f, e),
                        borders: []
                    };
                for (r = 0; 4 > r; r++)
                    if (n[r].width > 0) {
                        switch (a = c, o = d, i = u, l = h - n[2].width, r) {
                            case 0:
                                l = n[0].width, s = B({
                                    c1: [a, o],
                                    c2: [a + i, o],
                                    c3: [a + i - n[1].width, o + l],
                                    c4: [a + n[3].width, o + l]
                                }, f[0], f[1], p.topLeftOuter, p.topLeftInner, p.topRightOuter, p.topRightInner);
                                break;
                            case 1:
                                a = c + u - n[1].width, i = n[1].width, s = B({
                                    c1: [a + i, o],
                                    c2: [a + i, o + l + n[2].width],
                                    c3: [a, o + l],
                                    c4: [a, o + n[0].width]
                                }, f[1], f[2], p.topRightOuter, p.topRightInner, p.bottomRightOuter, p.bottomRightInner);
                                break;
                            case 2:
                                o = o + h - n[2].width, l = n[2].width, s = B({
                                    c1: [a + i, o + l],
                                    c2: [a, o + l],
                                    c3: [a + n[3].width, o],
                                    c4: [a + i - n[3].width, o]
                                }, f[2], f[3], p.bottomRightOuter, p.bottomRightInner, p.bottomLeftOuter, p.bottomLeftInner);
                                break;
                            case 3:
                                i = n[3].width, s = B({
                                    c1: [a, o + l + n[2].width],
                                    c2: [a, o],
                                    c3: [a + i, o + n[0].width],
                                    c4: [a + i, o + l]
                                }, f[3], f[0], p.bottomLeftOuter, p.bottomLeftInner, p.topLeftOuter, p.topLeftInner)
                        }
                        g.borders.push({
                            args: s,
                            color: n[r].color
                        })
                    } return g
            }

            function F(t, e) {
                var n = t.drawShape();
                return e.forEach(function (t, e) {
                    n[0 === e ? "moveTo" : t[0] + "To"].apply(null, t.slice(1))
                }), n
            }

            function V(t, e, n) {
                "transparent" !== n && (t.setVariable("fillStyle", n), F(t, e), t.fill(), ce += 1)
            }

            function D(t, e, n) {
                var r, a, o = de.createElement("valuewrap"),
                    i = ["lineHeight", "textAlign", "fontFamily", "color", "fontSize", "paddingLeft", "paddingTop", "width", "height", "border", "borderLeftWidth", "borderTopWidth"];
                i.forEach(function (e) {
                    try {
                        o.style[e] = ge(t, e)
                    } catch (n) {
                        ue.log("html2canvas: Parse: Exception caught in renderFormValue: " + n.message)
                    }
                }), o.style.borderColor = "black", o.style.borderStyle = "solid", o.style.display = "block", o.style.position = "absolute", (/^(submit|reset|button|text|password)$/.test(t.type) || "SELECT" === t.nodeName) && (o.style.lineHeight = ge(t, "height")), o.style.top = e.top + "px", o.style.left = e.left + "px", r = "SELECT" === t.nodeName ? (t.options[t.selectedIndex] || 0).text : t.value, r || (r = t.placeholder), a = de.createTextNode(r), o.appendChild(a), pe.appendChild(o), v(t, a, n), pe.removeChild(o)
            }

            function $(t) {
                t.drawImage.apply(t, Array.prototype.slice.call(arguments, 1)), ce += 1
            }

            function G(n, r) {
                var a = t.getComputedStyle(n, r);
                if (a && a.content && "none" !== a.content && "-moz-alt-content" !== a.content && "none" !== a.display) {
                    var o = a.content + "",
                        i = o.substr(0, 1);
                    i === o.substr(o.length - 1) && i.match(/'|"/) && (o = o.substr(1, o.length - 2));
                    var l = "url" === o.substr(0, 3),
                        s = e.createElement(l ? "img" : "span");
                    return s.className = me + "-before " + me + "-after", Object.keys(a).filter(W).forEach(function (t) {
                        try {
                            s.style[t] = a[t]
                        } catch (e) {
                            ue.log(["Tried to assign readonly property ", t, "Error:", e])
                        }
                    }), l ? s.src = ue.parseBackgroundImage(o)[0].args[0] : s.innerHTML = o, s
                }
            }

            function W(e) {
                return isNaN(t.parseInt(e, 10))
            }

            function H(t, e) {
                var n = G(t, ":before"),
                    r = G(t, ":after");
                (n || r) && (n && (t.className += " " + me + "-before", t.parentNode.insertBefore(n, t), oe(n, e, !0), t.parentNode.removeChild(n), t.className = t.className.replace(me + "-before", "").trim()), r && (t.className += " " + me + "-after", t.appendChild(r), oe(r, e, !0), t.removeChild(r), t.className = t.className.replace(me + "-after", "").trim()))
            }

            function j(t, e, n, r) {
                var a = Math.round(r.left + n.left),
                    o = Math.round(r.top + n.top);
                t.createPattern(e), t.translate(a, o), t.fill(), t.translate(-a, -o)
            }

            function q(t, e, n, r, a, o, i, l) {
                var s = [];
                s.push(["line", Math.round(a), Math.round(o)]), s.push(["line", Math.round(a + i), Math.round(o)]), s.push(["line", Math.round(a + i), Math.round(l + o)]), s.push(["line", Math.round(a), Math.round(l + o)]), F(t, s), t.save(), t.clip(), j(t, e, n, r), t.restore()
            }

            function X(t, e, n) {
                d(t, e.left, e.top, e.width, e.height, n)
            }

            function _(t, e, n, r, a) {
                var o = ue.BackgroundSize(t, e, r, a),
                    i = ue.BackgroundPosition(t, e, r, a, o),
                    l = ge(t, "backgroundRepeat").split(",").map(ue.trimText);
                switch (r = Q(r, o), l = l[a] || l[0]) {
                    case "repeat-x":
                        q(n, r, i, e, e.left, e.top + i.top, 99999, r.height);
                        break;
                    case "repeat-y":
                        q(n, r, i, e, e.left + i.left, e.top, r.width, 99999);
                        break;
                    case "no-repeat":
                        q(n, r, i, e, e.left + i.left, e.top + i.top, r.width, r.height);
                        break;
                    default:
                        j(n, r, i, {
                            top: e.top,
                            left: e.left,
                            width: r.width,
                            height: r.height
                        })
                }
            }

            function Y(t, e, n) {
                for (var r, a = ge(t, "backgroundImage"), o = ue.parseBackgroundImage(a), i = o.length; i--;)
                    if (a = o[i], a.args && 0 !== a.args.length) {
                        var l = "url" === a.method ? a.args[0] : a.value;
                        r = M(l), r ? _(t, e, n, r, i) : ue.log("html2canvas: Error loading background:", a)
                    }
            }

            function Q(t, e) {
                if (t.width === e.width && t.height === e.height) return t;
                var n, r = de.createElement("canvas");
                return r.width = e.width, r.height = e.height, n = r.getContext("2d"), $(n, t, 0, 0, t.width, t.height, 0, 0, e.width, e.height), r
            }

            function J(t, e, n) {
                return t.setVariable("globalAlpha", ge(e, "opacity") * (n ? n.opacity : 1))
            }

            function K(t) {
                return t.replace("px", "")
            }

            function Z(t) {
                var e = ge(t, "transform") || ge(t, "-webkit-transform") || ge(t, "-moz-transform") || ge(t, "-ms-transform") || ge(t, "-o-transform"),
                    n = ge(t, "transform-origin") || ge(t, "-webkit-transform-origin") || ge(t, "-moz-transform-origin") || ge(t, "-ms-transform-origin") || ge(t, "-o-transform-origin") || "0px 0px";
                n = n.split(" ").map(K).map(ue.asFloat);
                var r;
                if (e && "none" !== e) {
                    var a = e.match(we);
                    if (a) switch (a[1]) {
                        case "matrix":
                            r = a[2].split(",").map(ue.trimText).map(ue.asFloat)
                    }
                }
                return {
                    origin: n,
                    matrix: r
                }
            }

            function te(t, e, n, r) {
                var s = l(e ? n.width : o(), e ? n.height : i()),
                    c = {
                        ctx: s,
                        opacity: J(s, t, e),
                        cssPosition: ge(t, "position"),
                        borders: L(t),
                        transform: r,
                        clip: e && e.clip ? ue.Extend({}, e.clip) : null
                    };
                return E(t, c, e), a.useOverflow === !0 && /(hidden|scroll|auto)/.test(ge(t, "overflow")) === !0 && /(BODY)/i.test(t.nodeName) === !1 && (c.clip = c.clip ? R(c.clip, n) : n), c
            }

            function ee(t, e, n) {
                var r = {
                    left: e.left + t[3].width,
                    top: e.top + t[0].width,
                    width: e.width - (t[1].width + t[3].width),
                    height: e.height - (t[0].width + t[2].width)
                };
                return n && (r = R(r, n)), r
            }

            function ne(t, e) {
                var n = e.matrix ? ue.OffsetBounds(t) : ue.Bounds(t);
                return e.origin[0] += n.left, e.origin[1] += n.top, n
            }

            function re(t, e, n, r) {
                var a, o = Z(t, e),
                    i = ne(t, o),
                    l = te(t, e, i, o),
                    s = l.borders,
                    c = l.ctx,
                    d = ee(s, i, l.clip),
                    u = P(t, i, s),
                    h = fe.test(t.nodeName) ? "#efefef" : ge(t, "backgroundColor");
                switch (F(c, u.clip), c.save(), c.clip(), d.height > 0 && d.width > 0 && !r ? (X(c, i, h), Y(t, d, c)) : r && (l.backgroundColor = h), c.restore(), u.borders.forEach(function (t) {
                    V(c, t.args, t.color)
                }), n || H(t, l), t.nodeName) {
                    case "IMG":
                        (a = M(t.getAttribute("src"))) ? I(c, t, a, i, s): ue.log("html2canvas: Error loading <img>:" + t.getAttribute("src"));
                        break;
                    case "INPUT":
                        /^(text|url|email|submit|button|reset)$/.test(t.type) && (t.value || t.placeholder || "").length > 0 && D(t, i, l);
                        break;
                    case "TEXTAREA":
                        (t.value || t.placeholder || "").length > 0 && D(t, i, l);
                        break;
                    case "SELECT":
                        (t.options || t.placeholder || "").length > 0 && D(t, i, l);
                        break;
                    case "LI":
                        S(t, l, d);
                        break;
                    case "CANVAS":
                        I(c, t, t, i, s)
                }
                return l
            }

            function ae(t) {
                return "none" !== ge(t, "display") && "hidden" !== ge(t, "visibility") && !t.hasAttribute("data-html2canvas-ignore")
            }

            function oe(t, e, n) {
                ae(t) && (e = re(t, e, n, !1) || e, fe.test(t.nodeName) || ie(t, e, n))
            }

            function ie(t, e, n) {
                ue.Children(t).forEach(function (r) {
                    r.nodeType === r.ELEMENT_NODE ? oe(r, e, n) : r.nodeType === r.TEXT_NODE && v(t, r, e)
                })
            }

            function le() {
                var t = ge(e.documentElement, "backgroundColor"),
                    n = ue.isTransparent(t) && se === e.body,
                    r = re(se, null, !1, n);
                return ie(se, r), n && (t = r.backgroundColor), pe.removeChild(ye), {
                    backgroundColor: t,
                    stack: r
                }
            }
            t.scroll(0, 0);
            var se = a.elements === n ? e.body : a.elements[0],
                ce = 0,
                de = se.ownerDocument,
                ue = u.Util,
                he = ue.Support(a, de),
                fe = RegExp("(" + a.ignoreElements + ")"),
                pe = de.body,
                ge = ue.getCSS,
                me = "___html2canvas___pseudoelement",
                ye = de.createElement("style");
            ye.innerHTML = "." + me + '-before:before { content: "" !important; display: none !important; }' + "." + me + '-after:after { content: "" !important; display: none !important; }', pe.appendChild(ye), r = r || {};
            var be = function (t) {
                    return function (e, n, r, a) {
                        var o = r * t,
                            i = a * t,
                            l = e + r,
                            s = n + a;
                        return {
                            topLeft: z({
                                x: e,
                                y: s
                            }, {
                                x: e,
                                y: s - i
                            }, {
                                x: l - o,
                                y: n
                            }, {
                                x: l,
                                y: n
                            }),
                            topRight: z({
                                x: e,
                                y: n
                            }, {
                                x: e + o,
                                y: n
                            }, {
                                x: l,
                                y: s - i
                            }, {
                                x: l,
                                y: s
                            }),
                            bottomRight: z({
                                x: l,
                                y: n
                            }, {
                                x: l,
                                y: n + i
                            }, {
                                x: e + o,
                                y: s
                            }, {
                                x: e,
                                y: s
                            }),
                            bottomLeft: z({
                                x: l,
                                y: s
                            }, {
                                x: l - o,
                                y: s
                            }, {
                                x: e,
                                y: n + i
                            }, {
                                x: e,
                                y: n
                            })
                        }
                    }
                }(4 * ((Math.sqrt(2) - 1) / 3)),
                we = /(matrix)\((.+)\)/;
            return le()
        }, u.Preload = function (r) {
            function a(t) {
                M.href = t, M.href = M.href;
                var e = M.protocol + M.host;
                return e === g
            }

            function o() {
                x.log("html2canvas: start: images: " + w.numLoaded + " / " + w.numTotal + " (failed: " + w.numFailed + ")"), !w.firstRun && w.numLoaded >= w.numTotal && (x.log("Finished loading images: # " + w.numTotal + " (failed: " + w.numFailed + ")"), "function" == typeof r.complete && r.complete(w))
            }

            function i(e, a, i) {
                var l, s, c = r.proxy;
                M.href = e, e = M.href, l = "html2canvas_" + v++, i.callbackname = l, c += c.indexOf("?") > -1 ? "&" : "?", c += "url=" + encodeURIComponent(e) + "&callback=" + l, s = C.createElement("script"), t[l] = function (e) {
                    "error:" === e.substring(0, 6) ? (i.succeeded = !1, w.numLoaded++, w.numFailed++, o()) : (p(a, i), a.src = e), t[l] = n;
                    try {
                        delete t[l]
                    } catch (r) {}
                    s.parentNode.removeChild(s), s = null, delete i.script, delete i.callbackname
                }, s.setAttribute("type", "text/javascript"), s.setAttribute("src", c), i.script = s, t.document.body.appendChild(s)
            }

            function l(e, n) {
                var r = t.getComputedStyle(e, n),
                    a = r.content;
                "url" === a.substr(0, 3) && m.loadImage(u.Util.parseBackgroundImage(a)[0].args[0]), h(r.backgroundImage, e)
            }

            function s(t) {
                l(t, ":before"), l(t, ":after")
            }

            function c(t, e) {
                var r = u.Generate.Gradient(t, e);
                r !== n && (w[t] = {
                    img: r,
                    succeeded: !0
                }, w.numTotal++, w.numLoaded++, o())
            }

            function d(t) {
                return t && t.method && t.args && t.args.length > 0
            }

            function h(t, e) {
                var r;
                u.Util.parseBackgroundImage(t).filter(d).forEach(function (t) {
                    "url" === t.method ? m.loadImage(t.args[0]) : t.method.match(/\-?gradient$/) && (r === n && (r = u.Util.Bounds(e)), c(t.value, r))
                })
            }

            function f(t) {
                var e = !1;
                try {
                    x.Children(t).forEach(f)
                } catch (r) {}
                try {
                    e = t.nodeType
                } catch (a) {
                    e = !1, x.log("html2canvas: failed to access some element's nodeType - Exception: " + a.message)
                }
                if (1 === e || e === n) {
                    s(t);
                    try {
                        h(x.getCSS(t, "backgroundImage"), t)
                    } catch (r) {
                        x.log("html2canvas: failed to get background-images - Exception: " + r.message)
                    }
                    h(t)
                }
            }

            function p(e, a) {
                e.onload = function () {
                    a.timer !== n && t.clearTimeout(a.timer), w.numLoaded++, a.succeeded = !0, e.onerror = e.onload = null, o()
                }, e.onerror = function () {
                    if ("anonymous" === e.crossOrigin && (t.clearTimeout(a.timer), r.proxy)) {
                        var l = e.src;
                        return e = new Image, a.img = e, e.src = l, i(e.src, e, a), n
                    }
                    w.numLoaded++, w.numFailed++, a.succeeded = !1, e.onerror = e.onload = null, o()
                }
            }
            var g, m, y, b, w = {
                    numLoaded: 0,
                    numFailed: 0,
                    numTotal: 0,
                    cleanupDone: !1
                },
                x = u.Util,
                v = 0,
                k = r.elements[0] || e.body,
                C = k.ownerDocument,
                T = k.getElementsByTagName("img"),
                S = T.length,
                M = C.createElement("a"),
                R = function (t) {
                    return t.crossOrigin !== n
                }(new Image);
            for (M.href = t.location.href, g = M.protocol + M.host, m = {
                    loadImage: function (t) {
                        var e, o;
                        t && w[t] === n && (e = new Image, t.match(/data:image\/.*;base64,/i) ? (e.src = t.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), o = w[t] = {
                            img: e
                        }, w.numTotal++, p(e, o)) : a(t) || r.allowTaint === !0 ? (o = w[t] = {
                            img: e
                        }, w.numTotal++, p(e, o), e.src = t) : R && !r.allowTaint && r.useCORS ? (e.crossOrigin = "anonymous", o = w[t] = {
                            img: e
                        }, w.numTotal++, p(e, o), e.src = t) : r.proxy && (o = w[t] = {
                            img: e
                        }, w.numTotal++, i(t, e, o)))
                    },
                    cleanupDOM: function (a) {
                        var i, l;
                        if (!w.cleanupDone) {
                            a && "string" == typeof a ? x.log("html2canvas: Cleanup because: " + a) : x.log("html2canvas: Cleanup after timeout: " + r.timeout + " ms.");
                            for (l in w)
                                if (w.hasOwnProperty(l) && (i = w[l], "object" == typeof i && i.callbackname && i.succeeded === n)) {
                                    t[i.callbackname] = n;
                                    try {
                                        delete t[i.callbackname]
                                    } catch (s) {}
                                    i.script && i.script.parentNode && (i.script.setAttribute("src", "about:blank"), i.script.parentNode.removeChild(i.script)), w.numLoaded++, w.numFailed++, x.log("html2canvas: Cleaned up failed img: '" + l + "' Steps: " + w.numLoaded + " / " + w.numTotal)
                                } t.stop !== n ? t.stop() : e.execCommand !== n && e.execCommand("Stop", !1), e.close !== n && e.close(), w.cleanupDone = !0, a && "string" == typeof a || o()
                        }
                    },
                    renderingDone: function () {
                        b && t.clearTimeout(b)
                    }
                }, r.timeout > 0 && (b = t.setTimeout(m.cleanupDOM, r.timeout)), x.log("html2canvas: Preload starts: finding background-images"), w.firstRun = !0, f(k), x.log("html2canvas: Preload: Finding images"), y = 0; S > y; y += 1) m.loadImage(T[y].getAttribute("src"));
            return w.firstRun = !1, x.log("html2canvas: Preload: Done."), w.numTotal === w.numLoaded && o(), m
        }, u.Renderer = function (t, r) {
            function a(t) {
                function e(t) {
                    Object.keys(t).sort().forEach(function (n) {
                        var r = [],
                            o = [],
                            i = [],
                            l = [];
                        t[n].forEach(function (t) {
                                t.node.zIndex.isPositioned || 1 > t.node.zIndex.opacity ? i.push(t) : t.node.zIndex.isFloated ? o.push(t) : r.push(t)
                            }),
                            function s(t) {
                                t.forEach(function (t) {
                                    l.push(t), t.children && s(t.children)
                                })
                            }(r.concat(o, i)), l.forEach(function (t) {
                                t.context ? e(t.context) : a.push(t.node)
                            })
                    })
                }
                var r, a = [];
                return r = function (t) {
                    function e(t, r, a) {
                        var o = "auto" === r.zIndex.zindex ? 0 : Number(r.zIndex.zindex),
                            i = t,
                            l = r.zIndex.isPositioned,
                            s = r.zIndex.isFloated,
                            c = {
                                node: r
                            },
                            d = a;
                        r.zIndex.ownStacking ? (i = c.context = {
                            "!": [{
                                node: r,
                                children: []
                            }]
                        }, d = n) : (l || s) && (d = c.children = []), 0 === o && a ? a.push(c) : (t[o] || (t[o] = []), t[o].push(c)), r.zIndex.children.forEach(function (t) {
                            e(i, t, d)
                        })
                    }
                    var r = {};
                    return e(r, t), r
                }(t), e(r), a
            }

            function o(t) {
                var e;
                if ("string" == typeof r.renderer && u.Renderer[t] !== n) e = u.Renderer[t](r);
                else {
                    if ("function" != typeof t) throw Error("Unknown renderer");
                    e = t(r)
                }
                if ("function" != typeof e) throw Error("Invalid renderer defined");
                return e
            }
            return o(r.renderer)(t, r, e, a(t.stack), u)
        }, u.Util.Support = function (t, e) {
            function r() {
                var t = new Image,
                    r = e.createElement("canvas"),
                    a = r.getContext === n ? !1 : r.getContext("2d");
                if (a === !1) return !1;
                r.width = r.height = 10, t.src = ["data:images/svg+xml,", "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>", "<foreignObject width='10' height='10'>", "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>", "sup", "</div>", "</foreignObject>", "</svg>"].join("");
                try {
                    a.drawImage(t, 0, 0), r.toDataURL()
                } catch (o) {
                    return !1
                }
                return u.Util.log("html2canvas: Parse: SVG powered rendering available"), !0
            }

            function a() {
                var t, n, r, a, o = !1;
                return e.createRange && (t = e.createRange(), t.getBoundingClientRect && (n = e.createElement("boundtest"), n.style.height = "123px", n.style.display = "block", e.body.appendChild(n), t.selectNode(n), r = t.getBoundingClientRect(), a = r.height, 123 === a && (o = !0), e.body.removeChild(n))), o
            }
            return {
                rangeBounds: a(),
                svgRendering: t.svgRendering && r()
            }
        }, t.html2canvas = function (e, n) {
            e = e.length ? e : [e];
            var r, a, o = {
                logging: !1,
                elements: e,
                background: "#fff",
                proxy: null,
                timeout: 0,
                useCORS: !1,
                allowTaint: !1,
                svgRendering: !1,
                ignoreElements: "IFRAME|OBJECT|PARAM",
                useOverflow: !0,
                letterRendering: !1,
                chinese: !1,
                width: null,
                height: null,
                taintTest: !0,
                renderer: "Canvas"
            };
            return o = u.Util.Extend(n, o), u.logging = o.logging, o.complete = function (t) {
                ("function" != typeof o.onpreloaded || o.onpreloaded(t) !== !1) && (r = u.Parse(t, o), ("function" != typeof o.onparsed || o.onparsed(r) !== !1) && (a = u.Renderer(r, o), "function" == typeof o.onrendered && o.onrendered(a)))
            }, t.setTimeout(function () {
                u.Preload(o)
            }, 0), {
                render: function (t, e) {
                    return u.Renderer(t, u.Util.Extend(e, o))
                },
                parse: function (t, e) {
                    return u.Parse(t, u.Util.Extend(e, o))
                },
                preload: function (t) {
                    return u.Preload(u.Util.Extend(t, o))
                },
                log: u.Util.log
            }
        }, t.html2canvas.log = u.Util.log, t.html2canvas.Renderer = {
            Canvas: n
        }, u.Renderer.Canvas = function (t) {
            function r(t, e) {
                t.beginPath(), e.forEach(function (e) {
                    t[e.name].apply(t, e.arguments)
                }), t.closePath()
            }

            function a(t) {
                if (-1 === l.indexOf(t.arguments[0].src)) {
                    c.drawImage(t.arguments[0], 0, 0);
                    try {
                        c.getImageData(0, 0, 1, 1)
                    } catch (e) {
                        return s = i.createElement("canvas"), c = s.getContext("2d"), !1
                    }
                    l.push(t.arguments[0].src)
                }
                return !0
            }

            function o(e, n) {
                switch (n.type) {
                    case "variable":
                        e[n.name] = n.arguments;
                        break;
                    case "function":
                        switch (n.name) {
                            case "createPattern":
                                if (n.arguments[0].width > 0 && n.arguments[0].height > 0) try {
                                    e.fillStyle = e.createPattern(n.arguments[0], "repeat")
                                } catch (o) {
                                    d.log("html2canvas: Renderer: Error creating pattern", o.message)
                                }
                                break;
                            case "drawShape":
                                r(e, n.arguments);
                                break;
                            case "drawImage":
                                n.arguments[8] > 0 && n.arguments[7] > 0 && (!t.taintTest || t.taintTest && a(n)) && e.drawImage.apply(e, n.arguments);
                                break;
                            default:
                                e[n.name].apply(e, n.arguments)
                        }
                }
            }
            t = t || {};
            var i = e,
                l = [],
                s = e.createElement("canvas"),
                c = s.getContext("2d"),
                d = u.Util,
                h = t.canvas || i.createElement("canvas");
            return function (t, e, r, a, i) {
                var l, s, c, u = h.getContext("2d"),
                    f = t.stack;
                return h.width = h.style.width = e.width || f.ctx.width, h.height = h.style.height = e.height || f.ctx.height, c = u.fillStyle, u.fillStyle = d.isTransparent(f.backgroundColor) && e.background !== n ? e.background : t.backgroundColor, u.fillRect(0, 0, h.width, h.height), u.fillStyle = c, a.forEach(function (t) {
                    u.textBaseline = "bottom", u.save(), t.transform.matrix && (u.translate(t.transform.origin[0], t.transform.origin[1]), u.transform.apply(u, t.transform.matrix), u.translate(-t.transform.origin[0], -t.transform.origin[1])), t.clip && (u.beginPath(), u.rect(t.clip.left, t.clip.top, t.clip.width, t.clip.height), u.clip()), t.ctx.storage && t.ctx.storage.forEach(function (t) {
                        o(u, t)
                    }), u.restore()
                }), d.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj"), 1 === e.elements.length && "object" == typeof e.elements[0] && "BODY" !== e.elements[0].nodeName ? (s = i.Util.Bounds(e.elements[0]), l = r.createElement("canvas"), l.width = Math.ceil(s.width), l.height = Math.ceil(s.height), u = l.getContext("2d"), u.drawImage(h, s.left, s.top, s.width, s.height, 0, 0, s.width, s.height), h = null, l) : h
            }
        }
})(window, document);