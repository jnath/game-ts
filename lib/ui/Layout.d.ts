import { Container } from 'pixi.js';
export declare enum Dock {
    NONE = 1,
    TOP = 2,
    BOTTOM = 4,
    LEFT = 8,
    RIGHT = 16,
    CENTER = 32,
    MIDDLE = 64,
}
declare module 'pixi.js' {
    interface Container {
        dock: Dock;
        dockX?: number;
        dockY?: number;
        dockPivot: (x: number, y: number) => void;
    }
}
export default class Layout extends Container {
    protected _width: number;
    protected _height: number;
    protected _scaleX: number;
    protected _scaleY: number;
    protected _scaleXY: number;
    constructor();
    protected childDock(child: Container): void;
    protected childPositioning(): void;
    resize(width: number, height: number): void;
    width: number;
    height: number;
    scaleX: number;
    scaleY: number;
    scaleXY: number;
}
