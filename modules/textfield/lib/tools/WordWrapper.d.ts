export declare enum Mode {
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
    private _text;
    private _opts;
    constructor(text: string, opts: WordWrapperOpts);
    textWordWraped(breakLine?: string): string;
    lines(): Array<Line>;
    idxOf(text: string, chr: string, start: number, end: number): number;
    isWhitespace(chr: string): boolean;
    pre(measure: MeasureIterator, text: string, start: number, end: number, width: number): Array<Line>;
    greedy(measure: MeasureIterator, text: string, start: number, end: number, width: number, mode: Mode): Array<Line>;
    monospace(text: string, start: number, end: number, width: number): Line;
}
