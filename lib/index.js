System.register(['pixi.js', './Game'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var pixi_js_1, Game_1;
    var Loader, app, loader, game;
    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        //this part resizes the canvas but keeps ratio the same
        app.renderer.view.style.width = w + "px";
        app.renderer.view.style.height = h + "px";
        //this part adjusts the ratio:
        app.renderer.resize(w, h);
        if (game) {
            game.resize(app.renderer.width, app.renderer.height);
        }
    }
    return {
        setters:[
            function (pixi_js_1_1) {
                pixi_js_1 = pixi_js_1_1;
            },
            function (Game_1_1) {
                Game_1 = Game_1_1;
            }],
        execute: function() {
            Loader = pixi_js_1.loaders.Loader;
            // Create the application
            app = new pixi_js_1.Application();
            app.renderer.autoResize = true;
            // Add the view to the DOM
            document.body.appendChild(app.view);
            loader = new Loader();
            loader.add('progress-bg', './assets/progress-bg.png');
            loader.add('progress-percent', './assets/progress-percent.png');
            loader.load(function () {
                game = new Game_1.default();
                app.stage.addChild(game);
                resize();
                app.start();
            });
            window.addEventListener('resize', function () { return resize(); });
            resize();
        }
    }
});
