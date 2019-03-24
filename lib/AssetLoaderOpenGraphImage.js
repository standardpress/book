/**
 * AssetLoaderOpenGraphImage.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = class AssetLoaderOpenGraphImage {

  load(bookPath) {
    return new Promise((resolve, reject) => {
      const openGraphImageFilePath = path.join(bookPath, 'assets/open_graph_image.png');

      fs.readFile(openGraphImageFilePath, (error, data) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve(null);
          } else {
            reject(error);
          }

          return;
        }

        resolve({
          type: 'openGraphImage',
          destinationPath: 'open_graph_image.png',
          data
        });
      });
    });
  }
};
