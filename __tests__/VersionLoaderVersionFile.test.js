/**
 * VersionLoaderVersionFile.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const path = require('path');
const VersionLoaderVersionFile = require('../lib/VersionLoaderVersionFile');

describe('VersionLoaderVersionFile', () => {

  describe('load', () => {

    it('loads version file', () => {
      const versionPath = path.join(__dirname, '../__fixtures__/VersionLoaderVersionFile');
      const version = {
        path: versionPath
      };
      const versionLoaderVersionFile = new VersionLoaderVersionFile();

      return versionLoaderVersionFile.load(version)
      .then(() => {
        expect(version).toEqual({
          path: versionPath,
          pages: [
            {
              path: 'page-1.md'
            }
          ],
          assets: [
            'assets'
          ]
        });
      });
    });
  });
});
