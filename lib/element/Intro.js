System.register(["pixi.js", "../ui/Panel", "./btn/BtnPlay", "../ui/Layout", "../ui/TextField"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Panel_1, BtnPlay_1, Layout_1, TextField_1, Intro;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            },
            function (BtnPlay_1_1) {
                BtnPlay_1 = BtnPlay_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            },
            function (TextField_1_1) {
                TextField_1 = TextField_1_1;
            }
        ],
        execute: function () {
            Intro = (function (_super) {
                __extends(Intro, _super);
                function Intro() {
                    var _this = _super.call(this, pixi_js_1.Texture.fromImage('panel_foreground'), pixi_js_1.Texture.fromImage('panel_background')) || this;
                    var defaultBgTextureBtn = pixi_js_1.Texture.fromImage('button_blue');
                    _this.content = new TextField_1.default('<h1>This game is a poc</h1><p>This is a textfield, work with svg font TTF OTF or WOFF</p>', {
                        default: {
                            fontName: 'AcmeFont',
                            fill: 'grey',
                            shadowColor: 'white',
                            shadowBlur: 10,
                            shadowOffsetX: 5
                        },
                        h1: {
                            fill: 'black'
                        },
                    });
                    _this.content.wordWrap = true;
                    _this.content.width = _this.width;
                    _this.content.dock = Layout_1.Dock.CENTER | Layout_1.Dock.TOP;
                    _this.content.dockY = 20;
                    _this.addChild(_this.content);
                    _this.playButton = new BtnPlay_1.default();
                    _this.playButton.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.CENTER;
                    _this.playButton.dockY = 20;
                    _this.addChild(_this.playButton);
                    _this.playButton.on('click', _this.click.bind(_this));
                    _this.playButton.on('tap', _this.click.bind(_this));
                    return _this;
                }
                Intro.prototype.click = function () {
                    this.emit('play');
                };
                return Intro;
            }(Panel_1.default));
            exports_1("default", Intro);
        }
    };
});
