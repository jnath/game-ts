import { Application, loaders } from 'pixi.js';
import 'pixi-spine';

import Loader = loaders.Loader;
import Resource = loaders.Resource;

import './display/Sprite';

import Game from './Game';
import AssetLoader from './process/AssetLoader';

// Create the application
const app: Application = new Application();

app.renderer.autoResize = true;
// Add the view to the DOM
document.body.appendChild(app.view);

const loader: Loader = new Loader();

let game: Game;

AssetLoader.loadWith('./assets/assets.json', (loaders) => {
  loaders['default'].load(() => {
    game = new Game();
    app.stage.addChild(game);
    resize();
    app.ticker.add(() => {
      game.render()
    });
    app.start();
  });
});

function resize() {
  let w = window.innerWidth;
  let h = window.innerHeight;

  // this part resizes the canvas but keeps ratio the same
  app.renderer.view.style.width = w + 'px';
  app.renderer.view.style.height = h + 'px';

  // this part adjusts the ratio:
  app.renderer.resize(w, h);
  if (game) {
    game.resize(app.renderer.width, app.renderer.height);
  }
}

window.addEventListener('resize', () => resize());
resize();






