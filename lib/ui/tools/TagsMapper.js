System.register(['./WordWrapper'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WordWrapper_1;
    var DEFAULT_LINE_HEIGHT, Align, TagsMapper;
    return {
        setters:[
            function (WordWrapper_1_1) {
                WordWrapper_1 = WordWrapper_1_1;
            }],
        execute: function() {
            // A default 'line-height' according to Chrome/FF/Safari (Jun 2016)
            DEFAULT_LINE_HEIGHT = 1.175;
            (function (Align) {
                Align[Align["LEFT"] = 0] = "LEFT";
                Align[Align["RIGHT"] = 1] = "RIGHT";
                Align[Align["CENTER"] = 2] = "CENTER";
            })(Align || (Align = {}));
            exports_1("Align", Align);
            TagsMapper = (function () {
                function TagsMapper(text, font, opts) {
                    if (opts === void 0) { opts = {}; }
                    this._text = text;
                    this._font = font;
                    this._opts = opts;
                }
                Object.defineProperty(TagsMapper.prototype, "text", {
                    get: function () { return this._text; },
                    set: function (value) {
                        this._text = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                TagsMapper.prototype.compute = function () {
                    var font = this._font;
                    var opts = this._opts;
                    var text = this._text;
                    var align = this._opts.align || Align.LEFT;
                    var letterSpacing = this._opts.letterSpacing || 0;
                    var width = this._opts.width || Infinity;
                    this.wordWrapper = new WordWrapper_1.default(this._text, Object.assign(this._opts, {
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
                    var y = -font.ascender - L / 2;
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
                            var glyph = this.getGlyph(font, char);
                            // TODO:
                            // Align center & right are off by a couple pixels, need to revisit.
                            if (j === start && align === Align.RIGHT) {
                                x -= glyph.leftSideBearing;
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
                                position: [x + tx, y],
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
                        y -= lineHeight;
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
                TagsMapper.prototype.measure = function (text, start, end, width) {
                    return this.computeMetrics(this._font, text, start, end, width, 3);
                };
                TagsMapper.prototype.computeMetrics = function (font, text, start, end, width, letterSpacing) {
                    if (width === void 0) { width = Infinity; }
                    if (letterSpacing === void 0) { letterSpacing = 0; }
                    start = Math.max(0, start || 0);
                    end = Math.min(end || text.length, text.length);
                    var pen = 0;
                    var count = 0;
                    var curWidth = 0;
                    for (var i = start; i < end; i++) {
                        var char = text.charAt(i);
                        // Tab is treated as multiple space characters
                        var glyph = this.getGlyph(font, char);
                        this.ensureMetrics(glyph);
                        // determine kern value to next glyph
                        var kerning = 0;
                        if (i < end - 1) {
                            var nextGlyph = this.getGlyph(font, text.charAt(i + 1));
                            kerning += font.getKerningValue(glyph, nextGlyph);
                        }
                        // determine if the new pen or width is above our limit
                        var xMax = glyph.xMax || 0;
                        var xMin = glyph.xMin || 0;
                        var glyphWidth = xMax - xMin;
                        var rsb = this.getRightSideBearing(glyph);
                        var newWidth = pen + glyph.leftSideBearing + glyphWidth + rsb;
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
                TagsMapper.prototype.getRightSideBearing = function (glyph) {
                    var metrics = glyph.getMetrics();
                    var glyphWidth = (metrics.xMax || 0) - (metrics.xMin || 0);
                    var rsb = glyph.advanceWidth - metrics.leftSideBearing - glyphWidth;
                    return rsb;
                };
                TagsMapper.prototype.getGlyph = function (font, char) {
                    var isTab = char === '\t';
                    return font.charToGlyph(isTab ? ' ' : char);
                };
                TagsMapper.prototype.getAdvance = function (glyph, char) {
                    // TODO: handle tab gracefully
                    return glyph.advanceWidth;
                };
                TagsMapper.prototype.ensureMetrics = function (glyph) {
                    // Opentype.js only builds its paths when the getter is accessed
                    // so we force it here.
                    return glyph.path;
                };
                return TagsMapper;
            }());
            exports_1("default", TagsMapper);
        }
    }
});
