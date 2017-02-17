
import { Container } from 'pixi.js';
import AssetLoader, { Loader } from '../process/AssetLoader';

import Spine = PIXI.spine.Spine;
import SkeletonData = PIXI.spine.core.SkeletonData;

import Matter from 'matter-js';

export default class Hero extends Container {

  private spineData: SkeletonData;

  private spine: Spine;

  constructor() {
    super();

    this.spineData = AssetLoader.get('all').resources['spineboy']['spineData'];
    this.spine = new Spine(this.spineData);
    this.spine.scaleXY = .45;
    this.addChild(this.spine);
  }

  walk() {
    this.spine.state.setAnimation(0, 'walk', true);
  }

}