import { Container } from 'pixi.js';
import Padding from './Padding';
export default class ProgressBar extends Container {
    padding: Padding;
    private bg;
    private progress;
    private _percent;
    private masker;
    constructor(padding?: Padding);
    percent: number;
    private updatePosition();
}
