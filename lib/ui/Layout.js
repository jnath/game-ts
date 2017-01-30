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
            Layout = (function (_super) {
                __extends(Layout, _super);
                function Layout() {
                    var _this = this;
                    _super.call(this);
                    this.on('updatePosition', function () { return _this._childPositioning(); });
                }
                Layout.prototype._childPositioning = function () {
                    var _this = this;
                    this.emit('resize');
                    this.children.forEach(function (child) {
                        if ((child.dock & Dock.NONE) == Dock.NONE) {
                            console.log('NONE');
                            return;
                        }
                        console.log('-----------' + child.name + '-------------', child.dock);
                        if ((child.dock & Dock.TOP) == Dock.TOP) {
                            child.y = 0;
                            console.log('TOP');
                        }
                        if ((child.dock & Dock.BOTTOM) == Dock.BOTTOM) {
                            child.y = _this.height - child.height;
                            console.log('BOTTOM');
                        }
                        if ((child.dock & Dock.LEFT) == Dock.LEFT) {
                            child.x = 0;
                            console.log('LEFT');
                        }
                        if ((child.dock & Dock.RIGHT) == Dock.RIGHT) {
                            child.x = _this.width - child.width;
                            console.log('RIGHT');
                        }
                        if ((child.dock & Dock.CENTER) == Dock.CENTER) {
                            child.x = (_this.width - child.width) / 2;
                            console.log('CENTER');
                        }
                        if ((child.dock & Dock.MIDDLE) == Dock.MIDDLE) {
                            child.y = (_this.height - child.height) / 2;
                            console.log('MIDDLE');
                        }
                        // child.x += child.dock.x || 0;
                        // child.y += child.dock.y || 0;
                    });
                };
                Layout.prototype.resize = function (width, height) {
                    this._width = width;
                    this._height = height;
                    this.emit('updatePosition');
                };
                Object.defineProperty(Layout.prototype, "width", {
                    get: function () { return this._width; },
                    set: function (value) {
                        this._width = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Layout.prototype, "height", {
                    get: function () { return this._height; },
                    set: function (value) {
                        this._height = value;
                        this.emit('updatePosition');
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                return Layout;
            }(pixi_js_1.Container));
            exports_1("default", Layout);
        }
    }
});
