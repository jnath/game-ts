
import { Texture, Rectangle, ITextStyleStyle } from 'pixi.js';
import Scale9Grid from '../../ui/Scale9Grid';
import Button from '../../ui/Button';

export default class BtnPlay extends Button {

  constructor() {


    let defaultBg: Texture = Texture.fromImage('button_blue');
    let overBg: Texture = Texture.fromImage('button_green');
    let downBg: Texture = Texture.fromImage('button_orange');
    let grid9Rect: Rectangle = new Rectangle(20, 20, defaultBg.width - 40, defaultBg.height - 40);
    let textStyleDefault: ITextStyleStyle = {
      fontFamily: 'komika_axisregular',
      fontSize: 24,
      align: 'center',
      fill: '#FFFFFF'
    };

    let textStyleOver: ITextStyleStyle = {
      fontFamily: 'komika_axisregular',
      fontSize: 24,
      align: 'center',
      fill: '#000000'
    };

    let textStyleDown: ITextStyleStyle = {
      fontFamily: 'komika_axisregular',
      fontSize: 24,
      align: 'center',
      fill: '#FF0000'
    };

    super({
      default: {
        background: new Scale9Grid(defaultBg, grid9Rect),
        textStyle: textStyleDefault
      },
      over: {
        background: new Scale9Grid(overBg, grid9Rect),
        textStyle: textStyleOver
      },
      down: {
        background: new Scale9Grid(downBg, grid9Rect),
        textStyle: textStyleDown
      }
    });

    this.name = "BtnPlay";
    this.text = 'Play';

  }

}
