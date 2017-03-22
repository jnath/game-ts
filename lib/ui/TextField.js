System.register(["pixi.js", "../process/AssetLoader", "./tools/ComputeLayout"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, AssetLoader_1, ComputeLayout_1, TextField;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            },
            function (ComputeLayout_1_1) {
                ComputeLayout_1 = ComputeLayout_1_1;
            }
        ],
        execute: function () {
            TextField = (function (_super) {
                __extends(TextField, _super);
                function TextField(text, styles, rendererOptions, canvas) {
                    var _this;
                    canvas = canvas || document.createElement('canvas');
                    canvas.width = 3;
                    canvas.height = 3;
                    var texture = pixi_js_1.Texture.fromCanvas(canvas);
                    _this = _super.call(this, texture) || this;
                    _this.resolution = 1;
                    _this._wordWrap = false;
                    _this._text = text;
                    _this._rendererOptions = rendererOptions;
                    _this._styles = styles;
                    _this._canvas = canvas;
                    _this._context = _this._canvas.getContext('2d');
                    // this._styles.fontSize = style.fontSize || 12;
                    // this._font = AssetLoader.getFont(this._style.fontName);
                    Object.keys(_this._styles).forEach(function (tagName) {
                        var style = _this._styles[tagName];
                        style.font = AssetLoader_1.default.getFont(style.fontName);
                        return style;
                    });
                    _this.computeLayer = new ComputeLayout_1.default(_this._text, _this._styles);
                    _this.updateText();
                    return _this;
                }
                Object.defineProperty(TextField.prototype, "text", {
                    get: function () { return this._text; },
                    set: function (value) {
                        this._text = value;
                        this.computeLayer.text = this._text;
                        this.updateText();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextField.prototype, "width", {
                    get: function () { return this._width; },
                    set: function (value) {
                        this._width = value;
                        if (this._wordWrap) {
                            this.updateText();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextField.prototype, "wordWrap", {
                    get: function () { return this._wordWrap; },
                    set: function (value) {
                        this._wordWrap = value;
                        if (this._wordWrap) {
                            this.updateText();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                TextField.prototype.updateText = function () {
                    // let tagMapper: TagMapper = new TagMapper(this._text, this.styles);
                    var _this = this;
                    var fontSizePx = this.computeLayer.getFontSizePx(this._styles.default.font, this._styles.default.fontSize);
                    var metrics = this.computeLayer.compute({
                        width: this.computeLayer.getEmUnits(this._styles.default.font, fontSizePx, this.width),
                        mode: !this._wordWrap || this.width <= 0 ? ComputeLayout_1.Mode.NO_WRAP : ComputeLayout_1.Mode.GREEDY
                    });
                    this._width = this.computeLayer.getPxByUnit(metrics.width);
                    this._height = this.computeLayer.getPxByUnit(metrics.height);
                    this._canvas.width = this._width;
                    this._canvas.height = this._height;
                    metrics.glyphs.forEach(function (glyph) {
                        glyph.data.draw(_this._context, _this.computeLayer.getPxByUnit(glyph.position.x), _this.computeLayer.getPxByUnit(glyph.position.y), _this._styles.default.fontSize);
                    });
                };
                // draw(text: string, style: TextStyle) {
                //   let font: Font = this._font;
                //   this._baselineY = font.ascender / font.unitsPerEm * style.fontSize;
                //   let snapPath = font.getPath(this._text, 0, this._baselineY, style.fontSize, this._rendererOptions);
                //   let boundingBox: BoundingBox = snapPath.getBoundingBox();
                //   let x: number = -boundingBox.x1;
                //   let y: number = this._baselineY - boundingBox.y1;
                //   this._canvas.width = Math.ceil(boundingBox.x2 - boundingBox.x1);
                //   this._canvas.height = Math.ceil(boundingBox.y2 - boundingBox.y1);
                //   font.draw(this._context, this._text, x, y, style.fontSize, this._rendererOptions);
                // }
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
    };
});
