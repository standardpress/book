/**
 * VersionLoaderPageProcessor.test.js
 * book
 *
 * Licensed under MIT (https://github.com/standardpress/''book''/blob/master/LICENSE)
 */

'use strict';

const replaceExt = require('replace-ext');
const VersionLoaderPageProcessor = require('../lib/VersionLoaderPageProcessor');

describe('VersionLoaderPageProcessor', () => {

  describe('load', () => {

    it('processes pages', () => {
      const version = {
        pages: [
          {
            path: 'page-1.md',
            destinationPath: 'page-1.md',
            data: '# Page 1\n',
            pages: [
              {
                path: 'path/page-2.md',
                destinationPath: 'path/page-2.md',
                data: '# Page 2\n',
                pages: [
                  {
                    path: 'path/path/page-3.md',
                    destinationPath: 'path/path/page-3.md',
                    data: '# Page 3\n'
                  }
                ]
              }
            ]
          }
        ]
      };
      const pageProcessor = {
        process: jest.fn(page => new Promise(resolve => {
          page.destinationPath = replaceExt(page.destinationPath, '.html');
          page.data = `content: ${page.data}`;
          resolve();
        }))
      };
      const versionLoaderPageProcessor = new VersionLoaderPageProcessor(pageProcessor);

      return versionLoaderPageProcessor.load(version, 'book')
      .then(() => {
        expect(pageProcessor.process).toHaveBeenCalledTimes(3);
        expect(version).toEqual({
          pages: [
            {
              path: 'page-1.md',
              destinationPath: 'page-1.html',
              data: 'content: # Page 1\n',
              pages: [
                {
                  path: 'path/page-2.md',
                  destinationPath: 'path/page-2.html',
                  data: 'content: # Page 2\n',
                  pages: [
                    {
                      path: 'path/path/page-3.md',
                      destinationPath: 'path/path/page-3.html',
                      data: 'content: # Page 3\n'
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
