/**
 * JSMinifier.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const JSMinifier = require('../lib/JSMinifier');

describe('JSMinifier', () => {

  describe('minify', () => {

    it('minifies JavaScript code', () => {
      const code = 'const test = \'value\';\nconsole.log(test);';
      const jsMinifier = new JSMinifier();

      expect(jsMinifier.minify(code)).toBeTruthy();
    });
  });
});
