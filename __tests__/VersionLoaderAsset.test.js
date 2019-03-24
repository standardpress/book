/**
 * VersionLoaderAsset.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');
const VersionLoaderAsset = require('../lib/VersionLoaderAsset');

describe('VersionLoaderAsset', () => {

  describe('load', () => {

    it('loads asset for version', () => {
      const versionPath = path.join(__dirname, '../__fixtures__/VersionLoaderAsset/Asset');
      const version = {
        path: versionPath,
        destinationPath: 'destination/path',
        assets: [
          'images'
        ]
      };
      const book = {
        assets: []
      };
      const versionLoaderAsset = new VersionLoaderAsset();

      return versionLoaderAsset.load(version, book)
      .then(() => {
        expect(book.assets).toHaveLength(4);
        expect(book.assets).toEqual(expect.arrayContaining([{
          type: 'blob',
          destinationPath: 'destination/path/images/file.txt',
          data: expect.anything()
        }]));
        expect(book.assets).toEqual(expect.arrayContaining([{
          type: 'blob',
          destinationPath: 'destination/path/images/path/file.txt',
          data: expect.anything()
        }]));
        expect(book.assets).toEqual(expect.arrayContaining([{
          type: 'blob',
          destinationPath: 'destination/path/assets/file.txt',
          data: expect.anything()
        }]));
        expect(book.assets).toEqual(expect.arrayContaining([{
          type: 'blob',
          destinationPath: 'destination/path/assets/path/file.txt',
          data: expect.anything()
        }]));
      });
    });

    it('ignores missing directories', () => {
      const versionPath = path.join(__dirname, '../__fixtures__/VersionLoaderAsset/NoAsset');
      const version = {
        path: versionPath
      };
      const versionLoaderAsset = new VersionLoaderAsset();

      return versionLoaderAsset.load(version, {});
    });
  });
});
