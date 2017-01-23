System.register(['pixi.js', './ui/Layout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var pixi_js_1, Layout_1;
    var Game;
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            }],
        execute: function() {
            Game = (function (_super) {
                __extends(Game, _super);
                function Game() {
                    _super.call(this);
                    this.progress = pixi_js_1.Sprite.fromImage('progress-bg');
                    this.progress.dock = Layout_1.Dock.BOTTOM | Layout_1.Dock.CENTER;
                    this.addChild(this.progress);
                }
                return Game;
            }(Layout_1.default));
            exports_1("default", Game);
        }
    }
});
