/// <reference types="pixi.js" />
import { Container, Texture } from 'pixi.js';
export default class Parallax extends Container {
    private tillings;
    private _move;
    constructor();
    add(texture: Texture): void;
    move: number;
}
