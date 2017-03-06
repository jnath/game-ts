import { Sprite, Texture, Rectangle } from 'pixi.js';

import Layout, { Dock } from './Layout';

export default class Scale9Grid extends Layout {

  private _tl: Sprite;
  private _tc: Sprite;
  private _tr: Sprite;

  private _ml: Sprite;
  private _mc: Sprite;
  private _mr: Sprite;

  private _bl: Sprite;
  private _bc: Sprite;
  private _br: Sprite;

  constructor(texture: Texture, grid9?: Rectangle) {
    super();

    grid9 = grid9 ? grid9 : new Rectangle(10, 10, texture.width - 20, texture.height - 20);


    let frameTl: Rectangle = new Rectangle(0, 0, grid9.top, grid9.left);
    this._tl = new Sprite(this.crop(texture, frameTl));
    this._tl.dock = Dock.TOP | Dock.LEFT;
    this.addChild(this._tl);

    let frameTr: Rectangle = new Rectangle(grid9.right, 0, texture.width - grid9.right, grid9.top);
    this._tr = new Sprite(this.crop(texture, frameTr));
    this._tr.dock = Dock.TOP | Dock.RIGHT;
    this.addChild(this._tr);

    let frameBl: Rectangle = new Rectangle(0, grid9.bottom, grid9.top, texture.height - grid9.bottom);
    this._bl = new Sprite(this.crop(texture, frameBl));
    this._bl.dock = Dock.BOTTOM | Dock.LEFT;
    this.addChild(this._bl);

    let frameBr: Rectangle = new Rectangle(grid9.right, grid9.bottom, texture.width - grid9.right, texture.height - grid9.bottom);
    this._br = new Sprite(this.crop(texture, frameBr));
    this._br.dock = Dock.BOTTOM | Dock.RIGHT;
    this.addChild(this._br);

    let frameMl: Rectangle = new Rectangle(0, grid9.top, grid9.left, grid9.bottom - grid9.top);
    this._ml = new Sprite(this.crop(texture, frameMl));
    this._ml.dock = Dock.MIDDLE | Dock.LEFT;
    this.addChild(this._ml);

    let frameMr: Rectangle = new Rectangle(grid9.right, grid9.top, texture.width - grid9.right, grid9.bottom - grid9.top);
    this._mr = new Sprite(this.crop(texture, frameMr));
    this._mr.dock = Dock.MIDDLE | Dock.RIGHT;
    this.addChild(this._mr);

    let frameTc: Rectangle = new Rectangle(grid9.left, 0, grid9.right - grid9.left, grid9.top);
    this._tc = new Sprite(this.crop(texture, frameTc));
    this._tc.dock = Dock.TOP | Dock.CENTER;
    this.addChild(this._tc);

    let frameBc: Rectangle = new Rectangle(grid9.left, grid9.bottom, grid9.right - grid9.left, texture.height - grid9.bottom);
    this._bc = new Sprite(this.crop(texture, frameBc));
    this._bc.dock = Dock.BOTTOM | Dock.CENTER;
    this.addChild(this._bc);

    this._mc = new Sprite(this.crop(texture, grid9));
    this._mc.dock = Dock.MIDDLE | Dock.CENTER;
    this.addChild(this._mc);

    this.on('resize', () => this.resizeHandler());
    this.resize(texture.width, texture.height);

  }

  private resizeHandler() {
    this._tc.width = ( this._width * this._scaleX ) - ( this._tl.width + this._tr.width);
    this._bc.width = ( this.width * this._scaleX ) - ( this._bl.width + this._br.width);
    this._ml.height = ( this.height * this._scaleY ) - (this._tl.height + this._bl.height);
    this._mr.height = ( this.height * this._scaleY ) - ( this._tr.height + this._br.height);

    this._mc.width = ( this.width * this._scaleX ) - ( this._ml.width + this._mr.width );
    this._mc.height = ( this.height * this._scaleY ) - ( this._tc.height + this._bc.height);
  }

  private crop(texture: Texture, rect: Rectangle): Texture {
    let trim: Rectangle = new Rectangle(0, 0, rect.width, rect.height);
    return new Texture(texture.baseTexture, rect, rect, trim);

  }

}