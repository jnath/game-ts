System.register(["pixi.js", "./process/AssetLoader"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Spine, AssetLoader_1, GamePlay;
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
            GamePlay = (function (_super) {
                __extends(GamePlay, _super);
                function GamePlay(width, height) {
                    var _this = _super.call(this) || this;
                    _this.width = width;
                    _this.height = height;
                    setTimeout(function () {
                        var spineData = AssetLoader_1.default.get('all').resources['spineboy']['spineData'];
                        _this.hero = new Spine(spineData);
                        _this.hero.state.setAnimation(0, 'walk', true);
                        _this.hero.scaleXY = .2;
                        _this.hero.x = (width - _this.hero.width) / 2;
                        _this.hero.y = height - _this.hero.height;
                        _this.addChild(_this.hero);
                    }, 1000);
                    return _this;
                }
                return GamePlay;
            }(pixi_js_1.Container));
            exports_1("default", GamePlay);
        }
    };
});
