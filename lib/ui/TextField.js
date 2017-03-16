System.register(["pixi.js", "../process/AssetLoader"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, AssetLoader_1, TextField;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            }
        ],
        execute: function () {
            TextField = (function (_super) {
                __extends(TextField, _super);
                function TextField(text, textStyle, rendererOptions, canvas) {
                    var _this;
                    canvas = canvas || document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 300;
                    var texture = pixi_js_1.Texture.fromCanvas(canvas);
                    _this = _super.call(this, texture) || this;
                    _this._text = text;
                    _this._rendererOptions = rendererOptions;
                    _this._textStyle = textStyle;
                    _this._canvas = canvas;
                    _this._context = _this._canvas.getContext('2d');
                    _this._font = AssetLoader_1.default.getFont(_this._textStyle.fontName);
                    _this._font.draw(_this._context, _this._text, 0, 200, textStyle.fontSize || 12, _this._rendererOptions);
                    return _this;
                    // let snapPath = this._font.getPath(this._text, 0, 200, textStyle.fontSize || 12, this._rendererOptions);
                    // this._context.clearRect(0, 0, 940, 300);
                    // snapPath.draw(this._context);
                    // this._context.getImageData();
                }
                return TextField;
            }(pixi_js_1.Sprite));
            exports_1("default", TextField);
        }
    };
});
