/*

jsPDF fromHTML plugin. BETA stage. API subject to change. Needs browser, jQuery
Copyright (c) 2012 2012 Willow Systems Corporation, willow-systems.com
 jsPDF 0.9.0rc1 ( 2013-04-07T16:52 commit ID d95d8f69915bb999f6704e8021108e2e755bd868 )
Copyright (c) 2010-2012 James Hall, james@snapshotmedia.co.uk, https://github.com/MrRio/jsPDF
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.

            -----------------------------------------------------------------------------------------------
            JavaScript PubSub library
            2012 (c) ddotsenko@willowsystems.com
            based on Peter Higgins (dante@dojotoolkit.org)
            Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.
            Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
            http://dojofoundation.org/license for more information.
            -----------------------------------------------------------------------------------------------
 
jsPDF addImage plugin (JPEG only at this time)
Copyright (c) 2012 https://github.com/siefkenj/

jsPDF Silly SVG plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
 
jsPDF split_text_to_size plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
 
jsPDF standard_fonts_metrics plugin
Copyright (c) 2012 Willow Systems Corporation, willow-systems.com
MIT license.
*/
var jsPDF = function () {
    function f(g, d, e, h) {
        g = "undefined" === typeof g ? "p" : g.toString().toLowerCase();
        "undefined" === typeof d && (d = "mm");
        "undefined" === typeof e && (e = "a4");
        "undefined" === typeof h && "undefined" === typeof zpipe && (h = !1);
        var a = e.toString().toLowerCase(),
            p = [],
            j = 0,
            m = h;
        h = {
            a3: [841.89, 1190.55],
            a4: [595.28, 841.89],
            a5: [420.94, 595.28],
            letter: [612, 792],
            legal: [612, 1008]
        };
        var u = "0 g",
            c = 0,
            q = [],
            C = 2,
            F = !1,
            H = [],
            n = {},
            x = {},
            z = 16,
            A, y, s, r, I = {
                title: "",
                subject: "",
                author: "",
                keywords: "",
                creator: ""
            },
            w = 0,
            aa = 0,
            D = {},
            G = new k(D),
            B, v = function (c) {
                return c.toFixed(2)
            },
            V = function (c) {
                var e = c.toFixed(0);
                return 10 > c ? "0" + e : e
            },
            l = function (e) {
                F ? q[c].push(e) : (p.push(e), j += e.length + 1)
            },
            N = function () {
                C++;
                H[C] = j;
                l(C + " 0 obj");
                return C
            },
            Q = function (c) {
                l("stream");
                l(c);
                l("endstream")
            },
            J, ca, R, t = function (c, e) {
                var d;
                d = c;
                var j = e,
                    a, h, b, p, g, m;
                void 0 === j && (j = {});
                a = j.sourceEncoding ? a : "Unicode";
                b = j.outputEncoding;
                if ((j.autoencode || b) && n[A].metadata && n[A].metadata[a] && n[A].metadata[a].encoding)
                    if (a = n[A].metadata[a].encoding, !b && n[A].encoding && (b = n[A].encoding),
                        !b && a.codePages && (b = a.codePages[0]), "string" === typeof b && (b = a[b]), b) {
                        g = !1;
                        p = [];
                        a = 0;
                        for (h = d.length; a < h; a++)(m = b[d.charCodeAt(a)]) ? p.push(String.fromCharCode(m)) : p.push(d[a]), p[a].charCodeAt(0) >> 8 && (g = !0);
                        d = p.join("")
                    } for (a = d.length; void 0 === g && 0 !== a;) d.charCodeAt(a - 1) >> 8 && (g = !0), a--;
                if (g) {
                    p = j.noBOM ? [] : [254, 255];
                    a = 0;
                    for (h = d.length; a < h; a++) {
                        m = d.charCodeAt(a);
                        j = m >> 8;
                        if (j >> 8) throw Error("Character at position " + a.toString(10) + " of string '" + d + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
                        p.push(j);
                        p.push(m - (j << 8))
                    }
                    d = String.fromCharCode.apply(void 0, p)
                }
                return d.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
            },
            W = function () {
                c++;
                F = !0;
                q[c] = [];
                l(v(0.200025 * r) + " w");
                l("0 G");
                0 !== w && l(w.toString(10) + " J");
                0 !== aa && l(aa.toString(10) + " j");
                G.publish("addPage", {
                    pageNumber: c
                })
            },
            E = function (c, a) {
                var d;
                void 0 === c && (c = n[A].fontName);
                void 0 === a && (a = n[A].fontStyle);
                try {
                    d = x[c][a]
                } catch (e) {
                    d = void 0
                }
                if (!d) throw Error("Unable to look up font label for font '" + c + "', '" + a + "'. Refer to getFontList() for available fonts.");
                return d
            },
            K = function () {
                F = !1;
                p = [];
                H = [];
                l("%PDF-1.3");
                J = s * r;
                ca = y * r;
                var a, d, e, b, h;
                for (a = 1; a <= c; a++) {
                    N();
                    l("<</Type /Page");
                    l("/Parent 1 0 R");
                    l("/Resources 2 0 R");
                    l("/Contents " + (C + 1) + " 0 R>>");
                    l("endobj");
                    d = q[a].join("\n");
                    N();
                    if (m) {
                        e = [];
                        for (b = 0; b < d.length; ++b) e[b] = d.charCodeAt(b);
                        h = adler32cs.from(d);
                        d = new Deflater(6);
                        d.append(new Uint8Array(e));
                        d = d.flush();
                        e = [new Uint8Array([120, 156]), new Uint8Array(d), new Uint8Array([h & 255, h >> 8 & 255, h >> 16 & 255, h >> 24 & 255])];
                        d = "";
                        for (b in e) e.hasOwnProperty(b) && (d +=
                            String.fromCharCode.apply(null, e[b]));
                        l("<</Length " + d.length + " /Filter [/FlateDecode]>>")
                    } else l("<</Length " + d.length + ">>");
                    Q(d);
                    l("endobj")
                }
                H[1] = j;
                l("1 0 obj");
                l("<</Type /Pages");
                R = "/Kids [";
                for (b = 0; b < c; b++) R += 3 + 2 * b + " 0 R ";
                l(R + "]");
                l("/Count " + c);
                l("/MediaBox [0 0 " + v(J) + " " + v(ca) + "]");
                l(">>");
                l("endobj");
                for (var g in n) n.hasOwnProperty(g) && (a = n[g], a.objectNumber = N(), l("<</BaseFont/" + a.PostScriptName + "/Type/Font"), "string" === typeof a.encoding && l("/Encoding/" + a.encoding), l("/Subtype/Type1>>"),
                    l("endobj"));
                G.publish("putResources");
                H[2] = j;
                l("2 0 obj");
                l("<<");
                l("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]");
                l("/Font <<");
                for (var f in n) n.hasOwnProperty(f) && l("/" + f + " " + n[f].objectNumber + " 0 R");
                l(">>");
                l("/XObject <<");
                G.publish("putXobjectDict");
                l(">>");
                l(">>");
                l("endobj");
                G.publish("postPutResources");
                N();
                l("<<");
                l("/Producer (jsPDF 20120619)");
                I.title && l("/Title (" + t(I.title) + ")");
                I.subject && l("/Subject (" + t(I.subject) + ")");
                I.author && l("/Author (" + t(I.author) + ")");
                I.keywords && l("/Keywords (" +
                    t(I.keywords) + ")");
                I.creator && l("/Creator (" + t(I.creator) + ")");
                g = new Date;
                l("/CreationDate (D:" + [g.getFullYear(), V(g.getMonth() + 1), V(g.getDate()), V(g.getHours()), V(g.getMinutes()), V(g.getSeconds())].join("") + ")");
                l(">>");
                l("endobj");
                N();
                l("<<");
                l("/Type /Catalog");
                l("/Pages 1 0 R");
                l("/OpenAction [3 0 R /FitH null]");
                l("/PageLayout /OneColumn");
                G.publish("putCatalog");
                l(">>");
                l("endobj");
                g = j;
                l("xref");
                l("0 " + (C + 1));
                l("0000000000 65535 f ");
                for (f = 1; f <= C; f++) a = H[f].toFixed(0), a = 10 > a.length ? Array(11 -
                    a.length).join("0") + a : a, l(a + " 00000 n ");
                l("trailer");
                l("<<");
                l("/Size " + (C + 1));
                l("/Root " + C + " 0 R");
                l("/Info " + (C - 1) + " 0 R");
                l(">>");
                l("startxref");
                l(g);
                l("%%EOF");
                F = !0;
                return p.join("\n")
            },
            Y = function (c) {
                var a = "S";
                if ("F" === c) a = "f";
                else if ("FD" === c || "DF" === c) a = "B";
                return a
            },
            Z = function (c, a) {
                var d, e, b, j;
                switch (c) {
                    case void 0:
                        return K();
                    case "save":
                        if (navigator.getUserMedia && (void 0 === window.URL || void 0 === window.URL.createObjectURL)) return D.output("dataurlnewwindow");
                        d = K();
                        e = d.length;
                        b = new Uint8Array(new ArrayBuffer(e));
                        for (j = 0; j < e; j++) b[j] = d.charCodeAt(j);
                        d = new Blob([b], {
                            type: "application/pdf"
                        });
                        saveAs(d, a);
                        break;
                    case "datauristring":
                    case "dataurlstring":
                        return "data:application/pdf;base64," + btoa(K());
                    case "datauri":
                    case "dataurl":
                        document.location.href = "data:application/pdf;base64," + btoa(K());
                        break;
                    case "dataurlnewwindow":
                        window.open("data:application/pdf;base64," + btoa(K()));
                        break;
                    default:
                        throw Error('Output type "' + c + '" is not supported.');
                }
            };
        if ("pt" === d) r = 1;
        else if ("mm" === d) r = 72 / 25.4;
        else if ("cm" === d) r = 72 / 2.54;
        else if ("in" === d) r = 72;
        else throw "Invalid unit: " + d;
        if (h.hasOwnProperty(a)) y = h[a][1] / r, s = h[a][0] / r;
        else try {
            y = e[1], s = e[0]
        } catch (M) {
            throw "Invalid format: " + e;
        }
        if ("p" === g || "portrait" === g) g = "p", s > y && (g = s, s = y, y = g);
        else if ("l" === g || "landscape" === g) g = "l", y > s && (g = s, s = y, y = g);
        else throw "Invalid orientation: " + g;
        D.internal = {
            pdfEscape: t,
            getStyle: Y,
            getFont: function () {
                return n[E.apply(D, arguments)]
            },
            getFontSize: function () {
                return z
            },
            btoa: btoa,
            write: function (c, a, d, e) {
                l(1 === arguments.length ? c : Array.prototype.join.call(arguments,
                    " "))
            },
            getCoordinateString: function (c) {
                return v(c * r)
            },
            getVerticalCoordinateString: function (c) {
                return v((y - c) * r)
            },
            collections: {},
            newObject: N,
            putStream: Q,
            events: G,
            scaleFactor: r,
            pageSize: {
                width: s,
                height: y
            },
            output: function (c, a) {
                return Z(c, a)
            }
        };
        D.addPage = function () {
            W();
            return this
        };
        D.text = function (c, a, d, e) {
            var b, j;
            "number" === typeof c && (b = c, j = a, c = d, a = b, d = j);
            "string" === typeof c && c.match(/[\n\r]/) && (c = c.split(/\r\n|\r|\n/g));
            "undefined" === typeof e ? e = {
                noBOM: !0,
                autoencode: !0
            } : (void 0 === e.noBOM && (e.noBOM = !0),
                void 0 === e.autoencode && (e.autoencode = !0));
            if ("string" === typeof c) e = t(c, e);
            else if (c instanceof Array) {
                c = c.concat();
                for (b = c.length - 1; - 1 !== b; b--) c[b] = t(c[b], e);
                e = c.join(") Tj\nT* (")
            } else throw Error('Type of text must be string or Array. "' + c + '" is not recognized.');
            l("BT\n/" + A + " " + z + " Tf\n" + z + " TL\n" + u + "\n" + v(a * r) + " " + v((y - d) * r) + " Td\n(" + e + ") Tj\nET");
            return this
        };
        D.line = function (c, a, d, e) {
            l(v(c * r) + " " + v((y - a) * r) + " m " + v(d * r) + " " + v((y - e) * r) + " l S");
            return this
        };
        D.lines = function (c, a, d, e, b) {
            var j, g,
                h, p, m, f, q, u;
            "number" === typeof c && (j = c, g = a, c = d, a = j, d = g);
            b = Y(b);
            e = void 0 === e ? [1, 1] : e;
            l((a * r).toFixed(3) + " " + ((y - d) * r).toFixed(3) + " m ");
            j = e[0];
            e = e[1];
            g = c.length;
            u = d;
            for (d = 0; d < g; d++) h = c[d], 2 === h.length ? (a = h[0] * j + a, u = h[1] * e + u, l((a * r).toFixed(3) + " " + ((y - u) * r).toFixed(3) + " l")) : (p = h[0] * j + a, m = h[1] * e + u, f = h[2] * j + a, q = h[3] * e + u, a = h[4] * j + a, u = h[5] * e + u, l((p * r).toFixed(3) + " " + ((y - m) * r).toFixed(3) + " " + (f * r).toFixed(3) + " " + ((y - q) * r).toFixed(3) + " " + (a * r).toFixed(3) + " " + ((y - u) * r).toFixed(3) + " c"));
            l(b);
            return this
        };
        D.rect = function (c, a, d, e, b) {
            b = Y(b);
            l([v(c * r), v((y - a) * r), v(d * r), v(-e * r), "re", b].join(" "));
            return this
        };
        D.triangle = function (c, a, d, e, b, j, h) {
            this.lines([[d - c, e - a], [b - d, j - e], [c - b, a - j]], c, a, [1, 1], h);
            return this
        };
        D.roundedRect = function (c, a, d, e, b, j, h) {
            var g = 4 / 3 * (Math.SQRT2 - 1);
            this.lines([[d - 2 * b, 0], [b * g, 0, b, j - j * g, b, j], [0, e - 2 * j], [0, j * g, -(b * g), j, -b, j], [-d + 2 * b, 0], [-(b * g), 0, -b, -(j * g), -b, -j], [0, -e + 2 * j], [0, -(j * g), b * g, -j, b, -j]], c + b, a, [1, 1], h);
            return this
        };
        D.ellipse = function (c, a, d, e, b) {
            b = Y(b);
            var j = 4 / 3 * (Math.SQRT2 -
                    1) * d,
                g = 4 / 3 * (Math.SQRT2 - 1) * e;
            l([v((c + d) * r), v((y - a) * r), "m", v((c + d) * r), v((y - (a - g)) * r), v((c + j) * r), v((y - (a - e)) * r), v(c * r), v((y - (a - e)) * r), "c"].join(" "));
            l([v((c - j) * r), v((y - (a - e)) * r), v((c - d) * r), v((y - (a - g)) * r), v((c - d) * r), v((y - a) * r), "c"].join(" "));
            l([v((c - d) * r), v((y - (a + g)) * r), v((c - j) * r), v((y - (a + e)) * r), v(c * r), v((y - (a + e)) * r), "c"].join(" "));
            l([v((c + j) * r), v((y - (a + e)) * r), v((c + d) * r), v((y - (a + g)) * r), v((c + d) * r), v((y - a) * r), "c", b].join(" "));
            return this
        };
        D.circle = function (c, a, d, e) {
            return this.ellipse(c, a, d, d, e)
        };
        D.setProperties =
            function (c) {
                for (var a in I) I.hasOwnProperty(a) && c[a] && (I[a] = c[a]);
                return this
            };
        D.setFontSize = function (c) {
            z = c;
            return this
        };
        D.setFont = function (c, a) {
            A = E(c, a);
            return this
        };
        D.setFontStyle = D.setFontType = function (c) {
            A = E(void 0, c);
            return this
        };
        D.getFontList = function () {
            var c = {},
                a, d, e;
            for (a in x)
                if (x.hasOwnProperty(a))
                    for (d in c[a] = e = [], x[a]) x[a].hasOwnProperty(d) && e.push(d);
            return c
        };
        D.setLineWidth = function (c) {
            l((c * r).toFixed(2) + " w");
            return this
        };
        D.setDrawColor = function (c, a, d, e) {
            c = void 0 === a || void 0 === e &&
                c === a === d ? "string" === typeof c ? c + " G" : v(c / 255) + " G" : void 0 === e ? "string" === typeof c ? [c, a, d, "RG"].join(" ") : [v(c / 255), v(a / 255), v(d / 255), "RG"].join(" ") : "string" === typeof c ? [c, a, d, e, "K"].join(" ") : [v(c), v(a), v(d), v(e), "K"].join(" ");
            l(c);
            return this
        };
        D.setFillColor = function (c, a, d, e) {
            c = void 0 === a || void 0 === e && c === a === d ? "string" === typeof c ? c + " g" : v(c / 255) + " g" : void 0 === e ? "string" === typeof c ? [c, a, d, "rg"].join(" ") : [v(c / 255), v(a / 255), v(d / 255), "rg"].join(" ") : "string" === typeof c ? [c, a, d, e, "k"].join(" ") : [v(c),
v(a), v(d), v(e), "k"].join(" ");
            l(c);
            return this
        };
        D.setTextColor = function (c, a, d) {
            u = 0 === c && 0 === a && 0 === d || "undefined" === typeof a ? (c / 255).toFixed(3) + " g" : [(c / 255).toFixed(3), (a / 255).toFixed(3), (d / 255).toFixed(3), "rg"].join(" ");
            return this
        };
        D.CapJoinStyles = {
            "0": 0,
            butt: 0,
            but: 0,
            bevel: 0,
            1: 1,
            round: 1,
            rounded: 1,
            circle: 1,
            2: 2,
            projecting: 2,
            project: 2,
            square: 2,
            milter: 2
        };
        D.setLineCap = function (c) {
            var a = this.CapJoinStyles[c];
            if (void 0 === a) throw Error("Line cap style of '" + c + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
            w = a;
            l(a.toString(10) + " J");
            return this
        };
        D.setLineJoin = function (c) {
            var a = this.CapJoinStyles[c];
            if (void 0 === a) throw Error("Line join style of '" + c + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
            aa = a;
            l(a.toString(10) + " j");
            return this
        };
        D.output = Z;
        D.save = function (c) {
            D.output("save", c)
        };
        for (B in f.API)
            if (f.API.hasOwnProperty(B))
                if ("events" === B && f.API.events.length) {
                    g = G;
                    d = f.API.events;
                    h = a = e = void 0;
                    for (h = d.length - 1; - 1 !== h; h--) e = d[h][0], a = d[h][1], g.subscribe.apply(g, [e].concat("function" ===
                        typeof a ? [a] : a))
                } else D[B] = f.API[B];
        B = [["Helvetica", "helvetica", "normal"], ["Helvetica-Bold", "helvetica", "bold"], ["Helvetica-Oblique", "helvetica", "italic"], ["Helvetica-BoldOblique", "helvetica", "bolditalic"], ["Courier", "courier", "normal"], ["Courier-Bold", "courier", "bold"], ["Courier-Oblique", "courier", "italic"], ["Courier-BoldOblique", "courier", "bolditalic"], ["Times-Roman", "times", "normal"], ["Times-Bold", "times", "bold"], ["Times-Italic", "times", "italic"], ["Times-BoldItalic", "times", "bolditalic"]];
        g = 0;
        for (d = B.length; g < d; g++) {
            h = B[g][0];
            var T = B[g][1],
                a = B[g][2];
            e = "F" + (b(n) + 1).toString(10);
            h = n[e] = {
                id: e,
                PostScriptName: h,
                fontName: T,
                fontStyle: a,
                encoding: "StandardEncoding",
                metadata: {}
            };
            var ha = e;
            void 0 === x[T] && (x[T] = {});
            x[T][a] = ha;
            G.publish("addFont", h);
            a = e;
            e = B[g][0].split("-");
            h = e[0];
            e = e[1] || "";
            void 0 === x[h] && (x[h] = {});
            x[h][e] = a
        }
        G.publish("addFonts", {
            fonts: n,
            dictionary: x
        });
        A = "F1";
        W();
        G.publish("initialized");
        return D
    }
    "undefined" === typeof btoa && (window.btoa = function (b) {
        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""),
            e, h, a, p, j = 0,
            m = 0,
            f = "",
            f = [];
        do e = b.charCodeAt(j++), h = b.charCodeAt(j++), a = b.charCodeAt(j++), p = e << 16 | h << 8 | a, e = p >> 18 & 63, h = p >> 12 & 63, a = p >> 6 & 63, p &= 63, f[m++] = d[e] + d[h] + d[a] + d[p]; while (j < b.length);
        f = f.join("");
        b = b.length % 3;
        return (b ? f.slice(0, b - 3) : f) + "===".slice(b || 3)
    });
    "undefined" === typeof atob && (window.atob = function (b) {
        var d, e, h, a, p, j = 0,
            m = 0;
        a = "";
        var f = [];
        if (!b) return b;
        b += "";
        do d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(j++)), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(j++)),
            a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(j++)), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(b.charAt(j++)), h = d << 18 | e << 12 | a << 6 | p, d = h >> 16 & 255, e = h >> 8 & 255, h &= 255, 64 === a ? f[m++] = String.fromCharCode(d) : 64 === p ? f[m++] = String.fromCharCode(d, e) : f[m++] = String.fromCharCode(d, e, h); while (j < b.length);
        return a = f.join("")
    });
    var b = "function" === typeof Object.keys ? function (b) {
            return Object.keys(b).length
        } : function (b) {
            var d = 0,
                e;
            for (e in b) b.hasOwnProperty(e) &&
                d++;
            return d
        },
        k = function (b) {
            this.topics = {};
            this.context = b;
            this.publish = function (d, b) {
                if (this.topics[d]) {
                    var h = this.topics[d],
                        a = [],
                        p, j, g, f, c = function () {};
                    b = Array.prototype.slice.call(arguments, 1);
                    j = 0;
                    for (g = h.length; j < g; j++) f = h[j], p = f[0], f[1] && (f[0] = c, a.push(j)), p.apply(this.context, b);
                    j = 0;
                    for (g = a.length; j < g; j++) h.splice(a[j], 1)
                }
            };
            this.subscribe = function (d, b, h) {
                this.topics[d] ? this.topics[d].push([b, h]) : this.topics[d] = [[b, h]];
                return {
                    topic: d,
                    callback: b
                }
            };
            this.unsubscribe = function (d) {
                if (this.topics[d.topic]) {
                    var b =
                        this.topics[d.topic],
                        h, a;
                    h = 0;
                    for (a = b.length; h < a; h++) b[h][0] === d.callback && b.splice(h, 1)
                }
            }
        };
    f.API = {
        events: []
    };
    return f
}();
(function (f) {
    var b = function () {
            var b = this.internal.collections.addImage_images,
                d;
            for (d in b) {
                var e = b[d],
                    h = this.internal.newObject(),
                    a = this.internal.write,
                    p = this.internal.putStream;
                e.n = h;
                a("<</Type /XObject");
                a("/Subtype /Image");
                a("/Width " + e.w);
                a("/Height " + e.h);
                "Indexed" === e.cs ? a("/ColorSpace [/Indexed /DeviceRGB " + (e.pal.length / 3 - 1) + " " + (h + 1) + " 0 R]") : (a("/ColorSpace /" + e.cs), "DeviceCMYK" === e.cs && a("/Decode [1 0 1 0 1 0 1 0]"));
                a("/BitsPerComponent " + e.bpc);
                "f" in e && a("/Filter /" + e.f);
                "dp" in e &&
                    a("/DecodeParms <<" + e.dp + ">>");
                if ("trns" in e && e.trns.constructor == Array)
                    for (var j = "", f = 0; f < e.trns.length; f++) j += e[j][f] + " " + e.trns[f] + " ", a("/Mask [" + j + "]");
                "smask" in e && a("/SMask " + (h + 1) + " 0 R");
                a("/Length " + e.data.length + ">>");
                p(e.data);
                a("endobj")
            }
        },
        k = function () {
            var b = this.internal.collections.addImage_images,
                d = this.internal.write,
                e, h;
            for (h in b) e = b[h], d("/I" + e.i, e.n, "0", "R")
        };
    f.addImage = function (g, d, e, h, a, p) {
        if ("object" === typeof g && 1 === g.nodeType) {
            d = document.createElement("canvas");
            d.width = g.clientWidth;
            d.height = g.clientHeight;
            var j = d.getContext("2d");
            if (!j) throw "addImage requires canvas to be supported by browser.";
            j.drawImage(g, 0, 0, d.width, d.height);
            g = d.toDataURL("images/jpeg");
            d = "JPEG"
        }
        if ("JPEG" !== d.toUpperCase()) throw Error("addImage currently only supports format 'JPEG', not '" + d + "'");
        var f;
        d = this.internal.collections.addImage_images;
        var j = this.internal.getCoordinateString,
            u = this.internal.getVerticalCoordinateString;
        "data:images/jpeg;base64," === g.substring(0, 23) && (g = atob(g.replace("data:image/jpeg;base64,",
            "")));
        if (d)
            if (Object.keys) f = Object.keys(d).length;
            else {
                var c = d,
                    q = 0;
                for (f in c) c.hasOwnProperty(f) && q++;
                f = q
            }
        else f = 0, this.internal.collections.addImage_images = d = {}, this.internal.events.subscribe("putResources", b), this.internal.events.subscribe("putXobjectDict", k);
        a: {
            var c = g,
                C;
            if (255 === !c.charCodeAt(0) || 216 === !c.charCodeAt(1) || 255 === !c.charCodeAt(2) || 224 === !c.charCodeAt(3) || 74 === !c.charCodeAt(6) || 70 === !c.charCodeAt(7) || 73 === !c.charCodeAt(8) || 70 === !c.charCodeAt(9) || 0 === !c.charCodeAt(10)) throw Error("getJpegSize requires a binary jpeg file");
            C = 256 * c.charCodeAt(4) + c.charCodeAt(5);
            for (var q = 4, F = c.length; q < F;) {
                q += C;
                if (255 !== c.charCodeAt(q)) throw Error("getJpegSize could not find the size of the images");
                if (192 === c.charCodeAt(q + 1)) {
                    C = 256 * c.charCodeAt(q + 5) + c.charCodeAt(q + 6);
                    c = 256 * c.charCodeAt(q + 7) + c.charCodeAt(q + 8);
                    c = [c, C];
                    break a
                } else q += 2, C = 256 * c.charCodeAt(q) + c.charCodeAt(q + 1)
            }
            c = void 0
        }
        g = {
            w: c[0],
            h: c[1],
            cs: "DeviceRGB",
            bpc: 8,
            f: "DCTDecode",
            i: f,
            data: g
        };
        d[f] = g;
        !a && !p && (p = a = -96);
        0 > a && (a = -72 * g.w / a / this.internal.scaleFactor);
        0 > p && (p = -72 * g.h / p / this.internal.scaleFactor);
        0 === a && (a = p * g.w / g.h);
        0 === p && (p = a * g.h / g.w);
        this.internal.write("q", j(a), "0 0", j(p), j(e), u(h + p), "cm /I" + g.i, "Do Q");
        return this
    }
})(jsPDF.API);
(function (f) {
    function b(a, b, d, e) {
        this.pdf = a;
        this.x = b;
        this.y = d;
        this.settings = e;
        this.init();
        return this
    }

    function k(b) {
        var d = a[b];
        if (d) return d;
        d = {
            "xx-small": 9,
            "x-small": 11,
            small: 13,
            medium: 16,
            large: 19,
            "x-large": 23,
            "xx-large": 28,
            auto: 0
        } [b];
        if (void 0 !== d || (d = parseFloat(b))) return a[b] = d / 16;
        d = b.match(/([\d\.]+)(px)/);
        return 3 === d.length ? a[b] = parseFloat(d[1]) / 16 : a[b] = 1
    }

    function g(a, b, f) {
        var u = a.childNodes,
            c;
        c = $(a);
        a = {};
        for (var q, C = c.css("font-family").split(","), F = C.shift(); !q && F;) q = d[F.trim().toLowerCase()],
            F = C.shift();
        a["font-family"] = q || "times";
        a["font-style"] = h[c.css("font-style")] || "normal";
        q = e[c.css("font-weight")] || "normal";
        "bold" === q && (a["font-style"] = "normal" === a["font-style"] ? q : q + a["font-style"]);
        a["font-size"] = k(c.css("font-size")) || 1;
        a["line-height"] = k(c.css("line-height")) || 1;
        a.display = "inline" === c.css("display") ? "inline" : "block";
        "block" === a.display && (a["margin-top"] = k(c.css("margin-top")) || 0, a["margin-bottom"] = k(c.css("margin-bottom")) || 0, a["padding-top"] = k(c.css("padding-top")) || 0, a["padding-bottom"] =
            k(c.css("padding-bottom")) || 0);
        if (q = "block" === a.display) b.setBlockBoundary(), b.setBlockStyle(a);
        C = 0;
        for (F = u.length; C < F; C++)
            if (c = u[C], "object" === typeof c)
                if (1 === c.nodeType && "SCRIPT" != c.nodeName) {
                    var H = c,
                        n = b,
                        x = f,
                        z = !1,
                        A = void 0,
                        y = void 0,
                        s = x["#" + H.id];
                    if (s)
                        if ("function" === typeof s) z = s(H, n);
                        else {
                            A = 0;
                            for (y = s.length; !z && A !== y;) z = s[A](H, n), A++
                        } s = x[H.nodeName];
                    if (!z && s)
                        if ("function" === typeof s) z = s(H, n);
                        else {
                            A = 0;
                            for (y = s.length; !z && A !== y;) z = s[A](H, n), A++
                        } z || g(c, b, f)
                } else 3 === c.nodeType && b.addText(c.nodeValue,
                    a);
        else "string" === typeof c && b.addText(c, a);
        q && b.setBlockBoundary()
    }
    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    });
    String.prototype.trimLeft || (String.prototype.trimLeft = function () {
        return this.replace(/^\s+/g, "")
    });
    String.prototype.trimRight || (String.prototype.trimRight = function () {
        return this.replace(/\s+$/g, "")
    });
    b.prototype.init = function () {
        this.paragraph = {
            text: [],
            style: []
        };
        this.pdf.internal.write("q")
    };
    b.prototype.dispose = function () {
        this.pdf.internal.write("Q");
        return {
            x: this.x,
            y: this.y
        }
    };
    b.prototype.splitFragmentsIntoLines = function (a, b) {
        for (var d = this.pdf.internal.scaleFactor, e = {}, c, h, g, f, k, n = [], x = [n], z = 0, A = this.settings.width; a.length;)
            if (f = a.shift(), k = b.shift(), f)
                if (c = k["font-family"], h = k["font-style"], g = e[c + h], g || (g = this.pdf.internal.getFont(c, h).metadata.Unicode, e[c + h] = g), c = {
                        widths: g.widths,
                        kerning: g.kerning,
                        fontSize: 12 * k["font-size"],
                        textIndent: z
                    }, h = this.pdf.getStringUnitWidth(f, c) * c.fontSize / d, z + h > A) {
                    f = this.pdf.splitTextToSize(f, A, c);
                    for (n.push([f.shift(),
k]); f.length;) n = [[f.shift(), k]], x.push(n);
                    z = this.pdf.getStringUnitWidth(n[0][0], c) * c.fontSize / d
                } else n.push([f, k]), z += h;
        return x
    };
    b.prototype.RenderTextFragment = function (a, b) {
        var d = this.pdf.internal.getFont(b["font-family"], b["font-style"]);
        this.pdf.internal.write("/" + d.id, (12 * b["font-size"]).toFixed(2), "Tf", "(" + this.pdf.internal.pdfEscape(a) + ") Tj")
    };
    b.prototype.renderParagraph = function () {
        for (var a = this.paragraph.text, b = 0, d = a.length, e, c = !1, h = !1; !c && b !== d;)(e = a[b] = a[b].trimLeft()) && (c = !0), b++;
        for (b =
            d - 1; d && !h && -1 !== b;)(e = a[b] = a[b].trimRight()) && (h = !0), b--;
        c = /\s+$/g;
        h = !0;
        for (b = 0; b !== d; b++) e = a[b].replace(/\s+/g, " "), h && (e = e.trimLeft()), e && (h = c.test(e)), a[b] = e;
        b = this.paragraph.style;
        e = (d = this.paragraph.blockstyle) || {};
        this.paragraph = {
            text: [],
            style: [],
            blockstyle: {},
            priorblockstyle: d
        };
        if (a.join("").trim()) {
            a = this.splitFragmentsIntoLines(a, b);
            b = 12 / this.pdf.internal.scaleFactor;
            c = (Math.max((d["margin-top"] || 0) - (e["margin-bottom"] || 0), 0) + (d["padding-top"] || 0)) * b;
            d = ((d["margin-bottom"] || 0) + (d["padding-bottom"] ||
                0)) * b;
            e = this.pdf.internal.write;
            var g, f;
            this.y += c;
            for (e("q", "BT", this.pdf.internal.getCoordinateString(this.x), this.pdf.internal.getVerticalCoordinateString(this.y), "Td"); a.length;) {
                c = a.shift();
                g = h = 0;
                for (f = c.length; g !== f; g++) c[g][0].trim() && (h = Math.max(h, c[g][1]["line-height"], c[g][1]["font-size"]));
                e(0, (-12 * h).toFixed(2), "Td");
                g = 0;
                for (f = c.length; g !== f; g++) c[g][0] && this.RenderTextFragment(c[g][0], c[g][1]);
                this.y += h * b
            }
            e("ET", "Q");
            this.y += d
        }
    };
    b.prototype.setBlockBoundary = function () {
        this.renderParagraph()
    };
    b.prototype.setBlockStyle = function (a) {
        this.paragraph.blockstyle = a
    };
    b.prototype.addText = function (a, b) {
        this.paragraph.text.push(a);
        this.paragraph.style.push(b)
    };
    var d = {
            helvetica: "helvetica",
            "sans-serif": "helvetica",
            serif: "times",
            times: "times",
            "times new roman": "times",
            monospace: "courier",
            courier: "courier"
        },
        e = {
            100: "normal",
            200: "normal",
            300: "normal",
            400: "normal",
            500: "bold",
            600: "bold",
            700: "bold",
            800: "bold",
            900: "bold",
            normal: "normal",
            bold: "bold",
            bolder: "bold",
            lighter: "normal"
        },
        h = {
            normal: "normal",
            italic: "italic",
            oblique: "italic"
        },
        a = {
            normal: 1
        };
    f.fromHTML = function (a, d, e, h) {
        if ("string" === typeof a) {
            var c = "jsPDFhtmlText" + Date.now().toString() + (1E3 * Math.random()).toFixed(0);
            $('<div style="position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;"><iframe style="height:1px;width:1px" name="' + c + '" /></div>').appendTo(document.body);
            a = $(window.frames[c].document.body).html(a)[0]
        }
        d =
            new b(this, d, e, h);
        g(a, d, h.elementHandlers);
        return d.dispose()
    }
})(jsPDF.API);
(function (f) {
    f.addSVG = function (b, f, g, d, e) {
        if (void 0 === f || void 0 === f) throw Error("addSVG needs values for 'x' and 'y'");
        var h = document.createElement("iframe"),
            a = document.createElement("style");
        a.type = "text/css";
        a.styleSheet ? a.styleSheet.cssText = ".jsPDF_sillysvg_iframe {display:none;position:absolute;}" : a.appendChild(document.createTextNode(".jsPDF_sillysvg_iframe {display:none;position:absolute;}"));
        document.getElementsByTagName("head")[0].appendChild(a);
        h.name = "childframe";
        h.setAttribute("width",
            0);
        h.setAttribute("height", 0);
        h.setAttribute("frameborder", "0");
        h.setAttribute("scrolling", "no");
        h.setAttribute("seamless", "seamless");
        h.setAttribute("class", "jsPDF_sillysvg_iframe");
        document.body.appendChild(h);
        h = (h.contentWindow || h.contentDocument).document;
        h.write(b);
        h.close();
        h = h.getElementsByTagName("svg")[0];
        b = [1, 1];
        var a = parseFloat(h.getAttribute("width")),
            p = parseFloat(h.getAttribute("height"));
        a && p && (d && e ? b = [d / a, e / p] : d ? b = [d / a, d / a] : e && (b = [e / p, e / p]));
        h = h.childNodes;
        d = 0;
        for (e = h.length; d < e; d++)
            if (a =
                h[d], a.tagName && "PATH" === a.tagName.toUpperCase()) {
                for (var a = a.getAttribute("d").split(" "), p = parseFloat(a[1]), j = parseFloat(a[2]), m = [], u = 3, c = a.length; u < c;) "c" === a[u] ? (m.push([parseFloat(a[u + 1]), parseFloat(a[u + 2]), parseFloat(a[u + 3]), parseFloat(a[u + 4]), parseFloat(a[u + 5]), parseFloat(a[u + 6])]), u += 7) : "l" === a[u] ? (m.push([parseFloat(a[u + 1]), parseFloat(a[u + 2])]), u += 3) : u += 1;
                a = [p, j, m];
                a[0] = a[0] * b[0] + f;
                a[1] = a[1] * b[1] + g;
                this.lines.call(this, a[2], a[0], a[1], b)
            } return this
    }
})(jsPDF.API);
(function (f) {
    var b = f.getCharWidthsArray = function (b, e) {
            e || (e = {});
            var h = e.widths ? e.widths : this.internal.getFont().metadata.Unicode.widths,
                a = h.fof ? h.fof : 1,
                g = e.kerning ? e.kerning : this.internal.getFont().metadata.Unicode.kerning,
                f = g.fof ? g.fof : 1,
                m, k, c, q = 0,
                C = h[0] || a,
                F = [];
            m = 0;
            for (k = b.length; m < k; m++) c = b.charCodeAt(m), F.push((h[c] || C) / a + (g[c] && g[c][q] || 0) / f), q = c;
            return F
        },
        k = function (b) {
            for (var e = b.length, h = 0; e;) e--, h += b[e];
            return h
        };
    f.getStringUnitWidth = function (d, e) {
        return k(b.call(this, d, e))
    };
    var g = function (d,
        e, h) {
        h || (h = {});
        var a = b(" ", h)[0],
            g = d.split(" "),
            f = [];
        d = [f];
        var m = h.textIndent || 0,
            u = 0,
            c = 0,
            q, C, F, H;
        F = 0;
        for (H = g.length; F < H; F++) {
            q = g[F];
            C = b(q, h);
            c = k(C);
            if (m + u + c > e) {
                if (c > e) {
                    for (var c = q, n = C, x = e, z = [], A = 0, y = c.length, s = 0; A !== y && s + n[A] < e - (m + u);) s += n[A], A++;
                    z.push(c.slice(0, A));
                    m = A;
                    for (s = 0; A !== y;) s + n[A] > x && (z.push(c.slice(m, A)), s = 0, m = A), s += n[A], A++;
                    m !== A && z.push(c.slice(m, A));
                    m = z;
                    f.push(m.shift());
                    for (f = [m.pop()]; m.length;) d.push([m.shift()]);
                    c = k(C.slice(q.length - f[0].length))
                } else f = [q];
                d.push(f);
                m = c
            } else f.push(q),
                m += u + c;
            u = a
        }
        e = [];
        F = 0;
        for (H = d.length; F < H; F++) e.push(d[F].join(" "));
        return e
    };
    f.splitTextToSize = function (b, e, h) {
        h || (h = {});
        var a = h.fontSize || this.internal.getFontSize(),
            f;
        var j = h;
        f = {
            "0": 1
        };
        var m = {};
        !j.widths || !j.kerning ? (j = this.internal.getFont(j.fontName, j.fontStyle), f = j.metadata.Unicode ? {
            widths: j.metadata.Unicode.widths || f,
            kerning: j.metadata.Unicode.kerning || m
        } : {
            widths: f,
            kerning: m
        }) : f = {
            widths: j.widths,
            kerning: j.kerning
        };
        b = b.match(/[\n\r]/) ? b.split(/\r\n|\r|\n/g) : [b];
        e = 1 * this.internal.scaleFactor * e /
            a;
        f.textIndent = h.textIndent ? 1 * h.textIndent * this.internal.scaleFactor / a : 0;
        m = [];
        h = 0;
        for (a = b.length; h < a; h++) m = m.concat(g(b[h], e, f));
        return m
    }
})(jsPDF.API);
(function (f) {
    var b = function (b) {
            for (var d = {}, a = 0; 16 > a; a++) d["klmnopqrstuvwxyz" [a]] = "0123456789abcdef" [a];
            for (var g = {}, f = 1, m, k = g, c = [], q, C = "", F = "", H, n = b.length - 1, a = 1; a != n;) q = b[a], a += 1, "'" == q ? m ? (H = m.join(""), m = void 0) : m = [] : m ? m.push(q) : "{" == q ? (c.push([k, H]), k = {}, H = void 0) : "}" == q ? (q = c.pop(), q[0][q[1]] = k, H = void 0, k = q[0]) : "-" == q ? f = -1 : void 0 === H ? d.hasOwnProperty(q) ? (C += d[q], H = parseInt(C, 16) * f, f = 1, C = "") : C += q : d.hasOwnProperty(q) ? (F += d[q], k[H] = parseInt(F, 16) * f, f = 1, H = void 0, F = "") : F += q;
            return g
        },
        k = {
            codePages: ["WinAnsiEncoding"],
            WinAnsiEncoding: b("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")
        },
        g = {
            Unicode: {
                Courier: k,
                "Courier-Bold": k,
                "Courier-BoldOblique": k,
                "Courier-Oblique": k,
                Helvetica: k,
                "Helvetica-Bold": k,
                "Helvetica-BoldOblique": k,
                "Helvetica-Oblique": k,
                "Times-Roman": k,
                "Times-Bold": k,
                "Times-BoldItalic": k,
                "Times-Italic": k
            }
        },
        d = {
            Unicode: {
                "Courier-Oblique": b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Times-BoldItalic": b("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),
                "Helvetica-Bold": b("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
                Courier: b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Courier-BoldOblique": b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Times-Bold": b("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),
                Helvetica: b("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),
                "Helvetica-BoldOblique": b("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),
                "Courier-Bold": b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),
                "Times-Italic": b("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),
                "Times-Roman": b("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),
                "Helvetica-Oblique": b("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")
            }
        };
    f.events.push(["addFonts", function (b) {
        var h, a, f, j;
        for (a in b.fonts)
            if (b.fonts.hasOwnProperty(a)) {
                h = b.fonts[a];
                if (f = d.Unicode[h.PostScriptName]) j = h.metadata.Unicode ? h.metadata.Unicode : h.metadata.Unicode = {}, j.widths = f.widths, j.kerning = f.kerning;
                if (f = g.Unicode[h.PostScriptName]) j = h.metadata.Unicode ? h.metadata.Unicode : h.metadata.Unicode = {}, j.encoding = f, f.codePages && f.codePages.length && (h.encoding = f.codePages[0])
            }
    }])
})(jsPDF.API);
var BlobBuilder = BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder || function (f) {
        var b = function (a) {
                return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]
            },
            k = function () {
                this.data = []
            },
            g = function (a, b, c) {
                this.data = a;
                this.size = a.length;
                this.type = b;
                this.encoding = c
            },
            d = k.prototype,
            e = g.prototype,
            h = f.FileReaderSync,
            a = function (a) {
                this.code = this[this.name = a]
            },
            p = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),
            j = p.length,
            m = f.URL || f.webkitURL || f,
            u = m.createObjectURL,
            c = m.revokeObjectURL,
            q = m,
            C = f.btoa,
            F = f.atob,
            H = !1,
            n = function (a) {
                H = !a
            },
            x = f.ArrayBuffer,
            z = f.Uint8Array;
        for (k.fake = e.fake = !0; j--;) a.prototype[p[j]] = j + 1;
        try {
            z && n.apply(0, new z(1))
        } catch (A) {}
        m.createObjectURL || (q = f.URL = {});
        q.createObjectURL = function (a) {
            var b = a.type;
            null === b && (b = "application/octet-stream");
            if (a instanceof g) return b = "data:" + b, "base64" === a.encoding ? b + ";base64," + a.data : "URI" === a.encoding ? b + "," + decodeURIComponent(a.data) : C ? b + ";base64," + C(a.data) :
                b + "," + encodeURIComponent(a.data);
            if (u) return u.call(m, a)
        };
        q.revokeObjectURL = function (a) {
            "data:" !== a.substring(0, 5) && c && c.call(m, a)
        };
        d.append = function (c) {
            var d = this.data;
            if (z && c instanceof x)
                if (H) d.push(String.fromCharCode.apply(String, new z(c)));
                else {
                    d = "";
                    c = new z(c);
                    for (var e = 0, f = c.length; e < f; e++) d += String.fromCharCode(c[e])
                }
            else if ("Blob" === b(c) || "File" === b(c))
                if (h) e = new h, d.push(e.readAsBinaryString(c));
                else throw new a("NOT_READABLE_ERR");
            else c instanceof g ? "base64" === c.encoding && F ? d.push(F(c.data)) :
                "URI" === c.encoding ? d.push(decodeURIComponent(c.data)) : "raw" === c.encoding && d.push(c.data) : ("string" !== typeof c && (c += ""), d.push(unescape(encodeURIComponent(c))))
        };
        d.getBlob = function (a) {
            arguments.length || (a = null);
            return new g(this.data.join(""), a, "raw")
        };
        d.toString = function () {
            return "[object BlobBuilder]"
        };
        e.slice = function (a, c, b) {
            var d = arguments.length;
            3 > d && (b = null);
            return new g(this.data.slice(a, 1 < d ? c : this.data.length), b, this.encoding)
        };
        e.toString = function () {
            return "[object Blob]"
        };
        return k
    }(self),
    saveAs =
    saveAs || navigator.msSaveBlob && navigator.msSaveBlob.bind(navigator) || function (f) {
        var b = f.document,
            k = f.URL || f.webkitURL || f,
            g = b.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            d = "download" in g,
            e = f.webkitRequestFileSystem,
            h = f.requestFileSystem || e || f.mozRequestFileSystem,
            a = function (a) {
                (f.setImmediate || f.setTimeout)(function () {
                    throw a;
                }, 0)
            },
            p = 0,
            j = [],
            m = function (c, b, d) {
                b = [].concat(b);
                for (var e = b.length; e--;) {
                    var f = c["on" + b[e]];
                    if ("function" === typeof f) try {
                        f.call(c, d || c)
                    } catch (h) {
                        a(h)
                    }
                }
            },
            u = function (a,
                c) {
                var k = this,
                    u = a.type,
                    n = !1,
                    x, z, A = function () {
                        var c = (f.URL || f.webkitURL || f).createObjectURL(a);
                        j.push(c);
                        return c
                    },
                    y = function () {
                        m(k, ["writestart", "progress", "write", "writeend"])
                    },
                    s = function () {
                        if (n || !x) x = A(a);
                        z && (z.location.href = x);
                        k.readyState = k.DONE;
                        y()
                    },
                    r = function (a) {
                        return function () {
                            if (k.readyState !== k.DONE) return a.apply(this, arguments)
                        }
                    },
                    I = {
                        create: !0,
                        exclusive: !1
                    },
                    w;
                k.readyState = k.INIT;
                c || (c = "download");
                if (d && (x = A(a), g.href = x, g.download = c, w = b.createEvent("MouseEvents"), w.initMouseEvent("click",
                        !0, !1, f, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), g.dispatchEvent(w))) {
                    k.readyState = k.DONE;
                    y();
                    return
                }
                f.chrome && (u && "application/octet-stream" !== u) && (w = a.slice || a.webkitSlice, a = w.call(a, 0, a.size, "application/octet-stream"), n = !0);
                e && "download" !== c && (c += ".download");
                z = "application/octet-stream" === u || e ? f : f.open();
                h ? (p += a.size, h(f.TEMPORARY, p, r(function (b) {
                    b.root.getDirectory("saved", I, r(function (b) {
                        var d = function () {
                            b.getFile(c, I, r(function (c) {
                                c.createWriter(r(function (b) {
                                    b.onwriteend = function (a) {
                                        z.location.href =
                                            c.toURL();
                                        j.push(c);
                                        k.readyState = k.DONE;
                                        m(k, "writeend", a)
                                    };
                                    b.onerror = function () {
                                        var a = b.error;
                                        a.code !== a.ABORT_ERR && s()
                                    };
                                    ["writestart", "progress", "write", "abort"].forEach(function (a) {
                                        b["on" + a] = k["on" + a]
                                    });
                                    b.write(a);
                                    k.abort = function () {
                                        b.abort();
                                        k.readyState = k.DONE
                                    };
                                    k.readyState = k.WRITING
                                }), s)
                            }), s)
                        };
                        b.getFile(c, {
                            create: !1
                        }, r(function (a) {
                            a.remove();
                            d()
                        }), r(function (a) {
                            a.code === a.NOT_FOUND_ERR ? d() : s()
                        }))
                    }), s)
                }), s)) : s()
            },
            c = u.prototype;
        c.abort = function () {
            this.readyState = this.DONE;
            m(this, "abort")
        };
        c.readyState =
            c.INIT = 0;
        c.WRITING = 1;
        c.DONE = 2;
        c.error = c.onwritestart = c.onprogress = c.onwrite = c.onabort = c.onerror = c.onwriteend = null;
        f.addEventListener("unload", function () {
            for (var a = j.length; a--;) {
                var c = j[a];
                "string" === typeof c ? k.revokeObjectURL(c) : c.remove()
            }
            j.length = 0
        }, !1);
        return function (a, c) {
            return new u(a, c)
        }
    }(self),
    MAX_BITS = 15,
    D_CODES = 30,
    BL_CODES = 19,
    LENGTH_CODES = 29,
    LITERALS = 256,
    L_CODES = LITERALS + 1 + LENGTH_CODES,
    HEAP_SIZE = 2 * L_CODES + 1,
    END_BLOCK = 256,
    MAX_BL_BITS = 7,
    REP_3_6 = 16,
    REPZ_3_10 = 17,
    REPZ_11_138 = 18,
    Buf_size = 16,
    Z_DEFAULT_COMPRESSION = -1,
    Z_FILTERED = 1,
    Z_HUFFMAN_ONLY = 2,
    Z_DEFAULT_STRATEGY = 0,
    Z_NO_FLUSH = 0,
    Z_PARTIAL_FLUSH = 1,
    Z_FULL_FLUSH = 3,
    Z_FINISH = 4,
    Z_OK = 0,
    Z_STREAM_END = 1,
    Z_NEED_DICT = 2,
    Z_STREAM_ERROR = -2,
    Z_DATA_ERROR = -3,
    Z_BUF_ERROR = -5,
    _dist_code = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13,
13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21,
21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];

function Tree() {
    var f = this;
    f.build_tree = function (b) {
        var k = f.dyn_tree,
            g = f.stat_desc.static_tree,
            d = f.stat_desc.elems,
            e, h = -1,
            a;
        b.heap_len = 0;
        b.heap_max = HEAP_SIZE;
        for (e = 0; e < d; e++) 0 !== k[2 * e] ? (b.heap[++b.heap_len] = h = e, b.depth[e] = 0) : k[2 * e + 1] = 0;
        for (; 2 > b.heap_len;) a = b.heap[++b.heap_len] = 2 > h ? ++h : 0, k[2 * a] = 1, b.depth[a] = 0, b.opt_len--, g && (b.static_len -= g[2 * a + 1]);
        f.max_code = h;
        for (e = Math.floor(b.heap_len / 2); 1 <= e; e--) b.pqdownheap(k, e);
        a = d;
        do e = b.heap[1], b.heap[1] = b.heap[b.heap_len--], b.pqdownheap(k, 1), g = b.heap[1],
            b.heap[--b.heap_max] = e, b.heap[--b.heap_max] = g, k[2 * a] = k[2 * e] + k[2 * g], b.depth[a] = Math.max(b.depth[e], b.depth[g]) + 1, k[2 * e + 1] = k[2 * g + 1] = a, b.heap[1] = a++, b.pqdownheap(k, 1); while (2 <= b.heap_len);
        b.heap[--b.heap_max] = b.heap[1];
        e = f.dyn_tree;
        for (var h = f.stat_desc.static_tree, p = f.stat_desc.extra_bits, j = f.stat_desc.extra_base, m = f.stat_desc.max_length, u, c, q = 0, d = 0; d <= MAX_BITS; d++) b.bl_count[d] = 0;
        e[2 * b.heap[b.heap_max] + 1] = 0;
        for (a = b.heap_max + 1; a < HEAP_SIZE; a++) g = b.heap[a], d = e[2 * e[2 * g + 1] + 1] + 1, d > m && (d = m, q++), e[2 * g + 1] =
            d, g > f.max_code || (b.bl_count[d]++, u = 0, g >= j && (u = p[g - j]), c = e[2 * g], b.opt_len += c * (d + u), h && (b.static_len += c * (h[2 * g + 1] + u)));
        if (0 !== q) {
            do {
                for (d = m - 1; 0 === b.bl_count[d];) d--;
                b.bl_count[d]--;
                b.bl_count[d + 1] += 2;
                b.bl_count[m]--;
                q -= 2
            } while (0 < q);
            for (d = m; 0 !== d; d--)
                for (g = b.bl_count[d]; 0 !== g;) h = b.heap[--a], h > f.max_code || (e[2 * h + 1] != d && (b.opt_len += (d - e[2 * h + 1]) * e[2 * h], e[2 * h + 1] = d), g--)
        }
        e = f.max_code;
        a = b.bl_count;
        b = [];
        g = 0;
        for (d = 1; d <= MAX_BITS; d++) b[d] = g = g + a[d - 1] << 1;
        for (a = 0; a <= e; a++)
            if (p = k[2 * a + 1], 0 !== p) {
                g = k;
                d = 2 * a;
                h = b[p]++;
                j = 0;
                do j |= h & 1, h >>>= 1, j <<= 1; while (0 < --p);
                g[d] = j >>> 1
            }
    }
}
Tree._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25,
25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28];
Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576];
Tree.d_code = function (f) {
    return 256 > f ? _dist_code[f] : _dist_code[256 + (f >>> 7)]
};
Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

