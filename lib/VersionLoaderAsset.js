/**
 * VersionLoaderAsset.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

module.exports = class VersionLoaderAsset {

  load(version, book) {
    const promises = [];

    let assetDirectories = [
      'assets'
    ];

    if (version.assets && version.assets.length) {
      assetDirectories = assetDirectories.concat(version.assets);
    }

    for (let assetDirectory of assetDirectories) {
      promises.push(new Promise((resolve, reject) => {
        assetDirectory = path.join(version.path, assetDirectory);

        recursive(assetDirectory, (error, filePaths) => {
          if (error) {
            if (error.code === 'ENOENT') {
              resolve();
            } else {
              reject(error);
            }

            return;
          }

          if (filePaths && filePaths.length) {
            const promises = [];

            for (const filePath of filePaths) {
              promises.push(new Promise((resolve, reject) => {
                fs.readFile(filePath, (error, data) => {
                  if (error) {
                    reject(error);

                    return;
                  }

                  const relativePath = path.relative(version.path, filePath);
                  const destinationPath = path.join(version.destinationPath, relativePath);

                  book.assets.push({
                    type: 'blob',
                    destinationPath,
                    data
                  });
                  resolve();
                });
              }));
            }

            Promise.all(promises)
            .then(() => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
          } else {
            resolve();
          }
        });
      }));
    }

    return Promise.all(promises);
  }
};
