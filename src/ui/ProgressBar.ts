import { Container, Sprite, Texture, Rectangle, Graphics } from 'pixi.js';

import Scale9Grid from './Scale9Grid';
import Padding from './Padding';

export default class ProgressBar extends Container {

  private bg: Sprite;
  private progress: Scale9Grid;

  private _percent: number = 0;

  private masker: Graphics = new Graphics();

  constructor(public padding: Padding = new Padding()) {
    super();

    this.bg = Sprite.fromImage('progress-bg');
    this.addChild(this.bg);

    this.progress = new Scale9Grid(Texture.fromImage('progress-percent'));
    this.addChild(this.progress);
    // this.progress.mask = this.masker;
    // this.progress.addChild(this.masker);

    this.padding.on('update', () => this.updatePosition());
    this.updatePosition();

  }

  get percent(): number { return this._percent; }
  set percent(value: number) {
    this._percent = value;
    if (this._percent > 1) {
      this._percent = 1;
      return;
    }
    this.progress.scaleX = this._percent;
  }

  private updatePosition() {
    this.progress.x = this.padding.left;
    this.progress.y = this.padding.top;
    this.progress.width = this.width - this.padding.right;
    this.progress.height = this.height - this.padding.bottom;
    this.masker.clear();
    this.masker.beginFill(0x000000, 0);
    this.masker.drawRect(0, 0, this.progress.width, this.progress.height);
    this.masker.endFill();
  }

}