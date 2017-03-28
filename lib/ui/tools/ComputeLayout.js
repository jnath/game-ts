System.register(['./WordWrapper', './TagMapper'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WordWrapper_1, TagMapper_1;
    var DEFAULT_LINE_HEIGHT, Align, ComputeLayout;
    return {
        setters:[
            function (WordWrapper_1_1) {
                WordWrapper_1 = WordWrapper_1_1;
            },
            function (TagMapper_1_1) {
                TagMapper_1 = TagMapper_1_1;
            }],
        execute: function() {
            // A default 'line-height' according to Chrome/FF/Safari (Jun 2016)
            DEFAULT_LINE_HEIGHT = 1.175;
            exports_1("Mode", WordWrapper_1.Mode);
            (function (Align) {
                Align[Align["LEFT"] = 0] = "LEFT";
                Align[Align["RIGHT"] = 1] = "RIGHT";
                Align[Align["CENTER"] = 2] = "CENTER";
            })(Align || (Align = {}));
            exports_1("Align", Align);
            ComputeLayout = (function () {
                function ComputeLayout(text, styles) {
                    this._text = text;
                    this.tagMapper = new TagMapper_1.default(this._text, styles);
                    this._styles = this.tagMapper.styles;
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
                Object.defineProperty(ComputeLayout.prototype, "styles", {
                    get: function () { return this._styles; },
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
                    if (opts === void 0) { opts = {}; }
                    this._opts = opts;
                    var text = this.tagMapper.cleanText();
                    var align = this._opts.align || Align.LEFT;
                    var width = this._opts.width || Infinity;
                    this.wordWrapper = new WordWrapper_1.default(text, Object.assign(this._opts, {
                        measure: this.measure.bind(this)
                    }));
                    var lines = this.wordWrapper.lines();
                    // get max line width from all lines
                    var maxLineWidth = lines.reduce(function (prev, line) { return Math.max(prev, line.width); }, 0);
                    // Y position is based on CSS line height calculation
                    var x = 0;
                    var y = 0;
                    var totalHeight = 0;
                    var preferredWidth = isFinite(width) ? width : maxLineWidth;
                    var glyphs = [];
                    var lastGlyph = null;
                    var lastLeading = 0;
                    var lastShadowOffsetY = 0;
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
                        var shadowOffsetY = 0;
                        for (var j = start, c = 0; j < end; j++, c++) {
                            var char = text.charAt(j);
                            var style = this.tagMapper.getStyle(j);
                            lineAscender = Math.max(lineAscender, this.getPxByUnit(style.font.ascender, style));
                            lineDescender = Math.max(lineDescender, this.getPxByUnit(style.font.descender, style));
                            lineFontSize = Math.max(lineFontSize, style.fontSize);
                            shadowOffsetY = Math.max(shadowOffsetY, (style.shadowBlur || 0));
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
                        // lineWidth += shadowOffsetX;
                        lastShadowOffsetY = shadowOffsetY;
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
                            }
                            else if (align === Align.RIGHT) {
                                tx = preferredWidth - lineWidth;
                            }
                            if (c === 0) {
                                x += -this.getPxByUnit(metrics.xMin, style);
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
                        // Advance down
                        x = 0;
                        lastLeading = leading;
                    }
                    totalHeight += lastLeading;
                    // Compute left & right values
                    var left = 0;
                    if (align === Align.CENTER) {
                        left = (preferredWidth - maxLineWidth) / 2;
                    }
                    else if (align === Align.RIGHT) {
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
                        height: totalHeight + lastShadowOffsetY
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
                            shadowOffsetX = style.shadowBlur;
                        }
                        // determine if the new pen or width is above our limit
                        var xMax = glyph.getMetrics().xMax || 0;
                        var xMin = glyph.getMetrics().xMin || 0;
                        var glyphWidth = xMax - xMin;
                        var rsb = this.getRightSideBearing(glyph);
                        var newWidth = pen + this.getPxByUnit(glyph.getMetrics().leftSideBearing + glyphWidth + rsb, style) + (shadowOffsetX || 0);
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
                        width: curWidth,
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
            }());
            exports_1("default", ComputeLayout);
        }
    }
});
