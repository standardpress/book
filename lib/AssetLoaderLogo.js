/**
 * AssetLoaderLogo.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = class AssetLoaderLogo {

  load(bookPath) {
    return new Promise((resolve, reject) => {
      const iconFilePath = path.join(bookPath, 'assets/icon.png');

      fs.access(iconFilePath, fs.constants.F_OK, error => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve(null);
          } else {
            reject(error);
          }

          return;
        }

        sharp(iconFilePath)
        .resize(300, 300)
        .toBuffer()
        .then(data => {
          resolve({
            type: 'logo',
            destinationPath: 'logo.png',
            data
          });
        })
        .catch(error => {
          reject(error);
        });
      });
    });
  }
};
