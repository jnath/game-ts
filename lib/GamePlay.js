System.register(['pixi.js', './component/Parallax', './element/Hero'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, Parallax_1, Hero_1;
    var Ticker, GamePlay;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Parallax_1_1) {
                Parallax_1 = Parallax_1_1;
            },
            function (Hero_1_1) {
                Hero_1 = Hero_1_1;
            }],
        execute: function() {
            Ticker = pixi_js_1.ticker.Ticker;
            GamePlay = (function (_super) {
                __extends(GamePlay, _super);
                function GamePlay() {
                    _super.call(this);
                    this.impulse = 0;
                    this.ticker = new Ticker();
                    this.ticker.add(this.tick.bind(this));
                    this.parallax = new Parallax_1.default();
                    this.parallax.add(pixi_js_1.Texture.fromImage('distant_clouds1'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('distant_clouds'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('huge_clouds'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('clouds'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('hill2'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('hill1'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('distant_trees'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('bushes'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('trees_and_bushes'));
                    this.parallax.add(pixi_js_1.Texture.fromImage('ground'));
                    this.addChild(this.parallax);
                    this.hero = new Hero_1.default();
                    this.hero.x = (this.width - this.hero.width) / 2;
                    this.hero.y = this.height - this.hero.height;
                    this.addChild(this.hero);
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
    }
});
