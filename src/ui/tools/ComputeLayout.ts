
import opentype, { Font, Glyph, Metrics } from 'opentype.js';
import WordWrapper, { Mode, WordWrapperOpts, Line, MeasureIterator } from './WordWrapper';
import TagMapper, { Styles, Style } from './TagMapper';

// A default 'line-height' according to Chrome/FF/Safari (Jun 2016)
const DEFAULT_LINE_HEIGHT = 1.175;
// const DEFAULT_PX_SIZE = 16;

export { Mode };

export enum Align {
  LEFT,
  RIGHT,
  CENTER
}

export interface ComputeLayoutOpts {
  align?: Align;
  letterSpacing?: number;
  lineHeight?: number;
  width: number;
  mode?: Mode;
}

export interface GlyphData {
  position: { x: number, y: number };
  data: Glyph;
  index: number;
  column: number;
  row: number;
  style: Style;
}

export interface Layout {
  glyphs: Array<GlyphData>;
  lines: Array<Line>;
  left: number;
  right: number;
  width: number;
  height: number;
}

export default class ComputeLayout {

  wordWrapper: WordWrapper;
  tagMapper: TagMapper;

  _text: string;
  _styles: Styles;
  _opts: ComputeLayoutOpts;

  constructor(text: string, styles: Styles) {
    this._text = text;

    this.tagMapper = new TagMapper(this._text, styles);
    this._styles = this.tagMapper.styles;
  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
    this.tagMapper.text = this._text;
  }

  get styles(): Styles { return this._styles; }
  set styles(value: Styles) {
    this.tagMapper.styles = value;
    this._styles = this.tagMapper.styles;
  }

  getEmUnits(value: number, style: Style) {
    let pxScale = 1 / style.font.unitsPerEm * style.fontSize;
    return value / pxScale;
  }

  getPxByUnit(value: number, style: Style) {
    return value / style.font.unitsPerEm * style.fontSize;
  }

  compute(opts: ComputeLayoutOpts = <any>{}): Layout {
    this._opts = opts;
    let text: string = this.tagMapper.cleanText();
    let align: Align = this._opts.align || Align.LEFT;
    let width: number = this._opts.width || Infinity;
    this.wordWrapper = new WordWrapper(text, Object.assign(this._opts, {
      measure: this.measure.bind(this)
    }));

    let lines = this.wordWrapper.lines();

    // get max line width from all lines
    let maxLineWidth = lines.reduce((prev, line) => Math.max(prev, line.width), 0);

    // Y position is based on CSS line height calculation
    let x = 0;
    let y = 0;
    let totalHeight = 0;
    let preferredWidth = isFinite(width) ? width : maxLineWidth;
    let glyphs: Array<GlyphData> = [];
    let lastGlyph = null;
    let lastLeading: number = 0;
    let maxShadowOffsetY: number = 0;
    let maxShadowOffsetX: number = 0;


    // Layout by line
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let line = lines[lineIndex];
      let start = line.start;
      let end = line.end;
      let lineWidth = line.width;
      let lineAscender: number = 0;
      let lineDescender: number = 0;
      let lineFontSize: number = 0;
      let lineHeight: number = 0;
      let shadowOffsetY: number = 0;
      let shadowOffsetX: number = 0;


      for (let j = start, c = 0; j < end; j++ , c++) {
        let char = text.charAt(j);
        let style: Style = this.tagMapper.getStyle(j);
        lineAscender = Math.max(lineAscender, this.getPxByUnit(style.font.ascender, style));
        lineDescender = Math.max(lineDescender, this.getPxByUnit(style.font.descender, style));
        lineFontSize = Math.max(lineFontSize, style.fontSize);
        shadowOffsetY = Math.max(shadowOffsetY, style.shadowOffsetY || 0);
        shadowOffsetX = style.shadowOffsetX || 0;
      }
      for (let j = start, c = 0; j < end; j++ , c++) {
        let char = text.charAt(j);
        let style: Style = this.tagMapper.getStyle(j);
        lineHeight = Math.max(lineHeight, (style.lineHeight || DEFAULT_LINE_HEIGHT) * lineFontSize);
      }

      // As per CSS spec https://www.w3.org/TR/CSS2/visudet.html#line-height
      let AD = Math.abs(lineAscender - lineDescender);
      let leading = lineHeight - AD;

      totalHeight += lineHeight;
      // lineWidth += shadowOffsetX;

      maxShadowOffsetX = Math.max(maxShadowOffsetX, shadowOffsetX);
      maxShadowOffsetY = Math.max(maxShadowOffsetY, shadowOffsetY);
      y += lineHeight;

      if (lineIndex !== 0) {
        totalHeight += leading;
        y += leading;
      }

      // Layout by glyph
      for (let j = start, c = 0; j < end; j++ , c++) {
        let char = text.charAt(j);
        let style: Style = this.tagMapper.getStyle(j);
        let glyph = this.getGlyph(style.font, char);
        let metrics: Metrics = glyph.getMetrics();

        // TODO:
        // Align center & right are off by a couple pixels, need to revisit.
        if (j === start && align === Align.RIGHT) {
          x -= this.getPxByUnit(metrics.leftSideBearing, style);
        }

        // Apply kerning
        if (lastGlyph) {
          x += this.getPxByUnit(style.font.getKerningValue(glyph, lastGlyph), style) || 0;
        }

        // Align text
        let tx = 0;
        if (align === Align.CENTER) {
          tx = (preferredWidth - lineWidth) / 2;
        } else if (align === Align.RIGHT) {
          tx = preferredWidth - lineWidth;
        }

        if (c === 0) {
          x += -this.getPxByUnit(metrics.xMin, style);
        }

        // Store glyph data
        glyphs.push({
          position: { x: x + tx, y: y },
          data: glyph,
          index: j,
          column: c,
          row: lineIndex,
          style: style
        });
        let letterSpacing: number = style.letterSpacing || 0;
        // Advance forward
        x += letterSpacing + this.getPxByUnit(glyph.advanceWidth, style);
        lastGlyph = glyph;
      }

      // Advance down
      x = 0;
      // totalHeight += lineHeight + leading;
      // y += lineHeight + leading;

      lastLeading = leading;

    }
    totalHeight += lastLeading;


