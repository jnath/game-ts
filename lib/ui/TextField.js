System.register(['pixi.js', '../process/AssetLoader', './tools/TagsMapper'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, AssetLoader_1, TagsMapper_1;
    var TextField;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            },
            function (TagsMapper_1_1) {
                TagsMapper_1 = TagsMapper_1_1;
            }],
        execute: function() {
            TextField = (function (_super) {
                __extends(TextField, _super);
                function TextField(text, style, rendererOptions, canvas) {
                    canvas = canvas || document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 300;
                    var texture = pixi_js_1.Texture.fromCanvas(canvas);
                    _super.call(this, texture);
                    this.resolution = 1;
                    this._text = text;
                    this._rendererOptions = rendererOptions;
                    this._style = style;
                    this._canvas = canvas;
                    this._context = this._canvas.getContext('2d');
                    this._style = style;
                    this._style.fontSize = style.fontSize || 12;
                    this._font = AssetLoader_1.default.getFont(this._style.fontName);
                    this.tagsMapper = new TagsMapper_1.default(this._text, this._font);
                    this.updateText();
                }
                Object.defineProperty(TextField.prototype, "text", {
                    get: function () { return this._text; },
                    set: function (value) {
                        this._text = value;
                        this.tagsMapper.text = this._text;
                        this.updateText();
                    },
                    enumerable: true,
                    configurable: true
                });
                TextField.prototype.updateText = function () {
                    var metrics = this.tagsMapper.compute();
                    console.log(metrics);
                };
                TextField.prototype.draw = function (text, style) {
                    var font = this._font;
                    this._baselineY = font.ascender / font.unitsPerEm * style.fontSize;
                    var snapPath = font.getPath(this._text, 0, this._baselineY, style.fontSize, this._rendererOptions);
                    var boundingBox = snapPath.getBoundingBox();
                    var x = -boundingBox.x1;
                    var y = this._baselineY - boundingBox.y1;
                    this._canvas.width = Math.ceil(boundingBox.x2 - boundingBox.x1);
                    this._canvas.height = Math.ceil(boundingBox.y2 - boundingBox.y1);
                    font.draw(this._context, this._text, x, y, style.fontSize, this._rendererOptions);
                };
                /**
                 * Updates texture size based on canvas size
                 *
                 * @private
                 */
                TextField.prototype.updateCanvasSize = function () {
                    this._texture.baseTexture.hasLoaded = true;
                    this._texture.baseTexture.resolution = this.resolution;
                    this._texture.baseTexture.realWidth = this._canvas.width;
                    this._texture.baseTexture.realHeight = this._canvas.height;
                    this._texture.baseTexture.width = this._canvas.width / this.resolution;
                    this._texture.baseTexture.height = this._canvas.height / this.resolution;
                    // call sprite onTextureUpdate to update scale if _width or _height were set
                    this._onTextureUpdate();
                    this._texture.baseTexture.emit('update', this._texture.baseTexture);
                };
                /**
                 * Renders the object using the WebGL renderer
                 *
                 * @param {PIXI.WebGLRenderer} renderer - The renderer
                 */
                TextField.prototype.renderWebGL = function (renderer) {
                    if (this.resolution !== renderer.resolution) {
                        this.resolution = renderer.resolution;
                    }
                    this.updateCanvasSize();
                    _super.prototype.renderWebGL.call(this, renderer);
                };
                /**
                 * Renders the object using the Canvas renderer
                 *
                 * @private
                 * @param {PIXI.CanvasRenderer} renderer - The renderer
                 */
                TextField.prototype._renderCanvas = function (renderer) {
                    if (this.resolution !== renderer.resolution) {
                        this.resolution = renderer.resolution;
                    }
                    this.updateCanvasSize();
                    _super.prototype._renderCanvas.call(this, renderer);
                };
                return TextField;
            }(pixi_js_1.Sprite));
            exports_1("default", TextField);
        }
    }
});
