System.register(["./TextField", "./TextStyle", "./FontLoader"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TextField_1;
    return {
        setters: [
            function (TextField_1_1) {
                TextField_1 = TextField_1_1;
                exports_1({
                    "Align": TextField_1_1["Align"]
                });
            },
            function (TextStyle_1_1) {
                exports_1({
                    "TextStyle": TextStyle_1_1["default"]
                });
            },
            function (FontLoader_1_1) {
                exports_1({
                    "FontLoader": FontLoader_1_1["default"],
                    "Font": FontLoader_1_1["Font"]
                });
            }
        ],
        execute: function () {
            exports_1("default", TextField_1.default);
        }
    };
});
