/**
 * JSMinifier.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const Terser = require('terser');

module.exports = class JSMinifier {

  minify(code) {
    const minifiedCode = Terser.minify(code).code;
    const buffer = Buffer.from(minifiedCode, 'utf-8');

    return buffer;
  }
};