function StaticTree(f, b, k, g, d) {
    this.static_tree = f;
    this.extra_bits = b;
    this.extra_base = k;
    this.elems = g;
    this.max_length = d
}
StaticTree.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161,
8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235,
9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7,
48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8];
StaticTree.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5];
StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);
var MAX_MEM_LEVEL = 9,
    DEF_MEM_LEVEL = 8;

function Config(f, b, k, g, d) {
    this.good_length = f;
    this.max_lazy = b;
    this.nice_length = k;
    this.max_chain = g;
    this.func = d
}
var STORED = 0,
    FAST = 1,
    SLOW = 2,
    config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)],
    z_errmsg = "need dictionary;stream end;;;stream error;data error;;buffer error;;".split(";"),
    NeedMore = 0,
    BlockDone = 1,
    FinishStarted = 2,
    FinishDone = 3,
    PRESET_DICT = 32,
    INIT_STATE = 42,
    BUSY_STATE =
    113,
    FINISH_STATE = 666,
    Z_DEFLATED = 8,
    STORED_BLOCK = 0,
    STATIC_TREES = 1,
    DYN_TREES = 2,
    MIN_MATCH = 3,
    MAX_MATCH = 258,
    MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;

function smaller(f, b, k, g) {
    var d = f[2 * b];
    f = f[2 * k];
    return d < f || d == f && g[b] <= g[k]
}

