/**
 * BookLoader.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const BookLoader = require('../lib/BookLoader');
const path = require('path');

describe('BookLoader', () => {

  describe('load', () => {

    it('loads book', () => {
      const assetLoader = {
        load: jest.fn(() => new Promise(resolve => {
          resolve('assets');
        }))
      };
      const versionLoader = {
        load: jest.fn(version => new Promise(resolve => {
          version.data = 'data';
          resolve();
        }))
      };
      const bookLoader = new BookLoader(
        assetLoader,
        versionLoader
      );

      bookLoader.loadManifest = jest.fn(() => new Promise(resolve => {
        resolve('manifest');
      }));
      bookLoader.versions = jest.fn().mockReturnValue([
        {
          path: 'root/en/0.2.0'
        },
        {
          path: 'root/en/0.1.0'
        }
      ]);

      return bookLoader.load('book/path', 'options')
      .then(book => {
        expect(bookLoader.loadManifest).toHaveBeenCalledTimes(1);
        expect(bookLoader.loadManifest).toHaveBeenCalledWith('book/path', 'options');
        expect(bookLoader.versions).toHaveBeenCalledTimes(1);
        expect(bookLoader.versions).toHaveBeenCalledWith('manifest');
        expect(assetLoader.load).toHaveBeenCalledTimes(1);
        expect(assetLoader.load).toHaveBeenCalledWith('book/path');
        expect(versionLoader.load).toHaveBeenCalledTimes(2);
        expect(book).toEqual({
          manifest: 'manifest',
          assets: 'assets',
          versions: [
            {
              path: 'root/en/0.2.0',
              data: 'data'
            },
            {
              path: 'root/en/0.1.0',
              data: 'data'
            }
          ]
        });
      });
    });
  });

  describe('loadManifest', () => {

    it('loads manifest', () => {
      const bookPath = path.join(__dirname, '../__fixtures__/BookLoader');
      const bookLoader = new BookLoader();

      return bookLoader.loadManifest(bookPath)
      .then(manifest => {
        expect(manifest).toEqual({
          languages: [
            {
              path: 'en'
            }
          ],
          versions: [
            '0.1.0'
          ]
        });
      });
    });

    it('injects baseURL', () => {
      const options = {
        baseURL: 'https://test.com'
      };
      const bookPath = path.join(__dirname, '../__fixtures__/BookLoader');
      const bookLoader = new BookLoader();

      return bookLoader.loadManifest(bookPath, options)
      .then(manifest => {
        expect(manifest).toEqual({
          baseURL: 'https://test.com',
          languages: [
            {
              path: 'en'
            }
          ],
          versions: [
            '0.1.0'
          ]
        });
      });
    });
  });

  describe('versions', () => {

    it('returns root paths for no manifest languages and versions', () => {
      const bookLoader = new BookLoader();

      expect(bookLoader.versions({})).toEqual([
        {
          path: 'contents',
          destinationPath: '.'
        }
      ]);
    });

    describe('languages', () => {

      it('uses first language for root destination path', () => {
        const manifest = {
          languages: [
            {
              path: 'ko',
              name: '한국어'
            },
            {
              path: 'en',
              name: 'English'
            }
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/ko',
            destinationPath: '.',
            language: {
              path: 'ko',
              name: '한국어'
            }
          },
          {
            path: 'contents/en',
            destinationPath: 'en',
            language: {
              path: 'en',
              name: 'English'
            },
          }
        ]);
      });

      it('uses primary language for root destination path', () => {
        const manifest = {
          primaryLanguage: 'en',
          languages: [
            {
              path: 'ko',
              name: '한국어'
            },
            {
              path: 'en',
              name: 'English'
            }
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/ko',
            destinationPath: 'ko',
            language: {
              path: 'ko',
              name: '한국어'
            }
          },
          {
            path: 'contents/en',
            destinationPath: '.',
            language: {
              path: 'en',
              name: 'English'
            },
          }
        ]);
      });
    });

    describe('versions', () => {

      it('uses first version for root destination path', () => {
        const manifest = {
          releases: [
            '1.0.0-beta',
            '0.1.0'
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/1.0.0-beta',
            destinationPath: '.',
            release: '1.0.0-beta'
          },
          {
            path: 'contents/0.1.0',
            destinationPath: '0.1.0',
            release: '0.1.0'
          }
        ]);
      });

      it('uses stable version for root destination path', () => {
        const manifest = {
          stableRelease: '0.1.0',
          releases: [
            '1.0.0-beta',
            '0.1.0'
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/1.0.0-beta',
            destinationPath: '1.0.0-beta',
            release: '1.0.0-beta'
          },
          {
            path: 'contents/0.1.0',
            destinationPath: '.',
            release: '0.1.0'
          }
        ]);
      });
    });

    describe('languages and versions', () => {

      it('sets destination path with only language when there is only one version', () => {
        const manifest = {
          languages: [
            {
              path: 'ko',
              name: '한국어'
            },
            {
              path: 'en',
              name: 'English'
            }
          ],
          releases: [
            '0.1.0'
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/ko/0.1.0',
            destinationPath: '.',
            language: {
              path: 'ko',
              name: '한국어'
            },
            release: '0.1.0'
          },
          {
            path: 'contents/en/0.1.0',
            destinationPath: 'en',
            language: {
              path: 'en',
              name: 'English'
            },
            release: '0.1.0'
          }
        ]);
      });

      it('sets destination path with only version when there is only one language', () => {
        const manifest = {
          languages: [
            {
              path: 'ko',
              name: '한국어'
            }
          ],
          releases: [
            '1.0.0-beta',
            '0.1.0'
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/ko/1.0.0-beta',
            destinationPath: '.',
            language: {
              path: 'ko',
              name: '한국어'
            },
            release: '1.0.0-beta'
          },
          {
            path: 'contents/ko/0.1.0',
            destinationPath: '0.1.0',
            language: {
              path: 'ko',
              name: '한국어'
            },
            release: '0.1.0'
          }
        ]);
      });

      it('returns versions for manifest languages and versions', () => {
        const manifest = {
          primaryLanguage: 'ko',
          languages: [
            {
              path: 'ko',
              name: '한국어'
            },
            {
              path: 'en',
              name: 'English'
            },
            {
              path: 'th',
              name: 'ภาษาไทย'
            }
          ],
          stableRelease: '0.1.0',
          releases: [
            '1.0.0',
            '1.0.0-beta',
            '0.1.0'
          ]
        };
        const bookLoader = new BookLoader();

        expect(bookLoader.versions(manifest)).toEqual([
          {
            path: 'contents/ko/1.0.0',
            destinationPath: '1.0.0',
            language: {
              path: 'ko',
              name: '한국어'
            },
            release: '1.0.0'
          },
          {
            path: 'contents/ko/1.0.0-beta',
            destinationPath: '1.0.0-beta',
            language: {
              path: 'ko',
              name: '한국어'
            },
            release: '1.0.0-beta'
          },
          {
            path: 'contents/ko/0.1.0',
            destinationPath: '.',
            language: {
              path: 'ko',
              name: '한국어'
            },
            release: '0.1.0'
          },
          {
            path: 'contents/en/1.0.0',
            destinationPath: 'en/1.0.0',
            language: {
              path: 'en',
              name: 'English'
            },
            release: '1.0.0'
          },
          {
            path: 'contents/en/1.0.0-beta',
            destinationPath: 'en/1.0.0-beta',
            language: {
              path: 'en',
              name: 'English'
            },
            release: '1.0.0-beta'
          },
          {
            path: 'contents/en/0.1.0',
            destinationPath: 'en',
            language: {
              path: 'en',
              name: 'English'
            },
            release: '0.1.0'
          },
          {
            path: 'contents/th/1.0.0',
            destinationPath: 'th/1.0.0',
            language: {
              path: 'th',
              name: 'ภาษาไทย'
            },
            release: '1.0.0'
          },
          {
            path: 'contents/th/1.0.0-beta',
            destinationPath: 'th/1.0.0-beta',
            language: {
              path: 'th',
              name: 'ภาษาไทย'
            },
            release: '1.0.0-beta'
          },
          {
            path: 'contents/th/0.1.0',
            destinationPath: 'th',
            language: {
              path: 'th',
              name: 'ภาษาไทย'
            },
            release: '0.1.0'
          }
        ]);
      });
    });
  });
});
