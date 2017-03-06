import { Texture, Container, utils, extras, Text, ITextStyleStyle, TextStyle } from 'pixi.js';
import EventEmitter = utils.EventEmitter;
import AnimatedSprite = extras.AnimatedSprite;
import Scale9Grid from './Scale9Grid';

export interface StatContent {
  background: Scale9Grid;
  textStyle?: ITextStyleStyle;
}

export interface Stats {
  [stat: string]: StatContent;
  default: StatContent;
  down?: StatContent;
  up?: StatContent;
  hover?: StatContent;
  out?: StatContent;
  disabled?: StatContent;
}

export enum Stat {
  default,
  down,
  up,
  hover,
  out,
  disabled,
}

export default class Button extends Container {

  private stats: Stats = <any>{};

  private currentStat: Stat;
  private _stat: Stat;
  private _disabled: boolean;

  private _width: number = 0;
  private _height: number = 0;

  private textfield: Text;
  private _text: string;

  private _defaultTextStyle: ITextStyleStyle = {};

  constructor(stats: Stats) {
    super();

    this.stats = stats;

    this.interactive = true;
    this.buttonMode = true;
    this.on('mousedown', () => this.stat = Stat.down );
    this.on('mouseup', () => this.stat = Stat.up );
    this.on('mouseover', () => this.stat = Stat.hover );
    this.on('mouseout', () => this.stat = Stat.out );

    for (let key in this.stats ) {
      if (!this.stats[key]) {
        continue;
      }
      this.stats[key].background.visible = false;
      this.addChild(this.stats[key].background);
    }

    this.stat = Stat.default;
  }

  get defaultTextStyle(): ITextStyleStyle { return this._defaultTextStyle; }
  set defaultTextStyle(value: ITextStyleStyle) {
    this._defaultTextStyle = value;
  }

  get text(): string { return this._text; }
  set text(value: string) {
    this._text = value;
    if (!this.textfield) {
      this.addTextField();
    }
    this.textfield.text = this._text;
  }

  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
    this.setStat(this._disabled ? Stat.disabled : this.stat);
  }

  get stat(): Stat { return this._stat; }
  set stat(value: Stat) {
    this._stat = value;
    this.setStat(this._stat);
  }

  private setStat(stat: Stat) {
    if (this.currentStat === stat) {
      return;
    }

    if (this.stats[Stat[this.currentStat]]) {
      this.stats[this.currentStat].background.visible = false;
    }

    this.currentStat = stat;
    if (!this.stats[Stat[this.currentStat]]) {
      return this.stat = Stat.default;
    }

    this.stats[Stat[this.currentStat]].background.visible = true;

    if (this.stats[Stat[this.currentStat]].textStyle && !this.textfield) {
      this.addTextField();
    }

    this.textfield.style = new TextStyle(Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle));
  }

  private addTextField() {
    this.textfield = new Text();
    this.addChild(this.textfield);
  }

  add(stat: Stat, texture: Scale9Grid, textStyle?: TextStyle) {
    texture.visible = false;
    this.stats[stat].background = texture;
    this.stats[stat].textStyle = textStyle;
    this.addChild(texture);
  }

  get width(): number { return this._width; }
  set width(value: number) {
    this._width = value;
    for (let key in this.stats ) {
      this.stats[key].background.width = this._width;
    }
  }

  get height(): number { return this._height; }
  set height(value: number) {
    this._height = value;
    for (let key in this.stats ) {
      this.stats[key].background.height = this._height;
    }
  }

}