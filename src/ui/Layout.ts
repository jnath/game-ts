import { Container } from 'pixi.js'

export enum Dock {
  TOP = 1 << 0,
  BOTTOM = 1 << 1,
  LEFT = 1 << 2,
  RIGHT = 1 << 3,
  CENTER = 1 << 4,
  MIDDLE = 1 << 5,
}

declare module "pixi.js" {
    interface Container{
        dock: Dock;
    }
}
Container.prototype.dock = Dock.TOP | Dock.LEFT;

export default class Layout extends Container {

  private _width: number;
  private _height: number;

  constructor(){
    super();
    this.on('resize', () => this._childPositioning());
  }

  private _childPositioning(){
    this.children.forEach((child: Container)=>{
      if((child.dock & Dock.TOP) == Dock.TOP){
        child.y = 0;
      }
      if((child.dock & Dock.BOTTOM) == Dock.BOTTOM) {
        child.y = this.height - child.height;
      }
      if((child.dock & Dock.LEFT) == Dock.LEFT) {
        child.x = 0;
      }
      if((child.dock & Dock.RIGHT) == Dock.RIGHT) {
        child.x = this.width - child.width;
      }
      if((child.dock & Dock.CENTER) == Dock.CENTER) {
        child.x = ( this.width - child.width ) / 2 ;
      }
      if((child.dock & Dock.MIDDLE) == Dock.MIDDLE) {
        child.y = ( this.height - child.height ) / 2 ;
      }
    });
  }

  resize(width:number, height: number){
    this._width = width;
    this._height = height;
    this.emit('resize');
  }

  get width(): number { return this._width };
  set width(value: number){
    this._width = value;
    this.emit('resize');
  }

  get height(): number { return this._height };
  set height(value: number){
    this._height = value;
    this.emit('resize');
  }
  
}