
import { Container, Sprite, Texture } from 'pixi.js';

import AssetLoader, { Loader } from './process/AssetLoader';

import Layout, { Dock } from './ui/Layout';
import ProgressBar from './ui/ProgressBar';
import Padding from './ui/Padding';
import Panel from './ui/Panel';
import Position from './process/Position';

import gsap from 'gsap';
declare var Elastic: any;

export default class Game extends Layout {

  progress: ProgressBar;
  background: Sprite;

  constructor() {
    super();

    this.background = Sprite.fromImage('background');
    this.background.dock = Dock.MIDDLE | Dock.CENTER;
    this.addChild(this.background);

    this.progress = new ProgressBar(new Padding(10, 10, 15, 15));
    this.progress.dockPivot(this.progress.width / 2, this.progress.height / 2);
    this.progress.dock = Dock.MIDDLE | Dock.CENTER;
    this.progress.visible = false;
    this.addChild(this.progress);

    setTimeout(() => {
      this.load('all', () => {
        let panel: Panel = new Panel(Texture.fromImage('panel'));
        panel.dockPivot(panel.width / 2, panel.height / 2);
        panel.dock = Dock.CENTER | Dock.MIDDLE;
        this.addChild(panel);
        gsap.from(panel, 1, { scaleXY: 0, ease: Elastic.easeOut.config(1, 0.3) });
      });
    }, 1000);

    this.on('resize', () => Position.cover(this, this.background));
  }

  load(cathName: string, cb: () => void) {
    let loader: Loader = AssetLoader.get(cathName);
    loader.onProgress.add((a: Loader) => {
      gsap.to(this.progress, .5, { percent: a.progress / 100 });
    });
    loader.onComplete.once(() => {
      loader.onProgress.detachAll();
      gsap.to(this.progress, .5, { percent: 1 });
      gsap.to(this.progress, .25, { scaleXY: 0, delay: 1, onComplete: () => {
        this.progress.visible = false;
        cb();
      }});
    });

    this.progress.visible = true;
    this.progress.scaleXY = 0;
    this.progress.percent = 0.1;
    gsap.to(this.progress, 1, { scaleXY: 1, ease: Elastic.easeOut.config(1, 0.3), onComplete: () => {
      loader.load();
    }});

  }

}
