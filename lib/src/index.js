System.register(["pixi.js", "pixi-spine", "./ui/Container", "./Game", "./process/AssetLoader"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        // this part resizes the canvas but keeps ratio the same
        app.renderer.view.style.width = w + 'px';
        app.renderer.view.style.height = h + 'px';
        // this part adjusts the ratio:
        app.renderer.resize(w, h);
        if (game) {
            game.resize(app.renderer.width, app.renderer.height);
        }
    }
    var pixi_js_1, Game_1, AssetLoader_1, app, game;
    return {
        setters: [
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (Game_1_1) {
                Game_1 = Game_1_1;
            },
            function (AssetLoader_1_1) {
                AssetLoader_1 = AssetLoader_1_1;
            }
        ],
        execute: function () {
            window.debug = function (ctn) {
                if (!ctn['debug_gf']) {
                    ctn['debug_gf'] = new pixi_js_1.Graphics();
                    ctn.addChild(ctn['debug_gf']);
                }
                var gf = ctn['debug_gf'];
                gf.clear();
                gf.beginFill(0x000000, 0);
                gf.lineStyle(1, 0xFF0000, 1);
                gf.drawRect(0, 0, ctn.width, ctn.height);
                gf.endFill();
            };
            // Create the application
            app = new pixi_js_1.Application();
            app.renderer.autoResize = true;
            // Add the view to the DOM
            document.body.appendChild(app.view);
            AssetLoader_1.default.loadWith('./assets/assets.json', function (loaders) {
                loaders['default'].load(function () {
                    game = new Game_1.default();
                    app.stage.addChild(game);
                    resize();
                    // app.ticker.add(() => {
                    //   // game.render()
                    // });
                    app.start();
                });
            });
            window.addEventListener('resize', function () { return resize(); });
            resize();
        }
    };
});
