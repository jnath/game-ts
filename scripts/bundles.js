const Builder = require('systemjs-builder');
const pack = require('../package.json');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './system.config.js');

const config = {
  sourceMaps: true,
  externals: [
    'pixi.js',
    'textfield',
    'game-ui'
  ]
}

builder.buildStatic('./lib/index.js', './dist/bundle.js', Object.assign({}, config, { minify: false }));
builder.buildStatic('./lib/index.js', './dist/bundle.min.js',  Object.assign({}, config, { minify: true }));

