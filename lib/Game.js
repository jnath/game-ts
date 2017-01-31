System.register(['./ui/Layout', './ui/ProgressBar', './ui/Padding'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Layout_1, ProgressBar_1, Padding_1;
    var Game;
    return {
        setters:[
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            },
            function (ProgressBar_1_1) {
                ProgressBar_1 = ProgressBar_1_1;
            },
            function (Padding_1_1) {
                Padding_1 = Padding_1_1;
            }],
        execute: function() {
            Game = (function (_super) {
                __extends(Game, _super);
                function Game() {
                    var _this = this;
                    _super.call(this);
                    this.progress = new ProgressBar_1.default(new Padding_1.default(10, 10, 15, 15));
                    this.progress.dock = Layout_1.Dock.MIDDLE | Layout_1.Dock.CENTER;
                    var interval = setInterval(function () {
                        if (_this.progress.percent + .1 >= 1) {
                            clearInterval(interval);
                            _this.progress.percent = 1;
                            return;
                        }
                        _this.progress.percent += 0.1;
                    }, 1000);
                    this.addChild(this.progress);
                }
                return Game;
            }(Layout_1.default));
            exports_1("default", Game);
        }
    }
});
