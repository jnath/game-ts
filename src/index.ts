import { Application, loaders } from 'pixi.js';
import Loader = loaders.Loader;
import Game from './Game';
 


// Create the application
const app: Application = new Application();

app.renderer.autoResize = true;
// Add the view to the DOM
document.body.appendChild(app.view);

const loader: Loader = new Loader();

var game: Game;

loader.add('progress-bg', './assets/progress-bg.png');
loader.add('progress-percent', './assets/progress-percent.png');
loader.load(()=>{
  game = new Game();
  app.stage.addChild(game);
  resize();
  app.start();
});

function resize(){
  var w = window.innerWidth;
  var h = window.innerHeight;

  //this part resizes the canvas but keeps ratio the same
  app.renderer.view.style.width = w + "px";
  app.renderer.view.style.height = h + "px";

  //this part adjusts the ratio:
  app.renderer.resize(w,h);
  if(game){
    game.resize(app.renderer.width, app.renderer.height)
  }
}

window.addEventListener('resize', () => resize());
resize();






