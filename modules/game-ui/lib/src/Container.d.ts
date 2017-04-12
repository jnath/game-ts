import { Container } from 'pixi.js';
declare module 'pixi.js' {
    interface Container {
        scaleX: number;
        scaleY: number;
        scaleXY: number;
    }
}
export default Container;
