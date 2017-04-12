System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, EventEmitter, Padding;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }
        ],
        execute: function () {
            EventEmitter = pixi_js_1.utils.EventEmitter;
            Padding = (function (_super) {
                __extends(Padding, _super);
                function Padding(top, bottom, left, right) {
                    if (top === void 0) { top = 0; }
                    if (bottom === void 0) { bottom = 0; }
                    if (left === void 0) { left = 0; }
                    if (right === void 0) { right = 0; }
                    var _this = _super.call(this) || this;
                    _this._top = top;
                    _this._bottom = bottom + top;
                    _this._left = left;
                    _this._right = right + left;
                    return _this;
                }
                Object.defineProperty(Padding.prototype, "top", {
                    get: function () { return this._top; },
                    set: function (value) {
                        this._top = value;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Padding.prototype, "bottom", {
                    get: function () { return this._bottom; },
                    set: function (value) {
                        this._bottom = value + this._top;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Padding.prototype, "left", {
                    get: function () { return this._left; },
                    set: function (value) {
                        this._left = value;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Padding.prototype, "right", {
                    get: function () { return this._right; },
                    set: function (value) {
                        this._right = value + this.right;
                        this.emit('update');
                    },
                    enumerable: true,
                    configurable: true
                });
                return Padding;
            }(EventEmitter));
            exports_1("default", Padding);
        }
    };
});
