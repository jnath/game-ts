System.register(["pixi.js", "../../ui/Scale9Grid", "../../ui/Button"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Scale9Grid_1, Button_1, BtnPlay;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Scale9Grid_1_1) {
                Scale9Grid_1 = Scale9Grid_1_1;
            },
            function (Button_1_1) {
                Button_1 = Button_1_1;
            }
        ],
        execute: function () {
            BtnPlay = (function (_super) {
                __extends(BtnPlay, _super);
                function BtnPlay() {
                    var _this;
                    var defaultBg = pixi_js_1.Texture.fromImage('button_blue');
                    var grid9Rect = new pixi_js_1.Rectangle(20, 20, defaultBg.width - 40, defaultBg.height - 40);
                    var textStyle = {
                        fontFamily: 'komika_axisregular',
                        fontSize: 24,
                        align: 'center',
                        fill: '#FFFFFF'
                    };
                    _this = _super.call(this, {
                        default: {
                            background: new Scale9Grid_1.default(defaultBg, grid9Rect),
                            textStyle: textStyle
                        }
                    }) || this;
                    return _this;
                }
                return BtnPlay;
            }(Button_1.default));
            exports_1("default", BtnPlay);
        }
    };
});