function Deflate() {
    function f() {
        var a;
        for (a = 0; a < L_CODES; a++) U[2 * a] = 0;
        for (a = 0; a < D_CODES; a++) X[2 * a] = 0;
        for (a = 0; a < BL_CODES; a++) O[2 * a] = 0;
        U[2 * END_BLOCK] = 1;
        S = la = n.opt_len = n.static_len = 0
    }

    function b(a, c) {
        var b, d = -1,
            e, f = a[1],
            h = 0,
            g = 7,
            j = 4;
        0 === f && (g = 138, j = 3);
        a[2 * (c + 1) + 1] = 65535;
        for (b = 0; b <= c; b++) e = f, f = a[2 * (b + 1) + 1], ++h < g && e == f || (h < j ? O[2 * e] += h : 0 !== e ? (e != d && O[2 * e]++, O[2 * REP_3_6]++) : 10 >= h ? O[2 * REPZ_3_10]++ : O[2 * REPZ_11_138]++, h = 0, d = e, 0 === f ? (g = 138, j = 3) : e == f ? (g = 6, j = 3) : (g = 7, j = 4))
    }

    function k(a) {
        n.pending_buf[n.pending++] =
            a
    }

    function g(a) {
        k(a & 255);
        k(a >>> 8 & 255)
    }

    function d(a, c) {
        L > Buf_size - c ? (P |= a << L & 65535, g(P), P = a >>> Buf_size - L, L += c - Buf_size) : (P |= a << L & 65535, L += c)
    }

    function e(a, c) {
        var b = 2 * a;
        d(c[b] & 65535, c[b + 1] & 65535)
    }

    function h(a, c) {
        var b, f = -1,
            h, g = a[1],
            j = 0,
            k = 7,
            l = 4;
        0 === g && (k = 138, l = 3);
        for (b = 0; b <= c; b++)
            if (h = g, g = a[2 * (b + 1) + 1], !(++j < k && h == g)) {
                if (j < l) {
                    do e(h, O); while (0 !== --j)
                } else 0 !== h ? (h != f && (e(h, O), j--), e(REP_3_6, O), d(j - 3, 2)) : 10 >= j ? (e(REPZ_3_10, O), d(j - 3, 3)) : (e(REPZ_11_138, O), d(j - 11, 7));
                j = 0;
                f = h;
                0 === g ? (k = 138, l = 3) : h == g ? (k = 6, l =
                    3) : (k = 7, l = 4)
            }
    }

    function a() {
        16 == L ? (g(P), L = P = 0) : 8 <= L && (k(P & 255), P >>>= 8, L -= 8)
    }

    function p(a, c) {
        var b, d, e;
        n.pending_buf[fa + 2 * S] = a >>> 8 & 255;
        n.pending_buf[fa + 2 * S + 1] = a & 255;
        n.pending_buf[ka + S] = c & 255;
        S++;
        0 === a ? U[2 * c]++ : (la++, a--, U[2 * (Tree._length_code[c] + LITERALS + 1)]++, X[2 * Tree.d_code(a)]++);
        if (0 === (S & 8191) && 2 < M) {
            b = 8 * S;
            d = t - Q;
            for (e = 0; e < D_CODES; e++) b += X[2 * e] * (5 + Tree.extra_dbits[e]);
            if (la < Math.floor(S / 2) && b >>> 3 < Math.floor(d / 2)) return !0
        }
        return S == ba - 1
    }

    function j(a, c) {
        var b, f, h = 0,
            g, j;
        if (0 !== S) {
            do b = n.pending_buf[fa +
                2 * h] << 8 & 65280 | n.pending_buf[fa + 2 * h + 1] & 255, f = n.pending_buf[ka + h] & 255, h++, 0 === b ? e(f, a) : (g = Tree._length_code[f], e(g + LITERALS + 1, a), j = Tree.extra_lbits[g], 0 !== j && (f -= Tree.base_length[g], d(f, j)), b--, g = Tree.d_code(b), e(g, c), j = Tree.extra_dbits[g], 0 !== j && (b -= Tree.base_dist[g], d(b, j))); while (h < S)
        }
        e(END_BLOCK, a);
        ga = a[2 * END_BLOCK + 1]
    }

    function m() {
        8 < L ? g(P) : 0 < L && k(P & 255);
        L = P = 0
    }

    function u(a, c, b) {
        d((STORED_BLOCK << 1) + (b ? 1 : 0), 3);
        m();
        ga = 8;
        g(c);
        g(~c);
        n.pending_buf.set(w.subarray(a, a + c), n.pending);
        n.pending += c
    }

    function c(a) {
        var c =
            0 <= Q ? Q : -1,
            e = t - Q,
            g, k, l = 0;
        if (0 < M) {
            da.build_tree(n);
            ea.build_tree(n);
            b(U, da.max_code);
            b(X, ea.max_code);
            ja.build_tree(n);
            for (l = BL_CODES - 1; 3 <= l && 0 === O[2 * Tree.bl_order[l] + 1]; l--);
            n.opt_len += 3 * (l + 1) + 14;
            g = n.opt_len + 3 + 7 >>> 3;
            k = n.static_len + 3 + 7 >>> 3;
            k <= g && (g = k)
        } else g = k = e + 5;
        if (e + 4 <= g && -1 != c) u(c, e, a);
        else if (k == g) d((STATIC_TREES << 1) + (a ? 1 : 0), 3), j(StaticTree.static_ltree, StaticTree.static_dtree);
        else {
            d((DYN_TREES << 1) + (a ? 1 : 0), 3);
            c = da.max_code + 1;
            e = ea.max_code + 1;
            l += 1;
            d(c - 257, 5);
            d(e - 1, 5);
            d(l - 4, 4);
            for (g = 0; g < l; g++) d(O[2 *
                Tree.bl_order[g] + 1], 3);
            h(U, c - 1);
            h(X, e - 1);
            j(U, X)
        }
        f();
        a && m();
        Q = t;
        x.flush_pending()
    }

    function q() {
        var a, c, b, d;
        do {
            d = aa - E - t;
            if (0 === d && 0 === t && 0 === E) d = s;
            else if (-1 == d) d--;
            else if (t >= s + s - MIN_LOOKAHEAD) {
                w.set(w.subarray(s, s + s), 0);
                W -= s;
                t -= s;
                Q -= s;
                b = a = v;
                do c = G[--b] & 65535, G[b] = c >= s ? c - s : 0; while (0 !== --a);
                b = a = s;
                do c = D[--b] & 65535, D[b] = c >= s ? c - s : 0; while (0 !== --a);
                d += s
            }
            if (0 === x.avail_in) break;
            a = x.read_buf(w, t + E, d);
            E += a;
            E >= MIN_MATCH && (B = w[t] & 255, B = (B << N ^ w[t + 1] & 255) & l)
        } while (E < MIN_LOOKAHEAD && 0 !== x.avail_in)
    }

    function C(a) {
        var b =
            65535,
            d;
        for (b > A - 5 && (b = A - 5);;) {
            if (1 >= E) {
                q();
                if (0 === E && a == Z_NO_FLUSH) return NeedMore;
                if (0 === E) break
            }
            t += E;
            E = 0;
            d = Q + b;
            if (0 === t || t >= d)
                if (E = t - d, t = d, c(!1), 0 === x.avail_out) return NeedMore;
            if (t - Q >= s - MIN_LOOKAHEAD && (c(!1), 0 === x.avail_out)) return NeedMore
        }
        c(a == Z_FINISH);
        return 0 === x.avail_out ? a == Z_FINISH ? FinishStarted : NeedMore : a == Z_FINISH ? FinishDone : BlockDone
    }

    function F(a) {
        var c = Y,
            b = t,
            d, e = K,
            g = t > s - MIN_LOOKAHEAD ? t - (s - MIN_LOOKAHEAD) : 0,
            f = ia,
            h = I,
            j = t + MAX_MATCH,
            k = w[b + e - 1],
            l = w[b + e];
        K >= ha && (c >>= 2);
        f > E && (f = E);
        do
            if (d =
                a, !(w[d + e] != l || w[d + e - 1] != k || w[d] != w[b] || w[++d] != w[b + 1])) {
                b += 2;
                d++;
                do; while (w[++b] == w[++d] && w[++b] == w[++d] && w[++b] == w[++d] && w[++b] == w[++d] && w[++b] == w[++d] && w[++b] == w[++d] && w[++b] == w[++d] && w[++b] == w[++d] && b < j);
                d = MAX_MATCH - (j - b);
                b = j - MAX_MATCH;
                if (d > e) {
                    W = a;
                    e = d;
                    if (d >= f) break;
                    k = w[b + e - 1];
                    l = w[b + e]
                }
            } while ((a = D[a & h] & 65535) > g && 0 !== --c);
        return e <= E ? e : E
    }

    function H(a) {
        for (var b = 0, d, e;;) {
            if (E < MIN_LOOKAHEAD) {
                q();
                if (E < MIN_LOOKAHEAD && a == Z_NO_FLUSH) return NeedMore;
                if (0 === E) break
            }
            E >= MIN_MATCH && (B = (B << N ^ w[t + (MIN_MATCH -
                1)] & 255) & l, b = G[B] & 65535, D[t & I] = G[B], G[B] = t);
            K = J;
            ca = W;
            J = MIN_MATCH - 1;
            if (0 !== b && (K < Z && (t - b & 65535) <= s - MIN_LOOKAHEAD) && (T != Z_HUFFMAN_ONLY && (J = F(b)), 5 >= J && (T == Z_FILTERED || J == MIN_MATCH && 4096 < t - W))) J = MIN_MATCH - 1;
            if (K >= MIN_MATCH && J <= K) {
                e = t + E - MIN_MATCH;
                d = p(t - 1 - ca, K - MIN_MATCH);
                E -= K - 1;
                K -= 2;
                do ++t <= e && (B = (B << N ^ w[t + (MIN_MATCH - 1)] & 255) & l, b = G[B] & 65535, D[t & I] = G[B], G[B] = t); while (0 !== --K);
                R = 0;
                J = MIN_MATCH - 1;
                t++;
                if (d && (c(!1), 0 === x.avail_out)) return NeedMore
            } else if (0 !== R) {
                if ((d = p(0, w[t - 1] & 255)) && c(!1), t++, E--, 0 === x.avail_out) return NeedMore
            } else R =
                1, t++, E--
        }
        0 !== R && (p(0, w[t - 1] & 255), R = 0);
        c(a == Z_FINISH);
        return 0 === x.avail_out ? a == Z_FINISH ? FinishStarted : NeedMore : a == Z_FINISH ? FinishDone : BlockDone
    }
    var n = this,
        x, z, A, y, s, r, I, w, aa, D, G, B, v, V, l, N, Q, J, ca, R, t, W, E, K, Y, Z, M, T, ha, ia, U, X, O, da = new Tree,
        ea = new Tree,
        ja = new Tree;
    n.depth = [];
    var ka, ba, S, fa, la, ga, P, L;
    n.bl_count = [];
    n.heap = [];
    U = [];
    X = [];
    O = [];
    n.pqdownheap = function (a, b) {
        for (var c = n.heap, d = c[b], e = b << 1; e <= n.heap_len;) {
            e < n.heap_len && smaller(a, c[e + 1], c[e], n.depth) && e++;
            if (smaller(a, d, c[e], n.depth)) break;
            c[b] =
                c[e];
            b = e;
            e <<= 1
        }
        c[b] = d
    };
    n.deflateInit = function (a, b, c, d, e, g) {
        d || (d = Z_DEFLATED);
        e || (e = DEF_MEM_LEVEL);
        g || (g = Z_DEFAULT_STRATEGY);
        a.msg = null;
        b == Z_DEFAULT_COMPRESSION && (b = 6);
        if (1 > e || e > MAX_MEM_LEVEL || d != Z_DEFLATED || 9 > c || 15 < c || 0 > b || 9 < b || 0 > g || g > Z_HUFFMAN_ONLY) return Z_STREAM_ERROR;
        a.dstate = n;
        r = c;
        s = 1 << r;
        I = s - 1;
        V = e + 7;
        v = 1 << V;
        l = v - 1;
        N = Math.floor((V + MIN_MATCH - 1) / MIN_MATCH);
        w = new Uint8Array(2 * s);
        D = [];
        G = [];
        ba = 1 << e + 6;
        n.pending_buf = new Uint8Array(4 * ba);
        A = 4 * ba;
        fa = Math.floor(ba / 2);
        ka = 3 * ba;
        M = b;
        T = g;
        a.total_in = a.total_out =
            0;
        a.msg = null;
        n.pending = 0;
        n.pending_out = 0;
        z = BUSY_STATE;
        y = Z_NO_FLUSH;
        da.dyn_tree = U;
        da.stat_desc = StaticTree.static_l_desc;
        ea.dyn_tree = X;
        ea.stat_desc = StaticTree.static_d_desc;
        ja.dyn_tree = O;
        ja.stat_desc = StaticTree.static_bl_desc;
        L = P = 0;
        ga = 8;
        f();
        aa = 2 * s;
        for (a = G[v - 1] = 0; a < v - 1; a++) G[a] = 0;
        Z = config_table[M].max_lazy;
        ha = config_table[M].good_length;
        ia = config_table[M].nice_length;
        Y = config_table[M].max_chain;
        E = Q = t = 0;
        J = K = MIN_MATCH - 1;
        B = R = 0;
        return Z_OK
    };
    n.deflateEnd = function () {
        if (z != INIT_STATE && z != BUSY_STATE && z != FINISH_STATE) return Z_STREAM_ERROR;
        w = D = G = n.pending_buf = null;
        n.dstate = null;
        return z == BUSY_STATE ? Z_DATA_ERROR : Z_OK
    };
    n.deflateParams = function (a, b, c) {
        var d = Z_OK;
        b == Z_DEFAULT_COMPRESSION && (b = 6);
        if (0 > b || 9 < b || 0 > c || c > Z_HUFFMAN_ONLY) return Z_STREAM_ERROR;
        config_table[M].func != config_table[b].func && 0 !== a.total_in && (d = a.deflate(Z_PARTIAL_FLUSH));
        M != b && (M = b, Z = config_table[M].max_lazy, ha = config_table[M].good_length, ia = config_table[M].nice_length, Y = config_table[M].max_chain);
        T = c;
        return d
    };
    n.deflateSetDictionary = function (a, b, c) {
        a = c;
        var d = 0;
        if (!b ||
            z != INIT_STATE) return Z_STREAM_ERROR;
        if (a < MIN_MATCH) return Z_OK;
        a > s - MIN_LOOKAHEAD && (a = s - MIN_LOOKAHEAD, d = c - a);
        w.set(b.subarray(d, d + a), 0);
        Q = t = a;
        B = w[0] & 255;
        B = (B << N ^ w[1] & 255) & l;
        for (b = 0; b <= a - MIN_MATCH; b++) B = (B << N ^ w[b + (MIN_MATCH - 1)] & 255) & l, D[b & I] = G[B], G[B] = b;
        return Z_OK
    };
    n.deflate = function (b, g) {
        var f, h, j;
        if (g > Z_FINISH || 0 > g) return Z_STREAM_ERROR;
        if (!b.next_out || !b.next_in && 0 !== b.avail_in || z == FINISH_STATE && g != Z_FINISH) return b.msg = z_errmsg[Z_NEED_DICT - Z_STREAM_ERROR], Z_STREAM_ERROR;
        if (0 === b.avail_out) return b.msg =
            z_errmsg[Z_NEED_DICT - Z_BUF_ERROR], Z_BUF_ERROR;
        x = b;
        f = y;
        y = g;
        z == INIT_STATE && (h = Z_DEFLATED + (r - 8 << 4) << 8, j = (M - 1 & 255) >> 1, 3 < j && (j = 3), h |= j << 6, 0 !== t && (h |= PRESET_DICT), z = BUSY_STATE, h += 31 - h % 31, k(h >> 8 & 255), k(h & 255));
        if (0 !== n.pending) {
            if (x.flush_pending(), 0 === x.avail_out) return y = -1, Z_OK
        } else if (0 === x.avail_in && g <= f && g != Z_FINISH) return x.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR], Z_BUF_ERROR;
        if (z == FINISH_STATE && 0 !== x.avail_in) return b.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR], Z_BUF_ERROR;
        if (0 !== x.avail_in || 0 !== E || g != Z_NO_FLUSH &&
            z != FINISH_STATE) {
            f = -1;
            switch (config_table[M].func) {
                case STORED:
                    f = C(g);
                    break;
                case FAST:
                    a: {
                        for (f = 0;;) {
                            if (E < MIN_LOOKAHEAD) {
                                q();
                                if (E < MIN_LOOKAHEAD && g == Z_NO_FLUSH) {
                                    f = NeedMore;
                                    break a
                                }
                                if (0 === E) break
                            }
                            E >= MIN_MATCH && (B = (B << N ^ w[t + (MIN_MATCH - 1)] & 255) & l, f = G[B] & 65535, D[t & I] = G[B], G[B] = t);
                            0 !== f && (t - f & 65535) <= s - MIN_LOOKAHEAD && T != Z_HUFFMAN_ONLY && (J = F(f));
                            if (J >= MIN_MATCH)
                                if (h = p(t - W, J - MIN_MATCH), E -= J, J <= Z && E >= MIN_MATCH) {
                                    J--;
                                    do t++, B = (B << N ^ w[t + (MIN_MATCH - 1)] & 255) & l, f = G[B] & 65535, D[t & I] = G[B], G[B] = t; while (0 !== --J);
                                    t++
                                } else t +=
                                    J, J = 0, B = w[t] & 255, B = (B << N ^ w[t + 1] & 255) & l;
                            else h = p(0, w[t] & 255), E--, t++;
                            if (h && (c(!1), 0 === x.avail_out)) {
                                f = NeedMore;
                                break a
                            }
                        }
                        c(g == Z_FINISH);f = 0 === x.avail_out ? g == Z_FINISH ? FinishStarted : NeedMore : g == Z_FINISH ? FinishDone : BlockDone
                    }
                    break;
                case SLOW:
                    f = H(g)
            }
            if (f == FinishStarted || f == FinishDone) z = FINISH_STATE;
            if (f == NeedMore || f == FinishStarted) return 0 === x.avail_out && (y = -1), Z_OK;
            if (f == BlockDone) {
                if (g == Z_PARTIAL_FLUSH) d(STATIC_TREES << 1, 3), e(END_BLOCK, StaticTree.static_ltree), a(), 9 > 1 + ga + 10 - L && (d(STATIC_TREES << 1, 3), e(END_BLOCK,
                    StaticTree.static_ltree), a()), ga = 7;
                else if (u(0, 0, !1), g == Z_FULL_FLUSH)
                    for (f = 0; f < v; f++) G[f] = 0;
                x.flush_pending();
                if (0 === x.avail_out) return y = -1, Z_OK
            }
        }
        return g != Z_FINISH ? Z_OK : Z_STREAM_END
    }
}

