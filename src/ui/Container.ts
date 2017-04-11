import { Container } from 'pixi.js';

declare module 'pixi.js' {
    interface Container {
      scaleX: number;
      scaleY: number;
      scaleXY: number;
    }
}

Container.prototype['_scaleXY'] = 1;

Object.defineProperty(Container.prototype, 'scaleX', {
    get: function () { return this.scale.x; },
    set: function (value) {
        this.scale.x = value;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(Container.prototype, 'scaleY', {
    get: function () { return this.scale.y; },
    set: function (value) {
        this.scale.y = value;
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Container.prototype, 'scaleXY', {
    get: function () { return this._scaleXY; },
    set: function (value) {
        this._scaleXY = value;
        this.scaleX = value;
        this.scaleY = value;
    },
    enumerable: true,
    configurable: true
});