/**
 * AssetLoaderAppleTouchIcon.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderAppleTouchIcon = require('../lib/AssetLoaderAppleTouchIcon');
const path = require('path');

describe('AssetLoaderAppleTouchIcon', () => {

  describe('load', () => {

    it('loads and processes image for Apple touch icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderAppleTouchIcon/Icon');
      const assetLoaderAppleTouchIcon = new AssetLoaderAppleTouchIcon();

      return assetLoaderAppleTouchIcon.load(bookPath)
      .then(asset => {
        expect(asset.type).toEqual('appleTouchIcon');
        expect(asset.destinationPath).toEqual('apple_touch_icon.png');
        expect(asset.data).toBeTruthy();
      });
    });

    it('ignores missing icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderAppleTouchIcon/NoIcon');
      const assetLoaderAppleTouchIcon = new AssetLoaderAppleTouchIcon();

      return assetLoaderAppleTouchIcon.load(bookPath)
      .then(asset => {
        expect(asset).toBeNull();
      });
    });
  });
});
