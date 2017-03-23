
import { TextStyle } from './../TextStyle';
import opentype, { Font, Glyph, Metrics } from 'opentype.js';


export interface Style extends TextStyle {
  font?: Font;
  letterSpacing?: number;
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

export default class TagMapper {

  private _styles: Styles;
  private _text: string;

  private tags: TagsDef = <any>{};

  constructor(text: string, styles: Styles) {

    this._styles = styles;
    this._text = text;


  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
  }

  get styles(): Styles { return this._styles; }
  set styles(value: Styles) {
    this._styles = value;
  }

  cleanText(): string {
    this.tags = <any>{};
    let start: number = 0;
    let a = this._text.replace(/<\/?(\w*)>/g, (tag, tagName, index, text) => {
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
      } else {
        last.start = index + start;
      }
      start -= tag.length;
      return '';
    });

    console.log(this.tags);
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