System.register(["pixi.js", "../ui/Panel", "./btn/BtnPlay", "../ui/Layout"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Panel_1, BtnPlay_1, Layout_1, Intro;
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
            }
        ],
        execute: function () {
            // import Itg from 'Itg';
            // import Motors from 'Motors';
            Intro = (function (_super) {
                __extends(Intro, _super);
                function Intro() {
                    var _this = _super.call(this, pixi_js_1.Texture.fromImage('panel_foreground'), pixi_js_1.Texture.fromImage('panel_background')) || this;
                    var defaultBgTextureBtn = pixi_js_1.Texture.fromImage('button_blue');
                    _this.playButton = new BtnPlay_1.default();
                    console.log(_this.playButton.x, _this.playButton.y);
                    _this.playButton.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.CENTER;
                    console.log(_this.playButton.x, _this.playButton.y);
                    _this.addChild(_this.playButton);
                    console.log(_this.playButton.x, _this.playButton.y);
                    _this.playButton.on('click', function () {
                        // Itg.bet((ticket: Ticket)=>{
                        //   ticket
                        // })
                        // Motors.bet(()=>{
                        // })
                        // Motors.execute('step', (data:Datas)=>{
                        // })
                    });
                    return _this;
                }
                return Intro;
            }(Panel_1.default));
            exports_1("default", Intro);
        }
    };
});
