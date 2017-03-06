System.register(["pixi.js", "./component/Parallax", "./element/Hero"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Ticker, Parallax_1, Hero_1, GamePlay;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Parallax_1_1) {
                Parallax_1 = Parallax_1_1;
            },
            function (Hero_1_1) {
                Hero_1 = Hero_1_1;
            }
        ],
        execute: function () {
            Ticker = pixi_js_1.ticker.Ticker;
            GamePlay = (function (_super) {
                __extends(GamePlay, _super);
                function GamePlay() {
                    var _this = _super.call(this) || this;
                    _this.impulse = 0;
                    _this.ticker = new Ticker();
                    _this.ticker.add(_this.tick.bind(_this));
                    _this.parallax = new Parallax_1.default();
                    _this.parallax.add(pixi_js_1.Texture.fromImage('distant_clouds1'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('distant_clouds'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('huge_clouds'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('clouds'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('hill2'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('hill1'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('distant_trees'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('bushes'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('trees_and_bushes'));
                    _this.parallax.add(pixi_js_1.Texture.fromImage('ground'));
                    _this.addChild(_this.parallax);
                    _this.hero = new Hero_1.default();
                    _this.hero.x = (_this.width - _this.hero.width) / 2;
                    _this.hero.y = _this.height - _this.hero.height;
                    _this.addChild(_this.hero);
                    return _this;
                }
                GamePlay.prototype.start = function () {
                    this.ticker.start();
                    this.hero.walk();
                };
                GamePlay.prototype.stop = function () {
                    this.ticker.stop();
                    this.hero.idle();
                };
                GamePlay.prototype.tick = function () {
                    if (!this.hero) {
                        return;
                    }
                    this.parallax.move -= 3 + this.impulse;
                    this.hero.x = (this.width - this.hero.width) / 2;
                    if (this.hero.y < this.height - 90) {
                        this.hero.y += 9.8;
                    }
                    this.hero.y -= this.impulse;
                    if (this.impulse > 0) {
                        this.impulse *= 0.98;
                        if (this.hero.y >= this.height - 90) {
                            this.impulse = 0;
                        }
                    }
                    // if (this.hero.y >= this.height - 90) {
                    //   this.hero.walk();
                    // }
                };
                return GamePlay;
            }(pixi_js_1.Container));
            exports_1("default", GamePlay);
        }
    };
});
