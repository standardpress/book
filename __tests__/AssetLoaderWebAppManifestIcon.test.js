/**
 * AssetLoaderWebAppManifestIcon.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderWebAppManifestIcon = require('../lib/AssetLoaderWebAppManifestIcon');
const path = require('path');

describe('AssetLoaderWebAppManifestIcon', () => {

  describe('load', () => {

    it('loads and processes image for web app manifest icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderWebAppManifestIcon/Icon');
      const assetLoaderWebAppManifestIcon = new AssetLoaderWebAppManifestIcon();

      return assetLoaderWebAppManifestIcon.load(bookPath)
      .then(assets => {
        expect(assets).toHaveLength(2);
        expect(assets[0].type).toEqual('webAppManifestIcon192');
        expect(assets[0].destinationPath).toEqual('web_app_manifest_icon_192.png');
        expect(assets[0].data).toBeTruthy();
        expect(assets[1].type).toEqual('webAppManifestIcon512');
        expect(assets[1].destinationPath).toEqual('web_app_manifest_icon_512.png');
        expect(assets[1].data).toBeTruthy();
      });
    });

    it('ignores missing icon', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderWebAppManifestIcon/NoIcon');
      const assetLoaderWebAppManifestIcon = new AssetLoaderWebAppManifestIcon();

      return assetLoaderWebAppManifestIcon.load(bookPath)
      .then(asset => {
        expect(asset).toBeNull();
      });
    });
  });
});
