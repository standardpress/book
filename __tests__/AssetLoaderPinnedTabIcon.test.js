/**
 * AssetLoaderPinnedTabIcon.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderPinnedTabIcon = require('../lib/AssetLoaderPinnedTabIcon');
const path = require('path');

describe('AssetLoaderPinnedTabIcon', () => {

  describe('load', () => {

    it('loads pinned tab icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderPinnedTabIcon/PinnedTabIcon');
      const assetLoaderPinnedTabIcon = new AssetLoaderPinnedTabIcon();

      return assetLoaderPinnedTabIcon.load(bookPath)
      .then(asset => {
        expect(asset.type).toEqual('pinnedTabIcon');
        expect(asset.destinationPath).toEqual('pinned_tab_icon.svg');
        expect(asset.data).toBeTruthy();
      });
    });

    it('ignores missing pinned tab icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderPinnedTabIcon/NoPinnedTabIcon');
      const assetLoaderPinnedTabIcon = new AssetLoaderPinnedTabIcon();

      return assetLoaderPinnedTabIcon.load(bookPath)
      .then(asset => {
        expect(asset).toBeNull();
      });
    });
  });
});
