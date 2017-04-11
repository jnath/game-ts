# TextField

is a TextField multi style tag and wordwrap render in webgl through pixi.js lib

import components in your game
````typescript
import TextField from 'textfield';
````

display simple text
````typescript
let textfield: TextField = new TextField('my super text', {
  fontName: 'Arial',
  fontSize: 25
});
````

display simple text
````typescript
let textfield: TextField = new TextField('my super text', {
 default:{
   fontName: 'Arial'
 }
});
````

display text with simple html tags
````typescript
let textfield: TextField = new TextField('<h1>My Title</h1>my super text', {
 default:{
   fontName: 'Arial'
 }
});
````

display text with a custom html tag
````typescript
let textfield: TextField = new TextField('<h1>My Title</h1>my super text<shadow>', {
 default:{
   fontName: 'Arial'
 },
 shadow:{
  shadowColor:'#000000';
  shadowOffsetX:5;
  shadowOffsetY:5;
  shadowBlur:10;
 }
});
````

Default html tags
------------------

Type `DisplayMode` =>
* `INLINE`
* `BLOCK`

Type `Style` =>

* `fontFamily` is string
* `fontSubFamily` is string
* `fontName` is string
* `fontSize` is number
* `fill` is string
* `stroke` is string
* `strokeWidth` is number
* `lineHeight` is number
* `interLine` is number
* `shadowColor` is string
* `shadowOffsetX` is number
* `shadowOffsetY` is number
* `shadowBlur` is number
* `display` is DisplayMode
* `letterSpacing` is number;

default tag style
----------------

* `default` is Style =>
  * `fontSize`: 13

* `h1` is Style =>
  * `fontSize`: 24,
  * `display`: DisplayMode.BLOCK

* `h2` is Style
  * `fontSize`: 22,
  * `display`: DisplayMode.BLOCK

* `h3` is Style
  * `fontSize`: 18,
  * `display`: DisplayMode.BLOCK

* `h4` is Style
  * `fontSize`: 16,
  * `display`: DisplayMode.BLOCK

* `h5` is Style
  * `fontSize`: 12,
  * `display`: DisplayMode.BLOCK
* `h6` is Style
  * `fontSize`: 10,
  * `display`: DisplayMode.BLOCK
* `p` is Style
  * `fontSize`: 13,
  * `display`: DisplayMode.BLOCK
* `b` is Style
  * `fontSubFamily`: 'bold'
* `i` is Style
  * `fontSubFamily`: 'italic'