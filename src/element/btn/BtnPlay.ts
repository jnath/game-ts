
import { Texture, Rectangle } from 'pixi.js';
import Scale9Grid from 'game-ui/Scale9Grid';
import Button from 'game-ui/Button';
import { Styles, Align } from 'textfield';

export default class BtnPlay extends Button {

  constructor() {


    let defaultBg: Texture = Texture.fromImage('button_blue');
    let overBg: Texture = Texture.fromImage('button_green');
    let downBg: Texture = Texture.fromImage('button_orange');
    let grid9Rect: Rectangle = new Rectangle(20, 20, defaultBg.width - 40, defaultBg.height - 40);
    let textStyleDefault: Styles = {
      default: {
        fontName: 'AcmeFont',
        fontSize: 24,
        fill: '#FFFFFF'
      }
    };

    let textStyleOver: Styles = {
      default: {
        fontName: 'AcmeFont',
        fontSize: 24,
        fill: '#000000'
      }
    };

    let textStyleDown: Styles = {
      default: {
        fontName: 'AcmeFont',
        fontSize: 24,
        fill: '#FF0000'
      }
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

    this.text = 'Play';

  }

}
