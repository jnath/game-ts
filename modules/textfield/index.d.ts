// Generated by dts-bundle v0.7.2
// Dependencies for this module:
//   ../pixi.js
//   ../opentype.js

declare module 'textfield' {
    import TextField from 'textfield/TextField';
    export default TextField;
    export { Align, Style, Styles, TextFieldOptions } from 'textfield/TextField';
    export { default as TextStyle } from 'textfield/TextStyle';
    export { default as FontLoader, Font } from 'textfield/FontLoader';
}

declare module 'textfield/TextField' {
    import { Sprite } from 'pixi.js';
    import { Align } from 'textfield/tools/ComputeLayout';
    import { Styles, Style } from 'textfield/tools/TagMapper';
    export { Align, Style, Styles };
    export interface TextFieldOptions {
            align?: Align;
    }
    export default class TextField extends Sprite {
            constructor(text: string, styles: Styles, options?: TextFieldOptions, canvas?: HTMLCanvasElement);
            text: string;
            styles: Styles;
            width: number;
            align: Align;
            wordWrap: boolean;
            updateText(): void;
            /**
                * Updates texture size based on canvas size
                *
                * @private
                */
            updateCanvasSize(): void;
            /**
                * Renders the object using the WebGL renderer
                *
                * @param {PIXI.WebGLRenderer} renderer - The renderer
                */
            renderWebGL(renderer: PIXI.WebGLRenderer): void;
            /**
                * Renders the object using the Canvas renderer
                *
                * @private
                * @param {PIXI.CanvasRenderer} renderer - The renderer
                */
            _renderCanvas(renderer: PIXI.CanvasRenderer): void;
    }
}

declare module 'textfield/TextStyle' {
    export interface TextStyle {
        fontFamily?: string;
        fontSubFamily?: string;
        fontName?: string;
        fontSize?: number;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        lineHeight?: number;
        interLine?: number;
        shadowColor?: string;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
        shadowBlur?: number;
    }
}

declare module 'textfield/FontLoader' {
    import { Font } from 'opentype.js';
    export { Font };
    export default class FontLoader {
        static getFontFamily(fontFamily: string, fontSubfamily?: string): Font;
        static getFont(name: string): Font;
        static load(url: string, cb: (err: Error, font?: Font) => void): void;
    }
}

declare module 'textfield/tools/ComputeLayout' {
    import opentype, { Font, Glyph } from 'opentype.js';
    import WordWrapper, { Mode, Line } from 'textfield/tools/WordWrapper';
    import TagMapper, { Styles, Style } from 'textfield/tools/TagMapper';
    export { Mode };
    export enum Align {
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
}

declare module 'textfield/tools/TagMapper' {
    import { TextStyle } from 'textfield/TextStyle';
    import { Font } from 'opentype.js';
    export enum DisplayMode {
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
        constructor(text: string, styles: Styles);
        text: string;
        styles: Styles;
        cleanText(): string;
        getStyle(index: number): Style;
    }
}

declare module 'textfield/tools/WordWrapper' {
    export enum Mode {
        GREEDY = 0,
        NO_WRAP = 1,
        PRE = 2,
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
        constructor(text: string, opts: WordWrapperOpts);
        textWordWraped(breakLine?: string): string;
        lines(): Array<Line>;
        idxOf(text: string, chr: string, start: number, end: number): number;
        isWhitespace(chr: string): boolean;
        pre(measure: MeasureIterator, text: string, start: number, end: number, width: number): Array<Line>;
        greedy(measure: MeasureIterator, text: string, start: number, end: number, width: number, mode: Mode): Array<Line>;
        monospace(text: string, start: number, end: number, width: number): Line;
    }
}
