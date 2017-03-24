System.register([], function (exports_1, context_1) {
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
                }
            };
            TagMapper = (function () {
                function TagMapper(text, styles) {
                    this.tags = {};
                    this._text = text;
                    this.styles = styles;
                }
                Object.defineProperty(TagMapper.prototype, "text", {
                    get: function () { return this._text; },
                    set: function (value) {
                        this._text = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TagMapper.prototype, "styles", {
                    get: function () { return this._styles; },
                    set: function (value) {
                        var _this = this;
                        this._styles = {};
                        var keys = Object.keys(value)
                            .concat(Object.keys(defaultTag))
                            .reduce(function (prev, cur) { return (prev.indexOf(cur) < 0) ? prev.concat([cur]) : prev; }, []);
                        keys.forEach(function (tagName) {
                            var style = Object.assign({}, defaultTag.default, defaultTag[tagName] || {}, value.default, value[tagName] || {});
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
                        }
                        else {
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
            }());
            exports_1("default", TagMapper);
        }
    };
});
