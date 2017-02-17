System.register(["pixi.js", "../process/AssetLoader"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, AssetLoader_1, Spine, Hero;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            }
        ],
        execute: function () {
            Spine = PIXI.spine.Spine;
            Hero = (function (_super) {
                __extends(Hero, _super);
                function Hero() {
                    var _this = _super.call(this) || this;
                    _this.spineData = AssetLoader_1.default.get('all').resources['spineboy']['spineData'];
                    _this.spine = new Spine(_this.spineData);
                    _this.spine.scaleXY = .45;
                    _this.addChild(_this.spine);
                    return _this;
                }
                Hero.prototype.walk = function () {
                    this.spine.state.setAnimation(0, 'walk', true);
                };
                return Hero;
            }(pixi_js_1.Container));
            exports_1("default", Hero);
        }
    };
});
