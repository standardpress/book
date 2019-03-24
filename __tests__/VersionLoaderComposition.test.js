/**
 * VersionLoaderComposition.test.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const VersionLoaderComposition = require('../lib/VersionLoaderComposition');

describe('VersionLoaderComposition', () => {

  describe('load', () => {

    it('loads version with version loaders sequentially', () => {
      const version = {};
      const versionLoader1 = {
        load: jest.fn(() => new Promise(resolve => {
          versionLoader1.receivedVersion = Object.assign({}, version);
          version.data1 = 'data1';
          resolve();
        }))
      };
      const versionLoader2 = {
        load: jest.fn(() => new Promise(resolve => {
          versionLoader2.receivedVersion = Object.assign({}, version);
          version.data2 = 'data2';
          resolve();
        }))
      };
      const versionLoaderComposition = new VersionLoaderComposition([
        versionLoader1,
        versionLoader2
      ]);

      return versionLoaderComposition.load(version, 'book')
      .then(() => {
        expect(versionLoader1.load).toHaveBeenCalledTimes(1);
        expect(versionLoader1.load).toHaveBeenCalledWith(version, 'book');
        expect(versionLoader1.receivedVersion).toEqual({});
        expect(versionLoader2.load).toHaveBeenCalledTimes(1);
        expect(versionLoader2.load).toHaveBeenCalledWith(version, 'book');
        expect(versionLoader2.receivedVersion).toEqual({
          data1: 'data1'
        });
        expect(version).toEqual({
          data1: 'data1',
          data2: 'data2'
        });
      });
    });
  });
});
