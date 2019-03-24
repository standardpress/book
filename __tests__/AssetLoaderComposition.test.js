/**
 * AssetLoaderComposition.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const AssetLoaderComposition = require('../lib/AssetLoaderComposition');

describe('AssetLoaderComposition', () => {

  describe('load', () => {

    it('loads assets with asset loaders', () => {
      const assetLoader1 = {
        load: jest.fn(() => new Promise(resolve => {
          resolve({
            destinationPath: 'destination/path/1'
          });
        }))
      };
      const assetLoader2 = {
        load: jest.fn(() => new Promise(resolve => {
          resolve([
            {
              destinationPath: 'destination/path/2'
            },
            [
              {
                destinationPath: 'destination/path/3'
              },
              {
                destinationPath: 'destination/path/4'
              }
            ]
          ]);
        }))
      };
      const assetLoader3 = {
        load: jest.fn(() => new Promise(resolve => {
          resolve(null);
        }))
      };
      const assetLoaderComposition = new AssetLoaderComposition([
        assetLoader1,
        assetLoader2,
        assetLoader3
      ]);

      return assetLoaderComposition.load('path/book')
      .then(assets => {
        expect(assetLoader1.load).toHaveBeenCalledTimes(1);
        expect(assetLoader1.load).toHaveBeenCalledWith('path/book');
        expect(assetLoader2.load).toHaveBeenCalledTimes(1);
        expect(assetLoader2.load).toHaveBeenCalledWith('path/book');
        expect(assetLoader3.load).toHaveBeenCalledTimes(1);
        expect(assetLoader3.load).toHaveBeenCalledWith('path/book');
        expect(assets).toEqual([
          {
            destinationPath: 'destination/path/1'
          },
          {
            destinationPath: 'destination/path/2'
          },
          {
            destinationPath: 'destination/path/3'
          },
          {
            destinationPath: 'destination/path/4'
          }
        ]);
      });
    });
  });
});
