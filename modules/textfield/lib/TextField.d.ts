/// <reference types="pixi.js" />
import { Sprite } from 'pixi.js';
import { Align } from './tools/ComputeLayout';
import { Styles, Style } from './tools/TagMapper';
export { Align, Style, Styles };
export interface TextFieldOptions {
    align?: Align;
}
export default class TextField extends Sprite {
    private _text;
    private _canvas;
    private _context;
    private _baselineY;
    private _lineHeight;
    private _wordWrap;
    private resolution;
    private computeLayer;
    private _styles;
    private _align;
    constructor(text: string, styles: Styles, options?: TextFieldOptions, canvas?: HTMLCanvasElement);
    private parseStyle(styles);
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
