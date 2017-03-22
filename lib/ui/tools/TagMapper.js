System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TagMapper;
    return {
        setters: [],
        execute: function () {
            ;
            ;
            TagMapper = (function () {
                function TagMapper(text, styles) {
                    this.tags = {};
                    this._styles = styles;
                    this._text = text;
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
                        this._styles = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                TagMapper.prototype.cleanText = function () {
                    var _this = this;
                    this.tags = {};
                    var start = 0;
                    var a = this._text.replace(/<\/?(\w*)>/g, function (tag, tagName, index, text) {
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
                        }
                        else {
                            last.start = index + start;
                        }
                        start -= tag.length;
                        return '';
                    });
                    console.log(this.tags);
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
