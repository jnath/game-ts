import { Container, Texture } from 'pixi.js';
import Scale9Grid from './Scale9Grid';

export default class Panel extends Container {

  private background: Scale9Grid;

  constructor(background: Texture) {
    super();

    this.background = new Scale9Grid(background);
    this.addChild(this.background);

  }


}