
import { Container, Sprite } from 'pixi.js'

import Layout, { Dock } from './ui/Layout';

export default class Game extends Layout {
  
  progress: Sprite;

  constructor(){
    super();
    this.progress = Sprite.fromImage('progress-bg');
    this.progress.dock = Dock.BOTTOM | Dock.CENTER;

    this.addChild(this.progress);

  }

}