/// <reference types="pixi.js" />
import { ITextStyleStyle, TextStyle } from 'pixi.js';
import Scale9Grid from './Scale9Grid';
import Padding from './Padding';
import Layout from './Layout';
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
export declare enum Stat {
    default = 0,
    down = 1,
    up = 2,
    over = 3,
    out = 4,
    disabled = 5,
}
export default class Button extends Layout {
    private stats;
    private currentStat;
    private _stat;
    private _disabled;
    private textfield;
    private _text;
    private _defaultTextStyle;
    private _padding;
    constructor(stats: Stats, padding?: Padding);
    onResize(): void;
    defaultTextStyle: ITextStyleStyle;
    text: string;
    private updateResize();
    disabled: boolean;
    stat: Stat;
    private setStat(stat);
    private addTextField();
    add(stat: Stat, texture: Scale9Grid, textStyle?: TextStyle): void;
}
