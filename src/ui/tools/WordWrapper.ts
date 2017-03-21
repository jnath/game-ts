const newline = /\n/;
const newlineChar = '\n';
const whitespace = /\s/;

export enum Mode {
  NO_WRAP,
  PRE
}

export interface MeasureIterator {
  (text: string, start: number, end: number, width: number): Line;
}

export interface WordWrapperOpts {
  mode?: Mode;
  width?: number;
  start?: number;
  end?: number;
  measure: MeasureIterator;
}

export interface Line {
  start: number;
  end: number;
  width?: number;
}

export default class WordWrapper {

  private _text: string;
  private _opts: WordWrapperOpts;

  constructor(text: string, opt: WordWrapperOpts) {
    this._text = text;
    this._opts = opt;
  }

  splitedText(breakLine: string = '\n') {
    let splite = this.lines();
    return splite.map((line) => {
      return this._text.substring(line.start, line.end);
    }).join(breakLine);
  }

  lines(): Array<Line> {

    let text: string = this._text;
    let opt: WordWrapperOpts = this._opts;

    // zero width results in nothing visible
    if (opt.width === 0 && opt.mode !== Mode.NO_WRAP) {
      return [];
    }

    let width = opt.width || Number.MAX_VALUE;
    let start = opt.start || 0;
    let end = opt.end || text.length;
    let mode = opt.mode;

    let measure = opt.measure || this.monospace.bind(this);
    if (mode === Mode.PRE) {
      return this.pre(measure, text, start, end, width);
    } else {
      return this.greedy(measure, text, start, end, width, mode);
    }
  }

  idxOf(text: string, chr: string, start: number, end: number): number {
    let idx = text.indexOf(chr, start);
    if (idx === -1 || idx > end) {
      return end;
    }
    return idx;
  }

  isWhitespace(chr: string): boolean {
    return whitespace.test(chr);
  }

  pre(measure: MeasureIterator, text: string, start: number, end: number, width: number): Array<Line> {
    let lines = [];
    let lineStart = start;
    for (let i = start; i < end && i < text.length; i++) {
      let chr = text.charAt(i);
      let isNewline = newline.test(chr);

      // If we've reached a newline, then step down a line
      // Or if we've reached the EOF
      if (isNewline || i === end - 1) {
        let lineEnd = isNewline ? i : i + 1;
        let measured = measure(text, lineStart, lineEnd, width);
        lines.push(measured);

        lineStart = i + 1;
      }
    }
    return lines;
  }

  greedy(measure: MeasureIterator, text: string, start: number, end: number, width: number, mode: Mode): Array<Line> {
    // A greedy word wrapper based on LibGDX algorithm
    // https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
    let lines = [];

    let testWidth = width;
    // if Mode.NO_WRAP is specified, we only wrap on newline chars
    if (mode === Mode.NO_WRAP)
      testWidth = Number.MAX_VALUE;

    while (start < end && start < text.length) {
      // get next newline position
      let newLine = this.idxOf(text, newlineChar, start, end);

      // eat whitespace at start of line
      while (start < newLine) {
        if (!this.isWhitespace(text.charAt(start))) {
          break;
        }
        start++;
      }

      // determine visible # of glyphs for the available width
      let measured = measure(text, start, newLine, testWidth);

      let lineEnd = start + (measured.end - measured.start);
      let nextStart = lineEnd + newlineChar.length;

      // if we had to cut the line before the next newline...
      if (lineEnd < newLine) {
        // find char to break on
        while (lineEnd > start) {
          if (this.isWhitespace(text.charAt(lineEnd))) {
            break;
          }
          lineEnd--;
        }
        if (lineEnd === start) {
          if (nextStart > start + newlineChar.length) {
            nextStart--;
          }
          lineEnd = nextStart; // If no characters to break, show all.
        } else {
          nextStart = lineEnd;
          // eat whitespace at end of line
          while (lineEnd > start) {
            if (!this.isWhitespace(text.charAt(lineEnd - newlineChar.length))) {
              break;
            }
            lineEnd--;
          }
        }
      }
      if (lineEnd >= start) {
        let result = measure(text, start, lineEnd, testWidth);
        lines.push(result);
      }
      start = nextStart;
    }
    return lines;
  }

  // determines the visible number of glyphs within a given width
  monospace(text: string, start: number, end: number, width: number): Line {
    let glyphs = Math.min(width, end - start);
    return {
      start: start,
      end: start + glyphs
    };
  }
}
