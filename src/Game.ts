
import { Container, Sprite, Texture } from 'pixi.js';

import AssetLoader, { Loader } from './process/AssetLoader';

import Layout, { Dock } from './ui/Layout';
import ProgressBar from './ui/ProgressBar';
import Padding from './ui/Padding';
import Panel from './ui/Panel';

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
    this.progress.pivot.x = this.progress.width / 2;
    this.progress.pivot.y = this.progress.height / 2;
    this.progress.dockX = this.progress.pivot.x;
    this.progress.dockY = this.progress.pivot.y;
    this.progress.dock = Dock.MIDDLE | Dock.CENTER;
    this.progress.visible = false;
    this.addChild(this.progress);

    setTimeout(() => {
      this.load('all', () => {
        let panel: Panel = new Panel(Texture.fromImage('panel'));
        panel.pivot.x = panel.width / 2;
        panel.pivot.y = panel.height / 2;
        panel.dockX = panel.pivot.x;
        panel.dockY = panel.pivot.y;
        panel.dock = Dock.CENTER | Dock.MIDDLE;
        this.addChild(panel);
        gsap.from(panel.scale, 1, {
          x: 0,
          y: 0 ,
          ease: Elastic.easeOut.config(1, 0.3),
        });
      });
    }, 1000);
  }

  load(cathName: string, cb: () => void) {
    let loader: Loader = AssetLoader.get(cathName);
    loader.onProgress.add((a: Loader) => {
      gsap.to(this.progress, .5, { percent: a.progress / 100 });
    });
    loader.onComplete.once(() => {
      loader.onProgress.detachAll();
      gsap.to(this.progress, .5, { percent: 1 });
      gsap.to(this.progress.scale, .25, {
        x: 0,
        y: 0,
        onComplete: () => {
          this.progress.visible = false;
          cb();
        },
        delay: 1
      });
    });

    this.progress.visible = true;
    this.progress.scale.x = this.progress.scale.y = 0;
    this.progress.percent = 0.1;
    gsap.to(this.progress.scale, 1, {
      x: 1,
      y: 1 ,
      ease: Elastic.easeOut.config(1, 0.3),
      onComplete: () => {
        loader.load();
      }
    });

  }

}