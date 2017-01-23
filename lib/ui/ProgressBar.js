System.register(['pixi.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1;
    var ProgressBar;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            }],
        execute: function() {
            ProgressBar = (function (_super) {
                __extends(ProgressBar, _super);
                function ProgressBar() {
                    _super.call(this);
                }
                return ProgressBar;
            }(pixi_js_1.Container));
            exports_1("default", ProgressBar);
        }
    }
});
