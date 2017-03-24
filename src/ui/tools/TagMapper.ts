
import { TextStyle } from './../TextStyle';
import opentype, { Font, Glyph, Metrics } from 'opentype.js';

export enum DisplayMode {
  INLINE,
  BLOCK
}

export interface Style extends TextStyle {
  font?: Font;
  letterSpacing?: number;
  display?: DisplayMode;
}

export interface Styles {
  default: Style;
  [name: string]: Style;
};

interface TextData {
  text: string;
  style: TextStyle;
}

interface TagDef {
  start: number;
  end: number;
}

interface TagsDef { [tagName: string]: Array<TagDef>; };


const defaultTag: Styles = {
  default: { fontSize: 13 },
  h1: {
    fontSize: 24,
    display: DisplayMode.BLOCK
  },
  h2: {
    fontSize: 22,
    display: DisplayMode.BLOCK
  },
  h3: {
    fontSize: 18,
    display: DisplayMode.BLOCK
  },
  h4: {
    fontSize: 16,
    display: DisplayMode.BLOCK
  },
  h5: {
    fontSize: 12,
    display: DisplayMode.BLOCK
  },
  h6: {
    fontSize: 10,
    display: DisplayMode.BLOCK
  },
  p: {
    fontSize: 13,
    display: DisplayMode.BLOCK
  }
};

export default class TagMapper {

  private _styles: Styles;
  private _text: string;

  private tags: TagsDef = <any>{};

  constructor(text: string, styles: Styles) {
    this._text = text;
    this.styles = styles;
  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
  }

  get styles(): Styles { return this._styles; }
  set styles(value: Styles) {
    this._styles = <any>{};
    let keys: Array<string> = Object.keys(value)
      .concat(Object.keys(defaultTag))
      .reduce((prev, cur) => (prev.indexOf(cur) < 0) ? prev.concat([cur]) : prev, []);

    keys.forEach((tagName: string) => {
      let style: Style = Object.assign({}, defaultTag.default, defaultTag[tagName] || {}, value.default, value[tagName] || {});
      this._styles[tagName] = style;
    });
  }

  cleanText(): string {

    this.tags = <any>{};
    let start: number = 0;
    let a = this._text.replace(/<\/?(\w*)>/g, (tag: string, tagName: string, index: number, text: string) => {
      let rv = '';
      if (!this.tags[tagName]) {
        this.tags[tagName] = [];
      }
      let last: TagDef = this.tags[tagName][this.tags[tagName].length - 1];
      if (!last || last.end) {
        last = <any>{};
        this.tags[tagName].push(last);
      }
      if (tag[1] === '/') {
        last.end = index + start;
        if (this._styles[tagName] && this._styles[tagName].display === DisplayMode.BLOCK) {
          rv = '\n';
        }
      } else {
        last.start = index + start;
      }
      start -= tag.length;
      start += rv.length;
      return rv;
    });

    return a;
  }

  getStyle(index: number): Style {
    let rv: Style;
    Object.keys(this.tags).forEach((tagName: string) => {
      this.tags[tagName].forEach((tagDef: TagDef) => {
        if (index >= tagDef.start && index <= tagDef.end) {
          if (this._styles[tagName]) {
            rv = this._styles[tagName];
          }
        }
      });
    });
    return rv || this._styles.default;
  }



}