System.register(['./Layout'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Layout_1;
    var Panel;
    return {
        setters:[
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            }],
        execute: function() {
            Panel = (function (_super) {
                __extends(Panel, _super);
                function Panel(foreground, background) {
                    var _this = this;
                    _super.call(this);
                    this.on('resize', function () { return _this.onResize(); });
                }
                Panel.prototype.onResize = function () {
                };
                return Panel;
            }(Layout_1.default));
            exports_1("default", Panel);
        }
    }
});
