!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[m][e]}})}function r(e){var t;if(e&&e.__esModule){t={};for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.__useDefault&&delete t.__useDefault,t.__esModule=!0}else{if("[object Module]"===Object.prototype.toString.call(e)||"undefined"!=typeof System&&System.isModule&&System.isModule(e))return e;t={default:e,__useDefault:!0}}return new o(t)}function o(e){Object.defineProperty(this,m,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(v(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return d(t,r),a(t,r,[]),t.module}function d(e,t){if(!t.depLoads){t.declare&&i(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&d(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function i(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,d=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var d=0;d<n.length;d++)n[d](o);return u=!1,t}},{id:t.key});"function"!=typeof d?(r.setters=d.setters,r.execute=d.execute):(r.setters=[],r.execute=d)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:{},__useDefault:!0},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,d=t[n],i=d.linkRecord;return u=i?-1===r.indexOf(d)?a(d,i,r):i.moduleObj:d.module,u.__useDefault?u.default:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var d=0;d<r.deps.length;d++){var i=r.depLoads[d],l=i.linkRecord;l&&-1===n.indexOf(i)&&(u=a(i,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=e},get:function(){return c.default}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var d=0;d<r.deps.length;d++)p(r.deps[d]);var m=r.execute.call(e,p,c.default,f);if(void 0!==m?c.default=m:f.exports!==c.default&&(c.default=f.exports),c.default&&c.default.__esModule)for(var v in c.default)Object.hasOwnProperty.call(c.default,v)&&"default"!==v&&(c[v]=c.default[v])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var d=0;d<t.importerSetters.length;d++)t.importerSetters[d](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},m="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,d){return function(i){i(function(i){var s={_nodeRequire:v,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));d(s);var m=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?m.default:(m instanceof o&&Object.defineProperty(m,"__esModule",{value:!0}),m)})}}}("undefined"!=typeof self?self:global)

(["a"], ["12","f"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("b", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var newline, newlineChar, whitespace, Mode, WordWrapper;
    return {
        setters: [],
        execute: function () {
            newline = /\n/;
            newlineChar = '\n';
            whitespace = /\s/;
            (function (Mode) {
                Mode[Mode["GREEDY"] = 0] = "GREEDY";
                Mode[Mode["NO_WRAP"] = 1] = "NO_WRAP";
                Mode[Mode["PRE"] = 2] = "PRE";
            })(Mode || (Mode = {}));
            exports_1("Mode", Mode);
            WordWrapper = function () {
                function WordWrapper(text, opts) {
                    this._text = text;
                    this._opts = opts;
                }
                WordWrapper.prototype.textWordWraped = function (breakLine) {
                    var _this = this;
                    if (breakLine === void 0) {
                        breakLine = '\n';
                    }
                    var splite = this.lines();
                    return splite.map(function (line) {
                        return _this._text.substring(line.start, line.end);
                    }).join(breakLine);
                };
                WordWrapper.prototype.lines = function () {
                    var text = this._text;
                    var opt = this._opts;
                    // zero width results in nothing visible
                    if (opt.width === 0 && opt.mode !== Mode.NO_WRAP) {
                        return [];
                    }
                    var width = opt.width || Number.MAX_VALUE;
                    var start = opt.start || 0;
                    var end = opt.end || text.length;
                    var mode = opt.mode;
                    var measure = opt.measure || this.monospace.bind(this);
                    if (mode === Mode.PRE) {
                        return this.pre(measure, text, start, end, width);
                    } else {
                        return this.greedy(measure, text, start, end, width, mode);
                    }
                };
                WordWrapper.prototype.idxOf = function (text, chr, start, end) {
                    var idx = text.indexOf(chr, start);
                    if (idx === -1 || idx > end) {
                        return end;
                    }
                    return idx;
                };
                WordWrapper.prototype.isWhitespace = function (chr) {
                    return whitespace.test(chr);
                };
                WordWrapper.prototype.pre = function (measure, text, start, end, width) {
                    var lines = [];
                    var lineStart = start;
                    for (var i = start; i < end && i < text.length; i++) {
                        var chr = text.charAt(i);
                        var isNewline = newline.test(chr);
                        // If we've reached a newline, then step down a line
                        // Or if we've reached the EOF
                        if (isNewline || i === end - 1) {
                            var lineEnd = isNewline ? i : i + 1;
                            var measured = measure(text, lineStart, lineEnd, width);
                            lines.push(measured);
                            lineStart = i + 1;
                        }
                    }
                    return lines;
                };
                WordWrapper.prototype.greedy = function (measure, text, start, end, width, mode) {
                    // A greedy word wrapper based on LibGDX algorithm
                    // https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
                    var lines = [];
                    var testWidth = width;
                    // if Mode.NO_WRAP is specified, we only wrap on newline chars
                    if (mode === Mode.NO_WRAP) {
                        testWidth = Number.MAX_VALUE;
                    }
                    while (start < end && start < text.length) {
                        // get next newline position
                        var newLine = this.idxOf(text, newlineChar, start, end);
                        // eat whitespace at start of line
                        while (start < newLine) {
                            if (!this.isWhitespace(text.charAt(start))) {
                                break;
                            }
                            start++;
                        }
                        // determine visible # of glyphs for the available width
                        var measured = measure(text, start, newLine, testWidth);
                        var lineEnd = start + (measured.end - measured.start);
                        var nextStart = lineEnd + newlineChar.length;
                        // if we had to cut the line before the next newline...
                        if (lineEnd < newLine) {
                            // find char to break on
                            while (lineEnd > start) {
                                if (this.isWhitespace(text.charAt(lineEnd))) {
                                    break;
                                }
                                lineEnd--;
                            }
                            if (lineEnd === start) {
                                if (nextStart > start + newlineChar.length) {
                                    nextStart--;
                                }
                                lineEnd = nextStart; // If no characters to break, show all.
                            } else {
                                nextStart = lineEnd;
                                // eat whitespace at end of line
                                while (lineEnd > start) {
                                    if (!this.isWhitespace(text.charAt(lineEnd - newlineChar.length))) {
                                        break;
                                    }
                                    lineEnd--;
                                }
                            }
                        }
                        if (lineEnd >= start) {
                            var result = measure(text, start, lineEnd, testWidth);
                            lines.push(result);
                        }
                        start = nextStart;
                    }
                    return lines;
                };
                // determines the visible number of glyphs within a given width
                WordWrapper.prototype.monospace = function (text, start, end, width) {
                    var glyphs = Math.min(width, end - start);
                    return {
                        start: start,
                        end: start + glyphs
                    };
                };
                return WordWrapper;
            }();
            exports_1("default", WordWrapper);
        }
    };
});
$__System.register("c", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var DisplayMode, defaultTag, TagMapper;
    return {
        setters: [],
        execute: function () {
            (function (DisplayMode) {
                DisplayMode[DisplayMode["INLINE"] = 0] = "INLINE";
                DisplayMode[DisplayMode["BLOCK"] = 1] = "BLOCK";
            })(DisplayMode || (DisplayMode = {}));
            exports_1("DisplayMode", DisplayMode);
            ;
            ;
            defaultTag = {
                default: { fontSize: 13 },
                h1: {
                    fontSize: 24,
                    display: DisplayMode.BLOCK
                },
                h2: {
                    fontSize: 22,
                    display: DisplayMode.BLOCK
                },
                h3: {
                    fontSize: 18,
                    display: DisplayMode.BLOCK
                },
                h4: {
                    fontSize: 16,
                    display: DisplayMode.BLOCK
                },
                h5: {
                    fontSize: 12,
                    display: DisplayMode.BLOCK
                },
                h6: {
                    fontSize: 10,
                    display: DisplayMode.BLOCK
                },
                p: {
                    fontSize: 13,
                    display: DisplayMode.BLOCK
                },
                b: {
                    fontSubFamily: 'bold'
                },
                i: {
                    fontSubFamily: 'italic'
                }
            };
            TagMapper = function () {
                function TagMapper(text, styles) {
                    this.tags = {};
                    this._text = text;
                    this.styles = styles;
                }
                Object.defineProperty(TagMapper.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        this._text = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TagMapper.prototype, "styles", {
                    get: function () {
                        return this._styles;
                    },
                    set: function (value) {
                        var _this = this;
                        this._styles = {};
                        var keys = Object.keys(value).concat(Object.keys(defaultTag)).reduce(function (prev, cur) {
                            return prev.indexOf(cur) < 0 ? prev.concat([cur]) : prev;
                        }, []);
                        keys.forEach(function (tagName) {
                            var style = Object.assign({}, defaultTag.default, value.default, defaultTag[tagName] || {}, value[tagName] || {});
                            _this._styles[tagName] = style;
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                TagMapper.prototype.cleanText = function () {
                    var _this = this;
                    this.tags = {};
                    var start = 0;
                    var a = this._text.replace(/<\/?(\w*)>/g, function (tag, tagName, index, text) {
                        var rv = '';
                        if (!_this.tags[tagName]) {
                            _this.tags[tagName] = [];
                        }
                        var last = _this.tags[tagName][_this.tags[tagName].length - 1];
                        if (!last || last.end) {
                            last = {};
                            _this.tags[tagName].push(last);
                        }
                        if (tag[1] === '/') {
                            last.end = index + start;
                            if (_this._styles[tagName] && _this._styles[tagName].display === DisplayMode.BLOCK) {
                                rv = '\n';
                            }
                        } else {
                            last.start = index + start;
                        }
                        start -= tag.length;
                        start += rv.length;
                        return rv;
                    });
                    return a;
                };
                TagMapper.prototype.getStyle = function (index) {
                    var _this = this;
                    var rv;
                    Object.keys(this.tags).forEach(function (tagName) {
                        _this.tags[tagName].forEach(function (tagDef) {
                            if (index >= tagDef.start && index <= tagDef.end) {
                                if (_this._styles[tagName]) {
                                    rv = _this._styles[tagName];
                                }
                            }
                        });
                    });
                    return rv || this._styles.default;
                };
                return TagMapper;
            }();
            exports_1("default", TagMapper);
        }
    };
});
$__System.register("d", ["b", "c"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var WordWrapper_1, TagMapper_1, DEFAULT_LINE_HEIGHT, Align, ComputeLayout;
    return {
        setters: [function (WordWrapper_1_1) {
            WordWrapper_1 = WordWrapper_1_1;
        }, function (TagMapper_1_1) {
            TagMapper_1 = TagMapper_1_1;
        }],
        execute: function () {
            exports_1("Mode", WordWrapper_1.Mode);
            // A default 'line-height' according to Chrome/FF/Safari (Jun 2016)
            DEFAULT_LINE_HEIGHT = 1.175;
            (function (Align) {
                Align[Align["LEFT"] = 0] = "LEFT";
                Align[Align["RIGHT"] = 1] = "RIGHT";
                Align[Align["CENTER"] = 2] = "CENTER";
            })(Align || (Align = {}));
            exports_1("Align", Align);
            ComputeLayout = function () {
                function ComputeLayout(text, styles) {
                    this._text = text;
                    this.tagMapper = new TagMapper_1.default(this._text, styles);
                    this._styles = this.tagMapper.styles;
                }
                Object.defineProperty(ComputeLayout.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        this._text = value;
                        this.tagMapper.text = this._text;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ComputeLayout.prototype, "styles", {
                    get: function () {
                        return this._styles;
                    },
                    set: function (value) {
                        this.tagMapper.styles = value;
                        this._styles = this.tagMapper.styles;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComputeLayout.prototype.getEmUnits = function (value, style) {
                    var pxScale = 1 / style.font.unitsPerEm * style.fontSize;
                    return value / pxScale;
                };
                ComputeLayout.prototype.getPxByUnit = function (value, style) {
                    return value / style.font.unitsPerEm * style.fontSize;
                };
                ComputeLayout.prototype.compute = function (opts) {
                    if (opts === void 0) {
                        opts = {};
                    }
                    this._opts = opts;
                    var text = this.tagMapper.cleanText();
                    var align = this._opts.align || Align.LEFT;
                    var width = this._opts.width || Infinity;
                    this.wordWrapper = new WordWrapper_1.default(text, Object.assign(this._opts, {
                        measure: this.measure.bind(this)
                    }));
                    var lines = this.wordWrapper.lines();
                    // get max line width from all lines
                    var maxLineWidth = lines.reduce(function (prev, line) {
                        return Math.max(prev, line.width);
                    }, 0);
                    // Y position is based on CSS line height calculation
                    var x = 0;
                    var y = 0;
                    var totalHeight = 0;
                    var preferredWidth = isFinite(width) ? width : maxLineWidth;
                    var glyphs = [];
                    var lastGlyph = null;
                    var lastLeading = 0;
                    var lastShadowBlur = 0;
                    var firstCharOfLineShadowOffsetX = 0;
                    var firstCharOfLineShadowBlur = 0;
                    // Layout by line
                    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                        var line = lines[lineIndex];
                        var start = line.start;
                        var end = line.end;
                        var lineWidth = line.width;
                        var lineAscender = 0;
                        var lineDescender = 0;
                        var lineFontSize = 0;
                        var lineHeight = 0;
                        var lineShadowBlur = 0;
                        for (var j = start, c = 0; j < end; j++, c++) {
                            var char = text.charAt(j);
                            var style = this.tagMapper.getStyle(j);
                            lineAscender = Math.max(lineAscender, this.getPxByUnit(style.font.ascender, style));
                            lineDescender = Math.max(lineDescender, this.getPxByUnit(style.font.descender, style));
                            lineFontSize = Math.max(lineFontSize, style.fontSize);
                            lineShadowBlur = Math.max(lineShadowBlur, style.shadowBlur || 0);
                            if (j === start) {
                                firstCharOfLineShadowOffsetX = style.shadowOffsetX || 0;
                                firstCharOfLineShadowBlur = Math.max(firstCharOfLineShadowBlur, style.shadowBlur || 0);
                            }
                        }
                        for (var j = start, c = 0; j < end; j++, c++) {
                            var char = text.charAt(j);
                            var style = this.tagMapper.getStyle(j);
                            lineHeight = Math.max(lineHeight, (style.lineHeight || DEFAULT_LINE_HEIGHT) * lineFontSize);
                        }
                        // As per CSS spec https://www.w3.org/TR/CSS2/visudet.html#line-height
                        var AD = Math.abs(lineAscender - lineDescender);
                        var leading = lineHeight - AD;
                        totalHeight += lineHeight;
                        lastShadowBlur = lineShadowBlur;
                        y += lineHeight;
                        if (lineIndex !== 0) {
                            totalHeight += leading;
                            y += leading;
                        }
                        // Layout by glyph
                        for (var j = start, c = 0; j < end; j++, c++) {
                            var char = text.charAt(j);
                            var style = this.tagMapper.getStyle(j);
                            var glyph = this.getGlyph(style.font, char);
                            var metrics = glyph.getMetrics();
                            // TODO:
                            // Align center & right are off by a couple pixels, need to revisit.
                            if (j === start && align === Align.RIGHT) {
                                x -= this.getPxByUnit(metrics.leftSideBearing, style);
                            }
                            // Apply kerning
                            if (lastGlyph) {
                                x += this.getPxByUnit(style.font.getKerningValue(glyph, lastGlyph), style) || 0;
                            }
                            // Align text
                            var tx = 0;
                            if (align === Align.CENTER) {
                                tx = (preferredWidth - lineWidth) / 2;
                            } else if (align === Align.RIGHT) {
                                tx = preferredWidth - lineWidth;
                            }
                            if (c === 0) {
                                x += -this.getPxByUnit(metrics.xMin, style);
                            }
                            if (firstCharOfLineShadowOffsetX < 0) {
                                tx += firstCharOfLineShadowBlur;
                            }
                            // Store glyph data
                            glyphs.push({
                                position: { x: x + tx, y: y },
                                data: glyph,
                                index: j,
                                column: c,
                                row: lineIndex,
                                style: style
                            });
                            var letterSpacing = style.letterSpacing || 0;
                            // Advance forward
                            x += letterSpacing + this.getPxByUnit(glyph.advanceWidth, style);
                            lastGlyph = glyph;
                        }
                        firstCharOfLineShadowOffsetX = 0;
                        // Advance down
                        x = 0;
                        lastLeading = leading;
                    }
                    totalHeight += lastLeading;
                    // Compute left & right values
                    var left = 0;
                    if (align === Align.CENTER) {
                        left = (preferredWidth - maxLineWidth) / 2;
                    } else if (align === Align.RIGHT) {
                        left = preferredWidth - maxLineWidth;
                    }
                    var right = Math.max(0, preferredWidth - maxLineWidth - left);
                    // TODO: add padding left and right if shadow offset or blur set for real center
                    return {
                        glyphs: glyphs,
                        lines: lines,
                        left: left,
                        right: right,
                        width: preferredWidth,
                        height: totalHeight + lastShadowBlur
                    };
                };
                ComputeLayout.prototype.measure = function (text, start, end, width) {
                    return this.computeMetrics(text, start, end, width, 0);
                };
                ComputeLayout.prototype.computeMetrics = function (text, start, end, width, letterSpacing) {
                    if (width === void 0) {
                        width = Infinity;
                    }
                    if (letterSpacing === void 0) {
                        letterSpacing = 0;
                    }
                    start = Math.max(0, start || 0);
                    end = Math.min(end || text.length, text.length);
                    var pen = 0;
                    var count = 0;
                    var curWidth = 0;
                    var ligneHeight = 0;
                    var shadowOffsetX = 0;
                    for (var i = start; i < end; i++) {
                        var char = text.charAt(i);
                        var style = this.tagMapper.getStyle(i);
                        // Tab is treated as multiple space characters
                        var glyph = this.getGlyph(style.font, char);
                        // determine kern value to next glyph
                        var kerning = 0;
                        if (i < end - 1) {
                            var nextGlyph = this.getGlyph(style.font, text.charAt(i + 1));
                            kerning += this.getPxByUnit(style.font.getKerningValue(glyph, nextGlyph), style);
                            shadowOffsetX = Math.abs(style.shadowBlur);
                        }
                        // determine if the new pen or width is above our limit
                        var xMax = glyph.getMetrics().xMax || 0;
                        var xMin = glyph.getMetrics().xMin || 0;
                        var glyphWidth = xMax - xMin;
                        var rsb = this.getRightSideBearing(glyph);
                        var newWidth = pen + this.getPxByUnit(glyph.getMetrics().leftSideBearing + glyphWidth + rsb, style) + Math.abs(shadowOffsetX || 0);
                        if (newWidth > width) {
                            break;
                        }
                        pen += letterSpacing + this.getPxByUnit(glyph.advanceWidth, style) + kerning;
                        curWidth = newWidth;
                        count++;
                    }
                    return {
                        start: start,
                        end: start + count,
                        width: curWidth
                    };
                };
                ComputeLayout.prototype.getRightSideBearing = function (glyph) {
                    var metrics = glyph.getMetrics();
                    var glyphWidth = (metrics.xMax || 0) - (metrics.xMin || 0);
                    var rsb = glyph.advanceWidth - metrics.leftSideBearing - glyphWidth;
                    return rsb;
                };
                ComputeLayout.prototype.getGlyph = function (font, char) {
                    var isTab = char === '\t';
                    return font.charToGlyph(isTab ? ' ' : char);
                };
                return ComputeLayout;
            }();
            exports_1("default", ComputeLayout);
        }
    };
});
$__System.register("e", ["f", "10", "d"], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, FontLoader_1, ComputeLayout_1, TextField;
    return {
        setters: [function (pixi_js_1_1) {
            pixi_js_1 = pixi_js_1_1;
        }, function (FontLoader_1_1) {
            FontLoader_1 = FontLoader_1_1;
        }, function (ComputeLayout_1_1) {
            ComputeLayout_1 = ComputeLayout_1_1;
        }],
        execute: function () {
            exports_1("Align", ComputeLayout_1.Align);
            TextField = function (_super) {
                __extends(TextField, _super);
                function TextField(text, styles, options, canvas) {
                    if (options === void 0) {
                        options = {};
                    }
                    var _this = this;
                    canvas = canvas || document.createElement('canvas');
                    canvas.width = 3;
                    canvas.height = 3;
                    var texture = pixi_js_1.Texture.fromCanvas(canvas);
                    _this = _super.call(this, texture) || this;
                    _this.resolution = 1;
                    _this._wordWrap = false;
                    _this._text = text;
                    _this._align = options.align || ComputeLayout_1.Align.LEFT;
                    _this._canvas = canvas;
                    _this._context = _this._canvas.getContext('2d');
                    _this._texture.on('update', function () {
                        _this.emit('updated');
                    });
                    _this.computeLayer = new ComputeLayout_1.default(_this._text, _this.parseStyle(styles));
                    _this._styles = _this.computeLayer.styles;
                    _this.updateText();
                    return _this;
                }
                TextField.prototype.parseStyle = function (styles) {
                    var _styles = {};
                    Object.keys(styles).forEach(function (tagName) {
                        var style = Object.assign({}, styles[tagName]);
                        if (style.fontName) {
                            style.font = FontLoader_1.default.getFont(style.fontName);
                        } else if (style.fontFamily) {
                            style.font = FontLoader_1.default.getFontFamily(style.fontFamily, style.fontSubFamily);
                        }
                        _styles[tagName] = style;
                    });
                    return _styles;
                };
                Object.defineProperty(TextField.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        this._text = value;
                        this.computeLayer.text = this._text;
                        this.updateText();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextField.prototype, "styles", {
                    get: function () {
                        return this._styles;
                    },
                    set: function (value) {
                        this.computeLayer.styles = this.parseStyle(value);
                        this._styles = this.computeLayer.styles;
                        this.updateText();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextField.prototype, "width", {
                    get: function () {
                        return this._width;
                    },
                    set: function (value) {
                        this._width = value;
                        if (this._wordWrap) {
                            this.updateText();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextField.prototype, "align", {
                    get: function () {
                        return this._align;
                    },
                    set: function (value) {
                        this._align = value;
                        this.updateText();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextField.prototype, "wordWrap", {
                    get: function () {
                        return this._wordWrap;
                    },
                    set: function (value) {
                        this._wordWrap = value;
                        this.updateText();
                    },
                    enumerable: true,
                    configurable: true
                });
                TextField.prototype.updateText = function () {
                    var _this = this;
                    var metrics = this.computeLayer.compute({
                        width: this._wordWrap ? this.width : null,
                        mode: !this._wordWrap || this.width <= 0 ? ComputeLayout_1.Mode.NO_WRAP : ComputeLayout_1.Mode.GREEDY,
                        align: this._align
                    });
                    this._width = metrics.width;
                    this._height = metrics.height;
                    this._canvas.width = this._width;
                    this._canvas.height = this._height;
                    metrics.glyphs.forEach(function (glyph) {
                        var path = glyph.data.getPath(glyph.position.x, glyph.position.y, glyph.style.fontSize);
                        path['fill'] = glyph.style.fill || path['fill'];
                        path['stroke'] = glyph.style.stroke || path['stroke'];
                        path['strokeWidth'] = glyph.style.strokeWidth || path['strokeWidth'];
                        _this._context.shadowColor = glyph.style.shadowColor || null;
                        _this._context.shadowOffsetX = glyph.style.shadowOffsetX || null;
                        _this._context.shadowOffsetY = glyph.style.shadowOffsetY || null;
                        _this._context.shadowBlur = glyph.style.shadowBlur || null;
                        path.draw(_this._context);
                    });
                };
                /**
                 * Updates texture size based on canvas size
                 *
                 * @private
                 */
                TextField.prototype.updateCanvasSize = function () {
                    this._texture.baseTexture.hasLoaded = true;
                    this._texture.baseTexture.resolution = this.resolution;
                    this._texture.baseTexture.realWidth = this._canvas.width;
                    this._texture.baseTexture.realHeight = this._canvas.height;
                    this._texture.baseTexture.width = this._canvas.width / this.resolution;
                    this._texture.baseTexture.height = this._canvas.height / this.resolution;
                    // call sprite onTextureUpdate to update scale if _width or _height were set
                    this._onTextureUpdate();
                    this._texture.baseTexture.emit('update', this._texture.baseTexture);
                };
                /**
                 * Renders the object using the WebGL renderer
                 *
                 * @param {PIXI.WebGLRenderer} renderer - The renderer
                 */
                TextField.prototype.renderWebGL = function (renderer) {
                    if (this.resolution !== renderer.resolution) {
                        this.resolution = renderer.resolution;
                    }
                    this.updateCanvasSize();
                    _super.prototype.renderWebGL.call(this, renderer);
                };
                /**
                 * Renders the object using the Canvas renderer
                 *
                 * @private
                 * @param {PIXI.CanvasRenderer} renderer - The renderer
                 */
                TextField.prototype._renderCanvas = function (renderer) {
                    if (this.resolution !== renderer.resolution) {
                        this.resolution = renderer.resolution;
                    }
                    this.updateCanvasSize();
                    _super.prototype._renderCanvas.call(this, renderer);
                };
                return TextField;
            }(pixi_js_1.Sprite);
            exports_1("default", TextField);
        }
    };
});
$__System.register("11", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {}
    };
});
$__System.register("10", ["12"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var opentype_js_1, FontLoader;
    return {
        setters: [function (opentype_js_1_1) {
            opentype_js_1 = opentype_js_1_1;
        }],
        execute: function () {
            exports_1("Font", opentype_js_1.Font);
            FontLoader = function () {
                function FontLoader() {}
                FontLoader.getFontFamily = function (fontFamily, fontSubfamily) {
                    if (fontSubfamily === void 0) {
                        fontSubfamily = 'Regular';
                    }
                    return FontLoader._fonts[FontLoader._fontsMapName[fontFamily][fontSubfamily]];
                };
                FontLoader.getFont = function (name) {
                    return FontLoader._fonts[name];
                };
                FontLoader.load = function (url, cb) {
                    opentype_js_1.default.load(url, function (err, font) {
                        if (err) {
                            return cb(err);
                        }
                        if (font) {
                            FontLoader._fonts[font.names.postScriptName['en']] = font;
                            if (!FontLoader._fontsMapName[font.names.fontFamily['en']]) {
                                FontLoader._fontsMapName[font.names.fontFamily['en']] = {};
                            }
                            FontLoader._fontsMapName[font.names.fontFamily['en']][font.names.fontSubfamily['en']] = font.names.postScriptName['en'];
                        } else {
                            throw Error("Font " + url + " is not loaded");
                        }
                        cb(null, font);
                    });
                };
                return FontLoader;
            }();
            FontLoader._fonts = {};
            FontLoader._fontsMapName = {};
            exports_1("default", FontLoader);
        }
    };
});
$__System.register("a", ["e", "11", "10"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var TextField_1;
    return {
        setters: [function (TextField_1_1) {
            TextField_1 = TextField_1_1;
            exports_1({
                "Align": TextField_1_1["Align"]
            });
        }, function (TextStyle_1_1) {
            exports_1({
                "TextStyle": TextStyle_1_1["default"]
            });
        }, function (FontLoader_1_1) {
            exports_1({
                "FontLoader": FontLoader_1_1["default"],
                "Font": FontLoader_1_1["Font"]
            });
        }],
        execute: function () {
            exports_1("default", TextField_1.default);
        }
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["opentype.js","pixi.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("opentype.js"), require("pixi.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bundle.js.map