import { Texture, Rectangle } from 'pixi.js';

import Panel from 'game-ui/Panel';
import BtnPlay from './btn/BtnPlay';
import Scale9Grid from 'game-ui/Scale9Grid';
import { Dock } from 'game-ui/Layout';
import TextField from 'textfield';

export default class Intro extends Panel {

  playButton: BtnPlay;
  content: TextField;

  constructor() {

    super(Texture.fromImage('panel_foreground'), Texture.fromImage('panel_background'));

    let defaultBgTextureBtn: Texture = Texture.fromImage('button_blue');

    this.content = new TextField('<h1>This game is a poc</h1><p>This is a textfield, work with svg font TTF OTF or WOFF</p>', {
      default: {
        fontName: 'AcmeFont',
        fill: 'grey',
        shadowColor: 'white',
        shadowBlur: 10,
        shadowOffsetX: 5
      },
      h1: {
        fill: 'black'
      },
    });
    this.content.wordWrap = true;
    this.content.width = this.width;
    this.content.dock = Dock.CENTER | Dock.TOP;
    this.content.dockY = 20;
    this.addChild(this.content);

    this.playButton = new BtnPlay();
    this.playButton.dock = Dock.BOTTOM | Dock.CENTER;
    this.playButton.dockY = 20;
    this.addChild(this.playButton);

    this.playButton.on('click', this.click.bind(this));
    this.playButton.on('tap', this.click.bind(this));

  }

  private click() {
    this.emit('play');
  }

}