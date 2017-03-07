import { Texture, Container, utils, extras, Text, ITextStyleStyle, TextStyle } from 'pixi.js';
import EventEmitter = utils.EventEmitter;
import AnimatedSprite = extras.AnimatedSprite;
import Scale9Grid from './Scale9Grid';
import Layout, { Dock } from './Layout';

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

export default class Button extends Layout {

  private stats: Stats = <any>{};

  private currentStat: Stat;
  private _stat: Stat;
  private _disabled: boolean;

  private textfield: Text;
  private _text: string;

  private _defaultTextStyle: ITextStyleStyle = {};

  constructor(stats: Stats) {
    super();

    this.stats = stats;
    this._defaultTextStyle = this.stats[Stat[Stat.default]].textStyle;

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
    this.on('resize', () => this.onResize());
    this.resize(this.stats[Stat[Stat.default]].background.width, this.stats[Stat[Stat.default]].background.height);
  }

  onResize() {
    for (let key in this.stats ) {
      this.stats[key].background.width = this._width;
      this.stats[key].background.height = this._height;
    }
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
    this.emit('updatePosition');
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
    let lastStat: Stat = stat;
    if (this.currentStat === stat) {
      return;
    }

    if (this.stats[Stat[this.currentStat]]) {
      this.stats[Stat[this.currentStat]].background.visible = false;
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
    this.emit('updatePosition');
    this.emit('updateStat', { lastStat, currentStat: this.currentStat });
  }

  private addTextField() {
    this.textfield = new Text('', this.defaultTextStyle);
    this.textfield.dock = Dock.CENTER | Dock.MIDDLE;
    this.addChild(this.textfield);

  }

  add(stat: Stat, texture: Scale9Grid, textStyle?: TextStyle) {
    texture.visible = false;
    this.stats[Stat[stat]].background = texture;
    this.stats[Stat[stat]].textStyle = textStyle;
    this.addChild(texture);
  }

}