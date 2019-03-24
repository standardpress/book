/**
 * AssetLoaderRollup.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const rollup = require('rollup');

module.exports = class AssetLoaderRollup {

  constructor(name, inputOptions, outputOptions, jsMinifier) {
    this.name = name;
    this.inputOptions = inputOptions;
    this.outputOptions = outputOptions;
    this.jsMinifier = jsMinifier;
  }

  load() {
    return rollup.rollup(this.inputOptions)
    .then(bundle => bundle.generate(this.outputOptions))
    .then(result => {
      const code = result.output[0].code;
      const minifiedCode = this.jsMinifier.minify(code);

      return {
        type: 'js',
        destinationPath: `js/${this.name}.js`,
        data: minifiedCode
      };
    });
  }
};
