import { Application, Container, Graphics } from 'pixi.js';
import 'pixi-spine';

import './ui/Container';

import Game from './Game';
import AssetLoader from './process/AssetLoader';



declare global {
  interface Window {
    debug: (ctn: Container) => void;
  }
}
(<any>window).debug = (ctn: Container) => {
  if (!ctn['debug_gf']) {
    ctn['debug_gf'] = new Graphics();
    ctn.addChild(ctn['debug_gf']);
  }
  let gf: Graphics = ctn['debug_gf'];
  gf.clear();
  gf.beginFill(0x000000, 0);
  gf.lineStyle(1, 0xFF0000, 1);
  gf.drawRect(0, 0, ctn.width, ctn.height);
  gf.endFill();
};

// Create the application
const app: Application = new Application();

app.renderer.autoResize = true;
// Add the view to the DOM
document.body.appendChild(app.view);

let game: Game;

AssetLoader.loadWith('./assets/assets.json', (loaders) => {
  loaders['default'].load(() => {
    game = new Game();
    app.stage.addChild(game);
    resize();
    // app.ticker.add(() => {
    //   // game.render()
    // });
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