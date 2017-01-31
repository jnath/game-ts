
import { Container, Sprite } from 'pixi.js'

import Layout, { Dock } from './ui/Layout';
import ProgressBar from './ui/ProgressBar';
import Padding from './ui/Padding';

export default class Game extends Layout {
  
  progress: ProgressBar;

  constructor(){
    super();
    this.progress = new ProgressBar(new Padding(10, 10, 15, 15));
    this.progress.dock = Dock.MIDDLE | Dock.CENTER;

    let interval: number  = setInterval(()=>{
      if(this.progress.percent + .1 >= 1){
        clearInterval(interval);
        this.progress.percent = 1;
        return;
      }
      this.progress.percent += 0.1;
    }, 1000)

    this.addChild(this.progress);

  }

}