    // Compute left & right values
    let left = 0;
    if (align === Align.CENTER) {
      left = (preferredWidth - maxLineWidth) / 2;
    } else if (align === Align.RIGHT) {
      left = preferredWidth - maxLineWidth;
    }
    let right = Math.max(0, preferredWidth - maxLineWidth - left);

    return {
      glyphs: glyphs,
      lines: lines,
      left: left,
      right: right,
      width: preferredWidth + maxShadowOffsetX,
      height: totalHeight + maxShadowOffsetY
    };

  }

  measure(text: string, start: number, end: number, width: number): Line {
    return this.computeMetrics(text, start, end, width, 0);
  }

  computeMetrics(text: string, start: number, end: number, width: number = Infinity, letterSpacing: number = 0): Line {
    start = Math.max(0, start || 0);
    end = Math.min(end || text.length, text.length);

    let pen = 0;
    let count = 0;
    let curWidth = 0;
    let ligneHeight = 0;

    for (let i = start; i < end; i++) {
      let char = text.charAt(i);
      let style: Style = this.tagMapper.getStyle(i);
      // Tab is treated as multiple space characters
      let glyph = this.getGlyph(style.font, char);

      // determine kern value to next glyph
      let kerning = 0;
      if (i < end - 1) {
        let nextGlyph = this.getGlyph(style.font, text.charAt(i + 1));
        kerning += this.getPxByUnit(style.font.getKerningValue(glyph, nextGlyph), style);
      }

      // determine if the new pen or width is above our limit
      let xMax = glyph.getMetrics().xMax || 0;
      let xMin = glyph.getMetrics().xMin || 0;
      let glyphWidth = xMax - xMin;
      let rsb = this.getRightSideBearing(glyph);
      let newWidth = pen + this.getPxByUnit(glyph.getMetrics().leftSideBearing + glyphWidth + rsb, style);
      if (newWidth > width) {
        break;
      }

      pen += letterSpacing + this.getPxByUnit(glyph.advanceWidth, style) + kerning;
      curWidth = newWidth;
      count++;
    }

    return {
      start: start,
      end: start + count,
      width: curWidth,
    };
  }

  getRightSideBearing(glyph: Glyph) {
    let metrics: Metrics = glyph.getMetrics();
    let glyphWidth = (metrics.xMax || 0) - (metrics.xMin || 0);
    let rsb = glyph.advanceWidth - metrics.leftSideBearing - glyphWidth;
    return rsb;
  }

  getGlyph(font: Font, char: string) {
    let isTab = char === '\t';
    return font.charToGlyph(isTab ? ' ' : char);
  }

}

