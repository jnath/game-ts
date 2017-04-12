System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }
        ],
        execute: function () {
            pixi_js_1.Container.prototype['_scaleXY'] = 1;
            Object.defineProperty(pixi_js_1.Container.prototype, 'scaleX', {
                get: function () { return this.scale.x; },
                set: function (value) {
                    this.scale.x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(pixi_js_1.Container.prototype, 'scaleY', {
                get: function () { return this.scale.y; },
                set: function (value) {
                    this.scale.y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(pixi_js_1.Container.prototype, 'scaleXY', {
                get: function () { return this._scaleXY; },
                set: function (value) {
                    this._scaleXY = value;
                    this.scaleX = value;
                    this.scaleY = value;
                },
                enumerable: true,
                configurable: true
            });
            exports_1("default", pixi_js_1.Container);
        }
    };
});
