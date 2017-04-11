System.register(["opentype.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var opentype_js_1, FontLoader;
    return {
        setters: [
            function (opentype_js_1_1) {
                opentype_js_1 = opentype_js_1_1;
            }
        ],
        execute: function () {
            exports_1("Font", opentype_js_1.Font);
            FontLoader = (function () {
                function FontLoader() {
                }
                FontLoader.getFontFamily = function (fontFamily, fontSubfamily) {
                    if (fontSubfamily === void 0) { fontSubfamily = 'Regular'; }
                    return FontLoader._fonts[FontLoader._fontsMapName[fontFamily][fontSubfamily]];
                };
                FontLoader.getFont = function (name) {
                    return FontLoader._fonts[name];
                };
                FontLoader.load = function (url, cb) {
                    opentype_js_1.default.load(url, function (err, font) {
                        if (err) {
                            return cb(err);
                        }
                        if (font) {
                            FontLoader._fonts[font.names.postScriptName['en']] = font;
                            if (!FontLoader._fontsMapName[font.names.fontFamily['en']]) {
                                FontLoader._fontsMapName[font.names.fontFamily['en']] = {};
                            }
                            FontLoader._fontsMapName[font.names.fontFamily['en']][font.names.fontSubfamily['en']] = font.names.postScriptName['en'];
                        }
                        else {
                            throw Error("Font " + url + " is not loaded");
                        }
                        cb(null, font);
                    });
                };
                return FontLoader;
            }());
            FontLoader._fonts = {};
            FontLoader._fontsMapName = {};
            exports_1("default", FontLoader);
        }
    };
});
