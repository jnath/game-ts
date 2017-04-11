/// <reference types="pixi.js" />
import { Texture } from 'pixi.js';
import Layout from './Layout';
export default class Panel extends Layout {
    private foreground;
    private background;
    constructor(foreground: Texture, background: Texture);
    onResize(): void;
}
