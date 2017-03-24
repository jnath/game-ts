System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, TilingSprite, Parallax;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }
        ],
        execute: function () {
            TilingSprite = pixi_js_1.extras.TilingSprite;
            Parallax = (function (_super) {
                __extends(Parallax, _super);
                function Parallax() {
                    var _this = _super.call(this) || this;
                    _this.tillings = [];
                    _this._move = 0;
                    return _this;
                }
                Parallax.prototype.add = function (texture) {
                    var parallaxSprite = new TilingSprite(texture, texture.baseTexture.width, texture.baseTexture.height);
                    this.tillings.push(parallaxSprite);
                    this.addChild(parallaxSprite);
                };
                Object.defineProperty(Parallax.prototype, "move", {
                    get: function () { return this._move; },
                    set: function (value) {
                        var _this = this;
                        this._move = value;
                        this.tillings.forEach(function (tilling, i) {
                            var speed = i / _this.tillings.length;
                            tilling.tilePosition.x = _this._move * speed;
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                return Parallax;
            }(pixi_js_1.Container));
            exports_1("default", Parallax);
        }
    };
});
