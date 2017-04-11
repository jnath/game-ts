
import opentype , { Font } from 'opentype.js';

export { Font };

export default class FontLoader {

  private static _fonts: { [fontName: string]: Font } = {};
  private static _fontsMapName: { [fontFamily: string]: {[ fontSubFamily: string]: string } } = {};

  static getFontFamily(fontFamily: string, fontSubfamily: string = 'Regular'): Font {
    return FontLoader._fonts[FontLoader._fontsMapName[fontFamily][fontSubfamily]];
  }

  static getFont(name: string): Font {
    return FontLoader._fonts[name];
  }

  static load(url: string, cb: (err: Error, font?: Font) => void) {
    opentype.load(url, (err: any, font?: Font) => {
      if (err) {
        return cb(err);
      }
      if (font) {
        FontLoader._fonts[font.names.postScriptName['en']] = font;
        if (!FontLoader._fontsMapName[font.names.fontFamily['en']]) {
          FontLoader._fontsMapName[font.names.fontFamily['en']] = {};
        }
        FontLoader._fontsMapName[font.names.fontFamily['en']][font.names.fontSubfamily['en']] = font.names.postScriptName['en'];
      } else {
        throw Error(`Font ${url} is not loaded`);
      }
      cb(null, font);
    });
  }

}