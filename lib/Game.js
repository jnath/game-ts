System.register(['pixi.js', './process/AssetLoader', './ui/Layout', './ui/ProgressBar', './ui/Padding', './element/Intro', './process/Position', './GamePlay', './StateManager', './ui/TextField', 'gsap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, AssetLoader_1, Layout_1, ProgressBar_1, Padding_1, Intro_1, Position_1, GamePlay_1, StateManager_1, TextField_1, gsap_1;
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
            function (StateManager_1_1) {
                StateManager_1 = StateManager_1_1;
            },
            function (TextField_1_1) {
                TextField_1 = TextField_1_1;
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
                    this.background.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    this.addChild(this.background);
                    this.progress = new ProgressBar_1.default(new Padding_1.default(10, 10, 15, 15));
                    this.progress.dockPivot(this.progress.width / 2, this.progress.height / 2);
                    this.progress.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    this.progress.visible = false;
                    this.addChild(this.progress);
                    this.interactive = true;
                    StateManager_1.default.getInstance().configuration({
                        states: [{
                                name: 'intro'
                            }, {
                                name: 'game'
                            }]
                    })
                        .use(function (data, next) {
                        gsap_1.default.to(_this.intro, 1, {
                            x: (_this.width - _this.intro.width) / 2,
                            y: (_this.height - _this.intro.height) / 2,
                            ease: Elastic.easeOut.config(1, 0.3),
                        });
                        next();
                    }, { nextState: 'intro' })
                        .use(function (data, next) {
                        if (data.nextState === 'game') {
                            gsap_1.default.to(_this.intro, 1, {
                                y: -_this.intro.height,
                                ease: Elastic.easeOut.config(1, 0.3),
                                onComplete: function () { return _this.removeChild(_this.intro); }
                            });
                            _this.gamePlay.start();
                        }
                        next();
                    });
                    this.load('all', function () {
                        _this.gamePlay = new GamePlay_1.default();
                        _this.addChild(_this.gamePlay);
                        _this.cover(_this.gamePlay, true);
                        _this.createIntro();
                        _this.on('resize', function () { return _this.onResize(); });
                        StateManager_1.default.getInstance().start(function () {
                            console.log('start complete');
                            var text = 'this is a dummy <youpla>text</youpla> that overflows the <youpla>max</youpla> width. New lines \nmust be <youpla>considered</youpla>.';
                            var textField = new TextField_1.default(text, {
                                default: {
                                    fontName: 'KomikaAxis',
                                    fontSize: 40
                                },
                                youpla: {
                                    fontName: 'AcmeFont',
                                    fontSize: 12
                                }
                            });
                            textField.width = 200;
                            textField.wordWrap = true;
                            _this.addChild(textField);
                            // let i: number = 0;
                            // setInterval(() => {
                            //   textField.width += 10;
                            //   i++;
                            // }, 1000);
                            var gf = new pixi_js_1.Graphics();
                            setInterval(function () {
                                gf.clear();
                                gf.beginFill(0xFF0000, .5);
                                gf.drawRect(textField.x, textField.y, textField.width, textField.height);
                                gf.endFill();
                            }, 100);
                            _this.addChild(gf);
                        });
                    });
                    this.cover(this.background);
                }
                Game.prototype.cover = function (ctn, force) {
                    var _this = this;
                    if (force === void 0) { force = false; }
                    this.on('resize', function () { return Position_1.default.cover(_this, ctn); });
                    if (force) {
                        Position_1.default.cover(this, ctn);
                    }
                };
                Game.prototype.createIntro = function () {
                    var _this = this;
                    this.intro = new Intro_1.default();
                    this.intro.width = this.width / 3 * 2;
                    this.intro.height = this.height / 3 * 2;
                    this.intro.x = (this.width - this.intro.width) / 2;
                    this.intro.y = -this.intro.height;
                    this.intro.on('play', function () { return _this.startGame(); });
                    this.addChild(this.intro);
                };
                Game.prototype.onResize = function () {
                    if (this.intro.parent) {
                        gsap_1.default.to(this.intro, 1, {
                            x: (this.width - this.intro.width) / 2,
                            width: this.width / 3 * 2,
                            height: this.height / 3 * 2,
                            ease: Elastic.easeOut.config(1, 0.3)
                        });
                    }
                };
                Game.prototype.startGame = function () {
                    StateManager_1.default.getInstance().goto('game');
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
                        gsap_1.default.to(_this.progress, .25, {
                            scaleXY: 0, delay: 1, onComplete: function () {
                                _this.progress.visible = false;
                                setTimeout(function () {
                                    cb();
                                }, 250);
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
