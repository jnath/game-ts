System.register(["./WordWrapper", "./TagMapper"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WordWrapper_1, TagMapper_1, DEFAULT_LINE_HEIGHT, DEFAULT_PX_SIZE, Align, ComputeLayout;
    return {
        setters: [
            function (WordWrapper_1_1) {
                WordWrapper_1 = WordWrapper_1_1;
            },
            function (TagMapper_1_1) {
                TagMapper_1 = TagMapper_1_1;
            }
        ],
        execute: function () {
            exports_1("Mode", WordWrapper_1.Mode);
            // A default 'line-height' according to Chrome/FF/Safari (Jun 2016)
            DEFAULT_LINE_HEIGHT = 1.175;
            DEFAULT_PX_SIZE = 16;
            (function (Align) {
                Align[Align["LEFT"] = 0] = "LEFT";
                Align[Align["RIGHT"] = 1] = "RIGHT";
                Align[Align["CENTER"] = 2] = "CENTER";
            })(Align || (Align = {}));
            exports_1("Align", Align);
            ComputeLayout = (function () {
                function ComputeLayout(text, styles) {
                    this._text = text;
                    this._styles = styles;
                    this.tagMapper = new TagMapper_1.default(this._text, this._styles);
                }
                Object.defineProperty(ComputeLayout.prototype, "text", {
                    get: function () { return this._text; },
                    set: function (value) {
                        this._text = value;
                        this.tagMapper.text = this._text;
                    },
                    enumerable: true,
                    configurable: true
                });
                ComputeLayout.prototype.getFontSizePx = function (font, value, dpi) {
                    if (dpi === void 0) { dpi = 96; }
                    if (typeof value === 'number')
                        return value;
                    if (typeof value !== 'string')
                        throw new TypeError('Expected number or string for getFontPixelSize');
                    var parsed = this.parseUnit(value);
                    if (!parsed.unit || parsed.unit === 'px') {
                        return parsed.num;
                    }
                    if (parsed.unit === 'em') {
                        return parsed.num * DEFAULT_PX_SIZE;
                    }
                    else if (parsed.unit === 'pt') {
                        return parsed.num * dpi / 72;
                    }
                    else {
                        throw new TypeError('Unsupported unit for fontSize: ' + parsed.unit);
                    }
                };
                ComputeLayout.prototype.parseUnit = function (str) {
                    var out = { num: 0, unit: '' };
                    str = String(str);
                    out.num = parseFloat(str);
                    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '';
                    return out;
                };
                ComputeLayout.prototype.getEmUnits = function (font, fontSizePx, value) {
                    var parsed = typeof value === 'number' ? { num: value, unit: 'px', } : this.parseUnit(value);
                    if (parsed.unit === 'em') {
                        return parsed.num * font.unitsPerEm;
                    }
                    else if (parsed.unit === 'px') {
                        var pxScale = 1 / font.unitsPerEm * fontSizePx;
                        return parsed.num / pxScale;
                    }
                    else {
                        throw new Error('Invalid unit for getPixelSize: ' + parsed.unit);
                    }
                };
                ComputeLayout.prototype.getPxByUnit = function (value) {
                    return value / this._styles.default.font.unitsPerEm * this._styles.default.fontSize;
                };
                ComputeLayout.prototype.compute = function (opts) {
                    if (opts === void 0) { opts = {}; }
                    this._opts = opts;
                    var font = this._styles.default.font;
                    var text = this.tagMapper.cleanText();
                    var align = this._opts.align || Align.LEFT;
                    var letterSpacing = this._opts.letterSpacing || 0;
                    var width = this._opts.width || Infinity;
                    this.wordWrapper = new WordWrapper_1.default(text, Object.assign(this._opts, {
                        measure: this.measure.bind(this)
                    }));
                    var lines = this.wordWrapper.lines();
                    // get max line width from all lines
                    var maxLineWidth = lines.reduce(function (prev, line) {
                        return Math.max(prev, line.width);
                    }, 0);
                    // As per CSS spec https://www.w3.org/TR/CSS2/visudet.html#line-height
                    var AD = Math.abs(font.ascender - font.descender);
                    var lineHeight = opts.lineHeight || font.unitsPerEm * DEFAULT_LINE_HEIGHT; // in em units
                    var L = lineHeight - AD;
                    // Y position is based on CSS line height calculation
                    var x = 0;
                    var y = font.ascender + L / 2;
                    var totalHeight = (AD + L) * lines.length;
                    var preferredWidth = isFinite(width) ? width : maxLineWidth;
                    var glyphs = [];
                    var lastGlyph = null;
                    // Layout by line
                    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                        var line = lines[lineIndex];
                        var start = line.start;
                        var end = line.end;
                        var lineWidth = line.width;
                        // Layout by glyph
                        for (var j = start, c = 0; j < end; j++, c++) {
                            var char = text.charAt(j);
                            var style = this.tagMapper.getStyle(j);
                            var glyph = this.getGlyph(style.font, char);
                            var metrics = glyph.getMetrics();
                            // TODO:
                            // Align center & right are off by a couple pixels, need to revisit.
                            if (j === start && align === Align.RIGHT) {
                                x -= metrics.leftSideBearing;
                            }
                            // Apply kerning
                            if (lastGlyph) {
                                x += font.getKerningValue(glyph, lastGlyph) || 0;
                            }
                            // Align text
                            var tx = 0;
                            if (align === Align.CENTER) {
                                tx = (preferredWidth - lineWidth) / 2;
                            }
                            else if (align === Align.RIGHT) {
                                tx = preferredWidth - lineWidth;
                            }
                            // Store glyph data
                            glyphs.push({
                                position: { x: x + tx, y: y },
                                data: glyph,
                                index: j,
                                column: c,
                                row: lineIndex
                            });
                            // Advance forward
                            x += letterSpacing + this.getAdvance(glyph, char);
                            lastGlyph = glyph;
                        }
                        // Advance down
                        y += lineHeight;
                        x = 0;
                    }
                    // Compute left & right values
                    var left = 0;
                    if (align === Align.CENTER) {
                        left = (preferredWidth - maxLineWidth) / 2;
                    }
                    else if (align === Align.RIGHT) {
                        left = preferredWidth - maxLineWidth;
                    }
                    var right = Math.max(0, preferredWidth - maxLineWidth - left);
                    return {
                        glyphs: glyphs,
                        baseline: L / 2 + Math.abs(font.descender),
                        leading: L,
                        lines: lines,
                        lineHeight: lineHeight,
                        left: left,
                        right: right,
                        maxLineWidth: maxLineWidth,
                        width: preferredWidth,
                        height: totalHeight
                    };
                };
                ComputeLayout.prototype.measure = function (text, start, end, width) {
                    return this.computeMetrics(text, start, end, width, 0);
                };
                ComputeLayout.prototype.computeMetrics = function (text, start, end, width, letterSpacing) {
                    if (width === void 0) { width = Infinity; }
                    if (letterSpacing === void 0) { letterSpacing = 0; }
                    start = Math.max(0, start || 0);
                    end = Math.min(end || text.length, text.length);
                    var pen = 0;
                    var count = 0;
                    var curWidth = 0;
                    for (var i = start; i < end; i++) {
                        var char = text.charAt(i);
                        var style = this.tagMapper.getStyle(i);
                        // Tab is treated as multiple space characters
                        var glyph = this.getGlyph(style.font, char);
                        this.ensureMetrics(glyph);
                        // determine kern value to next glyph
                        var kerning = 0;
                        if (i < end - 1) {
                            var nextGlyph = this.getGlyph(style.font, text.charAt(i + 1));
                            kerning += style.font.getKerningValue(glyph, nextGlyph);
                        }
                        // determine if the new pen or width is above our limit
                        var xMax = glyph.getMetrics().xMax || 0;
                        var xMin = glyph.getMetrics().xMin || 0;
                        var glyphWidth = xMax - xMin;
                        var rsb = this.getRightSideBearing(glyph);
                        var newWidth = pen + glyph.getMetrics().leftSideBearing + glyphWidth + rsb;
                        if (newWidth > width) {
                            break;
                        }
                        pen += letterSpacing + this.getAdvance(glyph, char) + kerning;
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
                ComputeLayout.prototype.getAdvance = function (glyph, char) {
                    // TODO: handle tab gracefully
                    return glyph.advanceWidth;
                };
                ComputeLayout.prototype.ensureMetrics = function (glyph) {
                    // Opentype.js only builds its paths when the getter is accessed
                    // so we force it here.
                    return glyph.path;
                };
                return ComputeLayout;
            }());
            exports_1("default", ComputeLayout);
        }
    };
});
