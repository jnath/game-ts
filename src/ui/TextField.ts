
import { Sprite, Texture, Graphics } from 'pixi.js';
import { Font, FontOptions, RenderOptions, BoundingBox, Glyph, Metrics, Path } from 'opentype.js';
import AssetLoader from '../process/AssetLoader';

import ComputeLayout, { GlyphData, Mode } from './tools/ComputeLayout';
import {TextStyle} from './TextStyle';

import TagMapper, { Styles, Style } from './tools/TagMapper';
// import WordWrapper, { WordWrapperOpts, Line, MeasureIterator } from './tools/WordWrapper';

// Most browsers have a default font size of 16px

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

export default class TextField extends Sprite {

  private _text: string;

  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _rendererOptions: RenderOptions;
  private _baselineY: number;
  private _lineHeight: number;
  private _wordWrap: boolean;

  private resolution: number;
  private computeLayer: ComputeLayout;

  private _styles: Styles;


  constructor(text: string, styles: Styles, rendererOptions?: RenderOptions, canvas?: HTMLCanvasElement) {

    canvas = canvas || document.createElement('canvas');
    canvas.width = 3;
    canvas.height = 3;
    const texture = Texture.fromCanvas(canvas);

    super(texture);

    this.resolution = 1;
    this._wordWrap = false;
    this._text = text;
    this._rendererOptions = rendererOptions;
    this._styles = styles;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');

    // this._styles.fontSize = style.fontSize || 12;

    // this._font = AssetLoader.getFont(this._style.fontName);

    Object.keys(this._styles).forEach((tagName: string) => {
      let style: Style = this._styles[tagName];
      style.font = AssetLoader.getFont(style.fontName);
      return style;
    });

    this.computeLayer = new ComputeLayout(this._text, this._styles);

    this.updateText();

  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
    this.computeLayer.text = this._text;
    this.updateText();
  }

  get width(): number { return this._width; }
  set width(value: number) {
    this._width = value;
    if (this._wordWrap) {
      this.updateText();
    }
  }

  get wordWrap(): boolean { return this._wordWrap; }
  set wordWrap(value: boolean) {
    this._wordWrap = value;
    if (this._wordWrap) {
      this.updateText();
    }
  }

  updateText() {

    // let tagMapper: TagMapper = new TagMapper(this._text, this.styles);

    let fontSizePx = this.computeLayer.getFontSizePx(this._styles.default.font, this._styles.default.fontSize);
    let metrics = this.computeLayer.compute({
      width: this.computeLayer.getEmUnits(this._styles.default.font, fontSizePx, this.width),
      mode: !this._wordWrap || this.width <= 0 ? Mode.NO_WRAP : Mode.GREEDY
    });

    this._width = this.computeLayer.getPxByUnit(metrics.width);
    this._height = this.computeLayer.getPxByUnit(metrics.height);
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    metrics.glyphs.forEach((glyph: GlyphData) => {
      glyph.data.draw(this._context,
        this.computeLayer.getPxByUnit(glyph.position.x),
        this.computeLayer.getPxByUnit(glyph.position.y),
      this._styles.default.fontSize);
    });

  }


  // draw(text: string, style: TextStyle) {

  //   let font: Font = this._font;

  //   this._baselineY = font.ascender / font.unitsPerEm * style.fontSize;
  //   let snapPath = font.getPath(this._text, 0, this._baselineY, style.fontSize, this._rendererOptions);
  //   let boundingBox: BoundingBox = snapPath.getBoundingBox();

  //   let x: number = -boundingBox.x1;
  //   let y: number = this._baselineY - boundingBox.y1;

  //   this._canvas.width = Math.ceil(boundingBox.x2 - boundingBox.x1);
  //   this._canvas.height = Math.ceil(boundingBox.y2 - boundingBox.y1);

  //   font.draw(this._context, this._text, x, y, style.fontSize, this._rendererOptions);
  // }

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