function ZStream() {
    this.total_out = this.avail_out = this.total_in = this.avail_in = this.next_out_index = this.next_in_index = 0
}
ZStream.prototype = {
    deflateInit: function (f, b) {
        this.dstate = new Deflate;
        b || (b = MAX_BITS);
        return this.dstate.deflateInit(this, f, b)
    },
    deflate: function (f) {
        return !this.dstate ? Z_STREAM_ERROR : this.dstate.deflate(this, f)
    },
    deflateEnd: function () {
        if (!this.dstate) return Z_STREAM_ERROR;
        var f = this.dstate.deflateEnd();
        this.dstate = null;
        return f
    },
    deflateParams: function (f, b) {
        return !this.dstate ? Z_STREAM_ERROR : this.dstate.deflateParams(this, f, b)
    },
    deflateSetDictionary: function (f, b) {
        return !this.dstate ? Z_STREAM_ERROR : this.dstate.deflateSetDictionary(this,
            f, b)
    },
    read_buf: function (f, b, k) {
        var g = this.avail_in;
        g > k && (g = k);
        if (0 === g) return 0;
        this.avail_in -= g;
        f.set(this.next_in.subarray(this.next_in_index, this.next_in_index + g), b);
        this.next_in_index += g;
        this.total_in += g;
        return g
    },
    flush_pending: function () {
        var f = this.dstate.pending;
        f > this.avail_out && (f = this.avail_out);
        0 !== f && (this.next_out.set(this.dstate.pending_buf.subarray(this.dstate.pending_out, this.dstate.pending_out + f), this.next_out_index), this.next_out_index += f, this.dstate.pending_out += f, this.total_out +=
            f, this.avail_out -= f, this.dstate.pending -= f, 0 === this.dstate.pending && (this.dstate.pending_out = 0))
    }
};

