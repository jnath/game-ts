var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './system.config.js');

let config = {
  sourceMaps: true,
  externals: [
    'pixi.js',
    'opentype.js'
  ]
}

builder.buildStatic('./lib/index.js', './dist/bundle.js', Object.assign({}, config, { minify: false }));
builder.buildStatic('./lib/index.js', './dist/bundle.min.js',  Object.assign({}, config, { minify: true }));

var dts = require('dts-bundle');

dts.bundle({
	name: 'textfield',
	main: './lib/index.d.ts',
  out: '../index.d.ts',
});