/**
 * VersionLoaderWebAppManifest.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const VersionLoaderWebAppManifest = require('../lib/VersionLoaderWebAppManifest');

describe('VersionLoaderWebAppManifest', () => {

  describe('load', () => {

    it('does not load web app manifests when icon is missing', () => {
      const book = {
        assets: []
      };
      const versionLoaderWebAppManifest = new VersionLoaderWebAppManifest();

      return versionLoaderWebAppManifest.load({}, book)
      .then(() => {
        expect(book.assets).toHaveLength(0);
      });
    });

    it('loads base web app manifest', () => {
      const book = {
        manifest: {
          title: 'title'
        },
        assets: [
          {
            type: 'webAppManifestIcon192',
            destinationPath: 'icon-192.png'
          },
          {
            type: 'webAppManifestIcon512',
            destinationPath: 'icon-512.png'
          }
        ]
      };
      const versionLoaderWebAppManifest = new VersionLoaderWebAppManifest();

      return versionLoaderWebAppManifest.load({}, book)
      .then(() => {
        expect(book.assets).toEqual([
          {
            type: 'webAppManifestIcon192',
            destinationPath: 'icon-192.png'
          },
          {
            type: 'webAppManifestIcon512',
            destinationPath: 'icon-512.png'
          },
          {
            type: 'webAppManifest',
            destinationPath: 'manifest.json',
            data:
              '{'
            +   '"name":"title",'
            +   '"icons":['
            +     '{'
            +       '"src":"icon-192.png",'
            +       '"sizes":"192x192",'
            +       '"type":"image/png"'
            +     '},'
            +     '{'
            +       '"src":"icon-512.png",'
            +       '"sizes":"512x512",'
            +       '"type":"image/png"'
            +     '}'
            +   ']'
            + '}'
          }
        ]);
      });
    });

    it('loads base and localized web app manifests', () => {
      const book = {
        manifest: {
          title: 'title',
          languages: [
            {
              path: 'ko',
              title: '한국어'
            },
            {
              path: 'en'
            }
          ]
        },
        assets: [
          {
            type: 'webAppManifestIcon192',
            destinationPath: 'icon/icon-192.png'
          },
          {
            type: 'webAppManifestIcon512',
            destinationPath: 'icon/icon-512.png'
          }
        ]
      };
      const versionLoaderWebAppManifest = new VersionLoaderWebAppManifest();

      return versionLoaderWebAppManifest.load({}, book)
      .then(() => {
        expect(book.assets).toEqual([
          {
            type: 'webAppManifestIcon192',
            destinationPath: 'icon/icon-192.png'
          },
          {
            type: 'webAppManifestIcon512',
            destinationPath: 'icon/icon-512.png'
          },
          {
            type: 'webAppManifest',
            destinationPath: 'manifest.json',
            data:
              '{'
            +   '"name":"title",'
            +   '"icons":['
            +     '{'
            +       '"src":"icon/icon-192.png",'
            +       '"sizes":"192x192",'
            +       '"type":"image/png"'
            +     '},'
            +     '{'
            +       '"src":"icon/icon-512.png",'
            +       '"sizes":"512x512",'
            +       '"type":"image/png"'
            +     '}'
            +   ']'
            + '}'
          },
          {
            type: 'webAppManifest/ko',
            destinationPath: 'manifest_ko.json',
            data:
              '{'
            +   '"name":"한국어",'
            +   '"icons":['
            +     '{'
            +       '"src":"icon/icon-192.png",'
            +       '"sizes":"192x192",'
            +       '"type":"image/png"'
            +     '},'
            +     '{'
            +       '"src":"icon/icon-512.png",'
            +       '"sizes":"512x512",'
            +       '"type":"image/png"'
            +     '}'
            +   ']'
            + '}'
          }
        ]);
      });
    });
  });
});
