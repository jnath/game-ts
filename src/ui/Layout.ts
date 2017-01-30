import { Container } from 'pixi.js'

export enum Dock {
  NONE = 1 << 0,
  TOP = 1 << 1,
  BOTTOM = 1 << 2,
  LEFT = 1 << 3,
  RIGHT = 1 << 4,
  CENTER = 1 << 5,
  MIDDLE = 1 << 6,
}

declare module "pixi.js" {
    interface Container{
      dock: Dock
        // dock:{
        //   state: Dock,
        //   x?: number,
        //   y?: number
        // };
    }
}
Container.prototype.dock = Dock.NONE ;

export default class Layout extends Container {

  protected _width: number;
  protected _height: number;

  protected _scaleX: number = 1;
  protected _scaleY: number = 1;
  protected _scaleXY: number = 1;

  constructor(){
    super();
    this.on('updatePosition', () => this._childPositioning());
  }

  private _childPositioning(){
    this.emit('resize');
    this.children.forEach((child: Container)=>{
      if((child.dock & Dock.NONE) == Dock.NONE){
        // console.log('NONE');
        return;
      }
      // console.log('-----------' + child.name + '-------------', child.dock);
      if((child.dock & Dock.TOP) == Dock.TOP){
        child.y = 0;
        // console.log('TOP');
      }
      if((child.dock & Dock.BOTTOM) == Dock.BOTTOM) {
        child.y = ( this._height * this._scaleY ) - child.height;
        // console.log('BOTTOM');
      }
      if((child.dock & Dock.LEFT) == Dock.LEFT) {
        child.x = 0;
        // console.log('LEFT');
      }
      if((child.dock & Dock.RIGHT) == Dock.RIGHT) {
        child.x = ( this._width * this._scaleX ) - child.width;
        // console.log('RIGHT');
      }
      if((child.dock & Dock.CENTER) == Dock.CENTER) {
        child.x = ( ( this._width * this._scaleX ) - child.width ) / 2 ;
        // console.log('CENTER');
      }
      if((child.dock & Dock.MIDDLE) == Dock.MIDDLE) {
        child.y = ( ( this._height * this._scaleY ) - child.height ) / 2 ;
        // console.log('MIDDLE');
      }

      // child.x += child.dock.x || 0;
      // child.y += child.dock.y || 0;

    });
  }

  resize(width:number, height: number){
    this._width = width;
    this._height = height;
    this.emit('updatePosition');
  }

  get width(): number { return this._width };
  set width(value: number){
    this._width = value;
    this.emit('updatePosition');
  }

  get height(): number { return this._height };
  set height(value: number){
    this._height = value;
    this.emit('updatePosition');
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