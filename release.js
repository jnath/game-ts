var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './system.config.js');

builder.buildStatic('./lib/index.js', './dist/bundle.js', { minify: true, sourceMaps: true });