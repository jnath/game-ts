System.register(["pixi.js", "./Padding", "./Layout"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Padding_1, Layout_1, Stat, Button;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Padding_1_1) {
                Padding_1 = Padding_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            }
        ],
        execute: function () {
            (function (Stat) {
                Stat[Stat["default"] = 0] = "default";
                Stat[Stat["down"] = 1] = "down";
                Stat[Stat["up"] = 2] = "up";
                Stat[Stat["over"] = 3] = "over";
                Stat[Stat["out"] = 4] = "out";
                Stat[Stat["disabled"] = 5] = "disabled";
            })(Stat || (Stat = {}));
            exports_1("Stat", Stat);
            Button = (function (_super) {
                __extends(Button, _super);
                function Button(stats, padding) {
                    var _this = _super.call(this) || this;
                    _this.stats = {};
                    _this._defaultTextStyle = {};
                    _this._padding = new Padding_1.default(20, 20, 20, 20);
                    _this.stats = stats;
                    _this._defaultTextStyle = _this.stats[Stat[Stat.default]].textStyle;
                    _this._padding = padding || _this._padding;
                    _this.interactive = true;
                    _this.buttonMode = true;
                    _this.on('mousedown', function () { return _this.stat = Stat.down; });
                    _this.on('mouseup', function () { return _this.stat = Stat.up; });
                    _this.on('mouseover', function () { return _this.stat = Stat.over; });
                    _this.on('mouseout', function () { return _this.stat = Stat.out; });
                    for (var key in _this.stats) {
                        if (!_this.stats[key]) {
                            continue;
                        }
                        _this.stats[key].background.visible = false;
                        _this.addChild(_this.stats[key].background);
                    }
                    _this.stat = Stat.default;
                    _this.on('resize', function () { return _this.onResize(); });
                    return _this;
                }
                Button.prototype.onResize = function () {
                    for (var key in this.stats) {
                        this.stats[key].background.width = this._width;
                        this.stats[key].background.height = this._height;
                    }
                };
                Object.defineProperty(Button.prototype, "defaultTextStyle", {
                    get: function () { return this._defaultTextStyle; },
                    set: function (value) {
                        this._defaultTextStyle = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Button.prototype, "text", {
                    get: function () { return this._text; },
                    set: function (value) {
                        var _this = this;
                        this._text = value;
                        if (!this.textfield) {
                            this.addTextField();
                        }
                        this.textfield.texture.baseTexture.once('update', function () { return _this.updateResize(); });
                        this.textfield.text = this._text;
                    },
                    enumerable: true,
                    configurable: true
                });
                Button.prototype.updateResize = function () {
                    this.resize(this.textfield.width + this._padding.left + this._padding.right, this.textfield.height + this._padding.top + this._padding.bottom);
                };
                Object.defineProperty(Button.prototype, "disabled", {
                    get: function () { return this._disabled; },
                    set: function (value) {
                        this._disabled = value;
                        this.setStat(this._disabled ? Stat.disabled : this.stat);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Button.prototype, "stat", {
                    get: function () { return this._stat; },
                    set: function (value) {
                        this._stat = value;
                        this.setStat(this._stat);
                    },
                    enumerable: true,
                    configurable: true
                });
                Button.prototype.setStat = function (stat) {
                    var _this = this;
                    var lastStat = stat;
                    if (this.currentStat === stat) {
                        return;
                    }
                    if (this.stats[Stat[this.currentStat]]) {
                        this.stats[Stat[this.currentStat]].background.visible = false;
                    }
                    this.currentStat = stat;
                    if (!this.stats[Stat[this.currentStat]]) {
                        return this.stat = Stat.default;
                    }
                    this.stats[Stat[this.currentStat]].background.visible = true;
                    if (this.stats[Stat[this.currentStat]].textStyle && !this.textfield) {
                        this.addTextField();
                    }
                    this.textfield.texture.baseTexture.once('update', function () { return _this.updateResize(); });
                    this.textfield.style = new pixi_js_1.TextStyle(Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle));
                    this.emit('updateStat', { lastStat: lastStat, currentStat: this.currentStat });
                };
                Button.prototype.addTextField = function () {
                    this.textfield = new pixi_js_1.Text(' ', Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle));
                    this.textfield.dock = Layout_1.Dock.CENTER | Layout_1.Dock.MIDDLE;
                    this.addChild(this.textfield);
                };
                Button.prototype.add = function (stat, texture, textStyle) {
                    texture.visible = false;
                    this.stats[Stat[stat]].background = texture;
                    this.stats[Stat[stat]].textStyle = textStyle;
                    this.addChild(texture);
                };
                return Button;
            }(Layout_1.default));
            exports_1("default", Button);
        }
    };
});
