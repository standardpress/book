/**
 * AssetLoaderSass.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderSass = require('../lib/AssetLoaderSass');
const path = require('path');

describe('AssetLoaderSass', () => {

  describe('load', () => {

    it('transpiles Sass to CSS', () => {
      const sassFilePath = path.join(__dirname, '../__fixtures__/AssetLoaderSass/fixture.scss');
      const renderOptions = {
        file: sassFilePath,
        outputStyle: 'compressed'
      };
      const assetLoaderSass = new AssetLoaderSass('test', renderOptions);

      return assetLoaderSass.load()
      .then(asset => {
        expect(asset).toEqual({
          type: 'css',
          destinationPath: 'css/test.css',
          data: Buffer.from('h1{color:#333}\n', 'utf-8')
        });
      });
    });
  });
});
