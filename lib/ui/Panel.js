System.register(["pixi.js", "./Scale9Grid", "./Layout"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Scale9Grid_1, Layout_1, Panel;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Scale9Grid_1_1) {
                Scale9Grid_1 = Scale9Grid_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            }
        ],
        execute: function () {
            Panel = (function (_super) {
                __extends(Panel, _super);
                function Panel(foreground, background) {
                    var _this = _super.call(this) || this;
                    _this.background = new Scale9Grid_1.default(background, new pixi_js_1.Rectangle(20, 20, background.width - 40, background.height - 40));
                    _this.addChild(_this.background);
                    _this.foreground = new Scale9Grid_1.default(foreground, new pixi_js_1.Rectangle(20, 20, background.width - 40, background.height - 40));
                    _this.addChild(_this.foreground);
                    _this.on('resize', function () { return _this.onResize(); });
                    _this.resize(Math.max(_this.background.width, _this.foreground.width), Math.max(_this.background.height, _this.foreground.height));
                    return _this;
                }
                Panel.prototype.onResize = function () {
                    this.foreground.width = this.width;
                    this.foreground.height = this.height;
                    this.background.width = this._width;
                    this.background.height = this._height;
                };
                return Panel;
            }(Layout_1.default));
            exports_1("default", Panel);
        }
    };
});
