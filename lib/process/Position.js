System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResizeType, Position;
    return {
        setters:[],
        execute: function() {
            (function (ResizeType) {
                ResizeType[ResizeType["COVER"] = 0] = "COVER";
                ResizeType[ResizeType["CONTAIN"] = 1] = "CONTAIN";
            })(ResizeType || (ResizeType = {}));
            Position = (function () {
                function Position() {
                }
                Position.cover = function (container, child) {
                    this.targetResize(ResizeType.COVER, container, child);
                };
                Position.contain = function (container, child) {
                    this.targetResize(ResizeType.CONTAIN, container, child);
                };
                Position.targetResize = function (type, container, child) {
                    var mathFunc = type === ResizeType.COVER ? Math.max.bind(Math) : Math.min.bind(Math);
                    var r = mathFunc(container.width / child.width, container.height / child.height);
                    child.width = child.width * r;
                    child.height = child.height * r;
                    child.x = (container.width - child.width) / 2;
                    child.y = (container.height - child.height) / 2;
                };
                return Position;
            }());
            exports_1("default", Position);
        }
    }
});
