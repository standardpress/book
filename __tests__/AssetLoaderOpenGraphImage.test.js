/**
 * AssetLoaderOpenGraphImage.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderOpenGraphImage = require('../lib/AssetLoaderOpenGraphImage');
const path = require('path');

describe('AssetLoaderOpenGraphImage', () => {

  describe('load', () => {

    it('loads open graph image', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderOpenGraphImage/OpenGraphImage');
      const assetLoaderOpenGraphImage = new AssetLoaderOpenGraphImage();

      return assetLoaderOpenGraphImage.load(bookPath)
      .then(asset => {
        expect(asset.type).toEqual('openGraphImage');
        expect(asset.destinationPath).toEqual('open_graph_image.png');
        expect(asset.data).toBeTruthy();
      });
    });

    it('ignores missing open graph image', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/AssetLoaderOpenGraphImage/NoOpenGraphImage');
      const assetLoaderOpenGraphImage = new AssetLoaderOpenGraphImage();

      return assetLoaderOpenGraphImage.load(bookPath)
      .then(asset => {
        expect(asset).toBeNull();
      });
    });
  });
});
