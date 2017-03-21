
import opentype, { Font, Glyph, Metrics } from 'opentype.js';
import WordWrapper, { Mode, WordWrapperOpts, Line, MeasureIterator } from './WordWrapper';

// A default 'line-height' according to Chrome/FF/Safari (Jun 2016)
const DEFAULT_LINE_HEIGHT = 1.175;
const DEFAULT_PX_SIZE = 16;

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
}

export interface Layout {
  glyphs: Array<GlyphData>;
  baseline: number;
  leading: number;
  lines: Array<Line>;
  lineHeight: number;
  left: number;
  right: number;
  maxLineWidth: number;
  width: number;
  height: number;
}

export default class ComputeLayout {

  wordWrapper: WordWrapper;

  _text: string;
  _font: Font;
  _fontSize: number;
  _opts: ComputeLayoutOpts;

  constructor(text: string, font: Font, fontSize: number) {
    this._text = text;
    this._font = font;
    this._fontSize = fontSize;
  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
  }

  getFontSizePx(font: Font, value: number | string, dpi: number = 96) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') throw new TypeError('Expected number or string for getFontPixelSize');
    const parsed = this.parseUnit(value);
    if (!parsed.unit || parsed.unit === 'px') {
      return parsed.num;
    }

    if (parsed.unit === 'em') {
      return parsed.num * DEFAULT_PX_SIZE;
    } else if (parsed.unit === 'pt') {
      return parsed.num * dpi / 72;
    } else {
      throw new TypeError('Unsupported unit for fontSize: ' + parsed.unit);
    }
  }

  parseUnit(str): { num: number; unit: string; } {
    let out = { num: 0, unit: '' };
    str = String(str);
    out.num = parseFloat(str);
    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '';
    return out;
  }

  getEmUnits(font: Font, fontSizePx: number, value: number | { num: number; unit: string; }) {

    let parsed: { num: number; unit: string; } = typeof value === 'number' ? { num: value, unit: 'px', } : this.parseUnit(value);
    if (parsed.unit === 'em') {
      return parsed.num * font.unitsPerEm;
    } else if (parsed.unit === 'px') {
      let pxScale = 1 / font.unitsPerEm * fontSizePx;
      return parsed.num / pxScale;
    } else {
      throw new Error('Invalid unit for getPixelSize: ' + parsed.unit);
    }
  }

  getPxByUnit(value: number) {
    return value / this._font.unitsPerEm * this._fontSize;
  }

  compute(opts: ComputeLayoutOpts = <any>{}): Layout {
    this._opts = opts;
    let font: Font = this._font;
    let text: string = this._text;
    let align: Align = this._opts.align || Align.LEFT;
    let letterSpacing: number = this._opts.letterSpacing || 0;
    let width: number = this._opts.width || Infinity;

    this.wordWrapper = new WordWrapper(this._text, Object.assign(this._opts, {
      measure: this.measure.bind(this)
    }));

    let lines = this.wordWrapper.lines();

    // get max line width from all lines
    let maxLineWidth = lines.reduce((prev, line) => {
      return Math.max(prev, line.width);
    }, 0);

    // As per CSS spec https://www.w3.org/TR/CSS2/visudet.html#line-height
    let AD = Math.abs(font.ascender - font.descender);
    let lineHeight = opts.lineHeight || font.unitsPerEm * DEFAULT_LINE_HEIGHT; // in em units
    let L = lineHeight - AD;

    // Y position is based on CSS line height calculation
    let x = 0;
    let y = font.ascender + L / 2;
    let totalHeight = (AD + L) * lines.length;
    let preferredWidth = isFinite(width) ? width : maxLineWidth;
    let glyphs: Array<GlyphData> = [];
    let lastGlyph = null;

    // Layout by line
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      let line = lines[lineIndex];
      let start = line.start;
      let end = line.end;
      let lineWidth = line.width;

      // Layout by glyph
      for (let j = start, c = 0; j < end; j++ , c++) {
        let char = text.charAt(j);
        let glyph = this.getGlyph(font, char);
        let metrics: Metrics = glyph.getMetrics();
        // TODO:
        // Align center & right are off by a couple pixels, need to revisit.
        if (j === start && align === Align.RIGHT) {
          x -= metrics.leftSideBearing;
        }

        // Apply kerning
        if (lastGlyph) {
          x += font.getKerningValue(glyph, lastGlyph) || 0;
        }

        // Align text
        let tx = 0;
        if (align === Align.CENTER) {
          tx = (preferredWidth - lineWidth) / 2;
        } else if (align === Align.RIGHT) {
          tx = preferredWidth - lineWidth;
        }

        // Store glyph data
        glyphs.push({
          position: { x: x + tx, y: y },
          data: glyph,
          index: j,
          column: c,
          row: lineIndex
        });

        // Advance forward
        x += letterSpacing + this.getAdvance(glyph, char);
        lastGlyph = glyph;
      }

      // Advance down
      y += lineHeight;
      x = 0;
    }

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
      baseline: L / 2 + Math.abs(font.descender),
      leading: L,
      lines: lines,
      lineHeight: lineHeight,
      left: left,
      right: right,
      maxLineWidth: maxLineWidth,
      width: preferredWidth,
      height: totalHeight
    };


  }

  getPosByData(data: GlyphData) {
    let x: number = this.getPxByUnit(glyph.position.x);
  }

  measure(text: string, start: number, end: number, width: number): Line {
    return this.computeMetrics(this._font, text, start, end, width, 0);
  }

  computeMetrics(font: Font, text: string, start: number, end: number, width: number = Infinity, letterSpacing: number = 0): Line {
    start = Math.max(0, start || 0);
    end = Math.min(end || text.length, text.length);

    let pen = 0;
    let count = 0;
    let curWidth = 0;

    for (let i = start; i < end; i++) {
      let char = text.charAt(i);

      // Tab is treated as multiple space characters
      let glyph = this.getGlyph(font, char);
      this.ensureMetrics(glyph);

      // determine kern value to next glyph
      let kerning = 0;
      if (i < end - 1) {
        let nextGlyph = this.getGlyph(font, text.charAt(i + 1));
        kerning += font.getKerningValue(glyph, nextGlyph);
      }

      // determine if the new pen or width is above our limit
      let xMax = glyph.getMetrics().xMax || 0;
      let xMin = glyph.getMetrics().xMin || 0;
      let glyphWidth = xMax - xMin;
      let rsb = this.getRightSideBearing(glyph);
      let newWidth = pen + glyph.getMetrics().leftSideBearing + glyphWidth + rsb;
      if (newWidth > width) {
        break;
      }

      pen += letterSpacing + this.getAdvance(glyph, char) + kerning;
      curWidth = newWidth;
      count++;
    }

    return {
      start: start,
      end: start + count,
      width: curWidth
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

  getAdvance(glyph: Glyph, char: string) {
    // TODO: handle tab gracefully
    return glyph.advanceWidth;
  }

  ensureMetrics(glyph: Glyph) {
    // Opentype.js only builds its paths when the getter is accessed
    // so we force it here.
    return glyph.path;
  }

}

