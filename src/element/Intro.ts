import { Texture, Rectangle } from 'pixi.js';

import Panel from '../ui/Panel';
import BtnPlay from './btn/BtnPlay';
import Scale9Grid from '../ui/Scale9Grid';
import { Dock } from '../ui/Layout';
// import Itg from 'Itg';
// import Motors from 'Motors';

export default class Intro extends Panel {

  playButton: BtnPlay;

  constructor() {

    super(Texture.fromImage('panel_foreground'), Texture.fromImage('panel_background'));

    let defaultBgTextureBtn: Texture = Texture.fromImage('button_blue');

    this.playButton = new BtnPlay();
    console.log(this.playButton.x, this.playButton.y);
    this.playButton.dock = Dock.BOTTOM | Dock.CENTER;
    console.log(this.playButton.x, this.playButton.y);
    this.addChild(this.playButton);
    console.log(this.playButton.x, this.playButton.y);

    this.playButton.on('click', () => {
      // Itg.bet((ticket: Ticket)=>{
      //   ticket
      // })
      // Motors.bet(()=>{

      // })
      // Motors.execute('step', (data:Datas)=>{

      // })
    });

  }

}