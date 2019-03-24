/**
 * VersionLoaderComposition.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

module.exports = class VersionLoaderComposition {

  constructor(versionLoaders) {
    this.versionLoaders = versionLoaders;
  }

  load(version, book) {
    return this.versionLoaders.reduce((chain, versionLoader) => {
      if (chain) {
        return chain.then(() => versionLoader.load(version, book));
      } else {
        return versionLoader.load(version, book);
      }
    }, null);
  }
};
