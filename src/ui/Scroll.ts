import { Container, Texture, Graphics, Rectangle } from 'pixi.js';
import Scale9Grid from './Scale9Grid';
import Layout from './Layout';

export default class Panel extends Layout {



  constructor(foreground: Texture, background: Texture) {
    super();

    

    this.on('resize', () => this.onResize());
  }

  onResize() {
    
  }

}