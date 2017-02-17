
import { Container, Sprite, Texture, extras } from 'pixi.js';

import Parallax from './component/Parallax';

import AssetLoader, { Loader } from './process/AssetLoader';
import Hero from './element/Hero';

import gsap from 'gsap';

export default class GamePlay extends Container {

  parallax: Parallax;

  hero: Hero;

  constructor() {
    super();

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
    this.hero.x = (this.width - this.hero.width ) / 2;
    this.hero.y = this.height - this.hero.height;
    this.addChild(this.hero);
  }

}
