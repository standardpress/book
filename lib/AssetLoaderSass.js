/**
 * AssetLoaderSass.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const sass = require('node-sass');

module.exports = class AssetLoaderSass {

  constructor(name, renderOptions) {
    this.name = name;
    this.renderOptions = renderOptions;
  }

  load() {
    return new Promise((resolve, reject) => {
      sass.render(this.renderOptions, (error, result) => {
        if (error) {
          reject(error);

          return;
        }

        resolve({
          type: 'css',
          destinationPath: `css/${this.name}.css`,
          data: result.css
        });
      });
    });
  }
};
