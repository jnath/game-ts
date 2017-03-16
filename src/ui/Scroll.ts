import { Container, Texture, Graphics, Rectangle } from 'pixi.js';
import Layout from './Layout';

export default class Scroll extends Layout {

  private masker: Graphics = new Graphics();
  private content: Container = new Container();

  constructor() {
    super();

    this.addChild(this.content);
    this.mask = this.masker;
    this.addChild(this.masker);


    this.on('resize', () => this.onResize());
  }

  onResize() {

    this.masker.clear();
    this.masker.beginFill(0x000000, 1);
    this.masker.drawRect(0, 0, this.width, this.height);
    this.masker.endFill();

    this.content.width = this.width;
    this.content.height = this.height;

  }

}