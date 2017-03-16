
import { Container, Sprite, Texture, extras } from 'pixi.js';

import Spine = PIXI.spine.Spine;
import SkeletonData = PIXI.spine.core.SkeletonData;

import AssetLoader, { Loader } from './process/AssetLoader';

import Layout, { Dock } from './ui/Layout';
import ProgressBar from './ui/ProgressBar';
import Padding from './ui/Padding';
import Intro from './element/Intro';
import Parallax from './component/Parallax';
import Position from './process/Position';
import GamePlay from './GamePlay';

import gsap from 'gsap';

declare var Elastic: any;

export default class Game extends Layout {

  progress: ProgressBar;
  background: Sprite;
  gamePlay: GamePlay;

  constructor() {
    super();

    this.background = Sprite.fromImage('background');
    // this.background.dock = Dock.MIDDLE | Dock.CENTER;
    this.addChild(this.background);

    this.progress = new ProgressBar(new Padding(10, 10, 15, 15));
    // this.progress.dockPivot(this.progress.width / 2, this.progress.height / 2);
    // this.progress.dock = Dock.MIDDLE | Dock.CENTER;
    this.progress.visible = false;
    this.addChild(this.progress);

    this.interactive = true;

    this.load('all', () => {
      this.gamePlay = new GamePlay();
      this.addChild(this.gamePlay);
      this.gamePlay.start();
      this.on('resize', () => Position.cover(this, this.gamePlay));
      Position.cover(this, this.gamePlay);

      let intro: Intro = new Intro();
      intro.dock = Dock.CENTER | Dock.MIDDLE;
      intro.width = this.width / 3 * 2;
      intro.height = this.height / 3 * 2;
      intro.on('play', () => {
        gsap.to(intro, 1, {
          width: 0, height: 0, ease: Elastic.easeOut.config(1, 0.3),
          onComplete: () => {
            this.removeChild(intro);
          }
        });

      });
      this.addChild(intro);
      this.on('resize', () => {
        gsap.to(intro, 1, { width: this.width / 3 * 2, height: this.height / 3 * 2, ease: Elastic.easeOut.config(1, 0.3) });
      });
    });

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
      gsap.to(this.progress, .25, {
        scaleXY: 0, delay: 1, onComplete: () => {
          this.progress.visible = false;
          cb();
        }
      });
    });

    setTimeout(() => {
      this.progress.visible = true;
      this.progress.scaleXY = 0.1;
      this.progress.percent = 0.1;
      gsap.to(this.progress, 1, {
        scaleXY: 1, ease: Elastic.easeOut.config(1, 0.3),
        onComplete: () => loader.load(),
      });
    });
  }

}
