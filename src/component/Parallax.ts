
import { Container, Texture, extras } from 'pixi.js';
import TilingSprite = extras.TilingSprite;

export default class Parallax extends Container {

  private tillings: Array<TilingSprite> = [];

  private _move: number = 0;

  constructor() {
    super();
  }

  add(texture: Texture) {
    let parallaxSprite: TilingSprite = new TilingSprite(texture, texture.baseTexture.width, texture.baseTexture.height);
    this.tillings.push(parallaxSprite);
    this.addChild(parallaxSprite);
  }

  get move(): number { return this._move; }
  set move(value: number) {
    this._move = value;

    this.tillings.forEach((tilling: TilingSprite, i: number) => {
      let speed: number = i / this.tillings.length;
      tilling.tilePosition.x = this._move * speed;
    });
  }

}