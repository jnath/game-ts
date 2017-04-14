System.config({
  defaultJSExtensions: true,
  paths:{
    'game-ui/*':'node_modules/game-ui/lib/*'
  },
  map: {
    'pixi.js': 'node_modules/pixi.js/dist/pixi.js',
    'pixi-spine': 'node_modules/pixi-spine/bin/pixi-spine.js',
    'gsap': 'node_modules/gsap/TweenMax.js',
    'opentype.js': 'node_modules/opentype.js/dist/opentype.js',
    'dat-gui': 'node_modules/dat-gui/vendor/dat.gui.js',
    'textfield':'node_modules/textfield/dist/bundle.js',
  },
  meta: {
    'node_modules/pixi-spine/bin/pixi-spine.js': {
      format: 'global'
    }
  }
});