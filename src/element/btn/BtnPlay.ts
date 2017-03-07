
import { Texture, Rectangle, ITextStyleStyle } from 'pixi.js';
import Scale9Grid from '../../ui/Scale9Grid';
import Button from '../../ui/Button';

export default class BtnPlay extends Button {

  constructor() {

    let defaultBg: Texture = Texture.fromImage('button_blue');
    let grid9Rect: Rectangle = new Rectangle(20, 20, defaultBg.width - 40, defaultBg.height - 40);
    let textStyle: ITextStyleStyle = {
      fontFamily: 'komika_axisregular',
      fontSize: 24,
      align: 'center',
      fill: '#FFFFFF'
    };

    super({
      default: {
        background: new Scale9Grid(defaultBg, grid9Rect),
        textStyle: textStyle
      }
    });

  }

}
