System.register(['pixi.js', './process/AssetLoader', './ui/Layout', './ui/ProgressBar', './ui/Padding', './element/Intro', './process/Position', './GamePlay', 'gsap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, AssetLoader_1, Layout_1, ProgressBar_1, Padding_1, Intro_1, Position_1, GamePlay_1, gsap_1;
    var Spine, SkeletonData, Game;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            },
            function (ProgressBar_1_1) {
                ProgressBar_1 = ProgressBar_1_1;
            },
            function (Padding_1_1) {
                Padding_1 = Padding_1_1;
            },
            function (Intro_1_1) {
                Intro_1 = Intro_1_1;
            },
            function (Position_1_1) {
                Position_1 = Position_1_1;
            },
            function (GamePlay_1_1) {
                GamePlay_1 = GamePlay_1_1;
            },
            function (gsap_1_1) {
                gsap_1 = gsap_1_1;
            }],
        execute: function() {
            Game = (function (_super) {
                __extends(Game, _super);
                function Game() {
                    var _this = this;
                    _super.call(this);
                    this.background = pixi_js_1.Sprite.fromImage('background');
                    // this.background.dock = Dock.MIDDLE | Dock.CENTER;
                    this.addChild(this.background);
                    this.progress = new ProgressBar_1.default(new Padding_1.default(10, 10, 15, 15));
                    // this.progress.dockPivot(this.progress.width / 2, this.progress.height / 2);
                    // this.progress.dock = Dock.MIDDLE | Dock.CENTER;
                    this.progress.visible = false;
                    this.addChild(this.progress);
                    this.interactive = true;
                    this.load('all', function () {
                        _this.gamePlay = new GamePlay_1.default();
                        _this.addChild(_this.gamePlay);
                        _this.gamePlay.start();
                        _this.on('resize', function () { return Position_1.default.cover(_this, _this.gamePlay); });
                        Position_1.default.cover(_this, _this.gamePlay);
                        var intro = new Intro_1.default();
                        intro.dock = Layout_1.Dock.CENTER | Layout_1.Dock.MIDDLE;
                        intro.width = _this.width / 3 * 2;
                        intro.height = _this.height / 3 * 2;
                        intro.on('play', function () {
                            gsap_1.default.to(intro, 1, {
                                width: 0, height: 0, ease: Elastic.easeOut.config(1, 0.3),
                                onComplete: function () {
                                    _this.removeChild(intro);
                                }
                            });
                        });
                        _this.addChild(intro);
                        _this.on('resize', function () {
                            gsap_1.default.to(intro, 1, { width: _this.width / 3 * 2, height: _this.height / 3 * 2, ease: Elastic.easeOut.config(1, 0.3) });
                        });
                    });
                    this.on('resize', function () { return Position_1.default.cover(_this, _this.background); });
                }
                Game.prototype.load = function (cathName, cb) {
                    var _this = this;
                    var loader = AssetLoader_1.default.get(cathName);
                    loader.onProgress.add(function (a) {
                        gsap_1.default.to(_this.progress, .5, { percent: a.progress / 100 });
                    });
                    loader.onComplete.once(function () {
                        loader.onProgress.detachAll();
                        gsap_1.default.to(_this.progress, .5, { percent: 1 });
                        gsap_1.default.to(_this.progress, .25, {
                            scaleXY: 0, delay: 1, onComplete: function () {
                                _this.progress.visible = false;
                                cb();
                            }
                        });
                    });
                    setTimeout(function () {
                        _this.progress.visible = true;
                        _this.progress.scaleXY = 0.1;
                        _this.progress.percent = 0.1;
                        gsap_1.default.to(_this.progress, 1, {
                            scaleXY: 1, ease: Elastic.easeOut.config(1, 0.3),
                            onComplete: function () { return loader.load(); },
                        });
                    });
                };
                return Game;
            }(Layout_1.default));
            exports_1("default", Game);
        }
    }
});
