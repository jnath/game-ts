
import { Container, Sprite, Texture, extras, ticker } from 'pixi.js';
import Ticker = ticker.Ticker;
import Parallax from './component/Parallax';

import AssetLoader, { Loader } from './process/AssetLoader';
import Hero from './element/Hero';

import gsap from 'gsap';

export default class GamePlay extends Container {

  parallax: Parallax;

  hero: Hero;

  ticker: Ticker;
  impulse: number = 0;

  floor: number = 350;

  constructor() {
    super();

    this.ticker = new Ticker();
    this.ticker.add(this.tick.bind(this));

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

    this.hero = new Hero();
    this.hero.x = - this.hero.width;
    this.hero.y = this.height - this.hero.height;
    this.addChild(this.hero);

  }

  start() {
    this.ticker.start();
    this.hero.walk();
  }

  stop() {
    this.ticker.stop();
    this.hero.idle();
  }

  private tick() {
    if (!this.hero) {
      return;
    }
    this.parallax.move -= 3 + this.impulse;
    this.hero.x = ( this.width - this.hero.width ) / 2;
    if ( this.hero.y < this.parallax.height - this.floor) {
      this.hero.y += 9.8;
    }else if (this.hero.y > this.parallax.height - this.floor) {
      this.hero.y = this.parallax.height - this.floor;
      this.hero.walk();
    }
    this.hero.y -= this.impulse;
    if (this.impulse > 0) {
      this.impulse *= 0.98;
      if (this.hero.y >= this.parallax.height - this.floor) {
        this.impulse = 0;
      }
    }
    // if (this.hero.y >= this.height - 90) {
    //   this.hero.walk();
    // }
  }

}
