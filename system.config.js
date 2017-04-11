System.config({
  defaultJSExtensions: true,
  map: {
    'pixi.js': 'node_modules/pixi.js/dist/pixi.js',
    'pixi-spine': 'node_modules/pixi-spine/bin/pixi-spine.js',
    'gsap': 'node_modules/gsap/TweenMax.js',
    'opentype.js': 'node_modules/opentype.js/dist/opentype.js',
    'dat-gui': 'node_modules/dat-gui/vendor/dat.gui.js',
    'textfield':'node_modules/textfield/dist/bundles.js'
  },
  meta: {
    'node_modules/pixi-spine/bin/pixi-spine.js': {
      format: 'global'
    }
  }
});