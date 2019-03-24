/**
 * AssetLoaderRollup.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderRollup = require('../lib/AssetLoaderRollup');
const path = require('path');

describe('AssetLoaderRollup', () => {

  describe('load', () => {

    it('loads JavaScript with Rollup and minifier', () => {
      const jsFilePath = path.join(__dirname, '../__fixtures__/AssetLoaderRollup/fixture.js');
      const inputOptions = {
        input: jsFilePath
      };
      const outputOptions = {
        format: 'cjs'
      };
      const jsMinifier = {
        minify: jest.fn().mockReturnValue('minifiedCode')
      };
      const assetLoaderRollup = new AssetLoaderRollup('test', inputOptions, outputOptions, jsMinifier);

      return assetLoaderRollup.load()
      .then(asset => {
        expect(jsMinifier.minify).toHaveBeenCalledTimes(1);
        expect(jsMinifier.minify).toHaveBeenCalledWith('\'use strict\';\n\nconst t = \'t\';\nconsole.log(t);\n');
        expect(asset).toEqual({
          type: 'js',
          destinationPath: 'js/test.js',
          data: 'minifiedCode'
        });
      });
    });
  });
});
