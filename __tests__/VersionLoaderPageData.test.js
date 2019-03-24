/**
 * VersionLoaderPageData.test.js
 * book
 *
 * Licensed under MIT (https://github.com/standardpress/''book''/blob/master/LICENSE)
 */

'use strict';

const path = require('path');
const VersionLoaderPageData = require('../lib/VersionLoaderPageData');

describe('VersionLoaderPageData', () => {

  describe('load', () => {

    it('loads page data', () => {
      const versionPath = path.join(__dirname, '../__fixtures__/VersionLoaderPageData');
      const version = {
        path: versionPath,
        destinationPath: 'destination/path',
        pages: [
          {
            path: 'page-1.md',
            pages: [
              {
                path: 'path/page-2.md',
                pages: [
                  {
                    path: 'path/path/page-3.md'
                  }
                ]
              }
            ]
          }
        ]
      };
      const versionLoaderPageData = new VersionLoaderPageData();

      return versionLoaderPageData.load(version)
      .then(() => {
        expect(version).toEqual({
          path: versionPath,
          destinationPath: 'destination/path',
          pages: [
            {
              path: 'page-1.md',
              destinationPath: 'destination/path/index.md',
              data: '# Page 1\n',
              pages: [
                {
                  path: 'path/page-2.md',
                  destinationPath: 'destination/path/path/page-2.md',
                  data: '# Page 2\n',
                  pages: [
                    {
                      path: 'path/path/page-3.md',
                      destinationPath: 'destination/path/path/path/page-3.md',
                      data: '# Page 3\n'
                    }
                  ]
                }
              ]
            }
          ]
        });
      });
    });
  });
});
