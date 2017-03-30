System.register(["pixi.js", "./Scale9Grid", "./Padding"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Scale9Grid_1, Padding_1, ProgressBar;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Scale9Grid_1_1) {
                Scale9Grid_1 = Scale9Grid_1_1;
            },
            function (Padding_1_1) {
                Padding_1 = Padding_1_1;
            }
        ],
        execute: function () {
            ProgressBar = (function (_super) {
                __extends(ProgressBar, _super);
                function ProgressBar(padding) {
                    if (padding === void 0) { padding = new Padding_1.default(); }
                    var _this = _super.call(this) || this;
                    _this.padding = padding;
                    _this._percent = 0;
                    _this.masker = new pixi_js_1.Graphics();
                    _this.bg = pixi_js_1.Sprite.fromImage('progress-bg');
                    _this.addChild(_this.bg);
                    _this.progress = new Scale9Grid_1.default(pixi_js_1.Texture.fromImage('progress-percent'));
                    _this.addChild(_this.progress);
                    // this.progress.mask = this.masker;
                    // this.progress.addChild(this.masker);
                    _this.padding.on('update', function () { return _this.updatePosition(); });
                    _this.updatePosition();
                    return _this;
                }
                Object.defineProperty(ProgressBar.prototype, "percent", {
                    get: function () { return this._percent; },
                    set: function (value) {
                        this._percent = value;
                        if (this._percent > 1) {
                            this._percent = 1;
                            return;
                        }
                        this.progress.scaleX = this._percent;
                    },
                    enumerable: true,
                    configurable: true
                });
                ProgressBar.prototype.updatePosition = function () {
                    this.progress.x = this.padding.left;
                    this.progress.y = this.padding.top;
                    this.progress.width = this.width - this.padding.right;
                    this.progress.height = this.height - this.padding.bottom;
                    this.masker.clear();
                    this.masker.beginFill(0x000000, 0);
                    this.masker.drawRect(0, 0, this.progress.width, this.progress.height);
                    this.masker.endFill();
                };
                return ProgressBar;
            }(pixi_js_1.Container));
            exports_1("default", ProgressBar);
        }
    };
});
