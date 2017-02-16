
import { Container, Sprite, Texture, extras } from 'pixi.js';

import Spine = PIXI.spine.Spine;
import SkeletonData = PIXI.spine.core.SkeletonData;

import AssetLoader, { Loader } from './process/AssetLoader';

import Layout, { Dock } from './ui/Layout';
import ProgressBar from './ui/ProgressBar';
import Padding from './ui/Padding';
import Panel from './ui/Panel';
import Parallax from './component/Parallax';
import Position from './process/Position';

import gsap from 'gsap';

declare var Elastic: any;

export default class Game extends Layout {

  progress: ProgressBar;
  background: Sprite;

  parallax: Parallax;

  hero: Spine;

  impulse: number = 0;

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

    this.interactive = true;

    setTimeout(() => {
      this.load('all', () => {
        this.parallax = new Parallax();
        this.parallax.add(Texture.fromImage('distant_clouds1'));
        this.parallax.add(Texture.fromImage('distant_clouds'));
        this.parallax.add(Texture.fromImage('huge_clouds'));
        this.parallax.add(Texture.fromImage('clouds'));
        this.parallax.add(Texture.fromImage('hill2'));
        this.parallax.add(Texture.fromImage('hill1'));
        this.parallax.add(Texture.fromImage('distant_trees'));
        this.parallax.add(Texture.fromImage('bushes'));
        this.parallax.add(Texture.fromImage('trees_and_bushes'));
        this.parallax.add(Texture.fromImage('ground'));
        this.addChild(this.parallax);

        // gsap.to(this.parallax, 1000, { move: -100000 });

        let spineData: SkeletonData = AssetLoader.get('all').resources['spineboy']['spineData'];
        this.hero = new Spine(spineData);
        // this.hero.dock = Dock.CENTER | Dock.BOTTOM;
        this.hero.scale.set(.2);
        this.hero.state.setAnimation(0, 'walk', true);

        this.addChild(this.hero);
        this.on('pointerdown', () => {
            this.hero.state.setAnimation(0, 'jump', true);
            this.impulse += 25;
        });
        // let panel: Panel = new Panel(Texture.fromImage('panel'));
        // panel.dockPivot(panel.width / 2, panel.height / 2);
        // panel.dock = Dock.CENTER | Dock.MIDDLE;
        // this.addChild(panel);
        // gsap.from(panel, 1, { scaleXY: 0, ease: Elastic.easeOut.config(1, 0.3) });
      });
    }, 1000);

    this.on('resize', () => {
      Position.cover(this, this.background);
      if (this.parallax) {
        Position.cover(this, this.parallax);
      }
    });
  }

  render() {
    if (!this.hero) {
      return;
    }
    this.parallax.move -= 3 + this.impulse;
    this.hero.x = ( this.width - this.hero.width ) / 2;
    if ( this.hero.y < this.height - 90) {
      this.hero.y += 9.8;
    }
    this.hero.y -= this.impulse;
    if (this.impulse > 0) {
      this.impulse *= 0.98;
      if (this.hero.y >= this.height - 90) {
        this.impulse = 0;
      }
    }
    if(this.hero.y >= this.height - 90) {
      this.hero.state.addAnimation(0, 'walk', true, 0);
    }
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
