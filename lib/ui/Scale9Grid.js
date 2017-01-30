System.register(['pixi.js', './Layout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, Layout_1;
    var Scale9Grid;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            }],
        execute: function() {
            Scale9Grid = (function (_super) {
                __extends(Scale9Grid, _super);
                function Scale9Grid(texture, grid9) {
                    var _this = this;
                    _super.call(this);
                    grid9 = grid9 ? grid9 : new pixi_js_1.Rectangle(10, 10, texture.width - 20, texture.height - 20);
                    this.resize(texture.width, texture.height);
                    var frameTl = new pixi_js_1.Rectangle(0, 0, grid9.top, grid9.left);
                    this._tl = new pixi_js_1.Sprite(this.crop(texture, frameTl));
                    this._tl.dock = Layout_1.Dock.TOP | Layout_1.Dock.LEFT;
                    this.addChild(this._tl);
                    var frameTr = new pixi_js_1.Rectangle(grid9.right, 0, texture.width - grid9.right, grid9.top);
                    this._tr = new pixi_js_1.Sprite(this.crop(texture, frameTr));
                    this._tr.dock = Layout_1.Dock.TOP | Layout_1.Dock.RIGHT;
                    this.addChild(this._tr);
                    var frameBl = new pixi_js_1.Rectangle(0, grid9.bottom, grid9.top, texture.height - grid9.bottom);
                    this._bl = new pixi_js_1.Sprite(this.crop(texture, frameBl));
                    this._bl.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.LEFT;
                    this.addChild(this._bl);
                    var frameBr = new pixi_js_1.Rectangle(grid9.right, grid9.bottom, texture.width - grid9.right, texture.height - grid9.bottom);
                    this._br = new pixi_js_1.Sprite(this.crop(texture, frameBr));
                    this._br.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.RIGHT;
                    this.addChild(this._br);
                    var frameMl = new pixi_js_1.Rectangle(0, grid9.top, grid9.left, grid9.bottom - grid9.top);
                    this._ml = new pixi_js_1.Sprite(this.crop(texture, frameMl));
                    this._ml.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.LEFT;
                    this.addChild(this._ml);
                    var frameMr = new pixi_js_1.Rectangle(grid9.right, grid9.top, texture.width - grid9.right, grid9.bottom - grid9.top);
                    this._mr = new pixi_js_1.Sprite(this.crop(texture, frameMr));
                    this._mr.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.RIGHT;
                    this.addChild(this._mr);
                    var frameTc = new pixi_js_1.Rectangle(grid9.left, 0, grid9.right - grid9.left, grid9.top);
                    this._tc = new pixi_js_1.Sprite(this.crop(texture, frameTc));
                    this._tc.dock = Layout_1.Dock.TOP | Layout_1.Dock.CENTER;
                    this.addChild(this._tc);
                    var frameBc = new pixi_js_1.Rectangle(grid9.left, grid9.bottom, grid9.right - grid9.left, texture.height - grid9.bottom);
                    this._bc = new pixi_js_1.Sprite(this.crop(texture, frameBc));
                    this._bc.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.CENTER;
                    this.addChild(this._bc);
                    this._mc = new pixi_js_1.Sprite(this.crop(texture, grid9));
                    this._mc.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    this.addChild(this._mc);
                    this.on('resize', function () { return _this.resizeHandler(); });
                }
                Scale9Grid.prototype.resizeHandler = function () {
                    this._tc.width = (this._width * this._scaleX) - (this._tl.width + this._tr.width);
                    this._bc.width = (this.width * this._scaleX) - (this._bl.width + this._br.width);
                    this._ml.height = (this.height * this._scaleY) - (this._tl.height + this._bl.height);
                    this._mr.height = (this.height * this._scaleY) - (this._tr.height + this._br.height);
                    this._mc.width = (this.width * this._scaleX) - (this._ml.width + this._mr.width);
                    this._mc.height = (this.height * this._scaleY) - (this._tc.height + this._bc.height);
                };
                Scale9Grid.prototype.crop = function (texture, rect) {
                    var trim = new pixi_js_1.Rectangle(0, 0, rect.width, rect.height);
                    return new pixi_js_1.Texture(texture.baseTexture, rect, rect, trim);
                };
                return Scale9Grid;
            }(Layout_1.default));
            exports_1("default", Scale9Grid);
        }
    }
});
