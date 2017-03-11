System.register(['pixi.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1;
    var Dock, Layout;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }],
        execute: function() {
            (function (Dock) {
                Dock[Dock["NONE"] = 1] = "NONE";
                Dock[Dock["TOP"] = 2] = "TOP";
                Dock[Dock["BOTTOM"] = 4] = "BOTTOM";
                Dock[Dock["LEFT"] = 8] = "LEFT";
                Dock[Dock["RIGHT"] = 16] = "RIGHT";
                Dock[Dock["CENTER"] = 32] = "CENTER";
                Dock[Dock["MIDDLE"] = 64] = "MIDDLE";
            })(Dock || (Dock = {}));
            exports_1("Dock", Dock);
            pixi_js_1.Container.prototype.dock = Dock.NONE;
            pixi_js_1.Container.prototype.dockPivot = function (x, y) {
                this.pivot.x = x;
                this.pivot.y = y;
                this.dockX = this.pivot.x;
                this.dockY = this.pivot.y;
            };
            Layout = (function (_super) {
                __extends(Layout, _super);
                function Layout() {
                    var _this = this;
                    _super.call(this);
                    this._scaleX = 1;
                    this._scaleY = 1;
                    this._scaleXY = 1;
                    this.on('updatePosition', function () { return _this.childPositioning(); });
                    this.onChildrenChange = function () { return _this.childPositioning(); };
                }
                Layout.prototype.childDock = function (child) {
                    if ((child.dock & Dock.NONE) === Dock.NONE) {
                        return;
                    }
                    if ((child.dock & Dock.TOP) === Dock.TOP) {
                        child.y = 0;
                    }
                    if ((child.dock & Dock.BOTTOM) === Dock.BOTTOM) {
                        child.y = (this._height * this._scaleY) - (child.height || 0);
                    }
                    if ((child.dock & Dock.LEFT) === Dock.LEFT) {
                        child.x = 0;
                    }
                    if ((child.dock & Dock.RIGHT) === Dock.RIGHT) {
                        child.x = (this._width * this._scaleX) - (child.width || 0);
                    }
                    if ((child.dock & Dock.CENTER) === Dock.CENTER) {
                        child.x = ((this._width * this._scaleX) - (child.width || 0)) / 2;
                    }
                    if ((child.dock & Dock.MIDDLE) === Dock.MIDDLE) {
                        child.y = ((this._height * this._scaleY) - (child.height || 0)) / 2;
                    }
                    child.x += child.dockX || 0;
                    child.y += child.dockY || 0;
                };
                Layout.prototype.childPositioning = function () {
                    var _this = this;
                    this.emit('resize');
                    this.children.forEach(function (child) {
                        _this.childDock(child);
                    });
                    if (this.parent instanceof Layout) {
                        var parent_1 = this.parent;
                        parent_1.childDock(this);
                    }
                };
                Layout.prototype.resize = function (width, height) {
                    this._width = width;
                    this._height = height;
                    this.emit('updatePosition');
                };
                Object.defineProperty(Layout.prototype, "width", {
                    get: function () { return this._width; },
                    set: function (value) {
                        this.resize(value, this._height);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Layout.prototype, "height", {
                    get: function () { return this._height; },
                    set: function (value) {
                        this.resize(this._width, value);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Layout.prototype, "scaleX", {
                    get: function () { return this._scaleX; },
                    set: function (value) {
                        this._scaleX = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "scaleY", {
                    get: function () { return this._scaleY; },
                    set: function (value) {
                        this._scaleY = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Layout.prototype, "scaleXY", {
                    get: function () { return this._scaleXY; },
                    set: function (value) {
                        this._scaleXY = value;
                        this._scaleX = value;
                        this._scaleY = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                return Layout;
            }(pixi_js_1.Container));
            exports_1("default", Layout);
        }
    }
});
