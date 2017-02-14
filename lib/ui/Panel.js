System.register(["pixi.js", "./Scale9Grid"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Scale9Grid_1, Panel;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Scale9Grid_1_1) {
                Scale9Grid_1 = Scale9Grid_1_1;
            }
        ],
        execute: function () {
            Panel = (function (_super) {
                __extends(Panel, _super);
                function Panel(background) {
                    var _this = _super.call(this) || this;
                    _this.background = new Scale9Grid_1.default(background);
                    _this.addChild(_this.background);
                    return _this;
                }
                return Panel;
            }(pixi_js_1.Container));
            exports_1("default", Panel);
        }
    };
});
