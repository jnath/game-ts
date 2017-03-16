
import { Sprite, Texture } from 'pixi.js';
import { Font, FontOptions, RenderOptions } from 'opentype.js';
import AssetLoader from '../process/AssetLoader';

export interface TexStyle {
  fontSize: number;
  fontName: string;
  options?: FontOptions;
}

export default class TextField extends Sprite {

  private _text: string;

  private _font: Font;

  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  private _rendererOptions: RenderOptions;
  private _textStyle: TexStyle;

  constructor(text: string, textStyle: TexStyle, rendererOptions?: RenderOptions, canvas?: HTMLCanvasElement) {
    canvas = canvas || document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const texture = Texture.fromCanvas(canvas);

    super(texture);

    this._text = text;
    this._rendererOptions = rendererOptions;
    this._textStyle = textStyle;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');

    this._font = AssetLoader.getFont(this._textStyle.fontName);
    this._font.draw(this._context, this._text, 0, 200, textStyle.fontSize || 12, this._rendererOptions);

    // let snapPath = this._font.getPath(this._text, 0, 200, textStyle.fontSize || 12, this._rendererOptions);
    // this._context.clearRect(0, 0, 940, 300);
    // snapPath.draw(this._context);

    // this._context.getImageData();

  }

}