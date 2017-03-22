
import { Container, Sprite, Texture, extras, Graphics } from 'pixi.js';

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
import StateManager, { MiddlewareData } from './StateManager';

import TextField from './ui/TextField';

import gsap from 'gsap';

declare var Elastic: any;

export default class Game extends Layout {

  progress: ProgressBar;
  background: Sprite;
  gamePlay: GamePlay;

  intro: Intro;

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

    StateManager.getInstance().configuration({
      states: [{
        name: 'intro'
      }, {
        name: 'game'
      }]
    })

      .use((data: MiddlewareData, next: () => void) => {
        gsap.to(this.intro, 1, {
          x: (this.width - this.intro.width) / 2,
          y: (this.height - this.intro.height) / 2,
          ease: Elastic.easeOut.config(1, 0.3),
        });
        next();
      }, { nextState: 'intro' })

      .use((data: MiddlewareData, next: () => void) => {
        if (data.nextState === 'game') {
          gsap.to(this.intro, 1, {
            y: - this.intro.height,
            ease: Elastic.easeOut.config(1, 0.3),
            onComplete: () => this.removeChild(this.intro)
          });
          this.gamePlay.start();
        }

        next();
      });

    this.load('all', () => {

      this.gamePlay = new GamePlay();
      this.addChild(this.gamePlay);
      this.cover(this.gamePlay, true);

      this.createIntro();
      this.on('resize', () => this.onResize());

      StateManager.getInstance().start(() => {
        console.log('start complete');
        let text: string = 'this is a dummy <youpla>text</youpla> that overflows the <youpla>max</youpla> width. New lines \nmust be <youpla>considered</youpla>.';
        let textField: TextField = new TextField(text, {
          default: {
            fontName: 'KomikaAxis',
            fontSize: 40
          },
          youpla: {
            fontName: 'AcmeFont',
            fontSize: 12
          }
        });
        textField.width = 200;
        textField.wordWrap = true;

        this.addChild(textField);

        let i: number = 0;
        setInterval(() => {
          textField.width += 10;
          i++;
        }, 1000);

        let gf: Graphics = new Graphics();
        setInterval(() => {
          gf.clear();
          gf.beginFill(0xFF0000, .5);
          gf.drawRect(textField.x, textField.y, textField.width, textField.height);
          gf.endFill();
        }, 100);

        this.addChild(gf);
      });


    });

    this.cover(this.background);
  }

  cover(ctn: Container, force: boolean = false) {
    this.on('resize', () => Position.cover(this, ctn));
    if (force) {
      Position.cover(this, ctn);
    }
  }

  createIntro() {
    this.intro = new Intro();
    this.intro.width = this.width / 3 * 2;
    this.intro.height = this.height / 3 * 2;
    this.intro.x = (this.width - this.intro.width) / 2;
    this.intro.y = - this.intro.height;
    this.intro.on('play', () => this.startGame());
    this.addChild(this.intro);
  }

  onResize() {
    if (this.intro.parent) {
      gsap.to(this.intro, 1, {
        x: (this.width - this.intro.width) / 2,
        width: this.width / 3 * 2,
        height: this.height / 3 * 2,
        ease: Elastic.easeOut.config(1, 0.3)
      });
    }
  }

  startGame() {
    StateManager.getInstance().goto('game');
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
          setTimeout(() => {
            cb();
          }, 250);
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
