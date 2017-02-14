System.register(['pixi.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1;
    var EventEmitter, Loader, AssetLoader;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }],
        execute: function() {
            EventEmitter = pixi_js_1.utils.EventEmitter;
            AssetLoader = (function (_super) {
                __extends(AssetLoader, _super);
                function AssetLoader() {
                    _super.call(this);
                }
                return AssetLoader;
            }(EventEmitter));
            exports_1("default", AssetLoader);
        }
    }
});
