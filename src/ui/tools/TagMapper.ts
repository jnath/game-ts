
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

const defaultTag: Styles = {
  default: { fontSize: 13 },
  h1: { fontSize: 24 },
  h2: { fontSize: 22 },
  h3: { fontSize: 18 },
  h4: { fontSize: 16 },
  h5: { fontSize: 12 },
  h6: { fontSize: 10 },
  p: { fontSize: 13 }
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
    // let parser = new DOMParser();
    // let doc = parser.parseFromString(`<body>${this._text}</body>`, 'text/xml');

    // console.log(this._text, doc);

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

    return a;
  }


  /**
   * Simple XML parser
   * @param {String} xml
   * @return {Object}
   */
  parseXML(xml: string): any {

    let beg = -1;
    let end = 0;
    let tmp = 0;
    let current = [];
    let obj = {};
    let from = -1;

    while (true) {

      beg = xml.indexOf('<', beg + 1);
      if (beg === -1)
        break;

      end = xml.indexOf('>', beg + 1);
      if (end === -1)
        break;

      let el = xml.substring(beg, end + 1);
      let c = el[1];

      if (c === '?' || c === '/') {

        let o = current.pop();

        if (from === -1 || o !== el.substring(2, el.length - 1))
          continue;

        let path = current.join('.') + '.' + o;
        let value = xml.substring(from, beg);

        if (typeof (obj[path]) === 'undefined')
          obj[path] = value;
        else if (obj[path] instanceof Array)
          obj[path].push(value);
        else
          obj[path] = [obj[path], value];

        from = -1;
        continue;
      }

      tmp = el.indexOf(' ');
      let hasAttributes = true;

      if (tmp === -1) {
        tmp = el.length - 1;
        hasAttributes = false;
      }

      from = beg + el.length;

      let isSingle = el[el.length - 2] === '/';
      let name = el.substring(1, tmp);

      if (!isSingle)
        current.push(name);

      if (!hasAttributes)
        continue;

      let match = el.match(/\w+\=\".*?\"/g);
      if (match === null)
        continue;

      let attr = {};
      let length = match.length;

      for (let i = 0; i < length; i++) {
        let index = match[i].indexOf('"');
        attr[match[i].substring(0, index - 1)] = match[i].substring(index + 1, match[i].length - 1);
      }

      obj[current.join('.') + (isSingle ? '.' + name : '') + '[]'] = attr;
    }

    return obj;
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