System.register(["pixi.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, EventEmitter, Loader, AssetLoader;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
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
                                if (ext === 'css') {
                                    var newStyle = document.createElement('style');
                                    newStyle.appendChild(document.createTextNode(ressource.data));
                                    document.head.appendChild(newStyle);
                                }
                                setTimeout(function () {
                                    next();
                                }, 1000);
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
            exports_1("default", AssetLoader);
        }
    };
});
