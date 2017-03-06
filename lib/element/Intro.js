System.register(["pixi.js", "../ui/Panel", "../ui/Button", "../ui/Scale9Grid"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Panel_1, Button_1, Scale9Grid_1, Intro;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Panel_1_1) {
                Panel_1 = Panel_1_1;
            },
            function (Button_1_1) {
                Button_1 = Button_1_1;
            },
            function (Scale9Grid_1_1) {
                Scale9Grid_1 = Scale9Grid_1_1;
            }
        ],
        execute: function () {
            // import Itg from 'Itg';
            // import Motors from 'Motors';
            Intro = (function (_super) {
                __extends(Intro, _super);
                function Intro() {
                    var _this = _super.call(this, pixi_js_1.Texture.fromImage('panel_foreground'), pixi_js_1.Texture.fromImage('panel_background')) || this;
                    _this.playButton = new Button_1.default({
                        default: {
                            background: new Scale9Grid_1.default(pixi_js_1.Texture.fromImage('button_blue')),
                            textStyle: {
                                fontStyle: 'arial',
                                fontSize: 24,
                                align: 'center'
                            }
                        }
                    });
                    _this.playButton.text = 'Play';
                    _this.addChild(_this.playButton);
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
