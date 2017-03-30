/// <reference types="pixi.js" />
import { Container, ticker } from 'pixi.js';
import Ticker = ticker.Ticker;
import Parallax from './component/Parallax';
import Hero from './element/Hero';
export default class GamePlay extends Container {
    parallax: Parallax;
    hero: Hero;
    ticker: Ticker;
    impulse: number;
    floor: number;
    constructor();
    start(): void;
    stop(): void;
    private tick();
}
