
import { Container, Sprite, Texture, extras } from 'pixi.js';

import Spine = PIXI.spine.Spine;
import SkeletonData = PIXI.spine.core.SkeletonData;

import AssetLoader, { Loader } from './process/AssetLoader';

import gsap from 'gsap';

export default class GamePlay extends Container {

  hero: Spine;

  constructor(width: number, height: number) {
    super();

    this.width = width;
    this.height = height;

    setTimeout(() => {
      let spineData: SkeletonData = AssetLoader.get('all').resources['spineboy']['spineData'];
      this.hero = new Spine(spineData);
      this.hero.state.setAnimation(0, 'walk', true);
      this.hero.scaleXY = .2;
      this.hero.x = ( width - this.hero.width ) / 2;
      this.hero.y = height - this.hero.height;
      this.addChild(this.hero);
    }, 1000);


  }

}
