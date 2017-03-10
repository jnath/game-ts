import { Texture, Container, utils, extras, Text, ITextStyleStyle, TextStyle } from 'pixi.js';
import EventEmitter = utils.EventEmitter;
import AnimatedSprite = extras.AnimatedSprite;
import Scale9Grid from './Scale9Grid';
import Padding from './Padding';
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
  over?: StatContent;
  out?: StatContent;
  disabled?: StatContent;
}

export enum Stat {
  default,
  down,
  up,
  over,
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

  private _padding: Padding = new Padding(20, 20, 20, 20);

  constructor(stats: Stats, padding?: Padding) {
    super();

    this.stats = stats;
    this._defaultTextStyle = this.stats[Stat[Stat.default]].textStyle;
    this._padding = padding || this._padding;

    this.interactive = true;
    this.buttonMode = true;
    this.on('mousedown', () => this.stat = Stat.down );
    this.on('mouseup', () => this.stat = Stat.up );
    this.on('mouseover', () => this.stat = Stat.over );
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
    this.textfield.texture.baseTexture.once('update', () => this.updateResize());
    this.textfield.text = this._text;
  }

  private updateResize() {
    this.resize(
      this.textfield.width + this._padding.left + this._padding.right,
      this.textfield.height + this._padding.top + this._padding.bottom
    );
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
    this.textfield.texture.baseTexture.once('update', () => this.updateResize());
    this.textfield.style = new TextStyle(Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle));
    this.emit('updateStat', { lastStat, currentStat: this.currentStat });
  }

  private addTextField() {
    this.textfield = new Text(' ', Object.assign({}, this.defaultTextStyle, this.stats[Stat[this.currentStat]].textStyle));
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