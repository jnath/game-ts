import { Texture, Rectangle } from 'pixi.js';

import Panel from '../ui/Panel';
import BtnPlay from './btn/BtnPlay';
import Scale9Grid from '../ui/Scale9Grid';
// import Itg from 'Itg';
// import Motors from 'Motors';

export default class Intro extends Panel {

  playButton: BtnPlay;

  constructor() {

    super(Texture.fromImage('panel_foreground'), Texture.fromImage('panel_background'));

    let defaultBgTextureBtn: Texture = Texture.fromImage('button_blue');

    this.playButton = new BtnPlay();
    this.addChild(this.playButton);
    this.playButton.text = 'Play';

    this.playButton.on('tap', () => {
      this.playButton.text = 'BLA';
      this.playButton.resize(Math.random()*500,Math.random()*500);
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