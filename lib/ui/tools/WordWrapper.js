System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var newline, newlineChar, whitespace, Mode, WordWrapper;
    return {
        setters:[],
        execute: function() {
            newline = /\n/;
            newlineChar = '\n';
            whitespace = /\s/;
            (function (Mode) {
                Mode[Mode["GREEDY"] = 0] = "GREEDY";
                Mode[Mode["NO_WRAP"] = 1] = "NO_WRAP";
                Mode[Mode["PRE"] = 2] = "PRE";
            })(Mode || (Mode = {}));
            exports_1("Mode", Mode);
            WordWrapper = (function () {
                function WordWrapper(text, opts) {
                    this._text = text;
                    this._opts = opts;
                }
                WordWrapper.prototype.textWordWraped = function (breakLine) {
                    var _this = this;
                    if (breakLine === void 0) { breakLine = '\n'; }
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
                    }
                    else {
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
                            }
                            else {
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
            }());
            exports_1("default", WordWrapper);
        }
    }
});