function Deflater(f) {
    var b = new ZStream,
        k = Z_NO_FLUSH,
        g = new Uint8Array(512);
    "undefined" == typeof f && (f = Z_DEFAULT_COMPRESSION);
    b.deflateInit(f);
    b.next_out = g;
    this.append = function (d, e) {
        var f, a = [],
            p = 0,
            j = 0,
            m = 0,
            u;
        if (d.length) {
            b.next_in_index = 0;
            b.next_in = d;
            b.avail_in = d.length;
            do {
                b.next_out_index = 0;
                b.avail_out = 512;
                f = b.deflate(k);
                if (f != Z_OK) throw "deflating: " + b.msg;
                b.next_out_index && (512 == b.next_out_index ? a.push(new Uint8Array(g)) : a.push(new Uint8Array(g.subarray(0, b.next_out_index))));
                m += b.next_out_index;
                e &&
                    (0 < b.next_in_index && b.next_in_index != p) && (e(b.next_in_index), p = b.next_in_index)
            } while (0 < b.avail_in || 0 === b.avail_out);
            u = new Uint8Array(m);
            a.forEach(function (a) {
                u.set(a, j);
                j += a.length
            });
            return u
        }
    };
    this.flush = function () {
        var d, e = [],
            f = 0,
            a = 0,
            k;
        do {
            b.next_out_index = 0;
            b.avail_out = 512;
            d = b.deflate(Z_FINISH);
            if (d != Z_STREAM_END && d != Z_OK) throw "deflating: " + b.msg;
            0 < 512 - b.avail_out && e.push(new Uint8Array(g.subarray(0, b.next_out_index)));
            a += b.next_out_index
        } while (0 < b.avail_in || 0 === b.avail_out);
        b.deflateEnd();
        k = new Uint8Array(a);
        e.forEach(function (a) {
            k.set(a, f);
            f += a.length
        });
        return k
    }
}
void
function (f, b) {
    "object" === typeof module ? module.exports = b() : "function" === typeof define ? define(b) : f.adler32cs = b()
}(this, function () {
    var f = "function" === typeof ArrayBuffer && "function" === typeof Uint8Array,
        b = null,
        k;
    if (f) {
        try {
            var g = require("buffer");
            "function" === typeof g.Buffer && (b = g.Buffer)
        } catch (d) {}
        k = function (a) {
            return a instanceof ArrayBuffer || null !== b && a instanceof b
        }
    } else k = function () {
        return !1
    };
    var e;
    e = null !== b ? function (a) {
        return (new b(a, "utf8")).toString("binary")
    } : function (a) {
        return unescape(encodeURIComponent(a))
    };
    var h = function (a, b) {
            for (var d = a & 65535, e = a >>> 16, f = 0, g = b.length; f < g; f++) d = (d + (b.charCodeAt(f) & 255)) % 65521, e = (e + d) % 65521;
            return (e << 16 | d) >>> 0
        },
        a = function (a, b) {
            for (var d = a & 65535, e = a >>> 16, f = 0, g = b.length; f < g; f++) d = (d + b[f]) % 65521, e = (e + d) % 65521;
            return (e << 16 | d) >>> 0
        },
        g = {},
        p = function (a) {
            if (!(this instanceof p)) throw new TypeError("Constructor cannot called be as a function.");
            if (!isFinite(a = null == a ? 1 : +a)) throw Error("First arguments needs to be a finite number.");
            this.checksum = a >>> 0
        },
        j = p.prototype = {};
    j.constructor =
        p;
    var m = function (a) {
        if (!(this instanceof p)) throw new TypeError("Constructor cannot called be as a function.");
        if (null == a) throw Error("First argument needs to be a string.");
        this.checksum = h(1, a.toString())
    };
    m.prototype = j;
    p.from = m;
    m = function (a) {
        if (!(this instanceof p)) throw new TypeError("Constructor cannot called be as a function.");
        if (null == a) throw Error("First argument needs to be a string.");
        a = e(a.toString());
        this.checksum = h(1, a)
    };
    m.prototype = j;
    p.fromUtf8 = m;
    f && (m = function (b) {
        if (!(this instanceof p)) throw new TypeError("Constructor cannot called be as a function.");
        if (!k(b)) throw Error("First argument needs to be ArrayBuffer.");
        b = new Uint8Array(b);
        return this.checksum = a(1, b)
    }, m.prototype = j, p.fromBuffer = m);
    j.update = function (a) {
        if (null == a) throw Error("First argument needs to be a string.");
        a = a.toString();
        return this.checksum = h(this.checksum, a)
    };
    j.updateUtf8 = function (a) {
        if (null == a) throw Error("First argument needs to be a string.");
        a = e(a.toString());
        return this.checksum = h(this.checksum, a)
    };
    f &&
        (j.updateBuffer = function (b) {
            if (!k(b)) throw Error("First argument needs to be ArrayBuffer.");
            b = new Uint8Array(b);
            return this.checksum = a(this.checksum, b)
        });
    j.clone = function () {
        return new u(this.checksum)
    };
    var u = g.Adler32 = p;
    g.from = function (a) {
        if (null == a) throw Error("First argument needs to be a string.");
        return h(1, a.toString())
    };
    g.fromUtf8 = function (a) {
        if (null == a) throw Error("First argument needs to be a string.");
        a = e(a.toString());
        return h(1, a)
    };
    f && (g.fromBuffer = function (b) {
        if (!k(b)) throw Error("First argument need to be ArrayBuffer.");
        b = new Uint8Array(b);
        return a(1, b)
    });
    return g
});