import { TextStyle } from './../TextStyle';
import { Font } from 'opentype.js';
export declare enum DisplayMode {
    INLINE = 0,
    BLOCK = 1,
}
export interface Style extends TextStyle {
    font?: Font;
    letterSpacing?: number;
    display?: DisplayMode;
}
export interface Styles {
    default: Style;
    [name: string]: Style;
}
export default class TagMapper {
    private _styles;
    private _text;
    private tags;
    constructor(text: string, styles: Styles);
    text: string;
    styles: Styles;
    cleanText(): string;
    getStyle(index: number): Style;
}
