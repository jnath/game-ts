System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaultTag, TagMapper;
    return {
        setters:[],
        execute: function() {
            ;
            ;
            defaultTag = {
                default: { fontSize: 13 },
                h1: { fontSize: 24 },
                h2: { fontSize: 22 },
                h3: { fontSize: 18 },
                h4: { fontSize: 16 },
                h5: { fontSize: 12 },
                h6: { fontSize: 10 },
                p: { fontSize: 13 }
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
                    // let parser = new DOMParser();
                    // let doc = parser.parseFromString(`<body>${this._text}</body>`, 'text/xml');
                    var _this = this;
                    // console.log(this._text, doc);
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
                    return a;
                };
                /**
                 * Simple XML parser
                 * @param {String} xml
                 * @return {Object}
                 */
                TagMapper.prototype.parseXML = function (xml) {
                    var beg = -1;
                    var end = 0;
                    var tmp = 0;
                    var current = [];
                    var obj = {};
                    var from = -1;
                    while (true) {
                        beg = xml.indexOf('<', beg + 1);
                        if (beg === -1)
                            break;
                        end = xml.indexOf('>', beg + 1);
                        if (end === -1)
                            break;
                        var el = xml.substring(beg, end + 1);
                        var c = el[1];
                        if (c === '?' || c === '/') {
                            var o = current.pop();
                            if (from === -1 || o !== el.substring(2, el.length - 1))
                                continue;
                            var path = current.join('.') + '.' + o;
                            var value = xml.substring(from, beg);
                            if (typeof (obj[path]) === 'undefined')
                                obj[path] = value;
                            else if (obj[path] instanceof Array)
                                obj[path].push(value);
                            else
                                obj[path] = [obj[path], value];
                            from = -1;
                            continue;
                        }
                        tmp = el.indexOf(' ');
                        var hasAttributes = true;
                        if (tmp === -1) {
                            tmp = el.length - 1;
                            hasAttributes = false;
                        }
                        from = beg + el.length;
                        var isSingle = el[el.length - 2] === '/';
                        var name_1 = el.substring(1, tmp);
                        if (!isSingle)
                            current.push(name_1);
                        if (!hasAttributes)
                            continue;
                        var match = el.match(/\w+\=\".*?\"/g);
                        if (match === null)
                            continue;
                        var attr = {};
                        var length_1 = match.length;
                        for (var i = 0; i < length_1; i++) {
                            var index = match[i].indexOf('"');
                            attr[match[i].substring(0, index - 1)] = match[i].substring(index + 1, match[i].length - 1);
                        }
                        obj[current.join('.') + (isSingle ? '.' + name_1 : '') + '[]'] = attr;
                    }
                    return obj;
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
    }
});
