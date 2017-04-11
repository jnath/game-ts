import { Container } from 'pixi.js';

export enum Dock {
  NONE = 1 << 0,
  TOP = 1 << 1,
  BOTTOM = 1 << 2,
  LEFT = 1 << 3,
  RIGHT = 1 << 4,
  CENTER = 1 << 5,
  MIDDLE = 1 << 6,
}

declare module 'pixi.js' {
  interface Container {
    dock: Dock;
    dockX?: number;
    dockY?: number;
    dockPivot: (x: number, y: number) => void;
  }
}
Container.prototype.dock = Dock.NONE ;
Container.prototype.dockPivot = function(x: number, y: number){
  this.pivot.x = x;
  this.pivot.y = y;
  this.dockX = this.pivot.x;
  this.dockY = this.pivot.y;
};

// Container.prototype['_dockX'] = 0;
// Object.defineProperty(Container.prototype, 'dockX', {
//     get: function () { return this._dockX; },
//     set: function (value) {
//         this._dockX = value;
//         if (this.parent && this.parent.childDock){
//           this.parent.childDock(this);
//         }
//     },
//     enumerable: true,
//     configurable: true
// });

// Container.prototype['_dockY'] = 0;
// Object.defineProperty(Container.prototype, 'dockY', {
//     get: function () { return this._dockX; },
//     set: function (value) {
//         this._dockY = value;
//         if (this.parent && this.parent.childDock){
//           this.parent.childDock(this);
//         }
//     },
//     enumerable: true,
//     configurable: true
// });

export default class Layout extends Container {

  protected _width: number;
  protected _height: number;

  protected _scaleX: number = 1;
  protected _scaleY: number = 1;
  protected _scaleXY: number = 1;

  constructor() {
    super();
    this.on('updatePosition', () => this.childPositioning());
    this.onChildrenChange = () => this.childPositioning();
  }

  protected childDock(child: Container) {
    if ((child.dock & Dock.NONE) === Dock.NONE) {
      return;
    }
    if ((child.dock & Dock.TOP) === Dock.TOP) {
      child.y = 0;
    }
    if ((child.dock & Dock.BOTTOM) === Dock.BOTTOM) {
      child.y = ( this._height * this._scaleY ) - ( child.height || 0 );
    }
    if ((child.dock & Dock.LEFT) === Dock.LEFT) {
      child.x = 0;
    }
    if ((child.dock & Dock.RIGHT) === Dock.RIGHT) {
      child.x = ( this._width * this._scaleX ) - ( child.width || 0 );
    }
    if ((child.dock & Dock.CENTER) === Dock.CENTER) {
      child.x = ( ( this._width * this._scaleX ) - ( child.width || 0 ) ) / 2 ;
    }
    if ((child.dock & Dock.MIDDLE) === Dock.MIDDLE) {
      child.y = ( ( this._height * this._scaleY ) - ( child.height || 0 ) ) / 2 ;
    }

    child.x += child.dockX || 0;
    child.y += child.dockY || 0;
  }

  protected childPositioning() {
    this.emit('resize');
    this.children.forEach((child: Container) => this.childDock(child));
    if (this.parent && this.parent instanceof Layout) {
      this.parent.childDock(this);
    }
  }

  resize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.emit('updatePosition');
  }

  get width(): number { return this._width; };
  set width(value: number){
    this.resize(value, this._height);
  }

  get height(): number { return this._height; };
  set height(value: number){
    this.resize(this._width, value);
  }

  get scaleX(): number { return this._scaleX; }
  set scaleX(value: number) {
    this._scaleX = value;
    this.emit('updatePosition');
  }

  get scaleY(): number { return this._scaleY; }
  set scaleY(value: number) {
    this._scaleY = value;
    this.emit('updatePosition');
  }

  get scaleXY(): number { return this._scaleXY; }
  set scaleXY(value: number) {
    this._scaleXY = value;
    this._scaleX = value;
    this._scaleY = value;
    this.emit('updatePosition');
  }

}