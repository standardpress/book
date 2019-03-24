/**
 * AssetLoaderLogo.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderLogo = require('../lib/AssetLoaderLogo');
const path = require('path');

describe('AssetLoaderLogo', () => {

  describe('load', () => {

    it('loads and processes image for logo', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderLogo/Icon');
      const assetLoaderLogo = new AssetLoaderLogo();

      return assetLoaderLogo.load(bookPath)
      .then(asset => {
        expect(asset.type).toEqual('logo');
        expect(asset.destinationPath).toEqual('logo.png');
        expect(asset.data).toBeTruthy();
      });
    });

    it('ignores missing icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderLogo/NoIcon');
      const assetLoaderLogo = new AssetLoaderLogo();

      return assetLoaderLogo.load(bookPath)
      .then(asset => {
        expect(asset).toBeNull();
      });
    });
  });
});
