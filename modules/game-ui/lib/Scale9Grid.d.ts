/// <reference types="pixi.js" />
import { Texture, Rectangle } from 'pixi.js';
import Layout from './Layout';
export default class Scale9Grid extends Layout {
    private _tl;
    private _tc;
    private _tr;
    private _ml;
    private _mc;
    private _mr;
    private _bl;
    private _bc;
    private _br;
    constructor(texture: Texture, grid9?: Rectangle);
    private resizeHandler();
    private crop(texture, rect);
}
