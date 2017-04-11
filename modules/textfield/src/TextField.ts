
import { Sprite, Texture, Graphics } from 'pixi.js';
import { Font, FontOptions, RenderOptions, Glyph, Metrics, Path } from 'opentype.js';

import FontLoader from './FontLoader';

import ComputeLayout, { GlyphData, Mode, Align } from './tools/ComputeLayout';
import { TextStyle } from './TextStyle';

import TagMapper, { Styles, Style } from './tools/TagMapper';

// Most browsers have a default font size of 16px


export { Align, Style, Styles }

export interface TextFieldOptions {
  align?: Align;
}

function isStyles(object: any): object is Styles {
    return 'default' in object;
}

export default class TextField extends Sprite {

  private _text: string;

  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _baselineY: number;
  private _lineHeight: number;
  private _wordWrap: boolean;

  private resolution: number;
  private computeLayer: ComputeLayout;

  private _styles: Styles;
  private _align: Align;

  constructor(text: string, styles: Styles | Style, options: TextFieldOptions = {}, canvas?: HTMLCanvasElement) {

    canvas = canvas || document.createElement('canvas');
    canvas.width = 3;
    canvas.height = 3;
    const texture = Texture.fromCanvas(canvas);

    super(texture);

    this.resolution = 1;
    this._wordWrap = false;
    this._text = text;
    this._align = options.align || Align.LEFT;
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this._texture.on('update', () => {
      this.emit('updated');
    });

    let tmpStyles: Styles = { default: {} };
    if (isStyles(styles)) {
      tmpStyles = styles;
    } else {
      tmpStyles.default = styles;
    }

    this.computeLayer = new ComputeLayout(this._text, this.parseStyle(tmpStyles));
    this._styles = this.computeLayer.styles;

    this.updateText();
  }

  private parseStyle(styles: Styles) {
    let _styles = <any>{};
    Object.keys(styles).forEach((tagName: string) => {
      let style: Style = Object.assign({}, styles[tagName]);
      if (style.fontName) {
        style.font = FontLoader.getFont(style.fontName);
      } else if (style.fontFamily) {
        style.font = FontLoader.getFontFamily(style.fontFamily, style.fontSubFamily);
      }
      _styles[tagName] = style;
    });
    return _styles;
  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
    this.computeLayer.text = this._text;
    this.updateText();
  }

  get styles(): Styles { return this._styles; }
  set styles(value: Styles) {
    this.computeLayer.styles = this.parseStyle(value);
    this._styles = this.computeLayer.styles;
    this.updateText();
  }

  get width(): number { return this._width; }
  set width(value: number) {
    this._width = value;
    if (this._wordWrap) {
      this.updateText();
    }
  }

  get align(): Align { return this._align; }
  set align(value: Align) {
    this._align = value;
    this.updateText();
  }

  get wordWrap(): boolean { return this._wordWrap; }
  set wordWrap(value: boolean) {
    this._wordWrap = value;
    this.updateText();
  }

  updateText() {
    let metrics = this.computeLayer.compute({
      width: this._wordWrap ? this.width : null,
      mode: !this._wordWrap || this.width <= 0 ? Mode.NO_WRAP : Mode.GREEDY,
      align: this._align
    });

    this._width = metrics.width;
    this._height = metrics.height;
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    metrics.glyphs.forEach((glyph: GlyphData) => {

      let path: Path = glyph.data.getPath(glyph.position.x, glyph.position.y, glyph.style.fontSize);
      path['fill'] = glyph.style.fill || path['fill'];
      path['stroke'] = glyph.style.stroke || path['stroke'];
      path['strokeWidth'] = glyph.style.strokeWidth || path['strokeWidth'];


      this._context.shadowColor = glyph.style.shadowColor || null;
      this._context.shadowOffsetX = glyph.style.shadowOffsetX || null;
      this._context.shadowOffsetY = glyph.style.shadowOffsetY || null;
      this._context.shadowBlur = glyph.style.shadowBlur || null;

      path.draw(this._context);

    });

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