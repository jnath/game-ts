
import { utils } from 'pixi.js';
import EventEmitter = utils.EventEmitter;

export default class Padding extends EventEmitter {

  private _top: number;
  private _bottom: number;
  private _left: number;
  private _right: number;

  constructor(top:number = 0, bottom:number = 0, left:number = 0, right:number = 0){
    super();
    this._top = top;
    this._bottom = bottom + top;
    this._left = left;
    this._right = right + left;
  }

  get top(): number { return this._top; }
  set top(value:number){
    this._top = value;
    this.emit('update');
  }

  get bottom(): number { return this._bottom; }
  set bottom(value:number){
    this._bottom = value + this._top;
    this.emit('update');
  }

  get left(): number { return this._left; }
  set left(value:number){
    this._left = value;
    this.emit('update');
  }

  get right(): number { return this._right; }
  set right(value:number){
    this._right = value + this.right;
    this.emit('update');
  }

} 