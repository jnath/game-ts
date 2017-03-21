
import { Sprite, Texture, Graphics } from 'pixi.js';
import { Font, FontOptions, RenderOptions, BoundingBox, Glyph } from 'opentype.js';
import AssetLoader from '../process/AssetLoader';

import TagsMapper, { GlyphData } from './tools/TagsMapper';

declare module 'opentype.js' {
  export interface BoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    isEmpty(): boolean;
    addPoint(x: number, y: number);
    addX(x: number);
    addY(y: number);
    addBezier(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x: number, y: number);
    addQuad(x0: number, y0: number, x1: number, y1: number, x: number, y: number);
  }

  export interface Path {
    getBoundingBox(): BoundingBox;
  }
}


export interface TextStyle {
  fontSize: number;
  fontName: string;
  wordWrap?: boolean;
  options?: FontOptions;
}

export default class TextField extends Sprite {

  private _text: string;

  // private _font: Font;

  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  private _rendererOptions: RenderOptions;
  private _style: TextStyle;

  private _baselineY: number;
  private _lineHeight: number;
  private _font: Font;

  private resolution: number;

  private dirty: boolean;

  private tagsMapper: TagsMapper;

  styles: { [name: string]: TextStyle };

  constructor(text: string, style: TextStyle, rendererOptions?: RenderOptions, canvas?: HTMLCanvasElement) {

    canvas = canvas || document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const texture = Texture.fromCanvas(canvas);

    super(texture);

    this.resolution = 1;

    this._text = text;
    this._rendererOptions = rendererOptions;
    this._style = style;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');

    this._style = style;
    this._style.fontSize = style.fontSize || 12;

    this._font = AssetLoader.getFont(this._style.fontName);

    this.tagsMapper = new TagsMapper(this._text, this._font);

    this.updateText();

  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
    this.tagsMapper.text = this._text;
    this.updateText();
  }

  updateText() {
    let metrics = this.tagsMapper.compute();
    this._canvas.width = metrics.width;
    this._canvas.height = metrics.height;
    metrics.glyphs.forEach((glyph: GlyphData) => {
      glyph.data.draw(this._context, glyph.position[0], glyph.position[1], this._style.fontSize * 10);
    });
    console.log(metrics);
  }

  draw(text: string, style: TextStyle) {

    let font: Font = this._font;

    this._baselineY = font.ascender / font.unitsPerEm * style.fontSize;
    let snapPath = font.getPath(this._text, 0, this._baselineY, style.fontSize, this._rendererOptions);
    let boundingBox: BoundingBox = snapPath.getBoundingBox();

    let x: number = -boundingBox.x1;
    let y: number = this._baselineY - boundingBox.y1;

    this._canvas.width = Math.ceil(boundingBox.x2 - boundingBox.x1);
    this._canvas.height = Math.ceil(boundingBox.y2 - boundingBox.y1);

    font.draw(this._context, this._text, x, y, style.fontSize, this._rendererOptions);
  }

  /**
   * Updates texture size based on canvas size
   *
   * @private
   */
  updateCanvasSize() {

    this._texture.baseTexture.hasLoaded = true;
    this._texture.baseTexture.resolution = this.resolution;
    this._texture.baseTexture.realWidth = this._canvas.width;
    this._texture.baseTexture.realHeight = this._canvas.height;
    this._texture.baseTexture.width = this._canvas.width / this.resolution;
    this._texture.baseTexture.height = this._canvas.height / this.resolution;

    // call sprite onTextureUpdate to update scale if _width or _height were set
    this._onTextureUpdate();
    this._texture.baseTexture.emit('update', this._texture.baseTexture);
  }

  /**
   * Renders the object using the WebGL renderer
   *
   * @param {PIXI.WebGLRenderer} renderer - The renderer
   */
  renderWebGL(renderer: PIXI.WebGLRenderer) {
    if (this.resolution !== renderer.resolution) {
      this.resolution = renderer.resolution;
    }
    this.updateCanvasSize();
    super.renderWebGL(renderer);
  }

  /**
   * Renders the object using the Canvas renderer
   *
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  _renderCanvas(renderer: PIXI.CanvasRenderer) {
    if (this.resolution !== renderer.resolution) {
      this.resolution = renderer.resolution;
    }

    this.updateCanvasSize();
    super._renderCanvas(renderer);
  }

}