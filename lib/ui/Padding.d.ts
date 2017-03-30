/// <reference types="pixi.js" />
import { utils } from 'pixi.js';
import EventEmitter = utils.EventEmitter;
export default class Padding extends EventEmitter {
    private _top;
    private _bottom;
    private _left;
    private _right;
    constructor(top?: number, bottom?: number, left?: number, right?: number);
    top: number;
    bottom: number;
    left: number;
    right: number;
}
