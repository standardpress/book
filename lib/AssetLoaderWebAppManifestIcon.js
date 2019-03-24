/**
 * AssetLoaderWebAppManifestIcon.js
 * Book
 *
 * Licensed under MIT (https://github.com/standardpress/book/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = class AssetLoaderWebAppManifestIcon {

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

        const promises = [];

        promises.push(new Promise((resolve, reject) => {
          sharp(iconFilePath)
          .resize(192, 192)
          .toBuffer()
          .then(data => {
            resolve({
              type: 'webAppManifestIcon192',
              destinationPath: 'web_app_manifest_icon_192.png',
              data
            });
          })
          .catch(error => {
            reject(error);
          });
        }));
        promises.push(new Promise((resolve, reject) => {
          sharp(iconFilePath)
          .resize(512, 512)
          .toBuffer()
          .then(data => {
            resolve({
              type: 'webAppManifestIcon512',
              destinationPath: 'web_app_manifest_icon_512.png',
              data
            });
          })
          .catch(error => {
            reject(error);
          });
        }));

        return Promise.all(promises)
        .then(assets => {
          resolve(assets);
        })
        .catch(error => {
          reject(error);
        });
      });
    });
  }
};
