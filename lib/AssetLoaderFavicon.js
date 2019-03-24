/**
 * AssetLoaderFavicon.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class AssetLoaderFavicon {

  load(bookPath) {
    return new Promise((resolve, reject) => {
      const faviconFilePath = path.join(bookPath, 'assets/favicon.ico');

      fs.readFile(faviconFilePath, (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve(null);
          } else {
            reject(error);
          }

          return;
        }

        resolve({
          type: 'favicon',
          destinationPath: 'favicon.ico',
          data
        });
      });
    });
  }
};
