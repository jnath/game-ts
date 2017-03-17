
import { utils, loaders } from 'pixi.js';
import EventEmitter = utils.EventEmitter;
import Loader = loaders.Loader;
import Resource = loaders.Resource;
import opentype, { Font } from 'opentype.js';

interface AssetList {
  [ cathName: string ]: { [name: string]: string };
}

interface Loaders {
  [ cathName: string]: Loader;
}
export { Loader }

export default class AssetLoader extends EventEmitter {

  static EVT_COMPLETE: string = 'complete';

  static loaders: Loaders = {};

  static fontExts: Array<string> = [
    'ttf',
    'woff',
    'otf'
  ];

  constructor() {
    super();
  }

  private static _fonts: {[name: string]: Font} = {};

  static getFont(name: string): Font {
    return AssetLoader._fonts[name];
  }

  static getAssetList() {

  }

  static loadWith(url: string, cb: (loaders: Loaders) => void) {
    let loader: Loader = new Loader();
    let assetLoader: AssetLoader = new AssetLoader();
    loader.add(url, (ressource: Resource) => {
      let assetList: AssetList = ressource.data;
      Object.keys(assetList).forEach((cathName: string) => {
        let loader: Loader = new Loader();
        Object.keys(assetList[cathName]).forEach((name: string) => {
          let url: string = assetList[cathName][name];
          loader.add(name, url);
        });
        loader.use((ressource: Resource, next: () => void) => {
          let ext: string = ressource.url.split('/').pop().split('.')[1];
          if (AssetLoader.fontExts.indexOf(ext) !== -1) {
            opentype.load(ressource.url, (err: any, font?: opentype.Font) => {
              if (err) {
                throw err;
              }
              if (font) {
                console.log(`font loaded name : ${font.names.postScriptName['en']}`);
                AssetLoader._fonts[font.names.postScriptName['en']] = font;
              }else {
                throw Error(`Font ${ressource.url} is not loaded`);
              }
              next();
            });
            return;
          }
          next();
        });
        AssetLoader.loaders[cathName] = loader;
      });
      cb(AssetLoader.loaders);
    }).load();
  }


  static get(cathName: string): Loader {
    return AssetLoader.loaders[cathName];
  }

}