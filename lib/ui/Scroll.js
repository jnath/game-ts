System.register(['pixi.js', './Layout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, Layout_1;
    var Scroll;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            }],
        execute: function() {
            Scroll = (function (_super) {
                __extends(Scroll, _super);
                function Scroll() {
                    var _this = this;
                    _super.call(this);
                    this.masker = new pixi_js_1.Graphics();
                    this.content = new pixi_js_1.Container();
                    this.addChild(this.content);
                    this.mask = this.masker;
                    this.addChild(this.masker);
                    this.on('resize', function () { return _this.onResize(); });
                }
                Scroll.prototype.onResize = function () {
                    this.masker.clear();
                    this.masker.beginFill(0x000000, 1);
                    this.masker.drawRect(0, 0, this.width, this.height);
                    this.masker.endFill();
                    this.content.width = this.width;
                    this.content.height = this.height;
                };
                return Scroll;
            }(Layout_1.default));
            exports_1("default", Scroll);
        }
    }
});
