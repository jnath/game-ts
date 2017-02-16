System.register(["pixi.js", "./process/AssetLoader", "./ui/Layout", "./ui/ProgressBar", "./ui/Padding", "./component/Parallax", "./process/Position", "gsap"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Spine, AssetLoader_1, Layout_1, ProgressBar_1, Padding_1, Parallax_1, Position_1, gsap_1, Game;
    return {
        setters: [
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
            function (Parallax_1_1) {
                Parallax_1 = Parallax_1_1;
            },
            function (Position_1_1) {
                Position_1 = Position_1_1;
            },
            function (gsap_1_1) {
                gsap_1 = gsap_1_1;
            }
        ],
        execute: function () {
            Spine = PIXI.spine.Spine;
            Game = (function (_super) {
                __extends(Game, _super);
                function Game() {
                    var _this = _super.call(this) || this;
                    _this.impulse = 0;
                    _this.background = pixi_js_1.Sprite.fromImage('background');
                    _this.background.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    _this.addChild(_this.background);
                    _this.progress = new ProgressBar_1.default(new Padding_1.default(10, 10, 15, 15));
                    _this.progress.dockPivot(_this.progress.width / 2, _this.progress.height / 2);
                    _this.progress.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    _this.progress.visible = false;
                    _this.addChild(_this.progress);
                    _this.interactive = true;
                    setTimeout(function () {
                        _this.load('all', function () {
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
                            // gsap.to(this.parallax, 1000, { move: -100000 });
                            var spineData = AssetLoader_1.default.get('all').resources['spineboy']['spineData'];
                            _this.hero = new Spine(spineData);
                            // this.hero.dock = Dock.CENTER | Dock.BOTTOM;
                            _this.hero.scale.set(.2);
                            _this.hero.state.setAnimation(0, 'walk', true);
                            _this.addChild(_this.hero);
                            _this.on('pointerdown', function () {
                                _this.hero.state.setAnimation(0, 'jump', true);
                                _this.impulse += 25;
                            });
                            // let panel: Panel = new Panel(Texture.fromImage('panel'));
                            // panel.dockPivot(panel.width / 2, panel.height / 2);
                            // panel.dock = Dock.CENTER | Dock.MIDDLE;
                            // this.addChild(panel);
                            // gsap.from(panel, 1, { scaleXY: 0, ease: Elastic.easeOut.config(1, 0.3) });
                        });
                    }, 1000);
                    _this.on('resize', function () {
                        Position_1.default.cover(_this, _this.background);
                        if (_this.parallax) {
                            Position_1.default.cover(_this, _this.parallax);
                        }
                    });
                    return _this;
                }
                Game.prototype.render = function () {
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
                    if (this.hero.y >= this.height - 90) {
                        this.hero.state.addAnimation(0, 'walk', true, 0);
                    }
                };
                Game.prototype.load = function (cathName, cb) {
                    var _this = this;
                    var loader = AssetLoader_1.default.get(cathName);
                    loader.onProgress.add(function (a) {
                        gsap_1.default.to(_this.progress, .5, { percent: a.progress / 100 });
                    });
                    loader.onComplete.once(function () {
                        loader.onProgress.detachAll();
                        gsap_1.default.to(_this.progress, .5, { percent: 1 });
                        gsap_1.default.to(_this.progress, .25, { scaleXY: 0, delay: 1, onComplete: function () {
                                _this.progress.visible = false;
                                cb();
                            } });
                    });
                    this.progress.visible = true;
                    this.progress.scaleXY = 0;
                    this.progress.percent = 0.1;
                    gsap_1.default.to(this.progress, 1, { scaleXY: 1, ease: Elastic.easeOut.config(1, 0.3), onComplete: function () {
                            loader.load();
                        } });
                };
                return Game;
            }(Layout_1.default));
            exports_1("default", Game);
        }
    };
});
