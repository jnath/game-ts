import { Texture, Rectangle } from 'pixi.js';

import Panel from '../ui/Panel';
import BtnPlay from './btn/BtnPlay';
import Scale9Grid from '../ui/Scale9Grid';
import { Dock } from '../ui/Layout';

export default class Intro extends Panel {

  playButton: BtnPlay;

  constructor() {

    super(Texture.fromImage('panel_foreground'), Texture.fromImage('panel_background'));

    let defaultBgTextureBtn: Texture = Texture.fromImage('button_blue');

    this.playButton = new BtnPlay();
    this.playButton.dock = Dock.BOTTOM | Dock.CENTER;
    this.playButton.dockY = -20;
    this.addChild(this.playButton);

    this.playButton.on('click', () => this.emit('play'));

  }

}