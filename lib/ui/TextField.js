System.register(['pixi.js', '../process/AssetLoader', './tools/ComputeLayout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, AssetLoader_1, ComputeLayout_1;
    var TextField;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            },
            function (ComputeLayout_1_1) {
                ComputeLayout_1 = ComputeLayout_1_1;
            }],
        execute: function() {
            exports_1("Align", ComputeLayout_1.Align);
            TextField = (function (_super) {
                __extends(TextField, _super);
                function TextField(text, styles, options, canvas) {
                    var _this = this;
                    canvas = canvas || document.createElement('canvas');
                    canvas.width = 3;
                    canvas.height = 3;
                    var texture = pixi_js_1.Texture.fromCanvas(canvas);
                    _super.call(this, texture);
                    this.resolution = 1;
                    this._wordWrap = false;
                    this._text = text;
                    this._options = options || {};
                    this._canvas = canvas;
                    this._context = this._canvas.getContext('2d');
                    this._styles = {};
                    Object.keys(styles).forEach(function (tagName) {
                        var style = Object.assign({}, styles[tagName]);
                        if (style.fontName) {
                            style.font = AssetLoader_1.default.getFont(style.fontName);
                        }
                        else if (style.fontFamily) {
                            style.font = AssetLoader_1.default.getFontFamily(style.fontFamily, style.fontSubFamily);
                        }
                        _this._styles[tagName] = style;
                    });
                    this.computeLayer = new ComputeLayout_1.default(this._text, this._styles);
                    this._styles = this.computeLayer.styles;
                    this.updateText();
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
                    var _this = this;
                    var metrics = this.computeLayer.compute({
                        width: this.width,
                        mode: !this._wordWrap || this.width <= 0 ? ComputeLayout_1.Mode.NO_WRAP : ComputeLayout_1.Mode.GREEDY,
                        align: this._options.align
                    });
                    this._width = metrics.width;
                    this._height = metrics.height;
                    this._canvas.width = this._width;
                    this._canvas.height = this._height;
                    metrics.glyphs.forEach(function (glyph) {
                        var path = glyph.data.getPath(glyph.position.x, glyph.position.y, glyph.style.fontSize);
                        path['fill'] = glyph.style.fill || path['fill'];
                        path['stroke'] = glyph.style.stroke || path['stroke'];
                        path['strokeWidth'] = glyph.style.strokeWidth || path['strokeWidth'];
                        _this._context.shadowColor = glyph.style.shadowColor || null;
                        _this._context.shadowOffsetX = glyph.style.shadowOffsetX || null;
                        _this._context.shadowOffsetY = glyph.style.shadowOffsetY || null;
                        _this._context.shadowBlur = glyph.style.shadowBlur || null;
                        path.draw(_this._context);
                        // this._context.beginPath();
                        // this._context.moveTo(0, glyph.position.y);
                        // this._context.lineTo(this._width, glyph.position.y);
                        // this._context.stroke();
                    });
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
