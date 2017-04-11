import { Container, Texture, Graphics, Rectangle } from 'pixi.js';
import Scale9Grid from './Scale9Grid';
import Layout from './Layout';

export default class Panel extends Layout {

  private foreground: Scale9Grid;
  private background: Scale9Grid;

  constructor(foreground: Texture, background: Texture) {
    super();

    this.background = new Scale9Grid(background, new Rectangle(20, 20, background.width - 40, background.height - 40));
    this.addChild(this.background);

    this.foreground = new Scale9Grid(foreground, new Rectangle(20, 20, background.width - 40, background.height - 40));
    this.addChild(this.foreground);


    this.on('resize', () => this.onResize());
    this.resize(Math.max(this.background.width, this.foreground.width), Math.max(this.background.height, this.foreground.height));
  }

  onResize() {
    this.foreground.width = this.width;
    this.foreground.height = this.height;

    this.background.width = this._width;
    this.background.height = this._height;
  }

}