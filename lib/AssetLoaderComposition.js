/**
 * AssetLoaderComposition.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const flatten = require('array-flatten');

module.exports = class AssetLoaderComposition {

  constructor(assetLoaders) {
    this.assetLoaders = assetLoaders;
  }

  load(bookPath) {
    const promises = this.assetLoaders
    .map(assetLoader => assetLoader.load(bookPath));

    return Promise.all(promises)
    .then(assets => flatten(assets.filter(x => x)));
  }
};
