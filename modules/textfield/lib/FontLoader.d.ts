import { Font } from 'opentype.js';
export { Font };
export default class FontLoader {
    private static _fonts;
    private static _fontsMapName;
    static getFontFamily(fontFamily: string, fontSubfamily?: string): Font;
    static getFont(name: string): Font;
    static load(url: string, cb: (err: Error, font?: Font) => void): void;
}
