import opentype, { Font, Glyph } from 'opentype.js';
import WordWrapper, { Mode, Line } from './WordWrapper';
import TagMapper, { Styles, Style } from './TagMapper';
export { Mode };
export declare enum Align {
    LEFT = 0,
    RIGHT = 1,
    CENTER = 2,
}
export interface ComputeLayoutOpts {
    align?: Align;
    width: number;
    mode?: Mode;
}
export interface GlyphData {
    position: {
        x: number;
        y: number;
    };
    data: Glyph;
    index: number;
    column: number;
    row: number;
    style: Style;
}
export interface Layout {
    glyphs: Array<GlyphData>;
    lines: Array<Line>;
    left: number;
    right: number;
    width: number;
    height: number;
}
export default class ComputeLayout {
    wordWrapper: WordWrapper;
    tagMapper: TagMapper;
    _text: string;
    _styles: Styles;
    _opts: ComputeLayoutOpts;
    constructor(text: string, styles: Styles);
    text: string;
    styles: Styles;
    getEmUnits(value: number, style: Style): number;
    getPxByUnit(value: number, style: Style): number;
    compute(opts?: ComputeLayoutOpts): Layout;
    measure(text: string, start: number, end: number, width: number): Line;
    computeMetrics(text: string, start: number, end: number, width?: number, letterSpacing?: number): Line;
    getRightSideBearing(glyph: Glyph): number;
    getGlyph(font: Font, char: string): opentype.Glyph;
}
