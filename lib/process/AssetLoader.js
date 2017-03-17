System.register(["pixi.js", "opentype.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, EventEmitter, Loader, opentype_js_1, AssetLoader;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (opentype_js_1_1) {
                opentype_js_1 = opentype_js_1_1;
            }
        ],
        execute: function () {
            EventEmitter = pixi_js_1.utils.EventEmitter;
            Loader = pixi_js_1.loaders.Loader;
            exports_1("Loader", Loader);
            AssetLoader = (function (_super) {
                __extends(AssetLoader, _super);
                function AssetLoader() {
                    return _super.call(this) || this;
                }
                AssetLoader.getFont = function (name) {
                    return AssetLoader._fonts[name];
                };
                AssetLoader.getAssetList = function () {
                };
                AssetLoader.loadWith = function (url, cb) {
                    var loader = new Loader();
                    var assetLoader = new AssetLoader();
                    loader.add(url, function (ressource) {
                        var assetList = ressource.data;
                        Object.keys(assetList).forEach(function (cathName) {
                            var loader = new Loader();
                            Object.keys(assetList[cathName]).forEach(function (name) {
                                var url = assetList[cathName][name];
                                loader.add(name, url);
                            });
                            loader.use(function (ressource, next) {
                                var ext = ressource.url.split('/').pop().split('.')[1];
                                if (AssetLoader.fontExts.indexOf(ext) !== -1) {
                                    opentype_js_1.default.load(ressource.url, function (err, font) {
                                        if (err) {
                                            throw err;
                                        }
                                        if (font) {
                                            console.log("font loaded name : " + font.names.postScriptName['en']);
                                            AssetLoader._fonts[font.names.postScriptName['en']] = font;
                                        }
                                        else {
                                            throw Error("Font " + ressource.url + " is not loaded");
                                        }
                                        next();
                                    });
                                    return;
                                }
                                next();
                            });
                            AssetLoader.loaders[cathName] = loader;
                        });
                        cb(AssetLoader.loaders);
                    }).load();
                };
                AssetLoader.get = function (cathName) {
                    return AssetLoader.loaders[cathName];
                };
                return AssetLoader;
            }(EventEmitter));
            AssetLoader.EVT_COMPLETE = 'complete';
            AssetLoader.loaders = {};
            AssetLoader.fontExts = [
                'ttf',
                'woff',
                'otf'
            ];
            AssetLoader._fonts = {};
            exports_1("default", AssetLoader);
        }
    };
});
