/**
 * AssetLoaderFavicon.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderFavicon = require('../lib/AssetLoaderFavicon');
const path = require('path');

describe('AssetLoaderFavicon', () => {

  describe('load', () => {

    it('loads favicon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderFavicon/Favicon');
      const assetLoaderFavicon = new AssetLoaderFavicon();

      return assetLoaderFavicon.load(bookPath)
      .then(asset => {
        expect(asset.type).toEqual('favicon');
        expect(asset.destinationPath).toMatch('favicon.ico');
        expect(asset.data).toBeTruthy();
      });
    });

    it('ignores missing favicon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderFavicon/NoFavicon');
      const assetLoaderFavicon = new AssetLoaderFavicon();

      return assetLoaderFavicon.load(bookPath)
      .then(asset => {
        expect(asset).toBeNull();
      });
    });
  });
});
