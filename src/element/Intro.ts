import { Texture } from 'pixi.js';

import Panel from '../ui/Panel';
import Button, { Stat } from '../ui/Button';
import Scale9Grid from '../ui/Scale9Grid';
// import Itg from 'Itg';
// import Motors from 'Motors';

export default class Intro extends Panel {

  playButton: Button;

  constructor() {

    super(Texture.fromImage('panel_foreground'), Texture.fromImage('panel_background'));

    this.playButton = new Button({
      default: {
        background: new Scale9Grid(Texture.fromImage('button_blue')),
        textStyle: {
          fontStyle: 'arial',
          fontSize: 24,
          align: 'center'
        }
      }
    });
    this.playButton.text = 'Play';
    this.addChild(this.playButton);


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