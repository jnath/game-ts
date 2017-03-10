
import { utils, loaders } from 'pixi.js';
import EventEmitter = utils.EventEmitter;
import Loader = loaders.Loader;
import Resource = loaders.Resource;

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

  constructor() {
    super();
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
          if (ext === 'css') {
            let newStyle = document.createElement('style');
            newStyle.onload = () => {
              console.log("CSS LOADED");
              next();
            };
            newStyle.appendChild(document.createTextNode(ressource.data));
            document.head.appendChild(newStyle);
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